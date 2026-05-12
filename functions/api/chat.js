// Cloudflare Pages Function — Chat API
// 3-tier: playbook search → Serper.dev web search → Llama 3.3 70B
// Changes: query rewriting via Groq, threshold 35
// POST /api/chat
// Body: { question: string, history: Array<{role: string, content: string}> }

export async function onRequest({ request, env }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }

  try {
    const { question, history } = await request.json();
    if (!question || !question.trim()) {
      return new Response(JSON.stringify({ error: 'Question is required' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const groqKey = env.GROQ_API_KEY;
    if (!groqKey) {
      return new Response(JSON.stringify({ error: 'Groq API key not configured.' }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // --- Tier 1: Search playbook index ---
    const indexUrl = new URL('/search-index.json', request.url).toString();
    const indexRes = await fetch(indexUrl);
    const index = await indexRes.json();

    // Rewrite question into multiple search queries using Groq
    // Include conversation context for follow-up questions
    let searchQueries = [question.toLowerCase()];
    try {
      let contextStr = '';
      if (history && Array.isArray(history)) {
        const recent = history.slice(-4);
        contextStr = recent.map(m => `${m.role}: ${m.content}`).join('\n') + '\n';
      }

      const rewriteRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'Given the conversation history and the latest question, generate 3 search queries to find relevant documentation. Resolve pronouns (it, that, this, they) using context. Use different terminology in each query (3-8 words each). Expand acronyms. Separate queries with | character. Output ONLY the 3 queries separated by | .' },
            { role: 'user', content: contextStr ? `Conversation:\n${contextStr}\nLatest question: ${question}` : question }
          ],
          temperature: 0.1,
          max_tokens: 80,
        }),
      });
      if (rewriteRes.ok) {
        const rewriteData = await rewriteRes.json();
        const raw = rewriteData?.choices?.[0]?.message?.content?.trim().toLowerCase() || '';
        const parts = raw.split('|').map(s => s.trim()).filter(s => s.length > 3);
        if (parts.length > 0) searchQueries = parts;
      }
    } catch (e) { /* fall back to original question */ }

    // TF-IDF scoring helper: returns scored results for a single query
    function scoreQuery(queryText, docs, totalDocs) {
      const stopWords = ['who','what','when','where','why','how','can','you','the','are','all','not','but','for','and','was','has','had','its','may','get','use','any','new','now','yet','way','see','two','set','let','say','few','old','tell','about','like','just','more','also','very','each','much','some','such','than','that','this','with','from','your','which','will','would','could','should'];
      const words = queryText.split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));
      if (words.length === 0) return [];

      const docFreq = {};
      for (const word of words) {
        const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(safeWord, 'gi');
        docFreq[word] = docs.filter(e => (e.title + ' ' + e.description + ' ' + e.chunk).toLowerCase().match(regex)).length;
      }

      return docs.map(entry => {
        const title = entry.title.toLowerCase();
        const desc = entry.description.toLowerCase();
        const chunk = entry.chunk.toLowerCase();
        let score = 0;
        for (const word of words) {
          const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(safeWord, 'gi');
          const df = docFreq[word] || 1;
          const idf = Math.log(totalDocs / df) + 1;
          const titleMatches = (title.match(regex) || []).length;
          const descMatches = (desc.match(regex) || []).length;
          const chunkMatches = (chunk.match(regex) || []).length;
          score += titleMatches * 20 * idf;
          score += descMatches * 5 * idf;
          score += chunkMatches * 1 * idf;
        }
        if (title.includes(queryText)) score += 50;
        return { ...entry, score };
      }).filter(e => e.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
    }

    // Score each query independently, then merge via RRF
    const totalDocs = index.length;
    const allResults = searchQueries.map(q => scoreQuery(q, index, totalDocs));
    const rrfScores = {};
    for (const results of allResults) {
      results.forEach((entry, rank) => {
        const key = entry.slug + '|' + entry.title;
        rrfScores[key] = (rrfScores[key] || 0) + 1 / (rank + 60);
      });
    }

    const mergedEntries = Object.entries(rrfScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => {
        const slug = key.split('|')[0];
        return index.find(e => e.slug === slug && (e.slug + '|' + e.title) === key);
      })
      .filter(Boolean);

    const hasPlaybookContent = mergedEntries.length > 0 && rrfScores[mergedEntries[0].slug + '|' + mergedEntries[0].title] >= 0.03;
    const contextStr = hasPlaybookContent ? mergedEntries.map(c => c.chunk).join('\n\n') : '';

    // Track where the answer came from
    let source = 'model';
    if (hasPlaybookContent) source = 'playbook';

    // --- Build messages ---
    const messages = [];

    // Add conversation history
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // --- Determine context source ---
    let finalContext = contextStr;
    let contextLabel = 'Information';

    // Tier 2: Web search via Serper.dev (when no playbook content found)
    if (!hasPlaybookContent && env.SERPER_API_KEY) {
      try {
        const serperRes = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': env.SERPER_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ q: question, num: 5 }),
        });

        if (serperRes.ok) {
          const serperData = await serperRes.json();
          if (serperData.organic && serperData.organic.length > 0) {
            finalContext = serperData.organic.map(r => r.snippet).filter(Boolean).join('\n\n');
            contextLabel = 'Web search results';
            source = 'web';
          }
        }
      } catch (e) {
        // Search failed, fall through to model knowledge
      }
    }

    // --- Call Llama 3.3 70B ---
    if (finalContext) {
      const sysContent = `You are a knowledgeable AI assistant with access to accurate reference data about AI models. Answer naturally and conversationally using this reference data, not your training knowledge. Reference data:\n\n${finalContext}\n\nWhen listing multiple items, use bullet points (- item). When providing steps, use numbered lists (1. step). Use **bold** for key terms. Use \`code\` for technical terms. For important takeaways or key points, prefix with > to highlight them. Be concise (2-3 paragraphs or a short list). Never mention "reference data" or "context".`;
      messages.unshift({ role: 'system', content: sysContent });
      messages.push({ role: 'user', content: question });
    } else {
      messages.unshift({ role: 'system', content: 'Answer questions naturally and conversationally. When listing multiple items, use bullet points (- item). When providing steps, use numbered lists (1. step). Use **bold** for key terms. Use `code` for technical terms. For important takeaways or key points, prefix with > to highlight them. Be concise (2-3 paragraphs or a short list).' });
      messages.push({ role: 'user', content: question });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      return new Response(JSON.stringify({ error: `Groq API error: ${groqRes.status}` }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const groqData = await groqRes.json();
    const answerText = groqData?.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ answer: answerText, source: source }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

// Cloudflare Pages Function — Chat API
// 3-tier: playbook → Tavily web search → Llama 3.3 70B
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
    const query = question.toLowerCase();

    // Extract meaningful words from the question
    const stopWords = ['who','what','when','where','why','how','can','you','the','are','all','not','but','for','and','was','has','had','its','may','get','use','any','new','now','yet','way','see','two','set','let','say','few','old','tell','about','like','just','more','also','very','each','much','some','such','than','that','this','with','from','your','which','will','would','could','should'];
    const queryWords = query.split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));
    
    if (queryWords.length === 0) {
      var hasPlaybookContent = false;
      var contextStr = '';
    } else {
      // TF-IDF scoring: compute document frequency for each query word
      const docFreq = {};
      for (const word of queryWords) {
        const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(safeWord, 'gi');
        docFreq[word] = index.filter(e => (e.title + ' ' + e.description + ' ' + e.chunk).toLowerCase().match(regex)).length;
      }

      const totalDocs = index.length;
      const scored = index.map(entry => {
        const title = entry.title.toLowerCase();
        const desc = entry.description.toLowerCase();
        const chunk = entry.chunk.toLowerCase();
        const fullText = title + ' ' + desc + ' ' + chunk;

        let score = 0;
        for (const word of queryWords) {
          const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(safeWord, 'gi');

          // IDF weight: rare words get higher weight
          const df = docFreq[word] || 1;
          const idf = Math.log(totalDocs / df) + 1;

          // Count matches in each field
          const titleMatches = (title.match(regex) || []).length;
          const descMatches = (desc.match(regex) || []).length;
          const chunkMatches = (chunk.match(regex) || []).length;

          score += titleMatches * 20 * idf;
          score += descMatches * 5 * idf;
          score += chunkMatches * 1 * idf;
        }

        // Bonus for exact phrase match
        if (title.includes(query)) score += 50;
        if (chunk.includes(query)) score += 20;

        return { ...entry, score };
      }).filter(e => e.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);

      const hasPlaybookContent = scored.length > 0 && scored[0].score >= 80;
      const contextStr = hasPlaybookContent ? scored.map(c => c.chunk).join('\n\n') : '';
    }

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
          }
        }
      } catch (e) {
        // Search failed, fall through to model knowledge
      }
    }

    // --- Call Llama 3.3 70B ---
    if (finalContext) {
      messages.unshift({ role: 'system', content: 'You are a knowledgeable AI assistant. Answer naturally and conversationally. Use the provided information to answer, supplemented by your own knowledge. Never mention "reference material", "context", "sources", "search results", or "according to". When listing multiple items, use bullet points (- item). When providing steps, use numbered lists (1. step). Use **bold** for key terms. Use `code` for technical terms. For important takeaways or key points, prefix with > to highlight them. Be concise (2-3 paragraphs or a short list).' });

      messages.push({ role: 'user', content: `${contextLabel}:\n${finalContext}\n\nQuestion: ${question}` });
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

    return new Response(JSON.stringify({ answer: answerText }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

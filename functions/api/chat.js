// Cloudflare Pages Function — Chat API
// 3-tier: playbook knowledge → Llama 3.3 70B → Groq Compound (with web search)
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

    const scored = index.map(entry => {
      const title = entry.title.toLowerCase();
      const desc = entry.description.toLowerCase();
      const chunk = entry.chunk.toLowerCase();
      const fullText = title + ' ' + desc + ' ' + chunk;
      const words = query.split(/\s+/).filter(w => w.length > 2);
      if (words.length === 0) return { ...entry, score: 0 };
      let score = 0;
      for (const word of words) {
        const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        score += ((title.match(new RegExp(safeWord, 'gi')) || []).length) * 20;
        score += ((desc.match(new RegExp(safeWord, 'gi')) || []).length) * 5;
        score += ((chunk.match(new RegExp(safeWord, 'gi')) || []).length);
      }
      if (words.every(w => fullText.includes(w))) score += 15;
      if (title.includes(query)) score += 30;
      if (chunk.includes(query)) score += 10;
      const mc = words.reduce((s, w) => s + ((chunk.match(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length), 0);
      score += (mc / Math.max(chunk.length, 1) * 100) * 5;
      return { ...entry, score };
    }).filter(e => e.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);

    const hasPlaybookContent = scored.length > 0;
    const contextStr = hasPlaybookContent ? scored.map(c => c.chunk).join('\n\n') : '';

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

    // --- Choose model based on whether playbook has relevant content ---
    if (hasPlaybookContent) {
      // Tier 1: Use Llama 3.3 70B with playbook context + its training knowledge
      const systemMsg = 'You are a knowledgeable AI assistant. Answer naturally and conversationally. You have reference material below — use it for the most up-to-date information, supplemented by your own knowledge. Never mention "reference material", "context", or "sources". Be concise (2-3 paragraphs).';
      const userMsg = `Reference material:\n${contextStr}\n\nQuestion: ${question}`;
      messages.unshift({ role: 'system', content: systemMsg });
      messages.push({ role: 'user', content: userMsg });

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

      const groqData = await groqRes.json();
      const answerText = groqData?.choices?.[0]?.message?.content || '';
      return new Response(JSON.stringify({ answer: answerText }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });

    } else {
      // Tier 2: Use Llama 3.3 70B (training knowledge - covers AI concepts up to mid-2024)
      messages.push({ role: 'system', content: 'Answer questions naturally and conversationally. Be concise (2-3 paragraphs).' });
      messages.push({ role: 'user', content: question });

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
    }

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

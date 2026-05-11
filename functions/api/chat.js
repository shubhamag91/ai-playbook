// Cloudflare Pages Function — Chat API
// POST /api/chat
// Body: { question: string }
// Uses Groq API (free tier) for inference

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
    const { question } = await request.json();
    if (!question || !question.trim()) {
      return new Response(JSON.stringify({ error: 'Question is required' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const groqKey = env.GROQ_API_KEY;
    if (!groqKey) {
      return new Response(JSON.stringify({ error: 'Groq API key not configured. Add GROQ_API_KEY to Cloudflare Pages environment variables.' }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Load and search index
    const indexUrl = new URL('/search-index.json', request.url).toString();
    const indexRes = await fetch(indexUrl);
    const index = await indexRes.json();
    const query = question.toLowerCase();

    const scored = index.map(entry => {
      const text = (entry.title + ' ' + entry.description + ' ' + entry.chunk).toLowerCase();
      const words = query.split(/\s+/).filter(w => w.length > 2);
      let score = words.reduce((s, w) => s + ((text.match(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length), 0);
      if (entry.title.toLowerCase().includes(query)) score += 10;
      return { ...entry, score };
    }).filter(e => e.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);

    if (scored.length === 0) {
      return new Response(JSON.stringify({ answer: "I couldn't find relevant info in the playbook. Try rephrasing." }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const contextStr = scored.map(c => c.chunk).join('\n\n');

    const systemPrompt = 'You are a knowledgeable AI assistant that has read the entire AI Playbook. Answer questions naturally and conversationally based on your knowledge from the playbook. Do NOT mention "context", "sources", "the playbook", or "according to" — just give the answer directly as if you already know it. If you don\'t have the information, simply say "I don\'t have enough information about that." Be concise (2-3 paragraphs).';

    const userMsg = `Here is some reference material:\n${contextStr}\n\nQuestion: ${question}\n\nAnswer naturally as if you already know this. Do not mention the reference material or context in your answer.`;

    // Call Groq API
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMsg },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      return new Response(JSON.stringify({ error: `Groq API error (${groqRes.status}): ${err}` }), {
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

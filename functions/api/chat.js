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

    if (!env.AI) {
      return new Response(JSON.stringify({ error: 'AI binding missing' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    // Load search index
    const indexUrl = new URL('/search-index.json', request.url).toString();
    const indexRes = await fetch(indexUrl);
    const index = await indexRes.json();

    // Find relevant chunks
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

    const contextStr = scored.map((c, i) => `[Source ${i+1}: ${c.title} (/${c.slug}/)]\n${c.chunk}`).join('\n\n');
    const sourceLinks = [...new Set(scored.map(c => ({ title: c.title, slug: c.slug })))];

    const prompt = `You are a helpful assistant for the AI Playbook. Answer questions based ONLY on the provided context. If unsure, say so. Be concise.

Context:
${contextStr}

Question: ${question}

Answer:`;

    // Call Workers AI - non-streaming
    const aiResponse = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
      prompt: prompt,
    });

    // Return as JSON
    return new Response(JSON.stringify({
      answer: aiResponse.response || aiResponse,
      sources: sourceLinks,
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message, stack: e.stack }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

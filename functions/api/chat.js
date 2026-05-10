// Cloudflare Pages Function — Chat API
// POST /api/chat
// Body: { question: string }
// Response: streamed answer from Workers AI

export async function onRequest(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const { question } = await request.json();
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Question is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Load search index (bundled as static asset in public/)
    const indexUrl = new URL('/search-index.json', request.url);
    const indexRes = await fetch(indexUrl.toString());
    const index = await indexRes.json();

    // Find relevant chunks
    const query = question.toLowerCase();
    const scored = [];

    for (const entry of index) {
      let score = 0;
      const searchText = (entry.title + ' ' + entry.description + ' ' + entry.chunk).toLowerCase();

      // Count keyword matches
      const words = query.split(/\s+/).filter(w => w.length > 2);
      for (const word of words) {
        const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = searchText.match(regex);
        if (matches) score += matches.length;
      }

      // Bonus for title matches
      if (entry.title.toLowerCase().includes(query)) score += 10;

      if (score > 0) {
        scored.push({ ...entry, score });
      }
    }

    // Sort by relevance, take top 5
    scored.sort((a, b) => b.score - a.score);
    const topChunks = scored.slice(0, 5);

    if (topChunks.length === 0) {
      return new Response(JSON.stringify({ answer: "I couldn't find relevant information in the playbook to answer that question. Try rephrasing or asking about AI tools, models, concepts, or workflows covered in the playbook." }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Build context
    const contextStr = topChunks.map((c, i) =>
      `[Source ${i + 1}: ${c.title} (/${c.slug}/)]
${c.chunk}`
    ).join('\n\n');

    const sourceLinks = topChunks.map(c => `- [${c.title}](/${c.slug}/)`).filter((v, i, a) => a.indexOf(v) === i);

    const systemPrompt = `You are a helpful assistant for the AI Playbook. Answer questions based ONLY on the provided context. If the context doesn't contain enough information to answer, say so. Keep answers concise (2-4 paragraphs). Include relevant source references.`;

    const userPrompt = `Context from the AI Playbook:
${contextStr}

Question: ${question}

Answer based only on the context above. Include source references.`;

    // Call Workers AI (Llama 3.2 3B)
    const aiResponse = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      stream: true,
    });

    // Stream response back
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of aiResponse) {
            const text = chunk.response || '';
            if (text) {
              controller.enqueue(encoder.encode(JSON.stringify({ type: 'text', content: text }) + '\n'));
            }
          }
          // Send source links at the end
          controller.enqueue(encoder.encode(JSON.stringify({ type: 'sources', sources: sourceLinks }) + '\n'));
        } catch (e) {
          controller.enqueue(encoder.encode(JSON.stringify({ type: 'error', content: 'Failed to generate answer.' }) + '\n'));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        ...corsHeaders,
      },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

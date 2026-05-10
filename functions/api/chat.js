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

    // Simple AI call - no search index, just test streaming
    const aiResponse = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
      prompt: `Answer concisely: ${question}`,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of aiResponse) {
            if (chunk.response) {
              controller.enqueue(encoder.encode(JSON.stringify({ type: 'text', content: chunk.response }) + '\n'));
            }
          }
        } catch (e) {
          controller.enqueue(encoder.encode(JSON.stringify({ type: 'error', content: e.message }) + '\n'));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', ...corsHeaders },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}

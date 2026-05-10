export async function onRequest({ request, env }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check AI binding
    const aiAvailable = !!env.AI;

    // Check search index
    const indexUrl = new URL('/search-index.json', request.url).toString();
    const indexRes = await fetch(indexUrl);
    
    return new Response(JSON.stringify({
      success: true,
      ai_bound: aiAvailable,
      search_index_ok: indexRes.ok,
      search_index_size: indexRes.ok ? (await indexRes.clone().json()).length : 0,
      env_keys: Object.keys(env).filter(k => !k.startsWith('_')),
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

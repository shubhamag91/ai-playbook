export async function onRequestGet({ request, env }) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({error: 'GEMINI_API_KEY is not set'}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  // For debugging, we return the key. THIS IS INSECURE AND SHOULD BE REMOVED AFTER DEBUGGING.
  return new Response(JSON.stringify({
    key: apiKey,
    length: apiKey.length,
    startsWithAIza: apiKey.startsWith('AIza'),
    trimmed: apiKey.replace(/\s/g, ''),
    trimmedLength: apiKey.replace(/\s/g, '').length
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

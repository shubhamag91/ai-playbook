export async function onRequestGet({ request, env }) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({error: 'GEMINI_API_KEY is not set'}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  // Return whether the key is set and its length (first and last 4 chars for verification, but we can just return length)
  return new Response(JSON.stringify({
    keySet: true,
    keyLength: apiKey.length,
    // For debugging only, we can show the first 4 and last 4 characters, but remove in production
    keyPrefix: apiKey.slice(0, 4),
    keySuffix: apiKey.slice(-4)
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

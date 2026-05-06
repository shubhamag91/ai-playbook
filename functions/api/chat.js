export async function onRequestPost({ request, env }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({error: 'Method not allowed'}), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { message } = await request.json();
  if (!message) {
    return new Response(JSON.stringify({error: 'Message required'}), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({error: 'Server misconfigured: Missing GEMINI_API_KEY binding'}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          contents: [{parts: [{text: message}]}],
          generationConfig: {temperature: 0.2, maxOutputTokens: 512}
        })
      }
    );

    // If the response is not OK, we will try to get the error message from Gemini and return it.
    if (!res.ok) {
      let errorText = 'Unknown error';
      try {
        const errorData = await res.json();
        // Gemini error response format: { error: { code, message, status } }
        if (errorData.error && errorData.error.message) {
          errorText = errorData.error.message;
        } else if (errorData.message) {
          errorText = errorData.message;
        } else {
          errorText = await res.text();
        }
      } catch (e) {
        errorText = await res.text();
      }
      return new Response(JSON.stringify({error: `Gemini API error: ${res.status} - ${errorText}`}), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '(No response)';
    
    return new Response(JSON.stringify({reply}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({error: `Failed to reach Gemini: ${e.message}`}), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

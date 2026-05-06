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

  let apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({error: 'Server misconfigured: Missing GEMINI_API_KEY binding'}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Remove any whitespace (including newline) that might have been accidentally included
  apiKey = apiKey.replace(/\s/g, '');

  // Basic validation of the API key format (Google API keys usually start with 'AIza' and are 39 characters)
  // We'll do a soft check: if it doesn't start with 'AIza', we warn but still try (in case the format has changed)
  if (!apiKey.startsWith('AIza')) {
    // We'll still try, but log a warning in the error message (without exposing the key)
    // We can return a hint in the error response in development, but in production we might not want to.
    // For now, we'll include a hint in the error if the key looks suspicious.
    // We'll check the length: typical Google API keys are around 39 characters.
    if (apiKey.length < 30 || apiKey.length > 100) {
      return new Response(JSON.stringify({error: `Server misconfigured: GEMINI_API_KEY has unexpected length (${apiKey.length}). Google API keys are typically 39 characters and start with 'AIza'. Please check your key in Google Cloud Console.`}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    // If length is okay but doesn't start with AIza, we'll still try but warn in the error if the call fails.
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
      // If we suspect the key is invalid, we can add a hint.
      if (res.status === 401 && !apiKey.startsWith('AIza')) {
        errorText += ' Hint: The API key does not start with \"AIza\". Google API keys typically start with \"AIza\". Please verify your key in Google Cloud Console.';
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

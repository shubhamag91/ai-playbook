// Cloudflare Pages Function — Playground API
// Generic, streaming completion proxy for the in-page API Playground.
// Separate from /api/chat (no RAG): runs a free-form prompt on a Groq-hosted
// open model with a rate-limited demo key so visitors need no key of their own.
// POST /api/playground  Body: { prompt, system?, model? }
// Streams NDJSON frames: {type:'delta',text}* → {type:'done',usage} (or {type:'error',error}).

const ALLOWED_MODELS = {
  'llama-3.3-70b-versatile': true,
  'llama-3.1-8b-instant': true,
};
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
const MAX_PROMPT_CHARS = 6000;
const MAX_SYSTEM_CHARS = 2000;
const MAX_TOKENS = 500;
const RATE_LIMIT_PER_HOUR = 30;

export async function onRequest({ request, env, waitUntil }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  const jsonErr = (msg, status) =>
    new Response(JSON.stringify({ error: msg }), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } });

  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (request.method !== 'POST') return jsonErr('Method not allowed', 405);

  try {
    const groqKey = env.GROQ_API_KEY;
    if (!groqKey) return jsonErr('Groq API key not configured.', 500);

    const { prompt, system, model } = await request.json();
    if (!prompt || !prompt.trim()) return jsonErr('Prompt is required', 400);
    if (prompt.length > MAX_PROMPT_CHARS) return jsonErr(`Prompt too long (max ${MAX_PROMPT_CHARS} characters in the demo).`, 400);

    const useModel = ALLOWED_MODELS[model] ? model : DEFAULT_MODEL;

    // ─── Best-effort per-IP rate limit (only if a KV binding exists) ───
    const kv = env.RATE_LIMIT || env.CHAT_LOGS;
    if (kv) {
      const ip = request.headers.get('CF-Connecting-IP') || 'anon';
      const hour = new Date().toISOString().slice(0, 13); // YYYY-MM-DDTHH
      const rlKey = `pg-rl:${ip}:${hour}`;
      try {
        const count = parseInt((await kv.get(rlKey)) || '0', 10);
        if (count >= RATE_LIMIT_PER_HOUR) {
          return jsonErr(`Demo limit reached (${RATE_LIMIT_PER_HOUR}/hour). Try again later or use your own API key.`, 429);
        }
        waitUntil(kv.put(rlKey, String(count + 1), { expirationTtl: 7200 }).catch(() => {}));
      } catch (e) { /* if KV read/write fails, fall through — Groq's own limits still apply */ }
    }

    // ─── Build messages ───────────────────────────────────────────
    const messages = [];
    if (system && system.trim()) messages.push({ role: 'system', content: String(system).slice(0, MAX_SYSTEM_CHARS) });
    messages.push({ role: 'user', content: prompt });

    // ─── Stream Groq completion back as NDJSON ────────────────────
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (obj) => controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'));

        let groqRes;
        try {
          groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
            body: JSON.stringify({
              model: useModel,
              messages,
              temperature: 0.5,
              max_tokens: MAX_TOKENS,
              stream: true,
              stream_options: { include_usage: true },
            }),
            signal: AbortSignal.timeout(20000),
          });
        } catch (e) {
          send({ type: 'error', error: 'Inference request failed' });
          controller.close();
          return;
        }

        if (!groqRes.ok || !groqRes.body) {
          send({ type: 'error', error: `Groq API error: ${groqRes.status}` });
          controller.close();
          return;
        }

        const reader = groqRes.body.getReader();
        const decoder = new TextDecoder();
        let buf = '';
        let usage = null;
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += decoder.decode(value, { stream: true });
            let nl;
            while ((nl = buf.indexOf('\n')) >= 0) {
              const line = buf.slice(0, nl).trim();
              buf = buf.slice(nl + 1);
              if (!line.startsWith('data:')) continue;
              const data = line.slice(5).trim();
              if (data === '[DONE]') continue;
              try {
                const j = JSON.parse(data);
                const delta = j?.choices?.[0]?.delta?.content || '';
                if (delta) send({ type: 'delta', text: delta });
                if (j?.usage) usage = { prompt_tokens: j.usage.prompt_tokens, completion_tokens: j.usage.completion_tokens };
              } catch (e) { /* skip malformed SSE line */ }
            }
          }
        } catch (e) {
          send({ type: 'error', error: 'Stream interrupted' });
          controller.close();
          return;
        }

        send({ type: 'done', model: useModel, usage });
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-cache', ...corsHeaders },
    });
  } catch (e) {
    return jsonErr(e.message, 500);
  }
}

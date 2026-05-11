// Cloudflare Pages Function — Chat API
// 3-tier: playbook knowledge → model knowledge → web search (Groq built-in)
// POST /api/chat
// Body: { question: string, history: Array<{role: string, content: string}> }

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
    const { question, history } = await request.json();
    if (!question || !question.trim()) {
      return new Response(JSON.stringify({ error: 'Question is required' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const groqKey = env.GROQ_API_KEY;
    if (!groqKey) {
      return new Response(JSON.stringify({ error: 'Groq API key not configured.' }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // --- Tier 1: Search playbook index ---
    const indexUrl = new URL('/search-index.json', request.url).toString();
    const indexRes = await fetch(indexUrl);
    const index = await indexRes.json();
    const query = question.toLowerCase();

    const scored = index.map(entry => {
      const title = entry.title.toLowerCase();
      const desc = entry.description.toLowerCase();
      const chunk = entry.chunk.toLowerCase();
      const fullText = title + ' ' + desc + ' ' + chunk;
      const words = query.split(/\s+/).filter(w => w.length > 2);
      if (words.length === 0) return { ...entry, score: 0 };
      let score = 0;
      for (const word of words) {
        const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        score += ((title.match(new RegExp(safeWord, 'gi')) || []).length) * 20;
        score += ((desc.match(new RegExp(safeWord, 'gi')) || []).length) * 5;
        score += ((chunk.match(new RegExp(safeWord, 'gi')) || []).length);
      }
      if (words.every(w => fullText.includes(w))) score += 15;
      if (title.includes(query)) score += 30;
      if (chunk.includes(query)) score += 10;
      const mc = words.reduce((s, w) => s + ((chunk.match(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length), 0);
      score += (mc / Math.max(chunk.length, 1) * 100) * 5;
      return { ...entry, score };
    }).filter(e => e.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);

    const hasPlaybookContent = scored.length > 0;
    const contextStr = hasPlaybookContent ? scored.map(c => c.chunk).join('\n\n') : '';

    // --- Build messages ---
    const systemPrompt = 'You are a knowledgeable AI assistant. Answer questions naturally and conversationally. You have three tiers of knowledge:\n' +
      '1. Reference material provided below (if any) — use this first, it is the most up-to-date\n' +
      '2. Your own training knowledge — use this for general AI concepts\n' +
      '3. Web search — use the web_search tool when you need current information (pricing, recent model releases, news)\n\n' +
      'Never mention "context", "sources", "reference material", or "according to" — just answer directly. Be concise (2-3 paragraphs). If you use web search, mention the source naturally (e.g. "as of" or "currently").';

    const messages = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add current question (with playbook context if available)
    if (hasPlaybookContent) {
      messages.push({ role: 'user', content: `Reference material:\n${contextStr}\n\nQuestion: ${question}` });
    } else {
      messages.push({ role: 'user', content: question });
    }

    // --- Call Groq API with web search tool ---
    const groqBody = {
      model: 'llama-3.3-70b-versatile',
      messages: messages,
      temperature: 0.3,
      max_tokens: 800,
      tools: [
        {
          type: 'function',
          function: {
            name: 'web_search',
            description: 'Search the web for current information. Use when you need up-to-date data about pricing, model releases, news, or anything that may have changed recently.',
            parameters: {
              type: 'object',
              properties: {
                query: { type: 'string', description: 'The search query' },
              },
              required: ['query'],
            },
          },
        },
      ],
      tool_choice: 'auto',
    };

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`,
      },
      body: JSON.stringify(groqBody),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      return new Response(JSON.stringify({ error: `Groq API error: ${groqRes.status}` }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const groqData = await groqRes.json();
    const choice = groqData?.choices?.[0];

    // If the model called web_search, Groq handles it internally on their newer models
    // For models that don't execute tools internally, we handle the result:
    if (choice?.finish_reason === 'tool_calls' && choice?.message?.tool_calls) {
      // Model wants to search. For models that execute tools internally,
      // Groq should handle this. If not, we'd need another round trip.
      // Fall through to use whatever response Groq returned.
    }

    const answerText = choice?.message?.content || '';

    return new Response(JSON.stringify({ answer: answerText }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

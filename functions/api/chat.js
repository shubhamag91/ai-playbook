// Cloudflare Pages Function — Chat API
// POST /api/chat
// Body: { question: string, history: Array<{role: string, content: string}> }
// Uses Groq API (free tier) for inference

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

    // Load and search index
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

      // Count keyword matches (weighted by field)
      for (const word of words) {
        const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const titleMatches = (title.match(new RegExp(safeWord, 'gi')) || []).length;
        const descMatches = (desc.match(new RegExp(safeWord, 'gi')) || []).length;
        const chunkMatches = (chunk.match(new RegExp(safeWord, 'gi')) || []).length;
        score += titleMatches * 20 + descMatches * 5 + chunkMatches;
      }

      // Bonus if all query words appear in the chunk
      const allPresent = words.every(w => fullText.includes(w));
      if (allPresent) score += 15;

      // Bonus for exact phrase match in title
      if (title.includes(query)) score += 30;

      // Bonus for exact phrase match in content
      if (chunk.includes(query)) score += 10;

      // Density bonus: prefer chunks where matches are concentrated
      const totalChars = chunk.length || 1;
      const matchCount = words.reduce((s, w) => s + ((chunk.match(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length), 0);
      const density = matchCount / (totalChars / 100); // matches per 100 chars
      score += density * 5;

      return { ...entry, score };
    }).filter(e => e.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);

    const systemPrompt = 'You are a knowledgeable AI assistant that has read the entire AI Playbook. Answer questions naturally and conversationally based on your knowledge from the playbook. Do NOT mention "context", "sources", "the playbook", or "according to" — just give the answer directly as if you already know it. If you don\'t have the information, simply say "I don\'t have enough information about that." Be concise (2-3 paragraphs).';

    // Build messages array: system + history + current question (with context if available)
    const messages = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history (up to last 6 messages = 3 exchanges)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add current question with context if chunks were found
    if (scored.length > 0) {
      const contextStr = scored.map(c => c.chunk).join('\n\n');
      messages.push({
        role: 'user',
        content: `Here is some reference material:\n${contextStr}\n\nQuestion: ${question}\n\nAnswer naturally as if you already know this.`,
      });
    } else {
      messages.push({ role: 'user', content: question });
    }

    // Call Groq API
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      return new Response(JSON.stringify({ error: `Groq API error: ${groqRes.status}` }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const groqData = await groqRes.json();
    const answerText = groqData?.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ answer: answerText }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

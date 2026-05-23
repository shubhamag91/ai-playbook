// Cloudflare Pages Function — Chat API
// Always runs both playbook search + web search, lets model decide relevance.
// POST /api/chat
// Body: { question: string, history: Array<{role: string, content: string}> }

export async function onRequest({ request, env, waitUntil }) {
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
      return new Response(JSON.stringify({ error: 'Groq API key not configured.' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    // ─── Query rewriting via Groq (3 search queries) ────────────
    let searchQueries = [question.toLowerCase()];
    try {
      let ctxStr = '';
      if (history && Array.isArray(history)) {
        const recent = history.slice(-4);
        ctxStr = recent.map(m => `${m.role}: ${m.content}`).join('\n') + '\n';
      }
      const rewriteRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: 'Given the conversation history and the latest question, generate 3 search queries to find relevant documentation. Resolve pronouns (it, that, this, they) using context. Use different terminology in each query (3-8 words each). Expand acronyms. Separate queries with | character. Output ONLY the 3 queries separated by | .' },
            { role: 'user', content: ctxStr ? `Conversation:\n${ctxStr}\nLatest question: ${question}` : question }
          ],
          temperature: 0.1, max_tokens: 80,
        }),
        signal: AbortSignal.timeout(5000),
      });
      if (rewriteRes.ok) {
        const rwData = await rewriteRes.json();
        const raw = rwData?.choices?.[0]?.message?.content?.trim().toLowerCase() || '';
        const parts = raw.split('|').map(s => s.trim()).filter(s => s.length > 3);
        if (parts.length > 0) searchQueries = parts;
      }
    } catch (e) { /* fall back to original */ }

    // ─── TF-IDF scoring helper ───────────────────────────────────
    function scoreQuery(queryText, docs, totalDocs) {
      const stopWords = ['who','what','when','where','why','how','can','you','the','are','all','not','but','for','and','was','has','had','its','may','get','use','any','new','now','yet','way','see','two','set','let','say','few','old','tell','about','like','just','more','also','very','each','much','some','such','than','that','this','with','from','your','which','will','would','could','should'];
      const words = queryText.split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));
      if (words.length === 0) return [];
      const docFreq = {};
      for (const word of words) {
        const sw = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        docFreq[word] = docs.filter(e => (e.title + ' ' + e.description + ' ' + e.chunk).toLowerCase().match(new RegExp(sw, 'gi'))).length;
      }
      return docs.map(entry => {
        const t = entry.title.toLowerCase(), d = entry.description.toLowerCase(), c = entry.chunk.toLowerCase();
        let s = 0;
        for (const word of words) {
          const sw = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), rg = new RegExp(sw, 'gi');
          const idf = Math.log(totalDocs / ((docFreq[word] || 1))) + 1;
          s += (t.match(rg) || []).length * 20 * idf;
          s += (d.match(rg) || []).length * 5 * idf;
          s += (c.match(rg) || []).length * 1 * idf;
        }
        // Term-match density bonus: reward chunks covering more query terms
        const matchedTerms = words.filter(w => (t + ' ' + d + ' ' + c).includes(w)).length;
        s *= 1 + (matchedTerms / words.length);
        if (t.includes(queryText)) s += 50;
        return { ...entry, score: s };
      }).filter(e => e.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
    }

    // ─── Search playbook (3 queries → TF-IDF → RRF merge) ────────
    const indexUrl = new URL('/search-index.json', request.url).toString();
    const indexRes = await fetch(indexUrl);
    const index = await indexRes.json();
    const totalDocs = index.length;
    const allResults = searchQueries.map(q => scoreQuery(q, index, totalDocs));
    const rrfScores = {};
    for (const results of allResults) {
      results.forEach((entry, rank) => {
        const k = entry.slug + '|' + entry.title;
        rrfScores[k] = (rrfScores[k] || 0) + 1 / (rank + 60);
      });
    }
    const merged = Object.entries(rrfScores).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const siteOrigin = new URL(request.url).origin;
    const playbookCtx = merged.length > 0
      ? merged.map(([key]) => {
          const s = key.split('|')[0];
          const e = index.find(x => x.slug === s && (x.slug + '|' + x.title) === key);
          if (!e) return null;
          const isTable = e.chunk.includes('|---') || (e.chunk.split('|').length > 5);
          const prefix = isTable ? '[TABLE — extract specific data points] ' : '';
          return `${rrfScores[key].toFixed(3)} ${prefix}[${e.title}](${siteOrigin}/${e.slug}): ${e.chunk}`;
        }).filter(Boolean).join('\n\n')
      : '';

    // ─── Web search (always in parallel) ──────────────────────────
    let webCtx = '';
    if (env.SERPER_API_KEY) {
      try {
        const sr = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: { 'X-API-KEY': env.SERPER_API_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: question, num: 5 }),
          signal: AbortSignal.timeout(5000),
        });
        if (sr.ok) {
          const sd = await sr.json();
          if (sd.organic?.length) webCtx = sd.organic.map(r => r.snippet).filter(Boolean).join('\n\n');
        }
      } catch (e) { /* leave webCtx empty */ }
    }

    // ─── Build context string ─────────────────────────────────────
    const parts = [];
    if (playbookCtx) parts.push(`PLAYBOOK CONTENT (use this first):\n${playbookCtx}`);
    if (webCtx) parts.push(`WEB SEARCH RESULTS (supplement):\n${webCtx}`);
    const finalContext = parts.join('\n\n---\n\n');

    // ─── Messages ─────────────────────────────────────────────────
    const messages = [];
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        if (msg.role === 'user' || msg.role === 'assistant') messages.push({ role: msg.role, content: msg.content });
      }
    }

    if (finalContext) {
      messages.unshift({ role: 'system', content: `You are a knowledgeable AI assistant. You have access to the AI Playbook (reference content about AI models, tools, and techniques) and web search results.

${finalContext}

INSTRUCTIONS:
1. Use the most relevant sources to answer the question. Be SPECIFIC — state numbers, prices, names.
2. For comparison questions: extract exact pricing, context windows, benchmark scores, and capabilities from the data. Present the comparison as a markdown table with columns for Model, Pricing, Context, and Capabilities. Never say "various models" or "different capabilities" — give the actual values.
3. When a [TABLE] is in the context, read the table cells and extract actual data points, not general descriptions.
4. Cite playbook content with links as [Page Title](URL). When citing web results, mention them naturally.
5. Only create links to pages that are explicitly listed in the PLAYBOOK CONTENT above. Do not invent or guess URLs or page titles.
6. Format: use bullet points for lists, numbered lists for steps, **bold** for key terms.
7. When the user asks WHERE a term is mentioned or to be "taken to" a page, list specific page titles with URLs. Point them to the right section.
8. Be concise — aim for 2-3 paragraphs or a short list.
9. Never say "playbook", "reference data", or "context" — just answer naturally.` });
    } else {
      messages.unshift({ role: 'system', content: 'Answer naturally and conversationally. Use bullet points for lists, numbered lists for steps, **bold** for key terms. Be concise.' });
    }
    messages.push({ role: 'user', content: question });

    // ─── Call Groq ────────────────────────────────────────────────
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.3,
        max_tokens: 800,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      return new Response(JSON.stringify({ error: `Groq API error: ${groqRes.status}` }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const groqData = await groqRes.json();
    const answerText = groqData?.choices?.[0]?.message?.content || '';

    // ─── Source tracking: post-check for playbook links ────────────
    let source = 'model';
    if (playbookCtx && answerText.match(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/)) source = 'playbook';
    else if (webCtx) source = 'web';

    // ─── KV log ────────────────────────────────────────────────────
    if (env.CHAT_LOGS) {
      const logVal = JSON.stringify({
        q: question, source: source, queries: searchQueries,
        a: (answerText || '').substring(0, 300), t: new Date().toISOString(),
      });
      waitUntil(env.CHAT_LOGS.put('log:' + Date.now(), logVal).catch(() => {}));
    }

    return new Response(JSON.stringify({ answer: answerText, source: source }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}

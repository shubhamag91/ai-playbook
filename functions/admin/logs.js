export async function onRequest({ request, env, ctx }) {
  const adminSecret = env.ADMIN_SECRET;
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  // Simple protection: require ?token=<ADMIN_SECRET> or skip if ADMIN_SECRET not set
  if (adminSecret && token !== adminSecret) {
    return new Response('Unauthorized. Set ADMIN_SECRET env var and pass ?token=...', {
      status: 401,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  if (!env.CHAT_LOGS) {
    return new Response('CHAT_LOGS KV namespace not configured.', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  try {
    // Verify the binding works by writing and reading a test key
    let bindingOk = false;
    let bindingError = '';
    try {
      const testKey = 'test:' + Date.now();
      await env.CHAT_LOGS.put(testKey, 'ok');
      const testVal = await env.CHAT_LOGS.get(testKey);
      bindingOk = testVal === 'ok';
      await env.CHAT_LOGS.delete(testKey);
    } catch (e) {
      bindingError = e.message || String(e);
    }

    // List all log keys
    const keyList = await env.CHAT_LOGS.list({ prefix: 'log:' });
    const keys = keyList.keys.sort((a, b) => b.name.localeCompare(a.name)).slice(0, 200);

    const entries = [];
    for (const k of keys) {
      try {
        const val = await env.CHAT_LOGS.get(k.name);
        if (val) entries.push(JSON.parse(val));
      } catch (e) { /* skip corrupted entries */ }
    }

    const sourceColors = { playbook: '#22c55e', web: '#3b82f6', model: '#f59e0b' };
  const bindingStatus = bindingOk ? '<span style="color:#22c55e">Connected</span>' : '<span style="color:#f59e0b">Error: ' + bindingError + '</span>';

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chatbot Logs</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:2rem;max-width:1200px;margin:0 auto}
  h1{font-size:1.5rem;margin-bottom:.5rem}
  .stats{display:flex;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}
  .stat{background:#161b22;padding:.75rem 1rem;border-radius:8px;border:1px solid #30363d}
  .stat-label{font-size:.75rem;color:#8b949e;text-transform:uppercase}
  .stat-value{font-size:1.25rem;font-weight:600}
  table{width:100%;border-collapse:collapse;font-size:.85rem}
  th{text-align:left;padding:.5rem .75rem;background:#161b22;border-bottom:2px solid #30363d;white-space:nowrap;cursor:pointer}
  td{padding:.5rem .75rem;border-bottom:1px solid #21262d;vertical-align:top}
  tr:hover{background:#161b22}
  .badge{display:inline-block;padding:.15rem .5rem;border-radius:4px;font-size:.7rem;font-weight:600}
  .q{font-weight:500;color:#fff}
  .score{font-size:.75rem;color:#8b949e}
  .thr{font-size:.75rem;color:#8b949e}
  .preview{font-size:.78rem;color:#8b949e;max-width:400px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .queries{font-size:.72rem;color:#8b949e}
  .empty{padding:2rem;text-align:center;color:#8b949e}
  .filter-bar{display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap}
  .filter-btn{padding:.35rem .75rem;border-radius:6px;border:1px solid #30363d;background:#161b22;color:#c9d1d9;cursor:pointer;font-size:.8rem}
  .filter-btn.active{border-color:#58a6ff;color:#58a6ff}
  .filter-btn:hover{background:#1c2128}
  input{background:#161b22;border:1px solid #30363d;color:#c9d1d9;padding:.35rem .75rem;border-radius:6px;font-size:.8rem}
</style></head>
<body>
<h1>Chatbot Response Logs</h1>
<p style="color:#8b949e;font-size:.85rem;margin-bottom:1.5rem">KV: ${bindingStatus} | Last ${entries.length} responses. Source: <span class="badge" style="background:rgba(34,197,94,0.15);color:#22c55e">Playbook</span> <span class="badge" style="background:rgba(59,130,246,0.15);color:#3b82f6">Web</span> <span class="badge" style="background:rgba(245,158,11,0.15);color:#f59e0b">Knowledge</span></p>

<div class="stats">
  <div class="stat"><div class="stat-label">Total</div><div class="stat-value">${entries.length}</div></div>
  ${Object.entries({playbook:0,web:0,model:0}).map(([src]) => {
    const count = entries.filter(e => e.source === src).length;
    return count > 0 ? '<div class="stat"><div class="stat-label" style="color:'+sourceColors[src]+'">'+src+'</div><div class="stat-value">'+count+' ('+Math.round(count/entries.length*100)+'%)</div></div>' : '';
  }).join('')}
</div>

<div class="filter-bar">
  <input type="text" id="search" placeholder="Search queries..." oninput="filterTable()">
  <button class="filter-btn active" onclick="filterSource('all',this)">All</button>
  <button class="filter-btn" onclick="filterSource('playbook',this)" style="border-color:#22c55e">Playbook</button>
  <button class="filter-btn" onclick="filterSource('web',this)" style="border-color:#3b82f6">Web</button>
  <button class="filter-btn" onclick="filterSource('model',this)" style="border-color:#f59e0b">Knowledge</button>
</div>

<table>
<thead><tr><th>Time</th><th>Source</th><th>Question</th><th>Score</th><th>Queries</th><th>Preview</th></tr></thead>
<tbody>
${entries.map(e => {
  const ts = new Date(e.t || Date.now());
  const timeStr = ts.toLocaleDateString() + ' ' + ts.toLocaleTimeString();
  const color = sourceColors[e.source] || '#8b949e';
  const badgeSrc = e.source === 'playbook' ? 'Playbook' : e.source === 'web' ? 'Web' : 'Knowledge';
  const scoreVal = typeof e.score === 'number' ? e.score.toFixed(3) : '-';
  const queries = e.queries ? e.queries.join(' | ') : '-';
  const answerPreview = e.a ? e.a.substring(0, 150) : '-';
  return '<tr data-source="'+(e.source||'unknown')+'" data-query="'+(e.q||'').toLowerCase()+'">'
    + '<td style="white-space:nowrap;font-size:.75rem;color:#8b949e">'+timeStr+'</td>'
    + '<td><span class="badge" style="background:'+color+'22;color:'+color+'">'+badgeSrc+'</span></td>'
    + '<td class="q">'+(e.q||'-')+'</td>'
    + '<td class="score">'+scoreVal+'</td>'
    + '<td class="queries">'+queries+'</td>'
    + '<td class="preview">'+answerPreview+'</td>'
    + '</tr>';
}).join('\n')}
</tbody></table>

<script>
function filterSource(src, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('tr[data-source]').forEach(r => {
    r.style.display = (src === 'all' || r.getAttribute('data-source') === src) ? '' : 'none';
  });
}
function filterTable() {
  const q = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('tr[data-source]').forEach(r => {
    r.style.display = r.getAttribute('data-query').includes(q) ? '' : 'none';
  });
}
</script>
</body></html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });

  } catch (e) {
    return new Response('Error: ' + e.message, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

# Deployment Architecture

The AI Playbook is deployed to **Cloudflare Pages** with **Cloudflare Functions** for the chatbot backend and **KV** for logging.

---

## Hosting: Cloudflare Pages

**Build command:** `npm run build`
**Output directory:** `dist`

Every push to `main` auto-deploys. Full build takes ~15 seconds.

### Setup

1. Push repo to GitHub
2. Cloudflare Pages → Create project → Connect to Git
3. Build command: `npm run build`
4. Output directory: `dist`
5. Done. Every push to `main` auto-deploys.

### Domain

The site URL is configured in `astro.config.mjs`:

```js
site: 'https://your-playbook.example.com',
```

Update this to your actual Cloudflare Pages URL (or custom domain).

---

## Environment Variables

Set these in Cloudflare Pages → Settings → Variables and Secrets:

| Variable | Required | Source | Notes |
|---|---|---|---|
| `GROQ_API_KEY` | ✅ | https://console.groq.com | Free tier, rate-limited |
| `SERPER_API_KEY` | ❌ | https://serper.dev | 2500 free searches/month |
| `CHAT_LOGS` | ❌ (KV binding) | See KV section | Logs all chatbot queries |

---

## KV Namespace: CHAT_LOGS

Used for chatbot response logging.

### Setup

1. Cloudflare Dashboard → Workers & Pages → KV
2. Create namespace named `CHAT_LOGS`
3. Go to your Pages project → Settings → Functions → KV namespace bindings
4. Add binding: variable name `CHAT_LOGS`, KV namespace `CHAT_LOGS`

### KV Data Structure

Each log entry key: `log:{unix_timestamp}`
Value structure:

```json
{
  "q": "user question",
  "source": "playbook|web|model",
  "queries": ["query1", "query2", "query3"],
  "a": "first 300 chars of answer",
  "t": "ISO timestamp"
}
```

### Admin Dashboard

URL: `/admin/logs`

Reads from `CHAT_LOGS` KV namespace. Displays all responses with source badges, filterable by source type, searchable.

File: `functions/admin/logs.js`

Currently **public** (no password protection). To secure, add `ADMIN_SECRET` env variable and require it via header or query parameter.

---

## Cloudflare Functions

| Endpoint | File | Purpose |
|---|---|---|
| `POST /api/chat` | `functions/api/chat.js` | Chatbot query + search + inference |
| `GET /admin/logs` | `functions/admin/logs.js` | Admin dashboard for chatbot logs |
| `GET /admin/logs/data` | `functions/admin/logs.js` | Returns raw KV log data as NDJSON |

Function runtime is powered by Cloudflare Pages Functions (free tier includes 500K requests/month).

**Note:** Functions use `waitUntil` directly (not `ctx.waitUntil`) — Pages Functions don't have `ctx` property on EventContext.

---

## Redirects

File: `public/_redirects`

Cloudflare-native redirect rules (processed at the edge, not by Astro):

```
# Content Migration Redirects
/opensource /research/models/guide 301
/glossary /reference/glossary 301
/confusions /reference/confusions 301
/principles /reference/principles 301
/tools /decide/tools/guide 301
/history /research/whats-new 301
/reference/model-capability-matrix /decide/models/guide 301
/reference/model-specs /decide/models/guide 301
/research/model-releases /research/whats-new 301
/decide/tools/decision-tree /decide/tools/guide 301
# Legacy cheatsheets
/cheatsheets/ai-tools-landscape /reference/cheatsheets/ai-tools-landscape 301
/cheatsheets/coding-assistants-agents /reference/cheatsheets/coding-assistants-agents 301
```

**Important:** These redirects only work in production (Cloudflare), not during local dev with `npm run dev`.

---

## Build Pipeline

```bash
npm run build
  └─ node scripts/build-search-index.mjs (prebuild)
      └─ Scans src/content/docs/ + src/data/models.ts
      └─ Outputs public/search-index.json
  └─ astro build
      └─ Generates static site in dist/
      └─ Pagefind search index (full-text)
      └─ sitemap.xml
  └─ Cloudflare Pages deploys dist/
```

---

## GitHub Actions

| Workflow | Schedule | Purpose |
|---|---|---|
| `check-links.yml` | Weekly (Mon) | Scans all files for broken links, auto-creates issue |
| `stale-content.yml` | Weekly (Mon) | Flags pages past `nextVerificationDue` date |
| `weekly-checklist.yml` | Weekly (Mon) | Creates maintenance checklist with pricing review |

All workflows auto-create GitHub Issues with reports.

---

## Cost

| Service | Cost | Notes |
|---|---|---|
| Cloudflare Pages | Free | 500 builds/month, unlimited bandwidth |
| Cloudflare Functions | Free | 500K requests/month |
| Cloudflare KV | Free | 100K reads/day, 1K writes/day |
| Groq API | Free | Rate-limited, Llama 3.3 70B |
| Serper.dev | Free | 2500 searches/month |
| GitHub | Free | Public repo + Actions |

**Total: $0/month**

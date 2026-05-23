# Chatbot Architecture

The AI Playbook's chatbot provides conversational access to all playbook content, with supplementary web search and fallback to model knowledge.

---

## Architecture Overview

```
User Browser                    Cloudflare Pages
┌─────────────────┐            ┌──────────────────────────────┐
│ chat-widget.js   │  POST     │ /api/chat (Pages Function)   │
│ (floating bubble)│ ────────→ │                              │
│                  │           │ 1. Query rewriting (3 queries)│
│                  │           │ 2. TF-IDF scoring (each query)│
│                  │           │ 3. RRF merge → top 4 chunks   │
│                  │           │ 4. Web search (always, parall)│
│                  │           │ 5. Build prompt with context   │
│                  │           │ 6. Groq API (Llama 3.3 70B)   │
│                  │ ←───────  │ 7. Source tracking + KV log   │
└─────────────────┘           └──────────────────────────────┘
                                       │
                              ┌────────┴────────┐
                              │  Groq API        │
                              │  Llama 3.3 70B   │
                              │  (free tier)     │
                              └─────────────────┘
                                       │
                              ┌────────┴────────┐
                              │  Serper.dev      │
                              │  (web search)    │
                              └─────────────────┘
                                       │
                              ┌────────┴────────┐
                              │  KV: CHAT_LOGS  │
                              │  (response log)  │
                              └─────────────────┘
```

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| **No TF-IDF threshold** | Removed entirely; let the model judge relevance. Simplifies the pipeline. |
| **Web search always runs** | Never skipped, combined with playbook context in system prompt. |
| **Source tracked by post-check** | If answer contains playbook links → "playbook"; if web was used → "web"; else → "model" |
| **Query rewriting** | Uses Llama 3.1 8B Instant to generate 3 search queries from user question, resolving pronouns from conversation history. |
| **RRF max is N/60** | With 3 queries, max RRF score is 0.05. |

---

## Files

| File | Purpose |
|---|---|
| `public/chat-widget.js` | Chat widget UI — all HTML, CSS, and JS in one file. Injected on every page. |
| `public/search-index.json` | Pre-built search index. Auto-generated at build time. Contains ~570 chunked entries. |
| `scripts/build-search-index.mjs` | Prebuild script: scans .md/.mdx files, chunks into ~300-token segments, strips MDX imports, outputs `search-index.json`. Also indexes structured model data from `src/data/models.ts`. |
| `functions/api/chat.js` | Cloudflare Pages Function. Handles POST requests: query rewriting, TF-IDF + RRF, web search, Groq API call, KV logging. |
| `src/data/models.ts` | Structured model entries (name, company, capabilities, pricing, context) fed into search index and ModelCompare component. |

---

## Data Flow

### 1. Query Rewriting

When a user asks a question, the function first rewrites it into 3 search queries using Llama 3.1 8B Instant:

- Generates queries with different terminology and phrasing
- Resolves pronouns (it, that, this, they) using conversation history (last 4 messages)
- Expands acronyms
- Fallback: original question if rewrite fails

### 2. Playbook Search (3 queries → TF-IDF → RRF merge)

Each of the 3 search queries runs TF-IDF scoring against the search index:

- Words weighted by IDF (rarer words = higher weight)
- Title matches weighted 20x, description 5x, body 1x
- Top 5 results per query

Results from all 3 queries are merged via **Reciprocal Rank Fusion** (RRF):

```
RRF score = sum(1 / (rank + 60)) across all queries
```

Top 4 merged results become the playbook context.

### 3. Web Search (always runs in parallel)

When `SERPER_API_KEY` is configured, web search runs in parallel with playbook search:

- Calls Serper.dev API with the original question
- Top 5 organic search snippets are included as supplementary context
- Never skipped — always combined with playbook context

### 4. Context Assembly

Playbook context and web search results are combined:

```
PLAYBOOK CONTENT (use this first):
[RRF score] [Title](URL): chunk content

---

WEB SEARCH RESULTS (supplement):
[snippet text]
```

Table chunks are prefixed with `[TABLE — extract specific data points]` to prompt the model to read table cells rather than describe them generically.

### 5. Groq API Call

System prompt tells the model:
- Use most relevant sources, be specific with numbers/prices/names
- Extract exact values from tables
- Cite playbook content with links: `[Page Title](URL)`
- Never say "playbook", "reference data", or "context" — just answer naturally

Last 6 conversation messages are included for context.

### 6. Source Tracking

After receiving the answer, the function checks:
- If answer contains markdown links with the site origin → source = "playbook"
- Else if web search was used → source = "web"
- Else → source = "model"

Source is returned in the response and displayed as a colored badge in the chat widget (green = playbook, blue = web, orange = model knowledge).

### 7. KV Logging

Every query is logged to Cloudflare KV namespace `CHAT_LOGS` via `waitUntil`:

```json
{
  "q": "user question",
  "source": "playbook|web|model",
  "queries": ["query1", "query2", "query3"],
  "a": "first 300 chars of answer",
  "t": "ISO timestamp"
}
```

Logged responses can be reviewed at the admin dashboard (`/admin/logs`).

---

## Chat Widget

### Features

| Feature | Implementation |
|---|---|
| Floating bubble | `position: fixed` button at bottom-right |
| Panel dimensions | 544x544px (responsive: full-screen on mobile) |
| Markdown rendering | Custom renderMarkdown(): bold, code, lists, blockquotes, links |
| Term highlighting | Key terms only: MMLU, HumanEval, SWE-bench, RLHF, LoRA |
| Source badges | Colored badges: green (playbook), blue (web), orange (model) |
| Conversation memory | Last 5 exchanges sent with each request |
| Suggested questions | 3 clickable starter questions, hidden after first message |
| Copy button | Clipboard icon on hover over bot responses |
| New Chat button | Resets conversation, shows suggestions again |
| Scroll-to-bottom | Button appears when scrolled up |
| Auto-resizing input | Textarea grows up to 120px |
| Table rendering | Markdown tables (pipes + alignment) → styled HTML tables with `.cw-table-wrap` |
| Link rendering | [text](url) → clickable links in bot messages |
| Timestamps | "just now" below each message |

### CSS

All styles are injected inline via JavaScript. Key classes:

| Class | Purpose |
|---|---|
| `.cw-root` | Fixed position container (z-index: 9999) |
| `.cw-button` | Floating chat bubble (52x52px, rounded) |
| `.cw-panel` | Chat panel (544x544px) |
| `.cw-source-playbook` | Green source badge |
| `.cw-source-web` | Blue source badge |
| `.cw-source-model` | Orange source badge |

---

## Search Index

### Build Process

```bash
# Runs automatically before every build (prebuild script in package.json)
node scripts/build-search-index.mjs
```

### What Gets Indexed

1. All `.md` and `.mdx` files in `src/content/docs/` (excluding `_template.md`)
2. Structured model data from `src/data/models.ts` (12+ model entries)
3. Comparison chunks: auto-generated top-5 lists by context window, output pricing, parameter count

### Chunking

- Each file is split into ~300-token segments (~1200 characters)
- MDX import statements and component usage are stripped
- Frontmatter (title, description) preserved per chunk
- Absolute URLs included for model navigation

---

## Environment Variables

| Variable | Required | Source | Free Tier |
|---|---|---|---|
| `GROQ_API_KEY` | ✅ | https://console.groq.com | Free (rate-limited) |
| `SERPER_API_KEY` | ❌ | https://serper.dev | 2500 searches/month |
| `CHAT_LOGS` | ❌ (KV binding) | Cloudflare KV namespace | Free tier |

### Adding Variables

1. Cloudflare Dashboard → Workers & Pages → your project
2. Settings → Variables and Secrets
3. Add each variable, check "Encrypt" for API keys
4. Save — site auto-redeploys

---

## API

### Request

```
POST /api/chat
```

```json
{
  "question": "What is RAG?",
  "history": [
    { "role": "user", "content": "Previous question" },
    { "role": "assistant", "content": "Previous answer" }
  ]
}
```

### Response

```json
{
  "answer": "RAG (Retrieval-Augmented Generation) is...",
  "source": "playbook"
}
```

### CORS

- Allowed origins: `*`
- Methods: POST, OPTIONS
- Headers: Content-Type

---

## Admin Dashboard

**Endpoint:** `GET /admin/logs`

Displays all logged queries with:
- Source badge (color-coded)
- Query details
- Filter by source type
- Search across queries and answers
- Timestamps

File: `functions/admin/logs.js` — reads from `CHAT_LOGS` KV namespace.

---

## Updates

### Chat widget UI
- Edit `public/chat-widget.js` (all CSS and JS in one file)
- No build step needed — served from `/chat-widget.js`

### Chat backend
- Edit `functions/api/chat.js`
- Changes take effect on next Cloudflare Pages deploy

### Search index
- Edit content files in `src/content/docs/`
- Or edit `src/data/models.ts` for model entries
- The `prebuild` script regenerates `search-index.json` on each build

### To add new chat features
- The widget uses vanilla JS with no dependencies
- All CSS is inline — append to `style.textContent`
- Functionality goes inside the `init()` function

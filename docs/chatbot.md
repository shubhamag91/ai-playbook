# Chatbot Architecture

The AI Playbook's chatbot provides conversational access to all playbook content, with fallback to the model's training knowledge and optional web search.

---

## Architecture Overview

```
User Browser                    Cloudflare Pages
┌─────────────────┐            ┌──────────────────────────┐
│ chat-widget.js   │  POST     │ /api/chat (Pages Function)│
│ (floating bubble)│ ────────→ │                          │
│                  │           │ 1. Load search-index.json │
│                  │ ←───────  │ 2. Find relevant chunks   │
│                  │  JSON     │ 3. Build prompt w/context  │
│                  │           │ 4. Call Groq API           │
│                  │           │ 5. Return answer           │
└─────────────────┘           └──────────────────────────┘
                                       │
                              ┌────────┴────────┐
                              │  Groq API        │
                              │  Llama 3.3 70B   │
                              │  (free tier)     │
                              └─────────────────┘
```

---

## Files

| File | Purpose |
|---|---|
| `public/chat-widget.js` | Chat widget UI — all HTML, CSS, and JS in one file. Injected on every page via Starlight's Footer component override. |
| `public/search-index.json` | Pre-built search index. Auto-generated at build time by `scripts/build-search-index.mjs`. Contains 400+ chunked entries from all `.md`/`.mdx` files plus structured model data. |
| `scripts/build-search-index.mjs` | Prebuild script that scans all content files, chunks them into ~300-token segments, strips MDX imports, and outputs `public/search-index.json`. Also indexes structured model data from `src/data/models.ts`. |
| `functions/api/chat.js` | Cloudflare Pages Function. Handles POST requests, searches the index, builds prompts, calls Groq API, returns answers. |
| `src/data/models.ts` | Structured model entries (name, company, capabilities, pricing, context) that get indexed into the search index for better model-related question matching. |

---

## Data Flow

### Playbook Content (Tier 1)

1. User types question in chat widget
2. `chat-widget.js` sends `POST /api/chat` with `{ question, history }`
3. Cloudflare Function loads `search-index.json` (bundled at build time)
4. TF-IDF scoring finds top 3 relevant chunks:
   - Each query word gets IDF weight (rarer words = higher weight)
   - Title matches weighted 20x, description 5x, body 1x
   - Minimum score threshold of 80 to qualify
5. If score ≥ 80: context is embedded in the system prompt
6. Groq API (Llama 3.3 70B) receives: system prompt with context + conversation history + question
7. Returns JSON answer to the widget

### Model Knowledge (Tier 2)

- When no playbook chunks meet the score threshold (score < 80)
- The question is sent directly to Llama 3.3 70B without context
- Model responds from its training knowledge (cutoff ~mid-2024)

### Web Search (Tier 3) — Optional

- When playbook has no match AND `SERPER_API_KEY` is configured
- Calls Serper.dev API to get search results
- Search summaries are used as context for Llama 3.3 70B

---

## Chat Widget

### Features

| Feature | Implementation |
|---|---|
| Floating bubble | `position: fixed` button at bottom-right |
| Panel dimensions | 640×640px (max-height: 100vh - 3rem) |
| Markdown rendering | Custom `renderMarkdown()` function: bold, code blocks, inline code, lists, blockquotes, line breaks |
| Term highlighting | `highlightTerms()` wraps key terms (MMLU, HumanEval, etc.) in `<span class="cw-term">` |
| Conversation memory | `conversation` array tracks last 10 user/assistant exchanges, sent with each request |
| Suggested questions | 3 clickable starter questions, hidden after first message |
| Timestamps | "just now" below each message (`user-select: none`) |
| Copy button | Clipboard icon on hover over bot responses |
| New Chat button | Resets conversation and shows suggestions again |
| Scroll-to-bottom | ↓ button appears when scrolled up |
| Auto-resizing input | Textarea grows up to 120px |
| Keyboard hint | "Enter to send" shown faintly below input |

### CSS

All styles are injected inline via JavaScript to avoid external CSS loading. Key classes:

| Class | Purpose |
|---|---|
| `.cw-root` | Fixed position container (z-index: 9999) |
| `.cw-button` | Floating chat bubble (52×52px, rounded) |
| `.cw-panel` | Chat panel (640×640px, fixed position) |
| `.cw-open` | Toggle class (panel visible/button hidden) |
| `.cw-messages` | Scrollable message area |
| `.cw-msg` / `.cw-user` / `.cw-bot` | Message bubbles (max-width: 92%) |
| `.cw-msg-content` | Message text with rounded corners |
| `.cw-term` | Highlighted terms (accent color) |
| `.cw-time` | "just now" timestamp |
| `.cw-readmore` | Expand/collapse toggle |
| `.cw-highlight` | Green text for important sentences (`>`) |
| `.cw-suggestions` | Suggested question buttons |
| `.cw-input` / `.cw-send` | Input area components |
| `.cw-scroll-btn` | Scroll-to-bottom button |

---

## Search Index

### Build Process

```bash
# Runs automatically before every build (prebuild script in package.json)
node scripts/build-search-index.mjs
```

### What Gets Indexed

1. All `.md` and `.mdx` files in `src/content/docs/` (excluding `_template.md`)
2. Structured model data from `src/data/models.ts` (12 model entries)
3. Model comparison chunks (flagship, budget, reasoning comparisons)

### Chunking

- Each file is split into ~300-token segments (roughly 1200 characters)
- MDX import statements and component usage are stripped
- Frontmatter (title, description) is preserved for each chunk

### Model Data Entries

Model entries get indexed with:
- `slug`: `models/{model-name}` (e.g., `models/claude-4-opus`)
- `title`: Model name (e.g., "Claude 4 Opus")
- `description`: Company + capabilities
- `chunk`: Structured description with capabilities, context, pricing

---

## Environment Variables

Set these in Cloudflare Pages → Settings → Variables and Secrets:

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ | Groq API key for Llama 3.3 70B inference. Get from https://console.groq.com (free). |
| `SERPER_API_KEY` | ❌ | Serper.dev API key for web search fallback. Get from https://serper.dev (2500 free searches/month). |

### Adding Variables

1. Go to Cloudflare Dashboard → Workers & Pages → your project
2. Settings → Variables and Secrets
3. Click "Add" → Enter name and value
4. Check "Encrypt" for API keys
5. Save — site auto-redeploys

---

## Cloudflare Pages Function

**File**: `functions/api/chat.js`

### Request Format

```json
POST /api/chat
{
  "question": "What is RAG?",
  "history": [
    { "role": "user", "content": "Previous question" },
    { "role": "assistant", "content": "Previous answer" }
  ]
}
```

### Response Format

```json
{
  "answer": "RAG (Retrieval-Augmented Generation) is..."
}
```

### CORS

- Allowed origins: `*`
- Methods: POST, OPTIONS
- Headers: Content-Type

---

## Updates

### To update the chat widget UI
- Edit `public/chat-widget.js` (all CSS and JS in one file)
- No build step needed — file is served from `/chat-widget.js`

### To update the chat backend
- Edit `functions/api/chat.js`
- Changes take effect on next Cloudflare Pages deploy

### To update the search index
- Edit content files in `src/content/docs/`
- Or edit `src/data/models.ts` for model entries
- The `prebuild` script regenerates `search-index.json` on each build

### To add new chat features
- The widget script uses vanilla JS with no dependencies
- All CSS is inline — just append to the `style.textContent` string
- Functionality goes inside the `init()` function

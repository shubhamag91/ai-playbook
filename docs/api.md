# Chatbot API

The AI Playbook's chatbot backend is a Cloudflare Pages Function at `/api/chat`.

---

## Endpoint

```
POST /api/chat
```

## Request

```json
{
  "question": "What models have the longest context window?",
  "history": [
    { "role": "user", "content": "Tell me about Grok" },
    { "role": "assistant", "content": "Grok is xAI's model..." }
  ]
}
```

### Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `question` | string | ✅ | User's question (min 1 char after trim) |
| `history` | array | ❌ | Conversation history (max 6 messages sent to Groq) |

Each history entry:
| Field | Type | Description |
|---|---|---|
| `role` | string | `"user"` or `"assistant"` |
| `content` | string | Message content |

## Response

### Success (200)

```json
{
  "answer": "The models with the longest context windows are...",
  "source": "playbook"
}
```

### Error (400)

```json
{
  "error": "Question is required"
}
```

### Error (500)

```json
{
  "error": "Groq API error: 429"
}
```

## Response Fields

| Field | Type | Description |
|---|---|---|
| `answer` | string | Markdown-formatted answer from Llama 3.3 70B |
| `source` | string | Source of the answer: `"playbook"`, `"web"`, or `"model"` |

### Source Values

| Value | Meaning | Display |
|---|---|---|
| `playbook` | Answer extracted from playbook content | Green badge |
| `web` | Answer used web search supplementally | Blue badge |
| `model` | Answer from Llama 3.3 70B training knowledge | Orange badge |

---

## Internal Pipeline

### 1. Query Rewriting

Uses `llama-3.1-8b-instant` (Groq) to generate 3 search queries from the user question.
- Resolves pronouns from last 4 conversation messages
- Uses different terminology in each query
- Expands acronyms
- Timeout: 5 seconds
- Fallback: original question if rewrite fails

### 2. Playbook Search

Each of 3 queries runs TF-IDF against `search-index.json` (~570 chunks):
- Title matched at 20x weight, description at 5x, body at 1x
- Top 5 results per query
- RRF merge (k=60) → top 4 results

### 3. Web Search

Always runs in parallel when `SERPER_API_KEY` is configured:
- Uses Serper.dev Google Search API
- Top 5 organic snippets
- Timeout: 5 seconds

### 4. Groq Inference

Model: `llama-3.3-70b-versatile`
- Temperature: 0.3
- Max tokens: 800
- Timeout: 15 seconds
- System prompt includes either (a) playbook + web context, or (b) simple instruction

### 5. Logging

Every response is logged to `CHAT_LOGS` KV namespace via `waitUntil`.

---

## CORS

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

Preflight (OPTIONS) returns 200 with CORS headers.

---

## Error Handling

| Scenario | Response | HTTP Status |
|---|---|---|
| No question | `{"error": "Question is required"}` | 400 |
| No GROQ_API_KEY | `{"error": "Groq API key not configured."}` | 500 |
| Groq API error | `{"error": "Groq API error: {status}"}` | 500 |
| Any exception | `{"error": "{message}"}` | 500 |

---

## Search Index

File: `public/search-index.json`

Auto-generated at build time by `scripts/build-search-index.mjs`. Contains ~570 entries:

- All .md/.mdx content from `src/content/docs/` (300-token chunks)
- Structured model data from `src/data/models.ts`
- Comparison chunks (top-5 by context, price, params)
- Each entry: `{ slug, title, description, chunk }`

### Build

```bash
node scripts/build-search-index.mjs
```

Runs automatically via `prebuild` script in `package.json`.

---

## Rate Limiting

No explicit rate limiting implemented. The Groq API has its own rate limits based on tier:

| Tier | Requests per minute |
|---|---|
| Free | ~30 RPM |
| Paid | Higher limits via API key tier |

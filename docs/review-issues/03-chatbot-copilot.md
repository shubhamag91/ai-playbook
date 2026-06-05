> **Related: Linear MOS-313** (Chatbot: proper RAG search backend). Complementary, not duplicate — MOS-313 owns retrieval *backend* quality (dense embeddings, hybrid search, reranking); this issue owns copilot *UX/prompt* (page-context, streaming, persistence, markdown, source badges). Note: query rewriting and RRF rank fusion are **already implemented** in `chat.js`, so they belong to neither issue's remaining scope.

## Goal

Upgrade the chatbot from a "RAG-over-docs bot" into a genuine **copilot** that is aware of where the user is, responds fast, and remembers the conversation across navigation.

## Why

The bot in `functions/api/chat.js` + `public/chat-widget.js` is competent but has several gaps that undercut the "premium AI playbook" positioning.

## Scope (each item is independently shippable)

### 1. Page-context awareness (#1 copilot gap)
The system prompt (`chat.js:146`) never tells the model what page the user is reading. Pass current URL / title / headings from the widget into the request and into the prompt so the bot can bias answers ("you're on the RAG page…"). Add a default **"Explain this page" / "Quiz me on this"** action when opened on a content page.

### 2. Streaming
No streaming today — the widget waits up to 15s (`chat.js:175`) behind three bouncing dots. Groq supports SSE. Stream the response to kill perceived latency.

### 3. Persist conversation across navigation
The widget re-`init()`s per page and resets `conversation = []` (`chat-widget.js:27`, `:188`). Clicking a link the bot provides wipes the chat. Persist to `sessionStorage`.

### 4. Replace the hand-rolled markdown parser
`chat-widget.js:94–186` is a ~90-line regex parser with stacked `<br>`-cleanup hacks; it will mangle nested lists, tables-in-lists, and code containing `|`. Swap for marked + DOMPurify (~10KB).

### 5. Bug fixes
- **Shift+Enter can't make a newline** — `chat-widget.js:326-328` fires `ask()` on any Enter. Gate on `!e.shiftKey`.
- **Source badge is a guess** — "contains any markdown link" → labeled "Playbook" (`chat.js:188`); a web URL can earn a green "Playbook" badge. Show the actual retrieved page titles as chips so the label means something.

### 6. (Discuss) Model mismatch
The bot runs **Llama 3.3 70B via Groq** (`chat.js:170`) on a site that recommends Claude/GPT/Gemini. Either move the headline experience to Claude/GPT, or explicitly own the open-model choice in the UI. Flagged for decision — not necessarily in this issue.

## Acceptance criteria

> **Status:** First batch shipped in commit `0d683bc` (page-context, persistence, source chips, Shift+Enter, quick actions). Streaming and the markdown-lib swap are deferred to follow-up changes; the model-choice question is open.

- [x] Bot receives and uses current-page context
- [ ] Responses stream token-by-token *(deferred — own change)*
- [x] Conversation survives page navigation within a session
- [x] Shift+Enter inserts a newline
- [ ] Markdown rendered by a vetted lib *(deferred — needs CDN/bundling decision)*
- [x] Source badge reflects actually-retrieved pages *(source chips)*

## References

- `functions/api/chat.js`
- `public/chat-widget.js`

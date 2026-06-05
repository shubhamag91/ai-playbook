## Goal

Flip the playbook from a "book you read" into a "toolkit you use" by embedding a **live API playground** — a panel where the user types a prompt, picks a model, hits **Run**, and sees a real completion. This is the single highest-leverage change for defeating the "boring book" syndrome.

## Why

Every existing interactive component (CostCalculator, ModelSelector, ModelMatrix, BenchmarkViz, Quiz) is a **lookup/filter** widget. None let the user *do AI*. The reader is always reading *about* the thing, never touching it.

We already have ~80% of the backend: the Cloudflare Pages Function in `functions/api/chat.js` already proxies to Groq with key handling, CORS, timeouts, and KV logging.

## Scope

- New Astro component (e.g. `src/components/Playground.astro`) with: prompt textarea, model dropdown, Run button, output area, token count + estimated cost (reuse pricing from `src/data/models.ts`).
- New/extended Cloudflare Function endpoint for a generic completion proxy (separate from the chatbot's RAG pipeline). Rate-limited "demo key" path so users without an API key still see it work.
- Embed it on the three highest-value pages:
  - `deep-dive/prompt-engineering.mdx` — A/B two prompts side by side, show token counts + cost
  - `deep-dive/rag-architecture.mdx` — paste a doc, ask a question, watch retrieval
  - Template pages (`resources/templates/*`) — a "Run this" button instead of copy-only

## Acceptance criteria

- [ ] A user can run a real completion from at least one content page without leaving the site
- [ ] Output shows token usage + estimated cost sourced from `models.ts`
- [ ] Demo-key path is rate-limited and works without the user supplying a key
- [ ] Mobile-friendly (stacks vertically, 44px targets)

## References

- `functions/api/chat.js` (existing Groq proxy plumbing)
- `src/data/models.ts` (pricing for cost estimate)
- Component pattern: any existing `src/components/*.astro`

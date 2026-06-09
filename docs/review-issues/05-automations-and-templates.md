## Goal

Deliver the "practical toolkit / automations" promise that the playbook currently makes but does not fulfill, and make the existing code templates trustworthy and runnable.

## Why

- **The promised "automations" don't exist.** n8n/Zapier are name-checked (`index.mdx:224`) but there is not a single automation recipe in the repo. The gap between "here's a list of tools" and "here's a working flow that summarizes your inbox" is the core value proposition of a *practical* toolkit.
- **Templates are presented as "production-ready" but contain outdated/broken code.** In `resources/templates/rag-system.mdx`:
  - Uses `claude-3-5-sonnet-20241022` (line 72) — old model, while the rest of the site is on Sonnet 4.6 / Opus 4.7.
  - Pinecone snippet uses the **deprecated v2 client** (`pinecone.init()`, `pinecone.Index()`, lines 255–256).
  - Embeddings use the **deprecated OpenAI v0 syntax** `openai_client.Embedding.create` (line 261).
  - `answer_with_memory` (line 293) references an undefined `answer` variable — the stubbed method throws `NameError` if run.
  - Misleading comment (lines 89–90): Chroma's `.add()` *is* computing real embeddings, not "simple text chunks."

## Scope

### A. New `automations/` section
3–5 copy-deploy recipes (n8n/Zapier JSON exports + screenshots + step-by-step):
- Inbox triage
- Meeting notes → action items
- RSS → digest
- Doc → flashcards

### B. Fix all templates
- Bring every code template to current model IDs.
- Make every template actually run end-to-end (fix the `answer_with_memory` stub, update Pinecone + OpenAI SDK calls, correct the embeddings comment).
- Add a "Run in playground" button (pairs with the API-playground issue).

## Acceptance criteria

> **Status:** Shipped. `resources/automations/` section live (overview + 4 recipes); all 4 templates fixed.

- [x] `automations/` section live with ≥3 working, copy-deploy recipes *(4: inbox triage, meeting notes→actions, RSS→digest, doc→flashcards, + overview with the reusable n8n AI node)*
- [x] Every template uses current model IDs *(claude-sonnet-4-6)* and runs without errors *(answer_with_memory stub fixed)*
- [x] Pinecone/OpenAI snippets use current SDK syntax *(Pinecone v3 `Pinecone()`, OpenAI v1 `embeddings.create`)*
- [x] Misleading "simple text chunks" comment corrected

### Optional follow-up
- Add "Run in playground" buttons to templates (Playground component exists; not yet embedded per-snippet)

## References

- `src/content/docs/resources/templates/` (esp. `rag-system.mdx`)
- `src/content/docs/index.mdx:224`

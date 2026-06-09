## Status: re-scoped after audit (most of the original premise didn't hold)

The original issue assumed the provider sections were redundant sprawl and the model guides were duplicates. A direct audit of the repo disproved most of that. This doc now records the findings and the **narrow, real** action that came out of it.

## Audit: original claims vs. reality

| Original claim | Reality in the repo |
|---|---|
| "Merge the two duplicate model guides" | **Not duplicates.** `decide/models/guide` = *Models Decision Guide* (which LLM to use); `research/models/guide` = *Open Source AI & Self-Hosting* (run locally). Different jobs — merging would be wrong. |
| "Interview Prep is in two homes (Learn + Resources)" | **One home.** Only one sidebar block exists (`astro.config.mjs`, under Resources). The CLAUDE.md text claiming both was stale. |
| "Collapse the ~35-page provider sprawl" | Those sections were **deliberately built recently** (Linear MOS-371/372/373, "Add dedicated <vendor> section, 9 pages", all Done). Collapsing them fights intentional work. |
| "Provider model pages just duplicate models.ts" | They are **rich, hand-curated reference docs** — API IDs, batch pricing, max-output, knowledge cutoffs, extended vs. adaptive thinking, deprecation/migration tables, cost-at-scale. `models.ts` holds none of that. Rendering them from `models.ts` would *strip* detail. |

**Conclusion:** there is no large consolidation to do. The pages are legitimate. The page-collapsing / guide-merging / interview-prep parts of the original issue are dropped.

## The one real risk → the one real action

The provider pages *do* restate each model's headline **pricing + context window**, which can silently drift from `models.ts` (the single source of truth established in issue #2). The fix is enforcement, not componentization:

- **Added `scripts/check-model-consistency.mjs`** — for every current model whose name appears on its vendor page, it verifies the page contains that model's canonical price tokens + context from `models.ts`. Warns by default; `--strict` fails.
- Wired into `prebuild` (non-strict, won't break deploys) and exposed as `npm run check:models` (strict, for CI).

## Drift the guard found on first run — reconciled (web-verified)

Both flags were **real**, and web verification showed `models.ts` was the wrong side in both cases (the hand-curated provider pages were correct):

- **OpenAI · GPT-5.4 nano** — verified **$0.20/$1.25**. `models.ts` had `~$0.15/~$0.60` → corrected to match the page + sources.
- **Google · Gemini 3.5 Flash** — verified **$1.50/$9**. `models.ts` had `$0.15/$0.60`, which is actually the *cached-input* rate ($0.15/M, 90% off) mistaken for the standard rate → corrected to `$1.50/$9` (cached rate noted in the model's `notes`).

Strict check (`npm run check:models`) now passes with no drift. Corrections propagate to the homepage tiers and Cost Calculator (both render from `models.ts`).

### Still open (separate, fuzzier — naming, not price)
The deepmind page and sources call the flagship **"Gemini 3.1 Pro"** ($2/$12), but `models.ts` names it **"Gemini 3.5 Pro"** (same $2/$12). The price agrees; the version label doesn't. Renaming touches `models.ts`, the homepage comparison, and the deepmind page together, so it's left as a deliberate follow-up rather than folded in here.

## Acceptance criteria

- [x] Drift between provider pages and `models.ts` is detectable automatically
- [x] Check runs in prebuild (warn) and is available strict for CI (`npm run check:models`)
- [x] Rich provider pages preserved (no detail loss, no page deletions)
- [x] Reconcile the two drifts the guard found (GPT-5.4 nano, Gemini 3.5 Flash) — web-verified, `models.ts` corrected; strict check passes
- [ ] (Follow-up, optional) Reconcile Gemini Pro version naming: `models.ts` "Gemini 3.5 Pro" vs sources/page "Gemini 3.1 Pro"

## References

- `scripts/check-model-consistency.mjs`, `package.json` (prebuild + `check:models`)
- `src/data/models.ts` (canonical), `src/content/docs/{claude,openai,deepmind,deepseek}/models.md`

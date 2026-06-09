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

## Drift the guard found on first run (needs reconciliation — data decision)

`models.ts` is canonical, so these pages should be aligned to it (or `models.ts` corrected):

- **OpenAI · GPT-5.4 nano** — page says `$0.20/$1.25`; `models.ts` says `~$0.15/~$0.60`.
- **Google · Gemini 3.5 Flash** — page says `$1.50/$9`; `models.ts` says `$0.15/$0.60` (~10× gap). The deepmind page also uses different version naming ("Gemini 3.1 Pro", "Gemini 3 generation") than `models.ts` ("Gemini 3.5 Pro/Ultra/Flash").

These are left for a human call (which number is intended), exactly like the DeepSeek pricing reconciliation in issue #2.

## Acceptance criteria

- [x] Drift between provider pages and `models.ts` is detectable automatically
- [x] Check runs in prebuild (warn) and is available strict for CI (`npm run check:models`)
- [x] Rich provider pages preserved (no detail loss, no page deletions)
- [ ] Reconcile the two drifts the guard found (GPT-5.4 nano, Gemini 3.5 Flash) — pending a data decision

## References

- `scripts/check-model-consistency.mjs`, `package.json` (prebuild + `check:models`)
- `src/data/models.ts` (canonical), `src/content/docs/{claude,openai,deepmind,deepseek}/models.md`

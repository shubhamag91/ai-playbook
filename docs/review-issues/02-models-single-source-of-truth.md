## Goal

Make `src/data/models.ts` the **single source of truth** for all model facts, render the homepage comparison table from it, and fix the factual contradictions that currently appear on the most-viewed page.

## Why — these are live contradictions on the homepage

`src/content/docs/index.mdx` contradicts `src/data/models.ts` (and itself) within one scroll:

| Claim | Line 48 / models.ts | Comparison table (lines 161–168) |
|---|---|---|
| Claude Opus 4.7 context | **1M** | **"200K (Opus: 400K)"** |
| GPT-5.5 context | **1M** (models.ts:73) | **128K** |
| GPT-5.5 pricing | **$5/$30** (models.ts:73) | **$2/$8** |
| Gemini version | "Gemini 3.5 Pro" (line 91) | "Gemini 3.1 Pro" (line 161) |

Also: the table's **"Claude reasoning model: ❌"** (line 167) is wrong — `models.ts:46` ships a "Claude Opus 4.7 (Thinking)" entry and describes "Adaptive thinking". Extended thinking *is* Claude's reasoning mode.

A reader comparing models on the flagship table is reading numbers that disagree with the model guide one screen up. This is a credibility leak and is cheap to fix.

## Scope

- Replace the hand-typed comparison table in `index.mdx` with a component that renders from `models.ts` (extend/reuse `ModelCompare.astro`).
- Reconcile all conflicting numbers to one canonical value per field in `models.ts`.
- Fix the Claude "no reasoning ❌" cell.
- Surface a visible **"verified as of <date>"** stamp per model (we already have `lastUpdated` / `nextVerificationDue` frontmatter — promote this onto the model data itself).
- Audit speculative SKUs (GPT-5.5, Opus 4.7, Gemini 3.5 Pro, DeepSeek V4, Veo 3.1) for internal consistency.

## Acceptance criteria

- [ ] No model fact appears in more than one hand-edited location
- [ ] Homepage table renders from `models.ts`
- [ ] All four contradictions above resolved; Claude reasoning cell corrected
- [ ] Per-model "verified as of" date is visible to readers

## References

- `src/content/docs/index.mdx` (lines 48, 91, 161–172)
- `src/data/models.ts`
- `src/components/ModelCompare.astro`

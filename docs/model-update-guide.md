# Model Update Guide

When a new AI model is released or an existing model is updated (pricing change, context increase, deprecation), follow this checklist to ensure the playbook stays consistent.

## Step-by-Step Process

### 1. Update the canonical data source

**`src/data/models.ts`** — The single source of truth for all model data. Every page and component that displays model information should ultimately reference this file.

- [ ] Update `name`, `company`, `latest` flags
- [ ] Update `context` (in tokens)
- [ ] Update `pricing` (display string) and `inputPrice`/`outputPrice` (numeric)
- [ ] Update `capabilities` and `notes`
- [ ] If model replaces an older one, mark old as `latest: false`
- [ ] Update any `calcClass`, `calcDisplayName`, `calcRate` fields for CostCalculator

### 2. Update dependent data files

| File | What to check |
|---|---|
| `src/data/benchmarks.ts` | Benchmark scores for new/updated model |
| `src/data/capabilities.ts` | Capability ratings (1-5 scale) |
| `src/data/trends.ts` | Add news entry. Rotate out entries older than 3 months |

### 3. Rebuild (these update automatically)

- [ ] `npm run build` — regenerates `public/search-index.json`
- [ ] `decide/models/guide.mdx` — uses `ModelCompare` component which reads from `models.ts`

### 4. Update hardcoded pages (if not yet wired to models.ts)

| Page | Section | What to update |
|---|---|---|
| `index.mdx` (Welcome) | Each provider's "Model Tiers" section | Name, pricing, context, note text |
| `reference/cheatsheets/llm-primer.md` | Model comparison table | Name, pricing, context |
| `reference/cheatsheets/tools-comparison.md` | Tool tables | If model listed as a tool |
| `reference/cheatsheets/ai-tools-landscape.md` | Tool listings | If model listed |
| `decide/tools/guide.mdx` | Tool tables | If model listed |
| `research/whats-new.mdx` | Release announcement | Add new section with details |

### 5. Update platform-specific pages

| Section | File | What to update |
|---|---|---|
| Claude | `claude/models.md`, `claude/index.mdx` | Model specs table, product directory, decision tree |
| OpenAI | `openai/models.md`, `openai/index.mdx` | Same |
| DeepMind | `deepmind/models.md`, `deepmind/index.mdx` | Same |
| DeepSeek | `deepseek/models.md`, `deepseek/index.mdx` | Same |

### 6. Update presentations (if used)

| File | What to check |
|---|---|
| `presentation/ai-playbook-intro.pptx` | Slide content with model names/pricing |
| `presentation/*.pptx` | Any other slide decks |

### 7. Verify

- [ ] `npm run build` — no errors
- [ ] `npm run dev` — visually check pages with updated model
- [ ] Check all pages from the checklist above — data matches official sources
- [ ] Update `lastUpdated` on all modified pages
- [ ] Commit with descriptive message

## Pricing Sources

| Provider | Official Pricing URL |
|---|---|
| Anthropic | https://docs.anthropic.com/en/docs/about-claude/pricing |
| OpenAI | https://openai.com/api/pricing/ |
| Google DeepMind | https://ai.google.dev/pricing |
| DeepSeek | https://api-docs.deepseek.com/quick_start/pricing |

## Model Spec Sources

| Provider | Official Models URL |
|---|---|
| Anthropic | https://docs.anthropic.com/en/docs/about-claude/models |
| OpenAI | https://platform.openai.com/docs/models |
| Google DeepMind | https://ai.google.dev/gemini-api/docs/models |

## Key Data Points Per Model

| Datapoint | Where it lives | Example |
|---|---|---|
| Model name | models.ts, all pages | "Claude Opus 4.7" |
| API pricing | models.ts, all pages | $5/$25 per 1M |
| Context window | models.ts, all pages | 1M tokens |
| Max output | Platform model pages | 128K tokens |
| Capabilities | models.ts, capabilities.ts | "reasoning, coding, vision" |
| Knowledge cutoff | Platform model pages | "Jan 2026" |
| Benchmark scores | benchmarks.ts | "93.7% HumanEval" |
| Best for / use case | models.ts | "Complex reasoning, agentic coding" |

## Recent Model Updates (for reference)

| Date | Change | Files touched |
|---|---|---|
| May 2026 | Gemini 3.1→3.5, new pricing for all providers | 10+ files |
| May 2026 | GPT-5.5 pricing fix ($2→$5, added GPT-5.4 tiers) | 5+ files |
| May 2026 | Claude Opus 4.7 pricing fix ($15→$5, 400K→1M) | 5+ files |
| May 2026 | DeepSeek V4 Pro pricing update | 3+ files |

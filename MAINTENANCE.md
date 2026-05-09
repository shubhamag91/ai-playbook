# Maintenance & Fact-Checking

How the AI Playbook stays accurate and up to date.

---

## Content Tier System

Pages are categorized by how quickly their content becomes outdated and the impact of inaccuracy.

| Tier | Review Cadence | Examples | Accuracy Impact |
|---|---|---|---|
| **Tier 1** | Monthly | Pricing tables, model comparisons, tool guides | High — wrong info causes real decisions |
| **Tier 2** | Quarterly | Deep dives, cheatsheets, case studies | Medium — conceptual content ages slower |
| **Tier 3** | Annual | Glossary, history, principles | Low — foundational knowledge rarely changes |

---

## Fact-Check Sources

Use these canonical sources for verification. **Never** rely on blog posts, social media, or AI-generated summaries.

### Pricing

| Provider | Official Source | What to Check |
|---|---|---|
| Anthropic | https://docs.anthropic.com/en/docs/about-claude/pricing | Per-token rates for all Claude models |
| OpenAI | https://openai.com/api/pricing/ | GPT-4o, GPT-5.5, o-series pricing |
| Google | https://ai.google.dev/pricing | Gemini model tiers |
| DeepSeek | https://api-docs.deepseek.com/ | V4 and Flash pricing |
| Groq | https://console.groq.com/docs/pricing | LPU inference pricing |

### Model Specifications

| Provider | Official Source | What to Check |
|---|---|---|
| Anthropic | https://docs.anthropic.com/en/docs/about-claude/models | Context windows, capabilities |
| OpenAI | https://platform.openai.com/docs/models | Model variants, max tokens |
| Google | https://ai.google.dev/gemini-api/docs/models | Context windows, multimodal support |
| Meta (Llama) | https://llama.meta.com/ | Open model specs, licenses |
| Hugging Face | https://huggingface.co/models | Open model cards, benchmarks |

### Benchmarks

| Benchmark | Official Source |
|---|---|
| HumanEval | https://github.com/openai/human-eval |
| MATH | https://github.com/hendrycks/math |
| MMLU | https://github.com/hendrycks/test |
| GPQA | https://github.com/idavidrein/gpqa |
| SWE-bench | https://www.swebench.com/ |
| Papers with Code | https://paperswithcode.com/ |

### Release Dates & News

| Source | What It's Good For |
|---|---|
| Vendor blogs (Anthropic, OpenAI, Google, Meta) | Official release announcements |
| TechCrunch / The Verge | Timely coverage of launches |
| Simon Willison's blog | Detailed technical analysis |
| Hacker News | Community discussion, caveats |

---

## Citation Format

Annotate factual claims with inline comments so maintainers can verify quickly.

### Recommended Format

```
Claude Sonnet costs $3/1M input tokens <!-- source: https://docs.anthropic.com/en/docs/about-claude/pricing -->
```

### For Comparative Claims

```
DeepSeek V4 is 10-50x cheaper than Claude Opus
<!-- source: DeepSeek $0.55/1M vs Claude Opus $15/1M per https://api-docs.deepseek.com/ and https://docs.anthropic.com/en/docs/about-claude/pricing -->
```

### For Benchmarks

```
Claude 3.5 Sonnet scores 93.7% on HumanEval
<!-- source: https://paperswithcode.com/sota/code-generation-on-humaneval -->
```

---

## Monthly Review Checklist

Run this for Tier 1 pages at the start of each month (or when the weekly checklist [MOS-252] flags a change).

1. **Pricing pages** (`/reference/model-specs`, `/decide/cost-calculator`, `/decide/tools/guide`):
   - [ ] Check Anthropic pricing page — any changes?
   - [ ] Check OpenAI pricing page — any changes?
   - [ ] Check DeepSeek pricing page — any changes?
   - [ ] Verify all prices in model-specs.md match official sources
   - [ ] Update cost-calculator.mdx if rates changed

2. **Model pages** (`/decide/models/guide`, `/research/model-releases`):
   - [ ] Any new model releases this month?
   - [ ] Any deprecated or renamed models?
   - [ ] Context windows still accurate?
   - [ ] Capability descriptions still hold?

3. **Tool pages** (`/decide/tools/guide`, `/tools/index`):
   - [ ] Verify Claude Code pricing is still accurate
   - [ ] Check Cursor pricing tier hasn't changed
   - [ ] Any new major tools to add?
   - [ ] Any tools that should be marked deprecated?

---

## What "Ready for Review" Means

Before marking a PR as ready:

1. Every factual claim in Tier 1 pages has a `<!-- source: -->` comment
2. All prices are checked against the official pricing page (not resellers or blogs)
3. Model names include the specific version (e.g., "Claude Sonnet 4.6" not just "Claude")
4. Benchmark scores link to the official leaderboard or paper
5. Dated claims are prefixed with the date (e.g., "As of May 2026: ...")
6. External links are clicked and verified to resolve to the expected page
7. `lastUpdated` is set to today's date

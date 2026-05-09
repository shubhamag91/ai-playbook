# Contributing to AI Playbook

Thanks for helping keep this knowledge base accurate and useful! 🙌

---

## 🤔 How to Report Outdated Info

**Easiest way:** Every page has a "Report Outdated" button in the footer.

**Or:** Create a [GitHub issue](https://github.com/shubhamag91/ai-playbook/issues) with:
- Page URL
- What's outdated
- What should be correct (with source)

**Response time:** 48 hours

---

## 🔧 How to Contribute Content Changes

### Before You Start
1. **Check existing issues** — Your idea might already be in progress
2. **Small fixes?** Just submit a PR
3. **Big changes?** Open an issue first to discuss

### Submission Checklist
- [ ] Factual claims verified against current sources (< 6 months old)
- [ ] Links are working and relevant
- [ ] Writing matches existing tone (clear, beginner-friendly, opinionated)
- [ ] No major scope creep (one page, one section, or one term)
- [ ] Formatted correctly (Markdown, proper YAML frontmatter)

### Writing Guidelines

#### Tone
- **Friendly, not corporate** — "This tool costs $20/month" not "This tool is available at a price point of $20/month"
- **Opinionated where helpful** — "Use RAG if your data changes weekly" not "RAG can be used when..."
- **Honest about trade-offs** — "Gemini has better context window but worse coding" not just "Gemini is powerful"
- **Beginner-friendly** — Explain jargon, use examples

#### Structure (for new pages)
```yaml
---
title: Page Title
description: One-line summary for SEO
sidebar:
  order: 2
lastUpdated: 2026-05-08
---

## Introduction
Brief intro paragraph (2-3 sentences).

## Main Content
Clear sections with headers.

## Key Takeaway
Bullet point summary.

## Resources
- [Source Name](https://...)
- [Related Page](/link)
```

#### Frontmatter Rules
- `title` — Required, used in nav
- `description` — Required, 60-160 chars (SEO)
- `sidebar.order` — Required, controls nav position (lower = higher)
- `lastUpdated` — Required, YYYY-MM-DD format
- `tags` — Recommended, list of keywords for auto-generated related links
- `sidebar.badge` — Optional, for "New" or "Updated" badges

**Example:**
```yaml
---
title: My New Page
description: A short summary for SEO and search results.
sidebar:
  order: 3
tags:
  - reference
  - guide
lastUpdated: 2026-05-10
---
```

### Fact-Checking Requirements

**All factual claims must cite a source.** See [MAINTENANCE.md](MAINTENANCE.md) for the full source reference table and citation format.

Before submitting, verify:

| What | Where to Check | Critical For |
|---|---|---|
| Pricing | Vendor's official pricing page (not blogs, not social media) | Tier 1 pages |
| Model names | Official release notes or model cards | All model references |
| Benchmarks | Papers with Code or official paper | Comparison tables |
| Capabilities | Vendor documentation | Deep dives, feature lists |
| Dates | Release announcements | History, timeline pages |
| External links | Click each one — verify it resolves | All pages |

**Example:**
```
❌ WRONG: "Claude is the best model"
✅ RIGHT: "Claude 3.5 Sonnet scores 93.7% on HumanEval (coding benchmark)"
<!-- source: https://paperswithcode.com/sota/code-generation-on-humaneval -->

❌ WRONG: "It costs $3 per million tokens"
✅ RIGHT: "Claude Sonnet costs $3/1M input tokens"
<!-- source: https://docs.anthropic.com/en/docs/about-claude/pricing -->
```

### PR Format

Title: `fix: Clarify Flux pricing` or `feat: Add benchmarks page`

Description:
```markdown
## What changed?
Clarified that Flux can be used locally (free) or via API (paid).

## Why?
Original text was misleading about cost structure.

## Sources
- https://blackforestlabs.com/flux
- https://www.bentoml.com/blog/...

## Closes
Fixes #123
```

---

## 📊 Page Maintenance Priorities

### If you're submitting updates:

**Tier 1 (Update immediately if wrong):**
- `/tools` — Pricing, capabilities, new tools
- `/open-source` — Model list, benchmarks
- `/glossary` — Definitions if inaccurate

**Tier 2 (Update monthly):**
- `/cheatsheets` — Benchmark changes, new patterns
- `/guides` — Framework updates, new best practices

**Tier 3 (Update quarterly or as needed):**
- `/history` — Append-only content
- `/principles` — Timeless content

---

## 🚀 Submission Process

### Step 1: Fork & Branch
```bash
git clone https://github.com/shubhamag91/ai-playbook.git
git checkout -b fix/issue-name
```

### Step 2: Make Changes
```bash
npm run dev  # Preview at localhost:4321
# Edit files
# Verify changes in browser
```

### Step 3: Commit & Push
```bash
git add .
git commit -m "fix: Your description"
git push origin fix/issue-name
```

### Step 4: Open PR
- Link to Linear issue (if exists)
- Reference any GitHub issues
- Include fact-check summary

### Step 5: Review & Merge
- Maintainer reviews within 1 week
- May request changes (especially fact-checking)
- Once approved, auto-deploys to live site (within 30s)

---

## ❌ What NOT to Do

- Don't submit content that's more than 6 months old
- Don't change tone/style without discussion
- Don't add unsourced claims
- Don't create new pages without opening an issue first
- Don't submit personal opinions as facts (unless clearly marked as opinion)

---

## 🏆 Recognition

Contributors are recognized in:
1. Commit message (automatic GitHub credit)
2. [CONTRIBUTORS.md](./CONTRIBUTORS.md) (for significant contributions)
3. /updates changelog (for major content additions)

---

## ❓ Questions?

- Check the [MAINTENANCE.md](./MAINTENANCE.md) for operational details
- Check the [ROADMAP.md](./ROADMAP.md) for big-picture plans
- Open a [GitHub Discussion](https://github.com/shubhamag91/ai-playbook/discussions)

---

## 📝 Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/).

**TL;DR:** Be respectful, assume good faith, focus on improving the resource together.

---

**Happy contributing!** 🚀


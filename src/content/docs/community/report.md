---
title: Report Outdated Information
description: How to report inaccurate, incomplete, or outdated content in the AI Playbook
sidebar:
  order: 2
lastUpdated: 2026-05-08
---

# Report Outdated Information

Found something that's wrong, outdated, or incomplete? Help us keep the Playbook accurate and current.

---

## What to Report

### Outdated Content
- Product releases, pricing, or capabilities that have changed
- Links that no longer work or point to deprecated resources
- Best practices that are no longer recommended
- Tools or services that are discontinued

**Example:** "The Claude 3 Opus pricing section still shows the old rates; Claude 4 Opus launched in May 2026 with new pricing"

### Factual Errors
- Incorrect information about how models work
- Wrong numbers or statistics
- Misattributed quotes or ideas
- Claims not supported by evidence

**Example:** "The transformer section claims attention is O(n) but it's actually O(n²)"

### Missing Context
- Important caveats or limitations not mentioned
- Relevant recent developments not included
- Alternative approaches not discussed
- Trade-offs that should be highlighted

**Example:** "The RAG section doesn't mention prompt caching, which is now a critical optimization in production systems"

### Unclear Explanations
- Confusing or jargon-heavy passages
- Examples that don't match the explanation
- Broken formatting or rendering
- Missing code examples or diagrams

**Example:** "The KV Cache explanation is confusing; could use a concrete example with actual numbers"

---

## How to Report

### Option 1: GitHub Issues (Preferred)

1. Go to [GitHub Issues](https://github.com/shubhamag91/ai-playbook/issues)
2. Click "New Issue"
3. Use this template:

```
**Page:** [URL or title]
**Type:** Outdated / Incorrect / Missing / Unclear

**What's wrong:**
[Describe the issue clearly]

**What should it say:**
[Provide the correction or additional context]

**Evidence:**
[Link to official docs, research, release notes, etc.]

**When I noticed:** [Today's date or approximate time]
```

4. Click "Submit new issue"

### Option 2: Email

Email details to **soumya.s.agarwal@gmail.com** with:
- Page title or URL
- What's inaccurate
- What the correction should be
- Any links to supporting evidence

**Response time:** 48 hours (typically 24)

---

## What Happens After You Report

### 1. Acknowledgment
You'll receive confirmation that we received your report.

### 2. Verification
We verify the claim using:
- Official documentation
- Release announcements
- Research papers or articles
- Testing if code examples are affected

### 3. Triage
- **Critical** (factually wrong, breaks code examples) → Fixed within 48 hours
- **High** (outdated pricing/capabilities, missing recent launches) → Fixed within 1 week
- **Medium** (unclear phrasing, minor context missing) → Fixed within 2 weeks
- **Low** (minor formatting, nitpicks) → Fixed when batching updates

### 4. Update
The page is corrected and deployed to production.

### 5. Credit (If You Want)
We'll credit you in the commit message:
```
"Fix: Update Claude pricing to reflect May 2026 rates (thanks @yourname)"
```

Just let us know if you'd prefer anonymous.

---

## Common Issues We Get (And Love)

### "The Tool X section is outdated"
We know! We update this monthly based on releases. File a GitHub issue with the specific change and we'll prioritize it.

### "You got the technical details wrong on Y"
Please report it. We have technical reviewers who verify deep-dive content, but mistakes slip through. Evidence links (official docs, papers) help us fix faster.

### "This contradicts what I've learned / seen in practice"
That's valuable! We try to stay current, but your real-world experience often catches edge cases or shifts we missed. Tell us what you've seen.

### "Why is the link broken?"
Websites reorganize. If a link is broken, report it with the page it's on and we'll find the right new link or remove the reference.

---

## Reporting Guidelines

### Be Specific
❌ **Bad:** "This is wrong"  
✅ **Good:** "The RAG section claims vector databases are 'always better than keyword search' but in practice BM25 wins for exact-match queries"

### Provide Context
❌ **Bad:** "Update this"  
✅ **Good:** "Claude Opus pricing changed in the May 2026 release (see release notes). Update should show below 3 / below 15 instead of 2 / 10"

### Link to Evidence
- Official release notes
- Product documentation
- Research papers
- News articles (with date)
- Your own testing (with steps to reproduce)

### Be Patient
We're a small team maintaining a large playbook. Critical fixes get priority. Minor nits get batched in monthly updates.

---

## Fact-Checking Standards

We verify claims against:
1. **Official sources** — Model cards, API docs, announcements
2. **Current research** — ArXiv papers, published benchmarks
3. **Multiple sources** — Not relying on a single claim
4. **Testing** — Running code examples when relevant
5. **Community** — Feedback from people building with these tools

If you see something that doesn't match these standards, report it.

---

## What Won't Get Fixed

- Opinion disagreements ("I think X is better") — send to discussions instead
- Requests to link to your own product/blog
- Typos in quoted material (we quote verbatim)
- Very minor formatting (extra space, capitalization) — batch updates only

---

## Questions?

- **GitHub Discussions:** Ask on [GitHub Discussions](https://github.com/shubhamag91/ai-playbook/discussions)
- **Email:** soumya.s.agarwal@gmail.com
- **Emergency:** File a GitHub issue labeled `[urgent]`

Thanks for helping keep the Playbook accurate! 🙏

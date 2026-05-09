---
title: Help Wanted
description: Well-scoped tasks for first-time contributors — pick one and start contributing.
sidebar:
  order: 4
tags:
  - community
lastUpdated: 2026-05-10
nextVerificationDue: 2026-08-08
---

# Help Wanted

Well-scoped tasks suitable for first-time contributors. Check the [`help wanted`](https://github.com/shubhamag91/ai-playbook/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) and [`good first issue`](https://github.com/shubhamag91/ai-playbook/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) labels on GitHub for the latest list.

---

## Content Tasks

### Verify a Pricing Table
Pick one provider (Anthropic, OpenAI, Google, DeepSeek). Check their official pricing page against the data in `/reference/model-specs.md`. Submit a PR if anything changed.

**Files:** `src/content/docs/reference/model-specs.md`  
**Time:** ~15 minutes  
**Skill:** Web research, Markdown

### Update a Cheatsheet
Add a new Q&A pair or update an existing one in the interview prep cheatsheets.

**Files:** `src/content/docs/reference/cheatsheets/`  
**Time:** ~30 minutes  
**Skill:** Writing, Markdown

### Write a Glossary Term
Add a new term to the glossary. Pick a term not already covered, write a clear explanation with examples.

**Files:** `src/content/docs/reference/glossary.mdx`  
**Time:** ~20 minutes  
**Skill:** Technical writing

---

## Technical Tasks

### Fix a CSS Bug
Check for layout issues — dark/light mode inconsistencies, mobile breakpoints, or alignment problems.

**Files:** `src/components/*.css`  
**Time:** ~15 minutes  
**Skill:** CSS

### Improve Component Accessibility
Add `aria-label`, keyboard event handlers, or focus management to an interactive component.

**Files:** `src/components/`  
**Time:** ~30 minutes  
**Skill:** HTML, accessibility

### Add to the Trend Tracker
Add a new trending topic to the data file at `src/data/trends.ts`. Include a title, description, category, and link to the relevant page.

**Files:** `src/data/trends.ts`  
**Time:** ~10 minutes  
**Skill:** Data entry

---

## How to Get Started

1. Pick a task from above or find one labeled [`good first issue`](https://github.com/shubhamag91/ai-playbook/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
2. Read the [Contributing Guide](/community/contributing) for setup and workflow
3. Open a PR with your changes
4. Add yourself to [`contributors.ts`](https://github.com/shubhamag91/ai-playbook/blob/main/src/data/contributors.ts) to get listed on the [Contributors page](/community/contributors)

Questions? Open an issue or ask in the PR comments.

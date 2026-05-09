---
title: Contributing Guide
description: How to contribute content, report issues, and help maintain the AI Playbook knowledge base.
sidebar:
  order: 1
tags:
  - community
lastUpdated: 2026-05-08
nextVerificationDue: 2026-08-06
---

# Contributing Guide

The AI Playbook is community-driven. Contributions are welcome — whether corrections, new content, or improvements.

---

## Ways to Contribute

### 1. Report Issues (Easiest)

Found something outdated or wrong? Report it:

- **On any page:** Click "Report Outdated" button (coming soon)
- **On GitHub:** [Open an issue](https://github.com/shubhamag91/ai-playbook/issues)
- **Via email:** [shubhamag91@gmail.com](mailto:shubhamag91@gmail.com)

Include: What's wrong, where it is, why it's wrong.

**Response time:** 48 hours

---

### 2. Submit a Pull Request (Medium)

For small fixes (typos, factual corrections, minor improvements):

#### Step 1: Fork & Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/ai-playbook.git
cd ai-playbook
git checkout -b fix/your-fix-name
```

#### Step 2: Make Changes

Edit files in `src/content/docs/`. See [File Structure](#file-structure) below.

```bash
# Run dev server to see changes
npm run dev
# Visit http://localhost:4321
```

#### Step 3: Commit

```bash
git add -A
git commit -m "Fix: Brief description of fix"
git push origin fix/your-fix-name
```

#### Step 4: Open PR

- Go to GitHub
- Click "Compare & pull request"
- Describe what you fixed and why
- Submit

**Review time:** 3-5 days

---

### 3. Write New Content (Medium-Large)

Want to add a new page or section? Create a discussion first:

- **[Open an issue](https://github.com/shubhamag91/ai-playbook/issues/new?template=02-content.yml)** — propose your idea
- **Wait for feedback** — make sure it fits the playbook vision
- **Write the content** — follow [Style Guide](#style-guide) below
- **Submit a PR** — include your new file(s)

New content typically focuses on:
- New deep-dives on emerging topics (multimodal AI, real-time agents, etc.)
- Case studies from different domains
- New decision guides (e.g., "How to choose a vector database")
- Expanded reference materials

---

## File Structure

All content lives in `src/content/docs/`:

```
src/content/docs/
├── deep-dive/          # Technical deep-dives (how things work)
├── decide/             # Decision guides (how to choose)
├── reference/          # Reference materials (glossary, benchmarks)
├── research/           # Research & trends (what's new)
├── resources/          # Case studies, templates
├── learn/              # Learning paths (by audience)
├── start/              # Quick starts
└── community/          # Contributing, feedback (this section)
```

---

## Creating a New Page

### File Format

All pages are MDX (Markdown + React components). Start with frontmatter:

```yaml
---
title: Your Page Title
description: One-line summary for SEO
sidebar:
  order: 1              # Position in sidebar (lower = higher)
lastUpdated: 2026-05-08
---

import { Card, CardGrid } from '@astrojs/starlight/components';
import Breadcrumb from '../../../components/Breadcrumb.astro';

<Breadcrumb />

# Your Page Title

Your content here...
```

### File Naming

- Use **kebab-case**: `my-new-guide.mdx`
- Match to directory: `/deep-dive/my-topic.mdx` not `/my-topic.mdx`

### Components Available

Use these Starlight components for rich formatting:

```mdx
import { Card, CardGrid, Badge } from '@astrojs/starlight/components';

<Card title="Card Title" icon="user">
  Card content here.
</Card>

<CardGrid>
  <Card title="Card 1" icon="star">Text</Card>
  <Card title="Card 2" icon="target">Text</Card>
</CardGrid>

<Badge text="New" variant="tip" />
```

---

## Style Guide

### Writing Principles

1. **Clear > Pretty.** Readable text beats fancy formatting.
2. **Short > Long.** Sentence length ~15 words. Paragraph length ~3 sentences.
3. **Specific > Generic.** "Use Claude for reasoning tasks" not "Use AI."
4. **Practical > Theoretical.** Include code, examples, real-world cases.
5. **Current > Timeless.** Update content regularly. Note the date it was written.

### Formatting Standards

- **Headings:** Use `#` (H1), `##` (H2), `###` (H3). Max 3 levels deep.
- **Lists:** Use bullets for unordered, numbers for ordered. Max 5 items per list.
- **Bold:** For key terms, acronyms first mention, emphasis.
- **Code blocks:** Use triple backticks with language: ` ```python `
- **Links:** Use relative paths: `[text](/deep-dive/rag-architecture)`

### Examples

**Good:**
```
## How RAG Works

RAG adds documents to prompts. Three steps:

1. **Retrieve** — search for relevant docs
2. **Augment** — add docs to prompt
3. **Generate** — LLM answers with context
```

**Avoid:**
```
## The Comprehensive System of Retrieval-Augmented Generation

The concept of retrieval-augmented generation, which can be understood as the process of...
```

### Tone

- Friendly, direct, conversational
- Assume reader knows AI basics, not deep expertise
- Use "you/we" not "one" or passive voice
- Avoid jargon without explanation

---

## Fact-Checking

Before submitting, verify:

- **Current as of May 2026?** Update `lastUpdated` date
- **Accurate?** Check benchmarks, pricing, capabilities against official sources
- **Complete?** Does it answer the question/solve the problem?
- **Linked?** Does it reference related pages? Use breadcrumbs.

For claims about models, link to official documentation:
- [Claude docs](https://docs.anthropic.com)
- [OpenAI docs](https://platform.openai.com/docs)
- [Google AI docs](https://ai.google.dev)

---

## PR Checklist

Before submitting:

- [ ] Page has proper frontmatter with `lastUpdated` date
- [ ] Content follows style guide (clear, practical, specific)
- [ ] All links are relative paths and working
- [ ] Code examples are tested and correct
- [ ] No typos or formatting issues
- [ ] Claim citations included (links to sources)
- [ ] Related pages are linked in "See Also" section

---

## What Gets Merged

✅ **Will be merged:**
- Factual corrections (typos, wrong dates, broken links)
- Clarifications (explaining something better)
- New deep-dives on emerging topics
- Case studies with real metrics
- Improvements to existing content

❌ **Won't be merged:**
- Promotional content (linking to your startup)
- Opinion without evidence
- Very short additions that don't add value
- Duplicate content
- Large changes without discussion first

---

## Getting Help

**Questions?**
- [Open an issue](https://github.com/shubhamag91/ai-playbook/issues/new)
- Email: [shubhamag91@gmail.com](mailto:shubhamag91@gmail.com)

**Technical issues?**
- [GitHub Issues](https://github.com/shubhamag91/ai-playbook/issues)

**Want to suggest a topic?**
- [Open a content request](https://github.com/shubhamag91/ai-playbook/issues/new?template=02-content.yml)

---

## Recognition

Contributors get:
- Name + link in commit message
- Listed in `CONTRIBUTORS.md` (coming soon)
- Credit in social announcements (if significant contribution)

---

## Code of Conduct

- Be respectful
- Assume good faith
- Constructive feedback only
- No spam, self-promotion, or off-topic content

---

Thank you for contributing! 🙏

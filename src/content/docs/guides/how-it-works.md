---
title: How this playbook works
description: The repo layout, authoring workflow, and publishing pipeline.
sidebar:
  order: 1
tags:
  - guide
lastUpdated: 2026-05-08
nextVerificationDue: 2027-05-08
---

## The short version

1. Every page is a Markdown (`.md`) or MDX (`.mdx`) file under `src/content/docs/`.
2. Folders become sidebar sections automatically.
3. Push to `main` — your host (Cloudflare Pages / Vercel / Netlify) rebuilds and deploys.

## Folder layout

```text
src/content/docs/
├── index.md                      # Landing page (Welcome)
├── tools.md                      # Conversational AI, coding, automation tools (May 2026)
├── workflows.md                  # AI workflows by industry & use case
├── agents.md                     # Agents & agentic AI systems (Cursor, Claude Code, etc.)
├── open-source.md               # Open-weight models (Llama, DeepSeek, Mistral)
├── glossary.mdx                 # 60+ AI terms (Beginner → Advanced)
├── history.mdx                  # Timeline: 1950s → May 2026 (Agentic AI era)
├── confusions.mdx               # 30+ misconceptions debunked
├── follow.mdx                   # Researchers, practitioners, newsletters
├── principles.mdx               # 7 guiding principles + AI safety/ethics
├── guides/                      # Long-form articles, how-tos
│   └── how-it-works.md         # This page
├── cheatsheets/                 # Quick reference cards (11 total)
│   ├── ai-tools-landscape.md
│   ├── ai-product-interview.md
│   ├── ai-product-banking-interview.md
│   ├── banking-analytics-interview.md
│   ├── ai-system-design-interview.md
│   ├── llm-interview.md
│   ├── llm-comparison.md
│   ├── ml-fundamentals-interview.md
│   ├── prompt-engineering.md
│   ├── coding-assistants-agents.md
│   └── behavioral-interview.md
├── diagrams/                    # Mermaid-based architecture diagrams
├── mind-maps/                   # Markmap mind maps
├── slides/                      # Slide decks (Slidev / Reveal)
└── infographics/                # SVG/PNG infographics
```

## What's in this playbook (May 2026)

**Core Pages**
- **Tools** — Landscape of conversational AI (Claude, ChatGPT, Gemini, DeepSeek, Perplexity), coding assistants, automation, and creative tools.
- **Workflows** — Common AI workflows (research, coding, content creation) plus industry-specific patterns (healthcare, finance, legal, autonomous vehicles).
- **Agents** — Agentic AI systems, multi-agent coordination, tool use, and current implementations (Cursor, Claude Code, Windsurf, AutoGen, CrewAI).
- **Open Source** — Running open-weight models locally (Llama, DeepSeek, Mistral, Qwen) and self-hosted options.

**Reference Pages**
- **Glossary** — 60+ AI terms organized by complexity level, plus May 2026 model comparisons.
- **History** — Timeline from 1950s through May 2026, covering the rise of agentic AI and frontier models.
- **Confusions** — 30+ myths debunked (agents won't replace you, context windows matter differently, cost is collapsing).
- **Follow** — Researchers, practitioners, industry leaders, and newsletters to stay current.
- **Principles** — 7 guiding rules for using AI responsibly, plus detailed AI safety & ethics for the agentic era.

**Interview Prep Cheatsheets (11 total)**
- LLM fundamentals, product management, system design, banking/fintech, behavioral interviews
- Includes May 2026 sections on agentic AI, real-time AI, reasoning models, and agent safety

## Authoring workflow

The fastest loop for writing:

```bash
npm run dev           # starts local preview at http://localhost:4321
# edit a .md file — the site hot-reloads
```

When you're happy:

```bash
git add .
git commit -m "add: RAG-from-scratch cheatsheet"
git push
```

Your deploy platform picks up the push and ships the new version in ~30 seconds.

## Frontmatter cheatsheet

Every page has a small YAML block at the top. The essentials:

```yaml
---
title: Readable title shown in nav & tab
description: One-line summary, also used for SEO
sidebar:
  order: 2       # lower = higher in the sidebar
  badge:
    text: New
    variant: tip
---
```

## Content organization principles (May 2026)

The playbook is organized by **depth and use case**, not just chronology:

1. **For beginners:** Start with the home page, then read "Glossary" (Beginner section), "Follow" (learn who to read), then pick one tool and use it daily.
2. **For practitioners:** Skip to "Tools," "Workflows," and "Agents" pages. Use cheatsheets for interview prep or quick reference.
3. **For thinking deeply:** Read "History" (evolution of AI), "Confusions" (what doesn't work), and "Principles" (responsible use).

Each page has `lastUpdated: 2026-05-08` in its frontmatter, so you always know when content was refreshed. The playbook is fully updated with May 2026 models, pricing, and agentic AI systems.

## Maintenance & updates

The playbook is versioned by Markdown timestamps and commit history:

```bash
# See what changed in the last update
git log --oneline src/content/docs/

# Check when a page was last refreshed
grep "lastUpdated:" src/content/docs/glossary.mdx
```

Key dates to watch:
- **Model releases** — Claude 4.7 (400K context), GPT-5.5 Instant, Gemini 3.1 Pro (1M context), o3 (reasoning), DeepSeek R1, Grok 3
- **Agentic AI tools** — Cursor (78% SWE-bench), Windsurf (75%), Claude Code, CrewAI, AutoGen
- **Reasoning models & test-time compute** — o3, DeepSeek R1, and implications for costs/latency
- **Real-time AI** — Video analysis, live translation, streaming inference

## Tagging & organizing

Starlight gives you nav + full-text search out of the box. If you want Obsidian-style tags or backlinks later, two good options are:

- **[Astro Starlight Sidebar Topics](https://starlight-sidebar-topics.netlify.app/)** for nested topic groups
- **[Quartz](https://quartz.jzhao.xyz/)** if you decide you want the full "digital garden" feel

Start simple — you can always migrate content later because it's all just Markdown.

---
title: How this playbook works
description: The repo layout, authoring workflow, and publishing pipeline.
sidebar:
  order: 1
---

## The short version

1. Every page is a Markdown (`.md`) or MDX (`.mdx`) file under `src/content/docs/`.
2. Folders become sidebar sections automatically.
3. Push to `main` — your host (Cloudflare Pages / Vercel / Netlify) rebuilds and deploys.

## Folder layout

```text
src/content/docs/
├── index.md              # Landing page
├── guides/               # Long-form articles, how-tos
├── cheatsheets/          # Quick reference pages
├── diagrams/             # Mermaid-based architecture diagrams
├── mind-maps/            # Markmap mind maps
├── slides/               # Slide decks (Slidev / Reveal)
└── infographics/         # SVG/PNG infographics with a short narrative
```

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

## Tagging & organizing

Starlight gives you nav + full-text search out of the box. If you want Obsidian-style tags or backlinks later, two good options are:

- **[Astro Starlight Sidebar Topics](https://starlight-sidebar-topics.netlify.app/)** for nested topic groups
- **[Quartz](https://quartz.jzhao.xyz/)** if you decide you want the full "digital garden" feel

Start simple — you can always migrate content later because it's all just Markdown.

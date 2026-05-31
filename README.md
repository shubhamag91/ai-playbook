# AI Playbook

A living, opinionated playbook for AI & LLM knowledge — updated through **May 2026** with the latest models, tools, and agentic AI systems. Built to be **your** reference first, and shareable as a public site second.

Stack: [**Astro 5.5.6**](https://astro.build) + [**Starlight 0.32.6**](https://starlight.astro.build) (docs theme), Markdown/MDX content, Mermaid diagrams, Markmap mind maps, Slidev decks, and plain SVG infographics. Deploys free to Cloudflare Pages.

**Current Coverage (May 2026):**
- **Models:** Claude 4.7 (400K context), GPT-5.5 Instant, Gemini 3.1 Pro (1M context), DeepSeek V4 ($0.14/1M tokens), o3 reasoning, Grok 3
- **Agentic AI:** Cursor, Claude Code, Windsurf, CrewAI, AutoGen
- **Interactive chatbot** — ask questions about playbook content, powered by Llama 3.3 70B + web search
- **60+ AI terms** with complexity levels, **7 guiding principles**, **30+ misconceptions debunked**, **11 interview cheatsheets**

---

## Why this stack

You said you're comfortable with **markdown + git**, want something that serves **both you and a public audience**, and plan to include **cheatsheets, diagrams, small slide decks, mind maps, and infographics**. Astro + Starlight is the sweet spot for exactly that:

| Requirement | How Astro + Starlight delivers |
|---|---|
| Professional look, low effort | Starlight ships with a polished docs theme, dark mode, search, and responsive nav out of the box |
| Cheatsheets | Native Markdown tables, callouts, code blocks |
| Diagrams | Mermaid renders from `mermaid` code blocks at build time |
| Mind maps | Markmap exports to HTML; embed via `<iframe>` |
| Slide decks | Slidev (or Reveal) exports to `/public/decks/` and embeds via `<iframe>` |
| Infographics | SVGs imported directly into MDX |
| Easy to maintain | Everything is a Markdown file in Git |
| Public + SEO | Static HTML, fast, indexable |
| Private-first feel | Full-text search, keyboard nav, tagged sidebar |
| **AI Chatbot** | **Built-in RAG chatbot with web search, deployed via Cloudflare Functions** |

---

## Quickstart

You need Node.js 20+ installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload at localhost:4321)
npm run dev

# 3. Edit .md or .mdx files in src/content/docs/ — browser auto-reloads

# 4. Build the static site
npm run build
```

**Tip:** After `npm run dev`, edits to any `.md`, `.mdx`, or `astro.config.mjs` file trigger instant hot reload. No restart needed.

---

## Project layout

```text
ai-playbook/
├── astro.config.mjs            # Starlight config (sidebar, plugins, theme)
├── package.json                # Dependencies + prebuild script for search index
├── tsconfig.json
├── CLAUDE.md                   # Guidance for AI coding tools working in this repo
├── public/                     # Static files served as-is
│   ├── chat-widget.js          # AI chatbot widget (floating chat bubble)
│   ├── search-index.json       # Auto-generated search index (prebuild)
│   ├── decks/                  # Exported Slidev/Reveal HTML
│   └── mindmaps/               # Exported Markmap HTML + source .md
├── scripts/
│   └── build-search-index.mjs  # Prebuild script — chunks content for chatbot search
├── functions/
│   └── api/
│       └── chat.js             # Cloudflare Pages Function — chatbot backend
├── .github/
│   ├── workflows/              # GitHub Actions: link check, stale content, weekly checklist
│   ├── ISSUE_TEMPLATE/         # Templates: bug, content, outdated, question, help-wanted
│   └── PULL_REQUEST_TEMPLATE/
├── src/
│   ├── assets/
│   │   ├── logo.svg
│   │   └── infographics/       # SVG infographics imported into MDX pages
│   ├── components/             # Interactive Astro components
│   │   ├── BenchmarkViz.astro  # Sortable/filterable benchmark explorer
│   │   ├── ModelMatrix.astro   # Model capability heatmap (8 models × 9 tasks)
│   │   ├── CostCalculator.astro# Interactive API cost calculator
│   │   ├── ToolComparison.astro# Sortable tool comparison tables
│   │   ├── TrendingWidget.astro# Latest AI trends widget (homepage + research)
│   │   ├── ProgressTracker.astro# Learning path progress (localStorage)
│   │   ├── ContributorsList.astro# Contributor cards
│   │   ├── ContentAudit.astro  # Auto-generated page audit table
│   │   ├── SeeAlso.astro       # Auto-generated related content links
│   │   └── *FooterOverride.astro|PageFrameOverride.astro  # Starlight overrides
│   ├── content.config.ts       # Extended schema (tags, glossaryLinks)
│   ├── data/                   # Structured data files
│   │   ├── benchmarks.ts       # Benchmark scores for interactive viz
│   │   ├── capabilities.ts     # Model capability ratings (1-5)
│   │   ├── models.ts           # Structured model entries for search index
│   │   ├── trends.ts           # Trending topics data
│   │   └── contributors.ts     # Contributor data
│   ├── content/docs/           # ALL MARKDOWN CONTENT (~101 pages)
│   │   ├── claude/              # Anthropic ecosystem (9 pages)
│   │   ├── openai/              # OpenAI ecosystem (9 pages)
│   │   ├── deepmind/            # Google DeepMind ecosystem (9 pages)
│   │   ├── deepseek/            # DeepSeek platform (8 pages)
│   │   ├── learn/               # Beginner, Builder, Researcher, Workflows, Quiz
│   │   ├── decide/tools/        # Feature Matrix + Decision Tree + Comparison
│   │   ├── deep-dive/           # 12 deep dives + Agent Skills
│   │   ├── reference/           # Glossary, Cheatsheets, Confusions, Benchmarks
│   │   ├── research/            # What's New, Open-Source, China Ecosystem, Trends
│   │   ├── community/           # Contributing, audit, analytics, help-wanted, contributors
│   │   └── resources/           # Papers, Interview Prep, templates, case studies
│   └── styles/
│       └── custom.css           # Paperclip-inspired design system (640+ lines)
```

---

## AI Chatbot

The playbook has a built-in AI chatbot (floating chat bubble on every page).

### Architecture

```
User question
  → Client (chat-widget.js) sends POST to /api/chat
  → Cloudflare Function (functions/api/chat.js)
      → Searches playbook content index (search-index.json)
      → Found? → Uses playbook context + Llama 3.3 70B
      → Not found? → Falls back to Llama 3.3 70B training knowledge
      → Web search? → Uses Serper.dev API if configured
  → Streams/returns answer to chat widget
```

### Setup

The chatbot requires environment variables in Cloudflare Pages:

| Variable | Required | Source | Free Tier |
|---|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | https://console.groq.com | Free (rate-limited) |
| `SERPER_API_KEY` | ❌ Optional | https://serper.dev | 2500 searches/month |

### Chat widget features

- Floating chat bubble on every page (bottom-right)
- Markdown rendering (bold, code blocks, lists, blockquotes)
- Key term highlighting (MMLU, HumanEval, SWE-bench, RLHF, LoRA)
- Conversation memory (last 5 exchanges)
- Suggested questions to get started
- New chat button, scroll-to-bottom, auto-resizing input
- Copy button on bot responses
- Timestamps on messages

---

## Interactive Components

| Component | Page | What it does |
|---|---|---|
| **BenchmarkViz** | `/reference/benchmarks` | Sortable benchmark table with filtering by category/family |
| **ModelMatrix** | `/decide/models/guide` | Heatmap: 9 models × 9 tasks with hover tooltips |
| **CostCalculator** | `/decide/cost-calculator` | Sliders for tokens/requests, live cost estimates for 14 models |
| **ToolComparison** | `/decide/tools/comparison` | Sortable tools table with category tabs |
| **Quiz** | `/learn/quiz` | Knowledge quiz with 645 questions across 24 sets (12 topics × easy/hard) |
| **PathSelector** | Homepage + `/start/quick-start` | Role-based path cards for navigation |
| **SearchOverride** | Header (all pages) | Pagefind search with ranking config + recent searches |
| **ProgressTracker** | `/learn/beginner`, `/learn/interview-prep` | Section checkboxes with localStorage persistence |
| **SeeAlso** | All pages (auto-injected) | Auto-generated related content links from tags |

---

## GitHub Integration

### Issue Templates
- **Bug Report** — Report incorrect content
- **New Content** — Suggest new pages
- **Outdated Info** — Report stale pricing/model info
- **Question** — General questions
- **Help Wanted / Good First Issue** — Starter tasks

### PR Template
Checklist includes: accuracy verification, pricing sources, link checks, frontmatter, build pass, dark/light mode review.

### GitHub Actions
| Workflow | Schedule | What it does |
|---|---|---|
| `check-links.yml` | Weekly (Mon) | Scans all files for broken links, auto-creates issue |
| `stale-content.yml` | Weekly (Mon) | Flags pages past `nextVerificationDue` date |
| `weekly-checklist.yml` | Weekly (Mon) | Creates maintenance checklist with pricing review |

---

## Adding new content

See [CONTRIBUTING.md](CONTRIBUTING.md) and [MAINTENANCE.md](MAINTENANCE.md) for detailed guides.

---

## Deploying

### Cloudflare Pages (recommended — free, fast, global)

1. Push this repo to GitHub.
2. Go to **Cloudflare Pages → Create project → Connect to Git**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Done. Every push to `main` auto-deploys.

### Environment Variables (required for chatbot)

Set these in Cloudflare Pages → Settings → Variables and Secrets:

- `GROQ_API_KEY` — Get from https://console.groq.com
- `SERPER_API_KEY` — (optional) Get from https://serper.dev

---

## How to maintain & extend

### Keep content fresh
- Update `lastUpdated: YYYY-MM-DD` in frontmatter whenever you refresh a page
- The chatbot's search index auto-updates on every build (via `prebuild` script)
- GitHub Actions weekly checklist flags stale content automatically

### Update the Chatbot
- **Chat widget UI**: `public/chat-widget.js` (all JS + inline CSS)
- **Chat backend**: `functions/api/chat.js` (Cloudflare Function)
- **Search index**: Generated automatically from `src/content/docs/` at build time
- **Structured model data**: Add/edit entries in `src/data/models.ts`

---

## License

Content: CC BY 4.0 (attribution required). Code: MIT.

## Contributors

Built and maintained by [Shubham Agarwal](https://github.com/shubhamag91). See the [Contributors page](/community/contributors) for a full list.

Contributions welcome — open a PR or [report outdated info](/community/report).

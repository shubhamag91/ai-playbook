# IA Design for AI Playbook Restructuring
**Issue:** MOS-207  
**Date:** May 8, 2026  
**Status:** Foundation for Phase 1 Restructuring

---

## Current State Analysis

### Sidebar Items (12 items — too many, not scalable)
1. Start here (1 item: Welcome)
2. Tools (link to `/tools/`)
3. Open Source (link to `/opensource/`)
4. Glossary (link to `/glossary/`)
5. History (link to `/history/`)
6. Confusions (link to `/confusions/`)
7. Follow (link to `/follow/`)
8. Workflows (link to `/workflows/`)
9. Principles (link to `/principles/`)
10. Cheatsheets (autogenerate from `cheatsheets/`)
11. Guides (autogenerate from `guides/`)
12. Diagrams (autogenerate from `diagrams/`)
13. Mind Maps (autogenerate from `mind-maps/`)
14. Slide Decks (autogenerate from `slides/`)
15. Infographics (autogenerate from `infographics/`)

**Problem:** 15 sidebar items, organized by content type, not by user intent.

### Current Directory Structure
```
src/content/docs/
├── index.md (homepage)
├── tools.mdx
├── opensource.mdx
├── glossary.mdx
├── history.mdx
├── confusions.mdx
├── follow.mdx
├── workflows.mdx
├── principles.mdx
├── productivity-tools.mdx
├── tools/ (subdirectory)
├── cheatsheets/ (11 files)
├── guides/ (2 files)
├── diagrams/ (1 file)
├── infographics/ (1 file)
├── mind-maps/ (2 files)
├── slides/ (1 file)
└── opensource/ (subdirectory)

Total: 31 markdown files, ~10 directories
```

---

## New Information Architecture (Scalable to 200+ pages)

### Structure: 8 Top-Level Groups → 25-30 pages (each group 2-4 pages)

```
Start Here
  ├── index (homepage with PathSelector)
  ├── Choose Your Path (interactive, not in sidebar)
  └── Quick Start (30 min intro)

Learn (by role — 3 paths)
  ├── Beginner Path (4 hours)
  ├── Interview Prep Path (10 hours)
  ├── Builder Path (5 hours)
  └── Researcher Path (2 hours)

Decide (decision frameworks)
  ├── Tools Guide (which tool to use?)
  ├── Models Guide (which LLM to use?)
  ├── Frameworks Guide (agents vs RAG vs fine-tuning)
  ├── Cost Calculator (interactive)
  └── Comparisons (autogenerate)

Reference (quick lookup)
  ├── Glossary (60+ terms)
  ├── Cheatsheets (11 cards, autogenerate)
  ├── Benchmarks (leaderboards)
  ├── Model Specs (capabilities matrix)
  └── Tools Landscape (reference catalog)

Research (staying current)
  ├── What's New (monthly updates)
  ├── Model Releases (new releases)
  ├── Emerging Trends (multi-agent, reasoning, etc.)
  ├── Bibliography (key papers)
  └── Open-Source Models (guide)

Deep Dives (mastery)
  ├── How LLMs Work (tokens, attention, transformers)
  ├── RAG Architecture (retrieval-augmented)
  ├── Agents & Frameworks (agents loop, tools)
  ├── Training & Fine-tuning (LoRA, data prep)
  ├── Prompt Engineering (techniques, patterns)
  ├── Inference Optimization (cost, latency)
  └── Eval & Testing (metrics, benchmarks)

Resources (external links)
  ├── Research Papers
  ├── Communities
  ├── Tools & Frameworks
  └── Videos & Talks

Community (collaboration)
  ├── Contributing Guide
  ├── Report Outdated
  └── Contributors List
```

---

## Content Migration Map

### Files to Create (new directories)

```
src/content/docs/
├── start/ (new)
│   ├── index.md (homepage)
│   ├── quick-start.md
│   └── choose-path.mdx (optional, might be homepage component)
│
├── learn/ (new)
│   ├── beginner.md
│   ├── interview-prep.md
│   ├── builder.md
│   └── researcher.md
│
├── decide/ (new)
│   ├── tools/
│   │   └── guide.md
│   ├── models/
│   │   └── guide.md
│   ├── frameworks/
│   │   └── guide.md
│   ├── cost-calculator.mdx
│   └── comparisons/
│
├── reference/ (new — reorganized)
│   ├── glossary.mdx (moved from root)
│   ├── glossary/ (split into multiple files if needed)
│   ├── cheatsheets/ (moved from cheatsheets/)
│   ├── benchmarks.md (new)
│   ├── model-specs.md (new)
│   ├── tools-landscape.md (new)
│   └── ai-landscape-mindmap.md (new)
│
├── research/ (new — reorganized)
│   ├── whats-new.md (moved from ??)
│   ├── model-releases.md (new)
│   ├── emerging-trends.md (new)
│   ├── papers.md (new)
│   ├── vocabulary.md (new)
│   └── models/ (moved from opensource/)
│
├── deep-dive/ (new)
│   ├── how-llms-work.md (new, from guides/how-it-works)
│   ├── rag-architecture.md (new)
│   ├── agents-frameworks.md (new)
│   ├── training-finetuning.md (new, from guides/llm-from-scratch)
│   ├── prompt-engineering.md (new)
│   ├── inference-optimization.md (new)
│   └── eval-and-testing.md (new)
│
├── resources/ (new)
│   ├── papers.md (new)
│   ├── communities.md (new)
│   ├── tools-frameworks.md (new)
│   └── videos.md (new)
│
├── community/ (new)
│   ├── contributing.md (new)
│   ├── report.md (new)
│   └── contributors.md (new)
│
├── diagrams/ (keep)
├── infographics/ (keep)
├── mind-maps/ (keep)
├── slides/ (keep)
│
└── [DEPRECATED — keep for redirects]
    ├── tools.mdx → redirect to /decide/tools/
    ├── opensource.mdx → redirect to /research/models/
    ├── glossary.mdx → redirect to /reference/glossary/
    ├── history.mdx → redirect to /reference/history/
    ├── confusions.mdx → [consolidate or keep]
    ├── follow.mdx → [consolidate or keep]
    ├── workflows.mdx → [consolidate or keep]
    ├── principles.mdx → [consolidate or keep]
    ├── productivity-tools.mdx → [consolidate or keep]
    └── guides/ → [split and migrate]
```

---

## New astro.config.mjs Sidebar Config

```javascript
sidebar: [
  {
    label: 'Start Here',
    items: [
      { label: 'Welcome', slug: 'index' },
      { label: 'Quick Start', slug: 'start/quick-start' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { label: 'Beginner Path', slug: 'learn/beginner' },
      { label: 'Interview Prep', slug: 'learn/interview-prep' },
      { label: 'Builder Path', slug: 'learn/builder' },
      { label: 'Researcher Path', slug: 'learn/researcher' },
    ],
  },
  {
    label: 'Decide',
    items: [
      { label: 'Tools Guide', slug: 'decide/tools/guide' },
      { label: 'Models Guide', slug: 'decide/models/guide' },
      { label: 'Frameworks Guide', slug: 'decide/frameworks/guide' },
      { label: 'Cost Calculator', slug: 'decide/cost-calculator' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { label: 'Glossary', slug: 'reference/glossary' },
      { label: 'Cheatsheets', autogenerate: { directory: 'reference/cheatsheets' } },
      { label: 'Benchmarks', slug: 'reference/benchmarks' },
      { label: 'Model Specs', slug: 'reference/model-specs' },
    ],
  },
  {
    label: 'Research',
    items: [
      { label: 'What\'s New', slug: 'research/whats-new' },
      { label: 'Model Releases', slug: 'research/model-releases' },
      { label: 'Trends', slug: 'research/emerging-trends' },
      { label: 'Open-Source Models', slug: 'research/models' },
    ],
  },
  {
    label: 'Deep Dives',
    items: [
      { label: 'How LLMs Work', slug: 'deep-dive/how-llms-work' },
      { label: 'RAG Architecture', slug: 'deep-dive/rag-architecture' },
      { label: 'Agents & Frameworks', slug: 'deep-dive/agents-frameworks' },
      { label: 'Training & Fine-tuning', slug: 'deep-dive/training-finetuning' },
      { label: 'Prompt Engineering', slug: 'deep-dive/prompt-engineering' },
    ],
  },
  {
    label: 'Resources',
    autogenerate: { directory: 'resources' },
  },
  {
    label: 'Community',
    items: [
      { label: 'Contributing', slug: 'community/contributing' },
      { label: 'Report Outdated', slug: 'community/report' },
    ],
  },
]
```

---

## URL Migration Plan (Redirects needed)

### Root-Level Pages → New Locations

| Current URL | New URL | Action | Notes |
|------------|---------|--------|-------|
| `/tools/` | `/decide/tools/` | Redirect (301) | Decision guide |
| `/opensource/` | `/research/models/` | Redirect (301) | Open-source models catalog |
| `/glossary/` | `/reference/glossary/` | Redirect (301) | Reference section |
| `/history/` | `/reference/history/` | Redirect (301) | Timeline |
| `/confusions/` | [TBD] | [TBD] | Consolidate or keep? |
| `/follow/` | [TBD] | [TBD] | Keep or move to resources? |
| `/workflows/` | [TBD] | [TBD] | Keep or move to deep-dive? |
| `/principles/` | [TBD] | [TBD] | Keep or move to learn? |
| `/productivity-tools/` | `/decide/tools/` | Redirect (301) | Merge with tools guide |

### Guides Migration

| Current URL | New URL | Action |
|------------|---------|--------|
| `/guides/how-it-works/` | `/deep-dive/how-llms-work/` | Move & expand |
| `/guides/llm-from-scratch/` | `/deep-dive/training-finetuning/` | Merge |

### Cheatsheets → Reference

All cheatsheets move from `/cheatsheets/` → `/reference/cheatsheets/` (auto-generate in sidebar)

---

## Content Consolidation Decisions

### Tools Content
- `/tools.mdx` (pricing table) → core of `/decide/tools/`
- `/cheatsheets/ai-tools-landscape.mdx` → reference card in `/reference/cheatsheets/`
- `/productivity-tools.mdx` → merge into `/decide/tools/` or redirect

### Models Content
- `/cheatsheets/llm-comparison.mdx` → `/reference/cheatsheets/` (stays)
- `/opensource.mdx` → becomes `/research/models/` (expanded)
- Benchmarks → separate page `/reference/benchmarks/`

### Learning Content
- `/guides/how-it-works.md` → `/deep-dive/how-llms-work/`
- `/guides/llm-from-scratch.md` → `/deep-dive/training-finetuning/`
- New learning paths created (beginner, interview, builder, researcher)

### Reference Content
- Glossary stays but moves to `/reference/glossary/`
- All cheatsheets move to `/reference/cheatsheets/` with auto-generate
- New pages: benchmarks, model-specs, tools-landscape

---

## Homepage Changes

**Current:** Minimal, points to sections  
**New:** Interactive PathSelector component

```
┌─────────────────────────────────────────────┐
│        Welcome to AI Playbook              │
│  A living reference for AI & LLM knowledge │
├─────────────────────────────────────────────┤
│                                             │
│  What would you like to do?                 │
│                                             │
│  ☐ Learn AI Basics           ☐ Decide      │
│    4-hour beginner path        Which tool  │
│                                to use?     │
│  ☐ Prep for Interview        ☐ Research   │
│    2-week curriculum           Stay current │
│                                             │
│  ☐ Build with AI             ☐ Reference  │
│    Hands-on dev guide         Quick lookup │
│                                             │
│  Or [Browse all topics]                    │
└─────────────────────────────────────────────┘
```

---

## Success Criteria Checklist

- ✅ Sidebar reduced from 12-15 items to 8 groups
- ✅ Each group contains 2-5 related pages
- ✅ Scales to 200+ pages without sidebar scrolling
- ✅ Clear role-based entry points (learn/decide/research)
- ✅ All current content has a new home
- ✅ URL migration plan documented (for 301 redirects)
- ✅ astro.config.mjs sidebar config defined
- ✅ New directory structure clear
- ✅ Content consolidation decisions made
- ✅ Homepage redesign approach defined

---

## Next Steps (Phase 1 Execution Order)

1. **MOS-207** (THIS): ✅ Design IA (complete)
2. **MOS-209**: Audit & consolidate content (use this map)
3. **MOS-208**: Update astro.config.mjs sidebar
4. **MOS-210**: Redesign homepage
5. **MOS-211**: Add breadcrumbs & navigation
6. **MOS-212**: Mobile optimization

---

## Implementation Notes

- All changes can happen in a single git branch before deployment
- Redirects can be added via `vercel.json` or middleware
- astro.config.mjs update is ~50 lines
- Directory restructuring can use shell scripts to move files
- Old pages left in place (with redirects) until all links updated

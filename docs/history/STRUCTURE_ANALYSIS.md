# AI Playbook — Structure & UX Analysis

**Analysis Date:** May 8, 2026  
**Status:** Critical issues identified. Restructuring recommended.

---

## 🚨 CRITICAL UX/STRUCTURE ISSUES

### Issue 1: Sidebar Navigation is Unusable at Scale

**Current State:**
```
Start here
├── Welcome

Tools (link)
Open Source (link)
Glossary (link)
History (link)
Confusions (link)
Follow (link)
Workflows (link)
Principles (link)

Cheatsheets (autogenerate) — 11 items
Guides (autogenerate) — 2 items
Diagrams (autogenerate) — 1 item
Mind Maps (autogenerate) — 2 items
Slide Decks (autogenerate) — 1 item
Infographics (autogenerate) — 1 item
```

**Problem:**
- **10+ top-level items** at same hierarchy level
- At 200 pages: sidebar becomes **2+ screens of scrolling**
- No grouping by user intent (Learn? Build? Interview?)
- No clear "what's new" or "trending" section
- All content types mixed together (reference, guides, interactive)

**Scalability Score:** 2/10 — Will break at 50+ pages

---

### Issue 2: No Role-Based Navigation

**Current:** Everyone sees the same sidebar

**Missing:**
- Beginner path (where should I start?)
- Interview prep path (training curriculum)
- Builder path (hands-on guides)
- Research path (latest models, benchmarks)

**Impact:** Beginner lands and has no idea where to start

---

### Issue 3: Duplicate/Redundant Content

**Examples:**
- `/tools` page exists
- `/cheatsheets/ai-tools-landscape` also exists
- `/workflows` page exists
- `/cheatsheets` section also exists
- `/principles` page exists
- `/confusions` page exists

**Problem:** Content is scattered. Unclear which to read.

---

### Issue 4: Missing Critical Sections

**Should exist but don't:**
- `/learn` — Learning paths by role (beginner, interview, builder)
- `/decide` — Decision frameworks (which tool? which model?)
- `/reference` — Quick lookup (glossary, cheatsheets)
- `/research` — Latest models, benchmarks, trending
- `/updates` — What changed this month?
- `/community` — Contributing guidelines
- `/resources` — Links, papers, videos

---

### Issue 5: Homepage Doesn't Onboard

**Current:** Shows a list of categories

**Missing:**
- "What are you here to do?" selector
- Learning path recommendations
- "New this month" section
- Quick start guides

**Result:** Beginner paralysis

---

## 🎯 RECOMMENDED STRUCTURE

```
AI Playbook/

├── Start Here
│   ├── Welcome (what is this?)
│   ├── Choose Your Path (learn / build / interview / research)
│   └── Quick Start (30 min intro)
│
├── Learn (for beginners)
│   ├── Path: Beginner (4 hours)
│   │   ├── What is an LLM?
│   │   ├── How do they work?
│   │   ├── What can they do?
│   │   ├── Try it yourself
│   │   └── What's real vs hype?
│   │
│   ├── Path: Interview Prep (2 weeks)
│   │   ├── Week 1: Fundamentals
│   │   ├── Week 2: System Design
│   │   └── Practice
│   │
│   └── Path: Builder (1 week)
│       ├── Choosing Tools
│       ├── RAG Architecture
│       ├── Agents & Frameworks
│       └── Production Patterns
│
├── Decide (for people choosing)
│   ├── Tools Guide (which tool should I use?)
│   ├── Models Guide (which LLM should I use?)
│   ├── Cost Calculator
│   └── Comparison Tables (interactive)
│
├── Reference (for quick lookups)
│   ├── Glossary (60+ terms)
│   ├── Cheatsheets (11 sheets)
│   ├── Benchmarks (leaderboards)
│   └── Model Comparison (specs)
│
├── Research (for staying current)
│   ├── What's New This Month
│   ├── Model Releases
│   ├── Benchmark Updates
│   ├── Open-Source Landscape
│   └── Emerging Trends
│
├── Deep Dives (for mastery)
│   ├── How LLMs Work
│   ├── RAG Architecture
│   ├── Agents & Frameworks
│   ├── Training & Fine-tuning
│   └── Prompt Optimization
│
├── Resources (external)
│   ├── Research Papers
│   ├── Videos & Talks
│   ├── Tools & Frameworks
│   └── Communities
│
└── Community (for contributors)
    ├── Contributing Guide
    ├── Editing the Playbook
    ├── Report Outdated Info
    └── Contributors List
```

---

## 📊 COMPARISON: Current vs Recommended

| Aspect | Current | Recommended | Benefit |
|--------|---------|-------------|---------|
| **Top-level items** | 10 | 8 (grouped) | Clear hierarchy |
| **Sidebar depth** | Flat | 2-3 levels | Scalable |
| **User entry point** | Generic | Role-based | Better UX |
| **Scalability at 200 pages** | 2/10 | 8/10 | Works longer |
| **Learning paths** | None | 3 explicit | Guided onboarding |
| **Decision support** | None | Guides + tools | Helps users choose |
| **Content discovery** | Search only | Browsable | Better engagement |

---

## 🔄 MIGRATION PATH

### Phase 1: Create New Structure
1. Create `/learn` and `/learn/paths` directories
2. Create `/decide` directory with decision guides
3. Create `/research` directory with trending content
4. Create `/community` directory

### Phase 2: Reorganize Sidebar
1. Update `astro.config.mjs` sidebar to new structure
2. Add "Choose Your Path" component to homepage
3. Add role-based nav filtering

### Phase 3: Consolidate Content
1. Review and consolidate duplicate pages
2. Move content to correct new home
3. Add cross-links and "see also" sections
4. Update internal linking

### Phase 4: Add New Content
1. Create learning paths
2. Create decision frameworks
3. Add interactive selectors
4. Build resources section

---

## 🎯 SUCCESS CRITERIA

After restructuring:
- ✅ Sidebar shows clearly grouped sections
- ✅ New users can pick a learning path
- ✅ No redundant content (1 source of truth per concept)
- ✅ Scales to 200+ pages without sidebar becoming unusable
- ✅ 3+ different entry points (learn / decide / research)
- ✅ Clear distinction: tutorial (learn) vs reference (decide/research)

---

## 💡 ADDITIONAL OBSERVATIONS

### Current Strengths
- ✅ Starlight is the right choice (docs UX is solid)
- ✅ MDX support is excellent
- ✅ Mermaid diagrams render beautifully
- ✅ Dark mode works well
- ✅ Search (PageFind) is functional

### Current Weaknesses
- ❌ Navigation doesn't scale
- ❌ No role-based filtering
- ❌ Homepage is minimal
- ❌ No "trending" / "new" section
- ❌ Interactive components limited (could add model selector, comparisons)
- ❌ No breadcrumbs or "back" guidance

### Tech Stack Assessment
- **Keep:** Astro + Starlight + MDX
- **Add:** React components for interactive elements
- **Consider:** Custom homepage with role selector
- **Skip:** CMS or database (Git-based is right)

---

## 📋 RECOMMENDED IMMEDIATE ACTIONS

### Priority 1: Plan Restructure (4-6 hours)
- [ ] Create detailed new IA doc
- [ ] Plan URL redirects (old paths → new)
- [ ] Create new directory structure
- [ ] Update astro.config.mjs

### Priority 2: Implement New IA (12-16 hours)
- [ ] Create /learn directory and paths
- [ ] Create /decide directory
- [ ] Create /research directory
- [ ] Create /community directory
- [ ] Move/reorganize content
- [ ] Update sidebar config

### Priority 3: Add Interactive Elements (8-12 hours)
- [ ] "Choose Your Path" component
- [ ] Interactive model selector
- [ ] Interactive tool comparisons
- [ ] Cost calculator

### Priority 4: Polish & Test (4-8 hours)
- [ ] Test navigation on mobile
- [ ] Verify all links work
- [ ] Performance testing
- [ ] SEO audit

---

## 🔗 RELATED LINEAR ISSUES

This analysis will generate issues in these categories:
- **Architecture** — IA restructuring, config updates
- **Content Organization** — Moving content to new homes
- **UX Improvements** — Navigation, components, interactions
- **Quality Assurance** — Testing, link verification


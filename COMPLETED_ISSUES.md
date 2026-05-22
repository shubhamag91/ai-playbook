# Completed Linear Issues — AI Playbook

Archived from Linear (project: AI Playbook, team: MOS) on 2026-05-22.
Total: 96 issues.

---

## Urgent Priority

### MOS-187 — URGENT: Fix accuracy issues in /tools pricing and descriptions

**Closed:** 2026-05-09

> ## Problem
> 
> The /tools page has 5-6 factual inaccuracies that undermine credibility:
> 
> 1. **Claude Code**: Listed as "$20-100/mo" (vague and wrong)
>    * Should be: "Included in Claude Pro ($20/mo)"
> 2. **Gemini**: Missing 1.5 Pro (2M context) and Flash-Lite options
>    * Should note highest context windows in market
> 3. **Flux**: Says "Free (open-source)" without mentioning API costs
>    * Missing: Flux-1-pro surpasses DALL-E 3 as of May 2026
> 4. **Vercel v0**: Called "web app builder" but it only generates components
>    * Confused with Lovable (full-stack)
> 5. **Cursor vs Claude Code**: Positione...

---

### MOS-189 — Restore /open-source page (404 error) with May 2026 models

**Closed:** 2026-05-09

> ## Problem
> 
> /open-source page returns 404. This is a major content gap.
> 
> ## Requirements
> 
> Must include (as of May 2026):
> 
> ### Top Models
> 
> * Llama 4 Scout (MoE, best overall)
> * Llama 4 Maverick (400B / 17B active)
> * DeepSeek V4-Pro (1.6T / 49B active)
> * DeepSeek V4-Flash
> * Qwen 3.5 (397B / 17B)
> * Qwen 3.6 27B (77.2% SWE-bench, best dense coding)
> * Gemma 4
> * Mistral Large 3
> * Kimi K2.6 (MoE, top-tier coding)
> * Phi-4 Mini (4-8 GB VRAM)
> 
> ### Benchmarks
> 
> * HumanEval (coding)
> * SWE-bench (software engineering)
> * MATH benchmark
> * GPQA (reasoning)
> * MMLU (general knowledge)
> 
> ### Use Case Recommenda...

---

### MOS-207 — ARCHITECTURE: Design new information architecture for scalability

**Closed:** 2026-05-09

> ## Problem
> 
> Current sidebar navigation will become unusable at 200+ pages. Needs hierarchical restructuring.
> 
> ## Current Structure
> 
> * 10+ top-level items (tools, glossary, history, confusions, workflows, principles, cheatsheets, guides, diagrams, mind-maps, slides, infographics)
> * Flat organization
> * No role-based filtering
> * All content types mixed together
> 
> ## Recommended New Structure
> 
> ```
> Start Here
> ├── Welcome
> ├── Choose Your Path (learner / builder / researcher / interviewer)
> └── Quick Start (30 min)
> 
> Learn (by role)
> ├── Beginner Path (4 hours)
> ├── Interview Prep Path (2 weeks)
> └── Bu...

---

### MOS-208 — ARCHITECTURE: Implement new sidebar configuration in astro.config.mjs

**Closed:** 2026-05-09

> ## Problem
> 
> Need to update Starlight sidebar config to match new IA from [MOS-207](https://linear.app/mose/issue/MOS-207/architecture-design-new-information-architecture-for-scalability).
> 
> ## Current Config
> 
> ```javascript
> sidebar: [
>   { label: 'Start here', items: [{ label: 'Welcome', slug: 'index' }] },
>   { label: 'Tools', link: '/tools/' },
>   { label: 'Open Source', link: '/opensource/' },
>   // ... 10+ items
> ]
> ```
> 
> ## New Config Structure
> 
> ```javascript
> sidebar: [
>   {
>     label: 'Start Here',
>     items: [
>       { label: 'Welcome', slug: 'index' },
>       { label: 'Choose Your Path', slug: ...

---

### MOS-209 — CONTENT: Audit and consolidate redundant pages

**Closed:** 2026-05-16

> ## Problem
> 
> Content is scattered and sometimes redundant:
> 
> * `/tools` page exists
> * `/cheatsheets/ai-tools-landscape` also describes tools
> * `/workflows` page exists
> * `/principles` page exists
> * `/confusions` page exists (misconceptions)
> 
> Readers don't know which to read.
> 
> ## Audit Tasks
> 
> - [ ] List all current pages with descriptions
> - [ ] Identify redundancies
> - [ ] Map content to new IA structure
> - [ ] Plan consolidations or splits
> - [ ] Create migration checklist
> 
> ## Consolidation Examples
> 
> ### Tools
> 
> **Current:**
> 
> * `/tools` (pricing table)
> * `/cheatsheets/ai-tools-landscape` (overvie...

---

### MOS-210 — UX: Redesign homepage with "Choose Your Path" selector

**Closed:** 2026-05-09

> ## Problem
> 
> Current homepage is minimal. New users don't know where to start.
> 
> ## Solution
> 
> Interactive homepage with role selector:
> 
> ```
> Welcome to AI Playbook
> A living reference for AI & LLM knowledge
> 
> Choose your starting point:
> 
> [Image/Icon] Learn AI Basics
> Get started with a 4-hour beginner path
> → What is an LLM? How they work? What's real vs hype?
> 
> [Image/Icon] Prepare for Interview
> 2-week structured curriculum
> → Fundamentals, System Design, Practice Questions
> 
> [Image/Icon] Build with AI
> Hands-on developer guide
> → Choosing tools, RAG architecture, Agents
> 
> [Image/Icon] Research & Stay ...

---

### MOS-249 — Fix accuracy issues in /tools

**Closed:** 2026-05-09

> Verify and correct critical accuracy issues identified in review.
> 
> **Issues to fix:**
> 
> * Claude Code pricing clarification
> * Gemini context window options
> * Flux API pricing
> * Vercel v0 vs Lovable distinction
> * Cursor + Claude Code complementarity
> 
> **Success Criteria:**
> 
> * All claims verified against official sources
> * Links to sources added
> * lastUpdated date updated
> * Pricing accurate as of today
> * No contradictions

---

## High Priority

### MOS-190 — Add homepage "Choose Your Path" personalization selector

**Closed:** 2026-05-09

> ## Problem
> 
> Homepage doesn't guide beginners. They see 10 categories and don't know where to start.
> 
> ## Solution
> 
> Add interactive selector at top of homepage:
> 
> ```
> I want to...
> - [ ] Learn AI basics (Beginner's Path)
> - [ ] Prepare for interviews (Interview Prep)
> - [ ] Build with AI tools (Builder's Path)
> - [ ] Research latest models (Research Path)
> - [ ] Understand how LLMs work (Deep Dive)
> ```
> 
> Then:
> 
> 1. Customize sidebar navigation based on selection
> 2. Highlight relevant content
> 3. Remember choice (localStorage)
> 4. Allow user to switch paths anytime
> 
> ## Implementation
> 
> * Create React com...

---

### MOS-191 — Create /updates changelog page with weekly feed

**Closed:** 2026-05-09

> ## Problem
> 
> Users can't see what changed. They reload /tools and manually compare to memory.
> 
> ## Solution
> 
> Create `/updates` page with:
> 
> ### Current Month Section
> 
> ```
> ## May 2026
> 
> **New:** Benchmark comparisons page (all major models)
> **Updated:** Tool pricing (added Gemini Flash-Lite, Claude Code clarified)
> **Fixed:** Removed GPT-3.5 (end-of-life)
> **Coming:** Open-source models page (in staging)
> 
> Last updated: May 8, 2026
> ```
> 
> ### Previous Months
> 
> Expandable sections for older updates
> 
> ### Features
> 
> * Markdown format (auto-published)
> * RSS feed support (optional)
> * Filter by type (New, Up...

---

### MOS-192 — Create /benchmarks page with model comparisons

**Closed:** 2026-05-09

> ## Problem
> 
> No centralized benchmark comparisons. Readers can't quickly see which model wins at what.
> 
> ## Solution
> 
> Create `/benchmarks` page with:
> 
> ### Benchmark Tables
> 
> For each major benchmark:
> 
> ```
> | Model | HumanEval | MATH | GPQA | MMLU | Date |
> |-------|-----------|------|------|------|------|
> | Claude 3.5 Sonnet | 93.7% | 71.1% | 59.4% | 88% | May 2026 |
> | GPT-5.2 | 90.2% | 76.6% | 53.6% | 90% | May 2026 |
> | Gemini 3.1 Pro | 85% | 72% | 52% | 85% | May 2026 |
> ```
> 
> ### By Task Type
> 
> * **Coding** (HumanEval, SWE-bench)
> * **Math** (MATH benchmark)
> * **Reasoning** (GPQA)
> * **General Kno...

---

### MOS-193 — Add decision frameworks to /tools and /models pages

**Closed:** 2026-05-09

> ## Problem
> 
> Lists tools/models but doesn't help users choose. Beginners paralyzed by 30 options.
> 
> ## Solution
> 
> Add decision frameworks:
> 
> ### For /tools: "What should I choose?"
> 
> ```
> What do you want to do?
> 
> ○ Write and analyze text
>   → Claude.ai, ChatGPT, Gemini, Perplexity, NotebookLM
> 
> ○ Code
>   → Cursor, Claude Code, GitHub Copilot
> 
> ○ Generate images
>   → Midjourney, DALL-E 3, Flux
> 
> ○ Find research sources
>   → Perplexity, ChatGPT + web search, Gemini
> ```
> 
> ### For /models: Trade-off Matrix
> 
> ```
> Need              | Best Choice      | Why
> -----------------|------------------|------
> Coding     ...

---

### MOS-194 — Build Beginner's Learning Path (4-hour curriculum)

**Closed:** 2026-05-09

> ## Problem
> 
> No guided journey for beginners. Current IA assumes they know what they want.
> 
> ## Solution
> 
> Create a sequential 4-hour learning path:
> 
> ### Path Structure
> 
> 1. **What is an LLM?** (30 min)
>    * Link to glossary basics
>    * Simple mental model
>    * Examples (ChatGPT, Claude, etc.)
> 2. **How Do They Work?** (1 hour)
>    * Link to /how-it-works guide
>    * Transformers overview
>    * Tokens, context, attention
>    * Keep math light
> 3. **What Can They Do?** (1 hour)
>    * Link to /tools overview
>    * Categorized by use case
>    * Live examples
>    * Try it yourself links (to free tools)
> 4. **...

---

### MOS-195 — Build Interview Prep Learning Path (2-week curriculum)

**Closed:** 2026-05-09

> ## Problem
> 
> Cheatsheets are scattered. No guided interview prep curriculum.
> 
> ## Solution
> 
> Create structured 2-week interview prep path (10 hours total):
> 
> ### Week 1: Fundamentals
> 
> **Day 1-2: LLM Basics** (2 hours)
> 
> * What are LLMs?
> * Tokenization, embeddings, context windows
> * Temperature, top-k, top-p
> * Link to /cheatsheets/llm
> 
> **Day 3-4: Architecture** (2 hours)
> 
> * Transformers deep dive
> * Attention mechanisms
> * Training vs inference
> * Link to technical glossary
> 
> **Day 5: Model Comparison** (1 hour)
> 
> * Claude vs GPT vs Gemini
> * Benchmarks and trade-offs
> * Link to /benchmarks
> 
> ### Week 2:...

---

### MOS-196 — Build Builder's Learning Path (hands-on guide)

**Closed:** 2026-05-09

> ## Problem
> 
> Builders need practical guidance on choosing tools and architecture patterns.
> 
> ## Solution
> 
> Create /builder-path with 4-6 hour curriculum:
> 
> ### 1\. Choosing Tools (1 hour)
> 
> * Link to /tools decision framework
> * Budget vs capability trade-off
> * Free vs paid tiers
> * AI IDE comparison (Cursor, Claude Code)
> * Coding tools primer
> 
> ### 2\. RAG Architecture (2 hours)
> 
> * When to use RAG
> * Vector databases
> * Retrieval patterns
> * Link to detailed /guides/rag-architecture
> * Code examples
> 
> ### 3\. Agents & Frameworks (1.5 hours)
> 
> * When agents make sense
> * LangGraph vs CrewAI vs AutoGen
> * M...

---

### MOS-197 — Create comprehensive RAG architecture guide with diagrams

**Closed:** 2026-05-09

> ## Problem
> 
> RAG is crucial but explained scattered across glossary and guides. Builders need consolidated resource.
> 
> ## Solution
> 
> Create /guides/rag-architecture page (2000 words):
> 
> ### Structure
> 
> 1. **When to Use RAG**
>    * vs fine-tuning
>    * vs prompt engineering
>    * vs hybrid approach
>    * Decision tree
> 2. **RAG Pipeline Components**
>    * Ingestion (chunking, embedding)
>    * Retrieval (vector search)
>    * Re-ranking
>    * Prompt synthesis
> 3. **Technologies**
>    * Vector databases (Pinecone, Weaviate, Milvus, Chroma)
>    * Embedding models
>    * Retrieval patterns
>    * Link to glossary
> 4. ...

---

### MOS-198 — Create Agents & Agentic AI frameworks guide

**Closed:** 2026-05-09

> ## Problem
> 
> Agents are the hottest topic in AI (May 2026) but underexplained in playbook.
> 
> ## Solution
> 
> Create /guides/agents-frameworks page covering:
> 
> ### 1\. What Are Agents?
> 
> * Definition
> * vs RAG
> * vs fine-tuning
> * When to use agents
> * Mental model for beginners
> 
> ### 2\. Agentic Patterns
> 
> * Loop structure (perceive → reason → act → observe)
> * Tool use
> * Memory management
> * Error recovery
> * Multi-agent coordination
> 
> ### 3\. Top Frameworks (May 2026)
> 
> * **LangGraph** (stateful workflows, best for complex orchestration)
> * **Microsoft AutoGen** (multi-agent conversations)
> * **CrewAI** (rol...

---

### MOS-199 — Add "Report Outdated" button to all pages with GitHub issue auto-creation

**Closed:** 2026-05-09

> ## Problem
> 
> Users spot outdated info but have no easy way to report it.
> 
> ## Solution
> 
> Add button to footer of every page:
> 
> ```
> [?] Report Outdated Information
> ```
> 
> When clicked:
> 
> 1. Pre-fill GitHub issue form
> 2. Include:
>    * Current page URL
>    * Page title
>    * What's outdated (user fills in)
>    * Suggested fix (optional)
>    * Timestamp
> 3. Auto-label as `type:fix` and `area:content`
> 4. Auto-assign priority based on page type (critical > high > medium)
> 
> ### Implementation
> 
> * Create footer component with button
> * Use GitHub issue API to pre-populate fields
> * Link to CONTRIBUTING.md guidelin...

---

### MOS-202 — Set up analytics and user engagement tracking (Plausible/Cloudflare)

**Closed:** 2026-05-09

> ## Problem
> 
> Don't know which pages get traffic, what users find confusing, or if changes improve engagement.
> 
> ## Solution
> 
> Implement privacy-respecting analytics:
> 
> ### Tool Options
> 
> * **Plausible** (privacy-first, $9-29/month) — Recommended
> * **Cloudflare Analytics** (included in Pro plan)
> * **Fathom** (privacy-first alternative)
> 
> ### Metrics to Track
> 
> * Page views (by page)
> * Time on page
> * Bounce rate (by page type)
> * Click heatmaps (which links get clicks?)
> * Path analysis (how do users navigate?)
> * Referral sources
> 
> ### Key Questions to Answer
> 
> 1. Which pages get the most traffic?
> 2. Wh...

---

### MOS-203 — Create content audit checklist and monthly review process

**Closed:** 2026-05-09

> ## Problem
> 
> Without a structured audit process, content decay is unpredictable.
> 
> ## Solution
> 
> Create monthly audit checklist to be done first Sunday of month (\~3-4 hours):
> 
> ### Tier 1 Pages (Critical) — Review Monthly
> 
> - [ ] /tools (pricing, tool list, descriptions)
> - [ ] /open-source (models, benchmarks)
> - [ ] /glossary (5-10 random terms, verify definitions)
> - [ ] /benchmarks (rankings, new benchmarks)
> 
> **Checklist for each:**
> 
> - [ ] All prices verified against official sources
> - [ ] All product names and versions correct
> - [ ] No dead external links
> - [ ] Benchmarks up-to-date
> - [ ] las...

---

### MOS-206 — Document and set up community contribution workflow

**Closed:** 2026-05-09

> ## Problem
> 
> No clear process for community to contribute. CONTRIBUTING.md exists but workflow not set up.
> 
> ## Solution
> 
> Set up GitHub contribution workflow:
> 
> ### 1\. GitHub Issue Templates
> 
> Create .github/issue_templates/:
> 
> * `bug-report.md` (factual error)
> * `feature-request.md` (new content)
> * `outdated.md` (report outdated info)
> * `question.md` (ask for clarification)
> 
> ### 2\. PR Template
> 
> Create .github/PULL_REQUEST_TEMPLATE.md:
> 
> ```markdown
> ## What changed?
> - [ ] Fixed accuracy issue
> - [ ] Added new content
> - [ ] Updated existing page
> - [ ] Other
> 
> ## Why?
> [Explain reason]
> 
> ## Sources
> [...

---

### MOS-211 — UX: Add breadcrumb navigation and "Back" guidance

**Closed:** 2026-05-09

> ## Problem
> 
> Users get lost in deep pages. No breadcrumb trail. Hard to understand page hierarchy.
> 
> ## Solution
> 
> 1. **Breadcrumbs** (at top of each page)
> 
>    ```
>    Learn > Beginner Path > How LLMs Work
>    ```
> 2. **Related Content** (at bottom)
> 
>    ```
>    Previous: What is an LLM?
>    Next: How Do They Work?
>    
>    In this path:
>    - [ ] What is an LLM?
>    - [✓] How They Work
>    - [ ] What Can They Do?
>    - [ ] Try It Yourself
>    - [ ] What's Real vs Hype?
>    ```
> 3. **Context Panel** (sidebar when in learning path)
> 
>    ```
>    You're in: Beginner Path
>    Progress: 2/5
>    Est. time left: 2 hour...

---

### MOS-212 — UX: Create mobile-responsive navigation improvements

**Closed:** 2026-05-09

> ## Problem
> 
> Sidebar with 8 groups + many items doesn't work well on mobile. Navigation becomes a nightmare.
> 
> ## Current Issue
> 
> * Sidebar takes up full screen on mobile
> * Hard to navigate between sections
> * No clear "back to top" or quick navigation
> 
> ## Solution
> 
> 1. **Collapse Groups on Mobile**
>    * Top-level items are collapsible
>    * Start with "Start Here" expanded, others collapsed
>    * Expand on tap
> 2. **Mobile Drawer Pattern**
>    * Hamburger menu for navigation
>    * Quick access to main sections
>    * Back button always visible
> 3. **Bottom Navigation** (optional)
> 
>    ```
>    [Learn] [De...

---

### MOS-213 — MOS-213: Create Beginner Learning Path

**Closed:** 2026-05-09

> Create a 4-hour guided learning path for complete beginners to AI/LLMs.
> 
> **Deliverables:**
> 
> * /learn/paths/beginner.md with 5 main sections:
>   * What is an LLM? (30 min)
>   * How do they work? (1 hour)
>   * What can they do? (1 hour)
>   * Your first experiment (1 hour)
>   * What's real vs hype? (30 min)
> 
> **Success Criteria:**
> 
> * Page is readable start-to-finish in \~4 hours
> * Explains jargon with examples
> * Hands-on experiment section with actual tools
> * Links to glossary for deep dives
> * Includes progress tracking (MOS-248)

---

### MOS-214 — MOS-214: Create Interview Prep Learning Path

**Closed:** 2026-05-09

> Create a 2-week interview preparation curriculum for AI/ML roles.
> 
> **Deliverables:**
> 
> * /learn/paths/interview-prep.md structured as:
>   * Week 1: Fundamentals (LLM basics, architecture, model comparison)
>   * Week 2: System Design (RAG, agents, cost optimization)
>   * Practice questions & mock interview section
> 
> **Success Criteria:**
> 
> * Each week takes \~10-12 hours of study
> * Links to deep dives for each topic
> * Includes sample questions with answer explanations
> * Provides resource links (papers, videos, tools)
> * Covers all major interview topics from ROADMAP success metrics

---

### MOS-215 — MOS-215: Create Builder Learning Path

**Closed:** 2026-05-09

> Create a 1-week hands-on learning path for developers building AI applications.
> 
> **Deliverables:**
> 
> * /learn/paths/builder.md with sections:
>   * Choosing tools (decision framework)
>   * RAG architecture deep dive
>   * Agents & frameworks overview
>   * Production patterns and optimization
> 
> **Success Criteria:**
> 
> * Focuses on practical, code-level understanding
> * Includes links to working examples/repos
> * Covers decision-making (when to use RAG vs fine-tuning, etc.)
> * Addresses cost, latency, accuracy trade-offs
> * Links to deep dives for architecture details

---

### MOS-217 — MOS-217: Create Tools Decision Guide

**Closed:** 2026-05-09

> Create comprehensive guide to help users choose the right AI tools.
> 
> **Deliverables:**
> 
> * /decide/tools/guide.md with sections:
>   * Decision tree: What should I choose?
>   * Trade-off matrix (pricing vs capability)
>   * Category recommendations (chat, coding, image, video, etc.)
>   * Free vs paid comparison
>   * Interactive tool selector (MOS-220)
> 
> **Success Criteria:**
> 
> * Guides users through 3-5 key questions to narrow down choices
> * Includes pricing matrix comparing top tools per category
> * Clear guidance on free tier vs paid
> * Links to tool details in /reference/tools-landscape (MOS-226)
> * ...

---

### MOS-218 — MOS-218: Create Models Decision Guide

**Closed:** 2026-05-09

> Create comprehensive guide to choose the right LLM for different tasks.
> 
> **Deliverables:**
> 
> * /decide/models/guide.md with sections:
>   * Which LLM for which task?
>   * Benchmark trade-offs (coding vs reasoning vs math)
>   * Speed vs quality vs cost matrix
>   * Context window guide
>   * Pricing comparison
> 
> **Success Criteria:**
> 
> * Clear guidance on Claude vs GPT vs Gemini vs others per use case
> * Explains benchmark trade-offs (HumanEval, MATH, GPQA, etc.)
> * Provides latency/cost/quality comparison
> * Context window explained with use case guidance
> * Links to /reference/benchmarks and /reference/m...

---

### MOS-219 — MOS-219: Create Framework Decision Guide

**Closed:** 2026-05-09

> Create guide for choosing between AI architectures and frameworks.
> 
> **Deliverables:**
> 
> * /decide/frameworks/guide.md covering:
>   * Agents vs RAG vs fine-tuning vs prompt engineering
>   * When to use each approach
>   * Tool comparison (LangGraph vs CrewAI vs AutoGen, etc.)
> 
> **Success Criteria:**
> 
> * Decision matrix showing when to use each approach
> * Cost/complexity/capability trade-offs
> * Links to deep dives (MOS-232-238) for details
> * Real-world examples for each pattern
> * Includes open-source vs commercial framework comparison

---

### MOS-220 — MOS-220: Add Interactive Model Selector

**Closed:** 2026-05-09

> Create interactive React component for filtering and comparing models.
> 
> **Deliverables:**
> 
> * React component with filters: task, cost, speed, context window
> * Shows for each model: benchmarks, pricing, links, capabilities
> * Mobile responsive (card layout on small screens)
> * Real-time filtering without page reload
> 
> **Success Criteria:**
> 
> * Component renders on /decide/models/guide
> * Filters work smoothly without lag
> * Mobile responsive tested
> * Accessible (keyboard navigation, ARIA labels)
> * Pricing data can be kept current via frontmatter in models data

---

### MOS-221 — MOS-221: Add Interactive Tool Comparison Tables

**Closed:** 2026-05-09

> Create sortable/filterable tool comparison tables for /decide/tools.
> 
> **Deliverables:**
> 
> * React component with:
>   * Sortable columns (price, features, ratings, etc.)
>   * Filterable by category, cost tier, free tier availability
>   * Mobile card layout for small screens
>   * Quick links to tool pages
> 
> **Success Criteria:**
> 
> * Tables render on /decide/tools pages
> * Sorting/filtering work smoothly
> * Mobile responsive
> * Accessible
> * Data source: maintain in structured data file (CSV/YAML)

---

### MOS-222 — MOS-222: Reorganize Glossary for /reference section

**Closed:** 2026-05-09

> Move and restructure glossary as primary reference lookup tool.
> 
> **Deliverables:**
> 
> * Move glossary from /glossary to /reference/glossary
> * Keep 60+ terms with 3 difficulty levels (beginner, intermediate, advanced)
> * Add cross-links to applied content (where terms are used)
> * Update search indexing and sidebar config
> 
> **Success Criteria:**
> 
> * All 60+ terms moved and cross-linked
> * Difficulty level tags visible
> * Search finds all terms
> * Sidebar updated (auto-generate from /reference/glossary)
> * Links from other pages to glossary terms verified

---

### MOS-223 — MOS-223: Reorganize Cheatsheets for /reference section

**Closed:** 2026-05-09

> Move all 11 cheatsheets to /reference/cheatsheets with better organization.
> 
> **Deliverables:**
> 
> * Move all cheatsheets to /reference/cheatsheets/
> * Update sidebar to auto-generate from new location
> * Organize by topic: interview prep, tools, concepts, workflows
> * Add "last verified" metadata to each
> 
> **Success Criteria:**
> 
> * All 11 cheatsheets moved and linked
> * Sidebar auto-generates (verify astro.config.mjs)
> * Navigation to cheatsheets works from old and new locations
> * "Last verified" dates added to frontmatter
> * Cheatsheets searchable by topic

---

### MOS-224 — MOS-224: Create /reference/benchmarks page

**Closed:** 2026-05-09

> Create comprehensive benchmarks reference with sortable leaderboards.
> 
> **Deliverables:**
> 
> * /reference/benchmarks.md with sections:
>   * Major benchmarks explained (HumanEval, MATH, GPQA, etc.)
>   * Sortable tables for each benchmark
>   * Historical tracking (model performance over time)
>   * Links to official benchmark sources
> 
> **Success Criteria:**
> 
> * All major benchmarks represented
> * Tables sortable (by model, score, date)
> * Explanations of what each benchmark measures
> * Visual trending (optional but nice)
> * Mobile responsive

---

### MOS-225 — MOS-225: Create /reference/model-specs page

**Closed:** 2026-05-09

> Create detailed specifications reference for major AI models.
> 
> **Deliverables:**
> 
> * /reference/model-specs.md with:
>   * Detailed specs for 15+ major models
>   * Context window, pricing, speed, capabilities
>   * Capabilities matrix (coding, reasoning, writing, etc.)
>   * Where to use each model
> 
> **Success Criteria:**
> 
> * All major models (Claude, GPT, Gemini, Llama, etc.) covered
> * Specs regularly updated (via MOS-253 monitoring)
> * Capabilities shown as heatmap or structured table
> * Links to official model pages
> * Mobile responsive

---

### MOS-226 — MOS-226: Create /reference/tools-landscape page

**Closed:** 2026-05-09

> Create reference guide to the AI tools ecosystem.
> 
> **Deliverables:**
> 
> * /reference/tools-landscape.md with:
>   * Tools categorized by use case (chat, coding, image, video, etc.)
>   * For each tool: price, features, free tier, who it's best for
>   * Comparison to alternatives
>   * Links to tool reviews
> 
> **Success Criteria:**
> 
> * 30+ tools covered across 5+ categories
> * Pricing info kept current (flagged by MOS-253)
> * Clear comparison guides (vs section)
> * Mobile responsive
> * Linked from /decide/tools and /cheatsheets

---

### MOS-228 — MOS-228: Create /research/whats-new page (template)

**Closed:** 2026-05-09

> Create template and first version of monthly update log.
> 
> **Deliverables:**
> 
> * /research/whats-new.md template with sections:
>   * New: features/models/pages added this month
>   * Updated: pages refreshed and why
>   * Deprecated: things removed or superseded
>   * Coming: what's planned next month
> * README in /research explaining update process
> 
> **Success Criteria:**
> 
> * Template is clear and easy to update monthly
> * Current month's updates filled in
> * Links to updated/new pages working
> * Mobile responsive
> * Clear update process documented

---

### MOS-229 — MOS-229: Create /research/model-releases tracker

**Closed:** 2026-05-09

> Create feed of new model releases with benchmarks.
> 
> **Deliverables:**
> 
> * /research/model-releases.md with:
>   * Feed of new releases (Claude, OpenAI, Google, Meta, open-source)
>   * Key improvements and capabilities
>   * Benchmark comparisons to previous versions
>   * Release date and availability
> 
> **Success Criteria:**
> 
> * All major model families covered
> * Updated weekly via GitHub Actions (MOS-253)
> * Benchmarks provided
> * Organized chronologically
> * Links to official release notes

---

### MOS-232 — Create /deep-dive/how-llms-work guide

**Closed:** 2026-05-09

> Create comprehensive technical guide to LLM fundamentals.
> 
> **Deliverables:**
> 
> * /deep-dive/how-llms-work.md with sections:
>   * Tokens and tokenization
>   * Embeddings
>   * Attention mechanism
>   * Transformers architecture
>   * Training vs inference
>   * Scaling laws
> 
> **Success Criteria:**
> 
> * Explains concepts clearly for intermediate audience
> * Includes diagrams (Mermaid or SVG)
> * Links to papers and resources
> * Math equations explained in prose too
> * Connects to practical applications
> * \~4000+ words

---

### MOS-233 — Create /deep-dive/agents-frameworks guide

**Closed:** 2026-05-09

> Create guide to agent systems, frameworks, and patterns.
> 
> **Deliverables:**
> 
> * /deep-dive/agents-frameworks.md with:
>   * What are agents and how do they work?
>   * Agent loop: perceive, reason, act, observe
>   * Tool use and function calling
>   * Top frameworks: LangGraph, CrewAI, AutoGen, MetaGPT
>   * Multi-agent orchestration patterns
>   * Production patterns and challenges
> 
> **Success Criteria:**
> 
> * Clear agent loop diagram
> * Framework comparison table
> * Real-world examples
> * Links to framework docs
> * Common patterns and anti-patterns
> * \~3000 words

---

### MOS-234 — Create /deep-dive/training-finetuning guide

**Closed:** 2026-05-09

> Create guide to training, fine-tuning, and related techniques.
> 
> **Deliverables:**
> 
> * /deep-dive/training-finetuning.md covering:
>   * Training vs fine-tuning vs RAG vs prompting tradeoffs
>   * When to use each approach
>   * Fine-tuning techniques (LoRA, QLoRA, full fine-tune)
>   * Data preparation and curation
>   * Cost considerations
>   * Evaluation and metrics
> 
> **Success Criteria:**
> 
> * Decision tree: which technique to use?
> * Cost/capability comparison matrix
> * Data preparation checklist
> * Links to datasets (HuggingFace)
> * Real examples
> * \~2500 words

---

### MOS-235 — Create /deep-dive/prompt-engineering guide

**Closed:** 2026-05-09

> Create comprehensive guide to prompt engineering techniques.
> 
> **Deliverables:**
> 
> * /deep-dive/prompt-engineering.md with:
>   * Prompt structure and anatomy
>   * Few-shot prompting
>   * Chain-of-thought prompting
>   * System prompts and role-playing
>   * Advanced techniques (prompt chaining, self-critique)
>   * Testing and iteration process
> 
> **Success Criteria:**
> 
> * Clear before/after examples
> * Technique comparison
> * Best practices checklist
> * Links to research papers
> * Tools for prompt testing
> * \~2000 words

---

### MOS-237 — Create /deep-dive/eval-and-testing guide

**Closed:** 2026-05-09

> Create guide to evaluating and testing LLM applications.
> 
> **Deliverables:**
> 
> * /deep-dive/eval-and-testing.md with:
>   * Evaluating LLM outputs (qualitative vs quantitative)
>   * Custom metrics and evaluation functions
>   * A/B testing approaches
>   * Benchmark selection and interpretation
>   * Guardrails and safety testing
>   * LLM-as-judge patterns
> 
> **Success Criteria:**
> 
> * Evaluation framework
> * Metric examples with code
> * A/B testing checklist
> * Benchmark comparison table
> * Links to eval frameworks (DeepEval, etc.)
> * \~2000 words

---

### MOS-238 — Migrate /tools to /decide/tools

**Closed:** 2026-05-09

> Move and restructure tools content to new /decide location.
> 
> **Deliverables:**
> 
> * Move /tools.mdx to /decide/tools/guide.md
> * Add interactive selector ([MOS-220](https://linear.app/mose/issue/MOS-220/mos-220-add-interactive-model-selector))
> * Update decision framework
> * Create redirects from old URL
> * Update all internal links to tools
> 
> **Success Criteria:**
> 
> * Old /tools/ URL redirects to /decide/tools/
> * All links updated in other pages
> * Sidebar reflects new location
> * Search indexes new location
> * No broken links in /decide/tools

---

### MOS-239 — Migrate /open-source to /research/models

**Closed:** 2026-05-09

> Reorganize and expand open-source models content to /research section.
> 
> **Deliverables:**
> 
> * Move /open-source.md to /research/models/guide.md
> * Add May 2026 models (Llama 4, DeepSeek V4, Qwen 3.5, etc.)
> * Include benchmarks and capability comparisons
> * Add deployment and hosting guidance
> * Link to /reference/model-specs
> 
> **Success Criteria:**
> 
> * 15+ major open-source models documented
> * Benchmarks for each model
> * Deployment options listed
> * Links to model cards (HuggingFace)
> * Redirects from old URL
> * Mobile responsive

---

### MOS-240 — Migrate /guides content to appropriate homes

**Closed:** 2026-05-09

> Reorganize guides to new IA structure, consolidate duplicates.
> 
> **Deliverables:**
> 
> * /guides/how-it-works → /learn/beginner or /deep-dive/how-llms-work
> * /guides/llm-from-scratch → /deep-dive/training
> * Create /learn/intermediate guides as needed
> * Consolidate redundant guides
> * Update all internal links
> 
> **Success Criteria:**
> 
> * All guide content moved to appropriate new homes
> * No duplicate content
> * Redirects from old /guides/ URLs
> * Sidebar updated
> * Links verified
> * Content cross-referenced

---

### MOS-241 — Create cost calculator tool

**Closed:** 2026-05-09

> Build interactive cost calculator for AI tool usage.
> 
> **Deliverables:**
> 
> * React component for /decide/cost-calculator
> * Sliders for: tokens/month, API calls, images, videos
> * Estimated monthly spend by category
> * Breakdown by tool category
> * Savings recommendations
> * Mobile responsive
> 
> **Success Criteria:**
> 
> * Component renders smoothly
> * Calculations accurate (verified against pricing)
> * Mobile responsive
> * Accessible (keyboard nav)
> * Shows cost breakdown
> * Links to pricing pages

---

### MOS-242 — Add "Report Outdated" button to all pages

**Closed:** 2026-05-09

> Implement feedback mechanism for reporting outdated information.
> 
> **Deliverables:**
> 
> * Footer button on all pages
> * Auto-creates GitHub issue with:
>   * Page URL
>   * Timestamp
>   * Suggested update (user can fill in)
> * Google Form fallback option
> * Track submissions
> 
> **Success Criteria:**
> 
> * Button appears on all pages
> * GitHub issues auto-create with correct labels
> * User can optionally add details
> * Response SLA: 48 hours
> * Submissions tracked

---

### MOS-243 — Create interactive tool comparison component

**Closed:** 2026-05-09

> Build React component for comparing 2-3 tools side-by-side.
> 
> **Deliverables:**
> 
> * Reusable React component
> * Select 2-3 tools to compare
> * Spec comparison (price, features, context, speed)
> * Trade-off explanations
> * Links to detailed pages
> * Mobile responsive card layout
> 
> **Success Criteria:**
> 
> * Component works across multiple pages
> * Comparison data in structured format
> * Mobile responsive
> * Accessible
> * Trade-off explanations clear
> * Fast to load

---

### MOS-244 — Add "See Also" / related content sections

**Closed:** 2026-05-09

> Auto-generate related content links using metadata.
> 
> **Deliverables:**
> 
> * Component that reads frontmatter tags
> * Links to glossary terms used in page
> * Links to related guides and references
> * Build internal link graph
> * Display prominently at end of pages
> 
> **Success Criteria:**
> 
> * Related links appear on all pages
> * Links are relevant (powered by tags)
> * Glossary terms highlighted and linked
> * Link graph built and tested
> * No dead links

---

### MOS-245 — Create interactive benchmark visualizations

**Closed:** 2026-05-09

> Build interactive benchmark leaderboard visualizations.
> 
> **Deliverables:**
> 
> * React component with:
>   * Sortable table with drag/drop
>   * Filter by model family, task, etc.
>   * Trend visualization (performance over time)
>   * Mobile responsive card layout
> * Data source: benchmark data file
> 
> **Success Criteria:**
> 
> * Sorting works smoothly
> * Filtering responsive
> * Trend chart shows historical data
> * Mobile responsive
> * Accessible
> * Performance optimized

---

### MOS-246 — Create model capability matrix

**Closed:** 2026-05-09

> Build interactive heatmap showing model capabilities by task.
> 
> **Deliverables:**
> 
> * React component showing:
>   * X-axis: Models (Claude, GPT, Gemini, etc.)
>   * Y-axis: Tasks (coding, math, reasoning, writing, etc.)
>   * Heatmap: win/loss/tie coloring
>   * Tooltip with benchmark scores
>   * Mobile responsive
> 
> **Success Criteria:**
> 
> * Heatmap loads quickly
> * Data kept current (linked to MOS-253)
> * Mobile responsive
> * Accessible
> * Tooltips informative
> * Links to detailed comparisons

---

### MOS-247 — Add learning path progress tracker

**Closed:** 2026-05-09

> Implement progress tracking for learning paths.
> 
> **Deliverables:**
> 
> * UI component showing % complete
> * Mark lessons as done (checkbox)
> * Save progress to localStorage
> * Resume where you left off
> * Show progress badge on path pages
> 
> **Success Criteria:**
> 
> * Progress persists across sessions (localStorage)
> * Visual progress indicator clear
> * Works on all learning paths ([MOS-213](https://linear.app/mose/issue/MOS-213/mos-213-create-beginner-learning-path)-216)
> * Mobile responsive
> * No external storage required
> * User can reset progress

---

### MOS-248 — Create trending topics widget

**Closed:** 2026-05-09

> Build "What's hot in AI" widget for homepage and /research.
> 
> **Deliverables:**
> 
> * Widget showing top trends/news of the month
> * Pull from /research/whats-new ([MOS-228](https://linear.app/mose/issue/MOS-228/mos-228-create-researchwhats-new-page-template))
> * Update weekly
> * Display on homepage and /research
> * Links to full articles
> 
> **Success Criteria:**
> 
> * Widget updates weekly
> * Trends are current and relevant
> * Appears on homepage
> * Mobile responsive
> * Performance optimized

---

### MOS-250 — Add lastVerified dates to all pages

**Closed:** 2026-05-09

> Add and standardize verification metadata across all pages.
> 
> **Deliverables:**
> 
> * Add to YAML frontmatter: lastVerified, nextVerificationDue
> * Create tool to flag overdue pages
> * Set up monitoring
> * Document maintenance schedule
> 
> **Success Criteria:**
> 
> * All pages have lastVerified date
> * Overdue pages flagged
> * Monitoring tool works
> * Dates realistic and current
> * Tool integrated with MOS-253

---

### MOS-251 — Create content audit checklist

**Closed:** 2026-05-09

> Establish monthly/quarterly content review process.
> 
> **Deliverables:**
> 
> * Document in MAINTENANCE.md
> * Tier 1 (critical): monthly review
> * Tier 2 (important): quarterly review
> * Tier 3 (stable): annual review
> * Checklist for each tier
> 
> **Success Criteria:**
> 
> * Process is clear and repeatable
> * All pages categorized by tier
> * Checklist covers key verification areas
> * Integration with automated checks (MOS-253)

---

### MOS-252 — Set up automated monitoring (GitHub Actions)

**Closed:** 2026-05-09

> Create automated checks for content freshness and accuracy.
> 
> **Deliverables:**
> 
> * GitHub Actions workflows for:
>   * Pricing change detection
>   * Model release monitoring
>   * Benchmark leaderboard tracking
>   * Stale content detection
>   * Broken link checking
>   * Auto-create GitHub issues for changes
> 
> **Success Criteria:**
> 
> * Workflows run on schedule
> * Pricing changes detected
> * New models flagged
> * Stale content flagged
> * Issues auto-created
> * Maintainer notified within 1 hour

---

### MOS-253 — Create fact-check workflow

**Closed:** 2026-05-09

> Establish standardized fact-checking process for content.
> 
> **Deliverables:**
> 
> * Standardized sources (vendor docs, Papers with Code, etc.)
> * Citation format for factual claims
> * Flag unverified claims
> * Maintainer checklist for fact-checking
> 
> **Success Criteria:**
> 
> * Sources list agreed upon
> * All Tier 1 pages fact-checked
> * Claims have sources cited
> * Process documented
> * Applied to new contributions

---

### MOS-254 — Add metadata and frontmatter standardization

**Closed:** 2026-05-09

> Standardize YAML frontmatter across all pages.
> 
> **Deliverables:**
> 
> * All pages have: title, description, lastUpdated
> * Content pages add: difficulty, tags, relatedPages
> * New content marked: status (draft/published)
> * Optional: author, reviewer
> 
> **Success Criteria:**
> 
> * All pages validated for required frontmatter
> * Template created for new pages
> * Documentation updated
> * Search can filter by difficulty/tags
> * Related pages link working

---

### MOS-255 — Create GitHub contribution workflow

**Closed:** 2026-05-09

> Set up GitHub issue templates, PR templates, and branch protection.
> 
> **Deliverables:**
> 
> * Issue templates (bug, feature, outdated, question)
> * PR template with checklist
> * Branch protection rules for main
> * GitHub labels (type, priority, area)
> * First-contributor guide
> 
> **Success Criteria:**
> 
> * Templates auto-populate for new issues/PRs
> * Branch protection prevents direct pushes
> * Labels are organized and documented
> * First-time contributor guide in CONTRIBUTING.md
> * All templates follow existing conventions

---

### MOS-256 — Document contributing guidelines

**Closed:** 2026-05-09

> Expand and finalize contribution documentation.
> 
> **Deliverables:**
> 
> * How to fork and clone repo
> * How to run dev server locally
> * Fact-checking process
> * Writing style guide
> * What gets merged vs rejected criteria
> 
> **Success Criteria:**
> 
> * New contributors can set up locally in < 10 minutes
> * Style guide matches existing content
> * Fact-checking process clear
> * Examples of good/bad contributions
> * Links to resources (CLAUDE.md, MAINTAINING.md)

---

### MOS-257 — Create /community/contributing page

**Closed:** 2026-05-09

> Create web page for contribution info on the site.
> 
> **Deliverables:**
> 
> * /community/contributing page on site
> * Link to CONTRIBUTING.md
> * How to set up locally (quick start)
> * Where to get help (Discord/Slack/GitHub)
> * Recognition section
> * Examples of great contributions
> 
> **Success Criteria:**
> 
> * Page is discoverable from homepage
> * Setup instructions clear
> * Links are working
> * Mobile responsive
> * Recognition section updates easily

---

### MOS-258 — Create contributors recognition system

**Closed:** 2026-05-09

> Set up system to recognize community contributions.
> 
> **Deliverables:**
> 
> * /contributors page (list of contributors)
> * README mention
> * Commit co-authoring for PRs
> * Linear issue credit
> 
> **Success Criteria:**
> 
> * Contributors page auto-generated from git history
> * README updated with contributors
> * Co-authored-by trailer in commits
> * Easy to update manually
> * Recognizes all types of contributions

---

### MOS-260 — Create content audit & monitoring system

**Closed:** 2026-05-09

> Build tracking system for all pages and review dates.
> 
> **Deliverables:**
> 
> * Spreadsheet/tracking of all pages
> * Last-verified date for each
> * Review frequency (Tier 1/2/3)
> * Automation status
> * Issues/blockers column
> 
> **Success Criteria:**
> 
> * All pages tracked
> * Easy to see what needs review
> * Integrates with automated checks ([MOS-253](https://linear.app/mose/issue/MOS-253/mos-254-create-fact-check-workflow))
> * Updated monthly
> * Accessible to maintainer

---

### MOS-261 — Set up analytics tracking (Plausible/Cloudflare)

**Closed:** 2026-05-09

> Implement analytics for usage tracking and engagement.
> 
> **Deliverables:**
> 
> * Choose platform (Plausible or Cloudflare)
> * Install tracking code
> * Custom events (path complete, tool selected, etc.)
> * Dashboard creation
> * Weekly reports setup
> 
> **Success Criteria:**
> 
> * Analytics collecting data
> * Custom events firing correctly
> * Dashboard shows key metrics
> * Reports automated weekly
> * Privacy-first approach

---

### MOS-262 — Create monthly maintenance checklist

**Closed:** 2026-05-09

> Document routine maintenance tasks for sustainability.
> 
> **Deliverables:**
> 
> * Checklist in MAINTENANCE.md
> * Prices verification
> * Link health check
> * Stale content review
> * New releases check
> * Changelog update
> 
> **Success Criteria:**
> 
> * Checklist is actionable
> * Time estimate (3-4 hours/month)
> * Automation handles most tasks
> * Manual review clear
> * Integrated with GitHub Actions

---

### MOS-263 — Document maintenance procedures

**Closed:** 2026-05-09

> Document ongoing maintenance procedures and SLAs.
> 
> **Deliverables:**
> 
> * Weekly automated checks documented
> * Monthly manual review process
> * Quarterly deep audit checklist
> * Tools and resources needed
> * Response SLAs for issues
> 
> **Success Criteria:**
> 
> * Procedures are clear and repeatable
> * Time estimates provided
> * Tools list with links
> * Response SLAs defined
> * Backup procedures documented

---

### MOS-264 — Implement SEO optimization (schema.org, Open Graph)

**Closed:** 2026-05-09

> Add SEO markup and social sharing optimization.
> 
> **Deliverables:**
> 
> * [schema.org](<http://schema.org>) markup (Article, BreadcrumbList, FAQPage)
> * Open Graph tags for all pages
> * Meta descriptions for all pages
> * Submit to Google Search Console
> * Monitor rankings
> 
> **Success Criteria:**
> 
> * All pages have [schema.org](<http://schema.org>) markup
> * OG tags populated for social sharing
> * Meta descriptions 60-160 chars
> * Indexed by Google
> * Pages appearing in search results

---

### MOS-265 — Optimize Core Web Vitals and performance

**Closed:** 2026-05-09

> Optimize site performance metrics.
> 
> **Deliverables:**
> 
> * LCP < 2.5s, FID < 100ms, CLS < 0.1
> * Image optimization (WebP format)
> * CSS/JS minification
> * Code splitting for large pages
> * Verify with PageSpeed Insights
> 
> **Success Criteria:**
> 
> * All Core Web Vitals met
> * PageSpeed score > 90
> * Mobile score > 85
> * Images in WebP format
> * No performance regressions

---

### MOS-266 — Build internal linking strategy

**Closed:** 2026-05-09

> Create and implement strategic internal linking.
> 
> **Deliverables:**
> 
> * Map link graph (which pages link where?)
> * Add "See Also" sections (from [MOS-245](https://linear.app/mose/issue/MOS-245/mos-246-create-interactive-benchmark-visualizations))
> * Cross-link related content
> * Glossary term linking
> * Test link health
> 
> **Success Criteria:**
> 
> * Link graph documented
> * All pages have 3-5 internal links
> * No broken links
> * Related content links working
> * Improved content discovery

---

## Medium Priority

### MOS-200 — Create interactive model selector (filter by use case, cost, speed)

**Closed:** 2026-05-09

> ## Problem
> 
> Readers can't easily find the right model for their use case.
> 
> ## Solution
> 
> Create interactive tool on /models or /benchmarks:
> 
> ### Features
> 
> ```
> Filter by:
> - [ ] Coding
> - [ ] Writing
> - [ ] Reasoning
> - [ ] Math
> - [ ] Budget (< $5/1M tokens)
> - [ ] Speed (< 2s time-to-first-token)
> - [ ] Context (> 100k tokens)
> ```
> 
> Results show:
> 
> * Model name
> * Top benchmarks
> * Pricing
> * Best use case
> * Link to full comparison
> 
> ### Implementation
> 
> * React component
> * Filter state in useState
> * Data from /benchmarks data
> * Mobile responsive
> * No backend required (static filtering)
> 
> ### Data Structu...

---

### MOS-201 — Create interactive tool comparison tables (sortable, filterable)

**Closed:** 2026-05-09

> ## Problem
> 
> /tools pricing table is static and hard to compare across dimensions.
> 
> ## Solution
> 
> Make /tools table interactive:
> 
> ### Features
> 
> ```
> Columns (all sortable):
> - Tool name
> - Use case
> - Free tier?
> - Pricing
> - Context window (for LLMs)
> - Speed
> - Link
> ```
> 
> ### Filters
> 
> ```
> Filter by:
> - [ ] Has free tier
> - [ ] Cost range slider ($0-$100)
> - [ ] Category (Chat, Coding, Image, etc.)
> - [ ] Use case
> ```
> 
> ### Interactions
> 
> * Click column header to sort
> * Hover shows tooltip with details
> * Click row to expand full details
> * Mobile: stacked card layout
> 
> ### Data Structure
> 
> ```javascript
> tools...

---

### MOS-204 — Set up SEO optimization (schema.org, Open Graph, internal linking)

**Closed:** 2026-05-09

> ## Problem
> 
> Content exists but isn't discoverable via search. No structured data for rich results.
> 
> ## Solution
> 
> Implement SEO best practices:
> 
> ### 1\. Structured Data ([schema.org](<http://schema.org>))
> 
> Add to every page:
> 
> * Article schema (title, description, author, datePublished, dateModified)
> * BreadcrumbList (navigation path)
> * FAQPage (if applicable)
> 
> ### 2\. Open Graph Tags
> 
> For social sharing:
> 
> ```html
> <meta property=\"og:title\" content=\"...\"/>
> <meta property=\"og:description\" content=\"...\"/>
> <meta property=\"og:image\" content=\"...\"/>
> <meta property=\"og:url\" content=\"....

---

### MOS-205 — Create cost calculator tool (estimate monthly spend by use case)

**Closed:** 2026-05-09

> ## Problem
> 
> Readers don't know how much AI tools will cost for their use case.
> 
> ## Solution
> 
> Create interactive cost calculator:
> 
> ### Inputs
> 
> ```
> What's your use case?
> - [ ] Content writing (estimate: pages/month)
> - [ ] Coding (estimate: hours/day)
> - [ ] Research (estimate: queries/day)
> - [ ] Image generation (estimate: images/month)
> - [ ] Video generation (estimate: minutes/month)
> - [ ] Production LLM app (estimate: API calls/month)
> ```
> 
> ### Calculation
> 
> For each input, estimate:
> 
> * Tokens per operation
> * Cost per 1M tokens (from /tools)
> * Monthly cost
> * Show with vs without free tier
> 
> ###...

---

### MOS-216 — MOS-216: Create Researcher/Trend-Watcher Learning Path

**Closed:** 2026-05-09

> Create a learning path for staying current with AI research and trends.
> 
> **Deliverables:**
> 
> * /learn/paths/researcher.md with sections:
>   * Latest models and releases
>   * Benchmarks and leaderboards
>   * Emerging trends and research papers
>   * Where to follow for updates
> 
> **Success Criteria:**
> 
> * Links to model release trackers (MOS-229)
> * Includes benchmark resources (Papers with Code, model-specific leaderboards)
> * Highlights key conferences and papers
> * Provides follow-worthy researchers and communities
> * Points to /research section for deeper dives

---

### MOS-227 — MOS-227: Create /reference/ai-landscape-mindmap

**Closed:** 2026-05-09

> Create visual mindmap overview of the AI ecosystem.
> 
> **Deliverables:**
> 
> * SVG or embedded mindmap showing:
>   * Models (categorized by type)
>   * Tools and frameworks
>   * Techniques (RAG, agents, prompting, etc.)
>   * Optional interactivity (clickable nodes linking to details)
> 
> **Success Criteria:**
> 
> * Visual overview captures all major areas
> * Rendering is legible (not too dense)
> * Interactive version optional but preferred
> * Fits in page width
> * Accessible (text alternative provided)

---

### MOS-230 — Create /research/emerging-trends page

**Closed:** 2026-05-09

> Create guide to cutting-edge trends and developments in AI.
> 
> **Deliverables:**
> 
> * /research/emerging-trends.md with deep dives on:
>   * Multi-agent orchestration
>   * Reasoning models (o1, r1, etc.)
>   * Open-source acceleration
>   * Vision improvements
>   * Deployment optimization
> 
> **Success Criteria:**
> 
> * Each trend has 200-500 words explanation
> * Includes research papers and examples
> * Links to related deep dives and tools
> * Updated quarterly
> * Accessible to non-experts

---

### MOS-231 — Create /research/bibliography & papers

**Closed:** 2026-05-09

> Create curated bibliography of key research papers on LLMs.
> 
> **Deliverables:**
> 
> * /research/papers.md with sections:
>   * Foundational papers (Transformers, Attention is All You Need)
>   * Recent papers (RAG, agents, multimodal)
>   * Implementation guides linking papers to guides
>   * Link to full paper locations
> 
> **Success Criteria:**
> 
> * 20+ seminal papers included
> * Papers organized by topic
> * Links to ArXiv or official PDF
> * Brief summary of each paper
> * Application to practical problems noted

---

### MOS-236 — Create /deep-dive/inference-optimization guide

**Closed:** 2026-05-09

> Create guide to optimizing LLM inference for cost and speed.
> 
> **Deliverables:**
> 
> * /deep-dive/inference-optimization.md covering:
>   * Quantization techniques (INT8, INT4, etc.)
>   * Caching strategies (prompt, KV caching)
>   * Batching and throughput
>   * Speculative decoding
>   * Cost optimization strategies
>   * Latency optimization
> 
> **Success Criteria:**
> 
> * Quantization tradeoff matrix
> * Caching patterns explained
> * Calculation examples (cost/speed)
> * Links to tools (vLLM, TensorRT-LLM)
> * Benchmarks
> * \~2000 words

---

### MOS-259 — Set up "Help Wanted" issues

**Closed:** 2026-05-09

> Create and maintain list of good-for-contributors issues.
> 
> **Deliverables:**
> 
> * Tag issues that are good for external contributors
> * Provide context and resources
> * Keep list updated (quarterly)
> 
> **Success Criteria:**
> 
> * 10+ "help wanted" issues at any time
> * Issues tagged and labeled
> * Each has clear scope and resources
> * Updated quarterly
> * Attracts first-time contributors

---

### MOS-267 — Create /resources/papers page

**Closed:** 2026-05-09

> Create curated research papers resource page.
> 
> **Deliverables:**
> 
> * /resources/papers.md with:
>   * Key foundational papers
>   * Recent research papers
>   * Implementation guides linked to papers
>   * Where to find more
> 
> **Success Criteria:**
> 
> * 20+ papers curated
> * Links to ArXiv or PDF
> * Organized by topic
> * Summaries provided
> * Links to implementations

---

### MOS-268 — Create /resources/communities page

**Closed:** 2026-05-09

> Create page listing AI communities and forums.
> 
> **Deliverables:**
> 
> * /resources/communities.md with:
>   * Reddit communities
>   * Discord servers
>   * Slack workspaces
>   * Twitter/X accounts to follow
>   * Conferences and events
>   * Local meetups
> 
> **Success Criteria:**
> 
> * 30+ communities listed
> * Descriptions for each
> * Links verified
> * Organized by type
> * Updated quarterly

---

### MOS-269 — Create /resources/tools-frameworks page

**Closed:** 2026-05-09

> Create comprehensive tools and frameworks resource.
> 
> **Deliverables:**
> 
> * /resources/tools-frameworks.md with:
>   * LangChain, LlamaIndex, Haystack, etc.
>   * Official SDKs (Anthropic, OpenAI, Google)
>   * Deployment platforms (Vercel, Railway, etc.)
>   * Monitoring tools (Pydantic, Langfuse, etc.)
> 
> **Success Criteria:**
> 
> * 30+ tools documented
> * Links to official docs
> * Category organization
> * Use cases for each
> * Comparison matrix

---

### MOS-270 — Create /history/timeline page

**Closed:** 2026-05-09

> Migrate and expand history to /reference/history section.
> 
> **Deliverables:**
> 
> * Move history.mdx to /reference/history
> * Update with May 2026 timeline
> * Add key model release dates
> * Optional: interactive timeline
> 
> **Success Criteria:**
> 
> * All major AI milestones included
> * Timeline accurate and complete
> * Model release dates correct
> * Interactive version (optional)
> * Links from other pages

---

### MOS-271 — Create quick-reference cheat sheets

**Closed:** 2026-05-09

> Create downloadable quick-reference guides for beginners.
> 
> **Deliverables:**
> 
> * 1-page LLM primer (PDF)
> * 1-page tools comparison (PDF)
> * 1-page prompt engineering basics (PDF)
> * Downloadable from /resources
> 
> **Success Criteria:**
> 
> * All 3 sheets created
> * Design is clean and scannable
> * PDFs downloadable
> * Content accurate
> * Mobile-friendly versions

---

### MOS-272 — Create /research/vocabulary page

**Closed:** 2026-05-09

> Create page explaining AI terminology and taxonomy.
> 
> **Deliverables:**
> 
> * /research/vocabulary.md with:
>   * AI vs AGI vs ASI definitions
>   * GenAI vs traditional ML
>   * Fine-tuning vs RAG vs prompt engineering
>   * Why terminology matters
>   * Common misuses explained
> 
> **Success Criteria:**
> 
> * Key term distinctions clear
> * Examples for each term
> * Links to related content
> * No jargon (explain simply)
> * Accessible to beginners

---

### MOS-339 — Add accessibility attributes (aria-*, role=*) to all interactive components

**Closed:** 2026-05-16

> All interactive components (ModelSelector, ToolComparison, BenchmarkViz, CostCalculator, ModelMatrix) use vanilla JS DOM manipulation but have no accessibility attributes. Screen readers and keyboard-only users cannot fully use these components.
> 
> ## Missing attributes
> 
> * Filter chips: no `role="button"` or `aria-pressed` for toggle state
> * Model cards: no `role` attribute
> * Sort column headers: no `aria-sort="ascending|descending|none"`
> * Search inputs: no `aria-label`
> * Tab buttons (ToolComparison): no `role="tab"` / `aria-selected`
> * Modal-like dropdowns (ContentOverride): no `aria-expand...

---

### MOS-340 — Consolidate model data: wire CostCalculator + ModelSelector to models.ts

**Closed:** 2026-05-16

> The CostCalculator and ModelSelector components have hardcoded model data (pricing, context windows, speed). When models update, these components need manual edits — separate from `src/data/models.ts` which drives ModelCompare and the search index.
> 
> ## Current state
> 
> * `src/data/models.ts` — single source of truth for ModelCompare + chatbot search
> * `CostCalculator.astro` — hardcoded pricing object with 14 models (diverges from models.ts)
> * `ModelSelector.astro` — hardcoded model array with speeds/tags (diverges from models.ts)
> 
> ## Goal
> 
> Extend `models.ts` to include all fields needed by Co...

---

## Low Priority

### MOS-341 — Establish update cadence for TrendingWidget data (trends.ts)

**Closed:** 2026-05-16

> The TrendingWidget component in `src/data/trends.ts` has 10 hardcoded trend entries last updated during the site build. Trends go stale quickly — new models, releases, and research happen weekly.
> 
> ## Current state
> 
> * `src/data/trends.ts` — static array of 10 trends with dates and links
> * `TrendingWidget.astro` — renders the array as cards on homepage + /research/whats-new
> 
> ## Options
> 
> 1. **Manual update cadence** — add a reminder issue monthly to refresh trends.ts
> 2. **RSS/API-driven** — fetch from Hugging Face papers, arXiv, or similar at build time
> 3. **GitHub Action** — weekly workflow t...

---

## No priority Priority

### MOS-312 — Optimize left sidebar scrollbar styling to match dark theme

**Closed:** 2026-05-18

> The left sidebar navigation in Starlight uses the browser default scrollbar, which looks out of place in dark mode. It's wide, visually noisy, and doesn't match the theme.
> 
> ## Suggested Work
> 
> Style the sidebar scrollbar to match the playbook theme using CSS. Starlight's sidebar is rendered inside a `.starlight-sidebar` or `nav` element. Apply custom scrollbar styles:
> 
> * Thin width (6-8px)
> * Dark background to match the theme
> * Auto-hiding / translucent when not hovered
> * Rounded track and thumb
> 
> ## Files
> 
> * `src/styles/custom.css` — add `::-webkit-scrollbar` styles targeting the sidebar con...

---

### MOS-314 — Improve main search bar (Pagefind) — relevance, keyboard shortcut, configuration

**Closed:** 2026-05-18

> The main search bar (Starlight's Pagefind integration) works but could be improved. Search results may not always find the most relevant content first, and the UX could be tighter.
> 
> ## What to Investigate
> 
> 1. **Pagefind configuration** — Check if we can set custom ranking weights (title matches vs body matches), result snippet length, and index options in the Starlight config.
> 2. **Search result relevance** — Test common queries ("RAG", "fine-tuning", "Claude pricing", "Design Arena") and check if the top results match what a user would want. The `Pagefind` config is in `astro.config.mjs` u...

---

### MOS-315 — Fix broken cheatsheet links across the playbook

**Closed:** 2026-05-19

> Some cheatsheet links across the playbook are broken. Cheatsheets were moved from root paths to `reference/cheatsheets/` at some point, and some cross-references may still point to old locations.
> 
> ## What to Do
> 
> 1. **Find all cheatsheet references** — Run `grep -r "cheatsheets" src/content/docs/` to find every page that links to or references cheatsheets.
> 2. **Check redirects** — Verify `public/_redirects` has entries for all old cheatsheet paths that might still be linked externally or from within the playbook.
> 3. **Fix broken links** — For any reference pointing to a non-existent path, up...

---

### MOS-316 — Make right sidebar (Table of Contents) collapsible

**Closed:** 2026-05-18

> The right sidebar (Starlight's Table of Contents) shows every heading from the current page. On long deep dives, this can be overwhelming — 15-30 headings listed vertically with no way to collapse sections.
> 
> ## Suggested Work
> 
> Make the TOC sections collapsible so users can expand/collapse heading groups.
> 
> ## Approach
> 
> Starlight allows overriding the `TableOfContents` component via the `components` option in `astro.config.mjs`:
> 
> ```js
> starlight({
>   components: {
>     TableOfContents: './src/components/CustomTOC.astro',
>   },
> })
> ```
> 
> The custom component could:
> 
> * Group headings by depth (h2 as...

---

### MOS-317 — Phase 1: Add KV logging to chatbot for response source tracking

**Closed:** 2026-05-18

> ## Summary
> 
> Add Cloudflare KV logging to the chatbot so we can analyze which responses come from playbook vs model knowledge. Every chatbot response is logged with: question, source (playbook/web/model), search queries generated, TF-IDF scores, threshold, and answer preview.
> 
> ## Implementation
> 
> ### 1\. Cloudflare Setup
> 
> * Create KV namespace `CHAT_LOGS` in Cloudflare dashboard
> * Bind it to the Pages Functions as `CHAT_LOGS` variable
> 
> ### 2\. Code Change (functions/api/chat.js)
> 
> * After getting the answer, write a log entry to KV:
> 
>   ```js
>   if (env.CHAT_LOGS) {
>     const logKey = 'log:' + D...

---

### MOS-318 — Phase 2: Build review dashboard for chatbot logs

**Closed:** 2026-05-18

> ## Summary
> 
> Build a review dashboard at `/admin/logs` that reads from the KV `CHAT_LOGS` namespace and displays all chatbot responses, grouped by source. The goal is to easily spot responses that came from model knowledge (misses) vs playbook (hits).
> 
> ## Features
> 
> * Password-protected via a simple shared secret (set as env var `ADMIN_SECRET`)
> * Or use Cloudflare Access for authentication
> * Shows last 100-500 responses
> * Color-coded by source: green (playbook), blue (web), red (model)
> * Each entry shows: question, source, search queries, scores, threshold, answer preview
> * Filter by source t...

---

### MOS-327 — Right sidebar is too wide — explore narrowing without breaking layout

**Closed:** 2026-05-18

> ## Summary
> 
> The right sidebar (Table of Contents) takes up significant horizontal space. Attempting to narrow it broke layout because Starlight's scoped CSS with `astro-*` selectors and media queries at multiple breakpoints (50rem, 72rem) control the sidebar width at three different layers:
> 
> 1. `.right-sidebar-container` — outer flex column (width formula includes `--sl-sidebar-width`)
> 2. `.right-sidebar-panel .sl-container` — inner content container (fixed at 16.75rem)
> 3. A `@media (min-width: 72rem)` rule that caps the TOC text at 25% of available space
> 
> Any override needs to handle all t...

---

### MOS-334 — Create reusable ModelCompare component to deduplicate model pricing/specs across pages

**Closed:** 2026-05-13

> ## Summary
> 
> Model pricing and specs are duplicated across multiple pages. Create a reusable `ModelCompare` Astro component that reads from `src/data/models.ts` (the canonical source) and renders a consistent comparison table. Pages embed the component instead of maintaining their own static tables.
> 
> ## Pages to Refactor
> 
> | Page | Current | After |
> | -- | -- | -- |
> | `reference/model-specs.mdx` | Static 25-row table | Embed ModelCompare component |
> | `decide/models/guide.mdx` | Already uses ModelSelector | Add cross-ref to model-specs for pricing |
> | `reference/economics-of-ai.mdx` | TCO tab...

---


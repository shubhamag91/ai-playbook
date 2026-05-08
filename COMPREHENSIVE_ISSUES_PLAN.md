# Comprehensive Linear Issues Plan

**Organized by Feature, Not Timeline**

All issues to be created for AI Playbook project.

---

## 📊 ISSUE SUMMARY

**Total Issues to Create: ~65-70**
**Total Estimated Effort: ~180-200 hours**
**Breakdown by Feature:**

- **Architecture & Structure:** 3 issues (14 hours)
- **UX & Navigation:** 3 issues already created (13 hours)
- **Learning Paths:** 4 issues (20 hours)
- **Decision Guides:** 5 issues (18 hours)
- **Reference & Lookup:** 6 issues (20 hours)
- **Research & Trends:** 4 issues (12 hours)
- **Deep Dives:** 7 issues (30 hours)
- **Content Organization:** 3 issues (15 hours)
- **Interactive Features:** 8 issues (28 hours)
- **Content Quality:** 6 issues (18 hours)
- **Community & Contribution:** 5 issues (15 hours)
- **Operations & Maintenance:** 4 issues (12 hours)
- **SEO & Performance:** 3 issues (10 hours)
- **Misc Content Gaps:** 6 issues (12 hours)

---

## ✅ ALREADY CREATED

### Architecture & Structure (3/3)
- ✅ MOS-207: Design new IA (6 hours)
- ✅ MOS-208: Implement sidebar config (3 hours)
- ✅ MOS-209: Audit & consolidate redundant pages (5 hours)

### UX & Navigation (3/3)
- ✅ MOS-210: Redesign homepage with path selector (5 hours)
- ✅ MOS-211: Add breadcrumb navigation (4 hours)
- ✅ MOS-212: Mobile-responsive navigation (4 hours)

---

## 📋 STILL TO CREATE

### Learning Paths (4 issues)

**MOS-213: Create Beginner Learning Path (4 hours)**
- What is an LLM? (30 min)
- How do they work? (1 hour)
- What can they do? (1 hour)
- Your first experiment (1 hour)
- What's real vs hype? (30 min)

**MOS-214: Create Interview Prep Path (10 hours)**
- Week 1: Fundamentals (LLM basics, architecture, model comparison)
- Week 2: System Design (RAG, agents, cost optimization)
- Practice & mock questions

**MOS-215: Create Builder Path (5 hours)**
- Choosing tools (decision framework)
- RAG architecture deep dive
- Agents & frameworks overview
- Production patterns and optimization

**MOS-216: Create Researcher/Trend-Watcher Path (1 hour)**
- Latest models and releases
- Benchmarks and leaderboards
- Emerging trends and research papers
- Where to follow for updates

---

### Decision Guides (5 issues)

**MOS-217: Create Tools Decision Guide (5 hours)**
- Decision tree: What should I choose?
- Trade-off matrix (pricing vs capability)
- Category recommendations (chat, coding, image, video, etc.)
- Free vs paid comparison
- Interactive tool selector

**MOS-218: Create Models Decision Guide (4 hours)**
- Which LLM for which task?
- Benchmark trade-offs (coding vs reasoning vs math)
- Speed vs quality vs cost
- Context window guide
- Pricing comparison

**MOS-219: Create Framework Decision Guide (3 hours)**
- Agents vs RAG vs fine-tuning vs prompt engineering
- When to use each
- Tool comparison (LangGraph vs CrewAI vs AutoGen, etc.)

**MOS-220: Add Interactive Model Selector (4 hours)**
- Filter by: task, cost, speed, context window
- See: benchmarks, pricing, links
- Mobile responsive
- Real-time filtering

**MOS-221: Add Interactive Tool Comparison Tables (2 hours)**
- Sortable columns
- Filterable by category, cost, free tier
- Mobile card layout

---

### Reference & Lookup (6 issues)

**MOS-222: Reorganize Glossary for /reference section (3 hours)**
- Move glossary to /reference/glossary
- Keep 60+ terms, 3 difficulty levels
- Add cross-links to applied content
- Update search indexing

**MOS-223: Reorganize Cheatsheets for /reference section (4 hours)**
- Move all 11 cheatsheets to /reference/cheatsheets
- Update sidebar autogenerate
- Organize by topic (interview, tools, concepts)
- Add "last verified" metadata

**MOS-224: Create /reference/benchmarks page (5 hours)**
- Model leaderboards (HumanEval, MATH, GPQA, etc.)
- Sortable tables
- Historical tracking
- Explanations of each benchmark

**MOS-225: Create /reference/model-specs page (3 hours)**
- Detailed specs for major models
- Context window, pricing, speed
- Capabilities matrix
- Where to use each

**MOS-226: Create /reference/tools-landscape page (2 hours)**
- Categorized by use case
- Price, features, free tier
- Who it's best for
- Comparison to alternatives

**MOS-227: Create /reference/ai-landscape-mindmap (2 hours)**
- SVG or embedded mindmap
- Visual overview of ecosystem
- Models, tools, frameworks, techniques
- Interactive (optional)

---

### Research & Trends (4 issues)

**MOS-228: Create /research/whats-new page (template) (1 hour)**
- Monthly update log
- New: features/models/pages added
- Updated: pages refreshed
- Deprecated: things removed
- Coming: what's planned

**MOS-229: Create /research/model-releases tracker (3 hours)**
- Feed of new model releases
- Claude, OpenAI, Google, Meta releases
- Key updates and improvements
- Benchmarks for new models

**MOS-230: Create /research/emerging-trends page (4 hours)**
- Agents (multi-agent orchestration)
- Reasoning models (o1, r1)
- Open-source acceleration
- Vision improvements
- Deployment optimization

**MOS-231: Create /research/bibliography & papers (2 hours)**
- Key research papers on LLMs
- Foundational: Transformers, Attention is All You Need
- Recent: RAG papers, agent papers
- Implementation guides

---

### Deep Dives (7 issues)

**MOS-232: Create /deep-dive/how-llms-work guide (8 hours)**
- Tokens and tokenization
- Embeddings
- Attention mechanism
- Transformers architecture
- Training vs inference
- Scaling laws

**MOS-233: Create /deep-dive/rag-architecture guide (6 hours)**
- When to use RAG
- Pipeline components (ingestion, retrieval, synthesis)
- Vector databases comparison
- Retrieval patterns (BM25, dense, hybrid)
- Production patterns
- Common pitfalls

**MOS-234: Create /deep-dive/agents-frameworks guide (6 hours)**
- What are agents?
- Agent loop (perceive, reason, act, observe)
- Tool use and integration
- Top frameworks (LangGraph, CrewAI, AutoGen, MetaGPT)
- Production patterns
- Multi-agent orchestration

**MOS-235: Create /deep-dive/training-finetuning guide (5 hours)**
- Training vs fine-tuning vs RAG vs prompting
- When to use each
- Fine-tuning techniques (LoRA, etc.)
- Data preparation
- Cost considerations
- Evaluation and metrics

**MOS-236: Create /deep-dive/prompt-engineering guide (4 hours)**
- Prompt structure
- Few-shot prompting
- Chain-of-thought prompting
- System prompts
- Advanced techniques
- Testing and iteration

**MOS-237: Create /deep-dive/inference-optimization guide (4 hours)**
- Quantization
- Caching (prompt, KV)
- Batching
- Speculative decoding
- Cost optimization
- Latency optimization

**MOS-238: Create /deep-dive/eval-and-testing guide (3 hours)**
- Evaluating LLM outputs
- Custom metrics
- A/B testing approaches
- Benchmark selection
- Guardrails and safety

---

### Content Organization (3 issues)

**MOS-239: Migrate /tools to /decide/tools (2 hours)**
- Move tools.mdx to new location
- Update decision framework
- Add interactive selector
- Update all links

**MOS-240: Migrate /open-source to /research/models (3 hours)**
- Add May 2026 models (Llama 4, DeepSeek V4, Qwen 3.5, etc.)
- Include benchmarks and comparisons
- Add deployment guidance
- Link to /reference/model-specs

**MOS-241: Migrate /guides content to appropriate new homes (8 hours)**
- /guides/how-it-works → /learn/beginner or /deep-dive/how-llms-work
- /guides/llm-from-scratch → /deep-dive/training
- Create other guides as needed
- Update all internal links

---

### Interactive Features (8 issues)

**MOS-242: Create cost calculator tool (5 hours)**
- Sliders for: tokens/month, API calls, images, videos
- Estimated monthly spend
- Breakdown by tool category
- Savings recommendations
- Mobile responsive

**MOS-243: Add "Report Outdated" button to all pages (3 hours)**
- Footer button
- GitHub issue pre-fill
- Auto-labels and priority
- Google Form fallback
- Track submissions

**MOS-244: Create interactive tool comparison (4 hours)**
- Compare 2-3 tools side-by-side
- Spec comparison (price, features, context, speed)
- Trade-off explanations
- Mobile responsive

**MOS-245: Add "See Also" / related content sections (3 hours)**
- Autogenerated from frontmatter tags
- Link to glossary terms used
- Link to related guides and references
- Build internal link graph

**MOS-246: Create interactive benchmark visualizations (4 hours)**
- Sortable table with drag/drop
- Filter by model family
- Show trends over time
- Mobile responsive

**MOS-247: Create model capability matrix (3 hours)**
- Table: Models vs tasks
- X-axis: Models (Claude, GPT, Gemini, etc.)
- Y-axis: Tasks (coding, math, reasoning, writing, etc.)
- Heatmap showing win/loss/tie

**MOS-248: Add learning path progress tracker (3 hours)**
- Show % complete for learning paths
- Mark lessons as done
- Save progress (localStorage)
- Resume where you left off

**MOS-249: Create trending topics widget (2 hours)**
- "What's hot in AI this month?"
- On homepage and /research
- Pull from /research/whats-new
- Update weekly

---

### Content Quality (6 issues)

**MOS-250: Fix accuracy issues in /tools (from critical review) (3 hours)**
- Claude Code pricing clarification
- Gemini context window options
- Flux API pricing
- Vercel v0 vs Lovable distinction
- Cursor + Claude Code complementarity

**MOS-251: Add lastVerified dates to all pages (2 hours)**
- YAML frontmatter: lastVerified, nextVerificationDue
- Create tool to flag overdue pages
- Set up monitoring

**MOS-252: Create content audit checklist (2 hours)**
- Monthly review process
- Tier 1 pages (critical) — review monthly
- Tier 2 pages (important) — review quarterly
- Tier 3 pages (stable) — review annually

**MOS-253: Set up automated monitoring (GitHub Actions) (6 hours)**
- Pricing change detection
- Model release monitoring
- Benchmark leaderboard tracking
- Stale content detection
- Broken link checker
- Auto-create GitHub issues

**MOS-254: Create fact-check workflow (2 hours)**
- Standardized sources (vendor docs, Papers with Code, etc.)
- Citation format for claims
- Flag unverified claims
- Maintainer checklist

**MOS-255: Add metadata and frontmatter standardization (2 hours)**
- title, description, lastUpdated (all pages)
- difficulty, tags, relatedPages (content)
- status: draft/published (new content)
- author, reviewer (optional)

---

### Community & Contribution (5 issues)

**MOS-256: Create GitHub contribution workflow (4 hours)**
- Issue templates (bug, feature, outdated, question)
- PR template with checklist
- Branch protection rules
- Labels (type, priority, area)
- First-contributor guide

**MOS-257: Document contributing guidelines (2 hours)**
- How to fork and clone
- How to run dev server
- Fact-checking process
- Writing style guide
- What gets merged vs rejected

**MOS-258: Create /community/contributing page (1 hour)**
- Link to CONTRIBUTING.md
- How to set up locally
- Where to get help
- Recognition for contributors
- Examples of good contributions

**MOS-259: Create contributors recognition system (2 hours)**
- /contributors page (list of contributors)
- README mention
- Commit co-authoring
- Linear issue credit

**MOS-260: Set up "Help Wanted" issues (1 hour)**
- Tag issues that are good for external contributors
- Provide context and resources
- Keep list updated

---

### Operations & Maintenance (4 issues)

**MOS-261: Create content audit & monitoring system (3 hours)**
- Spreadsheet/tracking of all pages
- Last-verified date
- Review frequency
- Automation status
- Issues/blockers

**MOS-262: Set up analytics tracking (Plausible/Cloudflare) (4 hours)**
- Choose platform
- Install tracking
- Custom events (path complete, tool selected, etc.)
- Dashboard creation
- Weekly reports

**MOS-263: Create monthly maintenance checklist (1 hour)**
- Prices verification
- Link health check
- Stale content review
- New releases check
- Changelog update

**MOS-264: Document maintenance procedures (1 hour)**
- Weekly automated checks
- Monthly manual review
- Quarterly deep audit
- Tools and resources needed
- Response SLAs

---

### SEO & Performance (3 issues)

**MOS-265: Implement SEO optimization (schema.org, Open Graph) (5 hours)**
- Add schema.org markup (Article, BreadcrumbList, FAQPage)
- Open Graph tags for social sharing
- Meta descriptions for all pages
- Submit to Google Search Console
- Monitor rankings

**MOS-266: Optimize Core Web Vitals and performance (4 hours)**
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Image optimization (WebP format)
- CSS/JS minification
- Code splitting
- Verify with PageSpeed Insights

**MOS-267: Build internal linking strategy (2 hours)**
- Link graph (which pages link where?)
- Add "See Also" sections
- Cross-link related content
- Glossary term linking
- Test link health

---

### Misc Content Gaps (6 issues)

**MOS-268: Create /resources/papers page (1 hour)**
- Key foundational papers
- Recent research
- Implementation guides
- Where to find more

**MOS-269: Create /resources/communities page (1 hour)**
- Reddit, Discord, Slack communities
- Twitter/X accounts to follow
- Conferences and events
- Local meetups

**MOS-270: Create /resources/tools-frameworks page (2 hours)**
- LangChain, LlamaIndex, Haystack
- SDKs (Anthropic, OpenAI, Google)
- Deployment platforms
- Monitoring tools

**MOS-271: Create /history/timeline page (migration & improvement) (2 hours)**
- Move history.mdx to /reference/history
- Update with May 2026 timeline
- Add key model release dates
- Interactive timeline (optional)

**MOS-272: Create quick-reference cheat sheets for beginners (2 hours)**
- 1-page LLM primer
- 1-page tools comparison
- 1-page prompt engineering basics
- Downloadable PDFs

**MOS-273: Create /research/vocabulary page (1 hour)**
- Key terms in AI that change meaning
- AI vs AGI vs ASI
- GenAI vs traditional ML
- Fine-tuning vs RAG vs prompt engineering
- Why terminology matters

---

## 🎯 IMPLEMENTATION STRATEGY

### Phase 1: Restructure (2 weeks)
- MOS-207: IA design
- MOS-208: Implement sidebar
- MOS-209: Content consolidation
- MOS-210: Homepage redesign
- MOS-211: Breadcrumbs
- MOS-212: Mobile UX

**Output:** Site has new structure, same content

### Phase 2: Fix Quality (1 week)
- MOS-250: Accuracy fixes
- MOS-251: Metadata
- MOS-252: Audit checklist
- MOS-254: Fact-checking

**Output:** All content verified, metadata added

### Phase 3: Add Learning Paths (2 weeks)
- MOS-213-216: All learning paths
- MOS-239-241: Content migration
- MOS-248: Progress tracker

**Output:** 3 role-based learning paths available

### Phase 4: Add Decision Guides (1.5 weeks)
- MOS-217-221: Decision guides + interactive tools
- MOS-222-227: Reference sections

**Output:** Easy to find answers to "which X should I use?"

### Phase 5: Add Deep Dives (2 weeks)
- MOS-232-238: All deep dive guides
- MOS-242-249: Interactive features

**Output:** Site has tutorial + reference + interactive layers

### Phase 6: Operations (1 week)
- MOS-253: Monitoring setup
- MOS-261-264: Maintenance system
- MOS-265-267: SEO + performance

**Output:** Sustainable maintenance process + good discoverability

### Phase 7: Polish (1 week)
- MOS-268-273: Misc gaps
- MOS-256-260: Community setup
- Testing and QA

**Output:** Complete, sustainable, community-ready

---

## 📊 TOTALS

| Phase | Duration | Issues | Hours | Focus |
|-------|----------|--------|-------|-------|
| 1. Restructure | 2 weeks | 6 | 29 | Foundation |
| 2. Quality | 1 week | 4 | 11 | Accuracy |
| 3. Learning | 2 weeks | 5 | 28 | Onboarding |
| 4. Decide | 1.5 weeks | 7 | 26 | Guidance |
| 5. Deep | 2 weeks | 13 | 35 | Mastery |
| 6. Operations | 1 week | 6 | 14 | Sustainability |
| 7. Polish | 1 week | 6 | 11 | Completeness |
| **TOTAL** | **~11 weeks** | **~47** | **~154** | |

---

## ✨ NEXT STEPS

1. **Review this plan** — Any issues to add/remove?
2. **Confirm priorities** — Should we adjust Phase order?
3. **Start Phase 1** — Restructuring (highest ROI)
4. **Create remaining Linear issues** — I can batch-create all ~47 issues now

Ready to proceed?

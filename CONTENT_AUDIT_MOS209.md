# Content Audit & Consolidation Plan
**Issue:** MOS-209  
**Date:** May 8, 2026  
**Status:** Audit complete, consolidation decisions made

---

## Overview

**Total Files:** 31 markdown/mdx files  
**Current Structure:** 10 directories + root level pages  
**Consolidation:** ~5 files can be merged or relocated  
**New Homes:** All content mapped to IA_DESIGN_MOS207.md structure

---

## Complete File Audit & Migration Map

### LEARN: Learning Paths & Onboarding (New)

**Beginner Path:** `/learn/beginner.md` (NEW)
- Combines: Best from glossary basics + how-it-works.md + principles.mdx
- Source files: 
  - `glossary.mdx` (extract beginner level definitions)
  - `guides/how-it-works.md` (project meta → remove, keep only LLM concepts)
  - `principles.mdx` (use principles as learning objectives)
- Output: Single 4-hour onboarding guide
- Status: CREATE NEW from consolidated sources

**Interview Prep Path:** `/learn/interview-prep.md` (NEW)
- Combines: All interview cheatsheets
- Source files:
  - `cheatsheets/llm-interview.md`
  - `cheatsheets/ai-system-design-interview.md`
  - `cheatsheets/ai-product-interview.md`
  - `cheatsheets/ml-fundamentals-interview.md`
  - `cheatsheets/ai-product-banking-interview.md`
  - `cheatsheets/behavioral-interview.md`
  - `cheatsheets/banking-analytics-interview.md`
- Output: 2-week structured curriculum with week 1 (fundamentals) + week 2 (system design)
- Status: CREATE NEW, organize existing cheatsheets into structured guide

**Builder Path:** `/learn/builder.md` (NEW)
- Combines: Tools info + RAG diagram + coding assistants
- Source files:
  - `cheatsheets/ai-tools-landscape.md` (tools decision framework)
  - `cheatsheets/coding-assistants-agents.md` (coding tools comparison)
  - `diagrams/rag-architecture.md` (RAG overview)
- Output: Hands-on guide covering tool selection, RAG, agents
- Status: CREATE NEW from existing reference materials

**Researcher Path:** `/learn/researcher.md` (NEW)
- Combines: Follow + history + model releases
- Source files:
  - `follow.mdx` (who to follow in AI)
  - `history.mdx` (timeline and milestones)
- Output: How to stay current, follow researchers, find resources
- Status: CREATE NEW, incorporate follow.mdx

---

### DECIDE: Decision Frameworks (New)

**Tools Guide:** `/decide/tools/guide.md` (CONSOLIDATE)
- Combines: Current `/tools.mdx` + `/productivity-tools.mdx`
- Source files:
  - `tools.mdx` (developer tools)
  - `productivity-tools.mdx` (everyday AI tools)
- Output: Single comprehensive tools decision guide
- Status: MERGE + DELETE `/productivity-tools.mdx`, keep `/tools.mdx` for redirect

**Models Guide:** `/decide/models/guide.md` (NEW)
- Source files:
  - `cheatsheets/llm-comparison.md` (models table)
- Output: Decision framework + comparison + benchmark guide
- Status: CREATE NEW, expand from cheatsheet

**Frameworks Guide:** `/decide/frameworks/guide.md` (NEW)
- Combines: Concepts from guides
- Source files:
  - `guides/llm-from-scratch.md` (training overview)
  - `deep-dive/rag-architecture.md` (RAG explanation)
  - `cheatsheets/coding-assistants-agents.md` (agents overview)
- Output: When to use: agents vs RAG vs fine-tuning vs prompting
- Status: CREATE NEW, synthesize from multiple sources

**Comparisons:** `/decide/comparisons/` (AUTOGENERATE)
- Will auto-populate with comparison tools and tables
- Status: NEW DIRECTORY

---

### REFERENCE: Quick Lookup & Cheatsheets

**Glossary:** `/reference/glossary.mdx` (MOVE)
- Source: `glossary.mdx`
- Status: MOVE (no changes, just relocate)
- Keep: All 60+ terms
- Add: Cross-links to applied content
- Output: `/reference/glossary/`

**Cheatsheets:** `/reference/cheatsheets/` (MOVE)
- Source: All files in `cheatsheets/` directory
- Status: MOVE directory (no changes, just relocate)
- Count: 11 files
- Structure: Auto-generate in sidebar
- Note: Interview cheatsheets also consolidated into `/learn/interview-prep/`

**Confusions (Misconceptions):** `/reference/confusions.mdx` (MOVE)
- Source: `confusions.mdx`
- Status: MOVE to reference section
- Purpose: Quick lookup of common misconceptions
- Output: `/reference/confusions/`

**Principles:** `/reference/principles.mdx` (MOVE & EDIT)
- Source: `principles.mdx`
- Status: MOVE to reference + possibly condense
- Purpose: Quick reference of AI principles
- Output: `/reference/principles/`

**Benchmarks:** `/reference/benchmarks.md` (NEW)
- Source: Extract from cheatsheets + new data
- Status: CREATE NEW
- Content: Model leaderboards (HumanEval, MATH, GPQA, etc.)

**Model Specs:** `/reference/model-specs.md` (NEW)
- Source: Expand from `cheatsheets/llm-comparison.md`
- Status: CREATE NEW
- Content: Detailed specs for 15+ major models

**Tools Landscape:** `/reference/tools-landscape.md` (NEW)
- Source: From `cheatsheets/ai-tools-landscape.md` + `/cheatsheets/coding-assistants-agents.md`
- Status: CREATE NEW
- Content: Reference catalog of tools by category

**AI Landscape Mindmap:** `/reference/ai-landscape-mindmap.md` (MOVE)
- Source: `mind-maps/ai-landscape.mdx`
- Status: MOVE
- Purpose: Visual reference of ecosystem

---

### RESEARCH: Staying Current

**What's New:** `/research/whats-new.md` (NEW)
- Status: CREATE NEW template + May 2026 update
- Content: Monthly update log

**Model Releases:** `/research/model-releases.md` (NEW)
- Status: CREATE NEW
- Content: Feed of Claude, GPT, Gemini, Meta releases

**Emerging Trends:** `/research/emerging-trends.md` (NEW)
- Status: CREATE NEW
- Content: Multi-agent, reasoning models, open-source, vision, deployment

**Bibliography:** `/research/papers.md` (NEW)
- Status: CREATE NEW
- Content: Key research papers with links

**Open-Source Models:** `/research/models/guide.md` (MOVE)
- Source: `opensource.mdx`
- Status: MOVE + expand with May 2026 models
- Output: `/research/models/`

**Vocabulary:** `/research/vocabulary.md` (NEW)
- Status: CREATE NEW
- Content: AI vs AGI, GenAI vs ML, terminology distinctions

---

### DEEP DIVES: Mastery Content (New)

**How LLMs Work:** `/deep-dive/how-llms-work.md` (NEW)
- Status: CREATE NEW
- Content: Tokens, embeddings, attention, transformers, scaling laws
- Sources: Synthesized from multiple sources

**RAG Architecture:** `/deep-dive/rag-architecture.md` (MOVE)
- Source: `diagrams/rag-architecture.md`
- Status: MOVE + expand beyond diagram
- Output: Full RAG guide with pipeline, components, patterns

**Agents & Frameworks:** `/deep-dive/agents-frameworks.md` (NEW)
- Status: CREATE NEW
- Content: Agent loop, frameworks, tool use, orchestration

**Training & Fine-tuning:** `/deep-dive/training-finetuning.md` (NEW)
- Source: `guides/llm-from-scratch.md`
- Status: CREATE NEW, expand from book summary
- Content: Training vs fine-tuning, techniques, data prep

**Prompt Engineering:** `/deep-dive/prompt-engineering.md` (MOVE)
- Source: `cheatsheets/prompt-engineering.md`
- Status: MOVE + expand
- Output: `/deep-dive/prompt-engineering/`

**Inference Optimization:** `/deep-dive/inference-optimization.md` (NEW)
- Status: CREATE NEW
- Content: Quantization, caching, batching, cost/latency optimization

**Eval & Testing:** `/deep-dive/eval-and-testing.md` (NEW)
- Status: CREATE NEW
- Content: Evaluation metrics, A/B testing, benchmarks, safety

---

### RESOURCES: External Links & Tools

**Papers:** `/resources/papers.md` (NEW)
- Status: CREATE NEW
- Content: Research papers, foundational to recent

**Communities:** `/resources/communities.md` (NEW)
- Status: CREATE NEW
- Content: Discord, Slack, Reddit, Twitter, conferences

**Tools & Frameworks:** `/resources/tools-frameworks.md` (NEW)
- Status: CREATE NEW
- Content: LangChain, LlamaIndex, SDKs, deployment, monitoring

**Videos & Talks:** `/resources/videos.md` (NEW - OPTIONAL)
- Status: CREATE NEW (optional)
- Content: Key talks, tutorials, webinars

---

### COMMUNITY: Contributing & Collaboration

**Contributing Guide:** `/community/contributing.md` (NEW)
- Status: CREATE NEW
- Content: How to contribute, fact-checking, writing style

**Report Outdated:** `/community/report.md` (NEW)
- Status: CREATE NEW
- Content: How to report inaccurate information

**Contributors:** `/community/contributors.md` (NEW)
- Status: CREATE NEW
- Content: Auto-generated list of contributors

---

### MEDIA: Diagrams, Infographics, Mind Maps, Slides (Keep As-Is)

**Diagrams:** `/diagrams/` (KEEP)
- `rag-architecture.md` → ALSO use for `/deep-dive/rag-architecture`
- Status: Keep original, reference from new locations

**Infographics:** `/infographics/` (KEEP)
- `llm-lifecycle.mdx`
- Status: Keep as-is, link from `/learn/` and `/deep-dive/`

**Mind Maps:** `/mind-maps/` (KEEP)
- `ai-landscape.mdx` → ALSO use for `/reference/ai-landscape-mindmap`
- `interview-prep.mdx` → Reference from `/learn/interview-prep/`
- Status: Keep as-is, link from new locations

**Slides:** `/slides/` (KEEP)
- `intro-to-llms.md`
- Status: Keep as-is, link from `/learn/beginner/`

---

### DEPRECATED / SPECIAL HANDLING

**`guides/how-it-works.md`** (REMOVE — Project Meta, Not Content)
- Purpose: "How this playbook works" — system documentation
- Status: DELETE (not user-facing content)
- Alternative: Move to README.md or CONTRIBUTING.md

**Root-level homepage:** `index.md` (KEEP & REDESIGN)
- Source: `index.md`
- Status: REDESIGN as entry point with PathSelector
- Output: Keep at `/` (homepage)

---

## Consolidation Summary

### Files to Create (15 NEW)
✅ Learning paths: beginner, interview-prep, builder, researcher
✅ Decision guides: tools, models, frameworks
✅ Reference pages: benchmarks, model-specs, tools-landscape, confusions, principles
✅ Research pages: whats-new, model-releases, emerging-trends, papers, vocabulary
✅ Deep dives: how-llms-work, agents-frameworks, training-finetuning, inference-optimization, eval-and-testing
✅ Resources: papers, communities, tools-frameworks
✅ Community: contributing, report, contributors

### Files to Move (12 MOVE)
✅ glossary.mdx → /reference/glossary/
✅ confusions.mdx → /reference/confusions/
✅ principles.mdx → /reference/principles/
✅ all cheatsheets/ → /reference/cheatsheets/
✅ follow.mdx → /learn/researcher (incorporated)
✅ history.mdx → /research/whats-current (incorporated)
✅ rag-architecture.md → /deep-dive/rag-architecture
✅ prompt-engineering.md → /deep-dive/prompt-engineering
✅ ai-landscape.mdx → /reference/ai-landscape-mindmap
✅ interview-prep.mdx → /learn/interview-prep (incorporated)
✅ opensource.mdx → /research/models/guide
✅ llm-from-scratch.md → /deep-dive/training-finetuning (expanded)

### Files to Consolidate/Merge (5 MERGE)
✅ tools.mdx + productivity-tools.mdx → /decide/tools/guide
✅ 7 interview cheatsheets → /learn/interview-prep/
✅ llm-comparison.md → /reference/benchmarks + /reference/model-specs
✅ ai-tools-landscape.md + coding-assistants-agents.md → /reference/tools-landscape
✅ follow.mdx + history.mdx → /learn/researcher

### Files to Delete (1 DELETE)
✅ guides/how-it-works.md (system doc, not user content)

### Files to Keep As-Is (3 KEEP)
✅ /diagrams/
✅ /infographics/
✅ /slides/

---

## TBD Decisions Made ✅

### `confusions.mdx` — Common Misconceptions
**Decision:** MOVE to `/reference/confusions/`  
**Rationale:** This is a reference lookup ("What's a common misconception about X?"), not a learning path. Belongs in reference section.  
**New URL:** `/reference/confusions/`

### `follow.mdx` — Who to Follow
**Decision:** INCORPORATE into `/learn/researcher`  
**Rationale:** "Who to follow" is key to researcher/trend-watcher learning path. Not standalone content.  
**New URL:** No separate page (merged into researcher path)

### `workflows.mdx` — Real-World Workflows
**Decision:** KEEP for now (not in MOS-209 consolidation, but flagged for future deep-dive expansion)  
**Rationale:** Useful reference, but minimal content (5 workflows). Could expand into `/deep-dive/workflows` or stay standalone. Deferred to Phase 2.  
**New URL:** TBD in Phase 2

### `principles.mdx` — Principles for AI
**Decision:** MOVE to `/reference/principles/`  
**Rationale:** These are guiding rules (reference), not a learning path. Good quick-lookup in reference section.  
**New URL:** `/reference/principles/`

---

## Content Consolidation Checklist

### Priority 1: Interview Prep (5 files → 1)
- [ ] Read all 7 interview cheatsheets
  - llm-interview.md
  - ai-system-design-interview.md
  - ai-product-interview.md
  - ml-fundamentals-interview.md
  - ai-product-banking-interview.md
  - behavioral-interview.md
  - banking-analytics-interview.md
- [ ] Organize into Week 1 (Fundamentals) + Week 2 (System Design)
- [ ] Create `/learn/interview-prep.md`
- [ ] Verify all content preserved
- [ ] Delete originals from cheatsheets/

### Priority 2: Tools (2 files → 1)
- [ ] Merge `tools.mdx` + `productivity-tools.mdx`
- [ ] Create `/decide/tools/guide.md`
- [ ] Keep old files for redirect
- [ ] Verify all content preserved

### Priority 3: Models (3 files → 2+)
- [ ] Extract models comparison from `llm-comparison.md`
- [ ] Create `/reference/benchmarks.md`
- [ ] Create `/reference/model-specs.md`
- [ ] Move to reference section
- [ ] Verify links updated

### Priority 4: Reference Sections (move + organize)
- [ ] Move glossary to `/reference/glossary/`
- [ ] Move all cheatsheets to `/reference/cheatsheets/`
- [ ] Create `/reference/confusions/` from confusions.mdx
- [ ] Move principles to `/reference/principles/`
- [ ] Create new directory structure in git
- [ ] Update sidebar config

### Priority 5: Learning Paths (create new)
- [ ] Create `/learn/beginner.md` (new comprehensive guide)
- [ ] Create `/learn/interview-prep.md` (from cheatsheets)
- [ ] Create `/learn/builder.md` (from tools + RAG + agents)
- [ ] Create `/learn/researcher.md` (from follow + trends)
- [ ] Test locally with dev server
- [ ] Update sidebar config

---

## Directory Structure After Consolidation

```
src/content/docs/
├── index.md (homepage — redesign as entry point)
│
├── start/ (NEW)
│   ├── quick-start.md
│   └── choose-path.mdx (component, might be homepage)
│
├── learn/ (NEW)
│   ├── beginner.md
│   ├── interview-prep.md
│   ├── builder.md
│   └── researcher.md
│
├── decide/ (NEW)
│   ├── tools/
│   │   └── guide.md
│   ├── models/
│   │   └── guide.md
│   ├── frameworks/
│   │   └── guide.md
│   ├── cost-calculator.mdx
│   └── comparisons/
│
├── reference/ (NEW)
│   ├── glossary.mdx (moved from root)
│   ├── confusions.mdx (moved from root)
│   ├── principles.mdx (moved from root)
│   ├── history.mdx (timeline — moved from root)
│   ├── benchmarks.md (new)
│   ├── model-specs.md (new)
│   ├── tools-landscape.md (new)
│   ├── ai-landscape-mindmap.md (moved from mind-maps)
│   └── cheatsheets/ (moved from root)
│       ├── llm-comparison.md
│       ├── ai-tools-landscape.md
│       ├── coding-assistants-agents.md
│       ├── prompt-engineering.md
│       └── ... (7 more cheatsheets)
│
├── research/ (NEW)
│   ├── whats-new.md (new)
│   ├── model-releases.md (new)
│   ├── emerging-trends.md (new)
│   ├── papers.md (new)
│   ├── vocabulary.md (new)
│   └── models/
│       └── guide.md (moved from opensource.mdx)
│
├── deep-dive/ (NEW)
│   ├── how-llms-work.md (new)
│   ├── rag-architecture.md (moved from diagrams + expanded)
│   ├── agents-frameworks.md (new)
│   ├── training-finetuning.md (moved from guides + expanded)
│   ├── prompt-engineering.md (moved from cheatsheets + expanded)
│   ├── inference-optimization.md (new)
│   └── eval-and-testing.md (new)
│
├── resources/ (NEW)
│   ├── papers.md (new)
│   ├── communities.md (new)
│   ├── tools-frameworks.md (new)
│   └── videos.md (optional)
│
├── community/ (NEW)
│   ├── contributing.md (new)
│   ├── report.md (new)
│   └── contributors.md (new)
│
├── diagrams/ (KEEP — no changes)
│   └── rag-architecture.md (also referenced from /deep-dive/)
│
├── infographics/ (KEEP — no changes)
│   └── llm-lifecycle.mdx
│
├── mind-maps/ (KEEP — no changes)
│   ├── ai-landscape.mdx (also referenced from /reference/)
│   └── interview-prep.mdx (also referenced from /learn/)
│
├── slides/ (KEEP — no changes)
│   └── intro-to-llms.md
│
└── [DEPRECATED — keep for redirects initially]
    ├── tools.mdx → /decide/tools/ (redirect)
    ├── productivity-tools.mdx → /decide/tools/ (redirect)
    ├── opensource.mdx → /research/models/ (redirect)
    ├── glossary.mdx → /reference/glossary/ (redirect)
    ├── confusions.mdx → /reference/confusions/ (redirect)
    ├── principles.mdx → /reference/principles/ (redirect)
    ├── history.mdx → /research/ (redirect)
    ├── follow.mdx → /learn/researcher (incorporate)
    └── workflows.mdx → TBD (keep for now)
```

---

## Success Criteria

✅ All 31 files have a new location  
✅ No content is lost or duplicated  
✅ Consolidations are deliberate and documented  
✅ TBD decisions have been made  
✅ New directory structure is clear  
✅ Migration checklist is actionable  
✅ Ready for MOS-208 (sidebar config implementation)

---

## Next Steps

1. ✅ **MOS-207**: IA Design — DONE
2. **MOS-209**: Content Audit — THIS DOCUMENT
3. **MOS-208**: Update sidebar config
4. **MOS-210**: Redesign homepage
5. **MOS-211**: Add breadcrumbs
6. **MOS-212**: Mobile optimization

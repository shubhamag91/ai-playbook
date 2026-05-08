# Content Migration Implementation Plan

**Status:** Phase 2 - Content Migration  
**Date:** May 8, 2026  
**Based on:** CONTENT_AUDIT_MOS209.md

---

## Overview

This document breaks down the content migration into discrete, testable Linear issues (MOS-239 through MOS-250+).

## Migration Phases

### Phase 2A: File Relocation (No Consolidation)

**MOS-239: Move Root-Level Files to Reference**
- Move `/glossary.mdx` → `/reference/glossary.mdx` (update old location for redirects)
- Move `/confusions.mdx` → `/reference/confusions.mdx`
- Move `/principles.mdx` → `/reference/principles.mdx`
- Move `/history.mdx` → `/research/whats-new.mdx` (incorporate into what's new)
- Delete old files after redirect setup
- Status: Ready to start

**MOS-240: Move Cheatsheets Directory**
- Organize cheatsheets/ files into `/reference/cheatsheets/`
- Move non-interview cheatsheets:
  - `ai-tools-landscape.md`
  - `coding-assistants-agents.md`
  - `llm-comparison.md`
  - `prompt-engineering.md`
- Note: Interview cheatsheets will be consolidated in MOS-241

**MOS-241: Move Research Files**
- Move `/opensource.mdx` → `/research/models/guide.md`
- Verify new structure

### Phase 2B: Complex Consolidations

**MOS-242: Consolidate Interview Cheatsheets (Priority 1)**
- Target: Create `/learn/interview-prep.md` with complete structured curriculum
- Input files:
  - `cheatsheets/llm-interview.md` (30KB)
  - `cheatsheets/ml-fundamentals-interview.md` (26KB)
  - `cheatsheets/ai-system-design-interview.md` (20KB)
  - `cheatsheets/ai-product-interview.md` (19KB)
  - `cheatsheets/behavioral-interview.md` (16KB)
  - `cheatsheets/banking-analytics-interview.md` (23KB)
  - `cheatsheets/ai-product-banking-interview.md` (8KB)
- Output: Single 2-week curriculum guide
- Approach:
  - Week 1: LLM Fundamentals + ML Fundamentals
  - Week 2: System Design + Product Design + Behavioral
  - Appendix: Banking-specific material
- Status: Blocked on MOS-240 (cheatsheets move)

**MOS-243: Consolidate Tools Files (Priority 2)**
- Target: `/decide/tools/guide.md`
- Input: `/tools.mdx` + `/productivity-tools.mdx`
- Output: Single comprehensive tools decision guide
- Approach: Organize by use case (developers, creators, business, research)

**MOS-244: Consolidate Models/Benchmarks (Priority 3)**
- Target: `/reference/benchmarks.md` + `/reference/model-specs.md`
- Input: `cheatsheets/llm-comparison.md`
- Split into:
  - Benchmarks: HumanEval, MATH, GPQA, leaderboards
  - Model Specs: Detailed capability matrix for 15+ models

**MOS-245: Create Learning Paths Content**
- `/learn/beginner.md`: Comprehensive 4-hour intro
- `/learn/builder.md`: Hands-on tools + RAG guide
- `/learn/researcher.md`: Following trends + staying current

### Phase 2C: Cleanup & Verification

**MOS-246: Setup Redirects for Old URLs**
- Create 301 redirects from old locations to new ones
- Update internal cross-links
- Test redirect chain

**MOS-247: Update Sidebar Configuration**
- Verify sidebar links point to correct new locations
- Test all navigation paths
- Ensure breadcrumbs work

**MOS-248: Final Content Verification**
- Test all links in migrated files
- Verify no content loss
- Run full site build
- Deploy to Cloudflare Pages

---

## Quick Reference: File Moves

| Status | Old Path | New Path | Type |
|--------|----------|----------|------|
| 📦 Todo | `/glossary.mdx` | `/reference/glossary.mdx` | Move |
| 📦 Todo | `/confusions.mdx` | `/reference/confusions.mdx` | Move |
| 📦 Todo | `/principles.mdx` | `/reference/principles.mdx` | Move |
| 📦 Todo | `/history.mdx` | `/research/whats-new.mdx` | Move + Consolidate |
| 📦 Todo | `/tools.mdx` | `/decide/tools/guide.md` | Consolidate + Move |
| 📦 Todo | `/productivity-tools.mdx` | `/decide/tools/guide.md` | Consolidate + Move |
| 📦 Todo | `/opensource.mdx` | `/research/models/guide.md` | Move |
| 📦 Todo | `/follow.mdx` | `/learn/researcher.md` | Consolidate + Move |
| 📦 Todo | `cheatsheets/*interview*.md` | `/learn/interview-prep.md` | Consolidate + Move |
| 📦 Todo | `cheatsheets/llm-comparison.md` | `/reference/benchmarks.md` + `/reference/model-specs.md` | Consolidate + Move |
| 📦 Todo | `cheatsheets/prompt-engineering.md` | `/deep-dive/prompt-engineering.md` | Move + Expand |
| 📦 Todo | `cheatsheets/*.md` (others) | `/reference/cheatsheets/` | Move |

---

## Testing & Validation

### Per-Issue Checklist
- [ ] All files moved to correct locations
- [ ] No content lost or duplicated
- [ ] `npm run build` succeeds
- [ ] All links verified (internal + external)
- [ ] Sidebar renders correctly
- [ ] Breadcrumbs work
- [ ] Mobile responsive works
- [ ] Search indexes updated

### Final Validation (MOS-248)
- [ ] Full site build passes
- [ ] No 404 errors on key paths
- [ ] Redirects working for old URLs
- [ ] Mobile testing complete
- [ ] Ready for deploy to Cloudflare

---

## Dependencies

- MOS-239 → MOS-240 → MOS-241 → MOS-242+
- All Phase 2A must complete before Phase 2B

## Estimated Effort

- Phase 2A (File moves): 2-3 hours
- Phase 2B (Consolidations): 6-8 hours
- Phase 2C (Cleanup): 2-3 hours
- **Total: ~12 hours**

---

## Next Steps

1. Start MOS-239: Move root-level files to reference
2. Then MOS-240: Move cheatsheets directory
3. Then MOS-241: Move research files
4. Then begin complex consolidations (MOS-242+)

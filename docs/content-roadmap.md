# Content Roadmap

This document outlines planned content additions and improvements for the AI Playbook. It serves as the source of truth for what's coming next and where each piece fits in the sidebar.

---

## Quick Structural Fixes (MOS-297)

| File | Change |
|---|---|
| `astro.config.mjs` | Add Workflows, AI Tools Navigator, Who to Follow to sidebar: Workflows in Learn, Tools Navigator in Decide, Who to Follow in Reference |
| `guides/how-it-works.md` | Fix broken refs: `agents.md` -> `deep-dive/agents-frameworks`, `open-source.md` -> `research/models/guide` |
| `slides/intro-to-llms.md` | Replace slide deck placeholder with inline markdown summary (topics covered elsewhere, no deck needed) |

---

## Content Roadmap

### Sidebar Architecture

Instead of creating 15 standalone top-level pages, we **expand 6 existing deep dives** with new sections and add **5 new pages**. This keeps the sidebar navigable.

#### Deep Dives (revised order)

| Pos | Page | Change | Type |
|---|---|---|---|
| 1 | How LLMs Work | **Expand** — add Scaling Laws + MoE Architecture sections | Expansion |
| 2 | Reasoning Models & Test-Time Compute | **New page** — o3, R1, thinking modes, CoT, tree-of-thoughts | New |
| 3 | Multimodal AI | **New page** — architectures, computer vision, speech & audio | New |
| 4 | RAG Architecture | **Expand** — add Retrieval Technology section (embeddings, vector DBs, search) | Expansion |
| 5 | Agents & Frameworks | **Expand** — add Agent Security section | Expansion |
| 6 | Training & Fine-tuning | **Expand** — add Data Engineering section | Expansion |
| 7 | Prompt Engineering | No change | — |
| 8 | Inference Optimization | **Expand** — add SLMs & Edge AI section | Expansion |
| 9 | Production LLMOps | **New page** — deployment, monitoring, CI/CD, cost tracking | New |
| 10 | Evaluation & Testing | **Expand** — add Benchmark Methodology section | Expansion |

#### Reference

| Pos | Page | Change |
|---|---|---|
| (after Model Capability Matrix) | Economics of AI | **New page** — build-vs-buy, TCO, caching, market dynamics |

#### Research

| Pos | Page | Change |
|---|---|---|
| (after Open-Source Models) | Chinese AI Ecosystem Landscape | **New page** — Kimi, GLM, Qwen, MiniMax, Xiaomi landscape, how to access them, comparison table |

---

### Dependency Graph

```
Scaling Laws ──→ MoE ──→ Reasoning Models (alternative scaling axis)
     │                          │
     └──────→ Data Engineering ─┘  (data quality affects all)

Multimodal AI  (foundation for CV + speech)
     ├──→ Computer Vision (section within)
     └──→ Speech & Audio (section within)

RAG Architecture ←── Retrieval Technology (section within)

Inference Optimization ←── SLMs & Edge AI (section within, builds on quantization)

Production LLMOps ←── all of the above  (production depends on all)
Economics of AI ←── independent
Chinese AI Ecosystem ←── independent
Benchmark Methodology ←── Evaluation & Testing
Agent Security ←── Agents & Frameworks
```

No strict read order. Recommended path: Scaling Laws -> MoE -> Reasoning Models -> Data Engineering -> Multimodal AI -> Retrieval Tech -> everything else is independent.

---

### Issue Reference

| Issue | Title | Type | Est. Lines | Status |
|---|---|---|---|---|
| MOS-297 | Quick fixes: sidebar, broken refs, slide placeholder | Fix | — | Done |
| MOS-298 | Deep Dive: Scaling Laws + MoE (expand How LLMs Work) | Expansion | +250 | Done |
| MOS-299 | Deep Dive: Reasoning Models & Test-Time Compute | New | +350 | Done |
| MOS-300 | Deep Dive: Multimodal AI (architectures + CV + speech + audio) | New | +500 | Done |
| MOS-301 | Deep Dive: Retrieval Technology (expand RAG Architecture) | Expansion | +300 | Done |
| MOS-302 | Deep Dive: Agent Security (expand Agents & Frameworks) | Expansion | +150 | Done |
| MOS-303 | Deep Dive: Data Engineering (expand Training & Fine-tuning) | Expansion | +250 | Done |
| MOS-304 | Deep Dive: SLMs & Edge AI (expand Inference Optimization) | Expansion | +200 | Done |
| MOS-305 | Deep Dive: Production LLMOps | New | +400 | Done |
| MOS-306 | Deep Dive: Benchmark Methodology (expand Evaluation & Testing) | Expansion | +200 | Done |
| MOS-307 | Reference: Economics of AI | New | +250 | Done |
| MOS-308 | Research: Chinese AI Ecosystem Landscape | New | +300 | Done |
| MOS-309 | Docs: content-roadmap.md | Docs | — | Done |

## Summary of Completed Work

| Metric | Before | After | Change |
|---|---|---|---|
| Total pages | 65 | 70 | +5 |
| Search index chunks | 446 | 570 | +124 |
| Deep dives | 7 | 10 | +3 new, +5 expanded |
| Reference pages | 7 | 8 | +1 |
| Research pages | 6 | 7 | +1 |
| Linear issues closed | 0 | 13 | All done |

---

### Content Standards

When adding new pages, follow these rules:

1. **File extensions:** `.mdx` for files with MDX component imports, `.md` for plain markdown
2. **No em dashes** — use hyphens instead everywhere
3. **Frontmatter** — every page must have: `title`, `description`, `sidebar.order`, `tags`, `lastUpdated`, `nextVerificationDue`
4. **Ensure unique numbering** — check for existing issues before creating new ones
5. **SeeAlso** — add `tags` frontmatter to enable auto-generated related content
6. **Search index** — rebuilt automatically via `npm run build` (prebuild script)
7. **Estimated effort** per new deep dive page: ~2-4 hours writing + editing

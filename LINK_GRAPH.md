# Internal Link Graph

How pages connect to each other in the AI Playbook.

---

## Linking Patterns

### Auto-Injected (via SeeAlso component)
All pages automatically get "See Also" links via the `ContentOverride.astro` component. These are powered by:
- **Tags** — pages with shared `tags` frontmatter show related pages ranked by overlap count
- **Glossary links** — pages with `glossaryLinks` frontmatter get a link to `/reference/glossary`
- **Section fallback** — pages without tags get section-appropriate defaults (e.g., any `/deep-dive/` page links to research and cheatsheets)

### Manual Cross-References
Key pages with hand-crafted "See Also" sections (in addition to auto-injected):
- `/deep-dive/how-llms-work` → beginner path, builder path, RAG, prompt engineering
- `/deep-dive/rag-architecture` → how LLMs work, prompt engineering, evaluation
- `/deep-dive/agents-frameworks` → RAG, how LLMs work, training
- `/deep-dive/prompt-engineering` → RAG, how LLMs work, inference optimization
- `/deep-dive/training-finetuning` → how LLMs work, inference optimization
- `/deep-dive/inference-optimization` → how LLMs work, training, model specs
- `/deep-dive/eval-and-testing` → benchmarks, training, prompt engineering
- `/learn/beginner` → how LLMs work, tools guide, builder path, glossary
- `/learn/interview-prep` → cheatsheets, how LLMs work, product interview cheatsheet
- `/decide/tools/guide` → companion decks, models guide, cost calculator
- `/decide/tools/comparison` → models guide, tools guide, cost calculator

### Index Pages With Link Menus
- `/resources` — links to all case studies, templates, deep dives, and tools
- `/index` (home) — links to all major sections via ecosystem comparison table
- `/tools/index` — decision trees linking to recommended tools

---

## Pages With Glossary Links (`glossaryLinks` frontmatter)

These pages show a "Glossary" link in their See Also section:

- `/deep-dive/how-llms-work` — transformer, attention, token, embedding
- `/deep-dive/rag-architecture` — RAG, embedding, token, hallucination
- `/deep-dive/agents-frameworks` — LLM, inference, prompting
- `/deep-dive/prompt-engineering` — prompt, token, temperature, inference
- `/deep-dive/training-finetuning` — fine-tuning, quantization, RLHF, transformer
- `/deep-dive/inference-optimization` — inference, quantization, token, hallucination
- `/deep-dive/eval-and-testing` — hallucination, inference, LLM, prompt
- `/learn/beginner` — LLM, token, transformer, prompt
- `/learn/interview-prep` — LLM, transformer, fine-tuning, RAG
- `/tools/index` — LLM, inference, prompt
- `/decide/models/guide` — token, context window, inference
- `/tools/index` — LLM, inference, prompt
- `/deep-dive/multimodal-ai` — multimodal, vision, token
- `/deep-dive/reasoning-models` — reasoning, chain-of-thought
- `/deep-dive/production-llmops` — LLMOps, deployment, monitoring
- `/deep-dive/eval-and-testing` — evaluation, benchmark, hallucination

---

## Coverage Summary

| Metric | Count |
|---|---|
| Total pages | 101 |
| Pages with manual cross-links | 18 |
| Pages with glossary links | 15 |
| Pages with tags (auto SeeAlso) | 62 |
| Pages with section fallback | 4 (home, 404, glossary, resources) |

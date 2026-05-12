---
title: Research Papers
description: Curated collection of foundational and recent AI research papers with summaries and links.
sidebar:
  order: 3
tags:
  - resources
  - papers
  - research
glossaryLinks:
  - transformer
  - attention
  - rlhf
  - scaling laws
tldr:
  - "Curated list of foundational papers: Attention Is All You Need, GPT-3, InstructGPT"
  - "Covers RAG, chain-of-thought, and scaling laws papers"
  - "Each entry includes significance summary and arXiv link"
lastUpdated: 2026-05-10
nextVerificationDue: 2026-08-08
---

Curated papers every AI practitioner should know  -  from foundations to frontier.

---

## Foundational Papers

### Attention Is All You Need (2017)
**Authors:** Vaswani et al. (Google)
**Significance:** Introduced the Transformer architecture, replacing RNNs with self-attention. The foundation of every major LLM today.
**Read:** [arXiv](https://arxiv.org/abs/1706.03762)

### BERT: Pre-training of Deep Bidirectional Transformers (2018)
**Authors:** Devlin et al. (Google)
**Significance:** Showed that bidirectional pre-training + fine-tuning works dramatically better than unidirectional language models.
**Read:** [arXiv](https://arxiv.org/abs/1810.04805)

### GPT-3: Language Models are Few-Shot Learners (2020)
**Authors:** Brown et al. (OpenAI)
**Significance:** Demonstrated that scaling models to 175B parameters unlocks in-context learning  -  no fine-tuning needed for many tasks.
**Read:** [arXiv](https://arxiv.org/abs/2005.14165)

### Training Language Models to Follow Instructions (InstructGPT, 2022)
**Authors:** Ouyang et al. (OpenAI)
**Significance:** Introduced RLHF (RL from human feedback) to align LLMs with user intent. The method behind ChatGPT.
**Read:** [arXiv](https://arxiv.org/abs/2203.02155)

---

## Retrieval-Augmented Generation

### Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (2020)
**Authors:** Lewis et al. (Facebook AI)
**Significance:** Formalized the RAG pattern  -  augment LLMs with external knowledge retrieval. The foundation of most production LLM systems.
**Read:** [arXiv](https://arxiv.org/abs/2005.11401)

### Lost in the Middle: How Language Models Use Long Contexts (2023)
**Authors:** Liu et al. (Stanford)
**Significance:** Showed that LLMs perform worst on information in the middle of long contexts  -  critical insight for RAG system design.
**Read:** [arXiv](https://arxiv.org/abs/2307.03172)

---

## Reasoning & Agents

### Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (2022)
**Authors:** Wei et al. (Google)
**Significance:** Showed that asking models to "think step by step" dramatically improves reasoning accuracy.
**Read:** [arXiv](https://arxiv.org/abs/2201.11903)

### Tree of Thoughts: Deliberate Problem Solving (2023)
**Authors:** Yao et al. (Princeton)
**Significance:** Extended chain-of-thought to explore multiple reasoning paths simultaneously, with backtracking.
**Read:** [arXiv](https://arxiv.org/abs/2305.10601)

### ReAct: Synergizing Reasoning and Acting in Language Models (2022)
**Authors:** Yao et al. (Princeton)
**Significance:** Combined reasoning traces with action steps  -  the pattern behind modern agent frameworks.
**Read:** [arXiv](https://arxiv.org/abs/2210.03629)

---

## Open-Source & Efficiency

### LLaMA: Open and Efficient Foundation Language Models (2023)
**Authors:** Touvron et al. (Meta)
**Significance:** Showed that smaller models trained on more data can match larger models. Sparked the open-source LLM revolution.
**Read:** [arXiv](https://arxiv.org/abs/2302.13971)

### QLoRA: Efficient Finetuning of Quantized Language Models (2023)
**Authors:** Dettmers et al. (UW)
**Significance:** Made fine-tuning of 65B models possible on a single GPU by combining 4-bit quantization with low-rank adapters.
**Read:** [arXiv](https://arxiv.org/abs/2305.14314)

### DeepSeek-R1: Incentivizing Reasoning Capability (2025)
**Authors:** DeepSeek
**Significance:** Open-weight reasoning model matching OpenAI o1 at a fraction of the cost. Demonstrated that reinforcement learning can teach reasoning.
**Read:** [arXiv](https://arxiv.org/abs/2501.12948)

---

## Scaling & Emergent Behavior

### Scaling Laws for Neural Language Models (2020)
**Authors:** Kaplan et al. (OpenAI)
**Significance:** Established predictable relationships between model size, data size, compute, and performance.
**Read:** [arXiv](https://arxiv.org/abs/2001.08361)

### Sparks of Artificial General Intelligence (2023)
**Authors:** Bubeck et al. (Microsoft)
**Significance:** Comprehensive study of GPT-4's capabilities, arguing it exhibits "sparks" of AGI. Sparked debate on measuring intelligence.
**Read:** [arXiv](https://arxiv.org/abs/2303.12712)

---

## Where to Find More

- **[Papers with Code](https://paperswithcode.com)**  -  Papers + benchmarks + code
- **[arXiv](https://arxiv.org/list/cs.CL/recent)**  -  Recent NLP papers
- **[Hugging Face Papers](https://huggingface.co/papers)**  -  Curated daily
- **[Semantic Scholar](https://www.semanticscholar.org)**  -  Search + citation graph

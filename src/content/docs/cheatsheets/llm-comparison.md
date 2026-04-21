---
title: LLM Model Comparison
description: A living table of models I've actually used, with my own notes.
sidebar:
  order: 2
---

:::note
Keep this table opinionated — it's **your** notes, not a benchmark leaderboard. Update the "My notes" column as you learn.
:::

| Model | Context | Strengths | My notes |
|---|---:|---|---|
| Claude Sonnet 4.6 | 200k | Long-context reasoning, coding | Default for agentic tasks. |
| Claude Opus 4.6 | 200k | Deep reasoning, nuance | Use when Sonnet gets it wrong. |
| Claude Haiku 4.5 | 200k | Fast, cheap | Great for classification + routing. |
| GPT-4-class | 128k+ | General, strong tools | — |
| Open-source (Llama/Mistral/Qwen) | varies | On-prem, privacy | Start here when data can't leave. |

## How I pick

```text
1. Does this need to run on-prem or handle sensitive data?
   └─ yes → open-source + local inference
   └─ no  → continue

2. Is latency the bottleneck (chatbot UX)?
   └─ yes → small/fast model + RAG
   └─ no  → continue

3. Does the task need deep multi-step reasoning?
   └─ yes → frontier model
   └─ no  → mid-tier frontier model
```

## Cost sanity checks

Before rolling anything to prod, multiply:

```
daily requests × avg input tokens × input $/Mtok
+ daily requests × avg output tokens × output $/Mtok
```

If the number scares you, add caching, a router, or a smaller model for the cheap path.

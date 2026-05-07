---
title: Prompt Engineering Cheatsheet
description: Patterns, anti-patterns, and templates I reach for most often.
sidebar:
  order: 1
  badge:
    text: Starter
    variant: tip
lastUpdated: 2026-05-08
---

## The core patterns

| Pattern | When to use it | Shape |
|---|---|---|
| **Zero-shot** | Simple, well-defined tasks | Just ask. |
| **Few-shot** | Anything where the output *format* is strict | Show 2–5 examples before the real query. |
| **Chain-of-Thought** | Reasoning, math, multi-step planning | Ask the model to "think step by step" before answering. |
| **ReAct** | Agent / tool-using flows | Interleave `Thought → Action → Observation` steps. |
| **Self-consistency** | High-stakes reasoning where one sample isn't enough | Sample *n* completions, take the majority answer. |
| **Reflection** | Editing or improving prior output | Ask the model to critique its own draft, then revise. |

## A reusable template

```text
# Role
You are a <role> helping <audience> with <task>.

# Context
<background the model needs — pasted docs, prior turns, constraints>

# Task
<exactly what you want it to do>

# Output format
- Section 1: ...
- Section 2: ...
- Return as JSON with keys: foo, bar, baz

# Rules
- Do not <thing to avoid>
- If unsure, say "I don't know" instead of guessing.
```

## Anti-patterns (things I stopped doing)

- Stuffing the system prompt with every rule you've ever thought of. Keep it < ~400 tokens.
- Using `"Please"` and `"Thank you"` as a substitute for clear instructions.
- Asking for JSON without giving a schema example — you'll get creative keys.
- Re-reading the whole conversation every turn instead of summarizing + pruning.

## A quick math bit

Token cost for a prompt of length $n$ tokens run $k$ times with self-consistency:

$$
\text{cost} = k \cdot (n \cdot c_{\text{in}} + m \cdot c_{\text{out}})
$$

…where $m$ is the average completion length. Useful when deciding if that 10× sampling is worth it.

## See also

- [LLM model comparison](/cheatsheets/llm-comparison/)
- [RAG architecture diagram](/diagrams/rag-architecture/)

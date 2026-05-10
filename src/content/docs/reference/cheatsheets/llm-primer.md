---
title: LLM Primer (1 page)
description: One-page LLM primer covering what LLMs are, how they work, and when to use each major model  -  Claude, GPT, Gemini, and DeepSeek.
sidebar:
  order: 2
tags:
  - reference
  - cheatsheet
  - primer
lastUpdated: 2026-05-09
nextVerificationDue: 2026-06-08
---

## What is an LLM? (one sentence)

A **Large Language Model** is software that predicts the next word by learning patterns from billions of examples.

---

## Key Terms

| Term | Definition |
|------|-----------|
| **Token** | A piece of text (word, punctuation, subword). Models process tokens, not letters. |
| **Parameter** | A "dial" the model uses to predict. More parameters = more nuance. |
| **Context** | The conversation history the model can see (usually 4K–400K tokens). |
| **Hallucination** | When a model generates plausible-sounding but false information. |
| **Temperature** | Controls randomness (0 = deterministic, 1.0 = creative). |
| **Top-p sampling** | Limits predictions to the most likely options for quality control. |

---

## May 2026 Model Comparison

| Model | Best For | Context | Cost | Training Data |
|-------|----------|---------|------|---|
| **Claude Opus 4.7** | Writing, reasoning, analysis | 400K tokens | $15/$75 per 1M input/output | April 2024 |
| **GPT-5.5** | Speed, all-purpose | 128K tokens | $2/$8 per 1M | April 2024 |
| **Gemini 3.1 Pro** | Long documents, research | 1M tokens | $2/$12 per 1M (free tier available) | April 2024 |
| **Claude Sonnet 4.6** | Balanced, coding | 200K tokens | $3/$15 per 1M | April 2024 |
| **DeepSeek V4** | Cost-conscious teams | 256K tokens | 10–50x cheaper | Late 2024 |

---

## Real Capabilities vs Hype

### ✅ What LLMs Actually Do Well
- Writing and editing (often better than most people)
- Explaining concepts (clear, accessible)
- Coding assistance (saves significant time)
- Analysis of existing text (pattern finding, extraction)
- Brainstorming and ideation (fast, creative)

### ⚠️ Improving (But Still Imperfect)
- Math (reasoning models like o3 are better, but still limited)
- Factual accuracy (hallucinations remain; add retrieval to fix)
- Real-time information (not built-in; Perplexity/Gemini add it)
- Domain expertise (fine-tuning helps)

### ❌ Can't Do (Yet)
- Access the internet on their own
- Know anything after their training date
- Reliably do complex math
- Understand context beyond 200K tokens
- Guarantee truthfulness (they generate *plausible* text, not facts)
- Replace domain experts (they're tools for experts)

---

## 3 Ways to Adapt Models

### 1. Prompting
Give better instructions. Works for most tasks.
- Time: Instant
- Cost: Free (uses existing model)
- When to use: Writing, analysis, coding, learning

### 2. Retrieval-Augmented Generation (RAG)
Feed the model your own data so it can answer questions about *your* documents.
- Time: Hours to days (build once, use forever)
- Cost: Cheap (just vector DB storage)
- When to use: Customer support, internal docs, proprietary knowledge

### 3. Fine-Tuning
Train the model on your examples so it learns your style/domain.
- Time: Days (one-time)
- Cost: Moderate ($100–$10K depending on scale)
- When to use: Specialized domains, specific format/tone, repeated use at scale

---

## Common Misconceptions

- **"LLMs understand language"** → They pattern-match. Understanding is human projection.
- **"LLMs are general intelligences"** → They're narrow: good at text, bad at reasoning under uncertainty.
- **"ChatGPT is always right"** → No. Verify important facts. They hallucinate.
- **"LLMs will replace humans"** → No. They're tools. Humans + LLMs > either alone.
- **"Training new models is cheap"** → No. Billions in compute. Fine-tuning is accessible.

---

## Next Steps

- Try one: Go to [Claude.ai](https://claude.ai), [ChatGPT](https://chatgpt.com), or [Gemini](https://gemini.google.com)
- Ask follow-up questions naturally; iterate
- Learn more: [How LLMs Work](/deep-dive/how-llms-work)
- Build something: [Builder Path](/learn/builder)

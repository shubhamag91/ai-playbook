---
title: Claude Models
description: Deep comparison of Claude Opus 4.7 vs Claude Sonnet 4.6 vs Claude Haiku 4.5 — capabilities, benchmarks, pricing, context windows, extended thinking, adaptive thinking, and model selection guide.
sidebar:
  order: 2
tags:
  - claude
  - anthropic
  - models
  - reference
  - vendor-comparison
glossaryLinks:
  - llm
  - token
  - context-window
  - fine-tuning
tldr:
  - "Three current model tiers: Opus 4.7 ($5/$25, 1M ctx), Sonnet 4.6 ($3/$15, 1M ctx), Haiku 4.5 ($1/$5, 200K ctx)"
  - "Opus 4.7 dropped pricing 67% from Opus 4.1 ($15/$75 → $5/$25) while gaining 1M context and step-change agentic coding"
  - "Extended thinking on Sonnet + Haiku; Adaptive thinking on Opus + Sonnet (model decides when to think deeply)"
  - "All models support text + image input, tool use, streaming, structured outputs"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Current Models — May 2026

| Feature | Claude Opus 4.7 | Claude Sonnet 4.6 | Claude Haiku 4.5 |
|---|---|---|---|
| **Description** | Most capable for complex reasoning and agentic coding | Best speed + intelligence balance | Fastest with near-frontier quality |
| **API ID** | `claude-opus-4-7` | `claude-sonnet-4-6` | `claude-haiku-4-5-20251001` |
| **Input Pricing** | $5 / 1M tokens | $3 / 1M tokens | $1 / 1M tokens |
| **Output Pricing** | $25 / 1M tokens | $15 / 1M tokens | $5 / 1M tokens |
| **Context Window** | 1M tokens (~555K words) | 1M tokens (~750K words) | 200K tokens (~150K words) |
| **Max Output** | 128K tokens | 64K tokens | 64K tokens |
| **Extended Thinking** | No (uses Adaptive) | Yes | Yes |
| **Adaptive Thinking** | Yes | Yes | No |
| **Latency** | Moderate | Fast | Fastest |
| **Knowledge Cutoff** | Jan 2026 | Jan 2026 (training) / Aug 2025 (reliable) | Jul 2025 (training) / Feb 2025 (reliable) |
| **Vision (Image Input)** | Yes | Yes | Yes |
| **Tool Use** | Yes | Yes | Yes |
| **Streaming** | Yes | Yes | Yes |
| **Prompt Caching** | Yes | Yes | Yes |
| **Batch API (50% off)** | $2.50 / $12.50 | $1.50 / $7.50 | $0.50 / $2.50 |

> **Pricing History:** Claude Opus 4.1 was $15/$75 per 1M. Opus 4.7 reduced pricing by **67%** while adding 1M context and step-change improvements in agentic coding. Sonnet 4 dropped from current to deprecated. See [model deprecations](https://docs.anthropic.com/en/docs/about-claude/model-deprecations).

## Legacy & Deprecated Models

| Model | Status | API Price | Context | Migration Target |
|---|---|---|---|---|
| Claude Opus 4.6 | Legacy | $5/$25 | 1M | Opus 4.7 |
| Claude Sonnet 4.5 | Legacy | $3/$15 | 200K | Sonnet 4.6 |
| Claude Opus 4.1 | Legacy | $15/$75 | 200K | Opus 4.7 |
| Claude Opus 4 | **Deprecated (June 15, 2026)** | $15/$75 | 200K | **Migrate to Opus 4.7** |
| Claude Sonnet 4 | **Deprecated (June 15, 2026)** | $3/$15 | 200K | **Migrate to Sonnet 4.6** |
| Claude Haiku 3.5 | **Retired** (except Bedrock/Vertex) | $0.80/$4 | 200K | Haiku 4.5 |

## Extended vs Adaptive Thinking

Both features let models "think" before responding — spending additional tokens on internal reasoning.

| Feature | How It Works | Available On | Best For |
|---|---|---|---|
| **Extended Thinking** | You set a budget (N tokens) for thinking. Model uses up to N tokens on internal reasoning before answering. Deterministic: you control the spend. | Opus 4.6, Sonnet 4.5+, Haiku 4.5 | When you want predictable thinking budget |
| **Adaptive Thinking** | Model autonomously decides when and how much to think. No budget to set — the model judges complexity. Less predictable cost. | Opus 4.7 (only) | Complex multi-step reasoning without manual tuning |

**Practical guide:**
- Use **Extended Thinking** for coding, math, or when you need consistent latency/cost
- Use **Adaptive Thinking** for open-ended analysis where the task complexity varies
- Opus 4.7's Adaptive Thinking is the default — the model handles the judgment

## Model Selection Guide

```
What matters most?
│
├─ Maximum quality, complex reasoning → Claude Opus 4.7
│   Use when: agentic coding, deep analysis, long-form writing, R&D
│   Cost: $5/$25 per 1M. Batch: $2.50/$12.50
│
├─ Balanced speed + intelligence → Claude Sonnet 4.6
│   Use when: production workloads, chatbots, content generation, moderate coding
│   Cost: $3/$15 per 1M. Batch: $1.50/$7.50
│
├─ Speed + cost efficiency → Claude Haiku 4.5
│   Use when: high-throughput classification, simple Q&A, routing/ triage
│   Cost: $1/$5 per 1M. Batch: $0.50/$2.50
│
└─ Maximum speed (premium) → Fast Mode (Opus 4.7)
    Use when: latency-critical, interactive apps, real-time demos
    Cost: $30/$150 per 1M (6x standard)
```

## Pricing at Scale — Cost Comparison

| Scenario | Opus 4.7 | Sonnet 4.6 | Haiku 4.5 |
|---|---|---|---|
| 1K conversations/day, avg 5K tokens in/2K out | $25 + $25 = $50/day | $15 + $30 = $45/day | $5 + $10 = $15/day |
| 100K conversations/day with Batch API | $1,250/day ($37.5K/mo) | $750/day ($22.5K/mo) | $250/day ($7.5K/mo) |
| Single complex analysis (50K in, 10K out) | $0.50 | $0.30 | $0.10 |
| With prompt caching (10% input reads) | ~70% token cost savings | ~70% token cost savings | ~70% token cost savings |

> For all models: **prompt caching cuts input costs to 10%** for repeated content (system prompts, long docs). **Batch API gives 50% off** for async processing. Combine both for up to 95% savings on high-volume workloads.

## Context Window Deep-Dive

All current Claude models have **1M token context** (Opus/Sonnet) or **200K token context** (Haiku).

```
What 1M tokens enables:
├─ Read War & Peace (~580K words) × 2
├─ Process entire codebases (200K+ lines of code)
├─ Load 10+ research papers simultaneously
├─ Full conversation history across days of chat
└─ Skip RAG entirely for <500K-token datasets

What 200K tokens enables:
├─ Read entire books (average novel ~80K words)
├─ Full API documentation
├─ Large transcripts and meeting notes
└─ Comprehensive RAG context
```

> **Tokenizer Note:** Claude Opus 4.7 uses a new tokenizer vs previous models. For identical text, Opus 4.7 may use up to **35% more tokens**. Factor this into cost comparisons — the lower per-token price partially offsets increased tokenization.

## Comparing Across Models

For a broader comparison across Claude, GPT, Gemini, DeepSeek, and other providers, see the [Models Decision Guide](/decide/models/guide/).

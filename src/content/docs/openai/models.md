---
title: GPT Models
description: Deep comparison of GPT-5.5 vs GPT-5.4 vs GPT-5.4 mini vs GPT-5.4 nano — capabilities, pricing, context, reasoning levels, specialized models (Image-2, Realtime, Whisper, TTS), and model selection guide.
sidebar:
  order: 2
tags:
  - openai
  - gpt
  - models
  - reference
  - vendor-comparison
glossaryLinks:
  - llm
  - token
  - context-window
tldr:
  - "Four current GPT tiers: GPT-5.5 ($5/$30, 1M ctx), GPT-5.4 ($2.50/$15, 1M), GPT-5.4 mini ($0.75/$4.50, 400K), GPT-5.4 nano ($0.20/$1.25, 400K)"
  - "All GPT models support text + image input, tool use, streaming, structured outputs, and prompt caching"
  - "GPT-5.5 has configurable reasoning levels (none/low/medium/high/xhigh) for balancing speed vs depth"
  - "Specialized models: GPT Image 2 (image), Realtime-2 (voice), Sora (video), Whisper/TTS (speech)"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Current GPT Models — May 2026

| Feature | GPT-5.5 | GPT-5.4 | GPT-5.4 mini | GPT-5.4 nano |
|---|---|---|---|---|
| **Description** | Flagship — new class of intelligence | Affordable professional tier | Strong mini for coding & agents | Fastest, cheapest |
| **Model ID** | `gpt-5.5` | `gpt-5.4` | `gpt-5.4-mini` | `gpt-5.4-nano` |
| **Input Pricing** | $5 / 1M tokens | $2.50 / 1M tokens | $0.75 / 1M tokens | $0.20 / 1M tokens |
| **Cached Input** | $0.50 / 1M tokens | $0.25 / 1M tokens | $0.075 / 1M tokens | $0.02 / 1M tokens |
| **Output Pricing** | $30 / 1M tokens | $15 / 1M tokens | $4.50 / 1M tokens | $1.25 / 1M tokens |
| **Context Window** | 1M tokens | 1M tokens | 400K tokens | 400K tokens |
| **Max Output** | 128K tokens | 128K tokens | 128K tokens | 128K tokens |
| **Reasoning Levels** | none/low/medium/high/xhigh | none/low/medium/high/xhigh | none/low/medium/high/xhigh | none/low/medium |
| **Vision (Image Input)** | Yes | Yes | Yes | Yes |
| **Tool Use** | Functions, Web, File search, Computer use | Functions, Web, File search, Computer use | Functions, Web, File search, Computer use | Functions, Web |
| **Streaming** | Yes | Yes | Yes | Yes |
| **Prompt Caching** | Yes (10% of input) | Yes (10% of input) | Yes (10% of input) | Yes |
| **Batch API (50% off)** | Yes | Yes | Yes | Yes |
| **Flex Processing** | Yes | Yes | Yes | Yes |
| **Knowledge Cutoff** | Dec 1, 2025 | Aug 31, 2025 | Aug 31, 2025 | Aug 31, 2025 |

> **Pricing History:** GPT-5.5 dropped from $15/$75 (GPT-4 tier) to $5/$30. GPT-5.4 at $2.50/$15 offers near-flagship capability at a fraction of the price. All models have prompt caching at 10% of base input cost.

## Reasoning Levels

GPT-5.5 and 5.4 models have configurable reasoning depth:

| Level | Behavior | Cost | Latency | Best For |
|---|---|---|---|---|
| **none** | Standard response, no explicit reasoning | Lowest | Fastest | Simple Q&A, classification, routing |
| **low** | Light reasoning for moderate problems | Low | Fast | Code completion, summarization |
| **medium** | Balanced depth — good default | Medium | Medium | Analysis, code review, research |
| **high** | Deep reasoning for complex tasks | High | Slower | Architecture design, debugging |
| **xhigh** | Maximum reasoning — spends significant tokens "thinking" | Highest | Slowest | Hard math, complex multi-step problems |

```python
response = client.responses.create(
    model="gpt-5.5",
    input="Design a distributed rate limiter...",
    reasoning={"effort": "high"}  # Controls thinking depth
)
```

## Specialized Models

### GPT Image 2 — Image Generation

| Feature | Detail |
|---|---|
| **Model ID** | `gpt-image-2` |
| **Input (image)** | $8 / 1M tokens ($2 cached) |
| **Output (image)** | $30 / 1M tokens |
| **Input (text)** | $5 / 1M tokens ($1.25 cached) |
| **Use Cases** | Product images, illustrations, design mockups, photo editing |

### Realtime API — Voice & Audio

| Model | Use Case | Pricing |
|---|---|---|
| **GPT Realtime 2** | Voice agents, interactive audio | Audio: $32 in / $64 out per 1M. Text: $4 in / $24 out |
| **GPT Realtime Translate** | Live speech-to-speech translation | $0.034/min |
| **GPT Realtime Whisper** | Streaming speech-to-text | $0.017/min |
| **GPT-4o Transcribe** | High-quality speech-to-text | Pay-per-use |
| **GPT-4o mini TTS** | Text-to-speech generation | Pay-per-use |

### Sora — Video Generation

Cinematic video generation available via ChatGPT Pro and API. Pricing varies by resolution and duration.

### Whisper / TTS

Traditional speech-to-text (Whisper) and text-to-speech (TTS) models available at lower cost than Realtime API variants.

## Model Selection Guide

```
What matters most?
│
├─ Maximum quality, complex reasoning → GPT-5.5
│   Use when: R&D, architecture work, deep analysis
│   Cost: $5/$30 per 1M. Batch: $2.50/$15
│
├─ Best value for production → GPT-5.4
│   Use when: most APIs, coding, content, analysis
│   Cost: $2.50/$15 per 1M. Batch: $1.25/$7.50
│
├─ Cost-efficient at scale → GPT-5.4 mini
│   Use when: high-volume, computer use, subagents
│   Cost: $0.75/$4.50 per 1M. Batch: $0.375/$2.25
│
├─ Fastest, cheapest → GPT-5.4 nano
│   Use when: classification, routing, simple automation
│   Cost: $0.20/$1.25 per 1M
│
├─ Generate images → GPT Image 2
├─ Real-time voice/audio → Realtime API
├─ Speech-to-text → Realtime Whisper or GPT-4o Transcribe
└─ Text-to-speech → GPT-4o mini TTS
```

## Cost Optimization

| Strategy | Savings | When to Apply |
|---|---|---|
| **Prompt Caching** | 90% on input | Repeated system prompts, same-context queries |
| **Batch API** | 50% all token costs | Async, non-urgent workloads |
| **Flex Processing** | Lower cost | Non-production, lower-priority tasks |
| **Model Routing** | 30-70% | Route to nano/mini for simple tasks, 5.5 for complex |
| **Data Residency** | +10% surcharge | Opt-in for regional processing compliance |

## Comparing Across Models

For a broader comparison across GPT, Claude, Gemini, and DeepSeek, see the [Models Decision Guide](/decide/models/guide/).

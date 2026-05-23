---
title: DeepSeek Models
description: Deep comparison of DeepSeek V4 Pro vs V4 Flash — capabilities, pricing (with cache), thinking mode, context, rate limits, and model selection guide.
sidebar:
  order: 2
tags:
  - deepseek
  - models
  - reference
glossaryLinks:
  - llm
  - token
  - context-window
  - inference
tldr:
  - "Two current models: V4 Pro ($0.435/$0.87 with promo, normally $1.74/$3.48) and V4 Flash ($0.14/$0.28). Both with 1M context and 384K max output"
  - "Thinking Mode: configurable reasoning depth. V4 Pro default is thinking-on; V4 Flash supports both modes"
  - "Context Caching: KV cache with cache hits at 1/10 of input price (V4 Flash: $0.0028/1M)"
  - "Deprecation: deepseek-chat and deepseek-reasoner deprecated on 2026/07/24 (mapped to V4 Flash modes)"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Current Models — May 2026

| Feature | DeepSeek V4 Pro | DeepSeek V4 Flash |
|---|---|---|
| **Description** | Most capable, thinking mode default | Cost-optimized, near-Pro quality |
| **API Model ID** | `deepseek-v4-pro` | `deepseek-v4-flash` |
| **Input Pricing** | $1.74 / 1M (promo: $0.435*) | $0.14 / 1M |
| **Cache Hit (Input)** | $0.0036 / 1M | $0.0028 / 1M |
| **Output Pricing** | $3.48 / 1M (promo: $0.87*) | $0.28 / 1M |
| **Context Window** | 1M tokens | 1M tokens |
| **Max Output** | 384K tokens | 384K tokens |
| **Thinking Mode** | Yes (enabled by default) | Yes (both thinking and non-thinking) |
| **Tool Calls** | Yes | Yes |
| **JSON Output** | Yes | Yes |
| **FIM Completion** | Non-thinking only | Non-thinking only |
| **Chat Prefix Completion** | Yes | Yes |
| **Concurrency Limit** | 500 | 2500 |
| **API Base URL (OpenAI)** | `https://api.deepseek.com` | `https://api.deepseek.com` |
| **API Base URL (Anthropic)** | `https://api.deepseek.com/anthropic` | `https://api.deepseek.com/anthropic` |

*\*75% promotional discount until May 31, 2026. After this date, V4 Pro pricing becomes $1.74/$3.48*

## Thinking Mode

DeepSeek's thinking mode enables the model to reason through problems step-by-step before answering. It's configurable via `reasoning_effort`:

```python
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Explain transformer architecture"}],
    thinking={"type": "enabled"},
    reasoning_effort="high"  # low | medium | high
)
```

| Model | Thinking Mode | Default |
|---|---|---|
| **V4 Pro** | Always thinking | Enabled |
| **V4 Flash** | Both modes | Thinking (can disable via `thinking: {"type": "disabled"}`) |

## Context Caching (KV Cache)

DeepSeek's KV cache dramatically reduces costs for repeated context:

| Model | Standard Input | Cache Hit | Savings |
|---|---|---|---|
| V4 Pro | $0.435/1M | $0.0036/1M | ~99% |
| V4 Flash | $0.14/1M | $0.0028/1M | ~98% |

```python
# Context caching is automatic for repeated prefixes
# No special parameters needed — DeepSeek handles it on the server side
```

## Deprecation Schedule

| Model | Status | Deprecation Date | Replacement |
|---|---|---|---|
| `deepseek-chat` | Deprecating | July 24, 2026 | `deepseek-v4-flash` (non-thinking mode) |
| `deepseek-reasoner` | Deprecating | July 24, 2026 | `deepseek-v4-flash` (thinking mode) |

## Cost Comparison — DeepSeek vs Competition

For a typical workload (100K conversations, avg 5K input + 2K output each):

| Provider | Model | Cost/Day | Cost/Month |
|---|---|---|---|
| DeepSeek | V4 Flash | $2.10 | $63 |
| DeepSeek | V4 Pro (promo) | $6.50 | $195 |
| OpenAI | GPT-5.4 mini | $11.25 | $338 |
| Anthropic | Claude Haiku 4.5 | $15.00 | $450 |
| OpenAI | GPT-5.4 | $37.50 | $1,125 |
| Anthropic | Claude Sonnet 4.6 | $45.00 | $1,350 |
| Anthropic | Claude Opus 4.7 | $75.00 | $2,250 |

DeepSeek V4 Flash is **7x cheaper than GPT-5.4 mini** and **21x cheaper than Claude Sonnet**.

For a broader comparison, see [Comparison & Migration](/deepseek/comparison).

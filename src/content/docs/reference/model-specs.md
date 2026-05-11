---
title: Model Specifications & Pricing (May 2026)
description: Detailed specs for major AI models  -  context windows, pricing, capabilities and tradeoffs
sidebar:
  order: 4
tags:
  - reference
  - models
  - specs
glossaryLinks:
  - token
  - context window
  - inference
lastUpdated: 2026-05-10
nextVerificationDue: 2026-06-09
---

:::note
Keep this table opinionated  -  it's **your** notes, not an exhaustive database. Update the "Best for" and "Notes" columns as you learn.
:::

## Model Comparison

| Model | Context | Input/Output | Vision | Best for | Notes |
|---|---|---|---:|---|---|
| **Claude Sonnet 4.6** | 200k | $3/$15 per 1M | ✅ Images | Default reasoning, coding | Best balance of speed & quality. Default pick. |
| **Claude Opus 4.7** | 400k | $15/$75 per 1M | ✅ Images | Complex multi-step reasoning | Use when Sonnet struggles. Most capable. |
| **Claude Haiku 4.5** | 200k | $0.80/$4 per 1M | ✅ Images | Classification, routing, summaries | Ultra-fast, cheapest Claude. |
| **GPT-5.5** | 128k | $2/$8 per 1M | ✅ Images | General tasks, web search | Strong all-around. Good context. |
| **GPT-5.5 Instant** | 128k | $0.05/$0.15 per 1M | ❌ Text only | Routing, simple tasks | Embarrassingly cheap for basic work. |
| **GPT-5.4** | 128k | $1/$4 per 1M | ❌ Text only | Budget GPT tasks | Earlier GPT-5 variant. Superseded by 5.5. |
| **GPT-4.1** | 128k | $0.50/$1.50 per 1M | ❌ Text only | Legacy compatibility | Interim model between GPT-4 and GPT-5. |
| **o3** | 128k | $10-$60 per 1M out | ❌ Text only | Deep reasoning | Slow deliberative reasoning. Expensive. |
| **Gemini 3.1 Pro** | 1M | $2/$12 per 1M | ✅ Images + Video | Long-context research, docs | Best context window. Excellent multimodal. |
| **Gemini 3 Mini** | 128k | $1/$6 per 1M | ✅ Images | Speed-sensitive tasks | Smaller, faster Gemini variant. |
| **Grok 3 Pro** | 128k | $3/$15 per 1M | ✅ Images | Real-time data, X/Twitter | Premium tier. Real-time X/Twitter data. |
| **DeepSeek V4** | 128k | $0.55/$2.19 per 1M | ❌ Text only | Cost-conscious prod | Surprisingly capable. MIT license. |
| **DeepSeek V4 Flash** | 128k | $0.14/$0.28 per 1M | ❌ Text only | Ultra-cheap routing | Absurdly affordable. Good enough. |
| **DeepSeek V4 Pro** | 128k | $0.55/$2.19 per 1M | ❌ Text only | Premium DeepSeek | Stronger than V4. Top on Design Arena. |
| **DeepSeek VL** | 128k | ~$0.55/$2.19 per 1M | ✅ Images | Vision tasks (DeepSeek ecosystem) | Separate vision model from DeepSeek API. |
| **Kimi K2.6** | 256k | ~$0.55/$2.19 per 1M | ❌ Text only | Agent swarm, long context | 100-agent swarm. Top-5 on Design Arena. |
| **Qwen 3.6** | 128k | ~$0.40/$1.50 per 1M | ✅ Images | Multilingual, general | Alibaba's flagship. Strong across benchmarks. |
| **GLM 5.1** | 128k | ~$0.50/$2.00 per 1M | ✅ Images | Multilingual, design | Zhipu's flagship. Strong on design benchmarks. |
| **GLM 5 Turbo** | 128k | ~$0.30/$1.00 per 1M | ✅ Images | Speed, multilingual | Fast inference variant of GLM 5. |
| **GLM 5** | 128k | ~$0.40/$1.50 per 1M | ✅ Images | Base GLM | Base GLM 5 model. Strong multilingual. |
| **MiniMax M2.7** | 128k | ~$0.30/$1.00 per 1M | ✅ Images | Long-context tasks | Independent Chinese AI lab. Strong context. |
| **MiMo M2.7** | 128k | ~$0.25/$0.80 per 1M | ✅ Images | Multimodal (Xiaomi) | Xiaomi's first major AI model. |
| **Muse Spark** | varies | Free (self-host) | ✅ Images | Open-weight design | Meta's latest. Replaces Llama. |
| **Llama 4** | varies | Free (self-host) | ✅ Images | On-prem, privacy-critical | Open weights. MIT license. Run locally. |
| **Llama 4 Scout** | 10M | Free (self-host) | ✅ Images | Extreme long-context | MoE variant. 10M context, 109B params. |

## How to Choose (May 2026)

```text
1. Need vision / image input?
    ├─ yes → Gemini 3.1 Pro (images + video) or Claude Sonnet (images)
    └─ no  → continue

2. Data privacy / must stay on-prem?
    └─ yes → Llama 4 (self-host) or DeepSeek V4 (via API)
    └─ no  → continue

3. Need to minimize cost?
    └─ yes → DeepSeek V4 Flash ($0.14 input) or GPT-5.5 Instant
    └─ no  → continue

4. Need very long context (research, docs)?
    └─ yes → Gemini 3.1 Pro (1M tokens)
    └─ no  → continue

5. Need deep reasoning (complex logic)?
    └─ yes → Claude Opus 4.7 or o3
    └─ no  → Claude Sonnet 4.6 (default)
```

## Cost Scenarios (Real Use Cases)

**Scenario 1: Customer support chatbot (100 requests/day, 500 input tokens avg, 200 output tokens avg)**
- Claude Sonnet: ~$15/month
- GPT-5.5 Instant: ~$4/month
- DeepSeek V4 Flash: ~$2/month ✅ Best value

**Scenario 2: RAG + research (10 requests/day, 8000 input tokens avg, 1000 output)**
- Gemini 3.1 Pro: ~$16/month (handles 1M context)
- Claude Sonnet: ~$120/month
- DeepSeek V4: ~$35/month

**Scenario 3: Reasoning + code generation (50 requests/day, 2000 input, 1500 output)**
- Claude Opus 4.7: ~$675/month
- Claude Sonnet: ~$225/month ✅ Best balance
- DeepSeek V4: ~$53/month (if quality sufficient)

## Cost Formula

```
daily_requests × avg_input_tokens × (input_price / 1M)
+ daily_requests × avg_output_tokens × (output_price / 1M)
= monthly_cost × 30
```

If the number surprises you: add caching, batch process, use cheaper model for routing, or add RAG to reduce context.

---

See also:
- [Tools & Platforms Guide](/decide/tools/guide)  -  How to access models
- [Benchmarks](/reference/benchmarks)  -  Performance on standard evaluations

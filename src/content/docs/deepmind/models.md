---
title: Gemini Models
description: Deep comparison of Gemini 3.5, Gemini Omni, Nano Banana 2 (Gemini Image), and Gemini Audio — capabilities, multimodality, context windows, pricing, and model selection guide.
sidebar:
  order: 2
tags:
  - deepmind
  - google
  - gemini
  - models
  - reference
  - vendor-comparison
glossaryLinks:
  - llm
  - token
  - context-window
tldr:
  - "Two active Gemini 3 generations: Gemini 3.1 Pro (preview, latest flagship) and Gemini 3.5 Flash (stable, frontier Flash tier)"
  - "Gemini 3 lineup also includes 3 Flash (preview), 3.1 Flash-Lite (stable), 3.1 Flash Live (voice), 3.1 Flash TTS (speech)"
  - "Gemini Omni Flash: separate native multimodal model — create video/image/audio/text from any input; available via Gemini app and Google Flow"
  - "Nano Banana 2 (= Gemini 3.1 Flash Image): pro-level image generation/editing; available via Gemini app and AI Studio"
  - "All models available via Gemini API, Google AI Studio (free tier), and Vertex AI (enterprise)"
lastUpdated: 2026-05-23
nextVerificationDue: 2026-08-23
---

## Current Gemini Lineup — May 2026

The Gemini 3 generation has two parallel tracks: **Pro** (preview, maximum quality) and **Flash** (stable, optimized for cost/latency). Specialized models — Omni, Nano Banana, Live, TTS — are released independently.

| Model | Status | Input (/1M) | Output (/1M) | Context | Best For |
|---|---|---|---|---|---|
| **Gemini 3.1 Pro** | Preview | $2 (≤200K) / $4 (>200K) | $12 (≤200K) / $18 (>200K) | Long-context tiered | Frontier reasoning, agentic coding |
| **Gemini 3.5 Flash** | Stable | $1.50 | $9 | 1M tokens | Frontier performance at Flash speed |
| **Gemini 3 Flash** | Preview | TBD | TBD | TBD | Frontier-class at fraction of Pro cost |
| **Gemini 3.1 Flash-Lite** | Stable | $0.25 (text/image/video) / $0.50 (audio) | $1.50 | TBD | Budget tier, high-volume tasks |
| **Gemini 3.1 Flash Live** | Preview | — | — | — | Real-time voice/dialogue (Live API) |
| **Gemini 3.1 Flash TTS** | Preview | — | — | — | Low-latency speech synthesis |
| **Gemini 2.5 Pro** | Stable | $1.25 (≤200K) / $2.50 (>200K) | $10 (≤200K) / $15 (>200K) | Long-context tiered | Previous-gen Pro (still widely deployed) |
| **Gemini 2.5 Flash** | Stable | $0.30 (text/image/video) / $1 (audio) | $2.50 | 1M tokens | Previous-gen Flash |
| **Gemini 2.5 Flash-Lite** | Stable | $0.10 (text/image/video) / $0.30 (audio) | $0.40 | TBD | Previous-gen budget tier |

> **Pricing note:** Pro models use **long-context tiered pricing** — different rates above 200K tokens. Batch and Flex variants typically offer 50% reductions. See [ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing) for current rates.

## Specialized Multimodal Models

Released separately from the main 3 series — each is a distinct model with its own surface.

| Model | What It Is | Access |
|---|---|---|
| **Gemini Omni Flash** | Native multimodal "world model" — video in/out, image, audio, text. Unveiled at I/O 2026 | Gemini app, Google Flow, YouTube creation surfaces (eligible Google AI subscribers) |
| **Nano Banana 2** (= Gemini 3.1 Flash Image) | Pro-level image generation and editing at Flash speed | Gemini app, AI Studio |
| **Veo** | Cinematic video generation | Gemini app, Flow, AI Studio (see [Media & Creative](/deepmind/media)) |
| **Imagen** | High-quality image generation | Gemini app, API |
| **Lyria 3** | Music generation with vocals | Gemini app, AI Studio |

## Gemini 3 Pro vs Flash — Which Track?

```
What matters most?
│
├─ Maximum reasoning / agentic depth → Gemini 3.1 Pro (preview)
│   Use when: complex multi-step coding, R&D, deep analysis
│   Cost: $2/$12 per 1M ≤200K; $4/$18 >200K
│
├─ Frontier performance at Flash speed → Gemini 3.5 Flash (stable)
│   Use when: production agents, sustained coding workflows
│   Cost: $1.50/$9 per 1M
│
├─ Budget tier, high-volume → Gemini 3.1 Flash-Lite
│   Use when: classification, routing, simple chat
│   Cost: $0.25/$1.50 per 1M (text)
│
├─ Real-time voice → Gemini 3.1 Flash Live + Live API
├─ Multimodal creation → Gemini Omni Flash (via Gemini app / Flow)
├─ Image generation → Nano Banana 2 / Imagen
└─ Open-weight, self-hosted → Gemma 4 (see [Gemma](/deepmind/gemma))
```

## Gemini Omni — Native Multimodality

Gemini Omni is designed for multimodal creation — it natively processes and generates video, image, audio, and text in a single model. Unlike models that convert everything to text first, Omni works directly in each modality.

- **Video-in, video-out** — describe a scene and get generated video
- **Image-in, audio-out** — analyze a photo and narrate it
- **Text-in, everything-out** — one prompt creates video + image + audio + text

Available via Gemini app and Google Flow.

## Nano Banana 2 — Image Generation

Pro-level image generation and editing at Flash-level speed:

| Capability | Description |
|---|---|
| **Text-to-image** | Generate from text descriptions |
| **Image editing** | Modify, enhance, transform existing images |
| **Style transfer** | Apply artistic styles to images |
| **Resolution** | High resolution output, commercial quality |

Available in the Gemini app and Google AI Studio.

## Audio — Voice, Speech & Music

Audio capabilities are split across several specialized models rather than a single "Gemini Audio" product:

| Model | Purpose | Access |
|---|---|---|
| **Gemini 3.1 Flash Live** | Real-time voice / dialogue (low-latency, full-duplex) | Live API, AI Studio |
| **Gemini 3.1 Flash TTS** | Low-latency text-to-speech | API, AI Studio |
| **Lyria 3** | Music generation with vocals | Gemini app, AI Studio (see [Media & Creative](/deepmind/media)) |
| **Gemini multimodal input** | Audio understanding (analyze, transcribe, describe) — built into Pro / Flash | Gemini API, AI Studio, Vertex AI |

## Comparing Across Models

For a broader comparison across Gemini, GPT, Claude, and DeepSeek, see the [Models Decision Guide](/decide/models/guide/).

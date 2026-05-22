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
glossaryLinks:
  - llm
  - token
  - context-window
tldr:
  - "Four Gemini model families: Gemini 3.5 (frontier), Gemini Omni (native multimodal), Nano Banana 2 (image), Gemini Audio (voice)"
  - "Gemini 3.5: frontier intelligence with action — latest series, 1M+ context, multimodal text+image+audio"
  - "Gemini Omni: natively multimodal — create anything from anything, starting with video"
  - "All models available via Gemini API, Google AI Studio (free tier), and Vertex AI (enterprise)"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Current Gemini Models — May 2026

| Feature | Gemini 3.5 | Gemini Omni | Nano Banana 2 | Gemini Audio |
|---|---|---|---|---|
| **Description** | Frontier intelligence with action | Native multimodal — video, image, text, audio | Pro-level image generation, Flash speed | Real-time audio generation |
| **Input Modalities** | Text, image, audio, video, code | Video, image, text, audio | Text, image | Audio, text |
| **Output Modalities** | Text, code | Video, image, audio, text | Image | Audio |
| **Context Window** | 1M+ tokens | 1M+ tokens | — | — |
| **Pricing** | Check [ai.google.dev/pricing](https://ai.google.dev/pricing) | Check pricing | Check pricing | Per-minute/per-token |
| **Available Via** | API, AI Studio, Vertex AI, Gemini app | Gemini app, Google Flow | Gemini app, AI Studio | AI Studio, Gemini Live API, Vertex AI |
| **Best For** | Reasoning, coding, agents, enterprise | Multimodal creation, video generation | Image design, editing, marketing | Voice agents, audio production |

## Gemini 3.5 — Frontier Intelligence

Gemini 3.5 is the latest flagship series combining frontier reasoning with action capabilities. It supports:
- **1M+ token context** — process entire books, codebases, transcripts
- **Multimodal input** — text, images, audio, video, code simultaneously
- **Tool use** — function calling, web search, code execution
- **Streaming** — real-time responses
- **Multiple tiers available** (Pro, Flash, Ultra)

### Tier Selection

| Tier | Best For | Tradeoff |
|---|---|---|
| **Gemini 3.5 Ultra** | Maximum quality, complex reasoning | Slowest, most expensive |
| **Gemini 3.5 Pro** | Balanced — most workloads | Good speed-quality balance |
| **Gemini 3.5 Flash** | Speed + efficiency | Fastest, most affordable |

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

## Gemini Audio — Voice & Sound

Advanced real-time audio models built on Gemini architecture:

| Feature | Description |
|---|---|
| **Real-time generation** | Generate audio on-the-fly |
| **Voice synthesis** | Natural-sounding voices |
| **Music generation** | Instrumental and vocal music |
| **Audio understanding** | Analyze, transcribe, describe audio |

Via Gemini Live API and Google AI Studio.

## Comparing Across Models

For a broader comparison across Gemini, GPT, Claude, and DeepSeek, see the [Models Decision Guide](/decide/models/guide).

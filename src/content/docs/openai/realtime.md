---
title: Realtime, Image & Media
description: OpenAI's multimodal capabilities — Realtime API (voice agents, live translation), GPT Image 2 (image generation), Sora (video), Whisper (speech-to-text), and TTS (text-to-speech).
sidebar:
  order: 7
tags:
  - openai
  - realtime
  - image
  - video
  - voice
  - whisper
glossaryLinks:
  - api
  - streaming
tldr:
  - "Realtime API: Voice agents, live translation, speech transcription via WebRTC, WebSocket, or SIP"
  - "GPT Image 2: State-of-the-art image generation ($8/$30 per 1M image tokens)"
  - "Sora: Cinematic video generation available via ChatGPT Pro and API"
  - "Whisper/TTS: Speech-to-text and text-to-speech for traditional audio workloads"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

OpenAI's multimodal stack is the broadest in the industry — realtime voice, image generation, video generation, and speech processing all available through a single platform.

## Realtime API — Voice & Audio

The Realtime API enables low-latency voice interactions, live translation, and streaming speech processing.

### Connection Methods

| Method | Protocol | Best For | Latency |
|---|---|---|---|
| **WebRTC** | Peer-to-peer, browser-native | Browser-based voice apps | Lowest |
| **WebSocket** | Persistent bidirectional | Server-side, custom clients | Low |
| **SIP** | Traditional telephony | Phone call integration | Moderate |

### GPT Realtime 2 — Voice Agents

```python
# WebRTC connection for realtime voice
import asyncio
from openai import OpenAI

client = OpenAI()

# Create a realtime session
session = client.realtime.sessions.create(
    model="gpt-realtime-2",
    voice="alloy",
    instructions="You are a helpful customer support agent."
)

# Send audio and receive responses
# Audio in: $32 / 1M tokens ($0.40 cached)
# Audio out: $64 / 1M tokens
# Text in: $4 / 1M tokens ($0.40 cached)
# Text out: $24 / 1M tokens
```

### Realtime Translation

Live speech-to-speech translation at $0.034/minute:

```python
session = client.realtime.sessions.create(
    model="gpt-realtime-translate",
    source_language="en",
    target_language="fr"
)
# Translates English speech to French speech in real time
```

### Realtime Whisper — Streaming Transcription

Live speech-to-text at $0.017/minute:

```python
session = client.realtime.sessions.create(
    model="gpt-realtime-whisper"
)
# Streams transcription as the speaker talks
```

### Traditional Speech-to-Text

```python
# GPT-4o Transcribe — high quality
audio_file = open("meeting.mp3", "rb")
transcript = client.audio.transcriptions.create(
    model="gpt-4o-transcribe",
    file=audio_file
)
print(transcript.text)
```

### Text-to-Speech

```python
# GPT-4o mini TTS
response = client.audio.speech.create(
    model="gpt-4o-mini-tts",
    voice="nova",
    input="Welcome to the AI Playbook. Today we'll explore..."
)
response.stream_to_file("output.mp3")
```

## GPT Image 2 — Image Generation

State-of-the-art image generation with text and image input:

```python
response = client.images.generate(
    model="gpt-image-2",
    prompt="A futuristic AI research lab with holographic displays showing neural network architectures, cinematic lighting",
    size="1024x1024",
    quality="hd"
)
```

| Feature | Detail |
|---|---|
| **Input (image)** | $8 / 1M tokens ($2 cached) |
| **Output (image)** | $30 / 1M tokens |
| **Input (text)** | $5 / 1M tokens ($1.25 cached) |
| **Maximum resolution** | Up to 2048x2048 |
| **Capabilities** | Generation, editing, variation, inpainting |

### Image Editing

```python
response = client.images.edit(
    model="gpt-image-2",
    image=open("original.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="Replace the background with a modern office setting"
)
```

## Sora — Video Generation

Cinematic video generation from text prompts, available via ChatGPT Pro ($200/mo) and API:

```python
response = client.video.generate(
    model="sora",
    prompt="A drone shot flying over a futuristic city at sunset, with flying cars and holographic billboards",
    duration=10,  # seconds
    resolution="1080p"
)
```

| Feature | Detail |
|---|---|
| **Max duration** | Up to 60 seconds |
| **Resolution** | Up to 4K |
| **Capabilities** | Text-to-video, image-to-video, video extension |
| **Availability** | ChatGPT Pro + API |

## Whisper / TTS — Traditional Audio

For non-realtime speech workloads, OpenAI offers traditional speech models:

| Model | Use Case | Cost |
|---|---|---|
| **Whisper** | Batch/offline speech-to-text | $0.006/minute |
| **GPT-4o Transcribe** | High-quality speech-to-text | Pay-per-token |
| **GPT-4o mini Transcribe** | Cost-efficient speech-to-text | Pay-per-token |
| **GPT-4o mini TTS** | Text-to-speech | Pay-per-token |

## Use Case Matrix

| Use Case | Best Tool |
|---|---|
| Browser-based voice agent | Realtime API (WebRTC) |
| Phone call integration | Realtime API (SIP) |
| Live translation | Realtime Translate |
| Meeting transcription | Realtime Whisper (streaming) or Whisper (batch) |
| Product images / marketing | GPT Image 2 |
| Video content / ads | Sora |
| Audiobook narration | TTS |
| Podcast transcription | Whisper |

For the MCP protocol and how it connects to OpenAI tools, see [MCP & Integrations](/openai/mcp).

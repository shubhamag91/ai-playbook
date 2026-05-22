---
title: "Media & Creative"
description: Google DeepMind's media generation tools — Veo (video), Imagen (image), Lyria 3 (music), Nano Banana 2 (image editing), and Gemini Audio (voice/sound). How they work, use cases, and access.
sidebar:
  order: 5
tags:
  - deepmind
  - google
  - media
  - video
  - image
  - music
  - voice
glossaryLinks:
  - api
tldr:
  - "Veo: cinematic video generation with audio. Available in Gemini app, Google Flow, and AI Studio"
  - "Nano Banana 2: pro-level image generation and editing at Flash speed. Available in Gemini app"
  - "Lyria 3: music generation with vocals — compose, experiment with acoustic details"
  - "Gemini Audio: real-time audio generation, voice synthesis, and audio understanding"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

Google DeepMind's media generation portfolio spans video, image, music, and audio — all powered by Gemini's multimodal architecture.

## Veo — Video Generation

Veo is DeepMind's leading video generation model, capable of cinematic-quality output:

| Feature | Detail |
|---|---|
| **Input** | Text, image, or video prompts |
| **Output** | Cinematic video with audio |
| **Resolution** | Up to 4K |
| **Duration** | Variable (seconds to minutes) |
| **Available Via** | Gemini app, Google Flow, AI Studio, Vertex AI |

```python
# API access via Vertex AI
from vertexai.vision_models import VideoGenerationModel
model = VideoGenerationModel.from_pretrained("veo-3")
response = model.generate_video(
    prompt="A drone shot of a futuristic city at sunset, with flying cars",
    duration_seconds=10
)
```

### Use Cases

- Marketing and advertising videos
- Product demonstrations
- Educational content
- Creative storytelling
- Social media content

## Nano Banana 2 (Gemini Image) — Image Generation

Pro-level image generation and editing with Flash-level speed:

| Feature | Detail |
|---|---|
| **Capabilities** | Text-to-image, image editing, style transfer, inpainting |
| **Speed** | Flash tier — fast generation |
| **Quality** | Professional-grade, commercial-ready |
| **Available Via** | Gemini app, AI Studio, Vertex AI |

```python
# Via Gemini API with image output
model = genai.GenerativeModel("gemini-3.5-pro")
response = model.generate_content([
    "Generate an image of a modern AI research lab with holographic displays"
])
```

## Lyria 3 — Music Generation

Lyria 3 is DeepMind's most advanced music generation model:

| Feature | Detail |
|---|---|
| **Capabilities** | Compose with vocals, experiment with acoustic details |
| **Genres** | Wide range — classical to electronic |
| **Customization** | Mood, tempo, instrumentation, vocals |
| **Available Via** | Gemini app, AI Studio, Vertex AI |

## Gemini Audio — Voice & Sound

Real-time audio models built on Gemini:

| Feature | Detail |
|---|---|
| **Voice synthesis** | Natural-sounding voices, multiple languages |
| **Music generation** | Instrumental and vocal |
| **Audio understanding** | Transcribe, analyze, describe audio content |
| **Real-time** | Low-latency generation and streaming |
| **Available Via** | Gemini Live API, AI Studio, Vertex AI |

```python
# Gemini Live API for real-time audio
# Available via AI Studio with Gemini Live
# Supports bidirectional audio streaming
```

## Tool Selection Matrix

| Task | Best Tool |
|---|---|
| Cinematic video from text | **Veo** |
| Social media video (quick) | **Google Flow + Omni** |
| Professional image generation | **Nano Banana 2** |
| Logo / icon generation | **Imagen** |
| Background music for videos | **Lyria 3** |
| Song with vocals | **Lyria 3** |
| Voice narration | **Gemini Audio** |
| Podcast production | **Gemini Audio + NotebookLM** |

## Where Next

- [Antigravity & Flow](/deepmind/antigravity) — agentic dev platform and creative tools
- [Enterprise & Deployment](/deepmind/enterprise) — Vertex AI media deployment

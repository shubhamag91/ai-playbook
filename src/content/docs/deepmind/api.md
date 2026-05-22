---
title: "Gemini API & Google AI Studio"
description: Complete guide to the Gemini API — AI Studio (free developer IDE), Vertex AI (enterprise), Gemini Live API (real-time voice), function calling, streaming, embeddings, and pricing.
sidebar:
  order: 3
tags:
  - deepmind
  - google
  - gemini
  - api
  - sdk
  - development
glossaryLinks:
  - api
  - token
  - streaming
tldr:
  - "Google AI Studio is the free developer IDE — no credit card required, 1M token context, Gemini 3.5 access"
  - "Gemini API: text, image, audio, video input. Function calling, streaming, structured output"
  - "Vertex AI: enterprise deployment with Google Cloud integration, VPC, IAM, compliance"
  - "Gemini Live API: real-time bidirectional voice and audio streaming"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Getting Started — Google AI Studio (Free)

Google AI Studio is the fastest way to start building with Gemini — no credit card required.

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Start prompting — free tier includes Gemini 3.5 Pro access

```python
# Python SDK
pip install google-generativeai

import google.generativeai as genai
genai.configure(api_key="YOUR_API_KEY")

model = genai.GenerativeModel("gemini-3.5-pro")
response = model.generate_content("Explain quantum computing in one paragraph")
print(response.text)
```

## Gemini API

### Text Generation

```python
model = genai.GenerativeModel("gemini-3.5-flash")
response = model.generate_content("Write a Python function to check if a number is prime")
print(response.text)
```

### Multimodal Input

```python
import PIL.Image

# Text + image
image = PIL.Image.open("photo.jpg")
model = genai.GenerativeModel("gemini-3.5-pro")
response = model.generate_content(["Describe this image in detail:", image])
print(response.text)
```

### Audio Input

```python
# Audio file analysis
audio_file = genai.upload_file("meeting.mp3")
model = genai.GenerativeModel("gemini-3.5-pro")
response = model.generate_content(["Summarize this meeting:", audio_file])
print(response.text)
```

### Video Input

```python
# Video analysis
video_file = genai.upload_file("presentation.mp4")
model = genai.GenerativeModel("gemini-3.5-pro")
response = model.generate_content([
    "Analyze this presentation and create a summary:", video_file
])
print(response.text)
```

### Streaming

```python
model = genai.GenerativeModel("gemini-3.5-flash")
response = model.generate_content("Write a haiku about programming", stream=True)
for chunk in response:
    print(chunk.text, end="", flush=True)
```

### Function Calling

```python
model = genai.GenerativeModel(
    "gemini-3.5-pro",
    tools=[{
        "function_declarations": [{
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City and state"}
                },
                "required": ["location"]
            }
        }]
    }]
)
```

### Structured Output

```python
model = genai.GenerativeModel("gemini-3.5-pro")
response = model.generate_content(
    "Extract people from: Alice met Bob at 3 PM",
    generation_config={"response_mime_type": "application/json"}
)
```

## Gemini Live API — Real-Time Voice

Bidirectional streaming for voice agents and real-time audio:

```python
# Client-side WebSocket connection for live voice
# Available via AI Studio or Vertex AI
# Supports: voice input → model processing → voice output
# Use cases: voice agents, live translation, audio analysis
```

## Vertex AI — Enterprise

```python
from google.cloud import aiplatform
from vertexai.generative_models import GenerativeModel

# Deploy within your GCP project
model = GenerativeModel("gemini-3.5-pro")
# Full GCP integration: IAM, VPC, Cloud Logging, audit trails
```

| Feature | AI Studio | Vertex AI |
|---|---|---|
| **Cost** | Free tier, then pay-per-use | Pay-per-use, committed use discounts |
| **Setup** | No setup required | GCP project + APIs |
| **Security** | Google account | IAM, VPC, Private Link, Cloud KMS |
| **Compliance** | Standard | SOC 2, HIPAA, FedRAMP |
| **Context** | 1M tokens | 1M tokens |
| **SLAs** | None | Enterprise SLAs |

## Embeddings

```python
model = "models/text-embedding-004"
result = genai.embed_content(
    model=model,
    content="The quick brown fox jumps over the lazy dog"
)
vector = result['embedding']

# Dimensions: 768 (text-embedding-004)
# Use for: semantic search, clustering, recommendations
```

## Pricing

Gemini API pricing is tiered. Check [ai.google.dev/pricing](https://ai.google.dev/pricing) for latest:

| Model Tier | Typical Range | Notes |
|---|---|---|
| Flash tier | $0.075-$0.15 / 1M input | Fastest, most affordable |
| Pro tier | $1.25-$2.50 / 1M input | Balanced, production workloads |
| Ultra tier | Premium pricing | Maximum quality |
| Audio/Live | Per-minute + per-token | Real-time streaming |

**AI Studio free tier:** Generous free quota for experimentation. No credit card needed.

## Where Next

- [Antigravity & Flow](/deepmind/antigravity) — agentic development platform
- [Media & Creative](/deepmind/media) — video, image, music generation
- [Enterprise & Deployment](/deepmind/enterprise) — Vertex AI, compliance

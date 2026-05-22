---
title: OpenAI API & SDKs
description: Complete guide to the OpenAI API — Responses API, function calling, streaming, prompt caching, Batch/Flex processing, web search, computer use, fine-tuning, embeddings, Realtime API, and SDKs.
sidebar:
  order: 3
tags:
  - openai
  - gpt
  - api
  - sdk
  - development
  - provider-api
glossaryLinks:
  - api
  - token
  - streaming
  - fine-tuning
tldr:
  - "Responses API is the primary endpoint (replacing Chat Completions). Supports text, image, tool use, streaming, and structured output"
  - "Prompt caching: 10% of input for reads (90% savings). Batch API: 50% off. Flex processing: slower but cheaper"
  - "Built-in tools: web search ($10/1K), computer use, file search, code interpreter, image generation"
  - "Fine-tuning: Supervised, Vision, DPO, and Reinforcement Fine-Tuning (RFT) — all supported via API"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Getting Started

```bash
# Get your API key from https://platform.openai.com
export OPENAI_API_KEY="your-api-key"
```

```python
# Python SDK
pip install openai

from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-5.4",
    input="Hello! Explain quantum computing in one paragraph."
)
print(response.output_text)
```

```typescript
// TypeScript SDK
npm install openai

import OpenAI from 'openai';
const client = new OpenAI();

const response = await client.responses.create({
  model: 'gpt-5.4',
  input: 'Hello! Explain quantum computing in one paragraph.',
});
console.log(response.output_text);
```

## Responses API

The Responses API is the primary endpoint (replaces Chat Completions). It unifies text, tool use, and multimodal input into a single interface.

### Basic Text Generation

```python
response = client.responses.create(
    model="gpt-5.5",
    input="Write a Python function to check if a number is prime",
    reasoning={"effort": "medium"}
)
```

### With Reasoning

```python
response = client.responses.create(
    model="gpt-5.5",
    input="Design a distributed rate limiter with redis and token buckets",
    reasoning={"effort": "high"}  # Spends more tokens "thinking"
)
```

### Tool Use (Function Calling)

```python
response = client.responses.create(
    model="gpt-5.4",
    input="What's the weather in San Francisco?",
    tools=[{
        "type": "function",
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string"}
            },
            "required": ["location"]
        }
    }]
)
```

### Streaming

```python
from openai import OpenAI
client = OpenAI()

stream = client.responses.create(
    model="gpt-5.4-mini",
    input="Write a haiku about programming",
    stream=True
)
for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
```

## Built-in Tools

### Web Search — $10/1K calls

```python
response = client.responses.create(
    model="gpt-5.4",
    input="Latest GPT-5 pricing vs Claude pricing?",
    tools=[{"type": "web_search_preview"}]
)
```

Search content tokens are free — you only pay the per-call fee.

### File Search

```python
# Upload and search your documents
response = client.responses.create(
    model="gpt-5.4",
    input="What does our Q1 report say about revenue?",
    tools=[{
        "type": "file_search",
        "vector_store_ids": ["vs_abc123"]
    }]
)
```

### Computer Use

```python
response = client.responses.create(
    model="gpt-5.4-mini",
    input="Go to github.com/trending and list the top 5 repos",
    tools=[{"type": "computer_use_preview"}]
)
```

### Code Interpreter

```python
response = client.responses.create(
    model="gpt-5.4",
    input="Analyze this CSV and create a summary chart",
    tools=[{"type": "code_interpreter"}]
)
```

## Prompt Caching — 90% Cost Savings

| Model | Base Input | Cached Input | Savings |
|---|---|---|---|
| GPT-5.5 | $5 / 1M | $0.50 / 1M | 90% |
| GPT-5.4 | $2.50 / 1M | $0.25 / 1M | 90% |
| GPT-5.4 mini | $0.75 / 1M | $0.075 / 1M | 90% |

Caching is automatic for repeated content — no special parameters needed beyond the standard API call.

## Batch & Flex Processing

| Mode | Discount | Latency | Best For |
|---|---|---|---|
| **Standard** | 0% | Normal | Interactive, real-time apps |
| **Batch** | 50% off | Up to 24h | Async processing, nightly jobs |
| **Flex** | Variable | Slower, may queue | Non-production, cost-sensitive |
| **Priority** | Premium | Fastest | Latency-critical production |

```python
# Batch API
batch = client.batches.create(
    input_file_id="file-abc123",
    endpoint="/v1/responses",
    completion_window="24h"
)
```

## Fine-Tuning

OpenAI supports four fine-tuning approaches:

| Method | What It Does | Best For |
|---|---|---|
| **Supervised Fine-Tuning** | Train on example input/output pairs | Custom behavior, tone, format |
| **Vision Fine-Tuning** | Fine-tune with image data | Visual task specialization |
| **DPO (Direct Preference Optimization)** | Train on preference pairs (good vs bad outputs) | Quality improvements without RL |
| **Reinforcement Fine-Tuning (RFT)** | Train with reward signals | Complex reasoning, specialized domains |

```python
# Create a fine-tuning job
job = client.fine_tuning.jobs.create(
    model="gpt-5.4-mini",
    training_file="file-abc123",
    method="dpo"  # {'supervised', 'dpo', 'rft'}
)
```

## Embeddings & Moderation

```python
# Embeddings for semantic search
response = client.embeddings.create(
    model="text-embedding-3-large",
    input="The quick brown fox jumps over the lazy dog"
)
vector = response.data[0].embedding

# Moderation for content safety
response = client.moderations.create(
    input="User-generated content to check..."
)
flagged = response.results[0].flagged
```

## SDKs — Quick Reference

| Language | Package | Import |
|---|---|---|
| Python | `pip install openai` | `from openai import OpenAI` |
| TypeScript | `npm install openai` | `import OpenAI from 'openai'` |
| Java | Maven: `com.openai:openai-java` | `import com.openai.*` |
| Go | `go get github.com/openai/openai-go` | `import "github.com/openai/openai-go"` |
| CLI | `pip install openai` | `openai api responses.create ...` |

## Where Next

- [Codex](/openai/codex) — the full agentic coding platform
- [Realtime, Image & Media](/openai/realtime) — voice, video, and image generation
- [Workflows & Best Practices](/openai/workflows) — prompt engineering and optimization
- [Enterprise & Deployment](/openai/enterprise) — security, compliance, deployment

For cross-model comparison, see the [Models Decision Guide](/decide/models/guide/).

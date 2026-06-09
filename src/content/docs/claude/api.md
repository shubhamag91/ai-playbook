---
title: Claude API & SDKs
description: Complete guide to the Claude API — Messages API, tool use, streaming, structured outputs, prompt caching, batch processing, web search, computer use, SDKs, and cost optimization.
sidebar:
  order: 3
tags:
  - claude
  - anthropic
  - api
  - sdk
  - development
  - provider-api
glossaryLinks:
  - api
  - token
  - streaming
  - inference
tldr:
  - "Messages API is the primary endpoint: send text + images, receive text responses with tool use, streaming, and structured outputs"
  - "Prompt caching: 10% of input price for cache reads (90% savings). Batch API: 50% discount for async. Combine for up to 95% savings"
  - "All SDKs (Python, TypeScript, Java, Go) support streaming, tool use, and the full feature set"
  - "Web search ($10/1K searches), web fetch (free), computer use, and code execution tools available"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Getting Started

```bash
# Get your API key from https://console.anthropic.com
export ANTHROPIC_API_KEY="your-api-key"
```

```python
# Python SDK
pip install anthropic

import anthropic
client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude!"}]
)
print(message.content[0].text)
```

```typescript
// TypeScript SDK
npm install @anthropic-ai/sdk

import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic();

const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Claude!' }],
});
console.log(message.content[0].text);
```

## Messages API

The Messages API is the primary endpoint. Key capabilities:

### Content Blocks (Multimodal Input)

```python
message = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Describe this image:"},
            {"type": "image", "source": {
                "type": "base64",
                "media_type": "image/png",
                "data": base64_image_data
            }}
        ]
    }]
)
```

### Tool Use (Function Calling)

```python
tools = [{
    "name": "get_weather",
    "description": "Get current weather for a location",
    "input_schema": {
        "type": "object",
        "properties": {
            "location": {"type": "string", "description": "City and state"}
        },
        "required": ["location"]
    }
}]

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in San Francisco?"}]
)
```

### Streaming

```python
with client.messages.stream(
    model="claude-haiku-4-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a haiku about AI"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

### Structured Outputs

```python
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Extract names from: Alice met Bob at 3 PM"}],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "people_extraction",
            "schema": {
                "type": "object",
                "properties": {
                    "people": {"type": "array", "items": {"type": "string"}}
                }
            }
        }
    }
)
```

## Prompt Caching — 90% Cost Savings

Prompt caching stores frequently-used portions of your prompt so subsequent requests read from cache at 10% of the base input price.

| Operation | Multiplier vs Base Input | Duration |
|---|---|---|
| 5-min cache write | 1.25× | 5 minutes |
| 1-hour cache write | 2× | 1 hour |
| Cache read (hit) | **0.1×** | Same as the write |

```python
import anthropic
client = anthropic.Anthropic()

# Write to cache (1.25x for 5-min, 2x for 1-hour)
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "You are a financial analyst...",  # long system prompt
            "cache_control": {"type": "ephemeral"}
        }
    ],
    messages=[{"role": "user", "content": "Analyze Q1 results"}]
)
```

**When to use:**
- Long system prompts (instructions, role definitions)
- Repeated document analysis (same PDF, different questions)
- Conversation threads with shared context
- Multi-turn agent interactions

**ROI:** Cache pays off after just 1 read for 5-min writes, or 2 reads for 1-hour writes.

## Batch Processing — 50% Discount

For async, high-volume workloads:

```python
message = client.messages.beta.batches.create(
    model="claude-haiku-4-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Classify: ${text}"}],
    # Results available within 24 hours, typically much faster
)
```

| Model | Batch Input | Batch Output | vs Standard |
|---|---|---|---|
| Opus 4.8 | $2.50 / 1M | $12.50 / 1M | 50% off |
| Sonnet 4.6 | $1.50 / 1M | $7.50 / 1M | 50% off |
| Haiku 4.5 | $0.50 / 1M | $2.50 / 1M | 50% off |

## Built-in Tools

### Web Search — $10/1K Searches

```python
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=[{"type": "web_search_20260209"}],
    messages=[{"role": "user", "content": "Latest GPT-5 pricing compared to Claude?"}]
)
```

Charged per search executed, plus standard token costs for search results as input.

### Web Fetch — Free (Tokens Only)

```python
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=[{"type": "web_fetch_20260209"}],
    messages=[{"role": "user", "content": "Fetch and summarize the content at https://example.com"}]
)
```

No additional charge beyond standard token costs. Use `max_content_tokens` to cap fetched content size.

### Computer Use

```python
# Requires Claude computer use setup (Docker, etc.)
# Full setup: https://docs.anthropic.com/en/docs/agents-and-tools/computer-use
```

Adds 735 input tokens for tool definition + screenshot images as vision tokens.

### Code Execution

Free when combined with web search or web fetch. Otherwise: $0.05/hour/container (1,550 free hours/month).

## Cost Optimization Strategies

| Strategy | Savings | When to Apply |
|---|---|---|
| **Prompt Caching** | Up to 90% on input | Repeated system prompts, same-document analysis |
| **Batch API** | 50% on token costs | Non-urgent, high-volume processing |
| **Model Routing** | 30-60% | Route simple queries to Haiku, complex to Opus |
| **Prompt Caching + Batch** | Up to 95% | High-volume repeated analysis (nightly reports, classification) |
| **Streaming** | Better UX (earlier TTFT) | Interactive applications |

## Rate Limits

| Tier | RPM (Opus/Sonnet) | RPM (Haiku) | TPM (Tokens/min) |
|---|---|---|---|
| Tier 1 (Free/Starter) | 50 | 100 | 100K |
| Tier 2 (Build) | 1,000 | 2,000 | 2M |
| Tier 3 (Scale) | 5,000 | 10,000 | 10M |
| Tier 4 (Max) | 20,000 | 50,000 | 40M |
| Enterprise | Custom | Custom | Custom |

## SDKs — Quick Reference

| Language | Package | Import |
|---|---|---|
| Python | `pip install anthropic` | `import anthropic` |
| TypeScript | `npm install @anthropic-ai/sdk` | `import Anthropic from '@anthropic-ai/sdk'` |
| Java | Maven/Gradle: `com.anthropic:anthropic-java` | `import com.anthropic.*` |
| Go | `go get github.com/anthropics/anthropic-sdk-go` | `import "github.com/anthropics/anthropic-sdk-go"` |

## Where Next

- [Claude Code](/claude/claude-code) — the full agentic coding tool
- [Workflows & Best Practices](/claude/workflows) — prompt engineering and optimization
- [Enterprise & Deployment](/claude/enterprise) — AWS, GCP, Teams, compliance

For cross-model comparison (GPT, Gemini, DeepSeek), see the [Models Decision Guide](/decide/models/guide/).

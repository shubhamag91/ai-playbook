---
title: DeepSeek API & SDKs
description: Complete guide to the DeepSeek API — dual format (OpenAI + Anthropic compatible), thinking mode, tool calls, context caching, streaming, rate limits, and code examples in Python and cURL.
sidebar:
  order: 3
tags:
  - deepseek
  - api
  - sdk
  - development
glossaryLinks:
  - api
  - token
  - streaming
tldr:
  - "Dual API format: use either OpenAI SDK (api.deepseek.com) or Anthropic SDK (api.deepseek.com/anthropic) — no code changes needed"
  - "Thinking Mode: configurable reasoning with 'enabled'/'disabled' toggle and reasoning_effort (low/medium/high)"
  - "Context Caching: automatic KV cache with cache hits at 1/10 of input price"
  - "Tool Calls, JSON Output, FIM Completion, Chat Prefix Completion all supported"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

The DeepSeek API is uniquely versatile — it speaks both OpenAI and Anthropic API formats. You can switch to DeepSeek with zero code changes: just change the `base_url` and `api_key`.

## Getting Started

```bash
# Get your API key from https://platform.deepseek.com/api_keys
export DEEPSEEK_API_KEY="your-api-key"
```

## Option 1: OpenAI-Compatible Format

```python
pip install openai

from openai import OpenAI

client = OpenAI(
    api_key="your-deepseek-key",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Hello!"}],
    thinking={"type": "enabled"},
    reasoning_effort="high"
)
```

```bash
# cURL — OpenAI format
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{"role": "user", "content": "Hello!"}],
    "thinking": {"type": "enabled"},
    "reasoning_effort": "high"
  }'
```

## Option 2: Anthropic-Compatible Format

```python
pip install anthropic

from anthropic import Anthropic

client = Anthropic(
    api_key="your-deepseek-key",
    base_url="https://api.deepseek.com/anthropic"
)

message = client.messages.create(
    model="deepseek-v4-pro",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)
```

```bash
# cURL — Anthropic format
curl https://api.deepseek.com/anthropic/v1/messages \
  -H "x-api-key: $DEEPSEEK_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Thinking Mode

```python
# Enable thinking mode (V4 Pro — default on)
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Design a rate limiter"}],
    thinking={"type": "enabled"},
    reasoning_effort="high"
)

# Disable thinking (V4 Flash only)
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "What is 2+2?"}],
    thinking={"type": "disabled"}
)
```

## Tool Calls (Function Calling)

```python
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
    tools=[{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string"}
                },
                "required": ["city"]
            }
        }
    }]
)
```

## Streaming

```python
stream = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Write a haiku about programming"}],
    stream=True
)
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

## JSON Output

```python
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "List 3 programming languages with their creator"}],
    response_format={"type": "json_object"}
)
```

## Context Caching (KV Cache)

DeepSeek's KV cache is automatic — no special parameters needed. Repeated prompt prefixes are cached server-side:

```python
# First call: full price (cache miss)
# Subsequent calls with same prefix: 1/10 input price (cache hit)
for query in queries:
    response = client.chat.completions.create(
        model="deepseek-v4-flash",
        messages=[
            {"role": "system", "content": system_prompt},  # Cached after first call
            {"role": "user", "content": query}
        ]
    )
```

| Operation | V4 Flash | V4 Pro (promo) |
|---|---|---|
| Standard Input | $0.14 / 1M | $0.435 / 1M |
| Cache Hit | $0.0028 / 1M | $0.0036 / 1M |

## Rate Limits

| Model | Concurrency Limit |
|---|---|
| V4 Flash | 2,500 |
| V4 Pro | 500 |

Rate limits are shared across API keys per workspace. For higher limits, contact DeepSeek.

## Where Next

- [Agent Integrations](/deepseek/agents) — use DeepSeek in Claude Code, Copilot, and 15+ agents
- [Comparison & Migration](/deepseek/comparison) — cost analysis and switching from Claude/GPT
- [Workflows & Best Practices](/deepseek/workflows) — thinking mode and cost optimization

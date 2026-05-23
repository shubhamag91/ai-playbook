---
title: DeepSeek Workflows & Best Practices
description: Thinking mode usage strategies, cost optimization (caching, model routing), agent sharing patterns, rate limit management, and production deployment patterns for DeepSeek.
sidebar:
  order: 7
tags:
  - deepseek
  - workflows
  - best-practices
  - cost-optimization
glossaryLinks:
  - prompt
  - token
  - streaming
tldr:
  - "Thinking Mode: use for complex tasks (code, math, reasoning). Disable for simple tasks to save tokens and latency"
  - "Cost optimization: DeepSeek Flash for simple tasks, Pro for complex. KV cache reduces repeat costs 99%"
  - "Agent sharing: one DeepSeek API key powers all 15+ integrated agents — Claude Code, Copilot, etc."
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Thinking Mode — When to Use

```python
# Complex tasks — enable thinking
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Design a distributed rate limiter"}],
    thinking={"type": "enabled"},
    reasoning_effort="high"
)

# Simple tasks — disable thinking (V4 Flash only)
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "What is 2+2?"}],
    thinking={"type": "disabled"}
)
```

| Task Type | Model | Thinking | reasoning_effort |
|---|---|---|---|
| Simple Q&A, classification | V4 Flash | Disabled | — |
| Summarization, translation | V4 Flash | Disabled | — |
| Code generation | V4 Pro | Enabled | medium |
| Debugging, refactoring | V4 Pro | Enabled | high |
| Architecture design | V4 Pro | Enabled | high |
| Complex math, research | V4 Pro | Enabled | high |

## Cost Optimization

### Model Routing

```python
def route(task_type):
    if task_type in ["classification", "simple_qa", "summarization"]:
        return "deepseek-v4-flash"  # $0.14/$0.28 — cheapest
    elif task_type in ["code_gen", "analysis", "writing"]:
        return "deepseek-v4-pro"    # $0.435/$0.87 — quality
    else:
        return "deepseek-v4-pro"    # Default to quality
```

### Maximize Cache Hits

```python
# ✅ Good: Reuse system prompts — cache hits at $0.0028/1M
SYSTEM_PROMPT = "You are a helpful assistant..."  # Cached after first call
for query in user_queries:
    client.chat.completions.create(
        model="deepseek-v4-flash",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": query}
        ]
    )

# ❌ Bad: Unique system prompt per request — full price each time
for query in user_queries:
    client.chat.completions.create(
        model="deepseek-v4-flash",
        messages=[
            {"role": "system", "content": f"Context: {random_context()}"},
            {"role": "user", "content": query}
        ]
    )
```

### Batch Operations

```python
# Route high-volume, non-urgent tasks to V4 Flash
import concurrent.futures

def process_batch(items, model="deepseek-v4-flash"):
    with concurrent.futures.ThreadPoolExecutor(max_workers=threads) as executor:
        futures = [
            executor.submit(client.chat.completions.create,
                model=model,
                messages=[{"role": "user", "content": f"Classify: {item}"}],
                thinking={"type": "disabled"},
                max_tokens=50
            ) for item in items
        ]
        return [f.result() for f in futures]
```

## Agent Sharing Pattern

One DeepSeek API key powers all your coding agents:

```bash
# Set once, use everywhere
export OPENAI_API_KEY=sk-your-deepseek-key
export OPENAI_BASE_URL=https://api.deepseek.com

# Now all OpenAI-compatible tools automatically use DeepSeek
export ANTHROPIC_AUTH_TOKEN=sk-your-deepseek-key
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic

# Claude Code and Anthropic-compatible tools use DeepSeek
```

## Rate Limit Management

| Model | Concurrency | Strategy |
|---|---|---|
| V4 Flash | 2,500 | High-volume, classification, real-time |
| V4 Pro | 500 | Complex tasks, reasoning, code generation |

```python
import asyncio
from collections import deque
from datetime import datetime

class DeepSeekRateLimiter:
    def __init__(self, max_concurrent=2500):
        self.max_concurrent = max_concurrent
        self.current = 0
        self.queue = asyncio.Queue()

    async def acquire(self):
        while self.current >= self.max_concurrent:
            await asyncio.sleep(0.1)
        self.current += 1

    def release(self):
        self.current -= 1
```

## Production Checklist

- [ ] Use V4 Flash for high-volume, V4 Pro for quality-critical tasks
- [ ] Reuse system prompts for cache hits (99% input savings)
- [ ] Disable thinking for simple tasks (saves output tokens)
- [ ] Set `max_tokens` appropriately — unused budget is still reserved
- [ ] Use streaming for better UX on interactive apps
- [ ] Monitor concurrency limits — 2500 (Flash), 500 (Pro)
- [ ] Implement retry logic with exponential backoff for rate limits

## Where Next

For broader prompt engineering techniques, see the [Prompt Engineering Deep Dive](/deep-dive/prompt-engineering/).

For Claude-specific and GPT-specific workflows, see [Claude Workflows](/claude/workflows) and [OpenAI Workflows](/openai/workflows).

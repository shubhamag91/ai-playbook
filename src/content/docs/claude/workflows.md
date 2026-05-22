---
title: Claude Workflows & Best Practices
description: Claude-specific prompt engineering, tool use patterns, cost optimization strategies, error handling, streaming best practices, and production deployment patterns.
sidebar:
  order: 8
tags:
  - claude
  - workflows
  - best-practices
  - prompt-engineering
  - cost-optimization
glossaryLinks:
  - prompt
  - token
  - streaming
  - inference
tldr:
  - "System prompts with cache_control: 90% input cost savings on repeated context"
  - "Model routing: Haiku for classification, Sonnet for most tasks, Opus for complex reasoning"
  - "Tool use patterns: parallel calls when independent, sequential when dependent"
  - "Error handling: implement retries with exponential backoff, handle rate limits gracefully"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Prompt Engineering for Claude

Claude responds best to structured, role-based prompts. Here are Claude-specific patterns:

### System Prompts — Define the Role

```python
system_prompt = """You are a senior software architect reviewing code for:
- Security vulnerabilities (OWASP Top 10)
- Performance bottlenecks (N+1 queries, memory leaks)
- Architectural patterns (SOLID principles)

For each issue found, provide:
1. Severity (Critical/High/Medium/Low)
2. File and line reference
3. Explanation in 1-2 sentences
4. Remediation suggestion with code example"""
```

### Thinking Tags (Claude-Specific)

When Claude needs to reason through complex problems, structure its thinking explicitly:

```python
messages = [{
    "role": "user",
    "content": """<thinking>
Let me break this down:
1. First, I need to understand the user's intent
2. Then check if I have sufficient context
3. Finally, formulate a response that addresses the core need
</thinking>

Analyze the following code for bugs: ..."""
}]
```

### Cache-Aware Prompt Design

Structure prompts to maximize caching:

```python
# ✅ Good: System prompt cached, only user message changes
for query in queries:
    client.messages.create(
        model="claude-sonnet-4-6",
        system=[{"type": "text", "text": system_prompt, "cache_control": {"type": "ephemeral"}}],
        messages=[{"role": "user", "content": query}]
    )
# Input cost: 1 write (1.25x) + N reads (0.1x each)

# ❌ Bad: Entire prompt changes each time
# Input cost: N full writes (N × base input price)
```

### Few-Shot Examples

```python
messages = [{
    "role": "user",
    "content": """Extract the meeting action items. Format as JSON.

Example 1:
Input: "We agreed to update the docs by Friday and Sarah will deploy the fix"
Output: {"action_items": [
  {"task": "update docs", "assignee": "team", "deadline": "Friday"},
  {"task": "deploy fix", "assignee": "Sarah", "deadline": "implicit"}
]}

Example 2:
Input: "John needs to review PR #142 by EOD and Priya will set up the staging env"
Output: {"action_items": [
  {"task": "review PR #142", "assignee": "John", "deadline": "EOD"},
  {"task": "set up staging env", "assignee": "Priya", "deadline": "implicit"}
]}

Now process: {actual_meeting_notes}"""
}]
```

## Tool Use Patterns

### Parallel vs Sequential

```python
# ✅ Parallel: Independent tool calls
# Claude can call get_weather for multiple cities simultaneously
messages = [{
    "role": "user",
    "content": "What's the weather in SF, NYC, and London?"
}]
# Claude returns multiple tool_use blocks — execute them in parallel

# ✅ Sequential: Dependent tool calls
# First get user location, then get weather for that location
messages = [{
    "role": "user",
    "content": "What's the weather at my current location?"
}]
# Claude calls get_current_location → you respond → Claude calls get_weather
```

### Tool Design Principles

| Principle | Example |
|---|---|
| **Clear descriptions** | "Get current weather for a US city" — not "weather function" |
| **Typed schemas** | Use JSON Schema with types, descriptions, enums |
| **Error handling** | Return structured errors: `{"error": "City not found", "suggestions": ["San Francisco, CA"]}` |
| **Idempotent where possible** | `create_issue` vs `get_or_create_issue` |

## Cost Optimization Strategies

### 1. Model Routing

```python
def route_query(query, complexity="auto"):
    if complexity == "auto":
        # Use Haiku to classify complexity (cheap)
        classification = haiku.messages.create(
            model="claude-haiku-4-5",
            messages=[{"role": "user", "content": f"Classify complexity (simple/medium/complex): {query}"}]
        )
        complexity = classification.content[0].text.strip().lower()

    if complexity == "simple":
        return haiku.messages.create(model="claude-haiku-4-5", ...)
    elif complexity == "medium":
        return sonnet.messages.create(model="claude-sonnet-4-6", ...)
    else:
        return opus.messages.create(model="claude-opus-4-7", ...)
```

### 2. Prompt Caching

Cache long system prompts and repeated document context:

| Scenario | Without Cache | With Cache | Savings |
|---|---|---|---|
| 1,000 queries with same 5K token system prompt | ~$15 (Sonnet) | ~$2.25 | **85%** |
| 10,000 document analyses (same doc, different Qs) | ~$150 | ~$22.50 | **85%** |

### 3. Batch Processing for Volume

```python
# For 10,000 nightly classifications — don't use sync API
# Use Batch API for 50% discount
batch = client.messages.beta.batches.create(
    model="claude-haiku-4-5",
    messages=[{"role": "user", "content": f"Classify: {text}"}],
    # Results in ~15 min, billed at 50% discount
)
```

### 4. Token Budget Management

```python
# Set reasonable max_tokens — unused token budget is still reserved
max_tokens = {
    "classification": 100,
    "short_answer": 500,
    "analysis": 2000,
    "long_form": 8000,
    "code_generation": 16000,
}
```

## Error Handling

```python
import time
from anthropic import Anthropic, RateLimitError, APIError

def call_with_retry(client, **kwargs):
    max_retries = 3
    base_delay = 1  # seconds

    for attempt in range(max_retries):
        try:
            return client.messages.create(**kwargs)
        except RateLimitError:
            if attempt < max_retries - 1:
                delay = base_delay * (2 ** attempt)  # Exponential backoff
                time.sleep(delay)
            else:
                raise
        except APIError as e:
            if e.status_code >= 500:  # Server error, retry
                if attempt < max_retries - 1:
                    time.sleep(base_delay * (2 ** attempt))
                else:
                    raise
            else:  # Client error (4xx), don't retry
                raise
```

## Streaming Best Practices

```python
# ✅ Good: Process events incrementally for better UX
with client.messages.stream(model="claude-sonnet-4-6", ...) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            yield event.delta.text
        elif event.type == "message_stop":
            break

# ✅ Good: Track usage for cost monitoring
with client.messages.stream(model="claude-sonnet-4-6", ...) as stream:
    for text in stream.text_stream:
        print(text, end="")
    final_message = stream.get_final_message()
    print(f"\n\nTokens: {final_message.usage.input_tokens} in, "
          f"{final_message.usage.output_tokens} out")
```

## Rate Limit Management

```python
import asyncio
from collections import deque
from datetime import datetime

class RateLimiter:
    def __init__(self, max_rpm):
        self.max_rpm = max_rpm
        self.requests = deque()

    async def acquire(self):
        now = datetime.now()
        # Remove requests older than 1 minute
        while self.requests and (now - self.requests[0]).seconds > 60:
            self.requests.popleft()

        if len(self.requests) >= self.max_rpm:
            wait_time = 60 - (now - self.requests[0]).seconds
            await asyncio.sleep(max(wait_time, 0))

        self.requests.append(now)
```

## For General Prompt Engineering

For broader prompt engineering techniques beyond Claude, see the [Prompt Engineering Deep Dive](/deep-dive/prompt-engineering/).

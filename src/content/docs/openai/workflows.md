---
title: OpenAI Workflows & Best Practices
description: GPT-specific prompt engineering, reasoning level selection, cost optimization strategies (caching, batch, flex, model routing), tool use patterns, streaming best practices, and production deployment patterns.
sidebar:
  order: 8
tags:
  - openai
  - gpt
  - workflows
  - best-practices
  - cost-optimization
glossaryLinks:
  - prompt
  - token
  - streaming
  - inference
tldr:
  - "Reasoning levels (none/low/medium/high/xhigh) control depth vs cost — start with medium, go higher for complex tasks"
  - "Prompt caching: 90% input savings. Batch: 50% off. Flex: cheaper for non-production. Combine for up to 95% savings"
  - "Model routing: nano for classification, mini for most tasks, 5.4 for quality, 5.5 for complex reasoning"
  - "Tool use: web search ($10/1K), computer use, file search, code interpreter — each optimized for specific patterns"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Prompt Engineering for GPT Models

### System Messages — Define the Role

```python
system = """You are a senior software architect specializing in distributed systems.
For each design review, provide:
1. Architecture assessment (Strengths / Risks)
2. Scalability analysis (bottlenecks at 10x and 100x load)
3. Concrete recommendations with tradeoffs"""
```

### Reasoning Level Selection

```python
# Simple Q&A — no reasoning overhead
client.responses.create(model="gpt-5.5", input="What is 2+2?", reasoning={"effort": "none"})

# Code review — balanced
client.responses.create(model="gpt-5.5", input=pr_diff, reasoning={"effort": "medium"})

# Architecture design — deep thinking
client.responses.create(model="gpt-5.5", input=arch_problem, reasoning={"effort": "high"})

# Hard math, multi-step — maximum depth
client.responses.create(model="gpt-5.5", input=math_problem, reasoning={"effort": "xhigh"})
```

**Rule of thumb:** Start with `medium`. Increase only if the output quality doesn't meet requirements. Each reasoning level adds tokens (cost) and latency.

### Structured Output

```python
response = client.responses.create(
    model="gpt-5.4",
    input="Extract all people mentioned in this document",
    text={"format": {
        "type": "json_schema",
        "name": "people_extraction",
        "schema": {
            "type": "object",
            "properties": {
                "people": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "role": {"type": "string"},
                            "mentioned_at": {"type": "string"}
                        }
                    }
                }
            }
        }
    }}
)
```

## Cost Optimization

### 1. Model Routing

```python
def route_to_model(query, estimated_complexity):
    if estimated_complexity == "simple":
        return "gpt-4.1-nano"       # $0.15/$0.60 — cheapest
    elif estimated_complexity == "medium":
        return "gpt-5.4-mini"       # $0.75/$4.50 — balanced cost
    elif estimated_complexity == "complex":
        return "gpt-5.4"            # $2.50/$15 — quality work
    else:
        return "gpt-5.5"            # $5/$30 — flagship reasoning
```

### 2. Processing Mode Selection

| Mode | When to Use | Cost Impact |
|---|---|---|
| **Standard** | Interactive, real-time apps | Baseline |
| **Prompt Caching** | Repeated system prompts, same-context Q&A | 90% off input |
| **Batch API** | Nightly processing, bulk classification | 50% off everything |
| **Flex Processing** | Non-production, lower-priority workloads | Variable discount |
| **Priority** | Latency-critical production | Premium |

### 3. Prompt Caching Strategy

```python
# ✅ Good: System prompt cached, user message changes
for query in user_queries:
    client.responses.create(
        model="gpt-5.4",
        input=f"{system_prompt}\n\nUser query: {query}"
    )
# Cached input: $0.25/1M instead of $2.50/1M = 90% savings

# For GPT-5.5:
# Cached input: $0.50/1M instead of $5/1M = 90% savings
```

### 4. Token Budget Management

```python
# Set max_output_tokens based on task type
max_tokens = {
    "classification": 50,
    "short_answer": 200,
    "analysis": 1000,
    "code_generation": 4000,
    "long_form": 16000
}

response = client.responses.create(
    model="gpt-5.4",
    max_output_tokens=max_tokens["analysis"],
    ...
)
```

## Tool Use Patterns

### Web Search

```python
response = client.responses.create(
    model="gpt-5.4",
    tools=[{"type": "web_search_preview"}],
    input="Latest research on transformer architecture improvements in 2026"
)
# $10 per 1,000 searches. Search content tokens are free.
```

### File Search + Generation

```python
response = client.responses.create(
    model="gpt-5.4",
    tools=[
        {"type": "file_search", "vector_store_ids": ["vs_knowledge_base"]},
        {"type": "web_search_preview"}
    ],
    input="Compare our internal Q1 metrics with industry benchmarks"
)
```

### Computer Use

```python
response = client.responses.create(
    model="gpt-5.4-mini",  # Computer use optimized
    tools=[{"type": "computer_use_preview"}],
    input="Navigate to the admin dashboard, export last month's usage report"
)
```

## Error Handling & Resilience

```python
import time
from openai import OpenAI, RateLimitError, APIError

client = OpenAI()

def call_with_retry(**kwargs):
    max_retries = 3
    for attempt in range(max_retries):
        try:
            return client.responses.create(**kwargs)
        except RateLimitError:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise
        except APIError as e:
            if e.status_code >= 500:
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)
                else:
                    raise
            else:  # 4xx — don't retry
                raise
```

## Streaming Best Practices

```python
stream = client.responses.create(
    model="gpt-5.4",
    input="Write a comprehensive guide to...",
    stream=True
)

for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
    elif event.type == "response.completed":
        usage = event.response.usage
        print(f"\n---\nInput: {usage.input_tokens} · Output: {usage.output_tokens}")
```

## Where Next

For broader prompt engineering techniques, see the [Prompt Engineering Deep Dive](/deep-dive/prompt-engineering/).

For Claude-specific workflows, see [Claude Workflows](/claude/workflows).

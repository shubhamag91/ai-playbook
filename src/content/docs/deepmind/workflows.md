---
title: "DeepMind Workflows & Best Practices"
description: "Gemini-specific prompt engineering, multimodal prompting strategies, cost optimization (tier selection: Flash vs Pro vs Ultra), streaming patterns, tool use, and production deployment patterns."
sidebar:
  order: 8
tags:
  - deepmind
  - gemini
  - workflows
  - best-practices
  - prompt-engineering
glossaryLinks:
  - prompt
  - token
  - streaming
tldr:
  - "Tier selection: Flash for cost/speed, Pro for most workloads, Ultra for maximum quality"
  - "Multimodal prompting: Gemini excels at cross-modal tasks — mix text, image, audio, and video in a single prompt"
  - "Streaming: available across all tiers. Use for interactive apps and better UX"
  - "Google-native: deep integration with Cloud Storage, BigQuery, and Workspace for data pipelines"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Prompt Engineering for Gemini

### System Instructions

```python
model = genai.GenerativeModel(
    "gemini-3.5-pro",
    system_instruction="""You are a senior data scientist at Google.
Respond with:
1. Clear explanation in 2-3 sentences
2. Python code example when relevant
3. Common pitfalls to avoid"""
)

response = model.generate_content("How do I handle class imbalance in ML?")
```

### Multimodal Prompting

Gemini's key strength is native multimodal processing:

```python
# Text + image + audio in one prompt
response = model.generate_content([
    "Analyze this product image, describe its features, and suggest an audio jingle:",
    product_image,
    "Here's a competitor's ad audio for reference:",
    competitor_audio
])
```

### Prompt Structure for Best Results

| Technique | Example |
|---|---|
| **Role assignment** | "You are a senior architect reviewing this design" |
| **Output format** | "Respond as a JSON object with keys: summary, risks, recommendations" |
| **Step-by-step** | "First analyze the problem, then propose 3 solutions, then compare them" |
| **Multimodal context** | Include relevant images, charts, or audio alongside text |

## Cost Optimization — Tier Selection

| Tier | When to Use | Cost Factor |
|---|---|---|
| **Gemini 3.5 Flash** | Simple Q&A, classification, routing, high-throughput | Lowest |
| **Gemini 3.5 Pro** | Most production workloads, coding, analysis | Standard |
| **Gemini 3.5 Ultra** | Complex reasoning, R&D, maximum quality | Premium |

```python
# Route based on task complexity
def get_model(task_type):
    if task_type == "classification":
        return "gemini-3.5-flash"    # Fast + cheap
    elif task_type == "analysis":
        return "gemini-3.5-pro"      # Balanced
    elif task_type == "research":
        return "gemini-3.5-ultra"    # Maximum quality
```

### AI Studio Free Tier

- **No credit card required**
- **Generous free quota** for experimentation
- **1M token context** included
- **All Gemini models** accessible
- Use for prototyping and evaluation before scaling via API

## Streaming Best Practices

```python
# Stream for better UX
response = model.generate_content(
    "Explain the transformer architecture in detail",
    stream=True
)
for chunk in response:
    if chunk.text:
        print(chunk.text, end="", flush=True)

# Track usage
print(f"\n\nInput tokens: {response.usage_metadata.prompt_token_count}")
print(f"Output tokens: {response.usage_metadata.candidates_token_count}")
```

## Tool Use Patterns

### Function Calling

```python
model = genai.GenerativeModel(
    "gemini-3.5-pro",
    tools=[{
        "function_declarations": [{
            "name": "search_knowledge_base",
            "description": "Search internal documentation",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"},
                    "max_results": {"type": "integer", "default": 5}
                }
            }
        }]
    }]
)
```

### Code Execution

```python
model = genai.GenerativeModel(
    "gemini-3.5-pro",
    tools="code_execution"
)
response = model.generate_content(
    "Write and run Python code to calculate the first 20 Fibonacci numbers"
)
```

## Google Ecosystem Integration

### Cloud Storage

```python
# Process files directly from GCS
model = genai.GenerativeModel("gemini-3.5-pro")
gcs_file = genai.upload_file("gs://my-bucket/document.pdf")
response = model.generate_content(["Summarize this document:", gcs_file])
```

### BigQuery

```python
# Gemini for BigQuery — natural language SQL
# Available directly in BigQuery console
# "Show me monthly revenue by product for Q1 2026, with growth rates"
```

### Workspace Integration

Gemini in Google Workspace provides AI assistance across Docs, Sheets, Gmail, and Slides. Enterprise-only, managed via Google Workspace admin console.

## Production Deployment

```python
# Vertex AI for production
from vertexai.generative_models import GenerativeModel

model = GenerativeModel("gemini-3.5-pro")
# Deploy with:
# - Auto-scaling based on QPS
# - Monitoring via Cloud Monitoring
# - Logging via Cloud Logging
# - IAM for access control
# - VPC for network security
```

## Where Next

For broader prompt engineering techniques, see the [Prompt Engineering Deep Dive](/deep-dive/prompt-engineering/).

For Claude-specific and GPT-specific workflows, see [Claude Workflows](/claude/workflows) and [OpenAI Workflows](/openai/workflows).

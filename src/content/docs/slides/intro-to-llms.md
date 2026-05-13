---
title: Intro to LLMs (Slide Deck)
description: A ~15-minute lunch-and-learn intro to large language models.
sidebar:
  label: Slide Decks
  order: 1
tags:
  - slides
lastUpdated: 2026-05-11
nextVerificationDue: 2027-05-11
---

This content is designed for a ~15-minute presentation. Each section has talking points and a suggested slide.

---

## What is an LLM?

A Large Language Model is a neural network trained to predict the next token (word fragment) in a sequence. It learns patterns from trillions of tokens of text.

**Key points:**
- LLMs are next-token predictors — they don't "think" or "understand"
- Training requires massive compute (10,000+ GPUs for months)
- Size ranges from 1B to 400B+ parameters
- They learn syntax, facts, reasoning patterns, and even some world models

**Analogy:** An LLM is less like a brain and more like a hyper-efficient compression engine for human knowledge. It doesn't know things — it predicts what token *looks right* given the context.

---

## How Do LLMs Work?

1. **Tokenization** — Text is split into tokens (words/subwords). "Hello world" might become [15496, 2159].
2. **Embedding** — Each token becomes a vector (list of numbers) in a high-dimensional space.
3. **Transformer blocks** — Layers of self-attention + feed-forward networks process the sequence.
4. **Output** — A probability distribution over the vocabulary for the next token.

**The magic:** Attention mechanisms let the model weigh which tokens are relevant. When predicting "The cat sat on the ___", it learns to attend to "cat" to predict "mat".

---

## Tokens and Context Windows

| Concept | Meaning | Example |
|---|---|---|
| Token | Basic unit of text | ~0.75 words per token (English) |
| Context window | Maximum tokens model can process | 128K (GPT-5.5) to 1M (Gemini 3.1 Pro) |
| Input tokens | Text you send to the model | "Write a poem" = 3 tokens |
| Output tokens | Text the model generates | "Roses are red..." = N tokens |

**Gotchas:**
- Context ≠ usable context — models perform worse as context fills up
- Longer context is more expensive (quadratic attention cost)
- For most tasks, 8K-32K is enough. 1M is for document analysis.

---

## Prompt Engineering Basics

| Technique | What it does | Example |
|---|---|---|
| System prompt | Sets the model's persona | "You are a helpful assistant" |
| Few-shot | Show examples | "Translation: hello -> bonjour, goodbye -> au revoir, thank you -> ___" |
| Chain-of-thought | Ask for reasoning steps | "Let's think step by step" |
| Structured output | Request specific format | "Return JSON: {answer: string, confidence: number}" |

**Golden rule:** Be specific. Tell the model what to do, what format to use, and what to avoid.

---

## Common Use Cases

| Category | Examples | Best Model |
|---|---|---|
| Chat/QA | Customer support, tutoring | Claude Sonnet, GPT-5.5 |
| Coding | Code gen, debugging, refactoring | Claude Opus, o3, Cursor |
| Writing | Prose, editing, brainstorming | Claude Opus, GPT-5.5 |
| Research | Long doc analysis, lit reviews | Gemini 3.1 Pro (1M ctx) |
| Classification | Routing, moderation, tagging | GPT-5.5 Instant, DeepSeek V4 Flash |
| Creative | Design, image/video gen | Design Arena models |
| Reasoning | Math, logic, science problems | o3, DeepSeek R1 |

---

## Building Your First LLM App

```
User question → API call → Model response → Display
```

```python
from openai import OpenAI

client = OpenAI()  # or Anthropic, Google, etc.
response = client.chat.completions.create(
    model="gpt-5.5",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)
```

**Key decisions:**
- Which model? (cost vs quality vs speed vs context)
- What framework? (raw API vs LangChain vs custom)
- How to handle errors? (retries, fallbacks, timeouts)

---

## Cost Reality

At May 2026 prices:
- **GPT-5.5 Instant:** $0.05/$0.15 per 1M tokens — basically free
- **DeepSeek V4 Flash:** $0.14/$0.28 per 1M — cheapest frontier quality
- **Claude Opus:** $15/$75 per 1M — use only for complex tasks

**Rule of thumb:** For most apps, model cost is negligible compared to engineering time. Don't over-optimize for cost in early stages.

---

## Recommended Resources

- [Beginner Path](/learn/beginner/) — 4-hour intro
- [Glossary](/reference/glossary/) — 60+ AI terms explained
- [Models Guide](/decide/models/guide) — Current models compared
- [Quick Start](/start/quick-start/) — First experiment in 30 minutes

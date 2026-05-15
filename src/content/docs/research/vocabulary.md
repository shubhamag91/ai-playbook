---
title: AI Terminology & Definitions
description: Clarify the difference between AI terms  -  what's what and why it matters
sidebar:
  order: 5
tags:
  - research
  - glossary
glossaryLinks:
  - llm
  - token
  - transformer
  - inference
  - temperature
tldr:
  - "Distinguishes between commonly confused terms: AI vs AGI, LLM vs foundation model"
  - "Explains fine-tuning vs RAG vs prompt engineering tradeoffs"
  - "Covers open-source vs open-weight vs open-access licensing"
lastUpdated: 2026-05-08
nextVerificationDue: 2027-05-08
---

Confused by AI jargon? This page clarifies what terms actually mean and why the distinctions matter.

---

## The Big Picture

### AI vs AGI vs ASI

**AI (Artificial Intelligence)**
- Anything that performs a task that normally requires human intelligence
- Includes: ChatGPT, recommendation systems, self-driving cars, medical diagnosis tools
- Scope: Narrow (good at one thing) or broad (good at many things)
- **Current state:** We have AI. All LLMs are AI.

**AGI (Artificial General Intelligence)**
- AI that matches human-level intelligence across all domains
- Can learn any task a human can learn
- Can transfer knowledge across domains
- **Current state:** Doesn't exist yet. GPT-5.5, Claude Opus are still narrow AI (very capable, but only at language)

**ASI (Artificial Super Intelligence)**
- AI that exceeds human intelligence across all domains
- Hypothetical. Nobody knows if it's possible or when it would arrive
- The "scary AI" from sci-fi movies
- **Current state:** Pure speculation. Not on the near horizon.

**Why it matters:** When someone says "AI is coming," they usually mean AGI. When someone says "AGI is dangerous," they might mean ASI. Different timelines, different risks.

---

### GenAI vs Traditional ML

**GenAI (Generative AI)**
- AI that *creates* new content (text, images, code, music)
- Examples: ChatGPT, Claude, DALL-E, Suno, Runway
- "Generative" = can generate new things you didn't feed it
- Paradigm: Large language models (LLMs), diffusion models

**Traditional ML (Machine Learning)**
- AI that *predicts* based on patterns in data
- Examples: Netflix recommendations, fraud detection, medical diagnosis, credit scoring
- "Learning" = improves by seeing data patterns
- Paradigm: Neural networks, random forests, gradient boosting
- **Key difference:** Not designed to generate new content. It classifies, ranks, predicts existing categories.

**Real-world comparison:**
- Netflix recommends a movie (traditional ML)
- ChatGPT writes a movie review (GenAI)

**Why it matters:** GenAI is newer (2022+) and more visible (ChatGPT). Traditional ML is older but still powers most AI systems you interact with. They solve different problems.

---

### Fine-tuning vs RAG vs Prompt Engineering

These three are often confused because they all "adapt" a model to your use case. Here's the real distinction:

**Prompt Engineering**
- Craft the prompt to get better outputs
- Cost: Free (just your time)
- Time: Minutes to hours
- Example: "Write a professional email declining a job offer" vs "Write an email saying no to a job offer"
- When to use: Most tasks. Start here.

**RAG (Retrieval-Augmented Generation)**
- Give the model access to your documents, then ask questions
- How it works: Search your docs → add relevant excerpts to prompt → let model answer with context
- Cost: ~$0.01-0.10 per query (storage + API calls)
- Time: Hours to set up, then automatic
- Example: Upload your company handbook, ask "What's our return policy?"
- When to use: Your model needs to know *facts* about your company/data

**Fine-tuning**
- Retrain the model on your specific data
- How it works: Show model 1000+ examples → adjust weights → deploy custom model
- Cost: $50-1000+ per model (one-time training)
- Time: Days to weeks of preparation + training
- Example: Train model on your customer support tickets to match your tone
- When to use: You need to change model *behavior/style*, not just knowledge

**Decision tree:**
```
Does your model need facts from your data?
├─ Yes → Use RAG
└─ No → Go to next question

Do you want to change how the model *behaves* (tone, style, format)?
├─ Yes → Use fine-tuning
└─ No → Use prompt engineering
```

**Why it matters:** Many teams waste money fine-tuning when RAG would work. Or they prompt-engineer when the model just needs facts (RAG). Understanding the difference saves thousands.

---

### LLM vs Foundation Model vs Large Language Model

**LLM (Large Language Model)**
- Neural network trained on billions of text tokens
- "Large" = billions to trillions of parameters (dials)
- "Language" = predicts next token (word/subword)
- Examples: GPT-5.5, Claude Opus, Gemini, Llama
- **Scope:** Text in, text out

**Foundation Model**
- Large model trained on massive diverse data
- Used as the *base* for other applications
- Examples: GPT-3, Claude, Llama (the base versions before fine-tuning)
- Not trained for any specific task; trained to understand language patterns broadly
- **Key word:** "Foundation"  -  everything else builds on it

**The relationship:**
- All LLMs are foundation models (trained broadly)
- Not all foundation models are language-based (some are vision models like CLIP)

**Why it matters:** When someone says "foundation model," they mean something general-purpose and powerful. When they say "LLM," they're specifically talking about language. Matters for research/technical discussions.

---

## Common Confusions (And Why They Matter)

### "Training" vs "Learning"

**Training (What happens to create a model)**
- One-time expensive process
- Developers adjust billions of parameters using GPUs
- Takes weeks and costs millions
- Result: A trained model (GPT-5.5, Claude Opus, etc.)
- After training, the model is fixed

**Learning (What the model does with examples)**
- Happens *during a conversation* without retraining
- Model uses examples in your prompt to adjust its outputs
- Example: "Here are 2 examples of good customer service. Now respond to this complaint:"
- No retraining needed, happens instantly
- Examples: In-context learning, few-shot prompting

**Why it matters:** Many people think fine-tuning "teaches" models facts. It doesn't. Fine-tuning changes *how* the model thinks, not *what* it knows. For facts, use RAG.

---

### "Parameters" vs "Tokens" vs "Context Window"

**Parameter**
- A "weight" or "dial" inside the neural network
- GPT-5.5: 1.76 trillion parameters
- More parameters ≈ more capability (but not linear)
- Fixed when model is trained; doesn't change

**Token**
- A unit of text (roughly 4 characters, or 1 word)
- "Hello world" = 2 tokens
- You pay per token when using APIs
- Different models use different tokenizers (same text = different token counts)

**Context Window**
- How many tokens the model can read at once
- Claude Opus: 400K tokens (can read ~300 pages)
- Gemini 3.1: 1M tokens (can read entire codebases)
- Limits: Can't process more tokens than context window
- Affects: How much document you can analyze, conversation length

**Why it matters:**
- Parameters: How "smart" the model is
- Tokens: What you pay for and how you count input/output
- Context: How much information you can give it at once

---

### "Hallucination" vs "Lie" vs "Mistake"

**Hallucination**
- Model confidently generates false information
- It's not trying to deceive; it's predicting what sounds plausible
- Example: "Claude was founded in 1995" (false; founded 2021)
- Model isn't lying (doesn't understand truth/falsehood); it's pattern-matching

**Lie**
- Deliberately providing false information knowing it's false
- Requires intent and understanding of truth
- Models can't do this (they don't understand concepts, only patterns)

**Mistake**
- Getting something wrong unintentionally
- Could be a calculation error, outdated knowledge, etc.
- Models make many mistakes (math, rare facts, recent events)

**Why it matters:** "Hallucination" implies a limitation (model doesn't know). "Lie" implies malice (intentional deception). Models have the first problem, not the second. This shapes how you use them.

---

### "Reasoning" vs "Retrieval" vs "Creativity"

**Reasoning (o3, reasoning models)**
- Spending computational power to "think" before answering
- Hidden working: Model thinks step-by-step before responding
- Better for: Hard math, logic puzzles, complex problem-solving
- Cost: Higher (thinking takes compute)
- Speed: Slower (more compute = more time)

**Retrieval (RAG, Perplexity)**
- Looking up facts from external sources
- Better for: Current events, company knowledge, specific facts
- Cost: Lower (just searching)
- Speed: Fast (if retrieval is fast)

**Creativity (high temperature, diverse sampling)**
- Controlling randomness in generation
- More randomness = more creative/unpredictable
- Less randomness = more consistent/reliable
- **Note:** Not true creativity (no consciousness); just controlled randomness

**Why it matters:** Different problems need different tools. Math problems need reasoning. Current events need retrieval. Creative writing needs temperature tuning.

---

### "Open-source" vs "Open-weight" vs "Open-access"

**Open-source**
- Code is publicly available and modifiable
- Example: PyTorch, Hugging Face Transformers library
- You can read, modify, and redistribute
- Most AI *tools* are open-source

**Open-weight (Open-source Model)**
- Model weights are publicly available
- You can download and run locally
- Example: Llama, Mistral, DeepSeek
- You can fine-tune and modify
- Still licensed (MIT, Apache, etc.) so check terms

**Open-access**
- Model is free to use but weights not shared
- Example: ChatGPT free tier, Claude free tier
- You can use it, but not modify or run locally
- Just "access" to the model via API

**Why it matters:**
- Open-source: Maximum control, but requires technical knowledge
- Open-weight: Control + costs (storage, compute), you run it
- Open-access: Easiest to use, no setup, but you're dependent on provider

---

### "Fine-tuning" vs "Continued Pre-training"

**Fine-tuning**
- Train on task-specific data (usually smaller, 1000-10000 examples)
- Purpose: Change model behavior, tone, style
- Cost: Lower (smaller dataset)
- Time: Hours to days
- Example: Train on customer support tickets to match your tone

**Continued Pre-training**
- Train on massive domain-specific data (billions of tokens)
- Purpose: Add knowledge/capability in a domain
- Cost: Very high (huge dataset, long training)
- Time: Weeks to months
- Example: Train a general model on medical research to specialize in medicine

**Why it matters:** Fine-tuning is cheap and accessible. Continued pre-training is expensive and rare. When someone says "we fine-tuned a model," they mean cheap task adaptation, not expensive domain specialization.

---

### "Zero-shot" vs "Few-shot" vs "Fine-tuned"

**Zero-shot**
- Solve a problem without seeing any examples
- Model uses pretraining knowledge
- "Classify this review: Great product!" (no examples given)
- Works for general knowledge, fails for niche tasks

**Few-shot**
- Solve a problem after seeing 2-5 examples
- Examples are in the prompt (free, instant)
- "Here's a good review. Here's a bad review. Now classify this: [new review]"
- Much better accuracy than zero-shot

**Fine-tuned**
- Solve a problem after training on 1000+ examples
- Examples are used to retrain the model (costs money)
- Highest accuracy, but requires prep work

**Why it matters:** Few-shot (examples in prompt) is free and fast. Fine-tuning is expensive. Always try few-shot first.

---

## Key Takeaways

1. **AI ≠ AGI**  -  We have AI. AGI is future. ASI is speculation.
2. **GenAI ≠ Traditional ML**  -  Different purposes (generate vs predict)
3. **Fine-tuning ≠ RAG ≠ Prompt Engineering**  -  Different costs, different use cases
4. **Training (expensive, one-time) ≠ Learning (free, instant)**  -  Crucial distinction
5. **Hallucination ≠ Lie**  -  Model doesn't "know" truth; it pattern-matches

---

See Also:
- [Glossary](/reference/glossary)  -  60+ AI terms explained
- [Common Confusions](/reference/confusions)  -  25+ misconceptions debunked
- [How LLMs Work](/deep-dive/how-llms-work)  -  Technical deep-dive

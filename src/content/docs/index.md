---
title: Home
description: A personal reference for navigating the modern AI ecosystem — tools, workflows, models, and principles.
lastUpdated: 2026-05-08
---

# Shubham's AI Playbook

A personal reference for navigating the modern AI ecosystem — tools, workflows, models, and principles.

---

## Explore the Playbook

- **Tools** — Conversational AI, coding assistants, automation platforms and more.
- **Productivity** — Microsoft Copilot, Notion AI, Grammarly, Otter.ai and more.
- **Hardware** — Chips, cloud ML, and today's most capable frontier models.
- **Creative & Hubs** — Image, video, voice generation tools and model marketplaces.
- **Workflows** — Five AI workflows plus industry verticals — healthcare, finance, legal, and more.
- **Glossary** — 30+ key terms explained in plain English.
- **Principles** — Six guiding rules plus AI safety, ethics, and practical guardrails.
- **Confusions** — 20+ misconceptions that trip up early adopters — debunked.
- **History** — Key milestones from 1950s to the present.
- **Open Source** — Open-weight models you can run, fine-tune, or build on.
- **Follow** — People, newsletters, YouTube channels and podcasts worth your time.

---

## How the Major AI Companies Are Structured

Each major lab has a full vertical stack — a research org, a model family, products built on those models, and distinct tiers you choose between. Understanding this helps you know exactly what you're paying for and why the same company can have five different products.

### Anthropic

Founded 2021 · Safety-focused · San Francisco

**Model Family:** Claude

**Products:**
- claude.ai — Chat interface (web & mobile)
- Anthropic API — Direct model access for developers
- Claude Code — Agentic CLI for coding tasks in terminal
- Claude for Teams / Enterprise — Business plans with data privacy
- Powering other apps — Cursor, Windsurf use Claude under the hood

**Model Tiers (cheapest → most capable):**
- Claude Haiku 4.5 — Fast & cheap ($0.80/$4 per 1M tokens)
- Claude Sonnet 4.6 — Balanced (default) ($3/$15 per 1M tokens)
- Claude Opus 4.7 — Most capable ($15/$75 per 1M tokens)

All tiers share the same 200K token context window (Opus supports up to 400K).

---

### OpenAI

Founded 2015 · Microsoft-backed · San Francisco

**Model Families:**
- GPT series — General purpose
- o-series — Reasoning models

**Products:**
- ChatGPT — Chat interface (web, mobile, desktop)
- OpenAI API — Direct model access for developers
- Codex — Code-specialised model powering GitHub Copilot
- DALL-E — Image generation (inside ChatGPT Plus)
- Sora — Video generation (ChatGPT Pro)
- ChatGPT Enterprise — Business plan, data privacy

**Model Tiers (cheapest → most capable):**
- GPT-5.5 Instant — Fast & cost-effective ($0.05/$0.15 per 1M tokens)
- GPT-5.5 — Balanced (default) ($2/$8 per 1M tokens)
- o3 — Deep reasoning (reasoning model, slower) ($8/$32 per 1M tokens)

Note: o-series "thinks" before answering — slower but significantly smarter on complex problems.

---

### Google DeepMind

Founded 1998 (Google) · Alphabet subsidiary · Mountain View

**Model Family:** Gemini + Imagen

**Products:**
- Gemini.google.com — Chat interface (web & mobile)
- Google AI Studio — Free API access for developers
- Vertex AI — Enterprise API with Google Cloud integration
- Gemini in Workspace — AI inside Docs, Gmail, Sheets, Slides
- Imagen / ImageFX — Photorealistic image generation
- Gemini on Android — On-device assistant replacing Google Assistant

**Model Tiers (cheapest → most capable):**
- Gemini 2 Flash — Fast & free
- Gemini 3.1 Pro — Balanced (1M context) ($2/$12 per 1M tokens)
- Gemini 3.1 Ultra — Most capable (advanced reasoning)

Gemini 3.1 Pro has a 1M-token context window — tied with largest in the market.

---

### DeepSeek (High-Flyer)

Founded 2023 · Hangzhou, China · Open weights

**Model Family:** DeepSeek R1 & V3

**Products:**
- chat.deepseek.com — Chat interface
- DeepSeek API — Very affordable pricing
- Open weights — Run via Ollama or Hugging Face

**Model Tiers (cheapest → most capable):**
- V4 Flash — General purpose ($0.14/$0.28 per 1M tokens)
- V4 — Balanced (default) ($0.55/$2.19 per 1M tokens)
- R1 — Reasoning (matches o3) ($0.55/$2.19 per 1M tokens)

MIT license — free for commercial use. **Most cost-effective option by far.** Trained at a fraction of Western model costs.

---

## How Other Tools Fit Into This Picture

Not every AI tool builds its own model. Most sit on top of the big three, or rely on the open-source community. Here's where everything else fits:

### Open Weights — No product, just models

Meta (Llama), Mistral, Google (Gemma), Microsoft (Phi-4), Yi (01.AI)

These companies release model weights publicly but don't operate a major consumer product. They build the engine and let the community use it.

**How you access them:**
- Ollama (run locally)
- Hugging Face
- Replicate
- Together AI
- LM Studio

---

### Sits on top of the big three

Perplexity, Microsoft Copilot, GitHub Copilot, Cursor, Windsurf

These products don't build their own foundation models. They call the OpenAI, Anthropic or Google APIs and wrap them in a specialised experience.

- **Perplexity** → uses Claude, GPT-4o + its own search stack
- **Microsoft Copilot** → powered by OpenAI GPT-4o
- **GitHub Copilot** → powered by OpenAI Codex / GPT-4o
- **Cursor** → uses Claude Sonnet or GPT-4o (you choose)
- **Windsurf** → uses Claude or its own Codeium models

---

### Infrastructure & Routing

LangChain, LlamaIndex, OpenRouter, CrewAI

These tools don't provide AI themselves — they help you build systems that connect to and orchestrate multiple models and data sources.

- **OpenRouter** → single API to route between 200+ models
- **LangChain** → framework to chain LLM calls and tools
- **LlamaIndex** → connects your data to any LLM
- **CrewAI** → orchestrates multiple AI agents working together

---

## Quick Comparison: Top Conversational AI (May 2026)

| Feature | ChatGPT (GPT-5.5) | Claude (Sonnet 4.6) | Gemini (3.1 Pro) | DeepSeek (V4) | Perplexity |
|---------|------------------|-------------------|------------------|------------|-----------------|
| **Context window** | 128K tokens | 200K tokens | 1M tokens | 128K tokens | Varies by model |
| **Image input** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Web browsing** | ✅ | ✅ (claude.ai) | ✅ | ❌ | ✅ Core feature |
| **Code execution** | ✅ (Code Interpreter) | ✅ (Artifacts) | ✅ | ✅ | ❌ |
| **API pricing** | $2/$8 per 1M tokens | $3/$15 per 1M tokens | $2/$12 per 1M tokens | **$0.55/$2.19** | ~$8/month API |
| **Web/Mobile** | ✅ Plus $20/mo | ✅ Pro $20/mo | ✅ $20/mo | ✅ Free + API | ✅ Pro $20/mo |
| **Free daily limit** | Generous (GPT-5.5 Instant) | ~20–40 msgs/day | Generous Flash tier | Unlimited | 5 Pro searches/day |
| **Privacy** | Data to OpenAI | Data to Anthropic | Data to Google | Private training focus | Data to Perplexity |
| **Best for** | General tasks, web search | Writing, long docs, reasoning | Very long research | **Cost-conscious users** | Real-time research + citations |

**Tip:** If you hit free limits often, the **API** is often cheaper for heavy use — you pay per token with no daily cap. For regular personal use, a $20/mo Pro plan on your most-used tool pays for itself quickly.

---

## Complete Beginner? Here's Your Path.

If you're new to AI, don't try to absorb everything at once. Follow this sequence over 4–6 weeks. Each step builds on the last.

### 1. Days 1–7 — Pick one AI assistant and use it every day

Don't compare them yet. Use it for real tasks — drafting emails, summarising articles, explaining things you don't understand. Volume over perfection.

- **ChatGPT** — most popular, widest ecosystem
- **Gemini** — best if you use Google Docs / Gmail
- **Claude** — excellent for writing & long documents

All three are free. Pick one and stick with it for at least a week.

### 2. Week 2 — Learn what you're actually working with

Before adding more tools, spend 30 minutes understanding the basics. It changes how you use everything.

- Read the Glossary — token, prompt, context window, hallucination
- Read Common Confusions — debunks myths everyone believes early on
- Watch *3Blue1Brown's "But what is a GPT?"* on YouTube — 20 min, best visual explanation available

### 3. Weeks 3–4 — Add one specialised tool for your biggest pain point

Don't sign up for everything. Pick the one that removes real friction from your day:

- Too many meetings → Otter.ai or Fathom
- Research-heavy work → NotebookLM
- Lots of writing → Grammarly
- Need web answers with sources → Perplexity

### 4. Month 2 — Stay current without getting overwhelmed

AI moves fast. You don't need to read everything — just stay loosely informed.

- One newsletter: The Rundown AI (daily, 5 min) or The Batch by Andrew Ng (weekly, deeper)
- Follow Ethan Mollick on X — best practical takes on using AI at work

### 5. Month 2+ — Pick your lane
 
Go deeper based on what you actually care about. Once you have the basics, use this playbook as your reference. Pick the path that fits your interest:

- **Creative work** — Midjourney → Runway → Suno → Creative page
- **Building products** — Cursor → Lovable → n8n → Tools page
- **Business & automation** — Microsoft Copilot → Zapier → Workflows page
- **How it works** — fast.ai → Karpathy's YouTube → Hardware & Models
- **Privacy / self-hosting** — Ollama → LM Studio → run Llama locally → Open Source
- **Ethics & Safety** — Read the Principles page — guardrails, alignment, responsible use

**The biggest mistake beginners make:** signing up for 10 tools in week one. Master one thing first.

---

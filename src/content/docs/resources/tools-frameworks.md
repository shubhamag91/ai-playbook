---
title: Tools & Frameworks Reference
description: Comprehensive reference of AI development tools — frameworks, SDKs, deployment platforms, monitoring, and infrastructure.
sidebar:
  order: 5
tags:
  - resources
  - tools
  - frameworks
  - reference
lastUpdated: 2026-05-10
nextVerificationDue: 2026-08-08
---

AI development tools organized by category — from app frameworks to production infrastructure.

If you're new to this: think of building an AI app like building a house. Frameworks are your toolkit. SDKs talk to the model provider. Inference servers run the model yourself. Vector databases store your data's "memory." Monitoring tells you if it's working. Deployment platforms host it all.

---

## LLM Frameworks

**What this is:** Libraries that give you pre-built pieces for connecting your app to an LLM — like a starter kit for AI features. Instead of writing code to call an API from scratch, you use a framework that handles prompts, conversation history, and tool integration for you.

**When you'd use it:** You're building a chatbot, a RAG system, or any app that talks to an LLM. Start here.

| Framework | Language | Best For | Key Feature |
|---|---|---|---|
| **LangChain** | Python, JS | General LLM apps | Chains, agents, tool integration, 100+ integrations |
| **LlamaIndex** | Python | RAG and data | Data ingestion, indexing, query engines |
| **Haystack** | Python | Search & QA | Pipeline architecture, document processing |
| **Semantic Kernel** | C#, Python, Java | Enterprise apps | Microsoft ecosystem, planner patterns |
| **Vercel AI SDK** | JS/TS | Web apps | Streaming, tool calling, edge-ready |
| **LangGraph** | Python | Agent orchestration | Graph-based agent workflows, sub-agents |

### Quick Decision

```
Need a general-purpose LLM framework?      → LangChain
Building RAG on your own data?             → LlamaIndex
Building a web app with streaming?         → Vercel AI SDK
Building multi-agent systems?              → LangGraph
```

---

## Official SDKs

**What this is:** The official "phone line" to a model provider (Anthropic, OpenAI, Google). An SDK is a small library that handles authentication, request formatting, and error handling so you can focus on your app logic.

**When you'd use it:** You're building something and know which provider you want. Skip the framework if your use case is simple — just use the SDK directly.

| Provider | SDK | Key Features |
|---|---|---|
| **Anthropic** | `anthropic-python`, `anthropic-sdk-typescript` | Messages API, streaming, tool use |
| **OpenAI** | `openai-python`, `openai-node` | Chat, embeddings, images, audio, assistants |
| **Google** | `google-generativeai` | Gemini models, vision, function calling |
| **Mistral** | `mistralai` | Open-weight models, embeddings |
| **Together AI** | `together-python` | 100+ open models, fast inference |

---

## Model Serving & Inference

**What this is:** Software that lets you run an open-weight model (like Llama or DeepSeek) on your own hardware instead of calling a paid API. This gives you full control, privacy, and potentially lower cost at scale.

**When you'd use it:** You need privacy (data can't leave your servers), you're processing millions of requests (API costs add up), or you want to run models offline.

| Tool | Deployment | Key Feature |
|---|---|---|
| **vLLM** | Self-hosted | PagedAttention, continuous batching, SOTA throughput |
| **Ollama** | Local | One-command local models, broad model library |
| **TGI** | Self-hosted | Hugging Face integration, token streaming |
| **TensorRT-LLM** | NVIDIA GPU | Max performance on NVIDIA hardware |
| **llama.cpp** | CPU/Edge | Runs on laptops, phones, Raspberry Pi |
| **RunPod** | Cloud GPU | On-demand GPU rental, serverless inference |
| **Modal** | Cloud serverless | GPU serverless, great for async batch processing |
| **Replicate** | Cloud API | Run open models via API, pay per second |

---

## Vector Databases

**What this is:** A special database that stores "embeddings" — mathematical representations of text meaning. When you search, it finds things by meaning rather than exact keywords. This is how RAG (Retrieval-Augmented Generation) works: you store your documents as vectors, then retrieve relevant ones when a user asks a question.

**When you'd use it:** You're building RAG — an app that answers questions based on your own documents (knowledge base, support docs, research papers).

| Database | Deployment | Key Feature |
|---|---|---|
| **Pinecone** | Managed cloud | Serverless, high-scale, low maintenance |
| **Weaviate** | Self-hosted/Cloud | Hybrid search, GraphQL API, multi-modal |
| **Chroma** | Embedded | Simple, local-first, Python-native |
| **Qdrant** | Self-hosted/Cloud | Rust-native, filtering, high performance |
| **pgvector** | PostgreSQL | Extends Postgres, no new infra needed |
| **Milvus** | Self-hosted/Cloud | Billion-scale, distributed, GPU acceleration |

---

## Evaluation & Monitoring

**What this is:** Tools that check whether your LLM app is working correctly. Evaluation tests individual responses ("did the answer contain the right information?"), while monitoring tracks production metrics ("are error rates going up?").

**When you'd use it:** You have an LLM app in production and need to catch regressions before users notice. Or you're testing prompts and need to compare which version performs better.

| Tool | Best For | Key Feature |
|---|---|---|
| **DeepEval** | LLM unit testing | LLM-as-judge, pytest integration |
| **LangSmith** | Tracing + evaluation | LangChain-native, debugging |
| **Weights & Biases** | Experiment tracking | Research, model comparison |
| **Arize** | Production monitoring | ML observability, LLM-specific dashboards |
| **Langfuse** | Open-source observability | Self-hostable, traces + evals |

---

## Deployment Platforms

**What this is:** Services that host your AI app on the internet so anyone can use it. You write code on your laptop, push it to one of these platforms, and they give you a URL.

**When you'd use it:** You've built an AI app and want to share it. Pick Vercel for web apps, Railway for backend APIs, Modal for GPU-heavy batch jobs.

| Platform | Best For | Free Tier |
|---|---|---|
| **Vercel** | Web apps (Next.js) | Generous free tier |
| **Railway** | Backend APIs | Limited free tier |
| **Cloudflare Workers** | Edge apps | 100K req/day free |
| **Fly.io** | Containerized apps | Free tier for small projects |
| **Modal** | GPU serverless | $30/mo free compute |
| **Render** | Web services | Free tier (sleeps after inactivity) |

---

## Quick Reference

```
I want to:                              → Use:
──────────────────────────────────────────────────────────
Build an LLM app                        → LangChain or Vercel AI SDK
Run a model locally                     → Ollama
Serve an open model in production       → vLLM
Store embeddings for RAG                → pgvector (already on Postgres) or Pinecone
Evaluate LLM outputs                    → DeepEval
Debug a LangChain app                   → LangSmith
Host a Next.js AI app                   → Vercel
Run GPU batch jobs                      → Modal
```

For conversational AI tools and coding assistants, see the [Tools Guide](/decide/tools/guide).

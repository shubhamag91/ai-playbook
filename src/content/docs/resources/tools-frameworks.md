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

# Tools & Frameworks Reference

AI development tools organized by category — from app frameworks to production infrastructure.

---

## LLM Frameworks

The libraries that connect your app to LLMs — handle prompts, chains, agents, and tool integration.

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

Provider-maintained SDKs for their API.

| Provider | SDK | Key Features |
|---|---|---|
| **Anthropic** | `anthropic-python`, `anthropic-sdk-typescript` | Messages API, streaming, tool use |
| **OpenAI** | `openai-python`, `openai-node` | Chat, embeddings, images, audio, assistants |
| **Google** | `google-generativeai` | Gemini models, vision, function calling |
| **Mistral** | `mistralai` | Open-weight models, embeddings |
| **Together AI** | `together-python` | 100+ open models, fast inference |

---

## Model Serving & Inference

Run and serve open-weight models.

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

For RAG: store embeddings and retrieve by semantic similarity.

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

| Tool | Best For | Key Feature |
|---|---|---|
| **DeepEval** | LLM unit testing | LLM-as-judge, pytest integration |
| **LangSmith** | Tracing + evaluation | LangChain-native, debugging |
| **Weights & Biases** | Experiment tracking | Research, model comparison |
| **Arize** | Production monitoring | ML observability, LLM-specific dashboards |
| **Langfuse** | Open-source observability | Self-hostable, traces + evals |

---

## Deployment Platforms

Host your AI app — from prototype to production.

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

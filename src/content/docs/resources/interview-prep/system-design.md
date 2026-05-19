---
title: AI System Design — Interview Prep
description: Frameworks and patterns for designing AI systems at scale — RAG pipelines, model serving, feature stores, A/B testing, and cost tradeoffs.
sidebar:
  order: 5
tags:
  - interview
  - system-design
  - engineering
  - reference
lastUpdated: 2026-05-16
nextVerificationDue: 2026-11-16
---

Key frameworks for system design interviews targeting **ML/LLM Engineer**, **AI Platform Engineer**, and **Applied Scientist** roles.

**Roles covered:** AI Engineer · ML Platform Engineer · RAG Engineer · Inference Engineer · MLOps Engineer

---

## 1. Designing a RAG System

### Core Components

| Component | Options | Tradeoff |
|-----------|---------|----------|
| **Embedding model** | OpenAI text-embedding-3-large, Cohere, BGE, E5 | Quality vs cost vs latency vs self-host capability |
| **Vector DB** | Pinecone (managed), Weaviate (self-host), pgvector, Chroma, Qdrant | Managed vs self-host, filtering support, index type |
| **Chunking strategy** | Fixed size, semantic, recursive, sentence-window | Granularity vs context retention vs retrieval quality |
| **Retrieval** | Dense (vector), sparse (BM25), hybrid | Precision vs recall vs complexity |

### Architecture Patterns

```
User Query → Query Rewriting → Retrieval → Reranking → Generation
                │                 │           │
           Rewrite for        Search both   Cross-encoder
           multiple intents   dense +       re-ranks top
                              sparse        results
```

**Simple RAG:** Embed query → top-k vector search → concatenate chunks → LLM generation. Fast, minimal infra, but can miss context.

**Hybrid RAG:** BM25 + vector search → reciprocal rank fusion → rerank → generate. Better recall, more complex, needs both sparse and dense indexes.

**Agentic RAG:** Query → route to tool → execute search → evaluate results → iterate if needed. Best for complex questions, higher latency, needs orchestration.

### Key Design Decisions

- **Chunk size:** 256-512 tokens is typical. Smaller = more precise, larger = more context. Test on your data.
- **Top-k:** 3-5 chunks typically. More = more context but more noise and higher token cost.
- **Reranker:** Cross-encoder (Cohere, BGE) adds 50-100ms but improves relevance by 10-20%.
- **Caching:** Embedding cache (exact match) + LLM response cache (semantic) reduces latency by 40-60%.

---

## 2. Designing a Model Serving Platform

### Latency Budget

| Component | Budget | Strategy |
|-----------|--------|----------|
| Network | 50-100ms | Edge deployment, multi-region |
| Tokenization | 5-10ms | Cached tokenizers |
| Prefill (prompt) | 200-500ms | KV cache, prompt caching |
| Decode (per token) | 10-50ms | Continuous batching, speculation |
| Post-processing | 10-20ms | Streaming, partial parsing |

### Serving Strategies

| Strategy | Latency | Throughput | Cost | Complexity |
|----------|---------|------------|------|------------|
| **Synchronous** | Low | Low | High | Low |
| **Batch** | High | High | Low | Medium |
| **Streaming** | First-token low | Medium | Medium | Medium |
| **Speculative decoding** | Low | High | Medium | High |

### Scaling Considerations

- **GPU memory:** 70B model ≈ 140GB at FP16. Need 2x A100-80GB or quantization (FP8 = 70GB, INT4 = 35GB).
- **Throughput:** vLLM with continuous batching achieves 10-50x higher throughput than naive Hugging Face deployment.
- **Cold start:** Loading a 70B model takes 30-120 seconds. Use keep-warm or serverless inference (Groq, Replicate).
- **Multi-model routing:** Route simple queries to small/cheap models, complex to large models. Save 60-80% on compute.

---

## 3. Designing a Feature Store

### Architecture

```
Online API <──> Online Store (Redis/DynamoDB)
                  ↕ sync
Feature Pipeline → Offline Store (S3/Parquet)
                  ↕
Training Pipeline
```

| Store | Purpose | Low-Latency | High-Throughput | Consistency |
|-------|---------|-------------|-----------------|-------------|
| **Online** | Real-time serving | ✅ Yes | ❌ No | Eventual |
| **Offline** | Training data | ❌ No | ✅ Yes | Strong |

---

## 4. Designing an A/B Testing Platform

### Metrics Framework

| Metric | Definition | What It Measures |
|--------|------------|------------------|
| **Offline** | Accuracy, F1, BLEU | Model quality in isolation |
| **Online** | CTR, engagement, retention | User-level impact |
| **Guardrail** | Latency p99, error rate, toxicity | System health |
| **Counterfactual** | What-if analysis | Causal impact |

### Experiment Design

1. **Hypothesis:** Model A improves response quality by 10% over Model B
2. **Randomization:** User-level, session-level, or request-level
3. **Power analysis:** Minimum sample size = 2 * (Z_α/2 + Z_β)² * σ² / δ²
4. **Duration:** Minimum 1 full business cycle (1-2 weeks) to capture weekly patterns
5. **Analysis:** Two-sample t-test, delta method for ratios, Benjamini-Hochberg for multiple comparisons

---

## 5. Tradeoff Decision Framework

### Build vs Buy

| Factor | Build | Buy (API) |
|--------|-------|-----------|
| Time to market | Months | Days |
| Control | Full | Limited to API |
| Cost at low volume | High infra | Pay-per-token |
| Cost at high volume | Amortized | Scales linearly |
| Customization | Unlimited | Prompting only |
| Maintenance | Your team | Provider handles |
| Privacy | Full control | Data leaves infra |

**Decision rule:** Build when >50M tokens/month OR custom fine-tuning needed OR data cannot leave premise.

### Cost Per Query (May 2026)

```
Simple classification: GPT-5.5 Instant ~$0.00001/query
RAG with GPT-5.5:     ~$0.001-0.005/query  
Agentic workflow:     ~$0.01-0.05/query
Fine-tuned small model (self-host): ~$0.0001/query (amortized)
```

---

## Quick Reference

- **Throughput vs latency:** Continuous batching maximizes throughput; speculative decoding reduces latency
- **Memory bandwidth bound:** LLM inference is typically memory-bandwidth bound, not compute bound
- **KV cache:** Linear in batch size x sequence length. PagedAttention reduces fragmentation by 60-80%
- **Prompt caching:** Cache prefix KV for common system prompts → 50-80% reduction in prefill time

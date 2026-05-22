---
title: RAG Architecture
description: A canonical Retrieval-Augmented Generation pipeline, drawn in Mermaid.
sidebar:
  order: 1
tags:
  - diagrams
  - architecture
lastUpdated: 2026-05-08
nextVerificationDue: 2027-05-08
---

A minimal RAG system has four moving parts: **ingest**, **index**, **retrieve**, and **generate**. By May 2026, most production systems add cost routing, agentic retrieval, and caching.

### Basic RAG (Minimal)

```mermaid
flowchart LR
    A[Source docs<br/>PDFs, web, notes] --> B[Chunk + clean]
    B --> C[Embed]
    C --> D[(Vector DB)]
    U[User query] --> E[Embed query]
    E --> D
    D --> F[Top-k chunks]
    F --> G[Prompt builder]
    U --> G
    G --> H[LLM]
    H --> I[Answer]

    style D fill:#1e3a8a,stroke:#60a5fa,color:#fff
    style H fill:#166534,stroke:#4ade80,color:#fff
```

### Production RAG (May 2026)

```mermaid
flowchart LR
    subgraph Indexing["Indexing Pipeline"]
        A[Source docs] --> B["Chunk + clean<br/>(recursive)"]
        B --> C["Embed<br/>(cached)"]
        C --> D["Vector DB<br/>(Pinecone, Chroma)"]
    end
    
    subgraph Retrieval["Smart Retrieval"]
        U[User query] --> RT["Route by complexity<br/>(Claude Instant)"]
        RT -->|simple| E1["BM25 + vector<br/>(hybrid)"]
        RT -->|complex| E2["Multi-step agent<br/>retrieval"]
        E1 --> F["Rerank<br/>(bge-reranker)"]
        E2 --> F
        F --> CACHE["Prompt cache<br/>(50% cost savings)"]
    end
    
    subgraph Generation["Model Selection"]
        CACHE --> SELECT["Select model<br/>by cost/quality"]
        SELECT -->|cheap| M1["GPT-5.5 Instant<br/>or DeepSeek"]
        SELECT -->|quality| M2["Claude 4.7<br/>400K context"]
        SELECT -->|reasoning| M3["o3 or<br/>DeepSeek R1"]
    end
    
    M1 --> I[Answer + citations]
    M2 --> I
    M3 --> I
    
    style D fill:#1e3a8a,stroke:#60a5fa,color:#fff
    style F fill:#7c3aed,stroke:#a78bfa,color:#fff
    style SELECT fill:#166534,stroke:#4ade80,color:#fff
```



## Common failure modes

```mermaid
flowchart TB
    X[Bad answer] --> A1[Chunks too big?<br/>Retrieval diluted]
    X --> A2[Chunks too small?<br/>Lost context]
    X --> A3[Wrong embedding model?<br/>Semantic mismatch]
    X --> A4[No re-ranker?<br/>Top-k is noisy]
    X --> A5[System prompt weak?<br/>Model ignores chunks]
    X --> A6[No cost routing?<br/>Overspending 10x]
    X --> A7[Context too full?<br/>Prompt injection risk]
```

For a comprehensive guide to building RAG systems — including cost optimization, quality improvements, agentic RAG, and production safeguards — see the [RAG Architecture deep dive](/deep-dive/rag-architecture/).

## Evaluation & Benchmarking

- [Ragas](https://github.com/explodinggradients/ragas)  -  evaluate retrieval + generation quality with metrics
- [LangSmith](https://smith.langchain.com)  -  trace, debug, evaluate LLM chains
- A/B test: chunking strategies, embedding models, rerankers, routing policies
- Golden dataset: 20-50 real queries + expected answers for regression testing

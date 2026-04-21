---
title: RAG Architecture
description: A canonical Retrieval-Augmented Generation pipeline, drawn in Mermaid.
sidebar:
  order: 1
---

A minimal RAG system has four moving parts: **ingest**, **index**, **retrieve**, and **generate**.

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

## What each stage is really doing

1. **Chunk + clean** — the unglamorous 80% of the work. Bad chunks = bad answers.
2. **Embed** — turns text into vectors. Pick a model whose dimensions fit your DB.
3. **Retrieve** — top-k by cosine similarity, optionally re-ranked.
4. **Prompt builder** — packs chunks into the context with a system prompt.
5. **LLM** — generates the final answer. Cite chunks back to the user.

## Common failure modes

```mermaid
flowchart TB
    X[Bad answer] --> A1[Chunks too big?<br/>Retrieval diluted]
    X --> A2[Chunks too small?<br/>Lost context]
    X --> A3[Wrong embedding model?<br/>Semantic mismatch]
    X --> A4[No re-ranker?<br/>Top-k is noisy]
    X --> A5[System prompt leaks?<br/>Model ignores retrieved text]
```

## Next level

- Add a **re-ranker** (e.g. Cohere Rerank, bge-reranker) between retrieval and prompt building.
- Add **query rewriting** — use a small model to expand the user's query before retrieval.
- Evaluate with [Ragas](https://github.com/explodinggradients/ragas) so you can improve it with numbers, not vibes.

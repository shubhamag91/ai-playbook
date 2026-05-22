---
title: "Gemma — Open Models"
description: Google DeepMind's Gemma 4 — the most intelligent open models. Sizes, deployment (Ollama, Hugging Face, Vertex AI), benchmarking, and comparison with Llama and other open models.
sidebar:
  order: 6
tags:
  - deepmind
  - google
  - gemma
  - open-source
  - deployment
glossaryLinks:
  - llm
  - fine-tuning
  - inference
tldr:
  - "Gemma 4: DeepMind's latest open-weight family — text, audio, and image input, 140+ languages, context up to 256K tokens"
  - "Available from Ollama, Hugging Face, Kaggle, and Vertex AI Model Garden"
  - "Gemma 4 is licensed under Apache 2.0; earlier Gemma 1/2/3 use the custom Gemma Terms of Use"
  - "Optimized for on-device (phones, laptops) and self-hosted deployment"
lastUpdated: 2026-05-23
nextVerificationDue: 2026-08-23
---

Gemma is Google DeepMind's family of open-weight models. Unlike Gemini (API-only), Gemma models can be downloaded, self-hosted, and fine-tuned. **Gemma 4 is released under Apache 2.0** — earlier generations (Gemma 1/2/3) use the custom [Gemma Terms of Use](https://ai.google.dev/gemma/terms), which adds a Prohibited Use Policy on top of broad permissive rights.

## Gemma 4 — Capabilities

| Capability | Detail |
|---|---|
| **Modalities** | Text, audio, image input |
| **Languages** | 140+ |
| **Context window** | Up to 256K tokens |
| **License** | Apache 2.0 |
| **Sizes** | Multiple parameter counts across the family — check the [Gemma model cards](https://ai.google.dev/gemma/docs) for the current released sizes |
| **Specialized variants** | Gemma 3n (lightweight), EmbeddingGemma, FunctionGemma, PaliGemma 1/2 (multimodal), ShieldGemma 1/2 (safety), RecurrentGemma (research) |

## Getting Started

### Ollama — Local Deployment

```bash
# Install Ollama: ollama.com
ollama pull gemma4
ollama run gemma4
```

### Hugging Face

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

# Check huggingface.co/google for current released sizes and -it (instruct) variants
model_id = "google/gemma-4-it"
model = AutoModelForCausalLM.from_pretrained(model_id)
tokenizer = AutoTokenizer.from_pretrained(model_id)

inputs = tokenizer("Explain quantum computing", return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=500)
print(tokenizer.decode(outputs[0]))
```

### Vertex AI

Gemma 4 is available in the [Vertex AI Model Garden](https://console.cloud.google.com/vertex-ai/model-garden) — deploy directly to a managed endpoint, or use the Garden's one-click serving for benchmarking before commit.

## Specialized Gemma Variants

The Gemma family extends beyond the base instruct models:

| Variant | Purpose |
|---|---|
| **Gemma 3n** | Lightweight footprint for low-resource devices |
| **EmbeddingGemma** | Numerical text representations for retrieval / RAG |
| **FunctionGemma** | Specialised for function calling |
| **PaliGemma 1 / 2** | Multimodal (vision + language) |
| **ShieldGemma 1 / 2** | Safety / content evaluation |
| **RecurrentGemma** | Research variant exploring recurrent architectures |

## Gemma vs Llama

| Feature | Gemma 4 | Llama (latest) |
|---|---|---|
| **Developer** | Google DeepMind | Meta |
| **License** | Apache 2.0 (Gemma 4) | Llama Community License (custom, with use restrictions) |
| **Context window** | Up to 256K | Varies by variant |
| **Multimodal** | Text + audio + image input | Vision variants available |
| **Google integration** | Native: Vertex AI Model Garden, AI Studio | None |
| **Ecosystem** | Ollama, Hugging Face, Kaggle, Vertex AI, TFLite, CoreML | Ollama, Hugging Face, Together AI, Replicate |

> **License note:** "Apache 2.0" (Gemma 4) is a true permissive license — no use-case restrictions. The older Llama Community License and the **Gemma Terms of Use** (Gemma 1/2/3) both add a Prohibited Use Policy. Match your compliance review to the specific model and version you deploy.

## Use Cases

| Use Case | Recommended Path | Deployment |
|---|---|---|
| On-device AI (phone) | Smallest available Gemma + INT4 quantization | CoreML, TFLite |
| Local chatbot (laptop) | Mid-size Gemma | Ollama |
| Code assistant | Larger Gemma variant | Ollama or Vertex AI |
| Fine-tuned agent | Largest available size | Vertex AI |
| Production RAG | EmbeddingGemma + larger generator Gemma | Vertex AI + Vector Search |

## Where to Find Gemma

- [Hugging Face: google/gemma-4](https://huggingface.co/google)
- [Ollama: gemma4](https://ollama.com/library/gemma4)
- [Kaggle: google/gemma](https://www.kaggle.com/models/google/gemma)
- [Vertex AI Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)

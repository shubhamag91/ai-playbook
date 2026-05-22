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
  - "Gemma 4: DeepMind's most intelligent open models, designed to maximize intelligence-per-parameter"
  - "Available in multiple sizes (2B, 9B, 27B+) from Ollama, Hugging Face, or Vertex AI"
  - "MIT-compatible license (varies by size) — free for commercial use"
  - "Optimized for on-device (phones, laptops) and self-hosted deployment"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

Gemma is Google DeepMind's family of open-weight models. Unlike Gemini (API-only), Gemma models can be downloaded, self-hosted, and fine-tuned — with commercial-friendly licensing.

## Gemma 4 — Model Sizes

| Model | Parameters | Best Use | Deployment |
|---|---|---|---|
| **Gemma 4 2B** | 2 billion | On-device, phones, IoT | Ollama, CoreML, TFLite |
| **Gemma 4 9B** | 9 billion | Laptops, single GPU | Ollama, Hugging Face, Vertex AI |
| **Gemma 4 27B** | 27 billion | Desktop, server GPU | Ollama, Hugging Face, Vertex AI |
| **Gemma 4 31B** | 31 billion | Server deployment, fine-tuning | Vertex AI, Hugging Face |

## Getting Started

### Ollama — Local Deployment

```bash
# Install Ollama: ollama.com
ollama pull gemma4:9b
ollama run gemma4:9b
```

### Hugging Face

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("google/gemma-4-27b-it")
tokenizer = AutoTokenizer.from_pretrained("google/gemma-4-27b-it")

inputs = tokenizer("Explain quantum computing", return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=500)
print(tokenizer.decode(outputs[0]))
```

### Vertex AI

```python
# Deploy Gemma on Google Cloud
from vertexai.preview.language_models import TextGenerationModel

model = TextGenerationModel.from_pretrained("gemma-4-27b")
response = model.predict("Write a function to check prime numbers")
```

## Capabilities

| Feature | Gemma 4 2B | Gemma 4 9B | Gemma 4 27B+ |
|---|---|---|---|
| **Text generation** | ✅ | ✅ | ✅ |
| **Code generation** | Basic | Good | Excellent |
| **Reasoning** | Limited | Good | Strong |
| **Multilingual** | ✅ | ✅ | ✅ |
| **Fine-tuning** | PEFT/LoRA | PEFT/LoRA | Full + LoRA |
| **On-device** | ✅ (TFLite, CoreML) | ✅ (INT4 quantized) | ❌ |
| **Commercial use** | Check license | Check license | Check license |

## Gemma vs Llama

| Feature | Gemma 4 | Llama 4 |
|---|---|---|
| **Developer** | Google DeepMind | Meta |
| **Max parameters** | 31B | 405B (MoE) |
| **License** | MIT-compatible (varies) | MIT |
| **Context window** | 128K | 128K |
| **Multimodal** | Increasing with Omni integration | Vision models available |
| **Google integration** | Native: Vertex AI, AI Studio | None |
| **Ecosystem** | Ollama, Hugging Face, Vertex AI, TFLite, CoreML | Ollama, Hugging Face, Together AI, Replicate |

## Use Cases

| Use Case | Best Gemma Size | Deployment |
|---|---|---|
| On-device AI (phone) | 2B (INT4) | CoreML, TFLite |
| Local chatbot (laptop) | 9B | Ollama |
| Code assistant | 27B | Ollama or Vertex AI |
| Fine-tuned agent | 27B+ | Vertex AI |
| Production RAG | 27B | Vertex AI + Vector Search |

## Where to Find Gemma

- [Hugging Face: google/gemma-4](https://huggingface.co/google)
- [Ollama: gemma4](https://ollama.com/library/gemma4)
- [Kaggle: google/gemma](https://www.kaggle.com/models/google/gemma)
- [Vertex AI Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)

---
title: "DeepSeek Open-Weight & Self-Hosting"
description: Download and self-host DeepSeek V4 Flash and V4 Pro — Ollama, Hugging Face, MIT license, deployment options, and cost comparisons for self-hosted inference.
sidebar:
  order: 5
tags:
  - deepseek
  - open-source
  - self-hosting
  - ollama
  - deployment
glossaryLinks:
  - llm
  - fine-tuning
  - inference
tldr:
  - "DeepSeek V4 Flash is available as open-weight (MIT license) — download, self-host, fine-tune freely"
  - "Deploy via Ollama (simplest), Hugging Face (transformers), or vLLM (production)"
  - "Self-hosting DeepSeek vs API: break-even at ~5M tokens/day. Below that, API is cheaper"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

DeepSeek is one of the few frontier-quality AI labs that releases open-weight models. You can download, self-host, and fine-tune DeepSeek V4 Flash — no API needed, no usage limits, no data leaving your infrastructure.

## Available Models

| Model | Open-Weight? | License | Size | Min GPU |
|---|---|---|---|---|
| **DeepSeek V4 Flash** | Yes | MIT | ~37B params (MoE) | 24GB VRAM (INT4) / 48GB (FP16) |
| **DeepSeek V4 Pro** | Limited | Commercial API | ~671B params (MoE) | Multi-GPU cluster |

V4 Flash is the self-hosting sweet spot — frontier-quality reasoning at a size that fits on a single GPU.

## Ollama — Quickest Setup

```bash
# Install Ollama: ollama.com
ollama pull deepseek-v4-flash

# Run locally
ollama run deepseek-v4-flash
```

```python
# Use via Ollama API
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Hugging Face

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "deepseek-ai/DeepSeek-V4-Flash"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    device_map="auto",
    torch_dtype="auto"  # Uses FP16 on GPU, FP32 on CPU
)

inputs = tokenizer("Explain quantum computing", return_tensors="pt").to(model.device)
outputs = model.generate(**inputs, max_new_tokens=500)
print(tokenizer.decode(outputs[0]))
```

## vLLM — Production Deployment

```python
# Install: pip install vllm
# Serve: vllm serve deepseek-ai/DeepSeek-V4-Flash --dtype auto
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V4-Flash",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Self-Hosting vs API — Break-Even Analysis

| Volume | API (V4 Flash) | Self-Host (1× A100, on-demand) | Winner |
|---|---|---|---|
| 1K tokens/day | ~$0.00014 | ~$0 | API (free tier covers this) |
| 100K tokens/day | ~$0.014 | ~$0 | API |
| 1M tokens/day | ~$0.14 | ~$0 | API |
| 10M tokens/day | ~$1.40 | $0 | **Self-host** |
| 100M tokens/day | ~$14 | $0 | **Self-host** |

> **Rule of thumb:** Self-host when daily volume exceeds ~5M tokens or when data cannot leave your infrastructure. For most individual developers, the API is significantly cheaper — no GPU costs, no maintenance.

## Quantization Options

| Quantization | VRAM Required | Speed | Quality |
|---|---|---|---|
| FP16 (full) | 48GB | Baseline | Maximum |
| INT8 | 24GB | 1.5x faster | 99.5% of FP16 |
| INT4 | 16GB | 2x faster | 98% of FP16 |
| GGUF Q4_K_M | 24GB (CPU offload) | Slower | 97% of FP16 |

## Fine-Tuning

DeepSeek V4 Flash can be fine-tuned with LoRA/QLoRA:

```python
from peft import LoraConfig, get_peft_model
from transformers import TrainingArguments, Trainer

# QLoRA configuration for memory-efficient fine-tuning
lora_config = LoraConfig(
    r=16, lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05, bias="none",
    task_type="CAUSAL_LM"
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable params: ~0.5% of total → fits on single 24GB GPU
```

## Where to Find DeepSeek Models

- [Hugging Face: deepseek-ai](https://huggingface.co/deepseek-ai)
- [Ollama: deepseek-v4-flash](https://ollama.com/library/deepseek-v4-flash)
- [GitHub: deepseek-ai](https://github.com/deepseek-ai)

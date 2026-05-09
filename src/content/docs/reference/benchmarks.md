---
title: Model Benchmarks & Leaderboards
description: Performance comparisons on standard benchmarks — coding, reasoning, knowledge
sidebar:
  order: 3
tags:
  - reference
  - benchmarks
lastUpdated: 2026-05-08
---

Standard benchmarks for evaluating model capabilities. Below are the most widely used measures for different types of tasks.

## Standard Evaluation Benchmarks

### Coding Ability
**HumanEval** — Write functions to solve programming problems. Tests code generation quality.
- Passing rate: % of problems solved
- Used by: CodeLlama, GPT-4o, Claude, Codex
- Interpretation: Higher = better code generation

**LeetCode Hard** — Real coding interview problems.
- Used by: Performance tracking in production settings
- Interpretation: Real-world coding complexity

### Mathematical Reasoning
**MATH** — 12,500 high school math problems across all domains.
- Accuracy: % of problems solved correctly
- Used by: o1, GPT-4o, Claude for reasoning eval
- Interpretation: Tests step-by-step reasoning ability

**GSM8K** — Grade school math word problems.
- Accuracy: % of problems solved
- Used by: Baseline for reasoning models
- Interpretation: Simpler than MATH; good for smaller models

### Expert Knowledge
**GPQA** — Graduate-level exam questions in biology, physics, and chemistry.
- Accuracy: % correct, with human expert baseline
- Used by: Frontier models (o1, Claude, GPT-4o)
- Interpretation: Tests deep domain expertise

**MMLU** — Massive Multitask Language Understanding (57,000+ questions across 57 domains).
- Accuracy: % correct across all domains
- Used by: All models — most common benchmark
- Interpretation: General knowledge breadth

### Multilingual & Reasoning
**FLORES** — Translation between 200+ language pairs.
- Accuracy: BLEU/COMET score
- Used by: Testing multilingual models
- Interpretation: Translation quality

---

## How to Read Benchmark Scores

Most leaderboards report scores as percentages (higher is better) or ranked positions. Remember:

- **Benchmarks are proxies** — They measure narrow tasks, not real-world capability
- **Leaderboards lag reality** — New models often perform better than their benchmark scores suggest in practice
- **Context matters** — The same model may score very differently with different prompting strategies
- **Use multiple signals** — Don't choose a model based on a single benchmark

---

## Current Model Rankings

For up-to-date leaderboard rankings, see:

- **[HELM Leaderboard](https://crfm.stanford.edu/helm/latest/)** — Comprehensive multi-task evaluation
- **[OpenCompass](https://opencompass.org.cn/)** — Chinese and multilingual benchmarks
- **[AlpacaEval](https://tatsu-lab.github.io/alpaca_eval/)** — Chat model rankings by human preference
- **[Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)** — Open-source models
- **[FinCanna Index](https://www.ishnsinstitute.org/fincanna/)** — Financial domain benchmarks

---

## For Practical Model Selection

For choosing a model for your use case (pricing, capabilities, tradeoffs), see:
- [Model Specs & Pricing](/reference/model-specs) — Current models with detailed specs
- [Models Decision Guide](/decide/models/guide) — How to choose based on your needs

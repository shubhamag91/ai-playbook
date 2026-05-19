---
title: AI Product — Interview Prep
description: Frameworks for AI product management interviews — product sense, metric trees, AI strategy, build vs buy, and responsible AI decision-making.
sidebar:
  order: 7
tags:
  - interview
  - product
  - strategy
  - reference
lastUpdated: 2026-05-16
nextVerificationDue: 2026-11-16
---

Frameworks and strategies for AI product interviews spanning **AI Product Manager**, **Technical PM**, and **ML Platform PM** roles.

**Roles covered:** AI PM · Technical PM · ML Platform PM · AI Strategy PM

---

## 1. Product Sense Framework

### Problem Validation

| Step | Question | Methods |
|------|----------|---------|
| **User need** | What problem does this solve? | User interviews, support tickets, usage data |
| **Market sizing** | How many users need this? | TAM/SAM/SOM, bottom-up estimation |
| **AI advantage** | Why AI for this problem? | Baseline comparison, feasibility check |
| **Success metric** | How do we know it works? | North star, proxy metrics, guardrails |

### Estimating Market Size

**Top-down:** Total addressable market × % addressable by AI × expected adoption rate

*Example:* Global customer support market = $500B. AI can address 40% = $200B. 10% adoption in 3 years = $20B TAM.

**Bottom-up:** Number of potential users × willingness to pay × annual value

*Example:* 100K companies × $500/mo × 12 = $600M SAM.

---

## 2. Metric Trees

### North Star → Proxy Metrics

```
North Star: User value from AI features
  ├─ Quality: Response acceptance rate, task completion rate
  ├─ Speed: Time to first response, time to resolution
  ├─ Coverage: % of queries handled, % automated
  └─ Satisfaction: CSAT, NPS, retention, DAU/MAU
```

### Evaluation Metrics for AI Products

| Layer | Offline | Online |
|-------|---------|--------|
| **Model** | Accuracy, F1, BLEU, ROUGE | CTR, engagement, quality rating |
| **System** | Latency, throughput, cost | P95 latency, error rate, uptime |
| **Product** | — | Retention, conversion, NPS |
| **Business** | — | Revenue, cost savings, market share |

**Guardrail metrics:** Track alongside primary metrics. A new feature that improves retention but increases toxicity by 5% is not a win.

---

## 3. AI Product Strategy

### Build vs Buy Decision Matrix

| Factor | Build | Buy (API) | Fine-tune |
|--------|-------|-----------|-----------|
| Data privacy | ✅ Full control | ⚠️ Data leaves premises | ✅ On-prem possible |
| Customization | ✅ Unlimited | ❌ Prompt-only | ✅ Domain-specific |
| Time to market | ❌ 3-12 months | ✅ Days | ⚠️ 2-8 weeks |
| Cost (low volume) | ❌ High infra | ✅ Pay-per-token | ❌ Training cost |
| Cost (high volume) | ✅ Amortized | ❌ Scales linearly | ✅ Per-query cheap |
| Talent needed | ML infra team | API integration | ML engineer |

**Decision rules:**
- <10M tokens/month → API (cheapest, fastest)
- 10-50M tokens/month → Evaluate: API vs fine-tuned open model
- >50M tokens/month → Self-host or fine-tune (amortized cost wins)
- Data-sensitive → Self-host open-weight model (Llama, Qwen, DeepSeek)

### AI Feature Prioritization

| Quadrant | High Impact | Low Impact |
|----------|-------------|------------|
| **Easy** | Do first | Consider if quick win |
| **Hard** | Strategic bet | Deprioritize |

**High-impact + Easy:** Use existing APIs with prompt engineering. Prototype in days.
**High-impact + Hard:** Fine-tune or build custom. Dedicate team and time.
**Low-impact + Easy:** Automation, internal tools, quality-of-life.
**Low-impact + Hard:** Defer or cut.

---

## 4. Launch & Measurement

### Launch Framework

| Phase | Duration | Traffic | Goals |
|-------|----------|---------|-------|
| **Internal** | 1-2 weeks | Internal team | Safety, quality baseline, latency |
| **Shadow** | 1-2 weeks | 5-10% logged | Compare AI vs baseline, calibrate |
| **A/B test** | 2-4 weeks | 50/50 split | Metric impact, statistical significance |
| **Canary** | 1 week | 10% traffic | Production validation, monitoring |
| **Full rollout** | — | 100% | Monitor degradation, iterative improvement |

### Metric Guardrails

| Guardrail | Threshold | Action |
|-----------|-----------|--------|
| Response time P99 | >3s | Disable for high-traffic paths |
| Error rate | >1% | Roll back to fallback model |
| Toxicity score | >baseline + 10% | Investigate, adjust filters |
| User satisfaction | <baseline - 5% | A/B test improvements or revert |

---

## 5. Responsible AI

### Risk Assessment Framework

| Risk | Mitigation |
|------|------------|
| **Bias** | Diverse eval datasets, fairness metrics, regular audits |
| **Hallucination** | RAG with citations, confidence thresholds, human-in-loop |
| **Privacy** | Data minimization, PII masking, federated learning consideration |
| **Security** | Prompt injection testing, rate limiting, input/output guardrails |
| **Transparency** | User disclosure (AI-generated label), explanation capability |

### Regulatory Landscape (2026)

| Regulation | Region | Key Requirements |
|------------|--------|------------------|
| EU AI Act | EU | Risk classification, transparency, human oversight for high-risk |
| Executive Order | US | Safety testing for frontier models, watermarking, reporting |
| China AI Regulation | China | Content control, algorithm filing, ethical review |

---

## Quick Reference

- **Pareto principle:** 80% of value from 20% of features. Ship MVP with prompt engineering, iterate to fine-tuning.
- **S-curve adoption:** AI products follow S-curve (slow → rapid → plateau). Plan for the ramp.
- **Cost-aware design:** Query cost falls 50%+ per year. Design for today's cost but expect tomorrow's.
- **Fallback strategy:** Every AI feature needs a non-AI fallback. Handle model failures gracefully.

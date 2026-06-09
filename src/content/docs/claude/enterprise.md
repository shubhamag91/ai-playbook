---
title: Claude Enterprise & Deployment
description: Claude for Teams, enterprise deployment options (AWS Bedrock, Vertex AI, Claude Platform on AWS, Microsoft Foundry), data privacy, compliance (SOC 2, HIPAA), admin controls, and custom pricing.
sidebar:
  order: 9
tags:
  - claude
  - enterprise
  - deployment
  - security
  - compliance
glossaryLinks:
  - api
  - inference
tldr:
  - "Four deployment paths: Claude API (first-party), AWS Bedrock, Vertex AI, Claude Platform on AWS (CCU billing via Marketplace)"
  - "Zero-retention API for enterprises: prompts and outputs are not stored or used for training"
  - "SOC 2 Type II, HIPAA compliance. Claude Platform on AWS adds AWS-native security and billing"
  - "Data residency: US-only inference with 1.1x pricing multiplier on Opus 4.6+ and Sonnet 4.6+"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Claude for Teams

### Plans & Pricing

| Plan | Price | Key Features |
|---|---|---|
| **Claude Pro** | $20/mo per seat | API access, Claude Code (1 surface), Cowork (limited), Dispatch (limited) |
| **Claude Max** | $100/mo individual / $200/mo team | All surfaces, extended usage, priority access, advanced features |
| **Claude for Teams (Enterprise)** | Custom | Admin console, SSO/SAML, audit logs, data retention controls, volume discounts |

### Enterprise Features

| Feature | Description |
|---|---|
| **Admin Console** | Manage users, set policies, monitor usage |
| **SSO/SAML** | Okta, Azure AD, Google Workspace integration |
| **Audit Logs** | Track all API calls and user actions |
| **Data Controls** | Zero-retention API, data residency, custom retention policies |
| **Usage Analytics** | Per-user, per-model, per-project cost tracking |
| **Custom Rate Limits** | Negotiated based on your workload |
| **Priority Support** | Dedicated support team, SLAs |
| **Volume Discounts** | Custom pricing for high-volume users |

## Deployment Options

### 1. Claude API (First-Party) — Anthropic Hosted

```
simplest → most control
Claude API → Claude Platform on AWS → Bedrock → Vertex AI
```

- **Best for:** Quick startup, standard workloads, global access
- **Billing:** Per-token via Anthropic Console
- **Infrastructure:** Anthropic-managed
- **Data residency:** US-only via `inference_geo: "us"` parameter (1.1x pricing on Opus 4.6+)

### 2. Claude Platform on AWS

- **Best for:** AWS-native organizations wanting direct billing
- **Billing:** Claude Consumption Units (CCU) via AWS Marketplace ($0.01/CCU)
- **Infrastructure:** Co-managed — Anthropic serves, AWS bills
- **Key benefit:** Single AWS bill, enterprise procurement, private offers

```
Token usage → USD pricing → CCU conversion → AWS Marketplace billing → Monthly invoice
                 |                              |
                 At standard API rates     $0.01 per CCU
```

### 3. Amazon Bedrock

- **Best for:** AWS organizations needing VPC-level security
- **Infrastructure:** AWS-hosted, within your VPC
- **Features:** IAM integration, CloudTrail, VPC endpoints, KMS encryption
- **Endpoints:** Global (dynamic routing) and regional (data residency guarantee)

| Model on Bedrock | Global Endpoint | Regional Endpoint |
|---|---|---|
| Claude Opus 4.8 | Standard pricing | 10% premium |
| Claude Sonnet 4.6 | Standard pricing | 10% premium |

### 4. Vertex AI (Google Cloud)

- **Best for:** GCP-native organizations
- **Infrastructure:** Google-hosted
- **Endpoints:** Global, multi-region, and regional
- **Features:** IAM integration, Cloud Logging, VPC Service Controls

### 5. Microsoft Foundry

- **Best for:** Azure-native organizations
- **Infrastructure:** Microsoft-managed
- **Features:** Azure AD integration, Azure Monitor

## Data Privacy & Security

### Zero-Retention API

Enterprise customers can enable **zero-retention** for the API:
- Prompts and completions are NOT stored
- Data is NOT used for model training
- Data is NOT used to improve Anthropic services
- Audit logs confirm zero-retention status per request

### Compliance

| Standard | Status | Notes |
|---|---|---|
| **SOC 2 Type II** | ✅ Certified | Annual audit, report available to enterprise customers |
| **HIPAA** | ✅ Eligible | BAA available for covered entities |
| **GDPR** | ✅ Compliant | Data processing agreements, EU hosting options |
| **CCPA** | ✅ Compliant | Data subject access requests supported |
| **ISO 27001** | In progress | Certification in review |

### Data Residency

For Opus 4.6+, Sonnet 4.6+, and later models:

```python
# US-only inference (1.1x pricing multiplier)
client.messages.create(
    model="claude-sonnet-4-6",
    inference_geo="us",  # Routes to US data centers only
    ...
)
# Global routing (default, standard pricing): inference_geo="global"
```

## Model Deprecation Policy

Anthropic provides advance notice for model deprecations:

| Model | Status | Retirement Date | Migrate To |
|---|---|---|---|
| Claude Sonnet 4 | **Deprecated** | June 15, 2026 | Sonnet 4.6 |
| Claude Opus 4 | **Deprecated** | June 15, 2026 | Opus 4.8 |
| Claude Haiku 3.5 | **Retired** (except Bedrock/Vertex) | Already retired | Haiku 4.5 |

See [Anthropic's deprecation policy](https://docs.anthropic.com/en/docs/about-claude/model-deprecations) for full schedule.

## Cost Comparison — Deployment Options

| Scenario | API (First-Party) | AWS Bedrock | Vertex AI |
|---|---|---|---|
| **Per-token cost** | Standard rates | Standard + 10% (regional) | Standard + 10% (regional) |
| **Billing integration** | Anthropic Console | AWS bill | GCP bill |
| **Setup time** | Minutes | Hours (AWS config) | Hours (GCP config) |
| **Security model** | Anthropic-managed | VPC-level (IAM + KMS) | VPC-level (IAM) |
| **Best for** | Quick start | AWS-native, compliance-heavy | GCP-native |
| **Prompt caching** | ✅ | ✅ (cache writes only) | ✅ (cache writes only) |
| **Batch API** | ✅ 50% discount | ❌ | ❌ |

> **Recommendation:** Start with the API. Move to Bedrock/Vertical when you need VPC-level security or want to consolidate on a single cloud bill.

## Enterprise Contact

- **Sales:** [sales@anthropic.com](mailto:sales@anthropic.com) or [claude.com/contact-sales](https://claude.com/contact-sales)
- **Support:** [support.anthropic.com](https://support.anthropic.com)
- **Status:** [status.anthropic.com](https://status.anthropic.com)
- **Discord:** [anthropic.com/discord](https://anthropic.com/discord)

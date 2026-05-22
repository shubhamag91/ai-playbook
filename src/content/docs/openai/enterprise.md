---
title: OpenAI Enterprise & Deployment
description: ChatGPT Enterprise/Business/Education plans, API enterprise features (Scale Tier, Reserved Capacity, data residency), security (SOC 2, HIPAA), admin controls, RBAC, and deployment options.
sidebar:
  order: 9
tags:
  - openai
  - enterprise
  - deployment
  - security
  - compliance
glossaryLinks:
  - api
  - inference
tldr:
  - "ChatGPT Enterprise: SSO/SAML, admin controls, audit logs, data residency, custom models. Business: smaller-scale teams"
  - "API Enterprise: Scale Tier (SLAs, lower latency), Reserved Capacity (guaranteed throughput), Data Residency (+10%)"
  - "All enterprise plans include SOC 2 Type II, HIPAA compliance, zero-retention data options"
  - "Deployment via platform.openai.com (global) or Azure OpenAI Service (Microsoft-managed)"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## ChatGPT Plans

| Plan | Price | Key Features |
|---|---|---|
| **ChatGPT Free** | $0 | Basic access, limited GPT-5.4 mini |
| **ChatGPT Plus** | $20/mo | Full GPT-5.5 access, Codex (1 surface), GPT Image 2 |
| **ChatGPT Pro** | $200/mo | All models, Codex (all surfaces), Realtime, Sora, unlimited usage |
| **ChatGPT Business** | Custom | Team admin, shared workspaces, usage analytics |
| **ChatGPT Enterprise** | Custom | SSO/SAML, audit logs, data residency, custom models, dedicated support |
| **ChatGPT Education** | Custom | Academic pricing, classroom tools, admin controls |

## API Enterprise Features

### Scale Tier

| Feature | Standard | Scale Tier |
|---|---|---|
| **Rate Limits** | Shared pool | Dedicated throughput |
| **Latency** | Variable | Lower, more consistent |
| **Support** | Community | Priority, SLAs |
| **Availability** | Self-serve | Contract-based |

### Reserved Capacity

Guaranteed GPU capacity for production workloads with predictable latency.

### Data Residency

```python
# Route processing to specific regions (+10% pricing)
client = OpenAI(
    base_url="https://api.openai.com",
    default_headers={"OpenAI-Organization": "org-..."}
)
# Data residency controls available at the project level
```

| Region | Availability | Surcharge |
|---|---|---|
| **Global (default)** | All regions | Baseline pricing |
| **EU** | European data centers | +10% |
| **US** | US data centers | +10% |

### Admin APIs & RBAC

```python
# Manage users and permissions programmatically
from openai import OpenAI

client = OpenAI()

# List projects
projects = client.projects.list()

# Manage members
client.projects.members.create(
    project_id="proj_abc123",
    user_id="user-xyz",
    role="developer"  # {'owner', 'admin', 'developer', 'readonly'}
)
```

## Security & Compliance

| Standard | Status | Notes |
|---|---|---|
| **SOC 2 Type II** | ✅ Certified | Annual audit |
| **HIPAA** | ✅ Eligible | BAA available |
| **GDPR** | ✅ Compliant | EU data processing agreements |
| **CCPA** | ✅ Compliant | Data subject access requests |
| **ISO 27001** | ✅ Certified | Information security management |

### Zero-Retention API

Enterprise customers can opt into zero-retention:
- API inputs and outputs NOT stored
- Data NOT used for model training
- Data automatically deleted after processing

## Deployment Options

| Option | Infrastructure | Best For |
|---|---|---|
| **OpenAI Platform (First-Party)** | OpenAI-managed, global | Quick start, standard workloads |
| **Azure OpenAI Service** | Microsoft-managed | Azure-native organizations, VPC-level security |
| **Data Residency** | Regional data centers | EU/US compliance requirements |

### Azure OpenAI Service

- Deploy GPT models within your Azure subscription
- VNet integration, Azure AD, Private Link
- Same API format, Azure-managed infrastructure
- Regional availability varies by model

## Enterprise Contacts

- **Sales:** [openai.com/contact-sales](https://openai.com/contact-sales)
- **Support:** [help.openai.com](https://help.openai.com)
- **Status:** [status.openai.com](https://status.openai.com)
- **Enterprise Docs:** [platform.openai.com/docs/enterprise](https://platform.openai.com/docs/enterprise)

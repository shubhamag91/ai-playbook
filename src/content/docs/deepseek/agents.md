---
title: DeepSeek Agent Integrations
description: How to use DeepSeek as the backend model for Claude Code, GitHub Copilot, OpenCode, Kilo Code, and 15+ other AI coding agents — drop-in replacement with environment variables.
sidebar:
  order: 4
tags:
  - deepseek
  - agent
  - claude-code
  - copilot
  - integration
glossaryLinks:
  - agent
  - api
tldr:
  - "DeepSeek can replace Claude, GPT, or Gemini as the backend in 15+ coding agents by changing environment variables"
  - "Claude Code: set ANTHROPIC_BASE_URL + ANTHROPIC_AUTH_TOKEN to DeepSeek endpoints"
  - "GitHub Copilot: configure token endpoint and API key"
  - "All integrations use the same DeepSeek API key — no per-agent pricing"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

DeepSeek's dual API compatibility means you can use it as the backend model for most popular AI coding agents — no code changes to the agent itself, just environment variables pointing to DeepSeek.

## Claude Code

Replace Claude Code's default Anthropic backend with DeepSeek:

```bash
# Linux/Mac
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=sk-your-deepseek-api-key
export ANTHROPIC_MODEL=deepseek-v4-pro
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_EFFORT_LEVEL=max

# Start using Claude Code with DeepSeek
cd your-project
claude
```

```powershell
# Windows PowerShell
$env:ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
$env:ANTHROPIC_AUTH_TOKEN="sk-your-deepseek-api-key"
$env:ANTHROPIC_MODEL="deepseek-v4-pro"
$env:CLAUDE_CODE_SUBAGENT_MODEL="deepseek-v4-flash"
```

## GitHub Copilot

Configure Copilot to use DeepSeek as the LLM backend:

```json
{
  "github.copilot.advanced": {
    "authProvider": "github-enterprise",
    "debug.overrideEngine": "deepseek-v4-pro",
    "debug.overrideProxyUrl": "https://api.deepseek.com"
  }
}
```

## OpenCode

[OpenCode](https://github.com/anomalyco/opencode) is a terminal-based AI coding assistant that supports DeepSeek natively:

```bash
export OPENAI_API_KEY=sk-your-deepseek-api-key
export OPENAI_BASE_URL=https://api.deepseek.com
export OPENAI_MODEL=deepseek-v4-pro
```

## Kilo Code

```bash
export KILOCODE_PROVIDER=deepseek
export KILOCODE_API_KEY=sk-your-deepseek-api-key
```

## Supported Agents — Full List

| Agent | Format | Type |
|---|---|---|
| **Claude Code** | Anthropic | Terminal CLI |
| **GitHub Copilot** | OpenAI/Anthropic | IDE extension |
| **GitHub Copilot CLI** | OpenAI | Terminal CLI |
| **OpenCode** | OpenAI | Terminal CLI |
| **Kilo Code** | Native | IDE |
| **Cursor** | OpenAI | IDE |
| **Aider** | OpenAI | Terminal CLI |
| **WorkBuddy / CodeBuddy** | OpenAI | IDE |
| **Oh My Pi** | OpenAI | Terminal |
| **OpenClaw** | OpenAI | Agent framework |
| **AstrBot** | OpenAI | Chat |
| **Deep Code** | Native | IDE |
| **Hermes** | OpenAI | Agent |
| **nanobot** | OpenAI | Agent |
| **Crush** | OpenAI | Terminal |
| **Pi** | OpenAI | Terminal |
| **Reasonix** | OpenAI | Agent |
| **Langcli** | OpenAI | Terminal |

## Cost Advantage

Using DeepSeek as the backend for your coding agents dramatically reduces costs:

| Agent Backend | Cost for 10K coding interactions (avg 3K in / 1K out) |
|---|---|
| Claude Opus 4.7 | $225 |
| Claude Sonnet 4.6 | $135 |
| GPT-5.4 | $112.50 |
| **DeepSeek V4 Pro** | **$19.50** |
| **DeepSeek V4 Flash** | **$6.30** |

## Setup Pattern

All integrations follow the same pattern:

1. Get a DeepSeek API key from [platform.deepseek.com](https://platform.deepseek.com/api_keys)
2. Set environment variables pointing to DeepSeek's API endpoints
3. Start using your favorite agent — it now runs on DeepSeek

No agent code changes needed. For agents not listed, check if they support custom OpenAI-compatible endpoints — DeepSeek works anywhere OpenAI works.

## Where Next

- [API & SDKs](/deepseek/api) — code examples for both API formats
- [Comparison & Migration](/deepseek/comparison) — detailed cost analysis
- [Workflows & Best Practices](/deepseek/workflows) — thinking mode and optimization

---
title: "Antigravity & Google Flow"
description: Google Antigravity 2.0 — the agentic development platform for building with Gemini. Google Flow — the multimodal creative tool. Comparison with Claude Code and Codex.
sidebar:
  order: 4
tags:
  - deepmind
  - google
  - antigravity
  - flow
  - agentic
  - coding
glossaryLinks:
  - agent
  - tool-use
  - api
tldr:
  - "Antigravity 2.0 is Google's agentic development platform — build, deploy, and orchestrate AI agents"
  - "Google Flow is the multimodal creative tool for Gemini Omni — generate video, image, and audio natively"
  - "Gemini CLI provides command-line access to Gemini for terminal-first workflows"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Google Antigravity 2.0 — Agentic Development Platform

Antigravity is Google's platform for building, testing, and deploying AI agents powered by Gemini. It provides a complete development environment for agentic workflows.

### What It Enables

| Capability | Description |
|---|---|
| **Agent Builder** | Visual or code-based agent creation |
| **Code Generation** | Gemini-powered coding with full context |
| **Tool Integration** | Connect to APIs, databases, Google services |
| **Deployment** | Deploy agents to Vertex AI or Google Cloud |
| **Google Workspace** | Native integration with Docs, Sheets, Gmail |
| **Science Skills** | Specialized agents for research and analysis |

### How It Compares — Antigravity vs Claude Code vs Codex

| Feature | Antigravity 2.0 | Claude Code | Codex |
|---|---|---|---|
| **Platform type** | Full agent IDE + deployment | Terminal + IDE + Desktop | Desktop + IDE + CLI + Web |
| **Model** | Gemini 3.5 | Claude Opus/Sonnet | GPT-5.5/5.4 |
| **Context** | 1M+ tokens | 1M tokens | 1M tokens |
| **Google Integration** | Native: Workspace, Cloud, Search | None | None |
| **Deployment** | Vertex AI, Google Cloud | API only | API only |
| **Enterprise** | Google Cloud IAM, VPC | Admin Console | Scale Tier, Azure |
| **Best for** | Google-native teams, enterprises | Reasoning-heavy tasks | Broadest surface coverage |

## Gemini CLI — Terminal Access

For terminal-first developers:

```bash
# Install Gemini CLI
npm install -g @google/gemini-cli

# Start a session
gemini chat

# Non-interactive mode
gemini "explain the authentication flow in this codebase"

# Pipe content
cat api.log | gemini "analyze this log for errors"
```

## Google Flow — Multimodal Creative Tool

Google Flow is designed for Gemini Omni — it provides a visual interface for multimodal creation:

```
Text prompt → Gemini Omni → Video output
Image input → Gemini Omni → Audio narration
Text + image → Gemini Omni → Multi-format output (video + audio + text)
```

Available at [flow.google.com](https://flow.google) or within the Gemini app.

### Use Cases

| Use Case | Tool | Flow |
|---|---|---|
| Create a video from a script | Gemini Omni | Provide script → Omni generates video + narration |
| Generate product images | Nano Banana 2 | Describe product → Image generated |
| Create music for a scene | Lyria 3 | Describe mood → Lyria generates music |
| Narrate a video | Gemini Audio | Upload video → Audio narration generated |

## Antigravity vs Google AI Studio

| When to Use | Tool |
|---|---|
| Quick prototyping, experimenting | **Google AI Studio** |
| Building production agents | **Antigravity** |
| Simple API access | **Gemini API** |
| Enterprise deployment | **Vertex AI + Antigravity** |
| Multimodal creation | **Google Flow** |

## Where Next

- [Gemini API & AI Studio](/deepmind/api) — API access and free development
- [Media & Creative](/deepmind/media) — Veo, Imagen, Lyria, Nano Banana
- [Workflows & Best Practices](/deepmind/workflows) — prompt engineering and optimization

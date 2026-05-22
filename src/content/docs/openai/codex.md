---
title: Codex
description: Complete guide to OpenAI Codex — the agentic coding platform across Desktop, IDE, CLI, Web, and CI/CD. Setup, workflows, AGENTS.md, Skills, MCP, Hooks, Computer Use, and comparison with Cursor/Claude Code.
sidebar:
  order: 4
tags:
  - openai
  - codex
  - coding
  - agentic
  - mcp
glossaryLinks:
  - agent
  - tool-use
  - api
tldr:
  - "Codex runs on 7 surfaces: Desktop app, IDE extension, CLI, Web (cloud), Chrome extension, GitHub Action, and Codex SDK"
  - "AGENTS.md = OpenAI's equivalent of CLAUDE.md. Skills = same SKILL.md standard as Anthropic. MCP = same open protocol"
  - "Codex supports Subagents, Automations (scheduled tasks), Worktrees (parallel branches), and Computer Use"
  - "Integrates with GitHub, Slack, Linear for end-to-end developer workflows"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

Codex is OpenAI's agentic coding platform. It reads your entire codebase, edits files across multiple files, runs terminal commands, and integrates with your development workflow — from Desktop to CI/CD.

## Installation — 7 Surfaces

| Surface | Best For | Key Feature |
|---|---|---|
| **Desktop App** | Visual workflow, multi-session | Computer Use, Appshots, Automations, Worktrees |
| **IDE Extension** | VS Code integration | Inline diffs, slash commands, @-mentions |
| **CLI** | Terminal-first, scripting | `codex "prompt"` for quick tasks, non-interactive mode |
| **Web (Cloud)** | No setup, browser | Cloud environments, internet access |
| **Chrome Extension** | Browser-based actions | Web automation, scraping, testing |
| **GitHub Action** | CI/CD automation | Automated PR review, issue triage |
| **Codex SDK** | Build custom agents | Full programmatic control |

```bash
# Install Codex CLI
pip install openai-codex

# Start in any project
cd your-project
codex

# Non-interactive mode for CI/CD
codex --non-interactive "review this PR for security issues"
```

## Core Capabilities

### AGENTS.md — Project Instructions

Like Anthropic's CLAUDE.md, Codex reads `AGENTS.md` from your project root at session start:

```markdown
# AGENTS.md
## Code Style
- Use TypeScript strict mode
- Prefer functional patterns over classes
- Tests colocated with source in __tests__/

## Architecture
- API routes in src/api/
- Business logic in src/services/
- Database queries in src/db/
```

### Skills — Same SKILL.md Standard

```bash
# Project skills
.codex/skills/
  generate-migration/
    SKILL.md
  review-pr/
    SKILL.md
```

Codex supports the same SKILL.md open standard as Claude Code. Skills are portable across 32+ tools. See [Agent Skills](/openai/agent-skills) for details.

### MCP — Model Context Protocol

```json
// .codex/mcp.json
{
  "mcpServers": {
    "github": {
      "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"]
    },
    "slack": {
      "command": "npx", "args": ["-y", "@modelcontextprotocol/server-slack"]
    }
  }
}
```

See [MCP & Integrations](/openai/mcp) for the full guide.

### Hooks

```json
// .codex/config.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{"type": "command", "command": "prettier --write ${CODEX_TOOL_INPUT_FILE}"}]
    }],
    "PreToolUse": [{
      "matcher": "Bash(git commit*)",
      "hooks": [{"type": "command", "command": "npm run lint && npm test"}]
    }]
  }
}
```

### Subagents — Parallel Task Execution

```bash
codex "audit all services for vulnerabilities, checking each in parallel with subagents"
```

A lead agent coordinates, assigns subtasks, and merges results. See the [Agents SDK](/openai/api) for building custom subagent architectures.

### Computer Use

Codex can control your browser and desktop applications — navigate websites, fill forms, test UIs:

```bash
codex "go to github.com/trending, find the top Python repo, clone it, and analyze the codebase for security issues"
```

Available on Desktop, CLI, and Web surfaces.

### Automations & Worktrees

- **Automations:** Scheduled tasks that run on your machine or in the cloud — morning PR reviews, nightly dependency audits
- **Worktrees:** Parallel git branches that Codex works on simultaneously — isolate experiments without cluttering your workspace

## Codex vs Cursor vs Claude Code

| Feature | Codex | Cursor | Claude Code |
|---|---|---|---|
| **Primary interface** | Desktop app + IDE + CLI + Web | IDE fork (VSCode-based) | Terminal CLI + IDE + Desktop |
| **Models** | GPT-5.5 / 5.4 / 5.4 mini | Claude Sonnet + GPT | Claude Opus 4.7 / Sonnet 4.6 |
| **Project instructions** | AGENTS.md | `.cursorrules` | CLAUDE.md |
| **Skills standard** | SKILL.md (same as Claude) | SKILL.md | SKILL.md |
| **MCP support** | Yes (same protocol) | Yes | Yes |
| **Computer Use** | Yes (Desktop, CLI, Web) | No | Cowork (research preview) |
| **Subagents** | Yes | No | Yes |
| **Scheduled tasks** | Automations | No | Routines |
| **CI/CD** | GitHub Action, Codex SDK | None | GitHub Actions |
| **Pricing** | ChatGPT Plus/Pro or API tokens | $20-40/mo | Pro/Max or API tokens |
| **Unique strengths** | GPT-5.5 reasoning, 7 surfaces, computer use, Commerce/Ads platform | Largest IDE market share | Best reasoning, 1M context, Agent Skills pioneer |

## Integrations

| Integration | What It Does |
|---|---|
| **GitHub** | Auto PR review, issue triage, repo management |
| **Slack** | `@Codex` mention — bug reports become PRs |
| **Linear** | Issue → code fix pipeline |

## Pricing

| Plan | What You Get |
|---|---|
| **ChatGPT Plus ($20/mo)** | Codex access on 1 surface |
| **ChatGPT Pro ($200/mo)** | Codex across all surfaces, extended usage |
| **API (Platform)** | Pay-per-token via platform.openai.com |
| **Enterprise** | Custom plans, admin controls, SSO |

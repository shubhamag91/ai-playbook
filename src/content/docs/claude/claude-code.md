---
title: Claude Code
description: Complete guide to Claude Code — Anthropic's agentic coding tool across Terminal, VS Code, JetBrains, Desktop, Web, and iOS. Setup, workflows, MCP integration, skills, hooks, sub-agents, and comparison with Cursor/Copilot.
sidebar:
  order: 4
tags:
  - claude
  - claude-code
  - coding
  - agentic
  - mcp
glossaryLinks:
  - agent
  - tool-use
  - api
tldr:
  - "Available on 7 surfaces: Terminal, VS Code, JetBrains, Desktop app, Web browser, iOS, and CI/CD (GitHub Actions)"
  - "Reads your entire codebase, edits files, runs commands, creates commits and PRs"
  - "Integrates with MCP (external tools), Agent Skills (repeatable workflows), hooks (auto-format/lint), and sub-agents (parallel task execution)"
  - "Routines: scheduled tasks on Anthropic infra. Channels: webhooks from Telegram, Discord, Slack. Agent SDK: build custom agents"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

Claude Code is Anthropic's agentic coding tool. It reads your codebase, edits files across multiple files, runs terminal commands, and integrates with your development workflow — from Terminal to CI/CD.

## Installation

### Terminal (Recommended)
```bash
# macOS, Linux, WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows
irm https://claude.ai/install.ps1 | iex

# Homebrew
brew install --cask claude-code

# WinGet
winget install Anthropic.ClaudeCode
```

### VS Code
Install "Claude Code" from the Extensions marketplace (`Cmd+Shift+X`). Provides inline diffs, @-mentions, plan review.

### JetBrains
Install the [Claude Code plugin](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-) for IntelliJ, PyCharm, WebStorm.

### Desktop App
Download from [claude.ai](https://claude.ai) — visual diffs, side-by-side sessions, scheduled tasks.

### Web
Go to [claude.ai/code](https://claude.ai/code) — no setup, browser-based, works on iOS.

### CI/CD
```yaml
# GitHub Actions
- uses: anthropics/claude-code-action@v1
  with:
    prompt: "Review this PR for security issues"
```
Also available for [GitLab CI/CD](https://code.claude.com/docs/en/gitlab-ci-cd).

## Seven Surfaces — One Engine

| Surface | Best For | Key Feature |
|---|---|---|
| **Terminal CLI** | Full control, scripting, CI/CD | `claude -p "prompt"` for quick tasks |
| **VS Code** | IDE integration, inline diffs | @-mentions, plan mode, context sharing |
| **JetBrains** | IntelliJ, PyCharm, WebStorm | Interactive diff viewing |
| **Desktop App** | Visual workflow, multi-session | Side-by-side sessions, recurring tasks |
| **Web** | No setup, browser/phone | Remote execution, long-running cloud tasks |
| **iOS** | On-the-go coding | Dispatch tasks, review results |
| **CI/CD** | Automated PR review, issue triage | GitHub Actions, GitLab CI/CD |

## Core Capabilities

### Read, Write, Execute

```bash
# Explore and understand
claude "explain the authentication flow in this codebase"

# Build features
claude "add a rate-limiting middleware to the API"

# Fix bugs
claude "fix the race condition in the payment processing module"

# Write tests
claude "write tests for the auth module, run them, and fix any failures"

# Git operations
claude "commit my changes with a descriptive message and open a PR"
```

### MCP Integration
Connect Claude Code to external tools and data:

```bash
# Configure MCP servers in .claude/mcp.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    },
    "github": {
      "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

See [MCP — Model Context Protocol](/claude/mcp) for a complete guide.

### Agent Skills (SKILL.md)
Package repeatable workflows your team can share:

```bash
# Project skills in .claude/skills/
.claude/skills/
  generate-migration/
    SKILL.md          # Instructions for the skill
  review-pr/
    SKILL.md
  deploy-staging/
    SKILL.md
```

See [Agent Skills](/claude/agent-skills) for details.

### CLAUDE.md — Persistent Instructions
Add `CLAUDE.md` to your project root:

```markdown
# CLAUDE.md
## Code Style
- Use TypeScript strict mode
- Prefer functional patterns over classes
- Tests go in __tests__/ colocated with source

## Architecture
- API routes in src/api/
- Business logic in src/services/
```

Claude Code reads this at the start of every session. It also builds **auto-memory** — learning build commands, debugging insights, and project conventions as it works.

### Hooks
Run shell commands before or after Claude Code actions:

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{"type": "command", "command": "prettier --write ${CLAUDE_TOOL_INPUT_FILE_PATH}"}]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [{"type": "command", "command": "npm run lint"}]
      }
    ]
  }
}
```

### Sub-Agents — Parallel Task Execution
Spawn multiple Claude Code agents working simultaneously:

```bash
claude "audit all services for security issues, checking each in parallel"
```

A lead agent coordinates, assigns subtasks to sub-agents, and merges results.

### Routines & Scheduling
Run Claude on a schedule — even when your computer is off:

- **Routines:** Runs on Anthropic infrastructure. Trigger by schedule, API call, or GitHub events.
- **Desktop scheduled tasks:** Run on your machine with local file access.
- **`/loop`:** Repeat a prompt within a CLI session for quick polling.

### Remote Control & Channels
- **Remote Control:** Continue sessions from your phone or any browser
- **Channels:** Push events from Telegram, Discord, iMessage, or custom webhooks into sessions
- **Dispatch:** Send tasks from your phone, execute on your desktop

## Claude Code vs Cursor vs Copilot

| Feature | Claude Code | Cursor | GitHub Copilot |
|---|---|---|---|
| **Primary interface** | Terminal CLI | IDE fork (VSCode-based) | IDE extension |
| **Model** | Claude Opus 4.7 / Sonnet 4.6 | Claude Sonnet + GPT-4o | GPT-4o + Codex |
| **Codebase awareness** | 1M context, reads all files | `.cursorrules` context | Repository context |
| **Git integration** | Native: commits, PRs, branches | Built-in source control | Copilot Chat in PRs |
| **Multi-file edits** | Full project scope | Multi-file via inline | Context-limit aware |
| **Terminal commands** | Full shell access | Limited terminal pane | No terminal |
| **Pricing** | Pay-per-token (API) or Pro plan | $20-40/mo subscription | Free tier + $10-20/mo |
| **Custom workflows** | Skills + Hooks + CLAUDE.md | `.cursorrules` | Copilot instructions |
| **CI/CD** | GitHub Actions, GitLab CI/CD | None | GitHub-native |
| **Sub-agents** | Yes (parallel tasks) | No | No |
| **Desktop app** | Yes | No | No |

> **Best combo:** Cursor for daily IDE work, Claude Code for complex refactors, Copilot for inline completions. See the [Coding Tools Comparison](/reference/cheatsheets/coding-assistants-agents) for benchmarks.

## Pricing

| Plan | What You Get | Cost |
|---|---|---|
| **Claude Pro** | Claude Code access on 1 surface | $20/mo |
| **Claude Max** | Claude Code across all surfaces + extended usage | $100/mo (individual) or $200/mo (team) |
| **API (Console)** | Pay-per-token via Anthropic Console | Opus $5/$25, Sonnet $3/$15, Haiku $1/$5 per 1M |
| **Enterprise** | Custom plans, volume discounts | Contact sales |

---
title: Agent Skills
description: How agent skills work in the Claude ecosystem — the SKILL.md open standard, project-level vs user-level skills, sub-agents, and how skills differ from MCP and tools.
sidebar:
  order: 5
tags:
  - claude
  - agent-skills
  - claude-code
  - mcp
glossaryLinks:
  - agent
  - tool-use
tldr:
  - "Agent Skills teach Claude Code how to approach specific tasks — packaged as SKILL.md markdown files"
  - "Skills are playbooks (process knowledge) — MCP servers are verbs (live data/actions)"
  - "32+ tools support the SKILL.md standard, including VS Code, Copilot, Cursor, and Gemini CLI"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

> **This is a Claude-specific overview.** For the complete deep-dive — including the SKILL.md format, skills vs tools vs MCP, sub-agent orchestration, and the full ecosystem — see **[Agent Skills — Full Deep Dive](/deep-dive/agent-skills/)**.

## What Are Agent Skills?

An agent skill is a packaged set of instructions that teaches Claude Code *how to approach* a specific kind of task. Write a `SKILL.md` file, place it in `.claude/skills/`, and every developer on your team automatically gets the same workflow.

Skills started inside **Claude Code** (October 2025) and became an **open standard by Anthropic** (December 2025). Within 48 hours, Microsoft integrated it into VS Code and Copilot. OpenAI added it to Codex CLI and ChatGPT. By early 2026, 32+ tools support the same `SKILL.md` format.

## Quick Setup (Claude Code)

```bash
# Project-level skills (shared via git)
.claude/skills/
  generate-migration/
    SKILL.md

# User-level skills (your machine only)
~/.claude/skills/
  my-custom-workflow/
    SKILL.md
```

Minimal `SKILL.md`:
```markdown
---
name: generate-migration
description: Generate database migration files for schema changes
---

## Process
1. Read the schema change request
2. Check existing migrations for naming convention
3. Generate the up/down migration files
4. Run `npm run migrate:check` to validate
5. Commit with message: "migration: {description}"
```

## Skills vs MCP — When to Use Which

| Use a **Skill** when... | Use **MCP** when... |
|---|---|
| You have a repeatable process | You need live data (database, API) |
| Knowledge is stable for weeks | State changes per request |
| The task involves judgment calls | The task is deterministic |
| You want a playbook, not an API | You want a data connector |

They work best together. A "Comparable Company Analysis" skill defines the methodology — which metrics matter, the output format. An MCP server fetches live financial data. The skill orchestrates; the MCP delivers.

## Going Deeper

The **[full Agent Skills deep dive](/deep-dive/agent-skills/)** covers:
- The complete SKILL.md format with all sections
- Advanced examples with scripts and assets
- Sub-agents and orchestration patterns
- When to use skills vs tools vs MCP
- The ecosystem of 32+ supporting tools

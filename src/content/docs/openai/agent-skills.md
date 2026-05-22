---
title: Agent Skills
description: How OpenAI supports the SKILL.md agent skills standard — Codex skills, Agents SDK skills, portability across 32+ tools, and when to use skills vs MCP vs function calling.
sidebar:
  order: 5
tags:
  - openai
  - agent-skills
  - codex
  - mcp
glossaryLinks:
  - agent
  - tool-use
tldr:
  - "OpenAI fully supports the SKILL.md open standard — same format as Anthropic's Agent Skills"
  - "Skills are portable across Codex, Claude Code, Cursor, Copilot, and 32+ other tools"
  - "Use Skills for repeatable workflows, MCP for live data, Function Calling for deterministic actions"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

> **This is an OpenAI-specific overview.** For the complete deep-dive — including the SKILL.md format, skills vs tools vs MCP, sub-agent orchestration, and the full ecosystem — see **[Agent Skills — Full Deep Dive](/deep-dive/agent-skills/)**.

## OpenAI's SKILL.md Support

OpenAI adopted the SKILL.md open standard within 48 hours of Anthropic's December 2025 release. Codex, the Agents SDK, and ChatGPT all read the same `SKILL.md` files from the same directory layout.

```bash
# Same format works across Codex, Claude Code, and Cursor
.codex/skills/         # Codex
.claude/skills/        # Claude Code
.cursor/skills/        # Cursor
```

## Codex Skills

```markdown
---
name: review-security
description: Audit code for OWASP Top 10 vulnerabilities
---

## Process
1. Scan changed files for common vulnerability patterns
2. For each finding, assess severity (Critical/High/Medium/Low)
3. Provide CWE reference and remediation code
4. Output as a GitHub issue with labels
```

## Agents SDK Skills

```python
from agents import Agent, Skill

agent = Agent(
    name="Security Auditor",
    model="gpt-5.4-mini",
    skills=[Skill.from_file(".codex/skills/review-security/SKILL.md")]
)
```

## Portability

A skill written for Claude Code works in Codex and vice versa. The 32+ tools supporting SKILL.md include:

- Codex, Claude Code, Cursor, GitHub Copilot, VS Code
- Windsurf, Aider, JetBrains Junie, AWS Kiro, Amp
- Google Gemini CLI, ChatGPT

## Going Deeper

The **[full Agent Skills deep dive](/deep-dive/agent-skills/)** covers:
- The complete SKILL.md format with all sections
- Advanced examples with scripts and assets
- Sub-agents and orchestration patterns
- When to use skills vs MCP vs function calling

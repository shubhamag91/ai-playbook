---
title: Agent Skills
description: What agent skills are, how they differ from tools and MCP, the SKILL.md open standard, sub-agents and orchestration patterns, and how to write and use skills across Claude Code and other AI coding agents.
sidebar:
  order: 5
  badge:
    text: New
    variant: tip
tags:
  - agents
  - tools
  - claude-code
  - skills
  - mcp
lastUpdated: 2026-05-20
nextVerificationDue: 2026-11-20
---

## What Are Agent Skills?

An **agent skill** is a packaged set of instructions that teaches an AI coding agent *how to approach* a specific kind of task. Rather than wiring up a new API endpoint (as you would with a tool or MCP server), you write a Markdown file that says: "When the user asks for X, here is the process, the judgment calls, and the conventions to follow."

The canonical format is a folder containing a **`SKILL.md`** file — a short YAML header plus freeform instructions. The agent reads those instructions the same way it reads your codebase: as context that shapes its next action.

Skills started inside **Claude Code** (released October 2025) and were released as an **open standard by Anthropic in December 2025**. Within 48 hours of the open standard announcement, Microsoft integrated it into VS Code and GitHub Copilot, and OpenAI added it to Codex CLI and ChatGPT. By early 2026, over 32 tools from competing companies — Google Gemini CLI, JetBrains Junie, AWS Kiro, Block's Goose, Cursor, Amp, and others — all read the same `SKILL.md` files from the same directory layout.

---

## Skills vs Tools vs MCP

These three abstractions are often confused because they all "give the agent more capability". They operate at different layers.

| | **Tools / Function Calling** | **MCP (Model Context Protocol)** | **Agent Skills (SKILL.md)** |
|---|---|---|---|
| **What it provides** | A callable function with typed inputs/outputs | Access to external systems (databases, APIs, services) | Procedural knowledge: how to think about a task |
| **Implementation** | JSON schema + server-side code | Separate process, JSON-RPC protocol | A Markdown file (+ optional scripts/assets) |
| **Agent's challenge** | Which tool to call and with what args | Which server endpoint to call | Which skill to load, and how to follow its instructions |
| **Determinism** | High — one API call, one result | High — live data returned | Lower — agent interprets the instructions |
| **Requires runtime?** | Yes (function must execute somewhere) | Yes (MCP server must be running) | No — just text files on disk |
| **Best for** | Atomic actions: search, send, write file | Live data: query DB, call external API | Multi-step workflows, judgment calls, house style |

A useful mental model: **MCP servers are verbs** (do this action, fetch this data). **Skills are playbooks** (when you encounter X, reason through it this way).

They work best together. A "Comparable Company Analysis" skill defines the methodology — which metrics matter, the output format, compliance standards — while an MCP server fetches live financial data. The skill orchestrates; the MCP delivers.

---

## The SKILL.md Format

A skill is a **folder** whose name becomes the skill's identifier. At minimum it contains one file:

```
~/.claude/skills/
└── pr-review/
    └── SKILL.md
```

The `SKILL.md` file has two sections:

```markdown
---
name: pr-review
description: Reviews a pull request for correctness, style, and test coverage.
  Use when the user asks to review a PR, check code changes, or wants a second opinion on a diff.
---

## What to check

1. **Correctness** — Does the logic match the intent described in the PR title/description?
2. **Tests** — Are new code paths covered? Are edge cases handled?
3. **Style** — Follows project conventions (check CLAUDE.md if present).
4. **Security** — Any new inputs validated? Dependencies pinned?

## Output format

Lead with a one-sentence verdict, then bullet each finding with severity: `🔴 blocker`, `🟡 suggestion`, `🟢 praise`.
```

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | Must match the folder name |
| `description` | Yes | ≤ 1,024 chars. This is what the agent reads first to decide if the skill is relevant — write it as a trigger condition |

The description is the key field. The agent scans all skill descriptions on startup without loading the full content (**token-efficient discovery**). Only when it judges a skill relevant does it load the full instructions.

### Optional extras

A skill folder can include scripts, templates, and reference data:

```
.claude/skills/
├── generate-changelog/
│   ├── SKILL.md
│   └── scripts/
│       └── parse_commits.py
└── api-client/
    ├── SKILL.md
    ├── templates/
    │   └── client.ts.j2
    └── references/
        └── openapi-conventions.md
```

The `SKILL.md` instructions tell the agent when and how to use these files. Scripts give the skill deterministic, executable sub-tasks (e.g. parse a commit log) while keeping the high-level reasoning in natural language.

---

## Where Skills Live

Skills can be scoped at two levels:

| Location | Scope | Shared? |
|---|---|---|
| `~/.claude/skills/` | Global — available in every project | No (personal) |
| `.claude/skills/` | Project-local — committed to the repo | Yes (whole team) |

Project-local skills are how teams standardise workflows. Commit a `generate-migration/SKILL.md` to `.claude/skills/` and every developer using a supported agent gets the same migration workflow automatically.

---

## Invoking Skills

Skills can be triggered in two ways:

**Explicit** — type the skill name as a slash command:
```
/pr-review
```

**Implicit** — the agent reads the description and loads the skill automatically when it judges it relevant to what you're asking. For example, if your description says *"Use when the user asks to review a PR"*, the agent will activate it when you say "Can you check this diff?"

---

## Real-World Examples

**Enforce commit message style**
```markdown
---
name: commit
description: Writes a git commit message. Use whenever the user asks to commit, stage changes, or write a commit message.
---
Follow conventional commits: `type(scope): short summary`.
Types: feat, fix, docs, refactor, test, chore.
- Summary ≤ 72 chars, imperative mood ("add" not "added")
- Body explains *why*, not *what*
- Always include `Co-Authored-By:` if pairing
```

**Run a safe DB migration**
```markdown
---
name: db-migrate
description: Applies a database migration safely. Use when the user creates or modifies migration files.
---
1. Check migration is reversible (has a `down` function).
2. Run `npm run migrate:dry` first — abort if errors.
3. Back up affected tables: `pg_dump -t <table> > /tmp/pre-migration.sql`
4. Apply: `npm run migrate`
5. Verify row counts haven't dropped unexpectedly.
```

**House style for PR descriptions**
```markdown
---
name: pr-description
description: Writes a pull request description. Use when opening a PR or when the user asks to draft a PR description.
---
Structure:
## What changed
(1–3 bullets, present tense)

## Why
(1 sentence: the motivation or ticket link)

## Test plan
(Checklist of what to verify manually or via CI)
```

---

## Ecosystem Adoption (2026)

The open standard means a skill you write today works across all these agents without modification:

- **Anthropic** — Claude Code
- **Microsoft** — VS Code Copilot, GitHub Copilot
- **OpenAI** — Codex CLI, ChatGPT
- **Google** — Gemini CLI
- **JetBrains** — Junie
- **AWS** — Amazon Kiro
- **Block** — Goose
- **Cursor**, **Windsurf**, **Amp**, **OpenCode**, and 20+ others

The specification lives at **agentskills.io** and is intentionally minimal — YAML frontmatter + Markdown. No new syntax to learn.

---

## Sub-Agents

A **sub-agent** is a child agent instance spawned by a parent (orchestrator) agent to handle a delegated task. The orchestrator retains overall responsibility for the goal; the sub-agent focuses on one well-defined piece of it.

This is the same concept as "hierarchical agents" in multi-agent theory, but grounded in how modern coding tools actually implement it.

### How it works

```
User: "Review all 8 PRs opened today"

Orchestrator agent
  ├─ spawns sub-agent A → reviews PR #101
  ├─ spawns sub-agent B → reviews PR #102
  ├─ spawns sub-agent C → reviews PR #103
  └─ (all run in parallel)

Orchestrator collects results → writes summary
```

The sub-agents run independently. They each see only their slice of work and have no awareness of each other. The orchestrator assembles the results.

### Why spawn a sub-agent instead of doing it inline?

| Reason | Example |
|---|---|
| **Parallelism** | Reviewing 8 PRs at once is ~8x faster than sequential |
| **Isolation** | Sub-agent makes code changes in a separate git worktree — parent's working directory is untouched |
| **Context protection** | Delegating deep research keeps the orchestrator's context window clean |
| **Specialisation** | Route tasks to agents configured for a specific job (search-only, read-only, etc.) |

### Specialised agent types

Rather than spawning a generic agent, orchestrators can target purpose-built types that come with tighter tool permissions and tuned system prompts:

| Type | Best for |
|---|---|
| **Explore** | Fast read-only codebase search — finding files, symbols, references |
| **Plan** | Designing implementation strategies; returns a step-by-step plan |
| **General-purpose** | Catch-all for multi-step tasks that don't fit a narrower type |
| **Custom** | Domain-specific agents you define via the Agent SDK with their own skill sets |

### Isolation modes

Sub-agents can run in an **isolated git worktree** — a temporary copy of the repository on a separate branch. The sub-agent's file edits don't touch the main working directory. If the sub-agent makes no changes, the worktree is cleaned up automatically; if it does, the branch path is returned so the orchestrator can review or merge.

This makes it safe to let a sub-agent attempt a refactor or generate a fix without risking the parent's in-progress work.

### Skills + sub-agents together

Skills and sub-agents are complementary:

- A **skill** defines *how* to do a task (methodology, conventions, output format).
- A **sub-agent** defines *who* does the task (isolated, parallel, specialised).

A `pr-review` skill loaded into a sub-agent gives you both: the sub-agent handles isolation and parallelism; the skill ensures every review follows the same checklist and output format.

```
Orchestrator loads pr-review skill
  └─ for each PR: spawn sub-agent(worktree=isolated) + pr-review skill
       → consistent reviews, fully parallel, no cross-contamination
```

### When not to use sub-agents

Sub-agents start cold — they have no memory of the current conversation and must re-derive context from your prompt. The overhead is real. Skip them when:

- The task takes fewer than 3–4 tool calls to complete
- You need the result immediately and can't do other work in parallel
- The task requires back-and-forth with you (sub-agents are one-shot)
- The same search you'd delegate can be done with a single `grep` or `find`

---

## When to Use What

| Situation | Use |
|---|---|
| You need live data (database, API, web) | MCP server |
| You need a specific atomic action (send email, run shell command) | Tool / function call |
| You have a multi-step workflow or judgment-heavy process | Skill |
| You need parallel execution of independent tasks | Sub-agent |
| You need file changes isolated from the current working tree | Sub-agent with worktree isolation |
| Knowledge is stable (changes weekly, not per-request) | Skill |
| You want the whole team to share a process | Project skill in `.claude/skills/` |
| Personal shortcuts and preferences | Global skill in `~/.claude/skills/` |

> **Rule of thumb:** if you could write it in a runbook and have it be right for weeks, it's a skill. If it needs to fetch live state, it's a tool or MCP. If it can run independently and in parallel, it's a sub-agent.

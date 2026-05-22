---
title: MCP & Integrations
description: OpenAI's MCP support — Model Context Protocol for connecting AI to external tools. MCP Apps in ChatGPT, Secure MCP Tunnel, Connectors, ChatGPT Actions, and building custom integrations.
sidebar:
  order: 6
tags:
  - openai
  - mcp
  - integration
  - chatgpt
  - connectors
glossaryLinks:
  - api
  - agent
  - tool-use
tldr:
  - "OpenAI supports MCP across Codex, ChatGPT, and the Agents SDK — same protocol as Anthropic"
  - "MCP Apps in ChatGPT: Build interactive apps that run inside ChatGPT's interface using MCP"
  - "ChatGPT Connectors: Connect to Google Drive, Slack, Notion, and 200+ services"
  - "Secure MCP Tunnel: End-to-end encrypted connection for remote MCP servers"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

OpenAI supports the Model Context Protocol across its entire platform. The same MCP servers work with Codex, ChatGPT, the Agents SDK, and any MCP-compatible client.

## MCP in Codex

Codex reads `.codex/mcp.json` and automatically connects to configured servers:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"]
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"]
    }
  }
}
```

```bash
codex "find all open PRs that need review, check the code quality, and comment on each"
```

## MCP Apps in ChatGPT

The **ChatGPT Apps SDK** lets you build interactive MCP-powered apps that run inside ChatGPT's interface:

```python
# Build a restaurant reservation app as an MCP server
from chatgpt_apps import ChatGPTApp

app = ChatGPTApp("restaurant-reservation")

@app.tool()
def find_tables(restaurant: str, date: str, party_size: int):
    """Find available tables at a restaurant."""
    # Your reservation system logic
    return {"tables": [{"time": "7:00 PM", "seats": 4}]}

@app.tool()
def book_table(restaurant: str, date: str, time: str, party_size: int):
    """Book a table."""
    return {"confirmation": "CONF-12345"}
```

Users can then say: "Book a table for 4 at Per Se tomorrow at 7 PM" — and your MCP app handles it inside ChatGPT.

## ChatGPT Connectors

Connect ChatGPT to your tools and data without writing code:

| Connector | What It Enables |
|---|---|
| **Google Drive** | Search and read documents |
| **Slack** | Search channels, send messages |
| **Notion** | Query and update pages |
| **GitHub** | Browse repos, manage issues |
| **Jira** | Create and update tickets |
| **Linear** | Manage project issues |

## Secure MCP Tunnel

For remote/cloud MCP servers, OpenAI provides end-to-end encryption:

```bash
# Start a secure tunnel from your local MCP server to ChatGPT
openai mcp tunnel \
  --server "npx -y @modelcontextprotocol/server-postgres" \
  --name "production-db"
```

This enables ChatGPT to connect to databases and services behind your firewall without exposing them to the internet.

## ChatGPT Actions

Actions let you add custom capabilities to ChatGPT without building a full MCP app:

```json
{
  "action": {
    "name": "get_stock_price",
    "description": "Get current stock price by ticker symbol",
    "endpoint": "https://your-api.com/stock-price",
    "parameters": {
      "ticker": { "type": "string", "description": "Stock ticker symbol" }
    }
  }
}
```

## Ecosystem Comparison

| Protocol | What It Does | Supported By |
|---|---|---|
| **MCP** | Connect AI to external tools and data | OpenAI, Anthropic, VS Code, Cursor, 32+ tools |
| **ChatGPT Actions** | Add custom capabilities to ChatGPT | ChatGPT |
| **ChatGPT Apps SDK** | Build interactive MCP apps in ChatGPT | ChatGPT |
| **Function Calling** | Model-triggered API calls | All OpenAI API models |
| **SKILL.md** | Teach agents repeatable workflows | Codex, Claude Code, Cursor, Copilot |

For the MCP protocol in general (architecture, building servers, security), see the [Claude MCP page](/claude/mcp).

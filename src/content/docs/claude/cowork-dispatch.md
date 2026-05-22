---
title: Claude Cowork & Dispatch
description: Claude Cowork — autonomous computer use for knowledge work. Claude Dispatch — mobile-to-desktop workflow layer. How they work, setup, use cases, limitations, and pricing.
sidebar:
  order: 7
tags:
  - claude
  - cowork
  - dispatch
  - computer-use
  - mobile
glossaryLinks:
  - agent
  - tool-use
tldr:
  - "Cowork: Give Claude a goal and it works autonomously on your computer — files, apps, browser. Jan 2026 research preview"
  - "Dispatch: Text tasks from your phone via Claude mobile app → Claude executes on your desktop with full computer control"
  - "Both are Mac-only (macOS) and require Claude Max/Pro subscription"
lastUpdated: 2026-05-22
nextVerificationDue: 2026-08-22
---

## Claude Cowork — Autonomous Computer Use

**Status:** Research preview (January 2026)  
**Availability:** Claude Max and Pro subscribers, macOS only

Claude Cowork lets you give Claude a goal and have it work autonomously on your computer — navigating files, using applications, browsing the web, and completing multi-step tasks while you do other work.

### How It Works

```
You: "Research our top 5 competitors' pricing and create a comparison spreadsheet"

Claude Cowork:
1. Opens browser, searches for competitor websites
2. Navigates to pricing pages, extracts data
3. Opens Numbers/Excel, creates spreadsheet
4. Formats, adds formulas, saves to your Documents folder
5. Messages you when done
```

### Use Cases

| Task | Description |
|---|---|
| **Research & reports** | Gather data from multiple sources, compile into documents |
| **Data entry & migration** | Transfer data between systems, clean spreadsheets |
| **File organization** | Sort, rename, categorize files across your system |
| **Multi-app workflows** | Chain actions across browser, office suite, and tools |
| **Learning & setup** | Walk through tutorials, configure software, test setups |

### Limitations (Research Preview)

- macOS only (no Windows/Linux yet)
- Requires explicit permission for each new app/website
- May struggle with complex UIs or non-standard interfaces
- Research preview may have occasional errors — not production-guaranteed
- Cannot handle authentication flows that require 2FA/MFA without user intervention

### Access & Pricing

| Plan | Cowork Access |
|---|---|
| **Claude Pro ($20/mo)** | Limited usage (research preview) |
| **Claude Max ($100/mo individual, $200/mo team)** | Extended usage, priority access |
| **API (Computer Use tool)** | Pay-per-use via `computer_20250124` tool |

---

## Claude Dispatch — Mobile-to-Desktop Workflow

**Status:** Launched March 2026  
**Availability:** Claude Max/Pro subscribers, macOS, Claude iOS app

Claude Dispatch bridges your phone and desktop. Text a task from the Claude mobile app — Claude executes it on your desktop with full computer control.

### How It Works

```
On your phone: "Download Q1 sales data from the dashboard, analyze trends,
                and draft a summary email to the team"

On your desktop: Claude Dispatch picks up the task, opens your browser,
                 navigates to the dashboard, downloads data, analyzes,
                 drafts the email, and saves as draft for your review.
```

### Use Cases

| From Your Phone | On Your Desktop |
|---|---|
| "Find that presentation from last month and email it to me" | Claude locates and sends the file |
| "Check if the Q3 report has been updated on the intranet" | Claude navigates, checks, reports back |
| "Schedule a team dinner for next Thursday at 7 PM" | Claude checks calendars, books reservation |
| "Download the latest competitor pricing PDFs" | Claude finds, downloads, organizes files |

### Setup

1. Install Claude Desktop app on your Mac
2. Sign in with your Claude Max/Pro account
3. Enable Dispatch in Desktop settings
4. On your iPhone, open Claude app → tap Dispatch
5. Text your task — it runs on your desktop

### Security & Privacy

- All operations run locally on your desktop
- You can review and approve actions before execution
- Session recording available for audit
- Data never leaves your machine unless explicitly sent

### Access & Pricing

| Plan | Dispatch Access |
|---|---|
| **Claude Pro ($20/mo)** | Limited daily usage |
| **Claude Max ($100/mo)** | Extended usage, background execution |
| **Claude Max Team ($200/mo/seat)** | Full access, admin controls |

---

## Cowork vs Dispatch vs Claude Code — What to Use When

| Task | Best Tool | Why |
|---|---|---|
| Write code, fix bugs, refactor | **Claude Code** | Purpose-built for development workflows |
| Research across the web, compile data | **Cowork** | Multi-app autonomy, browser interaction |
| Quick tasks from your phone | **Dispatch** | Mobile convenience, desktop execution |
| Automate repeated file operations | **Cowork** | Persistent sessions, learns patterns |
| Review code in VS Code | **Claude Code (IDE)** | Inline diffs, @-mentions, context |
| Schedule recurring analysis | **Cowork + Routines** | Runs on schedule, even when offline |

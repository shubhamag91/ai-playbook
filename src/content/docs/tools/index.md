---
title: AI Tools Navigator
description: What tool to use for what job. Quick decision trees and tool pairings for every workflow.
tags:
  - tools
  - reference
glossaryLinks:
  - llm
  - inference
  - prompt
lastUpdated: 2026-05-10
nextVerificationDue: 2026-06-09
---

Finding the right AI tool is like choosing the right hammer  -  most tasks have a best tool, but many tools work.

This page answers: "I want to [task]. What should I use?"

---

## By Workflow

For a comprehensive feature matrix with costs, limitations, and decision trees, see the [Tools Guide](/decide/tools/guide/).

### I want to write something

**Best tools, ranked:**
1. **Claude.ai**  -  Best prose quality, long documents, essays
2. **ChatGPT**  -  Faster iteration, creative writing
3. **Grammarly**  -  Real-time grammar + style as you type
4. **NotebookLM**  -  Research synthesis from documents

**Cost:** $20/mo for one Pro plan covers most needs

---

### I want to code or refactor

**Best tools, ranked:**
1. **Cursor**  -  IDE, largest codebases, multi-file refactors ($20-40/mo)
2. **Claude Code**  -  Complex reasoning, included with Claude Pro ($20/mo) or Claude Max ($100-200/mo); also pay-per-use via API
3. **GitHub Copilot**  -  Simplest setup, team-friendly (Free or $20/mo)
4. **Aider**  -  Git-native, reliable commits (Free + API costs)

**Pro tip:** Use Cursor for daily work + Claude Code for complex refactors (complementary strengths)

---

### I want to research something

**Best tools, ranked:**
1. **Gemini**  -  Largest context (1M tokens), $20/mo
2. **Perplexity**  -  Always cites sources, $20/mo Pro
3. **Claude.ai**  -  Great for analyzing documents you upload
4. **NotebookLM**  -  Turn docs into audio notes, free

**Pro tip:** Use Gemini for long documents, Perplexity for current events

---

### I want to create images

**Best tools, ranked:**
1. **Midjourney**  -  Highest quality, $10-60/mo
2. **DALL-E 3**  -  In ChatGPT, included with Plus
3. **Flux**  -  Open-source, free to run locally (API also available at $0.05-0.10/image)
4. **Runway**  -  Video + image generation, $12+/mo

**Cost:** Midjourney for serious work, DALL-E for quick iterations

**For real design work:**
- **Figma + Claude**  -  Describe design in Claude, paste into Figma. Iterate fast.
- **Cursor**  -  Design tokens, components, CSS generation. Great for code-based design.

---

### I want to create videos

**Best tools, ranked:**
1. **Runway**  -  Edit + generate, full control ($12+/mo)
2. **Sora**  -  Photorealistic, included in ChatGPT Pro
3. **Veo 3.1**  -  Fast, included in Gemini Ultra

**Reality check:** Video generation is still nascent. Expect 30-60 sec clips, not full videos.

---

### I want to automate workflows

**Best tools, ranked:**
1. **Zapier**  -  Easy visual builder, 5,000+ apps ($0-20+/mo)
2. **n8n**  -  Open-source, self-hosted for free
3. **Make**  -  More powerful than Zapier, steeper learning curve

**Reality check:** Start with Zapier for speed, move to n8n if you need control

**Example flows (Zapier):**
- Slack message with keyword → Save to Google Sheet + send to Notion database
- Email from important contact → Slack notification + AI summary (via ChatGPT)
- Form submission → Google Sheet + thank-you email (auto-personalized with Claude)
- Calendar event created → Auto-generate prep document using Claude

---

### I want to generate music or audio

**Best tools, ranked:**
1. **Suno**  -  Music generation, free + $10/mo ($0-10/mo)
2. **ElevenLabs**  -  Voice-overs, natural sounding ($5+/mo)
3. **OpenAI TTS**  -  Simple text-to-speech, pay per use

**Use case:** Suno for background music, ElevenLabs for voiceovers

---

### I want to build a web app fast

**Best tools, ranked:**
1. **Lovable**  -  Full-stack app builder, generates and hosts complete apps
2. **Vercel v0**  -  UI component generator, copy-paste into existing project
3. **Cursor + code**  -  Full control, steeper learning curve

**Reality:** Lovable for complete MVPs, v0 for UI components, Cursor + code for custom features

---

### I want to analyze data

**Best tools, ranked:**
1. **Claude Artifacts**  -  Write code, visualize results, best reasoning
2. **NotebookLM**  -  Summarize + synthesize documents
3. **Google Sheets + Gemini**  -  Quick sheet analysis

**Cost:** Pay-per-token for Claude, free for NotebookLM

---

### I want to manage my knowledge or take notes

**Best tools, ranked:**
1. **Obsidian + Claude**  -  Local-first notes. Paste into Claude for synthesis, insights. Private.
2. **Notion AI**  -  Integrated AI. $20/mo Notion Plus adds AI features.
3. **Coda**  -  Doc + database + AI. $12+/mo. Best for complex knowledge.

**Workflow:** Obsidian for thinking, Claude for synthesis, Notion for team sharing.

**For teams:**
- **Notion**  -  Still the standard for team wikis and documentation.
- **Coda**  -  Nimbler than Notion. Better formulas, stronger AI support.

---

### I want to capture and manage meetings

**Best tools, ranked:**
1. **Otter.ai**  -  Record → transcribe → summarize automatically. $10-30/mo. Best quality.
2. **Fathom**  -  Zoom + Teams recorder + AI summaries. Free + paid tiers.
3. **ChatGPT**  -  Paste meeting transcript, ask for highlights. Simple but effective.

**Pro move:** Record meeting → Otter.ai → share summary in Slack. Saves 30 min per meeting.

**For email:**
- **Gmail + Claude**  -  Paste email thread into Claude, ask it to draft a response.
- **Grammarly**  -  Tone suggestions right in Gmail. Makes writing faster.

---

## Tool Pairing Strategies

**Daily driver combo (most users):**
- Chat: Claude.ai (best writing) + ChatGPT (web search)
- Coding: Cursor (daily) + Claude Code (complex)
- Research: Gemini (long) + Perplexity (sources)
- Create: Midjourney (images) + Suno (music)
- Automate: Zapier
- **Total:** ~$100/mo

**Budget combo ($40/mo):**
- Claude.ai Pro ($20)
- Cursor ($20)
- Everything else: free tiers
- **Total:** $40/mo for 90% of use cases

**Premium combo (no budget):**
- Claude Pro + ChatGPT Pro + Cursor + Claude Code
- Midjourney + Runway
- Gemini Ultra + Perplexity Pro
- **Total:** $200-300/mo + API costs

---

## Quick Reference: Tool Costs

For a complete feature matrix with costs, limitations, and decision trees, see the [Tools Guide](/decide/tools/guide/). For interactive cost estimation, use the [Cost Calculator](/decide/cost-calculator/).

---

## May 2026 Updates

For the latest model releases and pricing changes, see [What's New](/research/whats-new/).

---

## Quick Reference: Tool Costs

| Tool | Cost | Best for |
|---|---|---|
| Claude.ai | $20/mo | Writing, long docs |
| ChatGPT | $20/mo | General tasks, web search |
| Gemini | $20/mo | Very long documents |
| Cursor | $20/mo | Coding IDE |
| GitHub Copilot | $20/mo | Code, team setup |
| Midjourney | $10-60/mo | Image quality |
| Suno | Free + $10/mo | Music generation |
| Zapier | Free + $20+/mo | Automation |
| Perplexity | $20/mo | Cited research |
| ElevenLabs | $5+/mo | Voice-overs |

Most people need: 1 chat tool ($20) + 1 coding tool ($20) = $40/mo baseline

---

## The 90% Stack (By Role)

**For writers/analysts:**
- Claude.ai Pro ($20)
- NotebookLM (free)
- Grammarly ($12)
- **Total:** $32/mo

**For developers:**
- Cursor ($20)
- Claude Code (included with Pro, ~$20/mo)
- GitHub Copilot (free tier or $20/mo)
- **Total:** $20-40/mo

**For creators (design/video):**
- Midjourney ($20)
- Runway ($12)
- Cursor ($20)
- **Total:** $52/mo

**For small teams:**
- Notion AI ($20/mo per seat)
- Zapier ($20)
- Slack (free/paid)
- **Total:** $40/mo baseline

---

## General Productivity Principles

1. **Batch similar tasks**  -  Write all summaries at once, not one-by-one
2. **Use Claude for thinking, ChatGPT for doing**  -  Claude for strategy, ChatGPT for quick execution
3. **Automate the repetitive**  -  If you do it twice, automate it
4. **Don't optimize tools, optimize workflows**  -  The best tool is useless if it doesn't fit your process
5. **Free tiers first**  -  Try NotebookLM, Suno, Figma free before paying

---

## Pro Tips

1. **Start with one tool**  -  Master Claude or ChatGPT before adding more
2. **Use free tiers first**  -  Every major tool has a free tier; try before buying
3. **Combine complementary tools**  -  Cursor (daily) + Claude Code (complex) beats any single tool
4. **Pay for what you use most**  -  If you code daily, Cursor is worth it. If you research, Gemini is worth it.
5. **Check for discounts**  -  Some tools offer annual billing at 20% off

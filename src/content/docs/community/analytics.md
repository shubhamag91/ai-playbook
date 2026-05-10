---
title: Analytics
description: Site analytics setup and usage guide  -  privacy-first tracking with Cloudflare Web Analytics.
sidebar:
  order: 6
tags:
  - community
lastUpdated: 2026-05-10
nextVerificationDue: 2026-08-10
---

The AI Playbook uses **Cloudflare Web Analytics**  -  a privacy-first analytics platform that doesn't use cookies or collect personal data. No consent banner needed.

---

## Setup

1. Go to [Cloudflare Dashboard → Web Analytics](https://dash.cloudflare.com/)
2. Click **Add a site** and enter your domain
3. Copy the provided token
4. In `astro.config.mjs`, find the commented analytics block in the `head` section
5. Uncomment it and replace `YOUR_TOKEN` with your token:

```js
{
  tag: 'script',
  attrs: {
    defer: true,
    src: 'https://static.cloudflareinsights.com/beacon.min.js',
    'data-cf-beacon': '{"token": "YOUR_TOKEN"}',
  },
},
```

6. Deploy to Cloudflare Pages

---

## What Gets Tracked

- Page views (URL, referrer, browser, device type)
- Visit duration
- Bounce rate
- Geographic region (country-level, not city)

**Not tracked:** Cookies, personal data, scroll depth, mouse movements, keystrokes.

---

## Dashboard

Your analytics dashboard is at [Cloudflare Web Analytics](https://dash.cloudflare.com/). Key metrics to watch:

| Metric | What It Tells You | Good Sign |
|---|---|---|
| Page views | Which content is most popular | Top pages match what you prioritize |
| Visit duration | Are people reading or bouncing | Avg >2 minutes |
| Referrers | Where traffic comes from | GitHub, direct, search |
| Devices | Desktop vs mobile | <40% mobile (this is a reference site) |

---

## Weekly Review

Add this to your weekly maintenance routine:

1. Check top 10 pages  -  do they reflect what's most useful?
2. Check referrers  -  any new sources of traffic?
3. Check mobile percentage  -  optimize if >50%
4. Compare week-over-week  -  any sudden drops?

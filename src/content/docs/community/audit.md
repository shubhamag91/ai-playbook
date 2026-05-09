---
title: Content Audit
description: Tracking table of all pages with review dates and tier assignments.
sidebar:
  order: 5
tags:
  - community
lastUpdated: 2026-05-10
nextVerificationDue: 2026-08-10
---

import ContentAudit from '../../../components/ContentAudit.astro';

# Content Audit

Complete tracking of all pages, their tier assignments, and verification schedules. Updated automatically at build time.

<ContentAudit />

## Review Schedule

| Tier | Cadence | Pages | How to Review |
|---|---|---|---|
| **T1 — Monthly** | Every 30 days | Pricing, tools, comparisons | Check official pricing pages, verify model names |
| **T2 — Quarterly** | Every 90 days | Deep dives, learn paths, resources | Spot-check accuracy, update lastUpdated |
| **T3 — Annual** | Every 365 days | Glossary, history, diagrams | Verify no major shifts, update lastUpdated |

The [stale-content workflow](/.github/workflows/stale-content.yml) automatically checks `nextVerificationDue` dates every Monday and creates an issue if any page is overdue.

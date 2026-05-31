# AI Playbook Roadmap 2026

**Last Updated:** May 14, 2026  
**Maintained by:** Shubham (@shubhamag91)  
**Status:** Active Development

---

## 📊 Vision

Transform AI Playbook from a **documentation site** into a **knowledge product** that:
- Remains accurate and current (automated freshness tracking)
- Guides users by role (learner, builder, interviewer)
- Provides decision frameworks, not just information
- Scales to 200+ pages without degradation

---

## 🎯 Quarterly Breakdown

### Q2 2026 (May - June) — FOUNDATION & CREDIBILITY
**Goal:** Fix accuracy issues, prevent content decay, complete missing sections

#### Immediate Fixes (Week 1-2) ✅
- [x] Accuracy corrections (Claude Code, v0, Gemini, Cursor, Lovable, Flux)
- [x] Restore /open-source page with May 2026 models
- [x] Set up automated monitoring (GitHub Actions)
- [x] Create content audit checklist

**Lead Metrics:**
- 0 factual errors in /tools section
- All pricing verified in past 7 days
- Automated monitoring running

#### Content Completion (Week 3-4) ✅
- [x] Add homepage "Choose Your Path" selector
- [x] Create /updates changelog page
- [x] Add /benchmarks page (initial version)
- [x] Create decision frameworks (/tools, /models)

#### Pending Maintenance Items ⏳
- [x] **MOS-384**: Complete quiz-bank regeneration — all 24 sets fully generated, quality-fixed (no "all of the above", no length bias, no generic distracters), and two-batch generation architecture implemented to stay within Groq 6,000 TPM limit.

**Lead Metrics:**
- Beginner funnel completion rate
- Decision framework usage

---

### Q3 2026 (July - September) — FEATURES & GUIDANCE
**Goal:** Add learning paths, interactive elements, analytics

#### Learning Paths (Week 1-3)
- [ ] Beginner path (4-hour onramp)
- [ ] Interview prep path (2-week curriculum)
- [ ] Builder path (hands-on guide)
- [ ] Navigation auto-adjust by role

**Lead Metrics:**
- Path completion rates
- Time spent by path

#### Interactive Elements (Week 4-6)
- [ ] Benchmark selector (filterable table)
- [ ] Tool comparisons (interactive)
- [ ] Model selector (by use case)
- [ ] Cost calculator

**Lead Metrics:**
- Feature usage
- User interactions

#### Operations (Week 7+)
- [ ] Analytics setup (traffic, engagement, UX issues)
- [ ] Community contribution workflow
- [ ] Feedback loop ("Report outdated" button)

**Lead Metrics:**
- Content freshness detection rate
- Community PRs

---

### Q4 2026 (October - December) — OPTIMIZATION & SCALE
**Goal:** Competitive knowledge product, sustainable maintenance model

#### Version Control (Historical Tracking)
- [ ] Track definition changes over time
- [ ] Show "what changed since last month"
- [ ] Snapshots for different time periods

#### Personalization & Recommendation
- [ ] Role-based content customization
- [ ] "Continue reading" / progress tracking
- [ ] Smart recommendations ("See Also")

#### Performance & SEO
- [ ] SEO optimization (schema.org, Open Graph)
- [ ] Internal linking strategy
- [ ] Page speed optimization

#### Scale Planning
- [ ] Evaluate need for CMS (vs. Git-based)
- [ ] Plan content taxonomy for 200+ pages
- [ ] Consider multi-author contribution model

---

## 📋 ISSUE CATEGORIES & LABELS

### By Priority
- `priority:critical` — Blocks credibility (accuracy, freshness)
- `priority:high` — Improves UX significantly
- `priority:medium` — Nice-to-have features
- `priority:low` — Optimization, polish

### By Type
- `type:fix` — Accuracy, bugs, errors
- `type:feature` — New capability or page
- `type:docs` — Documentation, guides
- `type:automation` — Monitoring, CI/CD
- `type:chore` — Maintenance, refactoring

### By Effort
- `effort:small` — < 2 hours
- `effort:medium` — 2-6 hours
- `effort:large` — 6-20 hours
- `effort:xlarge` — 20+ hours

### By Area
- `area:content` — Written content, pages
- `area:ux` — User experience, navigation
- `area:tech-stack` — Infrastructure, tooling
- `area:operations` — Maintenance, monitoring

---

## 🚀 Getting Started

### For Contributors
1. Pick an issue from the roadmap
2. Comment to claim it
3. Create a branch: `feature/issue-name` or `fix/issue-name`
4. Submit PR when ready
5. Link PR to Linear issue

### For Reviewers
- Check factual accuracy against current sources
- Verify links work
- Test on mobile
- Check for tone/clarity

### For Maintainers
- Run weekly content audit (GitHub Actions)
- Review flagged content
- Triage new issues
- Update changelog

---

## 📊 Success Metrics

### Content Quality
- Factual accuracy: 99%+ verified claims
- Freshness: All core pages reviewed in past 30 days
- Completeness: 0 broken links, all sections filled

### User Engagement
- Time on site: 3+ minutes average
- Path completion: 40%+ of beginners complete learning path
- Return visitors: 30%+
- Bounce rate: < 50%

### Operations
- Stale content detection: 100% coverage
- Automated monitoring: runs weekly
- Community PRs: 2-4 per month
- Response time to "report outdated": < 48 hours

---

## 🎯 Known Constraints

1. **Single author (for now)** — Sustainability depends on automation
2. **Static content** — No real-time data (pricing updates are async)
3. **Scope creep risk** — Can grow to 200+ pages fast
4. **Maintenance burden** — AI moves quickly; needs weekly review minimum

---

## 📞 Contact & Questions

- **Owner:** Shubham (@shubhamag91)
- **Issues:** [GitHub Issues](https://github.com/shubhamag91/ai-playbook/issues)
- **Tracking:** [Linear Project](https://linear.app/mose/project/ai-playbook-465b771c0e0a)

---

## 📝 Version History

| Date | Update | Status |
|------|--------|--------|
| 2026-05-08 | Initial roadmap | PUBLISHED |

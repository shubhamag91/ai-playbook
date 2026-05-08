# AI Playbook — Maintenance Strategy

**Goal:** Keep the knowledge base current, accurate, and trustworthy without burning out the maintainer.

---

## 🔄 Maintenance Cadence

### Weekly (2-3 hours)
**Run:** Every Monday 9am

**Automated Tasks (GitHub Actions):**
- Scrape pricing from major vendors
- Check for new model releases
- Verify critical links
- Generate stale content report
- Create GitHub issues for needed updates

**Manual Review:**
- Review generated issues
- Spot-check 2-3 core pages
- Update changelog if needed

### Monthly (3-4 hours)
**Run:** First Sunday of each month

**Tasks:**
- Deep audit of top 5 pages by traffic
- Verify all pricing accuracy
- Check for new benchmarks/leaderboards
- Review and merge community PRs
- Update "Last Verified" dates

### Quarterly (8-10 hours)
**Run:** End of Q1, Q2, Q3, Q4

**Tasks:**
- Full content audit (all pages)
- Benchmark refresh
- Architecture review (IA scalability)
- Planning for next quarter
- Community feedback synthesis

---

## 📊 Content Freshness Tiers

### Tier 1: Critical (Update every 2 weeks)
- `/tools` — Pricing, new tools, capabilities
- `/open-source` — Model releases, benchmarks
- `/glossary` — Only if definitions change

**Why:** Users make purchasing decisions based on this

**Responsible:** Maintainer (can't automate)

### Tier 2: Important (Update monthly)
- `/cheatsheets` — Concepts evolve but slowly
- `/guides` — Frameworks and patterns
- `/confusions` — New misconceptions emerge

**Why:** Educational content must be current

**Responsible:** Maintainer + Community

### Tier 3: Stable (Update quarterly)
- `/history` — Append-only, rarely changes
- `/principles` — Timeless content
- `/diagrams` — Architecture patterns

**Why:** Foundation material, low change rate

**Responsible:** Maintainer on-demand

---

## 🤖 Automated Monitoring Setup

### GitHub Actions Workflows

#### 1. Weekly Content Audit
**File:** `.github/workflows/content-audit.yml`

```yaml
name: Weekly Content Audit
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday 9am

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check pricing changes
        run: |
          node scripts/check-pricing.js > pricing-report.txt
          
      - name: Check model releases
        run: |
          node scripts/check-models.js > model-report.txt
          
      - name: Check broken links
        run: |
          npx broken-link-checker --recursive --ordered https://ai-playbook-9y9.pages.dev > links-report.txt
          
      - name: Generate stale content report
        run: |
          node scripts/stale-content.js > stale-report.txt
          
      - name: Create GitHub issue if changes found
        if: env.NEEDS_UPDATE == 'true'
        run: |
          gh issue create \
            --title "Content audit: Updates needed" \
            --label "type:fix,priority:high" \
            --body-file stale-report.txt
```

#### 2. Link Checker
**Runs:** Daily at midnight

**Purpose:** Catch broken external links early

#### 3. Benchmark Leaderboard Monitor
**Runs:** Weekly (Thursday)

**Purpose:** Flag if model rankings have changed significantly

### Scripts to Create

#### `scripts/check-pricing.js`
```javascript
// Fetch pricing from canonical sources
// Compare against /src/content/docs/tools.md
// Flag any differences > 5%
// Output: pricing-report.txt
```

#### `scripts/check-models.js`
```javascript
// Check Anthropic, OpenAI, Google release notes
// Check Papers with Code for new benchmarks
// Flag new models, new leaderboards
// Output: model-report.txt
```

#### `scripts/stale-content.js`
```javascript
// Scan all .md files for lastUpdated dates
// Flag anything older than threshold
// Output: stale-report.txt with due dates
```

---

## 📋 Content Audit Checklist

### Monthly Verification
- [ ] `/tools` — Prices, tool list, descriptions
- [ ] `/open-source` — Model list, benchmarks, capabilities
- [ ] `/glossary` — Key term definitions (spot-check 10)
- [ ] `/cheatsheets/llm` — Model comparisons, benchmarks
- [ ] External links: All major links still working

### Quarterly Deep Audit
- [ ] Every page: Verify last-updated date is accurate
- [ ] Every page: Read full content, spot-check claims
- [ ] Every external link: Click and verify still relevant
- [ ] Benchmarks: Check if rankings have shifted
- [ ] Vendor announcements: Check for missed updates

---

## 🛠️ Tools & Integration

### Monitoring Tools
- **GitHub Actions** — Automated checks on schedule
- **Cloudflare Analytics** — Traffic, engagement metrics
- **Broken Link Checker** — Link health
- **Papers with Code API** — Benchmark changes
- **LLM Stats API** — Model releases

### Issue Triage
- **Linear** — Track maintenance issues
- **GitHub Issues** — Community reports
- **Email/Notifications** — Urgent alerts

---

## 👥 Community Contribution Workflow

### For Users Reporting Outdated Info

1. **Click "Report Outdated" button** (on every page footer)
2. **Auto-creates GitHub issue** with:
   - Page URL
   - Timestamp
   - Suggested update (optional)

3. **Maintainer reviews** within 48 hours

4. **Either:**
   - Acknowledge & fix immediately
   - Or: "Verified current, here's why"

### For Community PRs

1. **Contributor submits PR**
2. **Checklist:**
   - [ ] Links verified (not more than 6 months old)
   - [ ] Claims fact-checked against current sources
   - [ ] Written in existing tone/style
   - [ ] No major scope creep (keep to one page)
   
3. **Maintainer merges or requests changes**

---

## 📊 Metrics & Alerts

### Auto-Alert Triggers
- **Pricing change > 5%** → Create issue
- **New model release** → Create issue
- **Broken link detected** → Create issue
- **Page not reviewed > 6 weeks** → Create issue
- **New benchmark/leaderboard** → Create issue

### Dashboard (Monthly Review)
- Content freshness score (% reviewed in past 30 days)
- Accuracy score (% of claims fact-checked)
- Link health score (% working links)
- Community engagement (PRs, issues closed)

---

## 🚨 Emergency Procedures

### If Major Inaccuracy Found
1. **Assess impact** — How many readers affected?
2. **If critical:**
   - Fix immediately
   - Publish correction notice
   - Update changelog
3. **If minor:**
   - Fix in next update
   - Add to pending changes log

### If Site Goes Down
- Cloudflare Pages has 99.95% uptime
- Automatic failover (no action needed)
- Check Cloudflare status page

### If Major News in AI Space
- Example: "Claude 5 released, made major leap in reasoning"
- Update homepage banner
- Add to /whats-new
- Create issues for affected sections

---

## 📋 Monthly Maintainer Checklist

**Time: ~3-4 hours, first Sunday of month**

- [ ] Review automated audit report
- [ ] Deep review of top 5 pages by traffic
- [ ] Update /tools pricing if changed
- [ ] Check /open-source for new models
- [ ] Verify all external links still work
- [ ] Update "Last Verified" dates for reviewed pages
- [ ] Merge community PRs
- [ ] Publish monthly update in /updates
- [ ] Review analytics (traffic, engagement, bounce rate)
- [ ] Plan upcoming features
- [ ] Check for feature requests in issues

---

## 📞 Who to Contact

| Issue | Contact | Response Time |
|-------|---------|----------------|
| Broken link | GitHub Issue | 48 hours |
| Outdated info | "Report Outdated" button | 48 hours |
| Feature request | GitHub Discussion | 1 week |
| Urgent correction | shubham via Linear | ASAP |

---

## 🎯 Success Criteria

- **Accuracy:** 99%+ of claims verified within past 60 days
- **Freshness:** Core pages (tools, models) reviewed weekly
- **Response time:** Community reports answered within 48 hours
- **Uptime:** 99.95%+ (Cloudflare's guarantee)
- **Link health:** 98%+ of external links working

---

## 📝 Next Steps

1. Set up GitHub Actions workflows (scripts/check-*.js)
2. Add "Report Outdated" button to all pages
3. Create dashboard for metrics tracking
4. Schedule first monthly audit
5. Document in team wiki / onboarding

**Status:** [Link to tracking issue]


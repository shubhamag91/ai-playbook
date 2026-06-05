## Goal

Cut the largest source of redundancy and maintenance tax in the site: the four near-identical provider sections and the scattered, duplicated model guides. Finish the Phase-2 IA consolidation already noted in the project.

## Why

- **Provider sprawl:** `claude/`, `openai/`, `deepmind/`, `deepseek/` are each ~8–9 pages with near-identical skeletons (index, models, api, agent-skills/codex, mcp, workflows, enterprise…). That's **~35 pages** that heavily restate official vendor docs, duplicate each other's structure, and go stale fastest.
- **Model info scattered across 6+ places:** `decide/models/guide`, `research/models/guide`, `claude/models`, `openai/models`, `deepmind/models`, `deepseek/models` — plus `models.ts`, plus the homepage table. Too many doors for "what should I use?"
- **Duplicate guides/sections:** two model guides (`decide/models/guide.mdx` vs `research/models/guide.mdx`); Interview Prep appears under both Learn and Resources.
- **Cheatsheets duplicate live content:** `reference/cheatsheets/tools-comparison.md` overlaps `decide/tools/comparison.mdx`; `ai-tools-landscape.md` overlaps the homepage taxonomy.

## Scope

- Collapse the four vendor sections into **thin overview pages** that link to one canonical, `models.ts`-driven model guide (depends on / pairs with the single-source-of-truth issue).
- Merge the duplicate model guides into one canonical location.
- Resolve the double Interview Prep home.
- Generate cheatsheets *from* the same data the live pages use, rather than maintaining static copies.
- Update the sidebar in `astro.config.mjs` to match the consolidated IA.

## Acceptance criteria

- [ ] One canonical model guide; provider pages are thin and link to it
- [ ] No model fact duplicated across provider pages
- [ ] Single Interview Prep home
- [ ] Sidebar reflects the new structure; no broken internal links
- [ ] Net page count meaningfully reduced

## References

- `src/content/docs/{claude,openai,deepmind,deepseek}/`
- `src/content/docs/decide/models/guide.mdx`, `src/content/docs/research/models/guide.mdx`
- `astro.config.mjs` (sidebar)
- Existing Phase-2 migration plan (project notes)

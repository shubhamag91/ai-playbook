# AI Playbook — Review Action Items

Five prioritized issues from the 360° review, staged as Linear-ready markdown.
(Mose Linear workspace was over its free issue limit, so saved here for review first.)

| # | Issue | Priority | Label | File |
|---|---|---|---|---|
| 1 | Build a live API playground and embed it in key pages | High | Feature | [01-api-playground.md](01-api-playground.md) |
| 2 | Make `models.ts` the single source of truth & fix homepage contradictions | Urgent | Bug | [02-models-single-source-of-truth.md](02-models-single-source-of-truth.md) |
| 3 | Upgrade chatbot from RAG-bot to context-aware copilot | High | Improvement | [03-chatbot-copilot.md](03-chatbot-copilot.md) |
| 4 | Consolidate provider sprawl & finish Phase-2 IA consolidation | Medium | Improvement | [04-consolidate-provider-sprawl.md](04-consolidate-provider-sprawl.md) |
| 5 | Ship automations section & fix broken/outdated templates | High | Feature | [05-automations-and-templates.md](05-automations-and-templates.md) |

## Recommended order

- **Start with #2** — credibility-critical, cheap, and #4 depends on it (single source of truth).
- **#1 and #3** are the biggest "boring book → toolkit" levers.
- **#5** delivers the unfulfilled "automations" promise.
- **#4** is the largest maintenance-tax reduction; pairs with #2.

## To push to Linear later

Once the Mose workspace has room (delete/archive issues or upgrade), from the repo root:

```bash
linear issue create --team MOS --project "AI Playbook" --no-interactive \
  -t "<title>" -p <1-4> -l "<label>" --description-file docs/review-issues/<file>.md
```

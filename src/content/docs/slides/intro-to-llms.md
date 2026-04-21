---
title: Intro to LLMs (Slide Deck)
description: A ~15-minute lunch-and-learn intro to large language models.
sidebar:
  order: 1
---

Slide decks in this playbook are authored in **Markdown** using [Slidev](https://sli.dev/) and exported to HTML. The page below embeds the exported deck.

<iframe
  src="/decks/intro-to-llms/index.html"
  title="Intro to LLMs — slide deck"
  style="width: 100%; height: 520px; border: 1px solid var(--sl-color-gray-5); border-radius: 12px;"
  allowfullscreen
></iframe>

## Deck source (Slidev)

The underlying `slides.md` lives at `decks/intro-to-llms/slides.md`. Author it like this:

````md
---
theme: seriph
title: Intro to LLMs
---

# Intro to LLMs

A 15-minute tour.

---

## What is an LLM?

- A very large neural network
- Trained to predict the next token
- Emergent behavior: reasoning, code, translation

---

## Three ways to customize

1. Prompting
2. RAG
3. Fine-tuning

---

## When to pick which

| Need | Pick |
|---|---|
| Style / tone change | Prompting |
| Fresh / private data | RAG |
| New skill / task | Fine-tuning |
````

## Build & publish

```bash
# one-time
npm i -g @slidev/cli

# author
slidev decks/intro-to-llms/slides.md     # live preview

# export to static HTML for embedding
slidev build decks/intro-to-llms/slides.md --base /decks/intro-to-llms/ --out public/decks/intro-to-llms
```

Commit `public/decks/intro-to-llms/`, push, done — the iframe above will load it.

:::tip
Prefer Reveal.js? Same idea: export to `public/decks/<name>/` and point the iframe at it. Markdown source stays the source of truth.
:::

# Knowledge Quiz

The quiz feature lets users test their AI/ML knowledge with 10-question quizzes drawn from playbook content. Questions are pre-generated via Groq and stored as a static JSON file — no runtime API dependency.

---

## Architecture

```
public/quiz-bank.json  (static, committed to git)
        │
        │  fetch('/quiz-bank.json')
        ▼
src/components/Quiz.astro  (vanilla JS, client-side only)
        │
        │  random sample of 10 from pool of 25-30
        ▼
Quiz UI → score + feedback → localStorage history
```

No Cloudflare Function involved. The quiz is entirely client-side.

---

## Key Files

| File | Purpose |
|---|---|
| `public/quiz-bank.json` | Question bank — committed to git, served as static asset |
| `src/components/Quiz.astro` | Full quiz UI with inline vanilla JS |
| `src/content/docs/learn/quiz.mdx` | Quiz page (`/learn/quiz`) |
| `scripts/generate-quiz-bank.mjs` | One-time Groq script to generate/refresh questions |

---

## Question Bank Structure

```json
{
  "version": "1",
  "generated": "2026-05-17",
  "topics": [{ "id": "rag-architecture", "label": "RAG Architecture" }, ...],
  "questions": {
    "rag-architecture-easy": [
      {
        "id": "rag-easy-001",
        "question": "What does RAG stand for?",
        "options": ["A. Retrieval-Augmented Generation", "B. ...", "C. ...", "D. ..."],
        "answer": "A",
        "explanation": "RAG combines retrieval of relevant documents with LLM generation."
      }
    ],
    "rag-architecture-hard": [...]
  }
}
```

Each topic has an `easy` and `hard` pool of ~25–30 questions. The quiz samples 10 randomly per session, giving high variety without regenerating.

---

## Topics

| ID | Label |
|---|---|
| `llm-basics` | LLM Basics |
| `reasoning-models` | Reasoning Models |
| `rag-architecture` | RAG Architecture |
| `agents-frameworks` | Agents & Frameworks |
| `prompt-engineering` | Prompt Engineering |
| `training-finetuning` | Training & Fine-tuning |
| `inference-optimization` | Inference Optimization |
| `production-llmops` | Production LLMOps |
| `eval-testing` | Evaluation & Testing |
| `interview-llm` | Interview Prep — LLM |
| `interview-ml` | Interview Prep — ML |
| `interview-quant` | Interview Prep — Quant |

---

## Generating / Refreshing Questions

Questions are generated once and committed to git. Re-run when major new content is added.

**Full regeneration:**
```bash
GROQ_API_KEY=your_key npm run generate-quiz
```

**Single topic:**
```bash
GROQ_API_KEY=your_key npm run generate-quiz rag-architecture
```

**Single topic + difficulty:**
```bash
GROQ_API_KEY=your_key npm run generate-quiz rag-architecture hard
```

After running, review `public/quiz-bank.json`, edit any questions you want to change, then commit:
```bash
git add public/quiz-bank.json
git commit -m "Refresh quiz bank"
git push
```

### Rate Limits (Groq Free Tier)

| Limit | Value |
|---|---|
| Tokens per minute (TPM) | 12,000 |
| Tokens per day (TPD) | 100,000 |
| Tokens per call (approx) | ~9,000 |

The script uses a 65-second delay between calls to stay within TPM limits. A full run of all 24 topic/difficulty combinations uses ~216K tokens — split across 3 days on the free tier, or run all at once on a paid Groq account.

---

## Editing Questions

Open `public/quiz-bank.json` directly. Each question has four editable fields:

```json
{
  "id": "rag-easy-001",
  "question": "What does RAG stand for?",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "answer": "A",
  "explanation": "One sentence, max ~25 words."
}
```

**Answer distribution:** Keep roughly equal A/B/C/D across each topic set to avoid pattern recognition. The generation prompt enforces this, but hand-edited questions should follow the same rule.

---

## Progress Tracking

Scores are saved in `localStorage` under key `quiz_history`:

```json
{
  "rag-architecture-easy": {
    "attempts": 3,
    "bestScore": 9,
    "lastScore": 7,
    "lastTotal": 10,
    "lastDate": "2026-05-17"
  }
}
```

Displayed as a history summary on the quiz setup screen. No server state, no login required.

---

## Pending Tasks

- [ ] Generate remaining 5 empty topic/difficulty sets (hit Groq daily limit):
  - `eval-testing-hard`
  - `interview-llm-hard`
  - `interview-ml-easy`
  - `interview-quant-easy`
  - `interview-quant-hard`
- [ ] Review generated questions for quality and answer distribution
- [ ] Consider adding a "Report bad question" button
- [ ] Consider a "timed mode" toggle for interview practice

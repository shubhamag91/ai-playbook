/**
 * Generate quiz-bank.json from playbook content via Groq API.
 *
 * Usage:
 *   GROQ_API_KEY=your_key npm run generate-quiz
 *   GROQ_API_KEY=your_key npm run generate-quiz rag-architecture   # single topic
 *
 * Output: public/quiz-bank.json (committed to git, served as static asset)
 *
 * Re-run whenever major new content is added. Each run preserves existing
 * topics not being regenerated, so partial regeneration is safe.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error('\n❌  GROQ_API_KEY not set.');
  console.error('    Run: GROQ_API_KEY=your_key npm run generate-quiz\n');
  process.exit(1);
}

// Topic definitions — each slug must exist in public/search-index.json
const TOPICS = [
  { id: 'llm-basics',             label: 'LLM Basics',                   slugs: ['deep-dive/how-llms-work'] },
  { id: 'reasoning-models',       label: 'Reasoning Models',             slugs: ['deep-dive/reasoning-models'] },
  { id: 'rag-architecture',       label: 'RAG Architecture',             slugs: ['deep-dive/rag-architecture'] },
  { id: 'agents-frameworks',      label: 'Agents & Frameworks',          slugs: ['deep-dive/agents-frameworks'] },
  { id: 'prompt-engineering',     label: 'Prompt Engineering',           slugs: ['deep-dive/prompt-engineering'] },
  { id: 'training-finetuning',    label: 'Training & Fine-tuning',       slugs: ['deep-dive/training-finetuning'] },
  { id: 'inference-optimization', label: 'Inference Optimization',       slugs: ['deep-dive/inference-optimization'] },
  { id: 'production-llmops',      label: 'Production LLMOps',           slugs: ['deep-dive/production-llmops'] },
  { id: 'eval-testing',           label: 'Evaluation & Testing',         slugs: ['deep-dive/eval-and-testing'] },
  { id: 'interview-llm',          label: 'Interview Prep — LLM',         slugs: ['learn/interview-prep-llm'] },
  { id: 'interview-ml',           label: 'Interview Prep — ML',          slugs: ['learn/interview-prep-ml'] },
  { id: 'interview-quant',        label: 'Interview Prep — Quant',       slugs: ['learn/interview-prep-quant-banking'] },
];

// ── Load search index and group chunks by slug ──────────────────────────────

const searchIndex = JSON.parse(
  readFileSync(join(ROOT, 'public/search-index.json'), 'utf-8')
);

const chunksBySlug = {};
for (const entry of Object.values(searchIndex)) {
  if (!chunksBySlug[entry.slug]) chunksBySlug[entry.slug] = [];
  chunksBySlug[entry.slug].push(entry.chunk);
}

function getContent(slugs) {
  return slugs
    .flatMap(s => chunksBySlug[s] || [])
    .join('\n\n')
    .slice(0, 7000); // keep well within token limits
}

// ── Groq API call ────────────────────────────────────────────────────────────

async function callGroq(prompt) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 8000,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Groq ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

function extractJSON(text) {
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1) throw new Error('No JSON array in response');
  return JSON.parse(text.slice(start, end + 1));
}

// ── Prompt builder ───────────────────────────────────────────────────────────

function buildPrompt(label, content, difficulty) {
  const diffInstructions = difficulty === 'hard'
    ? 'HARD — Ask about tradeoffs, failure modes, implementation choices, subtle distinctions, and edge cases. Include plausible-sounding wrong answers that require genuine understanding to eliminate.'
    : 'EASY — Ask conceptual/definitional questions: what things are called, their basic purpose, what they do. Wrong options should be clearly distinguishable from the correct one.';

  return `You are a quiz generator for an AI/ML educational playbook.

Generate exactly 30 multiple-choice questions about "${label}".
Difficulty: ${diffInstructions}

Rules:
- Each question has exactly 4 options labeled "A. ...", "B. ...", "C. ...", "D. ..."
- Exactly one correct answer (the letter A, B, C, or D — not the full option text)
- Explanation: one sentence, max 25 words
- Base all questions on the content below only
- Return ONLY a valid JSON array — no markdown, no text outside the array

Output format:
[{"question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"answer":"A","explanation":"..."}]

Content:
${content}`;
}

// ── Per-topic generation with retry ─────────────────────────────────────────

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function generateQuestions(topic, difficulty) {
  const content = getContent(topic.slugs);
  if (!content.trim()) {
    console.warn(`  ⚠  No content found for slugs: ${topic.slugs.join(', ')}`);
    return [];
  }

  const prompt = buildPrompt(topic.label, content, difficulty);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const raw = await callGroq(prompt);
      const questions = extractJSON(raw);
      return questions.slice(0, 30).map((q, i) => ({
        id: `${topic.id}-${difficulty}-${String(i + 1).padStart(3, '0')}`,
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
      }));
    } catch (err) {
      console.warn(`  Attempt ${attempt}/3 failed: ${err.message}`);
      if (attempt < 3) await sleep(3000);
    }
  }

  console.error(`  ❌  Failed after 3 attempts`);
  return [];
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const topicArg = process.argv[2];
  const topicsToRun = topicArg
    ? TOPICS.filter(t => t.id === topicArg)
    : TOPICS;

  if (topicArg && topicsToRun.length === 0) {
    console.error(`❌  Unknown topic: "${topicArg}"`);
    console.error(`    Available: ${TOPICS.map(t => t.id).join(', ')}`);
    process.exit(1);
  }

  // Load existing bank so untouched topics are preserved
  const bankPath = join(ROOT, 'public/quiz-bank.json');
  let existing = { questions: {} };
  if (existsSync(bankPath)) {
    try { existing = JSON.parse(readFileSync(bankPath, 'utf-8')); } catch {}
  }

  const bank = {
    version: '1',
    generated: new Date().toISOString().split('T')[0],
    topics: TOPICS,
    questions: { ...existing.questions },
  };

  for (const topic of topicsToRun) {
    for (const difficulty of ['easy', 'hard']) {
      const key = `${topic.id}-${difficulty}`;
      console.log(`\n⏳  ${key}`);
      const questions = await generateQuestions(topic, difficulty);
      bank.questions[key] = questions;
      console.log(`✅  ${questions.length} questions`);

      // Write after every topic/difficulty so a crash doesn't lose everything
      writeFileSync(bankPath, JSON.stringify(bank, null, 2));
      await sleep(2000); // stay well inside Groq rate limits
    }
  }

  console.log(`\n✅  Quiz bank written to public/quiz-bank.json`);
  console.log(`    Total question sets: ${Object.keys(bank.questions).length}`);
}

main().catch(err => { console.error(err); process.exit(1); });

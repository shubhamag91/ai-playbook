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
    .slice(0, 3500); // Keep under ~900 tokens so each call stays within 6000 TPM
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
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2200, // ~15 questions × ~140 tokens each; total request ~3400 tokens < 6000 TPM
      response_format: { type: 'json_object' },
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
  // Attempt direct parse first (when the response is pure JSON)
  try {
    return JSON.parse(text);
  } catch (_) {}
  // Fallback: locate the first '[' and find the matching closing ']'
  const start = text.indexOf('[');
  if (start === -1) throw new Error('No JSON array in response');
  let depth = 0;
  let end = -1;
  for (let i = start; i < text.length; i++) {
    const char = text[i];
    if (char === '[') depth++;
    else if (char === ']') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) throw new Error('Unmatched JSON array brackets');
  const jsonStr = text.slice(start, end + 1);
  return JSON.parse(jsonStr);
}

// ── Post-processing helpers ───────────────────────────────────────────────────

function tokenize(str) {
  return new Set(
    str.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 3)
  );
}

function jaccard(a, b) {
  const intersection = [...a].filter(x => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

/** Remove exact and near-duplicate questions (Jaccard > 0.75). */
function deduplicateQuestions(questions) {
  const seen = new Set();
  const unique = [];
  for (const q of questions) {
    const norm = q.question.trim().toLowerCase();
    if (seen.has(norm)) continue;
    seen.add(norm);
    unique.push(q);
  }
  const tokens = unique.map(q => tokenize(q.question));
  const keep = new Array(unique.length).fill(true);
  for (let i = 0; i < unique.length; i++) {
    if (!keep[i]) continue;
    for (let j = i + 1; j < unique.length; j++) {
      if (!keep[j]) continue;
      if (jaccard(tokens[i], tokens[j]) > 0.75) keep[j] = false;
    }
  }
  return unique.filter((_, i) => keep[i]);
}

/**
 * Redistribute correct answers so A/B/C/D appear in round-robin order.
 * Swaps options in the array so the answer letter rotates predictably.
 */
const LETTER_ROTATION = ['A', 'B', 'C', 'D'];
function shuffleAnswerPositions(questions) {
  return questions.map((q, i) => {
    const target = LETTER_ROTATION[i % 4];
    if (q.answer === target) return q;
    const letters = ['A', 'B', 'C', 'D'];
    const currentIdx = letters.indexOf(q.answer);
    const targetIdx  = letters.indexOf(target);
    const newOptions = [...q.options];
    const correctOpt = newOptions[currentIdx];
    newOptions[currentIdx] = newOptions[targetIdx];
    newOptions[targetIdx]  = correctOpt;
    const relabeled = newOptions.map((opt, k) => letters[k] + '. ' + opt.slice(3));
    return { ...q, options: relabeled, answer: target };
  });
}

// ── Prompt builder ───────────────────────────────────────────────────────────

/**
 * batchIndex: 0 = first 15 questions, 1 = second 15 questions (distinct concepts).
 * Splitting into two batches of 15 keeps each API call well under the 6000 TPM limit.
 */
function buildPrompt(label, content, difficulty, batchIndex = 0) {
  const diffInstructions = difficulty === 'hard'
    ? `HARD difficulty — questions must require genuine understanding to answer.
  - Focus on: tradeoffs between approaches, failure modes, implementation subtleties, edge cases, and "why" questions.
  - Wrong options must be plausible to someone with partial knowledge — not obviously absurd.
  - Vary question types: scenario-based ("A team is doing X, which approach is best?"), comparison ("Key difference between X and Y?"), and consequence questions ("What happens when Z fails?").
  - No more than 40% of questions may start with "What is".`
    : `EASY difficulty — questions test core conceptual understanding and definitions.
  - Focus on: what things are called, their primary purpose, and how components relate.
  - Vary question types: mix "What is", "Why does", "Which of these", and "When would you use" starters.
  - No more than 50% of questions may start with "What is".`;

  const batchNote = batchIndex === 0
    ? 'Cover foundational and most important concepts first.'
    : 'Cover more nuanced, applied, or edge-case concepts — do NOT repeat topics from typical foundational questions.';

  const contentBlock = content
    ? `Content to base questions on:\n${content}`
    : `(No specific content provided — generate from expert knowledge of "${label}".)`;

  return `You are an expert quiz writer for an AI/ML educational playbook used by engineers and researchers.

Generate exactly 15 multiple-choice questions about "${label}". ${batchNote}

${diffInstructions}

━━━ OPTION QUALITY (most important — violations make the quiz trivially easy) ━━━

1. ALL FOUR OPTIONS MUST BE SIMILAR IN LENGTH AND DETAIL.
   - Each option should be 8–25 words long and a complete, specific phrase.
   - The correct answer must NOT be noticeably longer or more detailed than the wrong ones.

2. WRONG OPTIONS MUST BE PLAUSIBLE AND SPECIFIC — not throwaway filler.
   - Wrong options must reference real techniques, real components, or realistic alternatives.
   - BANNED: single words, vague phrases, anything clearly absurd.
   - BANNED: generic options like "To improve accuracy", "To reduce cost", "To increase efficiency".

3. NEVER use "All of the above" or "None of the above" as an option.

4. Each question must test a DISTINCT concept.

━━━ EXPLANATION QUALITY ━━━

5. The explanation must be a FULL SENTENCE (15–30 words) stating what the correct answer is AND why.

━━━ FORMAT ━━━

- 4 options per question, labeled exactly: "A. ...", "B. ...", "C. ...", "D. ..."
- answer field: a single letter — "A", "B", "C", or "D"
- Return ONLY a valid JSON array — no markdown fences, no preamble.

Output format:
[{"question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"answer":"A","explanation":"..."}]

${contentBlock}`;
}

// ── Per-topic generation with retry ─────────────────────────────────────────

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/**
 * Run one batch of 15 questions with retry.
 */
async function generateBatch(topic, difficulty, batchIndex) {
  const content = getContent(topic.slugs);
  const prompt = buildPrompt(topic.label, content, difficulty, batchIndex);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const raw = await callGroq(prompt);
      const parsed = typeof raw === 'string' ? extractJSON(raw) : raw;
      return Array.isArray(parsed) ? parsed : (parsed.questions || []);
    } catch (err) {
      console.warn(`  Batch ${batchIndex} attempt ${attempt}/3 failed: ${err.message}`);
      if (attempt < 3) await sleep(15000);
    }
  }
  console.error(`  ❌  Batch ${batchIndex} failed after 3 attempts`);
  return [];
}

/**
 * Generate ~30 questions by running two batches of 15, then dedup + balance.
 * Each batch call requests ~3400 tokens total, well under the 6000 TPM limit.
 */
async function generateQuestions(topic, difficulty) {
  const content = getContent(topic.slugs);
  if (!content.trim()) {
    console.warn(`  ⚠  No content found for slugs: ${topic.slugs.join(', ')} — LLM will use parametric knowledge only`);
  }

  console.log(`  📦 Batch 1/2...`);
  const batch1 = await generateBatch(topic, difficulty, 0);
  await sleep(65000); // respect TPM between batches

  console.log(`  📦 Batch 2/2...`);
  const batch2 = await generateBatch(topic, difficulty, 1);

  const combined = [...batch1, ...batch2];
  if (combined.length === 0) return [];

  // Shape + post-process
  const shaped = combined.slice(0, 40).map((q, i) => ({
    id: `${topic.id}-${difficulty}-${String(i + 1).padStart(3, '0')}`,
    question: q.question,
    options: q.options,
    answer: q.answer,
    explanation: q.explanation,
  }));

  const deduped  = deduplicateQuestions(shaped);
  const balanced = shuffleAnswerPositions(deduped.slice(0, 30));

  const removedCount = shaped.length - deduped.length;
  if (removedCount > 0) {
    console.log(`  ℹ️  Removed ${removedCount} duplicate(s) after generation`);
  }

  return balanced.map((q, i) => ({
    ...q,
    id: `${topic.id}-${difficulty}-${String(i + 1).padStart(3, '0')}`,
  }));
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const topicArg = process.argv[2];
  const diffArg  = process.argv[3]; // optional: "easy" or "hard"

  const topicsToRun = topicArg
    ? TOPICS.filter(t => t.id === topicArg)
    : TOPICS;

  if (topicArg && topicsToRun.length === 0) {
    console.error(`❌  Unknown topic: "${topicArg}"`);
    console.error(`    Available: ${TOPICS.map(t => t.id).join(', ')}`);
    process.exit(1);
  }

  const diffsToRun = diffArg
    ? [diffArg]
    : ['easy', 'hard'];

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
    for (const difficulty of diffsToRun) {
      const key = `${topic.id}-${difficulty}`;
      console.log(`\n⏳  ${key}`);
      const questions = await generateQuestions(topic, difficulty);
      if (questions.length > 0) {
        bank.questions[key] = questions;
        console.log(`✅  ${questions.length} questions`);
      } else {
        console.log(`⚠️   Skipped (0 questions returned) — existing bank entry preserved`);
      }

      // Write after every topic/difficulty so a crash doesn't lose everything
      writeFileSync(bankPath, JSON.stringify(bank, null, 2));
      await sleep(65000); // 65s between calls to respect Groq TPM limit
    }
  }

  console.log(`\n✅  Quiz bank written to public/quiz-bank.json`);
  console.log(`    Total question sets: ${Object.keys(bank.questions).length}`);
}

main().catch(err => { console.error(err); process.exit(1); });

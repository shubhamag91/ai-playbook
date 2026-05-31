/**
 * fix-quiz-quality.mjs
 *
 * Fixes structural quality issues in public/quiz-bank.json:
 *   1. Replaces "All of the above" options with specific plausible distracters (via LLM)
 *   2. Flags and optionally rewrites questions with severe answer-length bias
 *   3. Replaces recycled generic filler distracters
 *
 * Usage:
 *   GROQ_API_KEY=your_key node scripts/fix-quiz-quality.mjs [--dry-run]
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BANK_PATH = join(ROOT, 'public/quiz-bank.json');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error('\n❌  GROQ_API_KEY not set.');
  process.exit(1);
}

const DRY_RUN = process.argv.includes('--dry-run');

// ── Generic filler phrases to detect ─────────────────────────────────────────

const FILLER_PHRASES = [
  'to improve the accuracy of the language model',
  'to increase the efficiency of the language model',
  'to reduce the cost of the language model',
  'to improve accuracy',
  'to increase efficiency',
  'to reduce cost',
];

function isGenericFiller(option) {
  const lower = option.toLowerCase();
  return FILLER_PHRASES.some(p => lower.includes(p));
}

function hasAllOfAbove(question) {
  return question.options.some(o => o.toLowerCase().includes('all of the above'));
}

function hasLengthBias(question) {
  const ansIdx = question.answer.charCodeAt(0) - 65;
  const ansLen = question.options[ansIdx].length;
  const avgLen = question.options.reduce((s, o) => s + o.length, 0) / 4;
  return ansLen > avgLen * 1.4;
}

function hasGenericFillers(question) {
  const ansIdx = question.answer.charCodeAt(0) - 65;
  return question.options.some((o, i) => i !== ansIdx && isGenericFiller(o));
}

// ── Groq API ─────────────────────────────────────────────────────────────────

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

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
      temperature: 0.6,
      max_tokens: 600,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

// ── Fix a single question via LLM ────────────────────────────────────────────

async function fixQuestion(question, issues) {
  const issueList = issues.join(', ');
  const prompt = `You are fixing a multiple-choice quiz question. The question has these problems: ${issueList}.

Current question:
Q: ${question.question}
A. ${question.options[0].slice(3)}
B. ${question.options[1].slice(3)}
C. ${question.options[2].slice(3)}
D. ${question.options[3].slice(3)}
Correct answer: ${question.answer}

Rules for fixing:
1. Keep the question text and correct answer EXACTLY the same.
2. All four options must be SIMILAR IN LENGTH (8–25 words each, comparable detail level).
3. NEVER use "All of the above", "None of the above", single words, or vague phrases.
4. Wrong options must reference real, plausible alternatives — something a knowledgeable person might consider.
5. Keep the correct answer at position ${question.answer}.

Return ONLY valid JSON:
{"options": ["A. ...", "B. ...", "C. ...", "D. ..."], "answer": "${question.answer}"}`;

  try {
    const raw = await callGroq(prompt);
    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed.options) &&
      parsed.options.length === 4 &&
      parsed.answer === question.answer
    ) {
      return { ...question, options: parsed.options };
    }
  } catch (e) {
    console.warn(`  ⚠  Fix failed for ${question.id}: ${e.message}`);
  }
  return question; // return original if fix fails
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const bank = JSON.parse(readFileSync(BANK_PATH, 'utf-8'));

  let totalFixed = 0;
  let totalSkipped = 0;
  let apiCalls = 0;

  for (const [key, questions] of Object.entries(bank.questions)) {
    const fixed = [];
    for (const q of questions) {
      const issues = [];
      if (hasAllOfAbove(q)) issues.push('"All of the above" option present');
      if (hasLengthBias(q)) issues.push('correct answer is notably longer than wrong options');
      if (hasGenericFillers(q)) issues.push('wrong options use generic filler phrases');

      if (issues.length === 0) {
        fixed.push(q);
        continue;
      }

      console.log(`  🔧 [${key}] ${q.id}: ${issues.join(' | ')}`);

      if (DRY_RUN) {
        fixed.push(q);
        totalSkipped++;
        continue;
      }

      // Rate limit: 1 call per 2s to avoid bursting
      if (apiCalls > 0 && apiCalls % 10 === 0) {
        console.log('  ⏳ Pausing 30s for rate limit...');
        await sleep(30000);
      }

      const fixedQ = await fixQuestion(q, issues);
      fixed.push(fixedQ);
      apiCalls++;
      totalFixed++;
      await sleep(2000);
    }
    bank.questions[key] = fixed;
  }

  if (!DRY_RUN) {
    writeFileSync(BANK_PATH, JSON.stringify(bank, null, 2));
    console.log(`\n✅  Fixed ${totalFixed} questions. Written to public/quiz-bank.json`);
  } else {
    console.log(`\n🔍  Dry run complete. Would fix ${totalSkipped} questions.`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });

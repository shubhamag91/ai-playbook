/**
 * check-model-consistency.mjs
 *
 * Guards against drift between the canonical model data (src/data/models.ts)
 * and the hand-written provider reference pages (src/content/docs/<vendor>/models.md).
 *
 * Those pages are rich, hand-curated docs (API IDs, batch pricing, cutoffs,
 * deprecation tables) — we deliberately do NOT render them from models.ts.
 * But they DO restate each model's headline pricing + context window, which can
 * silently drift from models.ts over time. This script catches that: for every
 * current model whose name appears on its vendor page, it verifies the page also
 * contains that model's canonical price tokens and context window.
 *
 * Usage:
 *   node scripts/check-model-consistency.mjs           # warn only (exit 0)
 *   node scripts/check-model-consistency.mjs --strict   # exit 1 on any drift
 *
 * Runs in prebuild (non-strict) so drift is surfaced without breaking deploys.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STRICT = process.argv.includes('--strict');

// company (in models.ts) → provider reference page
const PAGES = {
  Anthropic: 'src/content/docs/claude/models.md',
  OpenAI: 'src/content/docs/openai/models.md',
  Google: 'src/content/docs/deepmind/models.md',
  DeepSeek: 'src/content/docs/deepseek/models.md',
};

// ── Load canonical models from models.ts (same extraction as the search index) ──
function loadModels() {
  const content = fs.readFileSync(path.join(ROOT, 'src/data/models.ts'), 'utf8');
  const m = content.match(/export const models[^=]*=\s*(\[[\s\S]*?\]);/);
  if (!m) throw new Error('Could not locate models array in models.ts');
  return new Function(`return ${m[1].replace(/as const/g, '')}`)();
}

// Dollar amounts as written in the pricing string, e.g. "$5/$25 per 1M" → ["$5","$25"]
function priceTokens(pricing) {
  return (pricing.match(/\$[0-9][0-9.]*/g) || []);
}

// page contains an exact price token (not as a prefix of a larger number)
function pageHasPrice(text, token) {
  const num = token.slice(1).replace('.', '\\.');
  return new RegExp('\\$' + num + '(?![0-9.])').test(text);
}

// page contains the context token (e.g. "1M" but not inside "11M")
function pageHasContext(text, ctx) {
  return new RegExp('(?<![0-9.])' + ctx.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(text);
}

const models = loadModels();
let mentioned = 0, drift = 0, skipped = 0;
const lines = [];

for (const [company, rel] of Object.entries(PAGES)) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) { lines.push(`! ${rel} not found — skipping`); continue; }
  const text = fs.readFileSync(abs, 'utf8');

  const current = models.filter(
    (m) => m.company === company && m.latest && !m.name.includes('(') // skip variant rows like "(Thinking)"
  );

  for (const m of current) {
    if (!text.includes(m.name)) { skipped++; continue; } // not listed on the page → nothing to check
    mentioned++;

    const missing = [];
    for (const tok of priceTokens(m.pricing)) {
      if (!pageHasPrice(text, tok)) missing.push(`price ${tok}`);
    }
    if (m.context && m.context.toLowerCase() !== 'varies' && !pageHasContext(text, m.context)) {
      missing.push(`context ${m.context}`);
    }

    if (missing.length) {
      drift++;
      lines.push(`  ✗ ${company} · ${m.name} — page is missing: ${missing.join(', ')} (models.ts says ${m.pricing}, ${m.context})`);
    }
  }
}

console.log('\nModel consistency check (provider pages vs models.ts)');
console.log(`  ${mentioned} current models cross-checked · ${skipped} not listed on their page`);
if (drift === 0) {
  console.log('  ✓ No pricing/context drift detected.\n');
  process.exit(0);
}
console.log(`  ${drift} possible drift(s):`);
for (const l of lines) console.log(l);
console.log(
  STRICT
    ? '\n  Failing (--strict). Reconcile the page with models.ts (or update models.ts).\n'
    : '\n  (warning only — re-run with --strict to fail the build)\n'
);
process.exit(STRICT && drift > 0 ? 1 : 0);

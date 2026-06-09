/**
 * check-model-consistency.mjs
 *
 * Guards the "single source of truth" property: nothing in the playbook should
 * state a model's price/context that contradicts src/data/models.ts.
 *
 * Two passes:
 *  1) Provider tables — for each current model whose name appears on its vendor
 *     reference page (claude/openai/deepmind/deepseek `models.md`), verify the
 *     page contains that model's canonical price tokens + context.
 *  2) Prose contradictions — scan every content page for inline "$A/$B per 1M"
 *     rates stated next to a model name, and flag any that disagree with
 *     models.ts. (Only precise-priced models; "~" approximate tiers are skipped
 *     to avoid noise. "batch"/"cache" rates near the price are ignored.)
 *
 * Usage:
 *   node scripts/check-model-consistency.mjs           # warn only (exit 0)
 *   node scripts/check-model-consistency.mjs --strict   # exit 1 on any drift
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'src/content/docs');
const STRICT = process.argv.includes('--strict');

const PAGES = {
  Anthropic: 'src/content/docs/claude/models.md',
  OpenAI: 'src/content/docs/openai/models.md',
  Google: 'src/content/docs/deepmind/models.md',
  DeepSeek: 'src/content/docs/deepseek/models.md',
};

function loadModels() {
  const content = fs.readFileSync(path.join(ROOT, 'src/data/models.ts'), 'utf8');
  const m = content.match(/export const models[^=]*=\s*(\[[\s\S]*?\]);/);
  if (!m) throw new Error('Could not locate models array in models.ts');
  return new Function(`return ${m[1].replace(/as const/g, '')}`)();
}

const models = loadModels();

// ── Pass 1: provider tables (presence of canonical price/context) ───────────
function priceTokens(pricing) {
  return (pricing.match(/\$[0-9][0-9.]*/g) || []);
}
function pageHasPrice(text, token) {
  const num = token.slice(1).replace('.', '\\.');
  return new RegExp('\\$' + num + '(?![0-9.])').test(text);
}
function pageHasContext(text, ctx) {
  return new RegExp('(?<![0-9.])' + ctx.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(text);
}

let tableMentioned = 0, tableDrift = 0, tableSkipped = 0;
const tableLines = [];
for (const [company, rel] of Object.entries(PAGES)) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) { tableLines.push(`! ${rel} not found — skipping`); continue; }
  const text = fs.readFileSync(abs, 'utf8');
  const current = models.filter((m) => m.company === company && m.latest && !m.name.includes('('));
  for (const m of current) {
    if (!text.includes(m.name)) { tableSkipped++; continue; }
    tableMentioned++;
    const missing = [];
    for (const tok of priceTokens(m.pricing)) if (!pageHasPrice(text, tok)) missing.push(`price ${tok}`);
    if (m.context && m.context.toLowerCase() !== 'varies' && !pageHasContext(text, m.context)) missing.push(`context ${m.context}`);
    if (missing.length) {
      tableDrift++;
      tableLines.push(`  ✗ ${company} · ${m.name} — page missing: ${missing.join(', ')} (models.ts: ${m.pricing}, ${m.context})`);
    }
  }
}

// ── Pass 2: prose contradictions (wrong "$A/$B per 1M" next to a model name) ──
// Canonical numeric in/out for precise-priced models only (skip "~" tiers).
function canonNums(m) {
  if (typeof m.inputPrice === 'number' && typeof m.outputPrice === 'number') return { input: m.inputPrice, output: m.outputPrice };
  const p = m.pricing.match(/\$([0-9.]+)\s*\/\s*\$([0-9.]+)/);
  return p ? { input: parseFloat(p[1]), output: parseFloat(p[2]) } : null;
}
const aliases = []; // { alias, input, output, name }
for (const m of models) {
  if (/^~|approx/i.test(m.pricing)) continue;       // skip approximate tiers
  const c = canonNums(m);
  if (!c) continue;                                  // skip non-numeric (Free / API-only)
  aliases.push({ alias: m.name, ...c, name: m.name });
  const short = m.name.replace(/^Claude\s+/, '');    // "Claude Opus 4.8" → "Opus 4.8"
  if (short !== m.name) aliases.push({ alias: short, ...c, name: m.name });
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.mdx?$/.test(e.name)) out.push(p);
  }
  return out;
}

const priceRe = /\$([0-9][0-9.]*)\s*\/\s*\$([0-9][0-9.]*)\s*(?:per\s*1m|\/\s*1m|per\s*million)/gi;
let proseDrift = 0;
const proseLines = [];
for (const file of walk(DOCS)) {
  const rel = path.relative(ROOT, file);
  const text = fs.readFileSync(file, 'utf8');
  text.split('\n').forEach((line, n) => {
    let mm;
    priceRe.lastIndex = 0;
    while ((mm = priceRe.exec(line)) !== null) {
      const before = line.slice(0, mm.index);
      if (/batch|cache/i.test(before.slice(-28))) continue;           // skip batch/cached rates
      let best = null, bestIdx = -1;
      for (const a of aliases) {
        const i = before.lastIndexOf(a.alias);
        if (i < 0) continue;
        // closest to the price; tie-break to the longer (more specific) alias
        if (i > bestIdx || (i === bestIdx && best && a.alias.length > best.alias.length)) { bestIdx = i; best = a; }
      }
      if (!best || bestIdx < before.length - 60) continue;            // model name must be close before the price
      // skip when the alias is just the prefix of a longer variant (e.g. "GPT-5.5 Instant", "GPT-5.4 mini")
      const afterAlias = before.slice(bestIdx + best.alias.length);
      if (/^\s+(Instant|mini|nano|Turbo|Flash|Lite|Pro|Air|Max|Ultra)\b/i.test(afterAlias)) continue;
      const inNum = parseFloat(mm[1]), outNum = parseFloat(mm[2]);
      if (inNum !== best.input || outNum !== best.output) {
        proseDrift++;
        proseLines.push(`  ✗ ${rel}:${n + 1} — "${best.alias}" shown as $${mm[1]}/$${mm[2]} but models.ts says $${best.input}/$${best.output}`);
      }
    }
  });
}

// ── Report ───────────────────────────────────────────────────────────────────
console.log('\nModel consistency check (vs models.ts)');
console.log(`  Provider tables: ${tableMentioned} cross-checked, ${tableSkipped} not listed, ${tableDrift} drift`);
for (const l of tableLines) console.log(l);
console.log(`  Prose rates: ${proseDrift} contradiction(s) across ${walk(DOCS).length} content pages`);
for (const l of proseLines) console.log(l);

const total = tableDrift + proseDrift;
if (total === 0) {
  console.log('  ✓ No pricing/context drift detected.\n');
  process.exit(0);
}
console.log(STRICT ? '\n  Failing (--strict). Reconcile with models.ts.\n' : '\n  (warning only — re-run with --strict to fail the build)\n');
process.exit(STRICT ? 1 : 0);

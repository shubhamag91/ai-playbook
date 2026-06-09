import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.resolve(__dirname, '../src/content/docs');
const outputDir = path.resolve(__dirname, '../public');
const outputFile = path.join(outputDir, 'search-index.json');

// Estimate tokens from text (rough: 1 token ≈ 4 chars)
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

// Split text into chunks of roughly targetTokens
function chunkText(text, title, slug, description, targetTokens = 300) {
  const paragraphs = text.split(/\n\n+/);
  const chunks = [];
  let current = '';
  let currentTokens = 0;

  for (const para of paragraphs) {
    const paraTokens = estimateTokens(para);
    if (currentTokens + paraTokens > targetTokens && current.length > 0) {
      chunks.push({ slug, title, description, chunk: current.trim() });
      current = '';
      currentTokens = 0;
    }
    current += (current ? '\n\n' : '') + para;
    currentTokens += paraTokens;
  }
  if (current.trim()) {
    chunks.push({ slug, title, description, chunk: current.trim() });
  }
  return chunks;
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name) && entry.name !== '_template.md') {
      files.push(full);
    }
  }
  return files;
}

const allChunks = [];
const files = walkDir(docsDir);

// Index structured model data for better search
const modelsPath = path.resolve(__dirname, '../src/data/models.ts');
const modelsContent = fs.readFileSync(modelsPath, 'utf8');

// Extract models using eval — safer than regex for complex entries
const modelEntries = [];
try {
  // Extract just the models array: find "export const models" through the closing "];"
  const arrayMatch = modelsContent.match(/export const models[^=]*=\s*(\[[\s\S]*?\]);/);
  if (arrayMatch) {
    // Replace TS type annotations and single-line fields we don't need
    const cleaned = arrayMatch[1]
      .replace(/as const/g, '');
    // Use Function constructor to evaluate the array
    const models = new Function(`return ${cleaned}`)();
    for (const m of models) {
      modelEntries.push({
        name: m.name, company: m.company, latest: m.latest,
        context: m.context, pricing: m.pricing,
        capabilities: m.capabilities, parameters: m.parameters,
        notes: m.notes,
      });
      allChunks.push({
        slug: `models/${m.name.toLowerCase().replace(/\s+/g, '-')}`,
        title: m.name,
        description: `${m.company} - ${m.capabilities}`,
        chunk: `${m.name} is ${m.company}'s ${m.latest ? 'latest' : 'previous generation'} model. It supports ${m.capabilities}. Context window: ${m.context}. Pricing: ${m.pricing}.${m.parameters ? ` Parameters: ${m.parameters}.` : ''} ${m.notes || ''}`,
      });
    }
  }
} catch (e) {
  console.error('Failed to parse models.ts:', e.message);
}

// Helper: context string → comparable number
function contextToNum(ctx) {
  if (!ctx || ctx === 'varies') return 0;
  const num = parseFloat(ctx);
  if (ctx.includes('M')) return num * 1000000;
  if (ctx.includes('K')) return num * 1000;
  return num;
}

// Helper: extract output price from pricing string (the larger/second number)
function outputPrice(pricing) {
  if (!pricing) return Infinity;
  // Try explicit output notation: $X/$Y per 1M
  let match = pricing.match(/\$?([\d.]+)\s*\/\s*\$?([\d.]+)\s*per\s*1M/);
  if (match) return parseFloat(match[2]);
  // Try ~$X/$Y per 1M
  match = pricing.match(/~\$?([\d.]+)\s*\/\s*\$?([\d.]+)\s*per\s*1M/);
  if (match) return parseFloat(match[2]);
  return Infinity;
}

// Generate a "top N" comparison chunk
function topN(entries, keyFn, label, formatFn, reverse = false) {
  const filtered = entries.filter(e => keyFn(e) !== null && keyFn(e) !== Infinity && keyFn(e) !== 0 && !isNaN(keyFn(e)));
  const sorted = [...filtered].sort((a, b) => reverse ? keyFn(a) - keyFn(b) : keyFn(b) - keyFn(a));
  const top = sorted.slice(0, 5);
  if (top.length === 0) return null;
  return {
    slug: `models/top-${label.toLowerCase().replace(/\s+/g, '-')}`,
    title: `Top models by ${label}`,
    description: `Models ranked by ${label}`,
    chunk: `Top models by ${label}:\n` + top.map((m, i) =>
      `${i + 1}. ${m.name} (${m.company}) — ${formatFn(m)}`
    ).join('\n'),
  };
}

// Add attribute-based comparison chunks
const onlyLatest = modelEntries.filter(m => m.latest === true);

const attrComparisons = [
  topN(onlyLatest, m => contextToNum(m.context), 'context window',
    m => `${m.context} tokens`),
  topN(onlyLatest, m => outputPrice(m.pricing), 'output price (cheapest)',
    m => `${m.pricing}`, true),
  topN(onlyLatest.filter(m => m.parameters && m.parameters !== 'Unknown'),
    m => parseFloat(m.parameters), 'parameter count',
    m => `${m.parameters} parameters`),
].filter(Boolean);

for (const comp of attrComparisons) {
  allChunks.push(comp);
}

// Add comparison chunks that group related models
const comparisons = [
  {
    topic: 'Latest flagship models comparison',
    models: modelEntries.filter(m => ['Claude Opus 4.8', 'GPT-5.5', 'Gemini 3.1 Pro', 'DeepSeek V4 Pro', 'Llama 4 Scout'].includes(m.name)),
    slug: 'models/comparison-flagship',
  },
  {
    topic: 'Budget and cost-efficient models comparison',
    models: modelEntries.filter(m => ['DeepSeek', 'OpenAI'].includes(m.company) || m.name.includes('Haiku') || m.name.includes('Instant') || m.name.includes('Flash')),
    slug: 'models/comparison-budget',
  },
  {
    topic: 'Reasoning models comparison',
    models: modelEntries.filter(m => m.name.includes('Opus') || m.name.includes('o3') || m.name.includes('R1')),
    slug: 'models/comparison-reasoning',
  },
];

for (const comp of comparisons) {
  const chunk = comp.models.map(m => `${m.name} (${m.company}): ${m.capabilities}. Context: ${m.context}. Pricing: ${m.pricing}.`).join('\n');
  allChunks.push({
    slug: comp.slug,
    title: comp.topic,
    description: `Compare ${comp.models.map(m => m.name).join(', ')}`,
    chunk: chunk,
  });
}

for (const filepath of files) {
  const content = fs.readFileSync(filepath, 'utf8');
  const rel = path.relative(docsDir, filepath);
  const slug = rel.replace(/\.(md|mdx)$/, '');

  // Extract frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) continue;

  const fm = fmMatch[1];
  const titleMatch = fm.match(/^title:\s*(.+)$/m);
  const descMatch = fm.match(/^description:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug.split('/').pop();
  const description = descMatch ? descMatch[1].trim() : '';

  // Get body (content after frontmatter)
  const body = content.slice(fmMatch[0].length).trim();

  // Strip MDX import statements and component usage
  const cleanBody = body.replace(/^import .+ from .+$/gm, '').replace(/^<[A-Z]\w+.*\/>$/gm, '').trim();

  // Skip very short pages
  if (estimateTokens(cleanBody) < 20) continue;

  const chunks = chunkText(cleanBody, title, slug, description);
  allChunks.push(...chunks);
}

// Write output
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(allChunks, null, 2));

console.log(`Search index built: ${allChunks.length} chunks from ${files.length} pages → public/search-index.json`);

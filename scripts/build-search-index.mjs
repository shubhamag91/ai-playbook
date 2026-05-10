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

  // Skip very short pages
  if (estimateTokens(body) < 20) continue;

  const chunks = chunkText(body, title, slug, description);
  allChunks.push(...chunks);
}

// Write output
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(allChunks, null, 2));

console.log(`Search index built: ${allChunks.length} chunks from ${files.length} pages → public/search-index.json`);

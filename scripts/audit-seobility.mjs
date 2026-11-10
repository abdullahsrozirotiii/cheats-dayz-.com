import fs from 'node:fs';
import path from 'node:path';
import { resolveDistDir } from './dist-dir.mjs';

const dist = resolveDistDir();

function walkHtml(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, acc);
    else if (ent.name === 'index.html') acc.push(p);
  }
  return acc;
}

const files = walkHtml(dist);
const titleIssues = [];
const h1Issues = [];
const thin = [];
const anchors = new Map();

for (const f of files) {
  const rel = path.relative(dist, f).replace(/\\/g, '/');
  const url = '/' + (rel === 'index.html' ? '' : rel.replace(/index\.html$/, ''));
  const h = fs.readFileSync(f, 'utf8');
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1]?.replace(/&amp;/g, '&') || '';
  const len = title.length;
  if (len < 30 || len > 60) titleIssues.push({ url, len, title });

  const h1s = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim(),
  );
  if (h1s.length !== 1) h1Issues.push({ url, count: h1s.length, h1s });

  const text = h
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(' ').filter(Boolean).length;
  if (words < 500) thin.push({ url, words });

  const re = /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(h)) !== null) {
    const href = m[1];
    const inner = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!inner || href.startsWith('#') || href.startsWith('mailto:')) continue;
    const key = `${href}|${inner.slice(0, 80)}`;
    anchors.set(key, (anchors.get(key) || 0) + 1);
  }
}

const dupAnchors = [...anchors.entries()]
  .filter(([, c]) => c >= 15)
  .sort((a, b) => b[1] - a[1]);

console.log('HTML pages:', files.length);
console.log('\nTitle length issues (<30 or >60):', titleIssues.length);
titleIssues.forEach((x) => console.log(`  ${x.len} ${x.url} — ${x.title}`));
console.log('\nH1 issues (not exactly 1):', h1Issues.length);
h1Issues.forEach((x) => console.log(`  ${x.url} count=${x.count}`, x.h1s));
console.log('\nUnder 500 words:', thin.length);
thin.sort((a, b) => a.words - b.words).slice(0, 20).forEach((x) => console.log(`  ${x.words} ${x.url}`));
console.log('\nDuplicate anchors (15+ pages):');
dupAnchors.slice(0, 20).forEach(([k, c]) => console.log(`  ${c}× ${k}`));

import fs from 'node:fs';

const s = fs.readFileSync('src/data/blog/posts.ts', 'utf8');
const texts = [...s.matchAll(/type: 'p', text: "([^"]+)"/g)].map((m) => m[1]);
const seen = new Map();
for (const t of texts) seen.set(t, (seen.get(t) || 0) + 1);
for (const [t, c] of [...seen.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1])) {
  console.log(c, t.slice(0, 100));
}

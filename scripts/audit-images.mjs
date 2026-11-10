import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const WIDTHS = [320, 400, 512, 640, 960];

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (/\.(ts|astro|mjs)$/i.test(ent.name)) out.push(full);
  }
  return out;
}

const refs = new Set();
const re = /\/images\/(gameplay|blog)\/[a-z0-9-]+\.png/gi;
const templRe = /\$\{gameplay\}\/([a-z0-9-]+)\.png/gi;
for (const file of walk(path.join(root, 'src'))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(re)) refs.add(m[0]);
  for (const m of text.matchAll(templRe)) refs.add(`/images/gameplay/${m[1]}.png`);
}
function basesOnDisk(subdir) {
  const dir = path.join(root, 'public/images', subdir);
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    const m = file.match(/^(.+)-(\d+)\.webp$/i);
    if (m) refs.add(`/images/${subdir}/${m[1]}.png`);
  }
}
for (const sub of ['gameplay', 'blog']) basesOnDisk(sub);

const missingByBase = new Map();
for (const ref of [...refs].sort()) {
  const base = ref.replace(/\.png$/i, '');
  const miss = [];
  for (const w of WIDTHS) {
    const p = path.join(root, 'public', `${base.slice(1)}-${w}.webp`);
    if (!fs.existsSync(p)) miss.push(w);
  }
  if (miss.length) missingByBase.set(base, miss);
}

console.log(`Referenced image bases: ${refs.size}`);
console.log(`Bases with missing webp: ${missingByBase.size}`);
for (const [base, miss] of missingByBase) {
  console.log(`  ${base} missing widths: ${miss.join(', ')}`);
}

const pngOnDisk = [];
function walkImg(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkImg(full);
    else if (/\.png$/i.test(ent.name)) pngOnDisk.push(path.relative(root, full));
  }
}
walkImg(path.join(root, 'public/images'));
console.log(`PNG files on disk: ${pngOnDisk.length}`);
pngOnDisk.forEach((p) => console.log(`  ${p}`));

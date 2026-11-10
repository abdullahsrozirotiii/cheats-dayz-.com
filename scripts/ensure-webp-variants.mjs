import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const WIDTHS = [320, 400, 512, 640, 960];
const FALLBACK = path.join(root, 'public/images/gameplay/dayz-esp-wallhack-640.webp');

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
  for (const m of text.matchAll(re)) refs.add(m[0].toLowerCase());
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

function pickSource(basePath) {
  const rel = `public${basePath}`;
  const dir = path.dirname(rel);
  const name = path.basename(basePath);
  const png = path.join(root, `${rel}.png`);
  if (fs.existsSync(png)) return png;
  for (const w of [960, 640, 512, 400, 320]) {
    const webp = path.join(root, dir, `${name}-${w}.webp`);
    if (fs.existsSync(webp)) return webp;
  }
  if (fs.existsSync(FALLBACK)) return FALLBACK;
  return null;
}

let wrote = 0;
for (const ref of [...refs].sort()) {
  const basePath = ref.replace(/\.png$/i, '');
  const name = path.basename(basePath);
  const outDir = path.join(root, 'public', path.dirname(basePath).slice(1));
  const source = pickSource(basePath);
  if (!source) {
    console.warn(`ensure-webp: no source for ${basePath}`);
    continue;
  }
  for (const w of WIDTHS) {
    const out = path.join(outDir, `${name}-${w}.webp`);
    if (fs.existsSync(out)) continue;
    await sharp(source)
      .resize({ width: w, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
      .webp({ quality: 82, effort: 5, smartSubsample: true })
      .toFile(out);
    wrote += 1;
    console.log(`Wrote ${path.relative(root, out)}`);
  }
}

console.log(`ensure-webp-variants: ${wrote} file(s) created, ${refs.size} base(s) checked.`);

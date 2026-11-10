import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const widths = [320, 400, 512, 640, 960];
const dirs = [
  'public/images/gameplay',
  'public/images/blog',
];

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter((file) => /\.png$/i.test(file) && !/-\d+\.webp$/i.test(file));

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.png$/i, '');

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
        .webp({ quality: 82, effort: 5, smartSubsample: true })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }
}

for (const dir of dirs) {
  await optimizeDir(dir);
}

async function optimizeBrandLogo() {
  const input = path.join(root, 'public/images/dayz-brand-logo.png');
  const webp192 = path.join(root, 'public/images/dayz-brand-logo-192.webp');
  if (!fs.existsSync(input)) {
    if (fs.existsSync(webp192)) return;
    return;
  }

  for (const width of [96, 128, 192]) {
    const output = path.join(root, 'public/images', `dayz-brand-logo-${width}.webp`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
      .webp({ quality: 85, effort: 5, smartSubsample: true })
      .toFile(output);
    console.log(`Wrote ${path.relative(root, output)}`);
  }
}

await optimizeBrandLogo();

console.log('Image optimization complete.');

/**
 * Run Lighthouse on local preview. Usage: node scripts/lighthouse-audit.mjs [baseUrl]
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const base = (process.argv[2] ?? 'http://127.0.0.1:4321').replace(/\/$/, '');
const paths = ['/', '/products/dayz-cheats/', '/blog/', '/blog/dayz-lite-vs-pro/'];
const modes = [
  { name: 'mobile', args: ['--form-factor=mobile', '--screenEmulation.mobile=true'] },
  { name: 'desktop', args: ['--preset=desktop'] },
];

function scoreReport(jsonPath) {
  const r = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const cats = r.categories;
  const scores = {
    performance: Math.round(cats.performance.score * 100),
    accessibility: Math.round(cats.accessibility.score * 100),
    'best-practices': Math.round(cats['best-practices'].score * 100),
    seo: Math.round(cats.seo.score * 100),
  };
  const failed = Object.values(r.audits)
    .filter((a) => a.score !== null && a.score < 1 && !['notApplicable', 'manual', 'informative'].includes(a.scoreDisplayMode))
    .map((a) => ({ id: a.id, score: a.score, title: a.title }));
  return { scores, failed };
}

for (const mode of modes) {
  console.log(`\n=== ${mode.name.toUpperCase()} ===`);
  for (const path of paths) {
    const url = `${base}${path}`;
    const out = `.lighthouse-${mode.name}-${path.replace(/\//g, '_') || 'home'}.json`;
    const args = [
      url,
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json',
      `--output-path=${out}`,
      '--chrome-flags=--headless',
      '--quiet',
      ...mode.args,
    ];
    const res = spawnSync('npx', ['--yes', 'lighthouse', ...args], {
      stdio: 'inherit',
      shell: true,
    });
    if (res.status !== 0) {
      console.error('Lighthouse failed for', url);
      continue;
    }
    const { scores, failed } = scoreReport(out);
    console.log(path || '/', scores);
    const bad = failed.filter((f) => f.score < 1);
    if (bad.length) {
      console.log(
        '  issues:',
        bad.slice(0, 6).map((f) => `${f.id}(${Math.round(f.score * 100)})`).join(', '),
      );
    }
  }
}

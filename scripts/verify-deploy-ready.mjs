import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const DOMAIN = 'cheats-dayz.com';
const SITE_URL = `https://${DOMAIN}`;
const WORKER_NAME = 'cheatsdayz-com';

const errors = [];

function read(file) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) {
    errors.push(`Missing file: ${file}`);
    return '';
  }
  return fs.readFileSync(p, 'utf8');
}

const siteTs = read('src/config/site.ts');
if (!siteTs.includes(`'${DOMAIN}'`)) {
  errors.push(`src/config/site.ts must use SITE_DOMAIN = '${DOMAIN}'`);
}

const astro = read('astro.config.mjs');
if (!astro.includes(SITE_URL)) {
  errors.push(`astro.config.mjs site must be ${SITE_URL}`);
}

const worker = read('worker/index.ts');
if (!worker.includes(`'${DOMAIN}'`)) {
  errors.push(`worker/index.ts CANONICAL_HOST must be ${DOMAIN}`);
}

const wrangler = read('wrangler.toml');
if (!wrangler.includes(`name = "${WORKER_NAME}"`)) {
  errors.push(`wrangler.toml name must be "${WORKER_NAME}"`);
}
if (!wrangler.includes('directory = "./dist"')) {
  errors.push('wrangler.toml [assets] must point at ./dist');
}

if (!fs.existsSync(path.join(root, '.node-version'))) {
  errors.push('Missing .node-version (CI expects Node 22)');
} else {
  const v = fs.readFileSync(path.join(root, '.node-version'), 'utf8').trim();
  if (!v.startsWith('22')) {
    errors.push(`.node-version should be 22.x (got ${v})`);
  }
}

if (!fs.existsSync(path.join(root, 'package-lock.json'))) {
  errors.push('package-lock.json required for npm ci in GitHub Actions');
}

if (errors.length > 0) {
  console.error('verify:deploy FAILED:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log('verify:deploy OK — ready for Cloudflare (deploy first, attach cheats-dayz.com after zone is on account).');

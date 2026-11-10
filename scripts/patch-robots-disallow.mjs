import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSlugRedirectMap } from '../src/config/slug-redirects.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const robotsPath = path.join(root, 'public', 'robots.txt');

const STATIC_DISALLOW = [
  '/cheats/',
  '/contact/',
  '/products/fortnite-cheats/',
  '/products/dota-2-cheats/',
  '/products/dayz-cheats/account-recovery/',
  '/products/dayz-cheats/unlock-all/',
];

const slugRedirects = Object.keys(buildSlugRedirectMap());
const disallow = [...new Set([...STATIC_DISALLOW, ...slugRedirects])].sort();

const marker = '# Legacy 301 sources (no standalone content)';
let text = fs.readFileSync(robotsPath, 'utf8');
const before = text.split(marker)[0].trimEnd();

const block = [
  '',
  marker,
  ...disallow.map((p) => `Disallow: ${p}`),
  '',
].join('\n');

fs.writeFileSync(robotsPath, `${before}\n${block}`);
console.log(`patch-robots-disallow: ${disallow.length} Disallow rules`);

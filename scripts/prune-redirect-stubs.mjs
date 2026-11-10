/**
 * Remove Astro-generated meta-refresh HTML for URLs that are already 301s in dist/_redirects.
 * Cloudflare serves redirects without these files; pruning avoids thin duplicate URLs in SEO crawlers.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistDir } from './dist-dir.mjs';

const dist = resolveDistDir();
const redirectsPath = path.join(dist, '_redirects');

if (!fs.existsSync(redirectsPath)) {
  console.log('prune-redirect-stubs: no dist/_redirects, skip');
  process.exit(0);
}

const redirectSources = new Set();
for (const line of fs.readFileSync(redirectsPath, 'utf8').split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length < 2) continue;
  const code = parts[parts.length - 1];
  if (code !== '301' && code !== '302') continue;
  let from = parts[0];
  if (!from.startsWith('/')) from = `/${from}`;
  if (!from.endsWith('/')) from = `${from}/`;
  redirectSources.add(from);
}

let removed = 0;
for (const from of redirectSources) {
  const rel = from === '/' ? 'index.html' : `${from.slice(1)}index.html`;
  const htmlPath = path.join(dist, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const isRedirectStub =
    html.includes('http-equiv="refresh"') ||
    html.includes("http-equiv='refresh'") ||
    /<title>Redirecting to:/i.test(html);
  if (!isRedirectStub) continue;
  fs.unlinkSync(htmlPath);
  removed += 1;
}

console.log(`prune-redirect-stubs: removed ${removed} redirect HTML stub(s)`);

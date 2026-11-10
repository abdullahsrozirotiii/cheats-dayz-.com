import fs from 'node:fs';
import path from 'node:path';
import { resolveDistDir } from './dist-dir.mjs';
import { isExcludedSitemapPath } from './sitemap-exclude.mjs';

const SITE = 'https://cheats-dayz.com';
const dist = resolveDistDir();

function readSitemapUrls() {
  const allPath = path.join(dist, 'sitemap-all.xml');
  if (!fs.existsSync(allPath)) {
    console.error('validate-seo: missing dist/sitemap-all.xml — run npm run build first.');
    process.exit(1);
  }
  const xml = fs.readFileSync(allPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return locs;
}

function distHtmlForUrl(loc) {
  const url = new URL(loc);
  if (url.origin !== SITE) return null;
  const rel = url.pathname === '/' ? 'index.html' : `${url.pathname.slice(1)}index.html`;
  return path.join(dist, rel.replace(/\//g, path.sep));
}

function checkRobots() {
  const robotsPath = path.join(dist, 'robots.txt');
  const issues = [];
  if (!fs.existsSync(robotsPath)) {
    issues.push('robots.txt missing from dist');
    return issues;
  }
  const text = fs.readFileSync(robotsPath, 'utf8');
  if (!text.includes('Sitemap: https://cheats-dayz.com/sitemap.xml')) {
    issues.push('robots.txt should reference https://cheats-dayz.com/sitemap.xml');
  }
  if (text.includes('Disallow: /go/')) {
    issues.push('robots.txt should not Disallow /go/ (internal checkout links must be crawlable for audits)');
  }
  return issues;
}

const urls = readSitemapUrls();
const errors = [];
const warnings = [];

for (const loc of urls) {
  const url = new URL(loc);
  if (url.protocol !== 'https:' || url.hostname !== 'cheats-dayz.com') {
    errors.push(`Non-canonical host in sitemap: ${loc}`);
  }
  if (!url.pathname.endsWith('/')) {
    errors.push(`Sitemap URL missing trailing slash: ${loc}`);
  }
  if (isExcludedSitemapPath(url.pathname)) {
    errors.push(`Excluded path in sitemap: ${loc}`);
  }
  const htmlPath = distHtmlForUrl(loc);
  if (!htmlPath || !fs.existsSync(htmlPath)) {
    errors.push(`Sitemap URL has no dist HTML: ${loc}`);
    continue;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (title.length < 30 || title.length > 60) {
    warnings.push(`Title length ${title.length} on ${loc}`);
  }
  const h1Count = [...html.matchAll(/<h1[\s>]/gi)].length;
  if (h1Count !== 1) {
    errors.push(`Expected 1 <h1> on ${loc}, found ${h1Count}`);
  }
}

const seen = new Set();
for (const loc of urls) {
  if (seen.has(loc)) errors.push(`Duplicate sitemap URL: ${loc}`);
  seen.add(loc);
}

errors.push(...checkRobots());

// Redirect stubs should not ship as HTML when _redirects handles the path
for (const prefix of ['/cheats/', '/contact/', '/products/fortnite-cheats/', '/products/dota-2-cheats/']) {
  const stub = path.join(dist, prefix.slice(1), 'index.html');
  if (fs.existsSync(stub)) {
    warnings.push(`Redirect stub HTML still present: ${prefix} (run prune-redirect-stubs)`);
  }
}

console.log(`validate-seo: ${urls.length} sitemap URLs checked`);
if (warnings.length) {
  console.log('Warnings:');
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (errors.length) {
  console.error('Errors:');
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log('validate-seo: OK');

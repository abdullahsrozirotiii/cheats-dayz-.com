import fs from 'node:fs';
import path from 'node:path';
import { resolveDistDir } from './dist-dir.mjs';
import { isExcludedSitemapPath } from './sitemap-exclude.mjs';

const SITE = 'https://cheats-dayz.com';
const dist = resolveDistDir();

const HUB_PATHS = ['/about/', '/blog/', '/faq/', '/forum/'];

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

function extractMetaContent(html, name) {
  const re = new RegExp(
    `<meta\\s+name=["']${name}["']\\s+content=["']([^"']*)["']`,
    'i',
  );
  const match = html.match(re);
  return match?.[1]?.trim() ?? '';
}

function extractCanonical(html) {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  return match?.[1]?.trim() ?? '';
}

function extractH1Text(html) {
  const match = html.match(/<h1[^>]*>([^<]*)</i);
  return match?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
}

function checkHubPage(loc, html) {
  const url = new URL(loc);
  if (!HUB_PATHS.includes(url.pathname)) return;

  const expectedCanonical = loc;
  const canonical = extractCanonical(html);
  if (canonical !== expectedCanonical) {
    errors.push(`Hub canonical mismatch on ${loc}: got ${canonical || '(missing)'}`);
  }

  const robots = extractMetaContent(html, 'robots').toLowerCase();
  if (robots.includes('noindex') || robots.includes('nofollow')) {
    errors.push(`Hub meta robots must allow indexing on ${loc}: "${robots}"`);
  }

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (title.length < 45 || title.length > 65) {
    warnings.push(`Hub title length ${title.length} on ${loc} (aim 50–60)`);
  }

  const description = extractMetaContent(html, 'description');
  if (description.length < 120 || description.length > 160) {
    warnings.push(`Hub description length ${description.length} on ${loc} (aim 120–155)`);
  }

  const h1 = extractH1Text(html);
  if (!h1) {
    errors.push(`Hub missing H1 text on ${loc}`);
  } else {
    const titleWords = title
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 3);
    const h1Lower = h1.toLowerCase();
    const missing = titleWords.filter((w) => !h1Lower.includes(w));
    if (missing.length > 2) {
      warnings.push(`Hub H1 may not match title on ${loc}; missing tokens: ${missing.slice(0, 5).join(', ')}`);
    }
  }

  if (!html.includes('hreflang="en"') || !html.includes('hreflang="x-default"')) {
    errors.push(`Hub hreflang en + x-default required on ${loc}`);
  }
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
  checkHubPage(loc, html);
}

const seen = new Set();
for (const loc of urls) {
  if (seen.has(loc)) errors.push(`Duplicate sitemap URL: ${loc}`);
  seen.add(loc);
}

errors.push(...checkRobots());
errors.push(...checkSitemapRobots());
errors.push(...checkSitemapIndex());

function parseRobotsDisallow(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^Disallow:\s+/i.test(line))
    .map((line) => line.replace(/^Disallow:\s+/i, '').trim())
    .filter(Boolean);
}

function pathIsDisallowed(pathname, disallowRules) {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return disallowRules.some((rule) => {
    const normalized = rule.startsWith('/') ? rule : `/${rule}`;
    const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
    return path === withSlash || path.startsWith(withSlash);
  });
}

function checkSitemapRobots() {
  const issues = [];
  const robotsPath = path.join(dist, 'robots.txt');
  const indexPath = path.join(dist, 'sitemap.xml');
  if (!fs.existsSync(robotsPath) || !fs.existsSync(indexPath)) return issues;

  const robotsText = fs.readFileSync(robotsPath, 'utf8');
  const disallowRules = parseRobotsDisallow(robotsText);

  const sitemapAll = path.join(dist, 'sitemap-all.xml');
  if (!fs.existsSync(sitemapAll)) {
    issues.push('sitemap-all.xml missing for robots cross-check');
    return issues;
  }
  const locs = [
    ...fs.readFileSync(sitemapAll, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g),
  ].map((m) => m[1].trim());

  for (const loc of locs) {
    const { pathname } = new URL(loc);
    if (pathIsDisallowed(pathname, disallowRules)) {
      issues.push(`Sitemap URL blocked by robots.txt: ${loc}`);
    }
  }

  const required = [
    '/',
    '/about/',
    '/blog/',
    '/faq/',
    '/forum/',
    '/support/',
    '/products/dayz-cheats/',
  ];
  for (const req of required) {
    const found = locs.some((loc) => new URL(loc).pathname === req);
    if (!found) issues.push(`Required URL missing from sitemap: ${SITE}${req}`);
  }

  return issues;
}

function checkSitemapIndex() {
  const issues = [];
  const indexPath = path.join(dist, 'sitemap.xml');
  if (!fs.existsSync(indexPath)) {
    issues.push('dist/sitemap.xml missing');
    return issues;
  }
  const indexXml = fs.readFileSync(indexPath, 'utf8');
  if (!indexXml.includes('<sitemapindex')) {
    issues.push('sitemap.xml must be a sitemap index (submit this URL in GSC)');
    return issues;
  }
  const childLocs = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (childLocs.length === 0) {
    issues.push('sitemap.xml index has no child sitemaps');
    return issues;
  }
  for (const loc of childLocs) {
    if (!loc.startsWith(`${SITE}/`) || !loc.endsWith('.xml')) {
      issues.push(`Child sitemap must be absolute on ${SITE}: ${loc}`);
      continue;
    }
    const file = path.join(dist, path.basename(new URL(loc).pathname));
    if (!fs.existsSync(file)) {
      issues.push(`Child sitemap file missing: ${file}`);
    }
  }
  const indexCopy = path.join(dist, 'sitemap-index.xml');
  if (!fs.existsSync(indexCopy)) {
    issues.push('sitemap-index.xml missing (mirror of sitemap.xml)');
  } else if (fs.readFileSync(indexCopy, 'utf8') !== indexXml) {
    issues.push('sitemap-index.xml must match sitemap.xml');
  }
  return issues;
}

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

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const port = 3456;
const outFile = path.join(root, 'lighthouse-home.json');
const url = `http://127.0.0.1:${port}/`;

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('Missing dist/index.html — run npm run build first.');
  process.exit(1);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function send(res, status, body, type = 'text/plain') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const raw = decodeURIComponent((req.url ?? '/').split('?')[0]);
  let rel = raw === '/' ? '/index.html' : raw;
  if (rel.endsWith('/')) rel += 'index.html';

  const file = path.normalize(path.join(dist, rel));
  if (!file.startsWith(dist)) {
    send(res, 403, 'Forbidden');
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      send(res, 404, 'Not found');
      return;
    }
    const ext = path.extname(file).toLowerCase();
    send(res, 200, data, MIME[ext] ?? 'application/octet-stream');
  });
});

function runLighthouse() {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const args = [
    '--yes',
    'lighthouse',
    url,
    '--only-categories=performance,accessibility,best-practices,seo',
    '--form-factor=mobile',
    '--screenEmulation.mobile',
    '--throttling-method=simulate',
    '--output=json',
    `--output-path=${outFile}`,
    '--chrome-flags=--headless',
    '--quiet',
  ];

  return new Promise((resolve, reject) => {
    const child = spawn(npx, args, { cwd: root, stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) reject(new Error(`lighthouse exited ${code}`));
      else resolve();
    });
  });
}

server.listen(port, '127.0.0.1', async () => {
  try {
    if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
    await runLighthouse();
    const report = JSON.parse(fs.readFileSync(outFile, 'utf8'));
    if (report.runtimeError) {
      console.error(report.runtimeError.message);
      process.exit(1);
    }
    const scores = {
      performance: Math.round((report.categories.performance?.score ?? 0) * 100),
      accessibility: Math.round((report.categories.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((report.categories['best-practices']?.score ?? 0) * 100),
      seo: Math.round((report.categories.seo?.score ?? 0) * 100),
    };
    console.log('\nLighthouse scores (mobile, simulated):', scores);
    const contrast = report.audits['color-contrast'];
    if (contrast?.score !== 1 && contrast?.details?.items?.length) {
      console.log('color-contrast failures:', contrast.details.items.length);
    }
    const lcp = report.audits['largest-contentful-paint'];
    if (lcp) console.log('LCP:', lcp.displayValue, 'score', lcp.score);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    server.close();
  }
});

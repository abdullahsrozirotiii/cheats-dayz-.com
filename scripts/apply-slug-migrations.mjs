/**
 * One-shot: rewrite internal /blog/, /forum/, product paths and slug fields.
 * Run: node scripts/apply-slug-migrations.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BLOG_SLUG_REDIRECTS,
  FORUM_SLUG_REDIRECTS,
  PRODUCT_SLUG_REDIRECTS,
} from '../src/config/slug-redirects.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (/\.(ts|astro|mjs|md)$/.test(name)) acc.push(full);
  }
  return acc;
}

function replaceBlogForumProductPaths(text) {
  let out = text;
  const blogEntries = Object.entries(BLOG_SLUG_REDIRECTS).sort(
    (a, b) => b[0].length - a[0].length,
  );
  for (const [oldSlug, newSlug] of blogEntries) {
    out = out.replaceAll(`/blog/${oldSlug}/`, `/blog/${newSlug}/`);
  }
  for (const [oldSlug, newSlug] of Object.entries(FORUM_SLUG_REDIRECTS).sort(
    (a, b) => b[0].length - a[0].length,
  )) {
    out = out.replaceAll(`/forum/${oldSlug}/`, `/forum/${newSlug}/`);
  }
  for (const [oldSlug, newSlug] of Object.entries(PRODUCT_SLUG_REDIRECTS)) {
    out = out.replaceAll(`/products/dayz-cheats/${oldSlug}/`, `/products/dayz-cheats/${newSlug}/`);
  }
  return out;
}

function replacePostSlugs(text) {
  let out = text;
  for (const [oldSlug, newSlug] of Object.entries(BLOG_SLUG_REDIRECTS)) {
    out = out.replace(
      new RegExp(`slug:\\s*["']${oldSlug}["']`, 'g'),
      `slug: "${newSlug}"`,
    );
  }
  return out;
}

function replaceForumSlugs(text) {
  let out = text;
  for (const [oldSlug, newSlug] of Object.entries(FORUM_SLUG_REDIRECTS)) {
    if (oldSlug.toLowerCase() === oldSlug) {
      out = out.replace(
        new RegExp(`slug:\\s*['"]${escapeReg(oldSlug)}['"]`, 'g'),
        `slug: '${newSlug}'`,
      );
    }
  }
  // Mixed-case legacy forum slug
  out = out.replace(
    "slug: 'can-custom-lobby-cheat-codes-be-used-in-PvP'",
    "slug: 'dayz-cheat-codes-pvp'",
  );
  return out;
}

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renameProductKeys(text) {
  let out = text;
  out = out.replaceAll("'unlock-all'", "'skin-changer'");
  out = out.replaceAll('"unlock-all"', '"skin-changer"');
  return out;
}

function updateEnProductHref(text) {
  return text.replaceAll(`${'unlock-all'}`, 'skin-changer');
}

const files = walk(path.join(root, 'src'));
let changed = 0;

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const orig = text;
  text = replaceBlogForumProductPaths(text);
  if (file.endsWith('posts.ts')) text = replacePostSlugs(text);
  if (file.endsWith('forum.ts')) text = replaceForumSlugs(text);
  if (file.endsWith('products.ts') || file.endsWith('faq.ts') || file.endsWith('utilities.astro')) {
    text = renameProductKeys(text);
  }
  if (file.endsWith('en.ts')) {
    text = replaceBlogForumProductPaths(text);
    for (const [oldSlug, newSlug] of Object.entries(BLOG_SLUG_REDIRECTS)) {
      text = text.replace(
        new RegExp(`slug:\\s*['"]${escapeReg(oldSlug)}['"]`, 'g'),
        `slug: '${newSlug}'`,
      );
    }
    text = text.replaceAll('unlock-all/', 'skin-changer/');
  }
  if (file.endsWith('pageSeo.ts')) {
    text = replaceBlogForumProductPaths(text);
  }
  if (file.endsWith('checkout.ts')) {
    text = text
      .replace("case 'unlock-all':", "case 'skin-changer':")
      .replace("case 'unlock-all':", "case 'skin-changer':");
    if (!text.includes("case 'unlock-all':")) {
      text = text.replace(
        "case 'skin-changer':\n      return checkoutPath('skinChanger');",
        "case 'skin-changer':\n    case 'unlock-all':\n      return checkoutPath('skinChanger');",
      );
    }
  }
  if (file.endsWith('BlogSidebar.astro')) {
    text = text.replace("productPath('unlock-all')", "productPath('skin-changer')");
  }
  if (text !== orig) {
    fs.writeFileSync(file, text);
    changed += 1;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. ${changed} files changed.`);

/**
 * Fortnite Cheats → DayZ Cheats (cheats-dayz.com) rebrand.
 * Run from project root: node scripts/rebrand-dayz.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');

const TEXT_EXTS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.svg',
  '.html',
  '.webmanifest',
  '.css',
]);

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);

/** Ordered longest-first brand / path / slug replacements. */
const REPLACEMENTS = [
  ['fortnite-cheats.com', 'cheats-dayz.com'],
  ['FortniteCheats', 'DayZCheats'],
  ['Fortnitecheats', 'Dayzcheats'],
  ['fortnitecheats', 'dayzcheats'],

  ['/products/fortnite-cheats', '/products/dayz-cheats'],
  ['products/fortnite-cheats', 'products/dayz-cheats'],
  ['https://zadeyo.com/products/fortnite', 'https://zadeyo.com/products/dayz'],
  ['%2Fproducts%2Ffortnite', '%2Fproducts%2Fdayz'],
  ['/products/fortnite', '/products/dayz'],
  ['/go/fortnite/', '/go/dayz/'],
  ['/go/fortnite', '/go/dayz'],

  ["checkoutPath('fortnite')", "checkoutPath('dayz')"],
  ['checkoutPath("fortnite")', 'checkoutPath("dayz")'],
  ["product: 'fortnite'", "product: 'dayz'"],
  ['  fortnite:', '  dayz:'],
  ['fortnite:', 'dayz:'],

  ['how-to-buy-fortnite-cheats-2026', 'how-to-buy-dayz-cheats-2026'],
  ['how-to-use-fortnite-cheat-codes', 'how-to-use-dayz-cheat-codes'],
  ['fortnite-aimbot-combat-guide', 'dayz-aimbot-combat-guide'],
  ['fortnite-console-commands-cheats', 'dayz-console-commands-cheats'],
  ['fortnite-cheat-codes-guide', 'dayz-cheat-codes-guide'],
  ['fortnite-console-cheats-tips', 'dayz-console-cheats-tips'],
  ['fortnite-cheats-features-guide', 'dayz-cheats-features-guide'],
  ['fortnite-hwid-spoofer-after-ban', 'dayz-hwid-spoofer-after-ban'],
  ['fortnite-external-cheat-guide', 'dayz-external-cheat-guide'],
  ['fortnite-stream-proof-setup', 'dayz-stream-proof-setup'],
  ['fortnite-aimbot-ranked-guide', 'dayz-aimbot-pvp-guide'],
  ['fortnite-skin-changer-guide', 'dayz-clothing-changer-guide'],
  ['fortnite-elite-tier-guide', 'dayz-elite-tier-guide'],
  ['fortnite-esp-wallhack-setup', 'dayz-esp-wallhack-setup'],
  ['fortnite-radar-hack-guide', 'dayz-radar-hack-guide'],
  ['fortnite-lite-vs-pro', 'dayz-lite-vs-pro'],
  ['eac-bypass-fortnite-guide', 'battleye-bypass-dayz-guide'],
  ['eac-patch-day-checklist', 'be-patch-day-checklist'],
  ['fortnite-auto-aim', 'dayz-aimbot'],
  ['fortnite-aimbot-combat', 'dayz-aimbot-combat'],
  ['fortnite-skin-changer', 'dayz-clothing-changer'],
  ['fortnite-player-esp', 'dayz-player-esp'],
  ['fortnite-esp-wallhack', 'dayz-esp-wallhack'],
  ['fortnite-radar-hack', 'dayz-radar-hack'],
  ['fortnite-loot-radar', 'dayz-loot-esp'],
  ['fortnite-cheats', 'dayz-cheats'],
  ["'fortnite'", "'dayz'"],
  ['"fortnite"', '"dayz"'],

  ['Fortnite Cheats & Hacks', 'DayZ Cheats & Hacks'],
  ['Fortnite cheats & hacks', 'DayZ cheats & hacks'],
  ['Fortnite Cheats', 'DayZ Cheats'],
  ['Fortnite cheats', 'DayZ cheats'],
  ['fortnite cheats', 'dayz cheats'],
  ['Fortnite', 'DayZ'],
  ['fortnite', 'dayz'],

  ['Easy Anti-Cheat', 'BattlEye'],
  ['easy anti-cheat', 'BattlEye'],
  ['EAC ban', 'BattlEye ban'],
  ['EAC update', 'BattlEye update'],
  ['EAC patch', 'BattlEye patch'],
  [' after EAC', ' after BattlEye'],
  [' a EAC', ' a BattlEye'],
  ['EAC/', 'BattlEye/'],
  ['/EAC', '/BattlEye'],
  [' EAC ', ' BattlEye '],
  ['(EAC)', '(BattlEye)'],
  ['"EAC"', '"BattlEye"'],
  ["'EAC'", "'BattlEye'"],

  ['fortnite-cheats-com', 'cheatsdayz-com'],
];

const IMAGE_RENAMES = [
  ['fortnite-auto-aim', 'dayz-aimbot'],
  ['fortnite-loot-radar', 'dayz-loot-esp'],
  ['fortnite-player-esp', 'dayz-player-esp'],
  ['fortnite-esp-wallhack', 'dayz-esp-wallhack'],
  ['fortnite-aimbot-combat', 'dayz-aimbot-combat'],
  ['fortnite-skin-changer', 'dayz-clothing-changer'],
  ['fortnite-radar-hack', 'dayz-radar-hack'],
  ['how-to-buy-fortnite-cheats-2026', 'how-to-buy-dayz-cheats-2026'],
  ['how-to-use-fortnite-cheat-codes', 'how-to-use-dayz-cheat-codes'],
  ['fortnite-aimbot-combat-guide', 'dayz-aimbot-combat-guide'],
  ['fortnite-cheat-codes-guide', 'dayz-cheat-codes-guide'],
  ['fortnite-cheats-features-guide', 'dayz-cheats-features-guide'],
  ['fortnite-console-cheats-tips', 'dayz-console-cheats-tips'],
  ['fortnite-console-commands-cheats', 'dayz-console-commands-cheats'],
  ['fortnite-elite-tier-guide', 'dayz-elite-tier-guide'],
  ['fortnite-external-cheat-guide', 'dayz-external-cheat-guide'],
  ['fortnite-hwid-spoofer-after-ban', 'dayz-hwid-spoofer-after-ban'],
  ['fortnite-lite-vs-pro', 'dayz-lite-vs-pro'],
  ['fortnite-aimbot-ranked-guide', 'dayz-aimbot-pvp-guide'],
  ['fortnite-skin-changer-guide', 'dayz-clothing-changer-guide'],
  ['fortnite-stream-proof-setup', 'dayz-stream-proof-setup'],
  ['fortnite-esp-wallhack-setup', 'dayz-esp-wallhack-setup'],
  ['fortnite-radar-hack-guide', 'dayz-radar-hack-guide'],
  ['eac-patch-day-checklist', 'be-patch-day-checklist'],
  ['eac-bypass-fortnite-guide', 'battleye-bypass-dayz-guide'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function applyText(content) {
  let next = content;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function renameImages() {
  const imageRoots = [
    path.join(root, 'public', 'images', 'gameplay'),
    path.join(root, 'public', 'images', 'blog'),
  ];
  for (const dir of imageRoots) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      for (const [from, to] of IMAGE_RENAMES) {
        if (name.startsWith(from)) {
          const dest = name.replace(from, to);
          const fromPath = path.join(dir, name);
          const toPath = path.join(dir, dest);
          if (fromPath !== toPath && !fs.existsSync(toPath)) {
            fs.renameSync(fromPath, toPath);
            console.log('rename image', name, '→', dest);
          }
          break;
        }
      }
    }
  }
}

function renameProductDir() {
  const from = path.join(root, 'src', 'pages', 'products', 'fortnite-cheats');
  const to = path.join(root, 'src', 'pages', 'products', 'dayz-cheats');
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    console.log('renamed product dir → dayz-cheats');
  }
}

renameProductDir();
renameImages();

const files = walk(root).filter((f) => TEXT_EXTS.has(path.extname(f).toLowerCase()));
let changed = 0;
for (const file of files) {
  if (file.endsWith(`${path.sep}rebrand-dayz.mjs`)) continue;
  if (file.endsWith(`${path.sep}rebrand-fortnite.mjs`)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyText(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} text files.`);

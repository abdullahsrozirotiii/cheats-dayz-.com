/**
 * Second-pass vocabulary cleanup: DayZ/Epic/BattlEye leftovers → DayZ/Steam/BattlEye.
 * Run: node scripts/vocab-dayz.mjs
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
]);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);
const SKIP_FILES = new Set(['rebrand-dayz.mjs', 'rebrand-dayz.mjs', 'vocab-dayz.mjs', 'vocab-dayz.mjs']);

const REPLACEMENTS = [
  ['via Epic Games Launcher on Windows', 'via Steam on Windows'],
  ['via Epic Games', 'via Steam'],
  ['Epic Games Launcher', 'Steam'],
  ['Epic Games platform', 'Steam'],
  ['Epic account', 'Steam account'],
  ['Epic locker', 'Steam inventory'],
  ['Epic overlay', 'Steam overlay'],
  ['Epic account restrictions', 'Steam account restrictions'],
  ['DayZ on Epic', 'DayZ on Steam'],
  ['through Epic Games', 'through Steam'],
  ['exiting the Epic Games Launcher', 'exiting Steam'],
  ['Current DayZ client via Epic Games Launcher', 'Current DayZ client via Steam with BattlEye enabled'],
  ['open DayZ settings in the Epic Games Launcher', 'verify DayZ files in Steam'],
  ['reqEpic', 'reqSteam'],
  ['compatEpic', 'compatSteam'],

  ['Epic Terms of Service', 'Bohemia Interactive Terms of Use'],
  ['Epic-approved', 'server-approved'],
  ['Epic-sanctioned', 'community-server'],
  ['Epic review', 'server review'],
  ['Steam Games', 'Steam'],
  [' Epic ', ' Steam '],
  ['Epic,', 'Steam,'],
  ['Epic.', 'Steam.'],

  ['Battle Royale and Zero Build', 'official and community servers'],
  ['Battle Royale, Zero Build', 'official, community, and hardcore servers'],
  ['Battle Royale', 'official servers'],
  ['Zero Build', 'hardcore'],
  ['Ranked Arena', 'high-pop official servers'],
  ['Ranked', 'PvP'],
  ['ranked', 'PvP'],
  ['Creative', 'community'],
  ['creative', 'community'],
  ['bot lobby', 'low-pop test server'],
  ['bot lobbies', 'low-pop test servers'],
  ['Creative islands', 'community test servers'],
  ['Creative maps', 'offline test ranges'],
  ['Creative practice', 'offline practice'],
  ['Creative lobby', 'community server lobby'],
  ['Creative aim trainer', 'firing range test'],
  ['practice lobbies', 'test servers'],

  ['chest and reboot-van locator', 'loot and vehicle locator'],
  ['chest and reboot markers', 'loot and vehicle markers'],
  ['chest and loot', 'military loot and food'],
  ['chest locations', 'loot spawn locations'],
  ['chest ESP', 'loot ESP'],
  ['Chest ESP', 'Loot ESP'],
  ['chests,', 'loot,'],
  [' chests', ' loot'],
  [' chest ', ' loot '],
  ['Chest ', 'Loot '],
  ['reboot van', 'respawn point'],
  ['reboot vans', 'respawn areas'],
  ['supply drop', 'heli crash'],
  ['mythic markers', 'tier-4 loot markers'],
  ['POI', 'town'],
  ['POIs', 'towns'],
  ['storm circle', 'map edge'],
  ['storm edge', 'coastline'],
  ['zone timing', 'server restart timing'],
  ['third-party', 'ambush'],
  ['third-parties', 'ambushes'],
  ['build fights', 'CQB fights'],
  ['through walls and builds', 'through terrain and structures'],
  ['See players through builds', 'See players through terrain'],

  ['ARs, SMGs, snipers and shotguns', 'rifles, pistols, shotguns and bolt actions'],
  ['AR, SMG, shotgun and sniper', 'rifle, pistol, shotgun and bolt action'],
  ['AR mid-range', 'rifle mid-range'],
  ['AR spray', 'rifle burst'],
  ['SMG close', 'pistol close-range'],
  ['shotgun push', 'shotgun room clear'],
  ['assault rifle', 'rifle'],
  ['Sticky Aim', 'Silent aim'],
  ['Auto Finish', 'Finish assist'],
  ['Auto Shield Break', 'Wallbang assist'],
  ['Skin Changer', 'Clothing Changer'],
  ['skin changer', 'clothing changer'],
  ['Unlock All', 'Clothing Unlock'],
  ['outfit skins', 'clothing skins'],
  ['outfits, wraps and pickaxes', 'clothing, backpacks and weapons'],
  ['Outfit, wrap and pickaxe preview', 'Clothing and gear preview'],

  ['DayZ Scripts, Map Hack & ESP', 'DayZ Aimbot, ESP & Wallhack'],
  ['fetch-dayz-gameplay', 'fetch-dayz-gameplay'],
  ['vocab-dayz', 'vocab-dayz'],
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

let changed = 0;
for (const file of walk(root)) {
  if (SKIP_FILES.has(path.basename(file))) continue;
  if (!TEXT_EXTS.has(path.extname(file).toLowerCase())) continue;
  const before = fs.readFileSync(file, 'utf8');
  let next = before;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== before) {
    fs.writeFileSync(file, next);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}
console.log(`Vocab pass done. Updated ${changed} files.`);

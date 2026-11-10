/**
 * Copy user cheat screenshots (long Windows paths) into public/images,
 * then write SEO-named PNGs for gameplay + blog.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const assetsDir =
  'C:\\Users\\3Tee System\\.cursor\\projects\\c-Users-3Tee-System-Downloads-dayz-cheats-com-main\\assets';
const importDir = path.resolve('_import');
const gameplayDir = path.resolve('public/images/gameplay');
const blogDir = path.resolve('public/images/blog');

/** Skip Valorant screenshot only. */
const SKIP_SUBSTRINGS = ['065800-cb09d0b5'];

const GAMEPLAY = [
  { file: 'dayz-esp-wallhack.png', alt: 'DayZ ESP wallhack cheat gameplay with player boxes distance tags and aimbot FOV' },
  { file: 'dayz-aimbot-combat.png', alt: 'DayZ aimbot cheat gameplay with FOV circle and green skeleton ESP on enemy' },
  { file: 'dayz-player-esp.png', alt: 'DayZ player ESP wallhack showing skeletons boxes and distance meters' },
  { file: 'dayz-radar-hack.png', alt: 'DayZ radar and ESP overlay with enemy name tags health and range markers' },
  { file: 'dayz-aimbot.png', alt: 'DayZ sniper aimbot cheat with green ESP box weapon label and FOV circle' },
  { file: 'dayz-loot-esp.png', alt: 'DayZ loot and loot ESP gameplay with enemy boxes and distance trackers' },
  { file: 'dayz-clothing-changer.png', alt: 'DayZ cheat gameplay with chams skeleton ESP and aim lock on pier' },
  { file: 'dayz-thermal-esp.png', alt: 'DayZ thermal vision ESP showing skeleton wallhack HP and distance' },
  { file: 'dayz-build-fight-esp.png', alt: 'DayZ build fight ESP wallhack with names HP bars and FOV circle' },
  { file: 'dayz-arena-wallhack.png', alt: 'DayZ arena wallhack ESP with wireframe players and weapon tags' },
  { file: 'dayz-spawn-island-esp.png', alt: 'DayZ spawn island ESP with skeleton boxes and aimbot reticle' },
  { file: 'dayz-long-range-esp.png', alt: 'DayZ long range ESP wallhack with enemy names health and weapons' },
  { file: 'dayz-aimbot-lock.png', alt: 'DayZ aimbot lock with green skeleton ESP FOV circle and head priority' },
  { file: 'dayz-chams-esp.png', alt: 'DayZ chams and skeleton ESP cheat on wooden pier' },
  { file: 'dayz-squad-esp.png', alt: 'DayZ multi-player ESP wallhack with boxes skeletons and distances' },
  { file: 'dayz-combat-esp.png', alt: 'DayZ combat ESP and aimbot overlay in open field fight' },
];

const BLOG = [
  'dayz-cheat-codes-guide.png',
  'dayz-console-cheats-tips.png',
  'how-to-use-dayz-cheat-codes.png',
  'dayz-cheats-features-guide.png',
  'dayz-console-commands-cheats.png',
  'dayz-lite-vs-pro.png',
  'dayz-elite-tier-guide.png',
  'dayz-aimbot-pvp-guide.png',
  'dayz-esp-wallhack-setup.png',
  'dayz-radar-hack-guide.png',
  'dayz-clothing-changer-guide.png',
  'be-patch-day-checklist.png',
  'dayz-hwid-spoofer-after-ban.png',
  'how-to-buy-dayz-cheats-2026.png',
  'dayz-aimbot-combat-guide.png',
  'battleye-bypass-dayz-guide.png',
  'dayz-external-cheat-guide.png',
  'dayz-stream-proof-setup.png',
];

function longPath(p) {
  const resolved = path.resolve(p);
  if (resolved.startsWith('\\\\?\\')) return resolved;
  return `\\\\?\\${resolved}`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listAssetPngs() {
  const entries = fs.readdirSync(longPath(assetsDir));
  return entries
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .filter((f) => !SKIP_SUBSTRINGS.some((s) => f.includes(s)))
    .sort();
}

async function writeResizedPng(src, dest) {
  const buf = await sharp(src)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 8 })
    .toBuffer();
  fs.writeFileSync(dest, buf);
  console.log('wrote', path.relative(process.cwd(), dest), buf.length);
}

ensureDir(importDir);
ensureDir(gameplayDir);
ensureDir(blogDir);

const sources = listAssetPngs();
console.log(`Found ${sources.length} source screenshots`);

const shortFiles = [];
for (let i = 0; i < sources.length; i++) {
  const name = sources[i];
  const short = `shot-${String(i + 1).padStart(2, '0')}.png`;
  const from = longPath(path.join(assetsDir, name));
  const to = path.join(importDir, short);
  fs.copyFileSync(from, to);
  shortFiles.push(to);
  console.log('copied', short, '←', name.slice(-40));
}

if (!shortFiles.length) {
  console.error('No screenshots copied.');
  process.exit(1);
}

const alts = [];
for (let i = 0; i < GAMEPLAY.length; i++) {
  const src = shortFiles[i % shortFiles.length];
  const dest = path.join(gameplayDir, GAMEPLAY[i].file);
  await writeResizedPng(src, dest);
  alts.push({ file: GAMEPLAY[i].file, alt: GAMEPLAY[i].alt, srcIndex: i % shortFiles.length });
}

for (let i = 0; i < BLOG.length; i++) {
  // Offset so blog covers prefer different frames than gameplay slots when possible
  const src = shortFiles[(i + 3) % shortFiles.length];
  await writeResizedPng(src, path.join(blogDir, BLOG[i]));
}

fs.writeFileSync(
  path.join(process.cwd(), 'scripts', 'gameplay-image-alts.json'),
  JSON.stringify({ gameplay: alts, sourceCount: shortFiles.length }, null, 2),
);

console.log('Done. Next: npm run optimize:images');

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const importDir = path.join(root, '_dayz-images-import', 'Dayz');
const gameplayDir = path.join(root, 'public', 'images', 'gameplay');
const blogDir = path.join(root, 'public', 'images', 'blog');

function listImportFiles() {
  return fs.readdirSync(importDir).map((name) => path.join(importDir, name));
}

function findImport(match) {
  const files = listImportFiles();
  const hit = files.find((f) => path.basename(f).includes(match));
  if (!hit) throw new Error(`Import file not found for match: ${match}`);
  return hit;
}

async function writePng(input, output) {
  await sharp(input).png({ compressionLevel: 9 }).toFile(output);
  console.log(`Wrote ${path.relative(root, output)}`);
}

async function copyAsPng(input, output) {
  if (input === output) return;
  await writePng(input, output);
}

/** Primary gameplay shots (hero + product gallery). */
const gameplayPrimary = {
  'dayz-esp-wallhack.png': 'FQRNV2LQB0o - 1091x614 - 0m22s',
  'dayz-aimbot-combat.png': 'is2uaMENOfk - 1091x614 - 1m04s',
  'dayz-radar-hack.png': 'Gemini_Generated_Image_33bdif',
  'dayz-clothing-changer.png': 'U6_bnI3zXbM - 1091x614 - 0m42s',
  'dayz-aimbot.png': 'FQRNV2LQB0o - 1091x614 - 0m30s',
  'dayz-loot-esp.png': 'ZlOmWrypARg - 1091x614 - 0m25s',
  'dayz-player-esp.png': 'FQRNV2LQB0o - 1091x614 - 0m28s',
};

/** Extra gallery filenames — reuse primary sources. */
const gameplayAliases = {
  'dayz-thermal-esp.png': 'dayz-player-esp.png',
  'dayz-build-fight-esp.png': 'dayz-esp-wallhack.png',
  'dayz-arena-wallhack.png': 'dayz-aimbot-combat.png',
  'dayz-spawn-island-esp.png': 'dayz-player-esp.png',
  'dayz-long-range-esp.png': 'dayz-aimbot.png',
  'dayz-aimbot-lock.png': 'dayz-aimbot-combat.png',
  'dayz-chams-esp.png': 'dayz-clothing-changer.png',
  'dayz-squad-esp.png': 'dayz-esp-wallhack.png',
  'dayz-combat-esp.png': 'dayz-aimbot-combat.png',
};

const blogTargets = [
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

const blogSources = [
  'Gemini_Generated_Image_7xulhe',
  'Gemini_Generated_Image_p8a7x3',
  'Gemini_Generated_Image_x0nvlbx',
  'Gemini_Generated_Image_ylt2b3',
  'XUETA4vffMo - 1091x614 - 0m00s',
  'jUrPBaovXAQ - 1091x614 - 0m01s',
  'is2uaMENOfk - 1091x614 - 1m05s',
  'is2uaMENOfk - 1091x614 - 1m07s',
  'ZlOmWrypARg - 1091x614 - 0m30s',
  'ZlOmWrypARg - 1091x614 - 0m45s',
  'FQRNV2LQB0o - 1091x614 - 0m25s',
  'FQRNV2LQB0o - 1091x614 - 0m26s',
  'FQRNV2LQB0o - 1091x614 - 0m34s',
  'FQRNV2LQB0o - 1091x614 - 0m38s',
  'FQRNV2LQB0o - 1091x614 - 0m53s',
  'FQRNV2LQB0o - 1091x614 - 1m15s',
  'FQRNV2LQB0o - 1091x614 - 1m20s',
  'U6_bnI3zXbM - 1091x614 - 1m20s',
];

function cleanGenerated(dir) {
  for (const file of fs.readdirSync(dir)) {
    if (!/fortnite-/i.test(file) && !/-\d+\.webp$/i.test(file)) continue;
    const full = path.join(dir, file);
    if (fs.existsSync(full)) fs.unlinkSync(full);
  }
}

async function main() {
  if (!fs.existsSync(importDir)) {
    console.error('Missing _dayz-images-import/Dayz — extract Dayz.zip first.');
    process.exit(1);
  }

  cleanGenerated(gameplayDir);
  cleanGenerated(blogDir);

  const writtenGameplay = new Map();

  for (const [name, match] of Object.entries(gameplayPrimary)) {
    const input = findImport(match);
    const output = path.join(gameplayDir, name);
    await copyAsPng(input, output);
    writtenGameplay.set(name, output);
  }

  for (const [alias, primary] of Object.entries(gameplayAliases)) {
    const source = writtenGameplay.get(primary);
    const output = path.join(gameplayDir, alias);
    await copyAsPng(source, output);
  }

  if (blogSources.length !== blogTargets.length) {
    throw new Error('Blog source/target count mismatch');
  }

  for (let i = 0; i < blogTargets.length; i++) {
    const input = findImport(blogSources[i]);
    const output = path.join(blogDir, blogTargets[i]);
    await copyAsPng(input, output);
  }

  console.log('DayZ image import complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

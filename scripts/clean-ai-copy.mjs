import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/utils/schema.ts',
  'src/utils/rss.ts',
  'src/data/faq.ts',
  'src/data/blog/posts.ts',
  'src/i18n/en.ts',
  'src/config/site.ts',
];

const reps = [
  ['DayZCheats Editorial', 'DayZ Cheats'],
  ['DayZCheats Community Forum', 'DayZ Cheats Forum'],
  ['DayZCheats Blog', 'DayZ Cheats Blog'],
  ['DayZCheats Support', 'DayZ Cheats Support'],
  ['Join DayZCheats on Discord', 'Join DayZ Cheats on Discord'],
  ['DayZCheats home', 'DayZ Cheats home'],
  ['DayZCheats', 'DayZ Cheats'],
  ["TITLE_PREFIX = 'DayZ Cheats & Hacks'", "TITLE_PREFIX = 'DayZ Cheats'"],
  ['humanized Aimbot', 'smooth aimbot'],
  ['humanized order', 'smooth order'],
  ['humanized input', 'smooth input'],
  ['humanized', 'smooth'],
  [
    'Climbing PvP play with dayz aimbot means smooth aimbot—not instant bot bursts that draw reports.',
    'PvP DayZ aimbot works better with smooth tracking than instant snaps that get you reported.',
  ],
  [
    'maintains private dayz cheats for Windows PC official and community servers—not console lobby codes. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells DayZ cheats for Windows PC official and community servers. Check status before you queue after a patch.',
  ],
  [
    'maintains private dayz cheats for Windows PC official and community servers. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells DayZ cheats for Windows PC official and community servers. Check status before you queue after a patch.',
  ],
  [
    'maintains private dayz cheats for Windows PC official and community servers. Check live status before every patch-day queue.',
    'sells DayZ cheats for Windows PC official and community servers. Check status before you queue after a patch.',
  ],
  [
    'maintains private dayz cheats for Windows PC official and community servers.',
    'sells DayZ cheats for Windows PC official and community servers.',
  ],
  [
    'ships a modular external suite for Windows PC PvP—not lobby cheat codes. Aimbot tracks targets, loot assist clears towns, ESP wallhack exposes ambushes, and utility tools like Radar Hack and Clothing Changer round out the toolkit. This is the complete feature map across',
    'sells external DayZ cheats for PC PvP. Aimbot, loot assist, ESP wallhack, radar and Clothing Changer. See',
  ],
];

for (const rel of files) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of reps) text = text.split(from).join(to);
  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('updated', rel);
  } else {
    console.log('noop', rel);
  }
}

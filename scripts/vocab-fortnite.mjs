/**
 * Second-pass vocabulary cleanup: Dota/Steam/VAC leftovers → DayZ.
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
const SKIP_FILES = new Set(['rebrand-dayz.mjs', 'vocab-dayz.mjs']);

const REPLACEMENTS = [
  ['via Steam on Windows', 'via Steam on Windows'],
  ['via Steam', 'via Steam'],
  ['on Steam PC', 'on PC'],
  ['Steam PC', 'Windows PC'],
  ['Steam account', 'Steam account'],
  ['Steam inventory', 'Steam inventory'],
  ['Steam platform', 'Steam'],
  ['Steam overlay', 'Steam overlay'],
  ['Steam restrictions', 'Steam account restrictions'],
  ['Steam DayZ', 'DayZ on Steam'],
  ['through Steam', 'through Steam'],
  ['exiting Steam', 'exiting the Steam'],
  ['Current DayZ client via Steam', 'Current DayZ client via Steam Launcher'],
  ['right-click DayZ → Properties', 'open DayZ settings in the Steam'],
  ['reqSteam', 'reqSteam'],
  ['compatSteam', 'compatSteam'],
  [' Steam ', ' Steam Games '],
  ['Steam,', 'Epic Games,'],
  ['Steam.', 'Epic Games.'],
  ['Steam)', 'Epic Games)'],
  ['(Steam', '(Epic Games'],

  ['Valve Terms of Use', 'Bohemia Interactive Terms of Use'],
  ['Valve-approved', 'server-approved'],
  ['Valve-sanctioned', 'community-server'],
  ['Valve practice', 'community practice'],
  ['Valve review', 'server review'],
  ['Valve lobby', 'community lobby'],
  [' Valve ', ' Steam '],
  ['Valve,', 'Steam,'],
  ['Valve.', 'Steam.'],

  [' after VAC', ' after BattlEye'],
  [' game, VAC,', ' game, EAC,'],
  ['VAC-aware', 'EAC-aware'],
  ['VAC enforcement', 'EAC enforcement'],
  [' VAC ', ' BattlEye '],
  ['(VAC)', '(BattlEye)'],

  ['PvP MMR', 'PvP play'],
  ['live MMR', 'live PvP'],
  ['high-MMR', 'high-rank'],
  ['climbing MMR', 'climbing rank'],
  ['in MMR', 'in PvP'],
  ['MMR games', 'PvP games'],
  ['MMR.', 'rank.'],
  [' MMR ', ' rank '],

  ['PvP and Turbo', 'official and community servers'],
  ['PvP, Turbo', 'official, community, and hardcore servers'],
  ['Turbo or low-pop test servers', 'community or hardcore lobbies'],
  ['Turbo lobby', 'hardcore lobby'],
  ['Turbo preset', 'hardcore preset'],
  ['Turbo-friendly', 'hardcore-friendly'],
  ['and Turbo', 'and hardcore'],
  ['or Turbo', 'or hardcore'],
  [' Turbo', ' hardcore'],
  ['Turbo ', 'hardcore '],

  ['map hack and zoom hack', 'ESP wallhack and radar hack'],
  ['scripts, map hack, and zoom hack', 'aimbot, ESP wallhack, and radar hack'],
  ['scripts, map hack, zoom hack', 'aimbot, ESP, and radar hack'],
  ['scripts, map hack and clothing changer', 'aimbot, ESP and clothing changer'],
  ['map hack, zoom hack', 'ESP, radar hack'],
  ['map hack and', 'ESP wallhack and'],
  ['full map hack', 'full ESP wallhack'],
  ['Map hack and hero ESP', 'ESP wallhack and player ESP'],
  ['map hack ESP', 'ESP wallhack'],
  ['map hack setup', 'ESP wallhack setup'],
  ['map hack', 'ESP wallhack'],
  ['Map hack', 'ESP wallhack'],
  ['Map Hack', 'ESP Wallhack'],
  ['zoom hack', 'radar hack'],
  ['Zoom hack', 'Radar hack'],
  ['Zoom Hack', 'Radar Hack'],

  ['Auto Combo', 'Aimbot'],
  ['auto combo', 'aimbot'],
  ['Auto Farm Bot', 'Loot Assist'],
  ['Auto Kill Steal', 'Finish assist'],
  ['Auto Dagon', 'Wallbang assist'],
  ['Orbwalker', 'Smooth Aim'],
  ['Smart Cast', 'Silent aim'],
  ['Target Selector', 'Bone Priority'],
  ['Activator for BKB, Hex and Orchid', 'hotkey macros for heals and mobility'],
  ['Activator (BKB/Hex/Orchid)', 'Hotkey macros (heals/shields)'],
  ['Activator', 'Hotkey macros'],
  ['Delay Setting', 'Smoothness sliders'],

  ['Invoker, Lion, PA and burst cores', 'rifles, pistols, shotguns and bolt actions'],
  ['Invoker, Lion, PA', 'ARs, SMGs, and snipers'],
  ['Invoker Tornado → EMP → Meteor chain', 'rifle burst with sticky aim and bone priority'],
  ['Invoker invoke', 'weapon swap'],
  ['Invoker', 'rifle'],
  ['Timbersaw combo', 'shotgun room clear'],
  ['burst heroes', 'close-range loadouts'],
  ['mids on burst', 'aggressive players on'],
  ['per-hero', 'per-weapon'],
  ['Per-hero', 'Per-weapon'],
  ['hero configs', 'weapon configs'],
  ['hero ESP', 'player ESP'],
  ['Hero ESP', 'Player ESP'],
  ['enemy hero', 'enemy player'],
  ['enemy heroes', 'enemy players'],
  ['hero positions', 'player positions'],
  ['hero boxes', 'player boxes'],
  ['Hero boxes', 'Player boxes'],
  ['hero arcanas', 'clothing skins'],
  ['hero,', 'player,'],
  [' heroes', ' players'],
  [' Heroes', ' Players'],
  [' hero ', ' player '],
  [' Hero ', ' Player '],

  ['ward and sentry locator', 'loot and vehicle locator'],
  ['ward and sentry markers', 'loot and vehicle markers'],
  ['ward and rune', 'military loot and food'],
  ['ward, rune', 'chest, loot'],
  ['ward placements', 'loot spawn locations'],
  ['ward locations', 'loot spawn locations'],
  ['ward lines', 'sight lines'],
  ['ward spots', 'high-ground spots'],
  ['ward study', 'cover study'],
  ['ward ESP', 'loot ESP'],
  ['ward information', 'chest information'],
  ['placed wards', 'placed markers'],
  ['observer and sentry ward', 'chest and reboot'],
  ['hiding wards', 'holding cover'],
  ['-killwards', 'clear markers'],
  ['wards,', 'loot,'],
  [' wards', ' loot'],
  [' ward ', ' loot '],
  ['Ward ', 'Loot '],

  ['rune timers', 'loot timers'],
  ['rune spawn timers', 'loot spawn timers'],
  ['rune information', 'loot information'],
  ['rune timings', 'loot timings'],
  ['power runes', 'rare loot'],
  ['power rune', 'rare loot'],
  ['bounty and power', 'chest and rare'],
  ['Bounty and power', 'Loot and rare'],
  ['runes and', 'loot and'],
  [' runes', ' loot'],
  [' rune', ' loot'],
  ['Rune ', 'Loot '],

  ['arcanas and immortals', 'skins and wraps'],
  ['arcana and immortal', 'skin and wrap'],
  ['Arcana & immortal', 'Skin & wrap'],
  ['arcanas,', 'skins,'],
  ['immortals and exclusive sets', 'wraps and exclusive sets'],
  ['previewed arcanas', 'previewed skins'],
  ['arcana cosmetic', 'skin cosmetic'],
  ['Local arcana', 'Local skin'],

  ['net worth', 'loadout value'],
  ['jungle cam', 'town cam'],
  ['jungle routes', 'town routes'],
  ['Jungle camp', 'town'],
  ['jungle pathing', 'town pathing'],
  ['teamfights', 'squad fights'],
  ['dive your lane', 'ambush your fight'],
  ['last-hit precision in lane', 'precision in CQB fights'],
  ['Lane Control AI', 'Rotation Assist AI'],
  ['Lane last-hit', 'Close-range finish'],
  ['under tower', 'under pressure'],
  ['ganks and map control', 'ambushes and rotations'],
  ['See Ganks Before They Hit', 'See Third Parties Before They Hit'],
  ['Minimap & Runes', 'Radar & Loot'],
  ['minimap hack', 'radar overlay'],
  ['Minimap', 'Radar'],
  ['minimap', 'radar'],
  ['wave timing', 'server restart timing'],
  ['Fog of war', 'Storm circle'],
  ['fog of war', 'map edge'],

  ['DayZ Aimbot, ESP & Wallhack', 'DayZ Aimbot, ESP & Wallhack'],
  ['humanized scripts', 'humanized aimbot'],
  ['script automation', 'aimbot automation'],
  ['script delays', 'aimbot smoothness'],
  ['script engine', 'aimbot engine'],
  ['hero scripts', 'weapon aim profiles'],
  ['Scripts,', 'Aimbot,'],
  [' scripts', ' aimbot'],
  ['Scripts ', 'Aimbot '],
  [' scripts.', ' aimbot.'],

  ['npc_dayz_hero_invoker', 'training_bot'],
  ['-createhero', '-spawnbot'],
  ['item_orchid', 'item_shield'],
  ['Orchid Malevolence', 'Shield Potion'],
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

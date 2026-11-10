/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'DayZ Cheats | Aimbot, ESP, Radar & Loot — cheatsdayz.com',
    description:
      'DayZ cheats for Standalone on PC — undetected aimbot, ESP loot finder, radar and Lite, Pro, Elite tiers. Official and community server presets at cheatsdayz.com.',
  },
  '/products/dayz-cheats/': {
    title: 'Buy DayZ Cheats | Lite, Pro, Elite & Utilities',
    description:
      'Shop DayZ cheats for PC: Lite ESP, Pro aimbot, Elite full suite, HWID spoofer, UGC appeals and Clothing Changer. Compare tiers before checkout.',
  },
  '/products/dayz-cheats/tiers/': {
    title: 'DayZ Cheats Tiers | Compare Lite, Pro & Elite',
    description:
      'Compare DayZ Lite, Pro and Elite cheats — ESP, aimbot, loot assist and Clothing Changer. $35/month or $150 lifetime via secure checkout.',
  },
  '/products/dayz-cheats/lite/': {
    title: 'Buy DayZ Lite Cheats | ESP, Radar & Loot ESP',
    description:
      'Buy DayZ Lite cheats for PC — player ESP, loot ESP, radar overlay and stream-proof mode without aimbot. BattlEye-aware updates on cheatsdayz.com.',
  },
  '/products/dayz-cheats/pro/': {
    title: 'Buy DayZ Pro Cheats | Aimbot & ESP for PvP',
    description:
      'Buy DayZ Pro cheats — aimbot, silent aim, player ESP and radar for PvP on PC Steam. Includes all Lite modules plus PvP presets.',
  },
  '/products/dayz-cheats/elite/': {
    title: 'Buy DayZ Elite Cheats | Full Cheat Suite PC',
    description:
      'Buy DayZ Elite cheats with aimbot, full ESP, loot assist, Clothing Changer and priority BattlEye patch updates. Limited slots.',
  },
  '/products/dayz-cheats/hwid-spoofer/': {
    title: 'Buy DayZ HWID Spoofer | Hardware Ban Bypass',
    description:
      'Buy a DayZ HWID spoofer for PC hardware bans — disk/MAC tools, compatibility scan and post-spoof checks before you launch cheats again.',
  },
  '/products/dayz-cheats/ugc/': {
    title: 'Buy DayZ UGC | BattlEye & Steam Ban Appeal Tools',
    description:
      'Buy DayZ UGC (Unban & Governance Control) to organize Steam and BattlEye ban appeals, dispute workflows and case tracking.',
  },
  '/products/dayz-cheats/skin-changer/': {
    title: 'Buy DayZ Clothing Changer | Clothing Unlock Cosmetics',
    description:
      'Buy DayZ Clothing Changer / Clothing Unlock — local outfit, wrap and pickaxe previews with your DayZ cheats loadout.',
  },
  '/products/dayz-cheats/utilities/': {
    title: 'DayZ Cheat Utilities | HWID, UGC & Skins',
    description:
      'Buy DayZ cheat utilities: HWID spoofer after hardware bans, UGC for Steam/BattlEye appeals, and local Clothing Changer / Clothing Unlock.',
  },
  '/blog/': {
    title: 'DayZ Cheat Guides | ESP, Aimbot, BattlEye',
    description:
      'DayZ cheat guides: aimbot tuning, ESP setup, Lite vs Pro tiers, HWID spoofer notes and BattlEye patch-day checklists.',
  },
  '/forum/': {
    title: 'DayZ Cheats Forum | Aimbot, ESP & Setup Help',
    description:
      'DayZ cheats forum for aimbot configs, ESP setup, BattlEye status and product questions before you buy.',
  },
  '/faq/': {
    title: 'DayZ Cheats FAQ | Aimbot, ESP, Bans & Setup',
    description:
      'DayZ cheats FAQ — tiers, aimbot, ESP, radar, HWID spoofer, Clothing Changer, bans and loader setup before checkout.',
  },
  '/terms/': {
    title: 'Terms for DayZ Cheats | License & Refunds',
    description:
      'Terms for buying DayZ cheats on cheatsdayz.com — license use, delivery, refunds and account risk.',
  },
  '/privacy/': {
    title: 'Privacy Policy | DayZ Cheats Shop',
    description:
      'How the DayZ cheats shop at cheatsdayz.com uses analytics, cookies and contact data.',
  },
  '/about/': {
    title: 'About DayZ Cheats | Buy PC Aimbot & ESP',
    description:
      'About DayZ Cheats — we sell PC DayZ cheats (aimbot, ESP, radar), guides and utilities at cheatsdayz.com.',
  },
  '/support/': {
    title: 'DayZ Cheats Support | Loader, HWID & Checkout',
    description:
      'DayZ cheats support for loader setup, aimbot/ESP configs, HWID spoofing and checkout help via the official Levo store and setup guides on cheatsdayz.com.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}

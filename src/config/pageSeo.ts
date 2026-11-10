/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

const domain = 'cheats-dayz.com';

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: `DayZ Cheats | Aimbot, ESP & Radar — ${domain}`,
    description:
      'DayZ cheats for PC: aimbot, ESP, radar and Lite/Pro/Elite tiers. Undetected presets and checkout at cheats-dayz.com.',
  },
  '/products/dayz-cheats/': {
    title: 'Buy DayZ Cheats | Lite, Pro, Elite & Utilities',
    description:
      'Shop DayZ cheats: Lite ESP, Pro aimbot, Elite suite, HWID spoofer, game accounts and skin changer. Compare on cheats-dayz.com.',
  },
  '/products/dayz-cheats/tiers/': {
    title: 'DayZ Cheats Tiers | Compare Lite, Pro & Elite',
    description:
      'Compare DayZ Lite, Pro and Elite — ESP, aimbot, loot assist and utilities. Secure checkout at cheats-dayz.com.',
  },
  '/products/dayz-cheats/lite/': {
    title: 'Buy DayZ Lite Cheats | ESP, Radar & Loot ESP',
    description:
      'DayZ Lite cheats: player ESP, loot ESP and radar without aimbot. BattlEye-aware updates at cheats-dayz.com.',
  },
  '/products/dayz-cheats/pro/': {
    title: 'Buy DayZ Pro Cheats | Aimbot & ESP for PvP',
    description:
      'DayZ Pro: aimbot, silent aim, player ESP and radar for PvP on Steam. All Lite modules included. cheats-dayz.com.',
  },
  '/products/dayz-cheats/elite/': {
    title: 'Buy DayZ Elite Cheats | Full Cheat Suite PC',
    description:
      'DayZ Elite: full ESP, loot assist, Clothing Changer and priority patch queue. Limited slots — cheats-dayz.com.',
  },
  '/products/dayz-cheats/hwid-spoofer/': {
    title: 'Buy DayZ HWID Spoofer | Hardware Ban Recovery',
    description:
      'HWID spoofer for hardware bans — Vanguard, EAC, BattlEye support lists and cleanup steps. cheats-dayz.com.',
  },
  '/products/dayz-cheats/ugc/': {
    title: 'Buy Game Accounts | Ranked & Starter Stock',
    description:
      'Ready-made game accounts with secure handoff after checkout. Ranked, leveled and starter stock at cheats-dayz.com.',
  },
  '/products/dayz-cheats/skin-changer/': {
    title: 'Buy Skin Changer | In-Game Cosmetics',
    description:
      'Skin Changer for cosmetic control across supported titles. Local previews and secure checkout at cheats-dayz.com.',
  },
  '/products/dayz-cheats/utilities/': {
    title: 'DayZ Cheat Utilities | HWID, Accounts & Skins',
    description:
      'HWID spoofer, game accounts (UGC) and skin changer utilities for DayZ players. Details at cheats-dayz.com.',
  },
  '/blog/': {
    title: 'DayZ Cheat Guides Hub | Aimbot, ESP & BattlEye',
    description:
      'DayZ cheat guides for aimbot tuning, ESP setup, tier picks, HWID recovery and BattlEye patch days. Step-by-step posts at cheats-dayz.com/blog.',
  },
  '/forum/': {
    title: 'DayZ Cheats Forum | Setup, Config & Community Help',
    description:
      'Community forum for DayZ aimbot configs, ESP overlays, BattlEye status and product questions. Join threads at cheats-dayz.com/forum.',
  },
  '/faq/': {
    title: 'DayZ Cheats FAQ | Aimbot, ESP, Bans & Loader Setup',
    description:
      'FAQ on DayZ cheat tiers, aimbot, ESP wallhack, HWID spoofer, hardware bans, loader setup and checkout—before you buy at cheats-dayz.com.',
  },
  '/terms/': {
    title: 'Terms for DayZ Cheats | License & Refunds',
    description:
      'Terms for buying DayZ cheats on cheats-dayz.com — license use, delivery, refunds and account risk.',
  },
  '/privacy/': {
    title: 'Privacy Policy | DayZ Cheats Shop',
    description:
      'How cheats-dayz.com uses analytics, cookies and contact data. We do not store payment card numbers.',
  },
  '/about/': {
    title: 'About the DayZ Cheats Shop | PC Aimbot, ESP & Radar',
    description:
      'About cheats-dayz.com: PC DayZ aimbot, ESP and radar tiers, patch-day status, cheat guides, utilities and Discord support for Lite, Pro and Elite.',
  },
  '/support/': {
    title: 'DayZ Cheats Support | Loader & Checkout',
    description:
      'Support for loader setup, aimbot/ESP configs, HWID tools and checkout help via cheats-dayz.com.',
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

import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const P = {
  elite: productPath('elite'),
  lite: productPath('lite'),
  pro: productPath('pro'),
  products: ROUTES.products,
  hwid: productPath('hwid-spoofer'),
  ugc: productPath('ugc'),
  skin: productPath('skin-changer'),
  faq: ROUTES.faq,
  blog: ROUTES.blog,
} as const;

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if DayZ cheats are online?',
    a: a('The live status banner is on cheats-dayz.com and in the Discord #status channel. Always check after a DayZ or BattlEye update.'),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a('Your portal unlocks the loader, setup guide and config library via our secure checkout. Follow the guide before launching DayZ.'),
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('DayZ via Steam on Windows 10/11 64-bit only. macOS and Linux are not supported.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a('Yes—use the HWID reset in your portal or open a Discord ticket. Limits depend on your tier.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are products and utilities listed?',
    a: `${link('DayZ products hub', P.products)} lists cheat tiers, ${link('HWID spoofer utility', P.hwid)}, ${link('UGC appeal workspace', P.ugc)}, and ${link('Clothing Changer tool', P.skin)} with feature lists and checkout via our partner.`,
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What is DayZ ESP wallhack / ESP?',
    a: `ESP wallhack and player ESP show enemy positions, loot, loot and town camps through map edge. ${link('Lite ESP & radar tier', P.lite)} covers awareness overlays. ${link('Pro aimbot package', P.pro)} and ${link('Elite script suite', P.elite)} add script modules on top.`,
    scopes: ['lite', 'pro', 'elite'],
  },
  {
    id: 'esp-vs-scripts',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What is the difference between ESP wallhack and aimbot?',
    a: `ESP wallhack and ESP are information overlays—they do not cast abilities. Aimbot, Smooth Aim and Silent aim are aimbot on ${link('Pro PvP tier', P.pro)} and ${link('Elite bot suite', P.elite)}. You can run awareness-only on ${link('Lite radar package', P.lite)}.`,
  },
  {
    id: 'which-tier-esp',
    topic: 'plans',
    icon: 'faqWhichTierEsp',
    q: 'Which tier do I need for ESP wallhack only?',
    a: `${link('DayZ Lite awareness', P.lite)} is awareness only: player ESP, loot locator, loot timers and radar hack. ${link('DayZ Pro aimbot', P.pro)} adds aimbot. ${link('DayZ Elite bots', P.elite)} adds bots, kill steal and Clothing Changer.`,
    scopes: ['lite'],
  },
  {
    id: 'which-tier-scripts',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'Which tier includes Aimbot?',
    a: `${link('Pro tier scripts', P.pro)} ships Aimbot, Smooth Aim, Silent aim and Hotkey macros. ${link('Elite full package', P.elite)} includes everything in Pro plus Loot Assist and Finish assist. ${link('Lite-only ESP', P.lite)} has no aimbot automation.`,
    scopes: ['pro'],
  },
  {
    id: 'rank-lite-vs-pro',
    topic: 'plans',
    icon: 'faqRankTiers',
    q: 'How do you rank Lite vs Pro vs Elite?',
    a: `Map awareness only → ${link('compare Lite radar', P.lite)}. PvP gunfights with aimbot → ${link('compare Pro aimbot', P.pro)}. Full bot suite and priority patches → ${link('compare Elite suite', P.elite)}. Compare on each cheat page or the ${link('complete FAQ index', P.faq)}.`,
  },
  {
    id: 'elite-slots',
    topic: 'plans',
    icon: 'faqEliteSlots',
    q: 'Why is Elite limited slots?',
    a: `Elite is a private build with direct dev support and priority patch delivery. Slot caps keep patch cycles fast. Check the status banner before checkout.`,
    scopes: ['elite'],
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Can OBS capture my overlay?',
    a: `Stream-proof mode on ${link('Lite stream-proof ESP', P.lite)}, ${link('Pro stream presets', P.pro)} and ${link('Elite OBS-safe build', P.elite)} hides overlays from OBS and Discord share. Test a local recording before going live.`,
  },
  {
    id: 'undetected',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Are undetected DayZ cheats guaranteed?',
    a: a('No. Undetected is current status on the product page—not a permanent guarantee. Stop if the build shows updating, testing, or detected.'),
  },
  {
    id: 'esp-safer',
    topic: 'safety',
    icon: 'faqEspSafer',
    q: 'Is ESP wallhack safer than aimbot?',
    a: a('ESP is quieter in replay than obvious bot patterns, but it is still a cheat. BattlEye does not ignore overlays because you left aimbot off.'),
  },
  {
    id: 'hwid-when',
    topic: 'products',
    icon: 'faqHwidWhen',
    q: 'When do I need the HWID Spoofer?',
    a: `Use ${link('HWID Spoofer product', P.hwid)} when fresh Steam accounts fail instantly on one PC but work elsewhere—hardware enforcement. Not for account-only BattlEye cases; see ${link('UGC ban appeals', P.ugc)} instead.`,
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'ugc-what',
    topic: 'products',
    icon: 'faqUgcWhat',
    q: 'What is UGC?',
    a: `${link('UGC recovery tool', P.ugc)} (Unban & Governance Control) is an appeal workspace for Steam account restrictions and BattlEye bans—custom workflows and case tracking, not a guaranteed unban service.`,
    scopes: ['ugc'],
  },
  {
    id: 'skin-changer',
    topic: 'products',
    icon: 'faqSkinChanger',
    q: 'Does Clothing Changer modify my Steam inventory?',
    a: `${link('Skin Changer preview', P.skin)} previews cosmetics locally on your client. Other players see your real inventory. Included with ${link('Elite tier bundle', P.elite)}; available standalone for cosmetic preview only.`,
    scopes: ['skin-changer'],
  },
  {
    id: 'external-loader',
    topic: 'products',
    icon: 'faqExternalLoader',
    q: 'Is the loader injected into the Steam folder?',
    a: `DayZ Cheats runs external with cloud config sync—no files injected into the DayZ directory. BattlEye risk still applies. See ${link('all DayZ products', P.products)}.`,
  },
  {
    id: 'blog-vs-cheats',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Are blog cheat codes the same as PvP cheats?',
    a: `No. Blog articles about Steam console commands apply only in custom lobbies with cheats enabled. PvP DayZ cheats are separate products—see ${link('Lite tier page', P.lite)}, ${link('Pro tier page', P.pro)} and ${link('Elite tier page', P.elite)}.`,
  },
  {
    id: 'blog-setup',
    topic: 'blog',
    icon: 'faqBlogSetup',
    q: 'Where do blog setup guides point for purchase?',
    a: `Guides link to tier pages and ${link('products & utilities hub', P.products)}. Checkout runs through our secure partner—never paste loader files from random Discord DMs.`,
  },
  {
    id: 'compare-plans',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Where do I compare plans side by side?',
    a: `Each cheat tier page includes a compare table. The ${link('DayZ cheats FAQ hub', P.faq)} collects product, cheat and blog answers in one place.`,
  },
  {
    id: 'who-lite',
    topic: 'plans',
    icon: 'faqWhoLite',
    q: 'Who should stay on Lite?',
    a: `Players who only want map awareness—ESP, loot, loot—and will not touch aimbot automation. If you keep enabling combo aimbot, buy ${link('upgrade to Pro', P.pro)} instead.`,
    scopes: ['lite'],
  },
  {
    id: 'who-pro',
    topic: 'plans',
    icon: 'faqWhoPro',
    q: 'Who should buy Pro?',
    a: `PvP players who want Aimbot, Smooth Aim and Hotkey macros with ESP wallhack included. Pro is the most popular tier at cheats-dayz.com.`,
    scopes: ['pro'],
  },
  {
    id: 'who-elite',
    topic: 'plans',
    icon: 'faqWhoElite',
    q: 'Who should buy Elite?',
    a: `Operators who want Loot Assist, Finish assist, Clothing Changer and priority patch delivery when slots are open.`,
    scopes: ['elite'],
  },
  {
    id: 'eac-update',
    topic: 'safety',
    icon: 'faqEacUpdate',
    q: 'What should I do after a BattlEye update?',
    a: a('Check cheats-dayz.com status and Discord #status. Do not launch until the banner shows online. Load conservative presets after any patch.'),
  },
  {
    id: 'discord-help',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'How do I get install help?',
    a: a('Open Discord after purchase with your order email, Windows version and DayZ client build. Staff walk through loader setup live.'),
  },
  {
    id: 'zero-build-PvP',
    topic: 'plans',
    icon: 'faqZoomPvP',
    q: 'Do tiers work in hardcore and PvP?',
    a: `Yes—${link('Lite hardcore presets', P.lite)}, ${link('Pro PvP configs', P.pro)} and ${link('Elite ranked presets', P.elite)} include hardcore and PvP presets in the portal. Tune distance caps and script delay before your first queue.`,
  },
  {
    id: 'zoom-hack',
    topic: 'esp',
    icon: 'faqZoomHack',
    q: 'Which tier includes radar hack?',
    a: `Radar ships on ${link('Lite mini-radar', P.lite)} and carries through ${link('Pro overlay stack', P.pro)} and ${link('Elite radar module', P.elite)}. Mini-radar helps zone awareness without guessing rotates.`,
    scopes: ['lite'],
  },
  {
    id: 'auto-farm',
    topic: 'scripts',
    icon: 'faqAutoFarm',
    q: 'Which tier includes Loot Assist?',
    a: `Loot Assist, Rotation Assist AI and Auto loadout manager are ${link('Elite-only bots', P.elite)} only. ${link('Pro combat scripts', P.pro)} covers combat aimbot without bot farming.`,
    scopes: ['elite'],
  },
  {
    id: 'private-cheats',
    topic: 'safety',
    icon: 'faqPrivateCheats',
    q: 'What are private DayZ cheats?',
    a: a('Private means per-user keys and maintained builds—not public zip packs. DayZ Cheats ships portal delivery for ESP, aimbot and ESP wallhack tiers.'),
  },
  {
    id: 'tiers-dayz-build',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Does this work on the current DayZ build?',
    a: a(
      'Yes. We track live patches and push compatibility updates after major game changes. Active subscribers get updates at no extra cost.',
    ),
    scopes: ['tiers'],
  },
  {
    id: 'tiers-run-requirements',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'What do I need to run it?',
    a: a(
      'Windows 10 or 11, 8 GB RAM minimum, and a dedicated GPU. Cloud DMA is required for full functionality on supported builds.',
    ),
    scopes: ['tiers'],
  },
  {
    id: 'tiers-stream-proof',
    topic: 'safety',
    icon: 'faqStreamProof',
    q: 'Is the overlay stream-proof?',
    a: a(
      'Stream-proof mode hides ESP and menus from OBS, Streamlabs, and most capture tools so overlays do not show on stream.',
    ),
    scopes: ['tiers'],
  },
  {
    id: 'tiers-monthly-vs-lifetime',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Monthly vs lifetime - what is the difference?',
    a: a(
      'Monthly plans renew every 30 days. Lifetime is a one-time payment with no renewal. Both include the same feature set—choose your plan in checkout after Buy now.',
    ),
    scopes: ['tiers'],
  },
  {
    id: 'tiers-support',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'How do I get support after purchase?',
    a: a(
      'Open a ticket on the site or reach out on Discord. Include your order ID and we will help with loader setup and config.',
    ),
    scopes: ['tiers'],
  },
  {
    id: 'hwid-valorant',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Does this work for Valorant and Vanguard?',
    a: a(
      'Yes. The spoofer is made for HWID ban recovery on Valorant and Riot’s Vanguard anti-cheat, so you can spoof hardware IDs after a Vanguard hardware ban.',
    ),
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'hwid-ban-meaning',
    topic: 'safety',
    icon: 'faqPrivateCheats',
    q: 'What is an HWID ban?',
    a: a(
      'An HWID (hardware ID) ban ties the punishment to your PC identifiers, not only the account. Spoofing those IDs gives you a fresh hardware fingerprint so you can play again on a clean profile.',
    ),
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'hwid-games-supported',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Which games are supported?',
    a: a(
      'The features list on this page shows the full supported set by anti-cheat: Vanguard (Valorant), Easy Anti-Cheat, BattlEye, Ricochet (Call of Duty), and other titles such as Delta Force, Arena Breakout, and Battlefield.',
    ),
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'hwid-cleaner-included',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'Is a cleaner included?',
    a: a(
      'Yes. Hardware spoofing includes cleanup steps so leftover traces are cleared before you launch the game again.',
    ),
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'hwid-when-run',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'When should I run the spoofer?',
    a: a(
      'Run spoof and cleanup before launching Valorant (or your banned title), and follow the current guide in your account / ticket channel for the exact order of steps.',
    ),
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `This site includes landing FAQs and per-page sections. See the ${link('master FAQ list', P.faq)} for all product, cheat and blog answers—or read ${link('DayZ cheat guides blog', P.blog)} for deep guides.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'platforms', 'license-move', 'products-page'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

/** Shared FAQ block copy + filters (home, /faq/, products, blog). */
export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Frequently asked questions',
  subtitle: 'Filter by cheat plans, ESP wallhack, aimbot, products, setup and guides.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'scripts',
  'safety',
  'products',
  'blog',
  'setup',
];

/** Section copy when FAQ list is scoped to the current page (not /faq/). */
export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'Cheat FAQ',
  title: 'DayZ cheats questions',
  subtitle: 'Straight answers on aimbot, ESP, bans and setup — see the full FAQ for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

const productScopedFaqSlugs = ['tiers', 'hwid-spoofer'] as const;

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  if (productScopedFaqSlugs.includes(slug as (typeof productScopedFaqSlugs)[number])) {
    return siteFaqs.filter((f) => f.scopes?.includes(slug));
  }

  const general = siteFaqs.filter(
    (f) =>
      !f.scopes &&
      ['setup', 'safety', 'plans', 'esp', 'scripts'].includes(f.topic),
  );
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const tierCompare = siteFaqs.filter((f) =>
    ['rank-lite-vs-pro', 'compare-plans', 'undetected', 'eac-update'].includes(f.id),
  );

  const combined =
    kind === 'tier'
      ? [...scoped, ...tierCompare, ...general.slice(0, 8)]
      : [...scoped, ...general.slice(0, 6)];

  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: [
    {
      id: 'blog-guide-start',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Should I use console cheat codes in PvP?',
      a: a('No. Community lobby cheat codes only work in custom games with cheats enabled. PvP requires separate DayZ cheats from cheats-dayz.com tiers.'),
    },
    {
      id: 'blog-guide-tier',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which tier matches this guide?',
      a: `Awareness guides → ${link('Lite ESP guides', P.lite)}. Script and combo guides → ${link('Pro script guides', P.pro)}. Bot and kill-steal topics → ${link('Elite bot guides', P.elite)}.`,
    },
    {
      id: 'blog-guide-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this guide still valid after a patch?',
      a: a('Check the article date and the live status banner. Patch-day articles note when modules change—Discord #status has the latest build notes.'),
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from your operator portal after checkout—not from random download links in comments or DMs.'),
    },
    {
      id: 'blog-setup-lobby',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test in a lobby first?',
      a: a('Yes. Load conservative presets in a lobby or hardcore before PvP. Tune script delay and ESP distance caps over several sessions.'),
    },
  ],
  Security: [
    {
      id: 'blog-sec-eac',
      topic: 'blog',
      icon: 'faqBlogSecEac',
      q: 'Does this article guarantee undetected status?',
      a: a('No article replaces the live status banner. Undetected is a point-in-time label—stop if status shows updating or detected.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to ${link('Lite product page', P.lite)}, ${link('Pro product page', P.pro)}, ${link('Elite product page', P.elite)} and ${link('shop all tiers', P.products)}. Feature lists on product pages are authoritative for checkout.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: a('Open Discord with your order email and the article slug. Staff reference the same portal presets mentioned in guides.'),
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: a('Re-check status after every DayZ update. Portal presets update with patch notes—reload configs instead of copying old sliders.'),
  },
];

export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('map-hack') || slug.includes('esp') || slug.includes('ward')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which tier covers ESP wallhack from this article?',
      a: `${link('Lite player ESP', P.lite)} includes player ESP, loot locator and loot timers. ${link('Pro combat overlay', P.pro)} adds combat aimbot on the same overlay stack.`,
    });
  }
  if (slug.includes('script') || slug.includes('combo') || slug.includes('auto-combo')) {
    slugHints.push({
      id: 'blog-slug-scripts',
      topic: 'scripts',
      icon: 'faqBlogSlugScripts',
      q: 'Which tier includes the aimbot in this article?',
      a: `${link('Pro aimbot modules', P.pro)} and ${link('Elite automation pack', P.elite)} ship Aimbot and related modules. ${link('Lite wallhack-only tier', P.lite)} is ESP wallhack only.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('ban') || slug.includes('eac')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Does this article replace HWID or UGC products?',
      a: `Recovery guides complement ${link('HWID reset utility', P.hwid)} and ${link('UGC case workspace', P.ugc)}—read product pages for workflow scope and realistic outcomes.`,
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs].slice(0, 8);
}

export const compareRows = [
  { feature: 'Player ESP & player boxes', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Loot & loot locator', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Loot spawn timers', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'Radar', icon: 'compareZoomHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Streamproof overlay', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
  { feature: 'MiniESP wallhack overlay', icon: 'compareRadarHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Aimbot', icon: 'compareAutoCombo' as const, lite: false, pro: true, elite: true },
  { feature: 'Smooth Aim & Silent aim', icon: 'compareSmoothAim' as const, lite: false, pro: true, elite: true },
  { feature: 'Bone Priority', icon: 'compareTargetSelector' as const, lite: false, pro: true, elite: true },
  { feature: 'Hotkey macros (heals/shields)', icon: 'compareHotkeyMacros' as const, lite: false, pro: true, elite: true },
  { feature: 'FOV radius drawing', icon: 'compareAbilityRadius' as const, lite: false, pro: true, elite: true },
  { feature: 'Smoke alert integration', icon: 'compareSmokeAlert' as const, lite: false, pro: true, elite: true },
  { feature: 'Loot Assist', icon: 'compareAutoFarm' as const, lite: false, pro: false, elite: true },
  { feature: 'Finish assist', icon: 'compareAutoKillSteal' as const, lite: false, pro: false, elite: true },
  { feature: 'Wallbang assist', icon: 'compareAutoShieldBreak' as const, lite: false, pro: false, elite: true },
  { feature: 'Full ESP wallhack suite', icon: 'compareFullMapHack' as const, lite: false, pro: false, elite: true },
  { feature: 'Clothing Changer (Clothing Unlock)', icon: 'compareSkinChanger' as const, lite: false, pro: false, elite: true },
  { feature: 'Priority patch queue', icon: 'comparePriorityPatch' as const, lite: false, pro: false, elite: true },
  { feature: 'Direct dev Discord support', icon: 'compareDevSupport' as const, lite: false, pro: false, elite: true },
  { feature: 'Cloud config backup', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
];

import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { DISCORD_URL, PRODUCT_BASE } from '../config/site';

const productBase = PRODUCT_BASE;

export const en: Translations = {
  site: {
    name: 'DayZ Cheats',
    domain: 'cheats-dayz.com',
    title: 'DayZ Cheats | Aimbot, ESP & Radar — cheats-dayz.com',
    description:
      'DayZ cheats for PC: aimbot, ESP, radar and Lite/Pro/Elite tiers. Undetected presets and checkout at cheats-dayz.com.',
    discord: DISCORD_URL,
  },
  nav: [
    { href: `${productBase}`, label: 'Shop cheats' },
    { href: '/blog/', label: 'Cheat guides' },
    { href: '/forum/', label: 'Community Q&A' },
    { href: '/faq/', label: "Buyer's FAQ" },
    { href: '/support/', label: 'Help desk' },
  ],
  hero: {
    status: 'DayZ online',
    eyebrow: 'DayZ Cheats',
    titleLine1: 'cheats-dayz.com — DayZ Cheats',
    titleLine2: 'Aimbot, ESP, Radar & Loot',
    subtitle:
      'Undetected DayZ cheats for PC Steam — ESP loot finder, silent aimbot and radar for official and community servers. Lite, Pro and Elite at cheats-dayz.com.',
    ctaPrimary: 'Buy cheats',
    ctaDiscord: 'Join Discord',
    modesLabel: 'Modes',
    modes: ['Official', 'Hardcore', 'First Person', 'Community'],
    metrics: [
      { label: 'Stream-safe', strong: 'Yes' },
      { label: 'Patch speed', strong: '<24h' },
      { label: 'Users', strong: '300+' },
      { label: 'Support', strong: '24/7' },
    ],
  },
  features: {
    eyebrow: 'DayZ Standalone',
    title: 'DayZ ESP, Aimbot & Radar Cheats',
    subtitle:
      'DayZ cheats for exploration, PvP and looting on PC — player ESP, silent aimbot and mini-radar so you gear up faster, spot threats sooner and stay ahead on DayZ Standalone.',
    items: [
      {
        title: 'DayZ Aimbot Cheat',
        subtitle: 'Silent aim on official & community',
        desc:
          'Several DayZ cheats ship silent aimbot — shots near a target still connect, so fights look natural even if an admin spectates. Use on official servers and many modded community servers to find bases and win PvP without grinding every engagement.',
        bullets: [
          'Smoothness and FOV sliders',
          'Bone priority: head, chest or closest',
          'Profiles for rifle, pistol, shotgun and bolt action',
          'Prediction on moving targets',
          'Presets for PvP, hardcore and community',
        ],
        tags: ['dayz aimbot', 'smoothness', 'bone priority'],
        bento: 'sm:col-span-2 lg:col-span-12 lg:col-start-1 lg:row-start-1',
      },
      {
        title: 'DayZ ESP Cheat',
        subtitle: 'Loot, players and allies',
        desc:
          'In DayZ, ESP is essential for scavenging — skip empty buildings and go straight to high-value loot. Player ESP shows enemies and allies faster so you spend less time searching and more time surviving on Standalone.',
        bullets: [
          'Player boxes, skeletons, HP and distance',
          'Team colors and line-of-sight visibility',
          'Alerts when enemies push or go missing',
        ],
        tags: ['dayz ESP', 'dayz cheats', 'player boxes'],
        bento: 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:row-start-2',
      },
      {
        title: 'DayZ Radar Cheat',
        subtitle: 'Mini-map awareness',
        desc:
          'DayZ radar cheat extends awareness beyond the default camera — track nearby fights and rotations, then pair with player ESP for full map control on official and community servers.',
        bullets: ['Enemy dots on mini-radar', 'Map and town markers', 'Works with Lite ESP modules'],
        tags: ['dayz radar', 'mini-map', 'rotations'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-3',
      },
      {
        title: 'Item / Loot ESP',
        subtitle: 'Find weapons, food and gear',
        desc: 'Highlights weapons, medical supplies, food and tiered loot with distance so you can gear up faster.',
        bullets: ['Weapon and ammo ESP', 'Food, medical and tier-4 loot markers', 'Vehicle and heli crash hints'],
        tags: ['item ESP', 'loot ESP', 'Chernarus'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-3',
      },
      {
        title: 'Clothing Changer',
        subtitle: 'Local outfit preview',
        desc: 'Preview clothing, backpacks and weapons on your client only. Does not change Steam store purchases.',
        bullets: [
          'Clothing and gear preview',
          'Favorites and loadout export',
          'Included with Elite or sold as Clothing Unlock',
        ],
        tags: ['clothing changer', 'unlock all', 'cosmetics'],
        bento:
          'sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:col-start-1 lg:row-start-4',
      },
      {
        title: 'Stream Proof',
        subtitle: 'Hide overlays on stream',
        desc: 'You see ESP and aimbot on your screen. OBS and Game Bar capture a clean game feed.',
        bullets: [
          'OBS and Game Bar modes',
          'Toggle per module',
          'Setup notes in the portal',
        ],
        tags: ['stream proof', 'OBS safe', 'capture hide'],
        bento:
          'sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-4',
      },
      {
        title: 'Cloud Config & BattlEye Updates',
        subtitle: 'After every patch',
        desc: 'Save configs to the cloud. Loader updates go out after DayZ and BattlEye patches.',
        bullets: ['Cloud backup for aimbot and ESP', 'Loader updates after BattlEye patches', 'Status notes in Discord #status'],
        tags: ['cloud sync', 'BattlEye updates', 'presets'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-6',
      },
      {
        title: 'Modes',
        subtitle: 'Official, hardcore, PvP, community',
        desc: 'Presets for official, hardcore, first-person and community servers.',
        bullets: ['Official and community server presets', 'Safer PvP defaults', 'Low-pop servers for config testing'],
        tags: ['official servers', 'hardcore', 'PvP'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-6',
      },
      {
        title: 'Extra tools',
        subtitle: 'Elite options',
        desc: 'Finish assist, Wallbang assist and loot assist on Elite, on top of aimbot and full ESP.',
        bullets: [
          'Finish assist on low-HP enemies',
          'Wallbang assist',
          'Loot assist on Elite',
        ],
        tags: ['auto finish', 'loot assist', 'utilities'],
        bento: 'sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-2',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Undetected',
    title: 'Why choose DayZ Cheats',
    subtitle:
      'We ship some of the safest DayZ Standalone cheats we can maintain — live status before you play, fast loader updates after BattlEye waves, and Discord support that answers every ticket personally.',
    usLabel: 'DayZ Cheats',
    otherLabel: 'Typical shop',
    rows: [
      {
        title: 'Undetected DayZ Standalone cheats',
        desc:
          'We pause or update builds at the first credible report so you are not left on a flagged loader. Check the live status banner on cheats-dayz.com before every session — if a product shows undetected, it is cleared to use.',
      },
      {
        title: 'Safest DayZ cheats we can offer',
        desc:
          'DayZ Standalone cheats are maintained security-first — automated monitoring plus manual review after BattlEye updates, with limited slots to keep quality high.',
      },
      {
        title: 'Support on a personal level',
        desc:
          'Discord help for setup, configs and tier changes. If another DayZ cheat package fits better, we say so and walk you through options — support should feel understood, not scripted.',
      },
      {
        title: 'Lite, Pro and Elite packages',
        desc:
          'Pick the DayZ cheat package that matches your budget — ESP-only Lite, Pro with aimbot, or Elite with loot assist, Clothing Changer and full automation.',
      },
      {
        title: 'Affordable and maintained',
        desc:
          'Pricing balances safety and support. Loader and module updates ship regularly so DayZ cheats stay stable after patches — monthly and lifetime keys on tiers.',
      },
      {
        title: 'HWID resets & cloud configs',
        desc: 'Move licenses after a PC swap and sync aimbot and ESP presets across machines through the portal.',
      },
    ],
    metrics: [
      {
        value: '<24h',
        title: 'Patch turnaround',
        desc: 'Usual time to ship a loader after a big DayZ or BattlEye update.',
      },
      {
        value: '24/7',
        title: 'Support',
        desc: 'Discord help for setup, configs and account issues.',
      },
      {
        value: '300+',
        title: 'Users',
        desc: 'PC players using aimbot, ESP and tools on cheats-dayz.com.',
      },
    ],
  },
  setup: {
    eyebrow: 'Setup',
    titleLead: 'Buy cheats. Play in',
    titleHighlight: 'three steps',
    intro:
      'Buy your DayZ cheat, download the loader, load a preset, then open DayZ. Discord help is there if you get stuck.',
    ctaPrimary: 'Buy cheats',
    ctaSecondary: 'Setup FAQ',
    ctaPrimaryHref: productBase,
    ctaSecondaryHref: '/faq/',
    steps: [
      {
        step: 'Step 1',
        title: 'Buy and download the loader',
        desc: 'Finish checkout, open the portal, and download the latest Windows loader.',
      },
      {
        step: 'Step 2',
        title: 'Load presets',
        desc: 'Run the loader, pick a PvP or hardcore preset, and set aimbot and ESP.',
      },
      {
        step: 'Step 3',
        title: 'Check status and play',
        desc: 'Confirm the status banner is online, launch DayZ on Steam, and use your saved config.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Platform',
    title: 'Windows PC',
    subtitle: 'Check the status banner after DayZ updates before you launch.',
    items: ['Windows 10 & 11', 'Steam', 'DayZ client', 'Auto updater', 'Config cloud sync', 'Discord support', 'HWID reset', 'External loader'],
  },
  cheats: {
    eyebrow: 'Cheat tiers',
    title: 'DayZ cheat tiers',
    subtitle: 'Lite ESP, Pro aimbot, Elite full cheat suite — pick the DayZ cheats tier that matches how you play on PC.',
    viewAll: 'View all tiers',
    explore: 'Explore',
    items: [
      {
        badge: 'ESP only',
        tier: 'Lite',
        name: 'Lite',
        title: 'DayZ Lite Cheats',
        desc: 'DayZ Lite cheats for PC — player ESP, loot ESP, radar overlay and stream-proof mode without aimbot.',
        features: ['Player ESP & boxes', 'Loot ESP', 'Radar overlay', 'Stream-proof mode', 'Cloud config backup', 'Patch auto-updater'],
        more: 14,
        href: `${productBase}lite/`,
        variant: 'essential',
      },
      {
        badge: 'Best value',
        tier: 'Pro',
        name: 'Pro',
        title: 'DayZ Pro Cheats',
        desc: 'DayZ Pro cheats — all Lite ESP plus aimbot, silent aim, bone priority and PvP presets for official servers.',
        features: ['All Lite modules', 'Aimbot & smooth aim', 'Silent aim', 'Bone priority', 'Hotkey macros', 'Per-weapon profiles'],
        more: 15,
        href: `${productBase}pro/`,
        variant: 'popular',
      },
      {
        badge: 'Limited slots',
        tier: 'Elite',
        name: 'Elite',
        title: 'DayZ Elite Cheats',
        desc: 'Buy DayZ Elite cheats with loot assist, Finish assist, Wallbang assist, full ESP suite, Clothing Changer and direct Discord support.',
        features: ['Loot Assist', 'Finish assist', 'Wallbang assist', 'Full ESP suite', 'Clothing Changer', 'Priority patch queue'],
        more: 42,
        href: `${productBase}elite/`,
        variant: 'limited',
      },
    ],
  },
  products: {
    eyebrow: 'Shop',
    title: 'Best DayZ cheats',
    subtitle:
      'Some of the safest DayZ cheats available for PC Steam — Lite, Pro and Elite keys plus HWID spoofer, UGC and Clothing Changer. Compare packages before checkout on cheats-dayz.com.',
    viewAll: 'View all cheats',
    get: 'Buy',
    explore: 'Explore',
    items: [
      {
        badge: 'Available',
        category: 'Tools',
        title: 'DayZ HWID Spoofer',
        subtitle:
          'Buy HWID Spoofer with instant digital delivery, secure checkout, and support. Built for HWID ban recovery, including Valorant and Vanguard.',
        desc:
          'Zadeyo HWID Spoofer changes disk serials, MAC addresses, GPU IDs, and related IDs so you can return after a hardware ban with a clean slate—EAC, BattlEye, Ricochet, and more.',
        features: [
          'Hardware Spoofer (Cleaner Included)',
          'Valorant / Riot Vanguard',
          'Easy Anti-Cheat game support',
          'BattlEye game support',
          'Ricochet & other anti-cheats',
        ],
        more: 35,
        href: `${productBase}hwid-spoofer/`,
      },
      {
        badge: 'Available',
        category: 'Account recovery',
        title: 'DayZ Game Accounts (UGC)',
        subtitle:
          'Buy game accounts with instant delivery, secure checkout, and support—ready-made stock for ranked, leveled, and starter options.',
        desc:
          'Choose a ready-made account for the titles you play, complete checkout, and receive secure credential handoff with support if you need help getting started.',
        features: ['Ready-made', 'Ranked', 'Secure', 'Stock', 'Checkout'],
        more: 0,
        href: `${productBase}ugc/`,
      },
      {
        badge: 'Available',
        category: 'Cosmetic',
        title: 'Skin Changer',
        subtitle:
          'Buy Skin Changer with instant delivery—full control over premium weapon skins, outfits, and rare knife variants.',
        desc:
          'Shop skin changer tools with secure checkout. Unlock the entire marketplace of in-game cosmetics across major titles without microtransaction spend.',
        features: [
          'Premium weapon skins',
          'Character outfits',
          'Rare knife variants',
          'Full cosmetic marketplace',
        ],
        more: 1,
        href: `${productBase}skin-changer/`,
      },
    ],
  },
  blog: {
    eyebrow: 'Cheat guides',
    title: 'DayZ cheat guides',
    subtitle: 'Aimbot setup, DayZ ESP cheat config, community practice tips and BattlEye patch-day checks.',
    latestTitle: 'Latest cheat guides',
    latestSubtitle: 'Filter by topic or sort to find aimbot, ESP, radar and patch-day DayZ cheat guides.',
    filterAll: 'All articles',
    sortLabel: 'Sort by',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    sortShortRead: 'Shortest read',
    sortLongRead: 'Longest read',
    emptyFilter: 'No articles match this filter.',
    viewAll: 'View all articles',
    read: 'Read',
    items: [
      {
        tag: 'Guides',
        title: 'DayZ Cheats community Practice: Aim Drills Before PvP',
        slug: 'dayz-cheat-codes',
        image: '/images/blog/dayz-cheat-codes-guide.png',
        desc: 'Use community and low-pop test servers to practice aimbot smoothness, ESP ranges and loadouts before PvP.',
        date: 'Aug 20, 2026',
        readTime: '10 min read',
      },
      {
        tag: 'Guides',
        title: 'DayZ Cheats community Tips for Aimbot and ESP',
        slug: 'dayz-aimbot-esp-tips',
        image: '/images/blog/dayz-console-cheats-tips.png',
        desc: 'community and bot-lobby workflows to tune aimbot, ESP wallhack and loot ESP before PvP.',
        date: 'Aug 19, 2026',
        readTime: '6 min read',
      },
      {
        tag: 'Setup',
        title: 'How to practice DayZ cheats safely',
        slug: 'dayz-cheats-practice',
        image: '/images/blog/how-to-use-dayz-cheat-codes.png',
        desc: 'community vs PvP: how to test aimbot and ESP in practice islands before using private DayZ cheats.',
        date: 'Aug 18, 2026',
        readTime: '7 min read',
      },
      {
        tag: 'Features',
        title: 'DayZ cheats features: aimbot, bots, ESP wallhack and more',
        slug: 'dayz-cheats-features',
        image: '/images/blog/dayz-cheats-features-guide.png',
        desc: 'Complete guide to our dayz cheats—Aimbot, Loot Assist, Clothing Changer, Radar Hack, ESP Wallhack and Wallbang assist.',
        date: 'Aug 18, 2026',
        readTime: '12 min read',
      },
      {
        tag: 'Guides',
        title: 'community practice vs PvP DayZ cheats',
        slug: 'dayz-practice-vs-cheats',
        image: '/images/blog/dayz-console-commands-cheats.png',
        desc: 'How community islands differ from private aimbot and ESP tools used in official servers and PvP.',
        date: 'Aug 17, 2026',
        readTime: '8 min read',
      },
      {
        tag: 'Guides',
        title: 'DayZ Lite vs Pro: which tier fits you',
        slug: 'dayz-lite-vs-pro',
        image: '/images/blog/dayz-lite-vs-pro.png',
        desc: 'Map awareness vs aimbot automation—compare Lite and Pro dayz cheats for official and community servers.',
        date: 'Aug 16, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Guides',
        title: 'Elite tier guide: when to upgrade your dayz cheats',
        slug: 'dayz-elite-cheats',
        image: '/images/blog/dayz-elite-tier-guide.png',
        desc: 'Loot Assist, Finish assist, Clothing Changer and full ESP wallhack—who Elite is for and how to tune safely.',
        date: 'Aug 16, 2026',
        readTime: '7 min read',
      },
      {
        tag: 'Setup',
        title: 'Buy DayZ Aimbot Cheats for PvP',
        slug: 'dayz-aimbot-guide',
        image: '/images/blog/dayz-aimbot-pvp-guide.png',
        desc: 'Aimbot, Prediction and Hotkey macros configs for climbing PvP with Pro tier dayz cheats.',
        date: 'Aug 15, 2026',
        readTime: '6 min read',
      },
      {
        tag: 'Setup',
        title: 'DayZ ESP Wallhack Cheat Setup for PvP',
        slug: 'dayz-esp-wallhack',
        image: '/images/blog/dayz-esp-wallhack-setup.png',
        desc: 'Enemy position tracking, loot ESP, smoke alerts and vision detector tuning for Lite and Elite tiers.',
        date: 'Aug 15, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Setup',
        title: 'DayZ Radar Hack Cheat Guide',
        slug: 'dayz-radar-hack',
        image: '/images/blog/dayz-radar-hack-guide.png',
        desc: 'Mini-radar, FOV awareness and safe distance caps for official and community servers.',
        date: 'Aug 14, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Guides',
        title: 'DayZ Clothing Changer Cheat / Clothing Unlock Guide',
        slug: 'dayz-skin-changer',
        image: '/images/blog/dayz-clothing-changer-guide.png',
        desc: 'Preview skins, wraps and exclusive sets locally with our Clothing Unlock Clothing Changer module.',
        date: 'Aug 14, 2026',
        readTime: '6 min read',
      },
      {
        tag: 'Updates',
        title: 'BattlEye patch day checklist for DayZ cheats',
        slug: 'dayz-battleye-patch',
        image: '/images/blog/be-patch-day-checklist.png',
        desc: 'Status banner, loader reload and conservative profiles after every DayZ or BattlEye update.',
        date: 'Aug 13, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Guides',
        title: 'DayZ HWID Spoofer vs New Account After BattlEye Ban',
        slug: 'dayz-hwid-spoofer',
        image: '/images/blog/dayz-hwid-spoofer-after-ban.png',
        desc: 'When to spoof hardware, when to start fresh, and how cheats-dayz.com/products/dayz-cheats fits each path.',
        date: 'Aug 13, 2026',
        readTime: '7 min read',
      },
      {
        tag: 'Guides',
        title: 'How to buy DayZ cheats in 2026',
        slug: 'buy-dayz-cheats',
        image: '/images/blog/how-to-buy-dayz-cheats-2026.png',
        desc: 'Step-by-step purchase walkthrough for Lite, Pro and Elite via our secure checkout.',
        date: 'Aug 12, 2026',
        readTime: '5 min read',
      },
      {
        tag: 'Setup',
        title: 'DayZ Aimbot Cheat Guide: AR, SMG and Shotgun',
        slug: 'dayz-aimbot-weapons',
        image: '/images/blog/dayz-aimbot-combat-guide.png',
        desc: 'Per-weapon aimbot profiles for Pro tier—rifle burst, SMG tracking and shotgun room clear settings for PvP.',
        date: 'Aug 12, 2026',
        readTime: '6 min read',
      },
      {
        tag: 'Troubleshooting',
        title: 'BattlEye Unable to Verify DayZ — Cheat and Appeal Fixes',
        slug: 'dayz-battleye-verify',
        image: '/images/blog/battleye-bypass-dayz-guide.png',
        desc: 'Fix verification errors, file integrity checks and when to use UGC appeal workflows after BattlEye issues.',
        date: 'Aug 11, 2026',
        readTime: '6 min read',
      },
      {
        tag: 'Guides',
        title: 'DayZ external cheat guide',
        slug: 'dayz-external-cheats',
        image: '/images/blog/dayz-external-cheat-guide.png',
        desc: 'Why external dayz cheats matter, how the external loader works on PC and what makes private software safer than free tools.',
        date: 'Aug 11, 2026',
        readTime: '7 min read',
      },
      {
        tag: 'Setup',
        title: 'Stream-Proof DayZ Cheat Overlay Setup',
        slug: 'dayz-stream-proof',
        image: '/images/blog/dayz-stream-proof-setup.png',
        desc: 'Hide ESP wallhack and script overlays from OBS, Game Bar and capture cards—test workflow for content creators.',
        date: 'Aug 10, 2026',
        readTime: '5 min read',
      },
    ],
  },
  toolkit: {
    eyebrow: 'Cheat menu',
    title: 'DayZ cheat menu, organized',
    subtitle: 'Every cheat module is grouped so you can tune aimbot and ESP mid-match without digging through chaos.',
    items: [
      { num: '01', label: 'Aimbot', title: 'Tracking that adapts per weapon', desc: 'Smoothness, FOV, Silent aim and Bone Priority in one aimbot tab.' },
      { num: '02', label: 'ESP', title: 'ESP that stays readable', desc: 'Boxes, skeletons, distance, health and team color filters for DayZ loot and PvP.' },
      { num: '03', label: 'Radar', title: 'Loot and rotates on lock', desc: 'Enemy dots, loot timers and mini-radar on a compact overlay.' },
      { num: '04', label: 'Weapons', title: 'Per-weapon aimbot profiles', desc: 'Save rifle, pistol, shotgun and bolt action presets and swap with hotkeys.' },
      { num: '05', label: 'Loot', title: 'Loot ESP & loot assist', desc: 'Loot highlights, rare drops and Elite loot-assist pathing.' },
      { num: '06', label: 'Profiles', title: 'Configs for every mode', desc: 'official, community, and hardcore servers, PvP and community presets with cloud backup.' },
    ],
  },
  workflow: {
    eyebrow: 'DayZ cheats',
    badge: '4 steps',
    titleBefore: 'The importance of',
    titleHighlight: 'DayZ cheats.',
    subtitle:
      'DayZ rewards long-term survival — rivals may already run DayZ cheats with aimbot and ESP. Stay competitive with undetected Standalone cheats, status checks and personal support from cheats-dayz.com.',
    ctaLabel: 'Buy cheats',
    ctaHref: productBase,
    ctaSecondary: 'Setup FAQ',
    ctaSecondaryHref: '/faq/',
    items: [
      {
        num: '01',
        phase: 'Before purchase',
        title: 'Check status',
        desc: 'Read the live banner on cheats-dayz.com before you buy or launch.',
      },
      {
        num: '02',
        phase: 'Checkout',
        title: 'Pick a tier',
        desc: 'Choose Lite, Pro or Elite based on which modules you need.',
      },
      {
        num: '03',
        phase: 'Loader',
        title: 'Launch and set up',
        desc: 'Download from the portal, turn on modules, and test in community or a low-pop test server.',
      },
      {
        num: '04',
        phase: 'In-game',
        title: 'Save your config',
        desc: 'When the settings feel right, save official and community servers presets to the cloud.',
      },
    ],
  },
  fieldNotes: {
    eyebrow: 'Notes',
    title: 'Quick tips',
    items: [
      { num: '01', title: 'After patches', desc: 'Check Discord and the portal status before you queue PvP after a DayZ update.' },
      { num: '02', title: 'Start slow', desc: 'Use the default aimbot smoothness and ESP range first, then raise them if you need to.' },
      { num: '03', title: 'Discord help', desc: 'Stuck on the loader or configs? Ask in Discord and someone will walk you through it.' },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'DayZ Cheats support',
    subtitle: 'Loader, HWID, checkout and account help.',
    channels: [
      {
        icon: 'users',
        title: 'Before you buy',
        desc: 'Ask about tiers and what each product includes.',
        linkLabel: 'Start checkout',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'messageCircle',
        title: 'Community Forum',
        desc: 'Guide Q&A, patch talk and tier questions from other DayZ players.',
        linkLabel: 'Open forum',
        href: '/forum/',
      },
      {
        icon: 'navFaq',
        title: 'FAQ',
        desc: 'Compatibility, bans and setup answers.',
        linkLabel: 'View FAQ',
        href: '/faq/',
      },
      {
        icon: 'navBlog',
        title: 'Setup guides',
        desc: 'ESP, aimbot, patch-day and HWID walkthroughs on our blog.',
        linkLabel: 'Read guides',
        href: '/blog/',
      },
    ],
    ticketTitle: 'Include when contacting Levo support',
    ticketItems: [
      { title: 'Order email', desc: 'The email you used at Levo checkout after Buy now.' },
      { title: 'Platform', desc: 'Windows 10 or 11, Steam, and your DayZ version.' },
      { title: 'Error detail', desc: 'Screenshot or exact text from the loader or Steam.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'DayZ cheats FAQ',
    subtitle: 'Compatibility, bans, cheat tiers and setup — straight answers before you buy.',
    items: [
      {
        num: '01',
        q: 'Where do I check if DayZ cheats are online?',
        a: 'The live status banner is on cheats-dayz.com and in the Discord #status channel. Always check after a DayZ or BattlEye update.',
      },
      {
        num: '02',
        q: 'What happens after I buy?',
        a: 'Your portal unlocks the loader, setup guide and config library via our secure checkout. Follow the guide before launching DayZ.',
      },
      {
        num: '03',
        q: 'Which platforms are supported?',
        a: 'DayZ via Steam on Windows 10/11 64-bit only. macOS and Linux are not supported.',
      },
      {
        num: '04',
        q: 'Can I move my license to a new PC?',
        a: 'Yes—use the HWID reset in your portal or open a Discord ticket. Limits depend on your tier.',
      },
      {
        num: '05',
        q: 'Where are products and utilities listed?',
        a: 'Cheat tiers, HWID Spoofer, UGC and Clothing Changer live at cheats-dayz.com/products/dayz-cheats with feature lists and checkout via our partner.',
      },
    ],
  },
  footer: {
    tagline: 'DayZ cheats for PC: aimbot, ESP, radar and utilities.',
    explore: 'Explore',
    exploreLinks: [
      { href: '/', label: 'Feature overview', ariaLabel: 'Features', scrollTarget: 'features' },
      { href: '/products/dayz-cheats/lite/', label: 'DayZ Lite ESP cheats', ariaLabel: 'Lite cheats' },
      { href: '/products/dayz-cheats/pro/', label: 'DayZ Pro aimbot cheats', ariaLabel: 'Pro cheats' },
      { href: '/products/dayz-cheats/elite/', label: 'Elite dayz cheats', ariaLabel: 'Elite cheats' },
      { href: '/products/dayz-cheats/', label: 'All products & utilities', ariaLabel: 'Products' },
      { href: '/blog/', label: 'Read patch guides', ariaLabel: 'Blog' },
      { href: '/forum/', label: 'Browse community Q&A', ariaLabel: 'Forum' },
      { href: '/faq/', label: 'Pre-purchase FAQ', ariaLabel: 'FAQ' },
    ],
    support: 'Help center',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About DayZ Cheats | Buy PC Aimbot & ESP',
      description:
        'About DayZ Cheats — buy PC DayZ cheats (aimbot, ESP, radar), utilities and guides at cheats-dayz.com.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            'DayZ Cheats is a PC site for DayZ aimbot, ESP, radar and Clothing Changer products at cheats-dayz.com. We post tier comparisons, setup guides and live status notes.',
            'Game and product names are for identification only.',
          ],
        },
        {
          heading: 'What we sell',
          paragraphs: [
            'Lite, Pro and Elite DayZ cheats, plus HWID Spoofer, Clothing Changer and UGC recovery. The blog covers configs, patch checks and BattlEye updates.',
            'Pages are updated when DayZ or the loader changes. Check the homepage status banner and Discord #status before you play.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'Use Discord or email for loader errors, compatibility and checkout questions. Include your order email, Steam account and Windows version.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy | DayZ Cheats Shop',
      description:
        'How the DayZ cheats shop at cheats-dayz.com handles analytics, cookies and contact data.',
      sections: [
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect basic analytics such as page views, device type, browser and approximate region through Google Analytics when it is enabled. Checkout runs on external pages. We do not store payment card data on cheats-dayz.com.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics show which guides and product pages people use so we can fix broken links and improve pages. Support tickets keep the email and message you send until the issue is closed.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use basic analytics cookies. You can block cookies in your browser. The site still works without them.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For privacy questions, use the Support page. Purchase and refund rules are in Terms & Conditions.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms for DayZ Cheats | License & Refunds',
      description:
        'Terms for buying DayZ cheats on cheats-dayz.com — license use, delivery, refunds and account risk.',
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'Last updated: September 2026. By using cheats-dayz.com or buying a product listed here, you agree to these Terms & Conditions and our Privacy Policy.',
          ],
        },
        {
          heading: 'What you purchase',
          paragraphs: [
            'We sell DayZ cheat tiers (Lite, Pro, Elite) and tools (HWID Spoofer, UGC, Clothing Changer / Clothing Unlock) through a portal and Windows loader for Steam.',
            'Product pages list what is included when you buy. Features can change when DayZ or BattlEye updates.',
          ],
        },
        {
          heading: 'Checkout and delivery',
          paragraphs: [
            'Payment and license delivery run on external checkout pages. cheats-dayz.com does not process or store payment card numbers.',
            'After purchase, use the operator portal linked from your order flow to download the current loader and setup guide before launching DayZ.',
          ],
        },
        {
          heading: 'License use',
          paragraphs: [
            'Licenses are for your personal use only. Do not share loader files, portal logins, or license keys. HWID and device limits depend on your tier and are enforced in the portal.',
          ],
        },
        {
          heading: 'Refunds and purchases',
          paragraphs: [
            'All sales are final once checkout completes. We do not refund change-of-mind purchases, account bans, BattlEye penalties, or issues caused by ignoring setup guides or running modules while the status banner shows offline.',
            'If the product does not work as described on a supported setup—DayZ on Steam on Windows 10/11, current loader from the portal, and the live status banner showing online when you started—contact us through the Support page. Include your order email, Windows version, DayZ build, and screenshots or exact error text from the loader.',
            'We may, at our discretion, offer a fix, replacement access, or partial/full refund when we confirm a fault on our side. We are not obligated to approve every request.',
          ],
        },
        {
          heading: 'Availability and risk',
          paragraphs: [
            'Third-party tools for DayZ can conflict with game updates and anti-cheat systems. You use this software at your own risk, including possible account action.',
            'Check the homepage status banner before every session. Do not queue PvP while modules are offline or misaligned after a patch.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For terms, billing, or loader questions, use the buttons on the Support page. See also our Privacy Policy for how we handle site data.',
          ],
        },
      ],
    },
    support: {
      title: 'DayZ Cheats Support | Loader, HWID & Checkout',
      description:
        'DayZ cheats support for loader setup, HWID spoofing and checkout help at cheats-dayz.com.',
    },
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheats: 'Try Now',
    browseCheatsMobile: 'Start checkout',
    homeAria: 'DayZ Cheats home',
    checkoutAria: 'Start checkout',
    discordAria: 'Join DayZ Cheats on Discord',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
  },
};

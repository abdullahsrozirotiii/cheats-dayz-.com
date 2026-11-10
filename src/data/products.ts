import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['dayz-esp-wallhack', 'dayz-lite-vs-pro', 'dayz-radar-hack', 'dayz-battleye-patch'],
  pro: [
    'dayz-aimbot-guide',
    'dayz-aimbot-weapons',
    'dayz-lite-vs-pro',
    'dayz-stream-proof',
  ],
  elite: [
    'dayz-elite-cheats',
    'dayz-cheats-features',
    'dayz-esp-wallhack',
    'dayz-battleye-patch',
    'buy-dayz-cheats',
  ],
  'hwid-spoofer': [
    'dayz-hwid-spoofer',
    'dayz-battleye-verify',
    'dayz-battleye-patch',
    'dayz-external-cheats',
  ],
  ugc: [
    'dayz-battleye-verify',
    'dayz-hwid-spoofer',
    'buy-dayz-cheats',
  ],
  'skin-changer': [
    'dayz-skin-changer',
    'dayz-cheats-features',
    'dayz-stream-proof',
  ],
  tiers: [
    'buy-dayz-cheats',
    'dayz-lite-vs-pro',
    'dayz-cheats-features',
    'dayz-elite-cheats',
  ],
};

const productBase = '/products/dayz-cheats/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on cheatsdayz.com and Discord #status before purchase—especially after a DayZ or BattlEye update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Elite dayz cheats or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, Steam, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal, patch loader, and setup guide. Test in a lobby, load presets, then queue PvP or hardcore.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'DayZ and BattlEye receive frequent updates. Confirm module availability on the live status panel at cheatsdayz.com before you purchase or launch. Overlay behavior may differ in lobbies, replays and spectator mode after patches.';

const sharedLimitations =
  'Third-party software in DayZ can violate Bohemia Interactive Terms of Use and lead to BattlEye bans or account action. You use this software at your own risk. Compatibility and availability can change after game, BattlEye, or Windows updates without notice.';

const dayzSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqSteam', text: 'Current DayZ client via Steam with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and patch updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets DayZ published hardware requirements.' },
];

/** Full module list for the DayZ Cheats (Lite · Pro · Elite) hub — synced from Zadeyo product page. */
const tiersHubFullFeatures: string[] = [
  'Aimbot · Toggle Aimbot',
  'Aimbot · Customizable FOV',
  'Aimbot · Customizable Aim Distance',
  'Aimbot · Ignore (Players, Infected, Animals)',
  'Aimbot · Bone (Nearest, Head, Neck, Pelvis)',
  'Aimbot · FOV Style (Solid, Gradient)',
  'Aimbot · Line to target (Solid, Gradient)',
  'Player ESP · Enable',
  'Player ESP · Friends',
  'Player ESP · Box (Corner, Box)',
  'Player ESP · Filled Box (Solid, Gradient)',
  'Player ESP · Head dot',
  'Player ESP · Skeleton',
  'Player ESP · Health Bar',
  'Player ESP · Name',
  'Player ESP · Distance',
  'Player ESP · Inventory',
  'Player ESP · Intem in hands',
  'Player ESP · Traces',
  'Player ESP · Max Distance',
  'World ESP · Animal ESP',
  'World ESP · Health (Text, Bar)',
  'World ESP · Vehicle ESP',
  'World ESP · Helicrash',
  'Item ESP · Item Quality',
  'Item ESP · Quality Style (Text, Bar)',
  'Item ESP · Battle Mode',
  'Item ESP · Show only when hovering',
  'Miscellaneous · No Clip',
  'Miscellaneous · Always Day',
  'Miscellaneous · Local position',
  'Miscellaneous · Thirdperson unlock',
  'Miscellaneous · No grass',
  'Miscellaneous · Crosshair',
  'Config · Limit FPS',
  'Config · Menu Language (English, Chinese)',
  'Config · Save Config',
  'Config · Load Config',
];

const tiersHubSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'WINDOWS 10 and 11 both supported.' },
  {
    icon: 'reqSettings',
    text: 'HVCI ON, Core Isolation ON, TPM ON, Secure Boot ON.',
  },
  {
    icon: 'reqCpu',
    text: 'Cloud DMA required for full functionality. All features on supported builds run through Cloud DMA.',
  },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = '/images/gameplay';

const galleryRaw = {
  gpMapHack: {
    src: `${gameplay}/dayz-esp-wallhack.png`,
    alt: 'DayZ PC ESP wallhack overlay with player boxes, distance tags, and aimbot FOV circle',
    caption: 'ESP wallhack',
    captionDesc: 'Player boxes, distance tags and FOV overlay in DayZ.',
  },
  gpScripts: {
    src: `${gameplay}/dayz-aimbot-combat.png`,
    alt: 'DayZ PC aimbot in combat with FOV circle and green skeleton ESP on an enemy',
    caption: 'Aimbot',
    captionDesc: 'Aimbot FOV and skeleton ESP on an enemy player.',
  },
  gpZoomHack: {
    src: `${gameplay}/dayz-radar-hack.png`,
    alt: 'DayZ radar hack and ESP overlay showing enemy names, health bars, and range markers',
    caption: 'Radar / ESP',
    captionDesc: 'Enemy name tags, health and range on radar ESP.',
  },
  gpSkinChanger: {
    src: `${gameplay}/dayz-clothing-changer.png`,
    alt: 'DayZ chams and skeleton ESP with aim lock during a pier fight on PC',
    caption: 'Chams / ESP',
    captionDesc: 'Skeleton ESP and aim lock on a pier fight.',
  },
  gpAutoKill: {
    src: `${gameplay}/dayz-aimbot.png`,
    alt: 'DayZ sniper aimbot with green ESP box, weapon label, and scoped FOV circle',
    caption: 'Sniper aimbot',
    captionDesc: 'Scoped aimbot with ESP box and weapon label.',
  },
  gpFarmBot: {
    src: `${gameplay}/dayz-loot-esp.png`,
    alt: 'DayZ loot and loot ESP with enemy boxes and distance trackers on the map',
    caption: 'Loot ESP',
    captionDesc: 'Loot and enemy ESP with distance trackers.',
  },
  gpHeroEsp: {
    src: `${gameplay}/dayz-player-esp.png`,
    alt: 'DayZ player ESP wallhack showing skeletons, boxes, and distance meters',
    caption: 'Player ESP',
    captionDesc: 'Skeletons, boxes and distance meters on players.',
  },
  gpThermal: {
    src: `${gameplay}/dayz-thermal-esp.png`,
    alt: 'DayZ thermal ESP wallhack with skeleton outlines, HP, and distance readouts',
    caption: 'Thermal ESP',
    captionDesc: 'Thermal view with skeleton wallhack, HP and distance.',
  },
  gpBuildFight: {
    src: `${gameplay}/dayz-build-fight-esp.png`,
    alt: 'DayZ build-fight ESP wallhack through builds with names, HP bars, and FOV',
    caption: 'Build fight ESP',
    captionDesc: 'ESP through builds with names, HP and FOV.',
  },
  gpArena: {
    src: `${gameplay}/dayz-arena-wallhack.png`,
    alt: 'DayZ arena wallhack ESP with wireframe players and weapon tags',
    caption: 'Arena wallhack',
    captionDesc: 'Wireframe ESP and weapon tags in an arena.',
  },
  gpSpawn: {
    src: `${gameplay}/dayz-spawn-island-esp.png`,
    alt: 'DayZ spawn island ESP with skeleton boxes and aimbot reticle overlay',
    caption: 'Spawn island ESP',
    captionDesc: 'Skeleton boxes and aimbot reticle on spawn island.',
  },
  gpLongRange: {
    src: `${gameplay}/dayz-long-range-esp.png`,
    alt: 'DayZ long-range ESP wallhack with enemy names, health, and weapons through cover',
    caption: 'Long range ESP',
    captionDesc: 'Long-range enemy names, health and weapons through cover.',
  },
  gpAimLock: {
    src: `${gameplay}/dayz-aimbot-lock.png`,
    alt: 'DayZ aimbot lock with green skeleton ESP, FOV circle, and head-bone priority',
    caption: 'Aimbot lock',
    captionDesc: 'Aimbot lock with skeleton ESP and head priority.',
  },
  gpChams: {
    src: `${gameplay}/dayz-chams-esp.png`,
    alt: 'DayZ chams and skeleton ESP cheat overlay on a wooden pier',
    caption: 'Chams ESP',
    captionDesc: 'Chams and skeleton ESP on a wooden pier.',
  },
  gpSquad: {
    src: `${gameplay}/dayz-squad-esp.png`,
    alt: 'DayZ multi-player squad ESP wallhack with boxes, skeletons, and distances',
    caption: 'Squad ESP',
    captionDesc: 'Multi-player ESP boxes, skeletons and distances.',
  },
  gpCombat: {
    src: `${gameplay}/dayz-combat-esp.png`,
    alt: 'DayZ combat ESP and aimbot overlay during an open-field fight on PC',
    caption: 'Combat ESP',
    captionDesc: 'ESP and aimbot overlay in an open-field fight.',
  },
  ugcProduct: {
    src: `${gameplay}/dayz-ugc-product.png`,
    alt: 'UGC account recovery and appeal workflow tools for DayZ and Steam',
    caption: 'UGC account recovery',
    captionDesc: 'Appeal workflows and dispute automation for Steam and BattlEye cases.',
  },
  skinChangerProduct: {
    src: `${gameplay}/dayz-skin-changer-product.png`,
    alt: 'DayZ Skin Changer — cosmetic and weapon skin preview utility',
    caption: 'Skin Changer',
    captionDesc: 'Preview outfits and weapon skins locally on your DayZ client.',
  },
  hwidSpooferChip: {
    src: `${gameplay}/dayz-hwid-spoofer-chip.png`,
    alt: 'DayZ HWID spoofer hardware profile on a PC motherboard chipset',
    caption: 'Hardware profile',
    captionDesc: 'Spoof disk, MAC and related identifiers before a new DayZ session.',
  },
  hwidSpooferPhoenix: {
    src: `${gameplay}/dayz-hwid-spoofer-phoenix.png`,
    alt: 'Phoenix HWID spoofer branding for DayZ PC recovery',
    caption: 'Phoenix spoofer',
    captionDesc: 'Portal workflow for BattlEye hardware ban recovery on PC.',
  },
  hwidSpooferReset: {
    src: `${gameplay}/dayz-hwid-spoofer-reset.png`,
    alt: 'HWID reset and restore checklist icon for DayZ spoofer setup',
    caption: 'Reset checklist',
    captionDesc: 'Restore point, cold reboot and verification before you launch DayZ.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'dayz-cheats';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'DayZ Lite is built for players who want map awareness first. In PvP, knowing enemy positions, loot spawn locations and loot timings wins more fights than raw mechanics—Lite gives you that edge without aimbot automation.',
    },
    { type: 'h2', text: 'PvP-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Aimbot and bot modules entirely. Your gameplay looks natural while ESP, radar overlay and loot timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'DayZ Pro is the sweet spot for PvP grinders. Aimbot, Smooth Aim and Silent aim help you win squad fights without obvious bot patterns—when you tune Smoothness sliders using our portal presets.',
    },
    { type: 'h2', text: 'Aimbot + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds Aimbot, Bone Priority, Hotkey macros and FOV and smoothness drawing. You see the fight before it starts and win it with aimbot that stay human at default settings.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'DayZ Elite is the private build for players who want everything—Loot Assist, Finish assist, Wallbang assist, Clothing Changer, full ESP suite and direct developer support. Limited slots keep the build maintainable and patch cycles fast.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first PvP queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Player ESP with distance and name tags, loot and vehicle locator, loot spawn timers, radar overlay, and stream-safe overlay hiding. Config presets for official and community servers ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Aimbot and automation' },
    {
      type: 'p',
      text: 'Aimbot, Smooth Aim, Silent aim with Prediction, Bone Priority and hotkey macros for heals and mobility. Smoothness sliders tunes cast timing so aimbot stay natural in PvP. Start with portal presets, not max sliders.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at cheatsdayz.com—enough firepower for high-rank lobbies without Elite slot limits. Pair with our aimbot guide in the blog before your first PvP session.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full bot and finish suite' },
    {
      type: 'p',
      text: 'Loot Assist, Rotation Assist AI, Finish assist, Wallbang assist, Clothing Changer and full ESP suite with smoke alerts. Use lobby testing before PvP—Elite power requires disciplined profiles, not rage settings.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite shows as limited slots on the status banner. Open a Discord ticket if checkout is gated—staff confirm slot availability before purchase.',
    },
  ],
};

const hwidSpooferFullFeatures: string[] = [
  'Hardware Spoofer · Hardware Spoofer (Cleaner Included)',
  'Riot Vanguard · Valorant',
  'Easy Anti-Cheat · Rust (Cleaner Included)',
  'Easy Anti-Cheat · Fortnite (Cleaner Included)',
  'Easy Anti-Cheat · Fortnite Tournaments (Cleaner Included)',
  'Easy Anti-Cheat · Apex Legends (Cleaner Included)',
  'Easy Anti-Cheat · Bloodhunt',
  'Easy Anti-Cheat · Dead By Daylight',
  'Easy Anti-Cheat · Gray Zone Warfare',
  'Easy Anti-Cheat · Scum',
  'Easy Anti-Cheat · Sea Of Thieves',
  'Easy Anti-Cheat · Squad',
  'Easy Anti-Cheat · The Finals',
  'Easy Anti-Cheat · War Thunder',
  'Easy Anti-Cheat · Spoofing fine on all EAC games!',
  'BattlEye · Arma 3',
  'BattlEye · Arma Reforger',
  'BattlEye · ARK: Survival Ascended',
  'BattlEye · ARK: Survival Evolved',
  'BattlEye · Black Squad',
  'BattlEye · DayZ',
  'BattlEye · Escape From Tarkov',
  'BattlEye · Rainbow Six Siege',
  'BattlEye · Super People',
  'BattlEye · Unturned',
  'BattlEye · Spoofing fine on all BattlEye games!',
  'Ricochet Anti-Cheat · Call Of Duty: Warzone',
  'Ricochet Anti-Cheat · Call Of Duty: Modern Warfare II',
  'Ricochet Anti-Cheat · Call Of Duty: Modern Warfare III',
  'Ricochet Anti-Cheat · Call Of Duty: Black Ops 6',
  'Ricochet Anti-Cheat · Call Of Duty: Black Ops 7',
  'Other Anti-Cheats · Delta Force',
  'Other Anti-Cheats · Arena Breakout',
  'Other Anti-Cheats · Battlefield 1',
  'Other Anti-Cheats · Battlefield V',
  'Other Anti-Cheats · Battlefield 6',
  'Other Anti-Cheats · Battlefield 2042',
  'Other Anti-Cheats · FiveGuard',
  'Other Anti-Cheats · Spoofing fine on all ACE Anti-Cheat games',
  'Other Anti-Cheats · Spoofing fine on all Javelin Anti-Cheat games',
];

const ugcFullFeatures: string[] = ['Ready-made', 'Ranked', 'Secure', 'Stock', 'Checkout'];

const skinChangerFullFeatures: string[] = [
  'Premium weapon skins',
  'Character outfits',
  'Rare knife variants',
  'Full in-game cosmetic marketplace',
  'Lightweight cross-title skin control',
];

const cloudDmaSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'WINDOWS 10 and 11 both supported.' },
  {
    icon: 'reqSettings',
    text: 'HVCI ON, Core Isolation ON, TPM ON, Secure Boot ON.',
  },
  {
    icon: 'reqCpu',
    text: 'Cloud DMA required for full functionality. All features on supported builds run through Cloud DMA.',
  },
];

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'System requirements' },
    {
      type: 'p',
      text: 'Windows 10 / 11 (64-bit), administrator rights for spoof and cleanup steps, stable internet for activation and updates. Follow the guide before launching Valorant or other protected games. HVCI ON, Core Isolation ON, TPM ON, Secure Boot ON. Cloud DMA is required for full functionality on supported builds.',
    },
    { type: 'h2', text: 'Checkout' },
    {
      type: 'p',
      text: 'Use Buy now on this page to open secure checkout via our partner.',
    },
  ],
  ugc: [
    { type: 'h2', text: 'System requirements' },
    {
      type: 'p',
      text: 'Windows PC with WINDOWS 10 and 11 both supported. HVCI ON, Core Isolation ON, TPM ON, Secure Boot ON. Stable internet for activation, handoff, and support.',
    },
    { type: 'h2', text: 'Checkout' },
    {
      type: 'p',
      text: 'Use Buy now on this page to open secure checkout via our partner.',
    },
  ],
  'skin-changer': [
    { type: 'h2', text: 'System requirements' },
    {
      type: 'p',
      text: 'Windows 10 and 11 supported. HVCI ON, Core Isolation ON, TPM ON, Secure Boot ON. Cloud DMA is required for full functionality on supported builds.',
    },
    { type: 'h2', text: 'Checkout' },
    {
      type: 'p',
      text: 'Use Buy now on this page to open secure checkout via our partner.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: slide('gpHeroEsp', 'gpLongRange', 'gpSquad'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: dayzSystemRequirements,
    fullFeatures: [
      'Player ESP & player boxes',
      'Loot & loot locator',
      'town awareness',
      'Health & shield tracking',
      'Mini-radar overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team color filter',
      'Loot spawn timers',
      'Radar overlay',
      'hardcore preset config',
      'PvP preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'DayZ Lite: ESP and radar',
      paragraphs: [
        'Lite is for player ESP, loot markers, loot timers and radar. No aimbot. Set distance, colors and stream-proof in the portal before you queue.',
        'Best if you want awareness in official and community servers without combat automation. Overlays are updated after DayZ patches.',
      ],
    },
  },
  pro: {
    images: slide('gpScripts', 'gpAimLock', 'gpCombat'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: dayzSystemRequirements,
    fullFeatures: [
      'All Lite ESP & player ESP modules',
      'Aimbot',
      'Smooth Aim',
      'Silent aim & Prediction',
      'Bone Priority',
      'Hotkey macros (heals/shields)',
      'Auto Heal',
      'FOV & smoothness tuning',
      'Per-weapon aimbot profiles',
      'Third-party alert integration',
      'PvP-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord operator support',
    ],
    overview: {
      title: 'DayZ Pro: aimbot plus ESP',
      paragraphs: [
        'Pro includes everything in Lite, plus Aimbot, Smooth Aim, Silent aim and hotkey macros. Aim settings live in one tab. Start with a portal preset, not max sliders.',
        'Most people pick Pro for official and community servers. Bone priority and macros help in fights while defaults stay smooth.',
      ],
    },
  },
  elite: {
    images: slide('gpAutoKill', 'gpThermal', 'gpBuildFight'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: dayzSystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      'Loot Assist',
      'Rotation Assist AI',
      'Loot respawn timer',
      'Auto loadout manager',
      'Finish assist',
      'Wallbang assist',
      'Full ESP suite',
      'Third-party alert system',
      'Visibility detector',
      'Clothing Changer (Clothing Unlock)',
      'Priority patch queue',
      'Direct dev Discord support',
      'Elite conservative presets',
      'Cloud config backup',
      'Patch auto-updater',
      'Private slot access',
    ],
    overview: {
      title: 'DayZ Elite: full cheat + extras',
      paragraphs: [
        'Elite includes Lite and Pro modules, plus loot assist, Finish assist, Wallbang assist, Clothing Changer, full ESP suite and faster patch priority.',
        'Slots are limited. Discord support helps you set safer profiles before PvP. Check the status banner on cheatsdayz.com before you buy.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('hwidSpooferChip', 'hwidSpooferPhoenix', 'hwidSpooferReset'),
    goodToKnow:
      'Run spoof and cleanup before launching Valorant or your banned title. Follow the current guide in your account / ticket channel for the exact order of steps.',
    limitations:
      'Driver-level hardware changes carry risk. Results vary by anti-cheat and case type. You accept all risk from spoofing and cleanup steps.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 / 11 (64-bit).' },
      { icon: 'reqShieldGuide', text: 'Administrator rights for spoof and cleanup steps.' },
      { icon: 'reqWifi', text: 'Stable internet for activation and updates.' },
      {
        icon: 'reqSettings',
        text: 'Follow the guide before launching Valorant or other protected games.',
      },
      { icon: 'reqSettings', text: 'HVCI ON, Core Isolation ON, TPM ON, Secure Boot ON.' },
      {
        icon: 'reqCpu',
        text: 'Cloud DMA required for full functionality. All features on supported builds run through Cloud DMA.',
      },
    ],
    fullFeatures: hwidSpooferFullFeatures,
    overview: {
      title: 'HWID Spoofer — product details',
      paragraphs: [
        'Zadeyo HWID Spoofer is built for HWID ban recovery, including Valorant and Riot’s Vanguard anti-cheat. It changes hardware identifiers (disk serials, MAC addresses, GPU IDs, and related IDs) so you can return after a hardware ban with a clean slate. Use it when Valorant / Vanguard has locked your machine, or when you need the same HWID reset for other titles protected by EAC, BattlEye, Ricochet, and more.',
      ],
    },
  },
  ugc: {
    images: slide('ugcProduct'),
    goodToKnow:
      'Fresh stock rotates regularly across ranked, leveled, and starter options. Use the order email from checkout when you open support.',
    limitations:
      'Account handoff depends on live stock and title. Follow platform terms of use for every game you play.',
    systemRequirements: cloudDmaSystemRequirements,
    fullFeatures: ugcFullFeatures,
    overview: {
      title: 'Game Accounts — product details',
      paragraphs: [
        'Buy game accounts from ZADEYO. Choose a ready-made account for the titles you play, complete checkout, and receive secure credential handoff with support if you need help getting started. Fresh stock rotates regularly across ranked, leveled, and starter options.',
      ],
    },
  },
  'skin-changer': {
    images: slide('skinChangerProduct'),
    goodToKnow:
      'Skin Changer is a lightweight tool for in-game cosmetic control across major titles. Follow setup in the portal after purchase.',
    limitations:
      'Cosmetic tools may not match every title or patch day. Compatibility can change after game or anti-cheat updates.',
    systemRequirements: cloudDmaSystemRequirements,
    fullFeatures: skinChangerFullFeatures,
    overview: {
      title: 'Skin Changer Cheats — product details',
      paragraphs: [
        'Skin Changer is a simple, lightweight tool designed to give you complete control over your in-game cosmetics. Instead of spending hundreds of dollars on microtransactions, our tool unlocks the entire marketplace of premium weapon skins, character outfits, and rare knife variants across major titles and many games.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = cheat.name === 'Lite' ? 'DayZ Lite' : cheat.name === 'Pro' ? 'DayZ Pro' : 'DayZ Elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

function buildTiersHubPage(): ProductPage {
  const combinedFeatures = [
    'Aimbot · FOV, distance & bone priority',
    'Player ESP · boxes, skeleton & inventory',
    'World ESP · animals, vehicles & helicrash',
    'Item ESP · quality filters & battle mode',
    'Miscellaneous · crosshair, noclip & visual tweaks',
    'Config · save/load & menu language',
  ];
  const moreFeatures = Math.max(0, tiersHubFullFeatures.length - combinedFeatures.length);

  return {
    slug: 'tiers',
    kind: 'tier',
    badge: 'Undetected',
    tier: 'Lite · Pro · Elite',
    name: 'All tiers',
    title: 'DayZ Cheats',
    subtitle:
      'Buy undetected DayZ cheats with player ESP, precision aimbot, wallhack tools, and instant delivery. Comprehensive undetected ESP and aimbot for DayZ survival gameplay on PC Steam.',
    desc: 'Shop undetected DayZ cheats, private hacks, player ESP, precision aimbot, wallhack, and cheat tools with secure checkout and instant digital delivery.',
    features: combinedFeatures,
    more: moreFeatures,
    variant: 'popular',
    buyUrl: checkoutForSlug('lite'),
    images: slide('gpMapHack', 'gpScripts', 'gpAutoKill', 'gpThermal'),
    overview: {
      title: 'DayZ Cheats — product details',
      paragraphs: [
        'Zadeyo DayZ Cheat is a comprehensive undetected ESP and aimbot for DayZ survival gameplay. Our DayZ hack bypasses BattlEye and provides essential features including player ESP, loot tracking, vehicle locations, zombie detection, and aimbot assistance to help you survive the apocalypse.',
      ],
    },
    acquisition: acquisitionFor('DayZ Cheats'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    fullFeatures: tiersHubFullFeatures,
    systemRequirements: tiersHubSystemRequirements,
    about: [
      {
        type: 'p',
        text: 'Use the comparison table on this page to see which modules ship in Lite, Pro and Elite. Each tier has its own detail page with screenshots and checkout—open Lite, Pro or Elite from the table when you are ready.',
      },
    ],
    body: [
      { type: 'h2', text: 'Lite tier' },
      {
        type: 'p',
        text: '[DayZ Lite](/products/dayz-cheats/lite/) is for map awareness: player ESP, loot markers, radar overlay and stream-proof mode. No aimbot—best for players who want information without combat automation.',
      },
      { type: 'h2', text: 'Pro tier' },
      {
        type: 'p',
        text: '[DayZ Pro](/products/dayz-cheats/pro/) includes everything in Lite plus aimbot, smooth aim, silent aim, bone priority and per-weapon profiles. Most players pick Pro for official and community PvP.',
      },
      { type: 'h2', text: 'Elite tier' },
      {
        type: 'p',
        text: '[DayZ Elite](/products/dayz-cheats/elite/) is the full private build—loot assist, finish assist, wallbang assist, Clothing Changer and priority patches. Slots are limited; check status before checkout.',
      },
      { type: 'h2', text: 'Checkout' },
      {
        type: 'p',
        text: 'Use Buy now on this page or on any tier detail page to open secure checkout via our partner.',
      },
      { type: 'h2', text: 'System requirements' },
      {
        type: 'p',
        text: 'Windows 10 and 11 supported. HVCI ON, Core Isolation ON, TPM ON, Secure Boot ON. Cloud DMA is required for full functionality on supported builds.',
      },
    ],
    relatedBlogSlugs: productRelatedBlogSlugs.tiers ?? [],
  };
}

export interface CatalogProductCard {
  slug: string;
  kind: 'tier' | 'utility';
  name: string;
  tier?: string;
  category?: string;
  title: string;
  badge: string;
  variant?: 'essential' | 'popular' | 'limited';
  features: string[];
  more: number;
  buyUrl: string;
  detailHref: string;
  spanFull?: boolean;
  priceLabel?: string;
}

function buildCatalogProductPages(): CatalogProductCard[] {
  const utilities = t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      return {
        slug,
        kind: 'utility' as const,
        name: product.title,
        category: product.category,
        title: product.title,
        badge: product.badge,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        detailHref: `${productBase}${slug}/`,
      };
    });

  const tierPages = buildTierPages();
  const combinedMore = tierPages.reduce((sum, page) => sum + page.more, 0);

  return [
    {
      slug: 'tiers',
      kind: 'tier',
      name: 'All tiers',
      tier: 'Lite · Pro · Elite',
      title: 'DayZ Cheats (Lite · Pro · Elite)',
      badge: 'Undetected',
      variant: 'popular',
      features: [
        'Lite — ESP, loot ESP, radar & stream-proof',
        'Pro — All Lite + aimbot, silent aim & macros',
        'Elite — Loot assist, wallbang & Clothing Changer',
        'Player ESP, aimbot & full ESP suite',
        'Cloud config backup & patch auto-updater',
      ],
      more: combinedMore,
      buyUrl: checkoutForSlug('lite'),
      detailHref: `${productBase}tiers/`,
      spanFull: true,
    },
    ...utilities,
  ];
}

export const catalogProductPages: CatalogProductCard[] = buildCatalogProductPages();

export const productPages: ProductPage[] = [
  buildTiersHubPage(),
  ...buildTierPages(),
  ...buildUtilityPages(),
];

export const cheatPages = productPages.filter((p) => p.kind === 'tier' && p.slug !== 'tiers');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpAimLock', 'gpThermal', 'gpArena');

/** Keep the hero carousel lean for LCP (mobile Lighthouse). */
export const heroSlides = slide(
  'gpMapHack',
  'gpScripts',
  'gpHeroEsp',
  'gpZoomHack',
  'gpAutoKill',
  'gpFarmBot',
  'gpSkinChanger',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'DayZ cheats for PC Steam — Lite ESP, Pro aimbot, Elite full suite, HWID spoofer, UGC appeals and Clothing Changer.',
  buyUrl: checkoutPath('dayz'),
};

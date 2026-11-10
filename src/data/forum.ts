export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

export function forumUserLabel(author: string): string {
  const clean = author.replace(/^u\//i, '').trim();
  return `u/${clean}`;
}

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  author: string;
  age?: string;
  answer: string;
  detail: string;
  tip: string;
  replyAuthor?: string;
  threadReplies?: ForumComment[];
}): ForumPost {
  const { answer, detail, tip, replyAuthor, age, threadReplies, ...post } = input;
  const comments: ForumComment[] = [
    {
      author: replyAuthor ?? 'SakhalSurvivor',
      age: '1 day ago',
      score: Math.max(3, Math.floor(post.upvotes / 5)),
      body: tip,
    },
    ...(threadReplies ?? []),
  ];
  return {
    ...post,
    age: age ?? '2 days ago',
    commentsCount: comments.length,
    flair: 'Discussion',
    body: [answer, detail],
    comments,
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'dayz-map-awareness', title: 'What does map awareness include in the guide?', upvotes: 73, author: 'ChernarusCartographer',
    excerpt: 'A quick breakdown of player, chest, loot, and smoke information covered by the map awareness guide.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'DayZ ESP wallhack setup guide', sourcePath: '/blog/dayz-esp-wallhack/',
    answer: 'The guide covers player ESP, loot and vehicle markers, loot information, smoke alerts, and last-seen positions. The exact options depend on the selected product tier.',
    detail: 'It recommends starting with a restrained layout and enabling only the information you can read comfortably during a team fight.',
    tip: 'Keep the overlay uncluttered: begin with the core indicators, then adjust the range and visibility settings one at a time.',
    threadReplies: [
      { author: 'loot_ping_only', age: '18 hours ago', score: 5, body: 'I turned off vehicle icons first—too noisy in Elektro fights.' },
      { author: 'ChernarusCartographer', age: '12 hours ago', score: 4, body: 'Same settings worked on 1.27 for me—only had to re-check range after the last patch.' },
      { author: 'NWAF_solo', age: '10 hours ago', score: 6, body: 'Smoke alerts saved me twice at NWAF—worth turning on once boxes feel clean.' },
      { author: 'duo_stack_dz', age: '8 hours ago', score: 3, body: 'We color-code duo: blue ally, orange unknown. Stops us talking over each other.' },
      { author: 'Sakhal_new', age: '6 hours ago', score: 2, body: 'Sakhal forests need shorter ESP range or you drown in tree clutter.' },
      { author: 'status_checker', age: '4 hours ago', score: 4, body: 'Always peek #status before cranking distance after a patch—saved my session last Tuesday.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-esp-overlay', title: 'How should I set up the map overlay for the first time?', upvotes: 58, author: 'ESP_newbie_2026',
    excerpt: 'Start with the basic display options, confirm the overlay in a practice session, then adjust one setting at a time.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'DayZ ESP wallhack setup guide', sourcePath: '/blog/dayz-esp-wallhack/',
    answer: 'Use the setup guide to enable the overlay, choose readable colors, and check that the indicators do not cover important parts of the game interface.',
    detail: 'Test your layout in a low-pop test server before relying on it in a live match. A simple configuration is easier to understand than turning on every option immediately.',
    tip: 'If the screen feels crowded, reduce the number of indicators before changing their size or position.',
    threadReplies: [
      { author: 'colorblind_dz', age: '2 days ago', score: 6, body: 'Yellow boxes on green grass were rough for me—switched to magenta in the guide palette.' },
      { author: 'ESP_newbie_2026', age: '1 day ago', score: 3, body: 'Second session I dropped loot icons to 800m and it finally felt readable.' },
      { author: 'low_pop_only', age: '22 hours ago', score: 5, body: 'First test on a 12-pop community server—not a single report and I could tweak without pressure.' },
      { author: 'ui_clutter', age: '16 hours ago', score: 4, body: 'Hide the crosshair dot in the loader if you run irons—tiny thing but it helped my focus.' },
      { author: 'night_raid', age: '11 hours ago', score: 2, body: 'Night servers need thicker box outlines. Default thin lines vanish in rain.' },
      { author: 'colorblind_dz', age: '7 hours ago', score: 3, body: 'Magenta plus white skeleton is my final combo if anyone needs a starting point.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-radar-zoom', title: 'What camera zoom settings are comfortable to play with?', upvotes: 44, author: 'RadarZoomRat',
    excerpt: 'The zoom guide focuses on finding a view that improves map context without making your player hard to control.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'DayZ radar hack guide', sourcePath: '/blog/dayz-radar-hack/',
    answer: 'There is no single ideal zoom value for every player. The guide recommends adjusting gradually and checking that you can still track your player, spell ranges, and nearby fights.',
    detail: 'Keep a quick reset to the default camera view available so you can compare the wider view and return to familiar framing.',
    tip: 'Change one step at a time and play a short practice session before settling on a new camera distance.',
    threadReplies: [
      { author: 'zoom_whale', age: '2 days ago', score: 8, body: '140% was my sweet spot for Cherno—anything past 160 and I lose footstep direction.' },
      { author: 'RadarZoomRat', age: '1 day ago', score: 4, body: 'Good reminder on reset key. I bound mine to middle mouse so panic zoom-out is instant.' },
      { author: 'Livonia_main', age: '20 hours ago', score: 5, body: 'Livonia feels different; I run lower zoom than Chernarus because fights are tighter.' },
      { author: 'duo_stack_dz', age: '14 hours ago', score: 3, body: 'Pair radar with Lite loot ESP—seeing dots without knowing loot state is half the picture.' },
      { author: 'first_week', age: '9 hours ago', score: 2, body: 'Took three evenings to find a zoom I did not fight against. Patience beats max settings.' },
      { author: 'patch_127', age: '5 hours ago', score: 4, body: 'Re-tested after last patch; default FOV felt wider. One notch down fixed it.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-aimbot-delay', title: 'How do delay settings affect player aimbot?', upvotes: 32, author: 'SmoothAimEnjoyer',
    excerpt: 'A practical question about timing, combo readability, and why the aimbot guide recommends conservative tuning.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'DayZ aimbot for PvP play', sourcePath: '/blog/dayz-aimbot-guide/',
    answer: 'Delay settings control the spacing between automated actions. The guide recommends starting with slower timings and testing them in a practice setting before making changes.',
    detail: 'A consistent sequence is easier to review and tune than changing several timing values at once.',
    tip: 'Keep a note of each configuration you try so you can return to the last setup that behaved as expected.',
    threadReplies: [
      { author: 'replay_watcher', age: '3 days ago', score: 9, body: '90ms between shots looked robotic in a community replay—bumped to 130 and reports stopped.' },
      { author: 'SmoothAimEnjoyer', age: '2 days ago', score: 4, body: 'Spreadsheet gang. Column for smoothness, column for delay, date column. Sounds nerdy, works.' },
      { author: 'bolt_action_only', age: '1 day ago', score: 6, body: 'Bolts need longer delay than SMG. One preset for all weapons was my mistake.' },
      { author: 'hardcore_creep', age: '18 hours ago', score: 3, body: 'Hardcore preset delay is higher for a reason—do not copy PvP numbers onto HC.' },
      { author: 'admin_scare', age: '12 hours ago', score: 5, body: 'Conservative delay is partly about spectate. Fast snaps look wrong even when they connect.' },
      { author: 'TrainingGroundDZ', age: '6 hours ago', score: 2, body: 'Cross-linking the weapons guide here—per-gun delay section answered what I was missing.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-aimbot-practice', title: 'What is a good way to practice an aimbot?', upvotes: 29, author: 'TrainingGroundDZ',
    excerpt: 'Use a repeatable player setup, learn the sequence, and check each spell and item timing in a controlled lobby.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'DayZ aimbot player aimbot', sourcePath: '/blog/dayz-aimbot-weapons/',
    answer: 'Choose one player and one combo to practice at a time. The guide walks through example sequences and explains how target selection and ability order fit together.',
    detail: 'A custom lobby lets you repeat the sequence and see which steps need adjustment without the pressure of a live match.',
    tip: 'Learn the manual sequence first; that makes it much easier to spot when a configuration is mistimed.',
    threadReplies: [
      { author: 'one_rifle_week', age: '4 days ago', score: 7, body: 'SKS only for a week in community. Boring but my flicks actually improved.' },
      { author: 'TrainingGroundDZ', age: '3 days ago', score: 3, body: 'Reset between mag dumps—muscle memory needs clean reps not chaos.' },
      { author: 'pos4_roamer', age: '2 days ago', score: 5, body: 'Manual aim first then enable smooth aim at 40%. Skipping manual made me overcorrect.' },
      { author: 'lag_spike_city', age: '1 day ago', score: 4, body: 'Practice on your home server ping if you can. EU me on US feels like a different game.' },
      { author: 'friend_spectate', age: '16 hours ago', score: 2, body: 'Had a mate watch community duels—caught me dragging through walls on bad settings.' },
      { author: 'IronsightIRL', age: '8 hours ago', score: 3, body: 'Same thread as the weapon drill post below—both guides overlap nicely.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-elite-tier', title: 'What additional tools are included in the Elite tier?', upvotes: 67, author: 'EliteCurious',
    excerpt: 'The Elite guide explains how its extra utility modules compare with the Lite and Pro feature sets.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'DayZ Elite tier guide', sourcePath: '/blog/dayz-elite-cheats/',
    answer: 'The guide describes Elite as including the Lite and Pro feature sets plus additional utilities such as Loot Assist, Finish assist, Wallbang assist, and Clothing Changer.',
    detail: 'It also covers who may benefit from the extra modules and why it makes sense to understand the simpler feature set first.',
    tip: 'Compare the included features against your needs before choosing a tier; the full comparison is linked in the guide.',
    threadReplies: [
      { author: 'Pro_first', age: '5 days ago', score: 11, body: 'Sat on Pro six weeks before Elite. Loot assist is nice but I did not need it day one.' },
      { author: 'EliteCurious', age: '4 days ago', score: 4, body: 'Clothing Changer bundled is what pushed me—cosmetic preview without store spend.' },
      { author: 'slot_anxiety', age: '3 days ago', score: 6, body: 'Limited slots are real—check status before checkout or you wait a day.' },
      { author: 'finish_debate', age: '2 days ago', score: 3, body: 'Finish assist feels strong on wounded runners. Toggle off in RP communities if you care.' },
      { author: 'discord_elite', age: '1 day ago', score: 5, body: 'Priority patch queue actually answered within hours last BattlEye wave—not marketing fluff for me.' },
      { author: 'wallet_ready', age: '10 hours ago', score: 2, body: 'Lifetime vs monthly math on Elite only makes sense if you play daily. I do, so lifetime.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-lite-pro-diff', title: 'How do Lite and Pro differ in practice?', upvotes: 53, author: 'TierShopper',
    excerpt: 'Lite centers on awareness features, while Pro adds player script tools; here is the short version.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'DayZ Lite vs Pro: which tier fits you', sourcePath: '/blog/dayz-lite-vs-pro/',
    answer: 'The comparison guide describes Lite as focused on awareness tools such as ESP, military loot and food information, and zoom. Pro adds aimbot automation features on top of that foundation.',
    detail: 'The right choice depends on whether you need map information alone or also want the additional script modules described in the comparison.',
    tip: 'Use the full side-by-side comparison to check specific modules before making a decision.',
    threadReplies: [
      { author: 'ESP_only_guy', age: '6 days ago', score: 12, body: 'Lite for three months, never missed aimbot. Map info wins more fights than I expected.' },
      { author: 'TierShopper', age: '5 days ago', score: 5, body: 'Pro upgrade was portal delta only—did not reinstall loader. Smooth.' },
      { author: 'stream_dad', age: '4 days ago', score: 4, body: 'Stream-proof on Lite was enough for my Sunday streams. Pro later for aimbot off-stream.' },
      { author: 'one_more_game', age: '3 days ago', score: 7, body: 'Comparison table beats Reddit tier wars. Link it before every “which tier” question.' },
      { author: 'hardcore_creep', age: '2 days ago', score: 3, body: 'HC player—Lite radar plus loot timers, no scripts. Pro felt like overkill for my playstyle.' },
      { author: 'FirstTimeBuyer_DZ', age: '1 day ago', score: 2, body: 'Wish I read this before buying Elite first. Downgraded mindset, kept Lite, happier.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-skin-changer-faq', title: 'What should I know about the Clothing Changer utility?', upvotes: 38, author: 'CosmeticOnlyPls',
    excerpt: 'The product guide explains how cosmetic previews work and what to expect from the utility.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'DayZ Clothing Changer guide', sourcePath: '/blog/dayz-skin-changer/',
    answer: 'The guide describes Clothing Changer as a local cosmetic preview utility. It explains setup, supported options, and how to restore the default appearance.',
    detail: 'Review the compatibility notes and follow the current setup instructions before using the utility.',
    tip: 'Cosmetic changes are local previews; check the guide for current limitations and setup steps.',
    threadReplies: [
      { author: 'mirror_only', age: '4 days ago', score: 8, body: 'Other players still see my actual ghillie. Expected that from the guide but worth repeating.' },
      { author: 'CosmeticOnlyPls', age: '3 days ago', score: 3, body: 'Export favorites helped me A/B outfits without rebuying on Steam.' },
      { author: 'Elite_bundle', age: '2 days ago', score: 5, body: 'Got it via Elite first—standalone key exists if you only want skins.' },
      { author: 'screenshot_flex', age: '1 day ago', score: 4, body: 'Use for screenshots and menu flex, not in-game flex at traders. People check inventories.' },
      { author: 'revert_panic', age: '18 hours ago', score: 2, body: 'Revert button in portal saved me when a patch reset local cache weird.' },
      { author: 'no_pay_to_win', age: '8 hours ago', score: 6, body: 'Cosmetic only = no advantage. Good for staying low profile in squad.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-battleye-verify-error', title: 'What should I do if BattlEye cannot verify my DayZ install?', upvotes: 24, author: 'VerifyErrorAgain',
    excerpt: 'Start with Steam file verification and a clean restart before assuming the issue is an account restriction.',
    category: 'Patch Talk', categoryTone: 'orange', sourceTitle: 'BattlEye unable to verify DayZ', sourcePath: '/blog/dayz-battleye-verify/',
    answer: 'The troubleshooting guide says the message can result from game-file problems or software conflicts and does not always mean an account ban. First verify DayZ files through Steam.',
    detail: 'It also recommends fully exiting Steam, restarting the PC, and checking for conflicting overlays before trying more disruptive steps.',
    tip: 'Test a normal Steam launch before starting other software so you can narrow down the cause.',
    threadReplies: [
      { author: 'verify_twice', age: '5 days ago', score: 10, body: 'Steam verify fixed mine—took 20 min, no ban, just corrupt bin.' },
      { author: 'VerifyErrorAgain', age: '4 days ago', score: 4, body: 'Second time was Rivatuner left running. Exit overlay apps first.' },
      { author: 'clean_boot', age: '3 days ago', score: 6, body: 'Full PC restart before blaming HWID. Half my verify errors were sleep mode ghosts.' },
      { author: 'UGC_not_this', age: '2 days ago', score: 5, body: 'Verify error ≠ ban. Guide linked UGC for appeals—different problem.' },
      { author: 'disk_space', age: '1 day ago', score: 3, body: 'Low disk on install drive threw verify for me once. Weird but true.' },
      { author: 'BattlEyeNights', age: '12 hours ago', score: 2, body: 'Log the exact BE message before Discord ticket—support asked for that first.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-external-loader', title: 'What does “external loader” mean?', upvotes: 46, author: 'ExternalVsInternal',
    excerpt: 'The external software guide explains the term and outlines the general setup described on the site.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'DayZ external cheat guide', sourcePath: '/blog/dayz-external-cheats/',
    answer: 'The article uses “external” to describe software that runs separately from the DayZ process and presents its interface as an overlay.',
    detail: 'It discusses the architecture at a high level and explains setup, patch updates, and the differences described between external and internal tools.',
    tip: 'Check compatibility and current status information whenever DayZ receives an update.',
    threadReplies: [
      { author: 'ExternalVsInternal', age: '1 week ago', score: 9, body: 'External = overlay dashboard, game folder untouched. That was my main reason to pick this site.' },
      { author: 'patch_day_1', age: '5 days ago', score: 5, body: 'Loader before DayZ, every time. Reverse order = weird module states for me.' },
      { author: 'administrator_ugh', age: '4 days ago', score: 4, body: 'Run as admin only when guide says—extra admin broke my first install.' },
      { author: 'internal_scare', age: '3 days ago', score: 7, body: 'Tried internal elsewhere years ago. BE heart attack. External + status checks since.' },
      { author: 'cloud_sync', age: '2 days ago', score: 3, body: 'Cloud configs mean I do not re-tune after laptop swap. Underrated part of external stack.' },
      { author: 'status_checker', age: '1 day ago', score: 2, body: 'Article is high level but points to product pages for module list—read both.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-stream-proof-obs', title: 'How can I check whether OBS captures an overlay?', upvotes: 21, author: 'StreamSafeDad',
    excerpt: 'The stream-proof setup guide recommends recording a short test and checking the playback before streaming.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Stream-proof overlay setup for DayZ', sourcePath: '/blog/dayz-stream-proof/',
    answer: 'Record a short local test with the exact OBS scene and capture mode you plan to use, then review the playback for any overlay elements.',
    detail: 'The guide recommends testing game capture and display capture separately, since capture methods and multi-monitor setups can behave differently.',
    tip: 'Do not rely on the preview alone; review a saved recording from the same scene you intend to stream.',
    threadReplies: [
      { author: 'StreamSafeDad', age: '6 days ago', score: 8, body: '30-second local recording caught Game Bar leaking boxes. OBS alone looked fine.' },
      { author: 'dual_monitor', age: '5 days ago', score: 5, body: 'Display capture on wrong monitor showed ESP once—game capture fixed it.' },
      { author: 'discord_stream', age: '4 days ago', score: 4, body: 'Discord screen share is NOT the same test as OBS. Test both if you use both.' },
      { author: 'module_toggle', age: '3 days ago', score: 3, body: 'Toggle stream-proof per module in loader. I only hide ESP, keep radar for me.' },
      { author: 'vod_review', age: '2 days ago', score: 6, body: 'Upload unlisted VOD scrub before going live. Found menu flash at 0:42.' },
      { author: 'partner_anxiety', age: '1 day ago', score: 2, body: 'Twitch ToS is on you—stream-proof helps capture, not platform rules.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-hwid-reset', title: 'What should I check after changing PCs or hardware?', upvotes: 33, author: 'NewPCWhoDis',
    excerpt: 'The HWID guide covers common setup checks and when to contact support for an account or device reset.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'DayZ HWID spoofer after ban', sourcePath: '/blog/dayz-hwid-spoofer/',
    answer: 'Start by checking the account and device instructions for your product. The guide explains common HWID questions and when a reset request may be needed.',
    detail: 'Avoid changing several system settings at once. If the product does not recognize your device, contact support with the relevant error details.',
    tip: 'Use the official support path for device resets instead of relying on unrelated third-party tools.',
    threadReplies: [
      { author: 'NewPCWhoDis', age: '1 week ago', score: 7, body: 'Portal HWID reset after GPU swap—one ticket, next morning fine.' },
      { author: 'one_change', age: '5 days ago', score: 5, body: 'Changed RAM and disk same day, broke everything. Do one hardware change at a time.' },
      { author: 'fresh_steam', age: '4 days ago', score: 4, body: 'New Steam account on old PC still died until spoofer workflow—guide explains the split.' },
      { author: 'ticket_template', age: '3 days ago', score: 3, body: 'Include order email + Windows build in ticket. Support closed mine in one reply.' },
      { author: 'laptop_gamer', age: '2 days ago', score: 6, body: 'Laptop to desktop move needed reset AND cloud config pull. Both in portal.' },
      { author: 'random_tools', age: '1 day ago', score: 2, body: 'Random “cleaner” exe from YouTube made things worse. Stick to product guide.' },
    ],
  }),
  guideDiscussion({
    slug: 'dayz-install-checklist', title: 'What should I review before installing a new tool?', upvotes: 18, author: 'ReadTheGuideFirst',
    excerpt: 'Check the official setup steps, current compatibility notes, and support information before proceeding.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'DayZ cheats features guide', sourcePath: '/blog/dayz-cheats-features/',
    answer: 'Read the feature and setup information first, confirm that it matches your system, and check the current update/status notes.',
    detail: 'The site guide describes the available feature groups and links to more specific setup articles for individual modules.',
    tip: 'Use the linked product and support pages as the source of truth for current availability and compatibility.',
    threadReplies: [
      { author: 'ReadTheGuideFirst', age: '5 days ago', score: 6, body: 'Status banner green, then install. Skipped once, loader mismatched game build.' },
      { author: 'av_exclusion', age: '4 days ago', score: 4, body: 'Windows Defender exclusion from support doc—without it loader vanished mid-download.' },
      { author: 'wrong_tier', age: '3 days ago', score: 5, body: 'Feature guide showed Elite modules—I almost enabled bots on Lite. Read tier table first.' },
      { author: 'discord_pin', age: '2 days ago', score: 3, body: '#status pin is faster than asking “is it up” every patch day.' },
      { author: 'vpn_off', age: '1 day ago', score: 2, body: 'VPN broke portal login for me. Off for checkout and download.' },
      { author: 'backup_config', age: '12 hours ago', score: 4, body: 'Export default preset before first tweak. Saved me when I nuked sliders.' },
    ],
  }),
  guideDiscussion({
    slug: 'choose-dayz-cheat-tier', title: 'How do I choose the right DayZ product tier?', upvotes: 48, author: 'FirstTimeBuyer_DZ',
    excerpt: 'Compare the feature sets first, then follow the official checkout and setup instructions for your selection.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'How to buy DayZ cheats in 2026', sourcePath: '/blog/buy-dayz-cheats/',
    answer: 'The buying guide recommends comparing included features and choosing the tier that fits your needs before continuing through the official checkout.',
    detail: 'It covers the purchase flow, account access, downloading the current build, and checking setup instructions before launching.',
    tip: 'If you have a payment or account question, use the site support page and avoid sharing purchase details publicly.',
    threadReplies: [
      { author: 'wallet_ready', age: '3 days ago', score: 4, body: 'Compared tiers on the product page first—saved me from buying Elite when Pro was enough.' },
      { author: 'FirstTimeBuyer_DZ', age: '2 days ago', score: 2, body: 'Went Lite first month, upgraded to Pro after I actually used ESP daily.' },
      { author: 'levo_email', age: '1 day ago', score: 5, body: 'Checkout email = portal login. Use real inbox you check—lost key once on throwaway.' },
      { author: 'monthly_try', age: '20 hours ago', score: 3, body: 'Monthly key let me test without lifetime regret. Worth it for indecisive people.' },
      { author: 'support_before_buy', age: '14 hours ago', score: 6, body: 'Discord pre-sales answered HWID question in ten minutes. Bought with confidence.' },
      { author: 'no_dm_keys', age: '8 hours ago', score: 7, body: 'Only buy from site /go links. Random DM “cheap keys” is always a scam thread.' },
    ],
  }),
];

export const forumPosts: ForumPost[] = [
  {
    slug: 'dayz-cheat-codes-pvp', category: 'General', categoryTone: 'purple',
    title: 'Can I use DayZ cheat codes in PvP matchmaking?',
    excerpt: 'Quick answer from the practice lobby guide: built-in lobby commands only work in custom matches with cheats enabled.',
    author: 'ChernarusDupes', age: '2 hours ago', commentsCount: 7, upvotes: 128, flair: 'Question',
    sourceTitle: 'DayZ cheat codes guide: console commands for test servers', sourcePath: '/blog/dayz-cheat-codes/',
    body: ['No. community islands and low-pop test servers are for practice only. They do not carry into PvP matchmaking or hardcore.', 'Use community to learn aimbot smoothness, ESP ranges, and loadouts. The guide also explains the difference between practice drills and private DayZ cheats.'],
    comments: [
      { author: 'mid_or_feed', age: '1 hour ago', score: 24, body: 'Correct: load a community aim map or low-pop test server before touching PvP presets.' },
      { author: 'ancient_archivist', age: '48 min. ago', score: 11, body: 'The guide covers rifle, pistol, and shotgun drills. Keep PvP presets conservative after practice.' },
      { author: 'push_first', age: '35 min. ago', score: 8, body: 'Useful distinction. community practice tools are not PvP features.' },
      { author: 'NWAF_regular', age: '28 min. ago', score: 6, body: 'I wasted a week thinking -allvision worked on official. It does not—custom lobby only.' },
      { author: 'loot_goblin_dz', age: '22 min. ago', score: 4, body: 'Still worth practicing recoil in community though. Helped my actual aim even without cheats.' },
      { author: 'SvetlojarskMike', age: '15 min. ago', score: 3, body: 'Bookmarked the practice guide—clear split between test servers and official.' },
      { author: 'pos4_roamer', age: '9 min. ago', score: 2, body: '+1 for calling out PvP separately. Too many threads mix up test server commands with paid tools.' },
    ],
  },
  {
    slug: 'dayz-console-setup', category: 'General', categoryTone: 'purple',
    title: 'How do I turn on the DayZ developer console?',
    excerpt: 'Open Settings → Options → Advanced and enable the console. Here is the quick setup from our walkthrough.',
    author: 'ConsoleKeybinds', age: '4 hours ago', commentsCount: 7, upvotes: 86, flair: 'Question',
    sourceTitle: 'How to use cheat codes in DayZ', sourcePath: '/blog/dayz-cheats-practice/',
    body: ['Open Settings, choose Options, then open Advanced Options and enable the developer console. In a custom lobby, press the console key (usually tilde) and enter the command. You also need the host to enable cheats in the lobby settings.', 'If a command does nothing, first confirm cheats are enabled for that lobby and check the command syntax.'],
    comments: [
      { author: 'pos4_roamer', age: '3 hours ago', score: 17, body: 'You can also bind the console key in the hotkey settings if tilde is unavailable on your keyboard layout.' },
      { author: 'carry_curious', age: '2 hours ago', score: 9, body: 'Commands need the right lobby permissions; spectators may not be able to use economy commands.' },
      { author: 'AZERTY_survivor', age: '90 min. ago', score: 7, body: 'On AZERTY I use ² instead of tilde—took me forever to find that in settings.' },
      { author: 'host_not_me', age: '1 hour ago', score: 5, body: 'If you are not the lobby host, ask them to tick “enable cheats” before you spam commands.' },
      { author: 'tilde_or_bust', age: '40 min. ago', score: 3, body: 'Restart the game after toggling the console option—mine did not show until a full relaunch.' },
      { author: 'QWERTZ_pain', age: '25 min. ago', score: 4, body: 'German QWERTZ—console key lives under different label in Advanced. Not always “tilde”.' },
      { author: 'custom_only', age: '12 min. ago', score: 2, body: 'Official matchmaking still has no console cheats. Custom lobby only—worth stating again.' },
    ],
  },
  {
    slug: 'dayz-high-ground-practice', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'What is the safest way to practice high-ground spots?',
    excerpt: 'Use community or a low-pop test server with ESP to study sight lines, then fight without staring at overlays.',
    author: 'HighGroundEnjoyer', age: '6 hours ago', commentsCount: 7, upvotes: 64, flair: 'Discussion',
    sourceTitle: 'DayZ community tips for aimbot and ESP practice', sourcePath: '/blog/dayz-aimbot-esp-tips/',
    body: ['Practice in community or a low-pop test server. Enable ESP boxes briefly to inspect high-ground angles and loot positions, then fight with overlays minimized.', 'Repeat the same town clear a few times so sight lines stick without waiting for a full PvP match.'],
    comments: [
      { author: 'stack_and_pull', age: '5 hours ago', score: 13, body: 'I peek with ESP on, then disable boxes and re-check the same angle. Helps for high-ground coverage.' },
      { author: 'map_reader', age: '4 hours ago', score: 6, body: 'Replaying the same town path in community beats learning only in PvP.' },
      { author: 'Gorka_hill', age: '3 hours ago', score: 5, body: 'Gorka apartments taught me more than any NWAF snipe—tighter angles, less ego.' },
      { author: 'HighGroundEnjoyer', age: '2 hours ago', score: 3, body: 'Second pass without ESP is key. First pass is study, second is memory.' },
      { author: 'duo_stack_dz', age: '90 min. ago', score: 4, body: 'Duo: one calls angles, other fights bare. Weird drill but it works.' },
      { author: 'rain_fights', age: '1 hour ago', score: 2, body: 'Rain kills visibility—practice high ground in clear weather first or you learn wrong.' },
      { author: 'SniperHill_ref', age: '45 min. ago', score: 5, body: 'Electro hill meme aside, any elevated rock with tree cover is enough for drills.' },
    ],
  },
  {
    slug: 'dayz-patch-day-tips', category: 'Patch Talk', categoryTone: 'orange',
    title: 'What should I check before playing after a DayZ patch?',
    excerpt: 'The patch-day checklist recommends checking build status, updating, and testing in a low-pop test server before queueing.',
    author: 'PatchDayPete', age: '9 hours ago', commentsCount: 7, upvotes: 42, flair: 'Patch Talk',
    sourceTitle: 'BattlEye patch day checklist', sourcePath: '/blog/dayz-battleye-patch/',
    body: ['Check the current build/status notice first. After a game update, wait for a compatible build, update the loader, then verify the setup in a bot or hardcore lobby before returning to PvP.', 'If anything behaves unexpectedly, stop and review the status notes rather than assuming the old setup still applies. The checklist covers the patch-day routine in more detail.'],
    comments: [
      { author: 'farm_pattern', age: '8 hours ago', score: 12, body: 'Testing after the update before PvP is the part I used to skip. Now I check the build note and run a quick low-pop test server.' },
      { author: 'BattlEyeNights', age: '7 hours ago', score: 7, body: 'Agree. If the build/status has not caught up, wait. A checklist is better than guessing.' },
      { author: 'PatchDayPete', age: '6 hours ago', score: 4, body: 'Also verify Steam actually finished updating DayZ—partial download fooled me once.' },
      { author: 'loader_version', age: '5 hours ago', score: 5, body: 'Portal showed new loader before Discord announced. Refresh portal before panic.' },
      { author: 'one_module', age: '4 hours ago', score: 3, body: 'Test one module at a time post-patch. All-on caused false “broken” reports in our squad.' },
      { author: 'status_checker', age: '3 hours ago', score: 6, body: 'Red banner = stop. Not “maybe works”. Lost an account ignoring that years ago elsewhere.' },
      { author: 'friday_patch', age: '2 hours ago', score: 2, body: 'Friday patches = wait until Saturday community test for me. Less BE chaos.' },
    ],
  },
  {
    slug: 'dayz-lite-pro-aimbot', category: 'Community', categoryTone: 'green',
    title: 'Lite or Pro: which tier includes player aimbot?',
    excerpt: 'Our comparison guide breaks down the difference: Lite focuses on vision tools; Pro adds script modules.',
    author: 'LiteOrProDebater', age: '12 hours ago', commentsCount: 7, upvotes: 31, flair: 'Question',
    sourceTitle: 'DayZ Lite vs Pro: feature comparison', sourcePath: '/blog/dayz-lite-vs-pro/',
    body: ['According to the comparison guide, Lite centers on map awareness features such as player ESP, military loot and food information, zoom, and stream-proof options. Pro includes those features and adds player aimbot such as Aimbot, Smooth Aim, Silent aim, Bone Priority, and Hotkey macros.', 'The best fit depends on which features you need. Read the full comparison before choosing.'],
    comments: [
      { author: 'one_more_game', age: '10 hours ago', score: 10, body: 'The comparison page is useful because it shows which modules are included in each tier instead of only listing headlines.' },
      { author: 'ESP_only_guy', age: '9 hours ago', score: 6, body: 'Lite has zero aimbot. People keep asking in Discord—link this thread.' },
      { author: 'LiteOrProDebater', age: '8 hours ago', score: 3, body: 'Pro silent aim is what I wanted. Lite was step one for map learning.' },
      { author: 'macro_user', age: '7 hours ago', score: 4, body: 'Hotkey macros are Pro too—not just aimbot. Check module list before buying.' },
      { author: 'upgrade_path', age: '6 hours ago', score: 5, body: 'Portal upgrade charged difference only. No second full purchase.' },
      { author: 'hardcore_creep', age: '5 hours ago', score: 2, body: 'HC player on Lite forever. Pro aimbot draws reports faster on HC in my experience.' },
      { author: 'TierShopper', age: '4 hours ago', score: 4, body: 'Comparison guide + product compare table = same info, pick whichever you read easier.' },
    ],
  },
  {
    slug: 'dayz-aim-practice', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'How can I practice weapon aim without waiting for a real match?',
    excerpt: 'Create a community island or low-pop test server and drill AR, SMG, and shotgun profiles with repeatable resets.',
    author: 'IronsightIRL', age: '1 day ago', commentsCount: 7, upvotes: 27, flair: 'Discussion',
    sourceTitle: 'DayZ community practice guide: aim drills before PvP', sourcePath: '/blog/dayz-cheat-codes/',
    body: ['Create a community island or low-pop test server. Practice one weapon profile at a time—AR, SMG, then shotgun—and reset between attempts.', 'For realistic timing, use your PvP smoothness values in community before enabling aimbot in live games. The linked guide covers the full practice workflow.'],
    comments: [
      { author: 'mid_or_feed', age: '20 hours ago', score: 10, body: 'Start with a bot target and repeat the same spray until the tracking feels automatic.' },
      { author: 'ancient_archivist', age: '18 hours ago', score: 5, body: 'Keep PvP presets conservative—community can hide how snappy your aim looks in replays.' },
      { author: 'IronsightIRL', age: '16 hours ago', score: 3, body: 'Shotgun third in my order—AR and SMG first. Pellet drop surprised me in live.' },
      { author: 'TrainingGroundDZ', age: '14 hours ago', score: 4, body: 'Same island, same time of day = comparable reps. Night vs day changes feel.' },
      { author: 'pos4_roamer', age: '12 hours ago', score: 6, body: 'Copy smoothness from community to live only after 20 clean mag dumps. My rule.' },
      { author: 'lag_spike_city', age: '10 hours ago', score: 2, body: 'If community stutters, fix FPS first. Practicing on 40fps teaches bad habits.' },
      { author: 'one_rifle_week', age: '8 hours ago', score: 5, body: 'SKS week still best advice in this thread. Slow gun teaches patience.' },
    ],
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}

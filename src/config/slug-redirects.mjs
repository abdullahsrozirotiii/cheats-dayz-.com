/** Old → new URL slugs (301 targets). Image filenames stay on legacy names. */

export const BLOG_SLUG_REDIRECTS = {
  'dayz-cheat-codes-guide': 'dayz-cheat-codes',
  'dayz-console-cheats-tips': 'dayz-aimbot-esp-tips',
  'how-to-use-dayz-cheat-codes': 'dayz-cheats-practice',
  'dayz-cheats-features-guide': 'dayz-cheats-features',
  'dayz-console-commands-cheats': 'dayz-practice-vs-cheats',
  'dayz-elite-tier-guide': 'dayz-elite-cheats',
  'dayz-aimbot-pvp-guide': 'dayz-aimbot-guide',
  'dayz-esp-wallhack-setup': 'dayz-esp-wallhack',
  'dayz-radar-hack-guide': 'dayz-radar-hack',
  'dayz-clothing-changer-guide': 'dayz-skin-changer',
  'be-patch-day-checklist': 'dayz-battleye-patch',
  'dayz-hwid-spoofer-after-ban': 'dayz-hwid-spoofer',
  'how-to-buy-dayz-cheats-2026': 'buy-dayz-cheats',
  'dayz-aimbot-combat-guide': 'dayz-aimbot-weapons',
  'battleye-bypass-dayz-guide': 'dayz-battleye-verify',
  'dayz-external-cheat-guide': 'dayz-external-cheats',
  'dayz-stream-proof-setup': 'dayz-stream-proof',
};

export const FORUM_SLUG_REDIRECTS = {
  'can-custom-lobby-cheat-codes-be-used-in-PvP': 'dayz-cheat-codes-pvp',
  'can-custom-lobby-cheat-codes-be-used-in-pvp': 'dayz-cheat-codes-pvp',
  'how-to-enable-the-dayz-console': 'dayz-console-setup',
  'practice-dayz-high-ground-safely': 'dayz-high-ground-practice',
  'what-to-check-after-a-dayz-patch': 'dayz-patch-day-tips',
  'dayz-lite-or-pro-aimbot': 'dayz-lite-pro-aimbot',
  'how-to-learn-weapon-aim-in-community': 'dayz-aim-practice',
  'what-does-dayz-map-awareness-include': 'dayz-map-awareness',
  'how-to-set-up-map-overlay': 'dayz-esp-overlay',
  'what-zoom-settings-are-comfortable': 'dayz-radar-zoom',
  'how-to-tune-script-delay-settings': 'dayz-aimbot-delay',
  'how-to-practice-auto-combos': 'dayz-aimbot-practice',
  'what-is-in-the-elite-tier': 'dayz-elite-tier',
  'how-do-lite-and-pro-differ': 'dayz-lite-pro-diff',
  'what-to-know-about-skin-changer': 'dayz-skin-changer-faq',
  'what-to-do-if-battleye-cannot-verify': 'dayz-battleye-verify-error',
  'how-does-an-external-loader-work': 'dayz-external-loader',
  'how-to-check-stream-proof-capture': 'dayz-stream-proof-obs',
  'what-to-do-after-hwid-change': 'dayz-hwid-reset',
  'what-to-check-before-installing-tools': 'dayz-install-checklist',
  'how-to-choose-dayz-product-tier': 'choose-dayz-cheat-tier',
};

export const PRODUCT_SLUG_REDIRECTS = {
  'unlock-all': 'skin-changer',
};

/** @param {Record<string, string>} map @param {string} prefix */
function pathRedirects(map, prefix) {
  const out = {};
  for (const [oldSlug, newSlug] of Object.entries(map)) {
    if (oldSlug === newSlug) continue;
    out[`${prefix}${oldSlug}/`] = `${prefix}${newSlug}/`;
  }
  return out;
}

export function buildSlugRedirectMap() {
  return {
    ...pathRedirects(BLOG_SLUG_REDIRECTS, '/blog/'),
    ...pathRedirects(FORUM_SLUG_REDIRECTS, '/forum/'),
    ...pathRedirects(PRODUCT_SLUG_REDIRECTS, '/products/dayz-cheats/'),
  };
}

/** Netlify-style lines: /from/ /to/ 301 */
export function netlifyRedirectLines() {
  const lines = [];
  const map = buildSlugRedirectMap();
  for (const [from, to] of Object.entries(map)) {
    const fromNoSlash = from.replace(/\/$/, '');
    lines.push(`${fromNoSlash} ${to} 301`);
    lines.push(`${from} ${to} 301`);
  }
  return lines;
}

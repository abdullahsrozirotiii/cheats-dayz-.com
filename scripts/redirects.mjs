import { buildSlugRedirectMap } from '../src/config/slug-redirects.mjs';

/** Static path redirects (301). Keys are pathname without query/hash. */
const BASE_REDIRECTS = [
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/dayz-cheats/'],
  ['/cheats/', '/products/dayz-cheats/'],
  ['/cheats/lite', '/products/dayz-cheats/lite/'],
  ['/cheats/lite/', '/products/dayz-cheats/lite/'],
  ['/cheats/pro', '/products/dayz-cheats/pro/'],
  ['/cheats/pro/', '/products/dayz-cheats/pro/'],
  ['/cheats/elite', '/products/dayz-cheats/elite/'],
  ['/cheats/elite/', '/products/dayz-cheats/elite/'],
  ['/cheats/compare', '/blog/dayz-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/dayz-lite-vs-pro/'],
  ['/products/dayz-cheats/utilities', '/products/dayz-cheats/utilities/'],
  ['/products/dayz-cheats', '/products/dayz-cheats/'],
  ['/products/dayz-cheats/account-recovery', '/products/dayz-cheats/ugc/'],
  ['/products/dayz-cheats/account-recovery/', '/products/dayz-cheats/ugc/'],
  ['/products/dota-2-cheats', '/products/dayz-cheats/'],
  ['/products/dota-2-cheats/', '/products/dayz-cheats/'],
  ['/products/dota-2-cheats/elite', '/products/dayz-cheats/elite/'],
  ['/products/dota-2-cheats/elite/', '/products/dayz-cheats/elite/'],
  ['/products/dota-2-cheats/utilities', '/products/dayz-cheats/utilities/'],
  ['/products/dota-2-cheats/utilities/', '/products/dayz-cheats/utilities/'],
  ['/products/fortnite-cheats', '/products/dayz-cheats/'],
  ['/products/fortnite-cheats/', '/products/dayz-cheats/'],
  ['/products/fortnite-cheats/elite', '/products/dayz-cheats/elite/'],
  ['/products/fortnite-cheats/elite/', '/products/dayz-cheats/elite/'],
  ['/products/fortnite-cheats/utilities', '/products/dayz-cheats/utilities/'],
  ['/products/fortnite-cheats/utilities/', '/products/dayz-cheats/utilities/'],
];

const slugPairs = [];
for (const [from, to] of Object.entries(buildSlugRedirectMap())) {
  slugPairs.push([from.replace(/\/$/, ''), to]);
  slugPairs.push([from, to]);
}

export const PATH_REDIRECTS = new Map([...BASE_REDIRECTS, ...slugPairs]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}

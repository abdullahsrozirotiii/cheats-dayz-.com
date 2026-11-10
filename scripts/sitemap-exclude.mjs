/**
 * Paths excluded from XML sitemaps (redirect stubs or legacy games).
 * Keep in sync with astro.config redirects and public/_redirects.
 */
export const SITEMAP_EXCLUDED_PREFIXES = [
  '/cheats/',
  '/contact/',
  '/products/fortnite-cheats/',
  '/products/dota-2-cheats/',
];

/** @param {string} pathname */
export function isExcludedSitemapPath(pathname) {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path = `${path}/`;
  if (path.includes('/404') || path.startsWith('/go/')) return true;
  return SITEMAP_EXCLUDED_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix));
}

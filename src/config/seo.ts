import { t } from '../i18n';
import { SITE_DOMAIN as INDEXNOW_HOST_NAME } from './site';
import { getPageSeoEntry } from './pageSeo';

export const SITE_ORIGIN = `https://${t.site.domain}`;

export const DEFAULT_OG_IMAGE = '/images/gameplay/dayz-esp-wallhack.png';

/** Organization / publisher logo (PNG wordmark). */
export const BRAND_LOGO_PATH = '/images/dayz-brand-logo.png';

export const GA_MEASUREMENT_ID =
  (import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined)?.trim() || 'G-SH23H1DDZ3';

/** @example @dayzcheats */
export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

/** Comma-separated profile URLs (X, YouTube, etc.) for Organization sameAs. */
export function getOrganizationSameAs(): string[] {
  const raw = import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined;
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

/** Meta descriptions: aim for 120–155 characters (audit hard cap ~160). */
export function clampMetaDescription(text: string, maxLen = 155): string {
  const trimmed = text.trim().replace(/\s+/g, ' ');
  if (trimmed.length <= maxLen) return trimmed;
  const slice = trimmed.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > 80 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trimEnd()}…`;
}

export function canonicalUrl(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function resolvePageSeo(pathname: string): { title: string; description: string } {
  const entry = getPageSeoEntry(pathname);
  if (entry) return entry;
  return { title: t.site.title, description: t.site.description };
}

export function pageTitle(keyword: string, brand = t.site.name): string {
  const suffix = ` | ${brand}`;
  const max = 60;
  if (`${keyword}${suffix}`.length <= max) return `${keyword}${suffix}`;
  const trimmed = keyword.slice(0, Math.max(20, max - suffix.length - 1)).trim();
  return `${trimmed}${suffix}`;
}

/** Keep meta descriptions blunt about DayZ cheats for SERP snippets. */
export function cheatMetaDescription(text: string): string {
  const trimmed = text.trim();
  if (/dayz\s*cheat/i.test(trimmed)) return trimmed;
  return `DayZ cheats guide: ${trimmed}`;
}

export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const RSS_FEED_PATH = '/rss.xml';

/** Used by IndexNow postbuild script. */
export const INDEXNOW_HOST = INDEXNOW_HOST_NAME;

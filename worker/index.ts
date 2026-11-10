const CANONICAL_HOST = 'cheats-dayz.com';

/** Hostnames that should 301 to the apex custom domain. */
const REDIRECT_TO_APEX = new Set([
  `www.${CANONICAL_HOST}`,
  'cheatsdayz.com',
  'www.cheatsdayz.com',
]);

/**
 * Serves static assets from dist/ (via ASSETS binding).
 * Canonical host: cheats-dayz.com (www / legacy hosts redirect here).
 */
export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    const needsHttps = url.protocol === 'http:';
    const needsHostRedirect = REDIRECT_TO_APEX.has(host);

    if (needsHttps || needsHostRedirect) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    const pathname = url.pathname;
    if (/\/[^/]+\.[a-z0-9]{2,5}\/$/i.test(pathname)) {
      url.pathname = pathname.replace(/\/$/, '');
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // Indexing is controlled by each page's <meta name="robots"> and canonical URL.
    // Do not set X-Robots-Tag here — conflicting noindex headers break SEO audits and
    // override meta robots on *.workers.dev preview hosts.
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

const CANONICAL_HOST = 'cheatsdayz.com';

/**
 * Serves static assets from dist/ (via ASSETS binding).
 * Redirects www → apex so SEO stays on one host (path redirects live in dist/_redirects).
 */
export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    const needsHttps = url.protocol === 'http:';
    const needsWwwStrip = host === `www.${CANONICAL_HOST}`;

    if (needsHttps || needsWwwStrip) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

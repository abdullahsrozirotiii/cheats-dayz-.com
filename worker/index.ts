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

    const response = await env.ASSETS.fetch(request);

    if (host.endsWith('.workers.dev')) {
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex, nofollow');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  },
} satisfies ExportedHandler<Env>;

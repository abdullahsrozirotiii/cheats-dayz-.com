import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';

/** Astro `trailingSlash: 'always'` must not apply to static files (e.g. `.webp/` → 404). */
const TRAILING_SLASH_ON_FILE = /\/[^/]+\.[a-z0-9]{2,5}\/$/i;

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  if (TRAILING_SLASH_ON_FILE.test(url.pathname)) {
    url.pathname = url.pathname.replace(/\/$/, '');
    return Response.redirect(url.toString(), 308);
  }
  const destination = resolveCheckoutPathRedirect(url.pathname);
  if (destination) {
    return context.redirect(destination, 302);
  }
  return next();
});

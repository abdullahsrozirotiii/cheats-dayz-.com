import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { isExcludedSitemapPath } from './scripts/sitemap-exclude.mjs';
import { buildSlugRedirectMap } from './src/config/slug-redirects.mjs';

export default defineConfig({
  site: 'https://cheats-dayz.com',
  trailingSlash: 'always',
  redirects: {
    ...buildSlugRedirectMap(),
    '/cheats/': '/products/dayz-cheats/',
    '/cheats/lite/': '/products/dayz-cheats/lite/',
    '/cheats/pro/': '/products/dayz-cheats/pro/',
    '/cheats/elite/': '/products/dayz-cheats/elite/',
    '/cheats/compare/': '/blog/dayz-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/dayz-cheats/',
    '/products/dota-2-cheats/elite/': '/products/dayz-cheats/elite/',
    '/products/dota-2-cheats/utilities/': '/products/dayz-cheats/utilities/',
    '/products/fortnite-cheats/': '/products/dayz-cheats/',
    '/products/fortnite-cheats/elite/': '/products/dayz-cheats/elite/',
    '/products/fortnite-cheats/utilities/': '/products/dayz-cheats/utilities/',
    '/contact/': '/support/',
    '/products/dayz-cheats/account-recovery/': '/products/dayz-cheats/ugc/',
  },
  compressHTML: true,
  prefetch: false,
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => {
        if (page.includes('/404') || page.includes('/go/')) return false;
        try {
          const pathname = new URL(page, 'https://cheats-dayz.com').pathname;
          return !isExcludedSitemapPath(pathname);
        } catch {
          return false;
        }
      },
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    // Large Tailwind bundles parse faster as a cached CSS file than 200KB+ inline in HTML.
    inlineStylesheets: 'auto',
  },
});

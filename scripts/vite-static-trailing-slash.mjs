/** Dev: `trailingSlash: 'always'` must not rewrite public assets to `file.webp/` (404). */
const TRAILING_SLASH_ON_FILE = /^(\/[^?]*\.[a-z0-9]{2,5})\/(\?.*)?$/i;

export function viteStaticTrailingSlash() {
  return {
    name: 'vite-static-trailing-slash',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const raw = req.url ?? '/';
        const m = raw.match(TRAILING_SLASH_ON_FILE);
        if (m) {
          req.url = m[2] ? `${m[1]}${m[2]}` : m[1];
        }
        next();
      });
    },
  };
}

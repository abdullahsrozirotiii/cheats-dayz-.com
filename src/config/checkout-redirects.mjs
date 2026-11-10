const ZADEYO_AFFILIATE = 'https://zadeyo.com/go/ABDULLAH';

/** Checkout destinations keyed by internal product id (Zadeyo affiliate). */
export const CHECKOUT_URLS = {
  dayz: `${ZADEYO_AFFILIATE}?to=%2Fproducts%2Fdayz`,
  skinChanger: `${ZADEYO_AFFILIATE}?to=%2Fproducts%2Fskin-changer`,
  hwidSpoofer: `${ZADEYO_AFFILIATE}?to=%2Fproducts%2Fhwid-spoofer`,
  ugc: `${ZADEYO_AFFILIATE}?to=%2Fproducts%2Fugc`,
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/dayz', CHECKOUT_URLS.dayz],
  ['/go/dayz/', CHECKOUT_URLS.dayz],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
  ['/go/fortnite', CHECKOUT_URLS.dayz],
  ['/go/fortnite/', CHECKOUT_URLS.dayz],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}

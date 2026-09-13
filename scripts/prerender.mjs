// Post-build prerender step.
//
// react-helmet-async only ever touches the live DOM after React hydrates —
// it cannot change the HTML the server actually sends. Verified live
// 2026-09-13: `curl -A "Googlebot" https://in-sync.co.in/products/worksync`
// returned the generic homepage <title> and no canonical tag at all, even
// though the same URL in a real browser showed the correct self-referencing
// tags. Every route was served the identical dist/index.html (see
// dist/_redirects: `/*  /index.html  200`), so Google/Ads-crawler-visible
// SEO tags were either wrong (before the SEOHelmet fix) or simply absent
// (after it, since the static tags were removed and nothing replaced them
// server-side).
//
// This script runs after `vite build`: serves the built dist/ locally,
// visits each real route in a headless browser so SEOHelmet has injected
// its per-route tags, captures the fully-rendered HTML, and writes it to
// dist/<route>.html (flat file, NOT dist/<route>/index.html). Cloudflare
// Pages serves an exact static file match before falling back to
// _redirects' wildcard rule, so each of these routes now serves REAL
// per-route tags directly, no JS execution required. React still hydrates
// over this HTML for real visitors exactly as before — this only changes
// what's in the initial HTML payload, not the app.
//
// Flat filename matters: writing dist/products/worksync/index.html made
// Cloudflare Pages 308-redirect the canonical URL (/products/worksync,
// no trailing slash — the one in every canonical tag, Ads URL, and
// internal link) to /products/worksync/ before serving content. That's a
// canonical pointing at a URL that immediately redirects away from
// itself, which Google explicitly flags as a bad signal. Verified live
// 2026-09-13: `curl -A Googlebot https://in-sync.co.in/products/worksync`
// returned a bare 308 with no body; only -L (follow redirects) showed the
// tags. Naming the file dist/products/worksync.html instead makes
// Cloudflare Pages match it directly with no redirect at all.
import { preview } from 'vite';
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

// Every route with its own <SEOHelmet> config today (2026-09-13) — home/
// features/pricing/industries/resources/solutions plus all 10 product pages.
// Add a route here the same day it gets its own SEOHelmet config, or it
// keeps serving the generic dist/index.html shell to crawlers.
const ROUTES = [
  '/',
  '/features',
  '/pricing',
  '/industries',
  '/resources',
  '/solutions',
  '/products/worksync',
  '/products/crm',
  '/products/ats',
  '/products/expense',
  '/products/field-sync',
  '/products/vendor-verification',
  '/products/eventsync',
  '/products/email-broadcast',
  '/products/whatsapp-campaigns',
  '/products/paisaa-saarthi',
];

async function main() {
  const server = await preview({ preview: { port: 4173, strictPort: true }, build: { outDir: 'dist' } });
  const base = server.resolvedUrls?.local?.[0] || 'http://localhost:4173/';

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Ad/analytics loaders (gtag.js, GTM, Meta Pixel) run real tracking code
  // once fetched — including Google Ads' conversion-linker logic, which
  // dynamically creates a viewthroughconversion <script> pixel tag with
  // this specific page load's URL, UA fingerprint, and a random id baked
  // into its query string. page.content() captures whatever's in the DOM
  // at that moment, so an unblocked crawl bakes a one-off pixel pointing
  // at localhost:4173 and a HeadlessChrome UA into the static file every
  // real visitor then loads — corrupting live conversion data. Verified
  // live 2026-09-13: the first deploy's dist/products/worksync.html
  // contained a frozen googleads.g.doubleclick.net script with
  // `url=http://localhost:4173/products/worksync` hardcoded in it.
  // Blocking these domains keeps SEOHelmet's tags (unrelated to any of
  // this) intact while preventing the loaders from ever executing during
  // the local capture. Real visitors still get real tracking — nothing
  // here touches the app itself, only what this script captures.
  // cdn.razorpay.com's embed button is the same problem from a different
  // vendor: it renders a live iframe with `referrer=` set to the current
  // page URL, which was localhost during the capture. Blocked for the
  // same reason — real visitors still get it live via hydration.
  await page.route(
    /doubleclick\.net|googletagmanager\.com|google-analytics\.com|googleadservices\.com|googlesyndication\.com|connect\.facebook\.net|clarity\.ms|cdn\.razorpay\.com/i,
    (route) => route.abort(),
  );

  let failed = 0;
  for (const route of ROUTES) {
    try {
      const url = new URL(route, base).toString();
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Small settle window for SEOHelmet's effect + any late-mounted content.
      await page.waitForTimeout(300);

      // Product pages reveal stats/sections via IntersectionObserver
      // (framer-motion's useInView) and count up numbers with a ~1200ms
      // setInterval once triggered. A capture with no scroll never fires
      // those observers for below-the-fold content, so counters freeze at
      // their initial 0 (or, depending on exact timing, some other
      // in-progress value) in the static HTML every visitor then loads
      // first. Verified live 2026-09-13: production was serving "12%
      // Uptime" — a mid-animation freeze-frame, not the real 99.9% target.
      // Scrolling to the bottom fires every observer on the page; the
      // wait after lets each counter's animation actually finish before
      // page.content() captures it.
      //
      // `behavior: 'instant'` is load-bearing, not decoration: this site's
      // CSS sets `html { scroll-behavior: smooth }`, which hijacks every
      // scrollBy/scrollTo call (including the legacy 2-arg form) into an
      // animated scroll unless explicitly overridden. Under CI's slower
      // rendering, repeated smooth-scroll calls every 50ms compounded
      // into scrolling that never caught up to its target — the build
      // step hung for 18+ minutes before this fix (two deploys, verified
      // live 2026-09-13). A hard iteration cap is a second, independent
      // backstop in case scrollHeight itself changes under us mid-loop.
      await page.evaluate(async () => {
        const step = 600;
        const delay = 30;
        const maxIterations = 200;
        for (let i = 0; i < maxIterations; i++) {
          const max = document.body.scrollHeight - window.innerHeight;
          if (window.scrollY >= max) break;
          window.scrollTo({ top: Math.min(window.scrollY + step, max), behavior: 'instant' });
          await new Promise((r) => setTimeout(r, delay));
        }
      });
      await page.waitForTimeout(1500);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));

      const canonical = await page.$eval('link[rel="canonical"]', (el) => el.href).catch(() => null);
      if (!canonical || !canonical.endsWith(route === '/' ? '/' : route)) {
        console.error(`[prerender] WRONG or MISSING canonical for ${route}: ${canonical}`);
        failed++;
        continue;
      }

      const html = '<!doctype html>\n' + (await page.content());
      const outFile = route === '/' ? path.join('dist', 'index.html') : path.join('dist', `${route}.html`);
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, html, 'utf8');
      console.log(`[prerender] ${route} -> ${outFile} (canonical: ${canonical})`);
    } catch (e) {
      console.error(`[prerender] FAILED ${route}:`, e instanceof Error ? e.message : String(e));
      failed++;
    }
  }

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));

  if (failed > 0) {
    console.error(`[prerender] ${failed} route(s) failed or produced a wrong canonical — failing the build.`);
    process.exit(1);
  }
  console.log(`[prerender] done, ${ROUTES.length} routes prerendered.`);
}

main().catch((e) => {
  console.error('[prerender] fatal:', e);
  process.exit(1);
});

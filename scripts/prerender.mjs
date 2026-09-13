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

  let failed = 0;
  for (const route of ROUTES) {
    try {
      const url = new URL(route, base).toString();
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Small settle window for SEOHelmet's effect + any late-mounted content.
      await page.waitForTimeout(300);

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

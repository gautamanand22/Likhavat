<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Likhavat Printing Press — Website

Static-export Next.js site (`output: "export"` → `out/`) for a printing press
on Boring Road, Patna (visiting cards, wedding cards, flex, letterheads,
prescription pads, bill books, brochures, bags, t-shirts).

## Architecture (mirrors OSSBC / abhinandene-tour)

- `content/` — **single source of truth** for all copy & data. Edit here to
  change the site: `business.ts` (NAP/identity), `products.ts` (catalogue,
  specs, demo rates), `services.ts` (SEO landing hubs), `testimonials.ts`,
  `faqs.ts`, `i18n.ts` (EN/HI dictionary).
- `app/[slug]/` — one template renders every service hub as a landing page
  (auto sitemap + JSON-LD). Add a service = add an object in `services.ts`.
- `components/sections/` — homepage sections; `components/ui/Motion.tsx` wraps
  framer-motion (LazyMotion + whileInView reveals).
- `components/sections/PrintShowcase.tsx` — the signature pinned scroll section:
  a visiting card assembles from its CMYK plates as you scroll (desktop);
  static stage cards on mobile / reduced motion.
- All CTAs deep-link to WhatsApp via `lib/whatsapp.ts` with pre-filled messages.
- Images live in `public/images/products/` as `<name>.jpg` + `<name>-sm.jpg`
  (640px) pairs consumed by `components/ui/Photo.tsx` srcsets. Sources &
  licences in `IMAGE-CREDITS.md`.

## Deployment & SEO

- Deploys via `.github/workflows/deploy.yml` → GitHub Pages (Actions source)
  at https://likhavatprintingpress.com (custom domain in repo Pages settings;
  `public/CNAME` + `.nojekyll` ship in the export as safety nets).
- SEO surface: sitemap/robots (AI crawlers explicitly allowed) + JSON-LD
  (LocalBusiness with OfferCatalog & Bihar-city areaServed, Service, FAQ,
  Breadcrumb) + `public/llms.txt` for answer engines + geo meta + manifest.
- After adding the site to Google Search Console, paste the verification
  token into `googleSiteVerification` in `content/business.ts`.

## Before launch

- Confirm rates in `content/products.ts` + `services.ts` (indicative 2025-26
  Patna market values from research).
- Confirm email, GSTIN, foundedYear/stats; swap demo testimonials for real
  Google reviews.

## Commands

- `npm run dev` / `npm run build` (emits static `out/`) / `npm run lint`

# CHECKPOINT — Aurelius Athletics storefront rebuild

Date: 2026-09-10. Repo: https://github.com/DEVuttkarsh12/athletics (branch `main`).
Resume rule: read this file, then `index.html` → `styles.css` → `app.js`. All state below is current.

## What this is
Full revamp concept of https://aureliusathletics.com/ (men's physique stage board shorts:
Thunder Wave Pink/Blue, Eclipse Red/Black, Rs. 7,800, 4x Olympia Jeremy Buendia).
Static site, no build step. CDN deps: GSAP 3.12.5 + ScrollTrigger, Lenis smooth scroll, Google Fonts.

## Run / verify
- Serve: `python3 -m http.server 8000` in this dir → http://localhost:8000/
- JS check: `node --check app.js`
- Live page check: `curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/`

## File map
- `index.html` — loader, nav+announce, menu overlay, search, cart drawer, hero (grid + figure),
  marquee, drop+countdown, rule strip, statement, series h-scroll, shop grid, perks, craft,
  athlete, reviews, FAQ, access (backstage ticket), footer, quiz + size modals.
- `styles.css` — tokens + all components. Themed in appended passes at EOF:
  ENERGY → FLAGSHIP → CRIMSON & IVORY → REPAIR → HEAVYWEIGHT → ROUND 6/7/8/9/10/11/12.
  Later rules win; base rules above may look stale — check EOF first.
- `app.js` — Lenis, cursor, loader (eased 000→100 + giant fill + layered wipe), hero intro,
  particles, cart, products render/filter, countdown, quiz engine, size modal, FAQ accordion,
  look switcher, scroll animations (scrubs, batches, pin), tilt/magnetic, toast.

## Design system (final)
- Theme: crimson & ivory. `--volt:#C8102E`, `--gold-2:#8E0C1A`, bg `#F5F0E6`, ink `#1C1510`,
  oxblood moments (athlete gradient, footer `#2B060B`, red menu overlay).
- Type: Anton (display), Archivo Black (accents, uppercase, -6° skew), Archivo (body).
  No serif anywhere (Instrument Serif fully removed).
- Signature pieces: epic loader (fill wordmark + curtains + blur landing), arch→rect hero
  figure (crimson plate, ring, crop ticks, LOOK caption + working 3-look switcher + arrows),
  pinned horizontal series, scrub-ignited statement, backstage-pass ticket (flat, ink offset),
  fit-quiz modal, size-guide modal, prep-desk FAQ, federation rule strip.
- ROUND 13 direction (client): spacious over congested — roomy section padding/gaps, tall
  product media (520px), hero side-rails removed, serie cards deep-link into filtered shop,
  fabric spec line on every product card.
- ROUND 14: air max (10rem section heads, contained 1440px grids, taller product media 600px
  + hover zoom) + product obsession (announce bar → shop, hero price button flash-scrolls to
  the exact product card, look switcher carries product ids).

## Known quirks / watch-outs
- Edit tool sometimes misreports success/failure: ALWAYS re-grep after edits.
- GSAP `.from()` + ScrollTrigger: never target the same el twice (caused the vanishing headline bug).
- CSS-transform animations must not run on GSAP-transformed els (intro/parallax/tilt targets).
- `.fig-thumbs` switcher uses delegated clicks + `z-index:6`; opacity-only crossfade (safe vs scrub tweens).
- Duplicate-ID trap: only one `#spinBadge` may exist (visual badge kept, bottom bar deleted).
- Product images hotlink to aureliusathletics.com CDN (width=200/600/800/1000/1200 variants).

## Candidate next steps (user-flavored backlog)
- Real studio photography to replace CDN shots; lookbook/film modal.
- Checkout wiring (cart is front-end only).
- More looks per product; before/after stage lighting toggle.
- Quiz: add height/class question; persist result.
- A/B hero figure treatments; performance pass (image preloads, reduced motion).

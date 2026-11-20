# ev2 inner pages: section-by-section build plan

**Status:** Phase 1 DONE (19 Nov 2026): D1–D5 accepted as recommended. L1–L6, L9 (paths + robots) and L10 are applied. L7 was dropped: the new pill header reads on any background. L8 (`aria-current`) and the per-page canonical/`og:url` move to `build.mjs` in Phase 2 (needs `SITE_URL`). The nav's "How it Works" and "FAQ" were replaced by About and Contact; FAQ stays in the footer as `/#faq`. Inner heroes must carry `id="top"` (the footer logo links to `#top`).
**Phase 2 DONE (19 Nov 2026):** `node build.mjs` writes 11 routes + `404.html` from `content/pages.json`; `index.html` stays byte-identical. Image slots resolve through `content/images.json` (brief: `docs/image-prompts.md`). Markup uses the §1.2 class names, which get their CSS in Phase 3, so inner pages render mostly unstyled until then. The landing page (`index.html`, `style.css`, `script.js`) is the design source; every inner page reuses its parts.
**Phases 3–7 DONE (19 Nov 2026), client-ready:** inner-page CSS block at the end of `style.css` (tokens only, hover gated, phone CTA bar). Added: /chargers power ladder (log kW scale, stacks on phones), /partners sub-nav, /contact "What happens next" (PROPOSED copy), /about vision and mission set as type, sub-nav scroll-spy and card reveals in `script.js`. Fixed: Destination read 1–22 kW (the "1–2 guns" entry was parsed as power), and the phone CTA bar stuck to the top (the sub-nav's backdrop-filter trapped it). Checked at 1440 and 390: no overflow, no broken images, one h1 per page, no dead links or anchors, no forbidden copy, all 49 quote buttons open the right form, no console errors.

**Hero rework (20 Nov 2026):** inner photo heroes now reuse the homepage hero pattern (crumbs + title + CTAs on top, tagline + glass facts card at the foot, same overlay, weight-300 type, same reveal); the duplicate eyebrow is gone; hero chips became a non-clickable facts card; product heroes stay two-column down to 768px so the quote button is above the fold on tablets; the phone quote bar hides while the hero is on screen. 13 generated images live (heroes, DC bands, 5 segments).

**Deferred (not needed for the client demo):**
- /solutions pinned stage tracker; /partners model picker; partnership fieldset in the quote dialog + `data-partner`; `?quote=` deep link.
- `tests/qa.mjs` (Playwright) to replace the manual browser checks.
- Full audits with the fixing-accessibility, fixing-metadata, fixing-motion-performance and web-perf skills (contrast numbers, focus order in the dialog, LCP per page).
- `SITE_URL` canonical/`og:url`/JSON-LD on the real domain; drop `noindex` at launch.
- 14 image slots still to generate: par-opportunity, par-distributor, par-recurring, seg-public, scene-atom-ac-socket/-wallbox/-destination/-dc-fast, stage-1…6 (they show fallbacks; drop each file into `assets/img/gen/`, set `approved`, rebuild); Privacy/Terms legal text; the unlicensed GLB swap (§8).
**Content source:** `../envizon_ev/content/pages.json` (pages, the 4 Atom products, shared `stages` and `capabilities`) and `content/icons.json`. The rules come from `../envizon_ev/docs/inner-pages-plan.md`, `design-system.md` and `content-register.md`: no invented stats, prices, logos or testimonials; `BLOCKED` content is never rendered; `null` spec values show **"Confirmed per datasheet"**; standards read "designed to", never "certified".

---

## 0. Decisions (confirm before Phase 1)

| # | Decision | Recommendation | Why |
|---|---|---|---|
| D1 | How pages get built | **One zero-dependency `build.mjs`** (Node) that uses `index.html` as the shell (head, sprite, header, footer, dialog), swaps `<main>`, and renders each page from `content/pages.json` | 11 pages share one header, footer, dialog and sprite. Hand-copying them would drift on the first nav change. The 4 product pages are pure data. envizon_ev uses the same proven pattern (`build_pages.py`) |
| D2 | Where copy lives | Copy `pages.json` + `icons.json` into `ev2/content/` and keep ev2's copy authoritative from then on | Keeps ev2 self-contained. envizon_ev stays as the reference |
| D3 | Paths | All paths root-absolute (`/style.css`, `/assets/...`). `index.html` switches too; `build.mjs` maps `/assets/img/deck/x` → `/assets/img/x` | Pages live at `/chargers/atom-dc-fast/`, so relative paths would break. Note: this breaks if the site is ever hosted under a sub-path |
| D4 | Contact form | Keep **one** form (the quote dialog). /contact cards open it with a preset | One form to validate and wire to `POST /api/v1/leads` later. Alternative: render the same form inline on /contact (more code, one less click) |
| D5 | Homepage 5 steps vs the 6 stages on /solutions | Keep 5 on the homepage as the summary; /solutions and /partners show the 6 stages | Correction #13 in envizon_ev. Client to decide later |

**Skipped (not needed):** blog, projects, careers, city-SEO pages, a charger filter or compare *tool* (4 SKUs; a static compare table covers it), separate DC variant pages, a team/offices section (BLOCKED), and a station locator (BLOCKED).

---

## 1. Design system extracted from the landing page

Inner pages add **no new tokens**. Everything comes from `style.css :root` (greens 1–7, lime, `--pg-ink`, `--pg-line`, `--pg-ease`, Antique Legacy 100 for headings, Inter for body).

### 1.1 Primitives already on the landing page (reuse as-is)
| Primitive | Classes | Reused on |
|---|---|---|
| Two-tone heading | `h2` + `.accent` | every section |
| Section head with CTA | `.head-row` / `.center-head` | every section that has one CTA |
| Surfaces | `.block`, `.block.soft`, `.block.dark` | rhythm on every page: light → soft → dark → light |
| Primary knob button | `.btn-primary` + `.bp-*` | the one conversion CTA per section |
| Secondary buttons | `.btn-dark`, `.btn-ghost`, `.btn-glass`, `.btn-sm` | navigation CTAs (View specs, See models) |
| Editorial index rows | `.sol-list`, `.sol-row` (number, title, line, hover image, ↗) | partner opportunity, product use cases |
| Product picker | `.picker` tablist + `.pick` panels | partner models A/B/C |
| Horizontal timeline | `.timeline`, `.t-node` (line draws on reveal) | partner first 90 days |
| Bento | `.bento`, `.why`, `.why-lg`, `.why-mint`, `.why-wide` | product features, partner value, solution packages |
| Pinned chapters | `.scrolly` + `.sticky` + `.rail` + detail card + `.tour-count` | /solutions process tracker |
| Video band | `.partners` (bg video + glass CTA) | /partners closing band |
| Mini product card | `.hero-card` | related chargers, partner "what you'll sell" |
| FAQ | `.faq-grid`, `details`, `.faq-cta` | every FAQ (page-specific CTA card) |
| Closing CTA | `.footer .foot-cta` | every page: **per-page headline + preset** (replaces pages.json `cta` sections, so there's no double CTA band) |
| Quote dialog | `#quote` + `[data-quote]`, `[data-product]` | everywhere |
| Reveal | `.reveal` / `.in` via IntersectionObserver | everywhere |

### 1.2 New primitives (smallest set the inner pages need)
All of these go in one `/* Inner pages */` block in `style.css`, built only from existing tokens.

| New | What it is | Built from |
|---|---|---|
| `.page-hero` | Shorter hero (min 64vh, 52vh on phones): breadcrumb, `.ln` line-reveal H1, sub, two CTAs, media. Variants: `--photo` (full-bleed image + scrim, white text, like the homepage hero), `--product` (dark green-7, cut-out on the right, stats row), `--plain` (white, for legal) | `.hero`, `.hero-title .ln`, `.hero-foot` |
| `.crumbs` | Breadcrumb `Home / Chargers / Atom DC Fast` with `aria-label="Breadcrumb"` and `aria-current="page"`, plus BreadcrumbList JSON-LD | `--mint-muted` on dark, `--pg-muted` on light |
| `.stats` | 3 big numbers on the product hero (output · connector · protection), read from specs | `.pick-kw` type |
| `.subnav` | Sticky in-page nav under the header with scroll-spy (`aria-current="true"`) and a right-aligned `btn-sm` CTA. On phones it scrolls sideways, and its CTA becomes a fixed bottom bar | `.header` glass + `.btn-sm` |
| `.spec` | Grouped spec list: group name left, hairline rows right (`dl`). Null values render a `.verify` pill: "Confirmed per datasheet" | `--pg-line`, `.tour-specs` type |
| `.tbl` | A real `<table>` with `scope` headers for the DC variants, the capabilities table and the 4-model compare. Scrolls sideways inside its own box on phones | hairlines, `.why-k` labels |
| `.chips` | Pill links or tags (segments, recommended chargers, standards, KPIs) | `.pick-specs` |
| `.flow` | 3-step horizontal flow with arrows (revenue waterfall, contact "what happens next"). Stacks on phones | `.t-node` |
| `.callout` | One-paragraph note on mint (model D, terms agreed up front, quote inclusions) | `.why-mint` |
| `.prose` | Legal text column, 68ch | body type |

Icons: `build.mjs` copies only the 24 icon keys used in pages.json (`key, shield, card, plug, home, office, apartment, mall, pulse, protocol, hotel, bolt, depot, highway, tools, refresh, flow, support, trend, sliders, site, package, chat, mail`) from `icons.json` into the page sprite as `<symbol id="i-…">`, in the same stroke style as the landing sprite.

### 1.3 CTA modules (the conversion system)
Every CTA maps to a dialog preset (`GENERAL`, `PRODUCT_QUOTE`, `SITE_ASSESSMENT`, `FLEET`, `PARTNERSHIP`) or to a route. Rule: **at most one `.btn-primary` per section**; anything else is a secondary or a link.

| Module | Look | Action |
|---|---|---|
| M1 Hero pair | `.btn-primary` + `.btn-glass`/`.btn-ghost` | Primary opens the page's main preset; secondary scrolls to the key section |
| M2 Section CTA | `.head-row` right-side button | That section's preset (e.g. each solution segment's own `cta.type`) |
| M3 Card CTA | `.btn-sm` / text link with `→` | Product quote with `data-product`, or a route |
| M4 Sticky subnav CTA | `btn-sm` in `.subnav`, a fixed bottom bar on phones | Product pages: `PRODUCT_QUOTE` + `data-product`. Partners: `PARTNERSHIP` |
| M5 FAQ card | `.faq-cta` | Page-specific preset and copy |
| M6 Footer band | `.foot-cta` | Page headline from pages.json `cta` + preset |
| M7 Dialog | `#quote` | Title per preset. **Adds a `PARTNERSHIP` fieldset** (business name, partner type A–D, territory, property category, available space, electrical capacity), shown only for that preset, per blueprint §5.5 |

---

## 2. Landing-page fixes (do first; inner pages depend on them)

| # | Change | Where |
|---|---|---|
| L1 | Nav: Chargers dropdown → `/chargers/<slug>/` plus an "All chargers" item. Solutions → `/solutions/#<id>` (6). Partners `/partners/`, About `/about/`, Contact `/contact/`. Same in the mobile menu | `index.html` header |
| L2 | Footer columns → routes. "Our Solutions" lists the 6 segments. Privacy and Terms → `/privacy/`, `/terms/` (currently `href="#"`) | footer |
| L3 | Solution rows: they are `<a data-quote>`, a link that opens a dialog instead of going anywhere. Make them plain links: Commercial → `#commercial`, Residential → `#residential`, Fleet → `#fleets`, Infrastructure → `#process`. Keep the head-row "Book a Site Assessment" as the conversion CTA | `#solutions` |
| L4 | Picker: add a "View specifications →" `.btn-ghost` beside each "Request a Quote" | `#chargers` |
| L5 | Hero card → `/chargers/atom-dc-fast/` | hero |
| L6 | `script.js` assumes homepage elements. Guard: `io.observe(.timeline)` (TypeError with no timeline), `pick()` with no tabs, `#inside` tour, the rotator. Each becomes `if (el)` | `script.js` |
| L7 | Header: add `.scrolled` at load on pages whose hero is light (`--plain`), so the white logo stays readable | `script.js` |
| L8 | `aria-current="page"` on the active nav item (set by `build.mjs`) | header |
| L9 | Paths → root-absolute (D3); canonical + `og:url` + absolute `og:image` per page; `robots noindex` until launch (envizon_ev rule) | `<head>` |
| L10 | Copy the 4 missing images from `envizon_ev/assets/img/deck/`: `model-distributor`, `opportunity-network`, `partner-hero`, `price-recurring` | `assets/img/` |

---

## 3. Page by page

Format: **# · Section · UI primitive · Content (pages.json key) · CTA**. The surface alternates so no two neighbouring sections share a background. Each page has one **signature** interaction so the pages don't feel templated.

### 3.1 `/chargers`: "A charger for every site."
Signature: **Power ladder.** A single horizontal 3.3 → 360 kW scale (log spacing) with the 4 products as stops. Clicking a stop scrolls to its card. It answers "which one?" before the visitor reads any card.

| # | Section | UI | Content | CTA |
|---|---|---|---|---|
| 1 | Hero | `.page-hero--photo` (`charger-240.webp`), crumbs | hero: "A charger for every site." + sub | M1 Get a Quote (`PRODUCT_QUOTE`) · Talk to an Expert (ghost, `GENERAL`) |
| 2 | Power ladder | new inline SVG scale on `.block.soft`, 4 stop buttons | product `power` values | stops → `#<slug>` |
| 3 | AC charging "For long stays." | `.block.dark`, 3 `.pick`-style static cards (image, kW, name, 3 specs, 2 buttons) | `#ac` items | M3 View specs (route) + Request a Quote (`data-product`) |
| 4 | DC fast charging "For quick turnarounds." | same, 3 band cards (30 · 60–120 · 180–360) using `charger-60/120/240.webp`, labelled illustrative | `#dc` items | same, all → `/chargers/atom-dc-fast/#variants` |
| 5 | Compare the range | `.tbl` with 4 columns: output, input, connector, auth, connectivity, IP, mounting. Nulls → verify pill | `products[].specs` | link per column header |
| 6 | Match the charger to the customer | `.chips` (6) | chips section | each → `/solutions/#id` |
| 7 | Hardware backed by deployment | split: `deployment-cutaway.webp` + `.tbl` of 6 capability rows | `shared.capabilities` | none (informational) |
| 8 | Closing | `.foot-cta` "Not sure which charger fits?" | cta | M6 `SITE_ASSESSMENT` |

### 3.2 `/chargers/<slug>` × 4: product detail (generated from `products[]`)
Signature: **Sticky product bar.** After the hero scrolls away, `.subnav` holds the product name, kW, section links (Overview · Features · Use cases · [Variants] · Specs · FAQ) and "Request a Quote". On phones it becomes a bottom bar, so the quote CTA is always one tap away.

| # | Section | UI | Content | CTA |
|---|---|---|---|---|
| 1 | Hero | `.page-hero--product` (dark): crumbs, model no., H1 name, tagline, `.stats` (output · connector · protection), cut-out image with the `.tour-ring` glow | `name, model, tagline, power, image, specs` | M1 Request a Quote (`data-product`) · See specifications (`#specs`). Datasheet button **hidden** until a datasheet exists |
| 2 | Sticky bar | `.subnav` | — | M4 |
| 3 | Overview | `.block`, `summary` as a large lead paragraph + `.chips` of power options | `summary, power` | — |
| 4 | Key features | `.bento`: feature 1 as `why-lg` with the product image, 2 standard, 1 `why-mint` | `features` (4) | — |
| 5 | Use cases | `.sol-list` rows with icon instead of number, `.block.soft` | `useCases` (4) | row → matching `/solutions/#id` |
| 6 | Variants (**DC only**) | `.tbl` (Band · Output · Typical sites) + "Which band?" FAQ link | `variants` | M2 Plan depot charging (`FLEET`) |
| 7 | Specifications `#specs` | `.spec` grouped (Electrical · Connector · Control & connectivity · Protection · Environment · Mechanical · Standards). Nulls → verify pill. A note: "designed to" standards | `specs` | ghost "Request the datasheet" → `PRODUCT_QUOTE` + `data-product` |
| 8 | Protections | `.chips` on `.block.dark`. DC adds 4 extra, marked with a lime dot | `protections` | — |
| 9 | Related chargers | 3 `.hero-card` mini cards (the other products) | `products` minus self | route |
| 10 | FAQ | `.faq-grid`; the `.faq-cta` names the product | `faq` (3) | M5 `PRODUCT_QUOTE` + `data-product` |
| 11 | Closing | `.foot-cta` "Get a quote for the {name}." | — | M6 |

Structured data: `Product` JSON-LD (name, model, image, brand Envizon EV). **No `offers`**, because prices are blocked.

### 3.3 `/solutions`: "Charging planned around your site."
Signature: **Pinned segment rail.** On desktop, the 6 segments sit in a sticky left rail (the landing `.rail`) with the active segment lit by scroll. The blocks scroll on the right. On phones the rail becomes the horizontal `.subnav`.

| # | Section | UI | Content | CTA |
|---|---|---|---|---|
| 1 | Hero | `.page-hero--photo` (`night-canopy.webp`); the sub line cycles through "Right charger. Right power. Right support." (reuses the footer rotator) | hero | M1 Book a Site Assessment (`SITE_ASSESSMENT`) |
| 2 | Segments `#segments` | sticky `.rail` (6) + 6 blocks. Each block: `01 Residential` eyebrow, sentence H3, paragraph, "What we cover" 5 bullets in 2 columns, "Recommended chargers" `.chips` → product pages, image | `rows.blocks` items | M2 per block: its own `cta.type` (residential & commercial & public `SITE_ASSESSMENT`; fleets & bus depots `FLEET`; CPO `GENERAL`) |
| 3 | How a project runs `#process` | `.scrolly` pinned 6-stage tracker: stage card left, `delivery-team.webp` right, `.tour-count` "STAGE 02 / 06" (reuses the landing scroll engine, `data-steps="6"`) | `shared.stages` | — |
| 4 | Packaged the way you buy `#packages` | `.bento` (4) on `.block.soft` + `.callout` with the inclusions/exclusions line | packages | M2 Request a Quote (`PRODUCT_QUOTE`) |
| 5 | Capabilities | `.tbl` with `deployment-cutaway.webp` | `shared.capabilities` | — |
| 6 | FAQ | `.faq-grid` (5) | faq | M5 `SITE_ASSESSMENT` |
| 7 | Closing | `.foot-cta` "Tell us about your site." | cta | M6 `SITE_ASSESSMENT` |

### 3.4 `/partners`: "Build a local EV charging business."
The longest page (17 sections in pages.json). UX job: **make it scannable and keep "Become a Partner" always in reach.**
Signature: **Model picker.** "Choose the model that fits you" uses the landing `.picker` (tabs A/B/C, each panel showing image + You bring / You earn / Best for), with model D as a full-width callout under it.

| # | Section | UI | Content | CTA |
|---|---|---|---|---|
| 1 | Hero | `.page-hero--photo` (`partner-hero.webp`) + 4 model `.chips` | hero | M1 Become a Partner (`PARTNERSHIP`) · See the models (`#models`) |
| 2 | Sticky bar | `.subnav`: Opportunity · Models · Pricing · Support · 90 days · Next steps · FAQ | — | M4 `PARTNERSHIP` |
| 3 | The opportunity | `.sol-list` (4 numbered rows) + `opportunity-network.webp` | `#opportunity` | — |
| 4 | What you get | 3-card `.bento` on `.block.soft` | `#value` | — |
| 5 | Partnership models `#models` | `.picker` A/B/C (`model-*.webp`) + `.callout` for D | `#models` + callout | M3 per panel: Apply as this model → `PARTNERSHIP` with the partner type pre-selected (`data-partner="A"`) |
| 6 | What you'll sell | 4 `.hero-card` minis on `.block.dark` | `#range` | → `/chargers/<slug>/` |
| 7 | How projects run | 6 stages as a compact numbered strip (not pinned again) | `shared.stages` | link → `/solutions/#process` |
| 8 | How we price `#pricing` | 3 image cards (`price-equipment/project/recurring`) + the guardrail line | `#pricing` | — |
| 9 | Site partnerships | 2-column "Site partner brings / Envizon brings" on `.block.soft`, then `.flow` revenue waterfall (3 steps), then `.callout` "Agreed up front" | `#site-partnerships`, flow, callout | — |
| 10 | Partner support | 4 tiles + `support-hub.webp` | `#support` | — |
| 11 | First 90 days | landing `.timeline` with 4 nodes (Days 1–15 … 61–90) + 10 KPI `.chips` "What we track together" | `#first-90-days`, chips | — |
| 12 | Next steps | 4-step numbered list on `.block.dark` | `#next-steps` | M2 Become a Partner |
| 13 | FAQ | `.faq-grid` (6) | faq | M5 `PARTNERSHIP` |
| 14 | Closing | `.partners` video band (reuses the homepage band) instead of `.foot-cta` | cta | M6 `PARTNERSHIP` |

Copy guardrails: no "profitable", no ₹ figures, no competitor table, no SLA numbers (slides 7 and 9 are partner-pack only).

### 3.5 `/about`: "EV charging, end to end."
Signature: **Mission statement as type.** Vision and mission are set in large Antique Legacy 100 on mint, two columns, so there's no stock photography.

| # | Section | UI | Content | CTA |
|---|---|---|---|---|
| 1 | Hero | `.page-hero--photo` (`delivery-team.webp`) | hero | M1 Talk to an Expert (`GENERAL`) |
| 2 | What we do | 4 numbered tiles (design · supply · install · operate) linking to the 5 homepage layers | `#what-we-do` | — |
| 3 | Vision & mission | typographic split on `.why-mint` surface | `#purpose` | — |
| 4 | How we work | 6-stage compact strip (same as partners #7) | `shared.stages` | → `/solutions/#process` |
| 5 | Standards | `.chips` (8) + the line "designed to; certificates on request per model" | standards | — |
| 6 | Closing | `.foot-cta` "Let's plan your charging site." | cta | M6 `SITE_ASSESSMENT` |

Not rendered: team, offices (BLOCKED).

### 3.6 `/contact`: "Talk to Envizon EV."
Signature: **Intent cards.** 5 cards act as the menu. Each opens the dialog already set to that enquiry type, so the visitor never has to pick a type in a dropdown.

| # | Section | UI | Content | CTA |
|---|---|---|---|---|
| 1 | Hero | `.page-hero--photo` (`night-canopy.webp`), short (52vh) | hero | M1 Send an enquiry (`GENERAL`) |
| 2 | Pick a starting point | 3×2 grid of icon cards. The whole card is the button (`<button data-quote>`). 6th card: sales email `evse_sales@envizonev.com` (**VERIFY**, shown only with `?review` until confirmed) | `#enquiries` | M3 per card: `PRODUCT_QUOTE`, `SITE_ASSESSMENT`, `FLEET`, `PARTNERSHIP`, `GENERAL` |
| 3 | What happens next | `.flow` 3 steps: we review → site assessment → written proposal. **New PROPOSED copy, no response-time numbers** | new | — |
| 4 | FAQ | `.faq-grid` reusing 3 homepage FAQ items | homepage faq | M5 `GENERAL` |

No footer `.foot-cta` here (it would repeat the page). Phones and address stay BLOCKED.

### 3.7 `/privacy`, `/terms`: PAGE_PENDING
`.page-hero--plain` + `.prose` with a visible "Legal text pending review" notice, `noindex`. The dialog's consent line links to `/privacy/`.

### 3.8 `/404.html` (small, recommended)
`.page-hero--plain` "This page isn't here." + 4 route links + Get a Quote. Static hosts serve it automatically.

---

## 4. UX rules across all pages
- **Hierarchy:** one H1 per page (hero). Section titles H2, cards H3. Two-tone `.accent` on every H2.
- **Rhythm:** surfaces alternate (light/soft/dark). Space between groups ≥ 2× space inside a group. Section padding `clamp(72px, 9vw, 144px)`.
- **Wayfinding:** breadcrumbs on every inner page, `aria-current` in the nav, `.subnav` scroll-spy on long pages (products, solutions, partners), and `scroll-padding-top` covering header + subnav.
- **Deep links:** every section with an `id` works from the URL, including `/chargers/atom-dc-fast/#variants`. The dialog can open from `?quote=FLEET` for campaign links (one line in `script.js`).
- **Status honesty:** a `.verify` pill wherever data is unconfirmed. `?review` outlines PROPOSED/VERIFY blocks; the production build strips them.
- **Motion:** only `transform`, `opacity`, `stroke-dashoffset`. Pinned sections pin only where the landing rule allows (`min-width 1024`, `min-height 700`); otherwise they stack. `prefers-reduced-motion` shows the final state.
- **Mobile:** hero 52vh, subnav scrolls sideways, tables scroll inside their box, cards stack, product CTA as a fixed bottom bar (respects `env(safe-area-inset-bottom)`), tap targets ≥ 44px.
- **Forms:** dialog focus-trapped (native `<dialog>`), errors announced (`role="alert"`), preset title per type, partnership fieldset only for `PARTNERSHIP`, submission still mocked.

---

## 5. Build order

| Phase | Work | Done when |
|---|---|---|
| 1 | D1–D5 confirmed. Landing fixes L1–L10 | Homepage nav, footer and picker reach routes; `script.js` runs without errors on a page with only header + footer |
| 2 | `content/` copied; `build.mjs` (shell extraction, head/meta per page, crumbs, sprite subset, section renderers) | `node build.mjs` writes 12 HTML files; homepage untouched |
| 3 | New primitives (§1.2) in `style.css` | A kitchen-sink check page renders each one at 1440/390 |
| 4 | /chargers + 4 product pages | §3.1–3.2 complete |
| 5 | /solutions, /partners (+ dialog partnership fieldset) | §3.3–3.4 complete |
| 6 | /about, /contact, /privacy, /terms, 404 | §3.5–3.8 complete |
| 7 | Audits + QA (§6, §7) | All checks green |
| Images (parallel) | Antigravity generates the 27 slots in `docs/image-prompts.md` into `assets/img/gen/`. Pages ship with fallbacks. On the owner's go, flip `approved` per slot in `content/images.json` and rebuild | Every approved slot renders; no fallback is off-system |

---

## 6. Skills mapped to the work

| Phase | Skill | Used for |
|---|---|---|
| 1, 3 | `improve-ui` | Audit the landing page against its own tokens before extracting (drift, one-off values) |
| 3–6 | `frontend-design` | Each page's signature moment, so the pages don't read as templated |
| 3–6 | `ui-ux-pro-max`, `ui-skills-root` | UX patterns for product detail, comparison, partner funnel, contact intent cards |
| 3–6 | `frontend-ui-engineering` | Component structure, responsive states, sticky subnav and bottom bar |
| 3 | `better-ui` | Radius, shadow, icon optical alignment, hover/press states on the new primitives |
| 4–6 (per page) | `baseline-ui` | Spacing, hierarchy and type cleanup pass on each finished page |
| 7 | `fixing-accessibility` | Tablist (picker), subnav, dialog, tables (`scope`), breadcrumbs, contrast of the verify pill, focus order |
| 7 | `fixing-metadata` | Per-page title, description, canonical, OG/Twitter, Product + BreadcrumbList + Organization JSON-LD, `noindex` until launch |
| 7 | `fixing-motion-performance` | Pinned scrolly on /solutions, ladder SVG, reveal stagger, reduced motion |
| 7 | `web-perf` | LCP image preload per hero, lazy media below the fold, the model-viewer import kept homepage-only |
| 7 | `run` + built-in browser | Serve with `.claude/launch.json` (`site`, port 5173) and walk every journey |
| 7 | `ponytail-review`, `code-review` | Review `build.mjs` and `script.js` changes |
| optional | `dataviz` | Only if the power ladder grows beyond a simple scale |

Not relevant here: the Cloudflare, HyperFrames/video, Figma (needs `/mcp` auth, and there's no Figma source) and document skills.

---

## 7. Testing

**Automated (`tests/qa.mjs`, Playwright, one file):** uses `playwright-core` with the installed Chrome (the same setup as `envizon_ev/tools/qa-envizon.mjs`) and runs against `python -m http.server 5173`.

| Check | On |
|---|---|
| Every route returns 200; every internal `href` and `#anchor` resolves | all 12 pages |
| No console errors, no failed requests, no external requests except model-viewer on `/` | all |
| No horizontal overflow at 1440, 1024, 768, 390, 320 | all |
| Exactly one `h1`; no heading level skipped | all |
| Every `[data-quote]` opens the dialog with the matching type and title; `data-product` preselects the charger; `data-partner` preselects the partner type | all CTAs (CTA matrix §1.3) |
| Partnership fieldset shows only for `PARTNERSHIP`; required-field and consent errors announce; mock success state appears | dialog |
| Nav `aria-current` correct; dropdowns open and close with keyboard and Escape; mobile menu traps nothing and closes on link | all |
| Subnav scroll-spy highlights the section in view; the bottom bar shows on phones only | products, partners, solutions |
| Picker arrow keys move between models | /partners |
| No forbidden strings rendered: `BLOCKED`, `Axonify`, `₹`, `profitable`, `certified` | all |
| Null specs render "Confirmed per datasheet" | 4 products |

**Manual (built-in browser):** each page at 1440 and 390, light pass with `?review`, keyboard-only walk of one full journey per persona:
1. Homeowner: home → Chargers → Wallbox → specs → Request a Quote (preset Wallbox).
2. Fleet manager: home → Solutions → Fleets → Plan fleet charging (`FLEET`).
3. Partner: home → Partners → Models → Model B → Apply (`PARTNERSHIP`, type B).
4. Unsure visitor: Contact → Site assessment card → submit with errors → fix → success.

---

## 8. Risks to know
- `#inside` loads an **unlicensed Plugzmart concept GLB** (`assets/3d/concept-eclipz-240.glb`, flagged in `script.js`). It must be swapped for Envizon's own model before any public deploy.
- Every product name, spec and image needs the signed white-label/supply agreement (envizon_ev decision 1).
- Lead submission is mocked; Privacy/Terms have no legal text; the sales email is unverified.
- Root-absolute paths assume hosting at the domain root.

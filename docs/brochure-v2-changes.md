# Brochure v2 → website: what changed, what to confirm, images to generate

Source: `EnvizonEV BROCHURE_v2.pdf` (12 pages). Owner decisions (24 Nov 2026):
- **DC-only.** The brochure has no AC products, so the Atom AC range and the Residential segment are gone.
- **Range claim: 30–360 kW**, as written in the brochure's "Why Envizon EV" section. Spec sheets exist for 60 to 360 kW only (see "To confirm").

Rebuild after any content change: `node build.mjs`. The homepage (`index.html`) is hand-written. Inner pages come from `content/pages.json`.

---

## 1. Where each brochure section now lives

| Brochure section (page) | Website location |
|---|---|
| Cover: "Powering India's electric future", Made in India · Smart technology · Scalable infrastructure (p1) | Home hero tagline · About hero + chips · meta titles |
| Who we are + 8 capabilities (p1) | About › Who we are (8 cards) |
| Vision & mission (p1–2) | About › Vision & mission (exact brochure wording) |
| Our solutions: 4 connected services (p2) | Solutions › Four connected services · Home FAQ 01 |
| Business ecosystem (p2–3) | About + Partners › Business ecosystem (shared section) |
| Turnkey execution: 6 steps (p3) | Shared "stages" section on Solutions + About · Home "process" bento (5 tiles: steps 5+6 merged) · Home Why card 01 |
| Destination hub: 4 machines, 8 bays (p4) | Solutions › Destination hub |
| Digital charging: app, CMS/CPMS, operator tools, connectivity (p4–5) | Solutions › Digital charging · Home Layers 04 |
| Connected. Compatible. Controlled. (p5) | Chargers › chip strip · Home tour title |
| Why Envizon EV: 6 reasons (p5–6) | About › Why Envizon EV (all 6) · Home Why cards (4 cards; reasons 03 + 06 merged, 04 folded into 03) |
| Product portfolio + lineup image (p6) | Chargers › By site (Urban & commercial / Fleet & highway / Larger hubs) |
| NEO Smart Series spec sheets (p6–11) | 3 product pages: `/chargers/neo-60-120/`, `/chargers/neo-180-240/`, `/chargers/neo-360/` · Chargers › Compare table · Home picker + tour |
| Applications: 5 sectors (p11) | Solutions › 5 segments (commercial, fleets, public, highway, industrial) · nav menu · footer rotator |
| Service & support (p12) | Solutions › Service & support · Home Why card 04 · Contact › 24/7 support |
| Partnerships & distribution (p12) | Partners hero · Home partners band |
| End page: "Together, let's power the EV revolution.", info@envizonev.com (p12) | Footer CTA · About CTA · footer email · Contact › Email us |

## 2. Page-by-page changes

**Home (`index.html`)**
- Title and meta: DC fast charging, 30–360 kW, Made in India.
- Nav: Chargers menu lists the 3 NEO models. Solutions menu lists the 5 brochure applications.
- Hero tagline: "Powering India's electric future." The hero card links to the NEO range.
- Layers: hardware is now NEO Smart Series 30–360 kW CCS2. Software lists OCPP 1.6J, CMS/CPMS, RFID & QR, app & payments. Service adds 24/7 support.
- Tour: "Connected. Compatible. Controlled." All 6 chapters use NEO specs: 150–1000 V, 10.1" touch screen, RFID/app/OTP/Auto Charge, OCPP 1.6J→2.x, offline mode, the brochure's 9 protections, IP55/IK10 and −30 to +55 °C. Removed claims the brochure doesn't make: UPI/card, Class 1 metering, smoke and phase detection, the 7" display.
- Applications rows: Commercial & Retail · Fleet & Logistics · Public & Highway · Turnkey Infrastructure.
- Charger picker: 3 NEO models (grid set to 3 columns in `style.css`).
- Why: Turnkey execution · High-power DC · Intelligent technology · Made in India & support.
- Process: brochure steps (Feasibility → Handover & Support).
- Partners band, FAQ (01, 04 and 06 rewritten, 07 added for support), footer rotator, footer CTA and email, © Envizon EV Pvt. Ltd., and quote-form charger list.

**Chargers.** New hero. Ladder rescaled to 20–400 kW. NEO portfolio cards, By-site cards, Compare table, connectivity chips, application chips, and the capabilities table updated.

**Product pages (new, ×3).** Full brochure spec sheets in 6 groups, 9 protections, a Configurations table (60/120 and 180/240), the brochure's spec footnote, and per-model FAQs. **The old `/chargers/atom-*` pages were deleted.** Add redirects at the host if those URLs were ever shared.

**Solutions.** New hero. 5 application segments, Destination hub, Turnkey execution, Four connected services, Digital charging, Service & support, and a refreshed FAQ.

**Partners.** Hero uses "Growing together. Powering the future." Business ecosystem added. "What you'll sell" now shows the NEO range. The opportunity copy is DC-only. The business-model sections are unchanged because the brochure doesn't cover them.

**About.** Rebuilt from the brochure: hero, Who we are, Vision & mission, Why Envizon EV (6), Ecosystem, Turnkey execution, and Standards (brochure list).

**Contact.** Adds a 24/7 support card and info@envizonev.com, replacing the unverified evse_sales@ address.

**Generator (`build.mjs`).**
- Use-case links point to the new segments, and the protections list matches the brochure.
- Configurations table, spec footnote and "NEO" labels updated.
- Product images fall back to `atom-dc-fast.webp` until the NEO cut-outs exist.
- **Bug fix:** icons on every inner page vanished after `index.html` was reformatted. The sprite marker `</defs></svg>` had split across lines. The match now tolerates whitespace and fails loudly if the marker is missing.

## 3. To confirm with Envizon (brochure gaps)

1. **30 kW.** "Why Envizon EV" says 30–360 kW, but the smallest spec sheet is 60 kW (2 × 30 kW modules). Is a single-module 30 kW unit sold? If not, change "30–360" to "60–360" everywhere.
2. **480 kW.** It appears in the lineup image (p6) with no spec sheet. The site shows it in the /chargers lineup and in each product page's "The range" strip as "Specifications on request" (opens the quote form). Add a product page once a spec sheet exists.
3. **Shared specs.** Protection, interface, enclosure (1100 × 2000 × 850 mm), environment and standards are printed once, after the 360 kW sheet. They are shown on all 3 models. Confirm the dimensions match for 60/120 and 180/240.
4. **Current per gun on the 180/240** is "200 A / 250 A / 375 A". Which configuration gets which value?
5. **Footnote** says "subject to change *with* prior notice", probably meant "without". The site uses neutral wording.
6. **Toll-free number** is masked in the brochure (`1800 **** ***`). Add it to the footer and contact page when it's available.
7. **Payments.** The brochure says "digital payment and POS". The site no longer names UPI or cards. Add them back if they're supported.
8. **QR authentication** is listed on p5 but not in the spec sheet's authentication row. Confirm it applies to the NEO Smart Series.
9. **Legal name.** "Envizon EV Pvt. Ltd." is now in the footer. The logo and other pages still say "Envizon EV Solutions".

---

## 4. Images to generate

Use the families, colours, export rules and **negative prompt** in `docs/image-prompts.md` §1. One change applies to the hardware rule: **chargers now look like the NEO Smart Series, not Atom.** NEO look, from the brochure render: a tall floor-standing cabinet, about 1.1 m wide × 2 m tall. Off-white body, brand-green angled side panels and base stripe, a green shield-shaped bezel around the touchscreen, RFID and QR below it, a red emergency stop, and two CCS2 guns holstered side by side on the front. The product images (`assets/img/neo-*.webp`) are now cut from the brochure's real lineup render; see the prompt doc for the full look. No readable text or logos.

How each kind goes live:
- **Product cut-outs:** save to `assets/img/<file>`. They appear on the next `node build.mjs`. On the homepage, also swap the three `atom-dc-fast.webp` sources in the `#chargers` picker.
- **Everything else:** save to `assets/img/gen/<file>`, then set `"approved": true` in `content/images.json` and rebuild.

| # | Slot · file | Where | Family · size | Pri |
|---|---|---|---|---|
| 1 | `neo-60-120.webp` | Product page, cards, ladder | CUT · 1000×1400, transparent | P1 |
| 2 | `neo-180-240.webp` | ″ | CUT · 1000×1400 | P1 |
| 3 | `neo-360.webp` | ″ | CUT · 1000×1400 | P1 |
| 4 | `hero-chargers` · `gen/hero-chargers.webp` | /chargers hero (old image showed AC wall boxes, so it's switched off) | DOC · 2560×1440 | P1 |
| 5 | `hero-contact` · `gen/hero-contact.webp` | /contact hero (old image showed an AC wall box, so it's switched off) | DOC · 2560×1440 | P1 |
| 6 | `hub-concept` · `gen/hub-concept.webp` | Solutions › Destination hub | ISO · 1600×1200 | P1 |
| 7 | `seg-highway` · `gen/seg-highway.webp` | Solutions › Highway | ISO · 1600×1200 | P2 |
| 8 | `seg-industrial` · `gen/seg-industrial.webp` | Solutions › Industrial | ISO · 1600×1200 | P2 |
| 9–11 | `scene-neo-60-120`, `scene-neo-180-240`, `scene-neo-360` · `gen/scene-*.webp` | Product page › Key features | DOC · 1600×1200 | P2 |
| 12 | `hero-solutions` · `gen/hero-solutions.webp` (regenerate) | /solutions hero: the current image shows an apartment car park | DOC · 2560×1440 | P2 |
| 13–18 | `stage-1` … `stage-6` | Turnkey execution steps (renamed) | ISO · 1600×1200 | P2 |

### Prompts

The full prompts, ready to paste, are in **[antigravity-image-prompts.md](antigravity-image-prompts.md)**: 18 prompts with file names, sizes, the NEO look, negative prompts and go-live steps.

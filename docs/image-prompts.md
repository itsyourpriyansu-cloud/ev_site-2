> **Superseded where they differ by [`docs/brochure-v2-changes.md`](brochure-v2-changes.md)** (Brochure v2, Nov 2026): DC-only NEO Smart Series, no Atom AC range or residential segment. Use its hardware look and slot list for new images.

# Envizon EV inner pages: image prompts for Antigravity

**What this is:** one prompt per new image the inner pages need, written against the visual system of the finished homepage (`index.html`). Generate each slot and save it to **`assets/img/gen/<file>`** with the exact file name and size given. Don't overwrite anything in `assets/img/`.

**How it goes live:** each slot is listed in `content/images.json` with `"approved": false`. Until it's approved, the page shows the **fallback** image named in the table. When the owner gives the go, the slot flips to `true`, `node build.mjs` runs, and the new image replaces the fallback with no layout change.

**Companion docs:** `docs/inner-pages-plan.md` (which section each slot sits in) and `../envizon_ev/docs/image-art-direction.md` (the original art direction; this file wins where they differ, because the homepage has moved on).

---

## 1. The homepage image system (match it exactly)

The homepage uses three families. Attach the listed **reference images** to every generation in that family (image reference / style reference strength 0.55–0.7).

| Family | What it looks like | Reference files (attach) | Default size |
|---|---|---|---|
| **ISO**: dark isometric diorama | A floating matte concrete or white slab on a flat deep green-black background `#0E1C18`. 30° isometric camera, soft top-left studio light, gentle ambient occlusion. White vehicles and white chargers (dark glass screen, thin green LED edge strips). Bay lines and slab edges glow a soft emissive brand green `#16B14C`. Small tropical planters as the only organic detail. No people, or tiny figures only. Lots of empty dark background around the slab | `assets/img/night-canopy.webp`, `model-turnkey.webp`, `charger-120.webp`, `support-hub.webp` | 1600×1200 (4:3) |
| **DOC**: dusk documentary photo | Photoreal, blue hour or early dusk, cool neutral grade, shallow depth of field, real Indian urban architecture. A white Atom-style charger with a black glass fascia and a green LED strip. **The left 35–45 % of the frame falls off into deep green-black shadow** (`#0E1C18`), so white headline text can sit on it | `assets/img/hero-charge-poster.webp` (+ the Atom cut-out for the charger) | 2560×1440 (16:9) |
| **CUT**: product cut-out | The four Atom units on a transparent background (already done: `atom-ac-socket/wallbox/destination/dc-fast.webp`). **No new cut-outs needed.** Use them as the hardware reference in every DOC and ISO slot | `assets/img/atom-*.webp` | n/a |

### Colour and light (all families)
| Token | Hex | In images |
|---|---|---|
| Green-black | `#0E1C18` | Background of every ISO slot, shadow tone of every DOC slot. Never pure black |
| Forest | `#183028` | Dusk sky base, deep shadows |
| Brand green | `#16B14C` | **Only** as emitted light: LED strips, screen glow, bay lines, slab edges. Never paint whole surfaces green |
| Mint | `#D6F1DB` | Faint highlights, screen bloom |
| Concrete / white | `#E8E8E8` → `#FAFAFA` | Slabs, charger bodies, vehicles |
| Avoid | yellow, orange, gold, warm golden-hour light | These read off-brand next to the homepage (the old `delivery-team.webp` and `partner-hero.webp` are off-system for exactly this reason) |

### Hardware rules (non-negotiable)
1. **Chargers look like the Atom range.** White or light-grey body, black glass fascia, thin green LED edge strips. Use the cut-out as a reference. Don't invent sculpted, chrome or gold chargers.
   - Smart Socket: a small wall box with an **IEC 60309** industrial socket.
   - Wallbox: a wall unit with a coiled **Type 2** cable.
   - Destination: a slim pedestal with 1–2 **Type 2** guns.
   - DC Fast: a floor-standing dual-gun unit with **CCS2** guns.
2. **No readable text, numbers, logos or brand badges** anywhere: charger fascias are blank, signs are blank, number plates are blank or out of focus.
3. **Indian context:** right-hand-drive cars, compact SUVs and sedans, e-autos, e-buses, delivery vans, Indian residential and commercial architecture (Hyderabad/Bengaluru feel), neem and palm planting.
4. **Plausible engineering:** cables reach their sockets, guns sit in holsters or vehicle ports, there's one cable per gun, and transformers and panels are realistic.

### Negative prompt (append to every slot)
> text, letters, numbers, logos, watermark, brand badges, number plates, signage text, neon, lightning bolt icons, holograms, energy particles, light trails, blue sci-fi glow, teal-and-orange grade, golden hour, warm yellow light, orange accents, gold trim, chrome sculpted charger, lens flare, HDR halos, heavy vignette, concept car, people looking at camera, stock smile, handshake, left-hand drive, Western suburb, snow, warped connector, extra cables, cables going nowhere, melted plastic, extra fingers, distorted hands, oversaturated green, fluorescent green surfaces, cluttered background, white background (ISO slots)

### Export
- WebP, quality 82, sRGB, exact pixel size listed. Save to `assets/img/gen/`.
- Keep the subject inside the **safe area** given per slot. Heroes crop to about 4:5 on phones, keeping the centre-right.
- Alt text is already written in `content/images.json`; every one ends "(illustrative render)".

---

## 2. Master list (27 slots)

Priority: **P1** = page hero, or replaces an off-system image that's visible now. **P2** = adds a new visual to a section that works today with a fallback.

| # | Slot id | File (`assets/img/gen/`) | Page · section | Family | Size | Pri | Fallback until approved |
|---|---|---|---|---|---|---|---|
| 1 | `hero-chargers` | `hero-chargers.webp` | /chargers · hero | DOC | 2560×1440 | P1 | `charger-120.webp` |
| 2 | `hero-solutions` | `hero-solutions.webp` | /solutions · hero | DOC | 2560×1440 | P1 | `night-canopy.webp` |
| 3 | `hero-partners` | `hero-partners.webp` | /partners · hero | DOC | 2560×1440 | P1 | `partner-hero.webp` (off-system) |
| 4 | `hero-about` | `hero-about.webp` | /about · hero | DOC | 2560×1440 | P1 | `delivery-team.webp` (off-system) |
| 5 | `hero-contact` | `hero-contact.webp` | /contact · hero | DOC | 2560×1440 | P1 | `night-canopy.webp` |
| 6 | `dc-30` | `dc-30.webp` | /chargers · DC card 1 | ISO | 1600×1200 | P1 | `charger-60.webp` (off-system) |
| 7 | `dc-60-120` | `dc-60-120.webp` | /chargers · DC card 2 | ISO | 1600×1200 | P1 | `charger-120.webp` |
| 8 | `dc-180-360` | `dc-180-360.webp` | /chargers · DC card 3 | ISO | 1600×1200 | P1 | `charger-240.webp` (off-system) |
| 9 | `seg-residential` | `seg-residential.webp` | /solutions · 01 Residential | ISO | 1600×1200 | P1 | `model-site-operator.webp` |
| 10 | `seg-commercial` | `seg-commercial.webp` | /solutions · 02 Retail & workplaces | ISO | 1600×1200 | P1 | `night-canopy.webp` |
| 11 | `seg-fleets` | `seg-fleets.webp` | /solutions · 03 Fleets | ISO | 1600×1200 | P1 | `charger-120.webp` |
| 12 | `seg-cpo` | `seg-cpo.webp` | /solutions · 04 CPOs | ISO | 1600×1200 | P1 | `support-hub.webp` |
| 13 | `seg-bus-depots` | `seg-bus-depots.webp` | /solutions · 05 Bus depots | ISO | 1600×1200 | P1 | `charger-120.webp` |
| 14 | `seg-public` | `seg-public.webp` | /solutions · 06 Public & highway | ISO | 1600×1200 | P1 | `model-turnkey.webp` |
| 15 | `par-opportunity` | `par-opportunity.webp` | /partners · The opportunity | ISO | 1600×900 | P1 | `opportunity-network.webp` (off-system) |
| 16 | `par-distributor` | `par-distributor.webp` | /partners · Model A | ISO | 1600×1200 | P1 | `model-distributor.webp` (off-system) |
| 17 | `par-recurring` | `par-recurring.webp` | /partners · Price 3 Recurring | ISO | 1600×1000 | P1 | `price-recurring.webp` (off-system) |
| 18 | `scene-atom-ac-socket` | `scene-atom-ac-socket.webp` | product page · Key features | DOC | 1600×1200 | P2 | `atom-ac-socket.webp` |
| 19 | `scene-atom-ac-wallbox` | `scene-atom-ac-wallbox.webp` | product page · Key features | DOC | 1600×1200 | P2 | `atom-ac-wallbox.webp` |
| 20 | `scene-atom-ac-destination` | `scene-atom-ac-destination.webp` | product page · Key features | DOC | 1600×1200 | P2 | `atom-ac-destination.webp` |
| 21 | `scene-atom-dc-fast` | `scene-atom-dc-fast.webp` | product page · Key features | DOC | 1600×1200 | P2 | `atom-dc-fast.webp` |
| 22–27 | `stage-1` … `stage-6` | `stage-1.webp` … `stage-6.webp` | /solutions · How a project runs (pinned) | ISO | 1600×1200 | P2 | `delivery-team.webp` |

Not needed (already on-system and reused): `model-turnkey`, `model-site-operator` (partner models B, C), `price-equipment`, `price-project` (price 1, 2), `support-hub` (partner support), `activation-roadmap` (first 90 days), `deployment-cutaway` (capabilities), `faq-cta` (every FAQ panel), the 4 Atom cut-outs (product heroes), `charger-120` (fallback). Skipped on purpose: per-page OG images, a 404 image and team photos (BLOCKED).

---

## 3. Prompts

Each prompt = the family's base line + the slot scene + the safe area. Append the negative prompt from §1.

**ISO base line:**
> clean isometric 3D miniature diorama on a floating matte concrete slab, 30° isometric camera, centred with generous empty space around it, flat deep green-black background #0E1C18, soft top-left studio light, gentle ambient occlusion, matte concrete and white materials, white vehicles, white EV chargers with black glass screens and thin green LED edge strips, soft emissive brand-green #16B14C lines on the bay markings and slab edges, small tropical planters, tiny realistic details, calm and precise, no text

**DOC base line:**
> photorealistic documentary photograph, Hyderabad India, blue hour, cool neutral colour grade, saturation −10 %, 35–50 mm lens, level horizon, shallow depth of field, honest textures, white EV charger with black glass fascia and green LED strip matching the reference, the left 40 % of the frame falls off into deep green-black shadow #0E1C18 for headline text, green only where light is emitted, subtle film grain

### Page heroes (DOC, 2560×1440, safe area: key subject between x 50–88 %, y 20–85 %; left 40 % dark and calm)

**1 · `hero-chargers`.** *The range, together.*
> [DOC base] premium covered car park of an Indian office campus at blue hour, four Envizon Atom chargers in a row receding to the right, from a small wall socket and a wallbox on a concrete pillar to a slim pedestal and a floor-standing dual-gun DC unit, a white compact SUV plugged into the DC unit with a CCS2 gun, polished concrete floor with faint green bay lines, soft ceiling downlights
Alt: "Four Envizon Atom chargers, from a wall socket to a DC fast charger, in an office car park at dusk (illustrative render)"

**2 · `hero-solutions`.** *Many site types, one partner.*
> [DOC base] elevated three-quarter view at dusk over a mixed-use Indian neighbourhood edge: an apartment society's covered parking with wallboxes, an office forecourt with pedestal chargers, and a delivery-van bay with a DC charger, all lit by small green charger LEDs, warm-white windows kept dim and neutral, wide calm sky in forest-green dusk
Alt: "Dusk view of an apartment car park, an office forecourt and a van bay, each with EV chargers (illustrative render)"

**3 · `hero-partners`.** *A local business, built on charging.*
> [DOC base] modern EV equipment showroom and service counter in an Indian city at dusk, glass frontage, inside two Atom DC units and three wallboxes on display plinths, a partner business owner (Indian, 30s, smart casual) seen from behind and side, talking with a site engineer holding a tablet, calm professional mood, no faces to camera
Alt: "A partner's EV charger showroom at dusk, with chargers on display and two people talking (illustrative render)"

**4 · `hero-about`.** *The team that builds it.*
> [DOC base] two Envizon field engineers (Indian, grey work uniforms without logos, white hard hats) commissioning a floor-standing dual-gun DC charger beside a white electric SUV under a contemporary concrete canopy, one checking a tablet, the other at the open service panel, an electrical cabinet nearby, cool dusk light, no golden hour
Alt: "Two engineers commissioning a DC fast charger next to an electric SUV at dusk (illustrative render)"

**5 · `hero-contact`.** *Someone will pick up.*
> [DOC base] close, quiet scene in an apartment basement car park at night: a site supervisor (Indian, 40s) on a phone call, standing beside a wall-mounted Atom wallbox with its green ring lit and a Type 2 cable coiled, a compact SUV parked in the bay, clean floor, soft overhead light, calm and reassuring
Alt: "A site supervisor on a call beside a wall-mounted EV charger in a basement car park (illustrative render)"

### DC power bands (ISO, 1600×1200; safe area: the slab fills the central 70 %, cards crop it to about 4:3–1:1)

**6 · `dc-30`.**
> [ISO base] small retail and office forecourt: one compact single-gun DC charger on a plinth, two parking bays, a sedan charging, a café frontage with glass and planters, very tidy and small in scale
Alt: "Isometric forecourt of a small office with one DC charger and a sedan charging (illustrative render)"

**7 · `dc-60-120`.**
> [ISO base] highway rest-stop plaza: three dual-gun DC chargers under a slim flat canopy, a compact SUV, a sedan and a delivery van charging, a small food kiosk, a curved road edge passing the slab
Alt: "Isometric highway rest stop with three DC chargers under a canopy (illustrative render)"

**8 · `dc-180-360`.**
> [ISO base] heavy-duty electric bus depot: two large high-power DC charging cabinets with a transformer and switchgear block, four white e-buses parked nose-in, overhead cable trays, wide concrete apron with green bay lines
Alt: "Isometric electric bus depot with high-power DC charging cabinets (illustrative render)"

### Solution segments (ISO, 1600×1200; safe area: central 75 %, shown in a block that crops to about 4:3)
Make all six from the **same camera, slab shape and scale**, so they read as one set as you scroll the pinned rail.

**9 · `seg-residential`.**
> [ISO base] apartment society: the ground floor of a mid-rise residential block with stilt parking, six bays with wall-mounted wallboxes and smart sockets, two compact SUVs and a scooter charging, a small meter room door, planters
**10 · `seg-commercial`.**
> [ISO base] hotel and mall drop-off: a porte-cochère with two slim pedestal chargers, a glass shopfront and a hotel entrance, two cars charging, one DC unit at the corner, landscaped planters
**11 · `seg-fleets`.**
> [ISO base] logistics yard: five white delivery vans and two e-autos lined up at DC chargers along a loading-dock wall with roller shutters, a small control cabin
**12 · `seg-cpo`.**
> [ISO base] public charging hub run by an operator: four DC chargers in a row with numbered-but-blank bays, a small canopy, a payment kiosk with a blank screen, a tiny operations room with a glowing dashboard screen (no text), cars from different segments charging
**13 · `seg-bus-depots`.**
> [ISO base] city bus depot at night scale: e-buses parked in a herringbone, a row of high-power DC cabinets, a transformer yard behind a fence, a workshop bay
**14 · `seg-public`.**
> [ISO base] highway fuel station adapted for EVs: a fuel canopy with two DC chargers added on a new island, a highway restaurant behind, a curved highway edge, an SUV and a sedan charging
Alts: "Isometric {apartment society / hotel and mall drop-off / logistics yard / public charging hub / city bus depot / highway fuel station} with EV chargers (illustrative render)"

### Partners (ISO; replaces off-system deck renders)

**15 · `par-opportunity`** (1600×900, safe area: central 80 % wide).
> [ISO base] a long, wide slab showing a small city network: apartments, an office block, a logistics depot, a parking hub and a highway stop, linked by thin glowing green route lines between charger icons on each site, all sites miniature and evenly spaced
Alt: "Isometric city with apartments, offices, a depot and a parking hub linked by charging routes (illustrative render)"

**16 · `par-distributor`** (1600×1200).
> [ISO base] cut-away dealer showroom and warehouse: a display wall of wallboxes and smart sockets, two DC units on plinths, a reception counter, pallet racking with boxed chargers at the back, glass frontage with planters
Alt: "Isometric charger showroom and warehouse stocked with chargers (illustrative render)"

**17 · `par-recurring`** (1600×1000; matches `price-equipment` and `price-project`, so open both and copy their framing).
> [ISO base] a technician's service van parked beside a DC charger with its service panel open, a laptop on a small stand showing a glowing green dashboard (no text), a calendar-like row of five small green-lit tiles on the slab edge suggesting scheduled visits
Alt: "Isometric service van and technician maintaining a DC charger (illustrative render)"

### Product scenes (DOC, 1600×1200; safe area: product between x 25–75 %; the bento card crops to about 4:3)
Use the matching Atom cut-out as a strong reference (≥ 0.7). The product must be recognisably the same unit.

**18 · `scene-atom-ac-socket`.**
> [DOC base, left falloff reduced to 20 %] the Atom AC Smart Socket mounted on the wall of an Indian independent house's covered parking at dusk, an electric scooter and an e-rickshaw nearby, one scooter plugged in with an industrial plug, warm-neutral porch light kept dim
**19 · `scene-atom-ac-wallbox`.**
> [DOC base, left falloff 20 %] the Atom AC Wallbox on a concrete pillar in an apartment basement bay, Type 2 cable plugged into a white compact SUV, the ring light glowing green, clean epoxy floor with a painted bay line
**20 · `scene-atom-ac-destination`.**
> [DOC base, left falloff 20 %] the Atom AC Destination pedestal with two Type 2 guns at a hotel porte-cochère at blue hour, one sedan charging, a doorman's podium out of focus, polished stone paving
**21 · `scene-atom-dc-fast`.**
> [DOC base, left falloff 20 %] the Atom DC Fast Charger at a highway plaza at dusk, CCS2 gun in a white SUV, the second gun holstered, a slim canopy overhead, a highway out of focus behind
Alts: "Envizon {name} {at a house / in an apartment basement / at a hotel entrance / at a highway plaza} (illustrative render)"

### Project stages: one slab, built up step by step (ISO, 1600×1200)
**The key to this set:** the same slab, the same camera and the same framing in all six. Only the contents change, so the pinned scroll on /solutions plays like a time-lapse. Generate stage 6 first, then remove elements for 5 → 1 (in-painting on the same seed).

| Slot | Stage | Scene on the same slab |
|---|---|---|
| `stage-1` | Qualify | Empty asphalt car park with faint painted bays, one car parked, a single tiny figure with a clipboard |
| `stage-2` | Survey | Same lot, survey tripod, a meter cabinet door open, dashed green chalk lines marking a cable route and future bays |
| `stage-3` | Design & quote | Same lot with translucent glowing-green "ghost" outlines of the future chargers, transformer pad and cable trench (like a holographic plan, subtle, no text) |
| `stage-4` | Deploy | Open cable trench with green conduits, a small excavator, a transformer being placed, chargers on pallets |
| `stage-5` | Launch | Chargers installed and lit, bays painted, first car plugged in, a tiny handover figure pair |
| `stage-6` | Operate | Busy finished site at night: three cars charging, a service van at one unit, soft green glow on every bay |
Alt: "Isometric car park at the {qualify/survey/design/deploy/launch/operate} stage of a charging project (illustrative render)"

---

## 4. Hand-back checklist
- [ ] File name and size exactly as listed, in `assets/img/gen/`.
- [ ] Background `#0E1C18` on every ISO slot (sample it). Left falloff on every DOC hero.
- [ ] No text, numbers or logos anywhere (zoom to 200 % on fascias and signs).
- [ ] Connectors correct per §1 rule 1. Chargers match the Atom cut-outs.
- [ ] No warm or golden light, no yellow or gold accents.
- [ ] Stage set: all 6 overlay pixel-aligned (toggle between them).
- [ ] Segment set: same slab size and camera in all 6.
- [ ] Each WebP under 300 KB (heroes under 450 KB).

# Antigravity: Brochure v2 image brief (18 images)

**Your task:** generate the 18 images below and save each one with the exact file name, folder and pixel size given. Work in priority order (P1 first). Never overwrite files in `assets/img/` except the three `neo-*.webp` files, which don't exist yet. Don't edit any HTML, CSS or JSON. Going live is a separate step (see the end).

**Why:** the website now sells only the **Envizon NEO Smart Series** DC fast chargers (60/120, 180/240 and 360 kW). The current images show the old AC wall boxes or residential scenes, so they need replacing.

---

## A. Rules for every image

**The charger (NEO Smart Series look).** It must match in every image.
- A tall, floor-standing rectangular cabinet, about 1.1 m wide × 2.0 m tall × 0.85 m deep. It stands as tall as an adult.
- Warm cream powder-coated body with a softly rounded top, a brand-green side panel with louvred vents, and a brushed-steel plinth. The green runs from `#4E9A1E` to `#71BF45`.
- A logo panel at the top front (leave it blank or soft, never readable text).
- A green shield-shaped bezel around a near-square touchscreen, with a thin vertical green light bar on each side. The screen shows a soft two-column A / B layout, never readable text.
- Below the screen: an RFID tap symbol and a small QR square, then a red emergency-stop button with a yellow ring.
- **Two CCS2 guns holstered side by side on the front face**, each holster with a short green status light above it. The thick black cables loop down and out to the left and right. Never show loose or extra cables.
- Two green diagonal stripes with thin circuit-trace lines across the lower front.
- **Reference:** attach `assets/img/neo-60-120.webp` (cut out of the brochure page 6 lineup). It is the real product; match it.

**Never show:** wall-mounted chargers, wall boxes, Type 2 or home sockets, coiled home cables, or chrome or futuristic chargers.

**Indian context:**
- Right-hand-drive cars: compact SUVs, hatchbacks and sedans, white or light grey.
- Delivery vans, electric trucks, intercity coaches.
- Indian commercial architecture with a Bengaluru or Hyderabad feel, neem and palm planting.

**No text anywhere:** no letters, numbers, logos, brand badges, readable signs or legible number plates.

**Colour:**
- Deep green-black `#0E1C18` is the background and shadow tone. Never use pure black.
- Brand green `#16B14C` appears **only as emitted light** (LED strips, screen glow, glowing bay lines) and as the charger's own green side panels. Never paint walls or ground green.
- No warm golden light, orange or yellow tones.

### Three styles

| Code | Style |
|---|---|
| **CUT** | Studio product render on a transparent background. If your model can't output transparency, render on a flat, evenly lit `#F2F2F2` background, then remove the background cleanly, keeping the soft contact shadow as a separate semi-transparent layer. |
| **DOC** | Photoreal documentary photo at blue hour or early dusk, with a cool neutral grade, shallow depth of field and natural light. **The left 40% of the frame falls off into deep green-black shadow (`#0E1C18`)** so white headline text can sit there. Keep the subject in the right 55%. The centre-right must survive a 4:5 portrait crop for phones. |
| **ISO** | An isometric 3D diorama on one floating matte light-concrete slab, against a **flat, empty deep green-black background (`#0E1C18`)**. 30° isometric camera, soft top-left studio light, gentle ambient occlusion. Bay lines and slab edges glow soft brand green. White vehicles. Small tropical planters as the only greenery. Tiny figures only, if any. Leave lots of empty background around the slab. |

### Negative prompts (append the matching one to every prompt)

- **NEG-ALL:** text, letters, numbers, logos, watermark, brand badges, readable signage, number plates, wall-mounted charger, wallbox, home socket, coiled home cable, chrome charger, sci-fi charger, neon, holograms, lightning-bolt icons, energy particles, light trails, lens flare, HDR halos, golden hour, warm yellow light, orange accents, gold trim, teal-and-orange grade, left-hand drive, Western suburb, snow, warped connector, extra cables, cables going nowhere, melted plastic, extra fingers, distorted hands, people looking at camera, stock smile, handshake, oversaturated green, fluorescent green walls or ground
- **NEG-ISO:** NEG-ALL + white background, gradient background, horizon, sky, clutter, busy background, photographic grain
- **NEG-CUT:** NEG-ALL + background scene, floor texture, reflections of a room, cropped cables, cropped feet of the cabinet

### Export

- WebP, quality 82, sRGB, at the **exact pixel size listed**.
- Generate at the listed aspect ratio, then resize or crop to the exact size. Don't stretch.
- Product cut-outs keep transparency.

---

## B. The images

### P1 · 01 · `assets/img/neo-60-120.webp`
**CUT · 1000×1400 (5:7), transparent**
> Studio product render of an Envizon NEO Smart Series 60/120 kW DC fast EV charger. Three-quarter front view, turned 25° to the left, camera slightly below eye level, whole cabinet in frame with a small margin. A tall floor-standing rectangular cabinet, 1100 mm wide × 2000 mm tall, off-white powder-coated body, brand-green angled side panels and a green diagonal base stripe. A dark charcoal bezel holds a 10.1-inch portrait touchscreen glowing with soft abstract green shapes. Red emergency-stop button below the screen, small RFID pad beside it. Two CCS2 charging guns holstered, one on each side, with thick black cables looping down neatly. This is the most compact model in the range: slim side vents and clean flat panels. Soft top-left key light, gentle rim light, soft contact shadow under the base. Photoreal materials, crisp edges, transparent background.
>
> Negative: NEG-CUT

### P1 · 02 · `assets/img/neo-180-240.webp`
**CUT · 1000×1400, transparent.** Same camera, light and scale as 01, so the three sit side by side.
> Studio product render of an Envizon NEO Smart Series 180/240 kW DC fast EV charger, identical camera angle, lighting and scale to the 60/120 render. The same off-white cabinet with brand-green angled side panels and base stripe, charcoal bezel with a 10.1-inch portrait touchscreen glowing soft green, red emergency-stop button and RFID pad. Two CCS2 guns holstered, one each side, with thicker black cables. Taller ventilation louvres on the sides and a slightly deeper body than the 60/120. Soft top-left key light, soft contact shadow, photoreal, transparent background.
>
> Negative: NEG-CUT

### P1 · 03 · `assets/img/neo-360.webp`
**CUT · 1000×1400, transparent.** Same camera, light and scale as 01.
> Studio product render of an Envizon NEO Smart Series 360 kW DC fast EV charger, the flagship, with identical camera angle, lighting and scale to the 60/120 render. The same off-white cabinet with brand-green angled side panels and base stripe, charcoal bezel with a 10.1-inch portrait touchscreen glowing soft green, red emergency-stop button and RFID pad. Two CCS2 guns holstered, one each side, on heavy liquid-cooled-style black cables. Large side vents and a thin green status light bar along the top edge. Soft top-left key light, soft contact shadow, photoreal, transparent background.
>
> Negative: NEG-CUT

### P1 · 04 · `assets/img/gen/hero-chargers.webp`
**DOC · 2560×1440 (16:9).** /chargers page hero.
> Photoreal blue-hour photograph of an Indian commercial charging forecourt with a Bengaluru feel. Three NEO Smart Series DC fast chargers stand in a neat row under a slim modern steel canopy with downlights: tall off-white cabinets with brand-green side panels and glowing 10.1-inch screens. A white compact SUV is plugged into the nearest charger with a CCS2 gun. Wet concrete reflects faint green LED light, with neem trees and a glass office block softly out of focus behind. The left 40% of the frame falls off into deep green-black shadow for headline text. Subject in the right 55%. Cool neutral colour grade, shallow depth of field, 35 mm lens, calm premium mood.
>
> Negative: NEG-ALL

### P1 · 05 · `assets/img/gen/hero-contact.webp`
**DOC · 2560×1440.** /contact page hero.
> Photoreal dusk photograph at an open-air EV charging hub in India. An Indian field-support engineer in his late 30s, wearing a plain dark-grey polo shirt with no logo and holding a tablet under one arm, stands in profile talking on a phone beside a NEO Smart Series DC fast charger (tall off-white cabinet, brand-green side panels, glowing screen). A white sedan charges on a CCS2 cable behind him. Calm, competent, mid-conversation; he is not looking at the camera. The left 40% of the frame falls into deep green-black shadow. Subject in the right 55%. Cool neutral grade, shallow depth of field, 50 mm lens.
>
> Negative: NEG-ALL

### P1 · 06 · `assets/img/gen/hub-concept.webp`
**ISO · 1600×1200 (4:3).** Solutions › "4 machines. 8 bays."
> Isometric 3D diorama of an EV destination charging hub on a single floating matte light-concrete slab, against a flat empty deep green-black background. Exactly four NEO Smart Series DC fast chargers (tall off-white cabinets with green side panels) stand in a straight row on a central island under one long slim canopy. Each charger serves two parking bays, one on each side, for exactly eight marked bays. The bay lines glow soft brand green. Six white cars and one white delivery van are parked and charging, each with a single cable to the nearest charger; one bay is empty. A compact transformer kiosk and electrical panel sit at one end, with faint green lines marking buried cable routes. Small palm planters at the slab corners. 30° isometric camera, soft top-left light, ambient occlusion, generous empty background.
>
> Negative: NEG-ISO

### P2 · 07 · `assets/img/gen/seg-highway.webp`
**ISO · 1600×1200.** Solutions › Highway & transport corridors.
> Isometric 3D diorama of an Indian highway service plaza on a floating matte concrete slab, against a flat deep green-black background. A strip of multi-lane highway with lane markings runs along one edge, with a slip road into the plaza. Four high-power NEO Smart Series DC chargers stand under a canopy. A white intercity SUV, a sedan and a small white electric coach are charging. There is a small café kiosk block, palm planters, and a fenced compact transformer yard. Bay lines and slab edges glow soft brand green. 30° isometric camera, soft top-left light, generous empty background.
>
> Negative: NEG-ISO

### P2 · 08 · `assets/img/gen/seg-industrial.webp`
**ISO · 1600×1200.** Solutions › Industrial & infrastructure.
> Isometric 3D diorama of the corner of an Indian industrial facility on a floating matte concrete slab, against a flat deep green-black background. A clean light-grey warehouse façade with three loading docks and a transport-terminal canopy. Three NEO Smart Series DC chargers serve two white electric trucks and a white van, with a substation kiosk and neat cable trays. Orderly and uncluttered, with bay lines glowing soft brand green and two tiny worker figures in plain overalls. 30° isometric camera, soft top-left light, generous empty background.
>
> Negative: NEG-ISO

### P2 · 09 · `assets/img/gen/scene-neo-60-120.webp`
**DOC · 1600×1200 (4:3).** NEO 60/120 page › Key features.
> Photoreal early-dusk photograph at an Indian shopping-mall forecourt. A single NEO Smart Series DC fast charger, a compact off-white cabinet with brand-green side panels and a glowing screen, charges a white hatchback through a CCS2 cable. The mall entrance glows softly out of focus behind, with palms. The left 35% falls into deep green-black shadow. Charger in the right half, eye-level camera, cool neutral grade, shallow depth of field.
>
> Negative: NEG-ALL

### P2 · 10 · `assets/img/gen/scene-neo-180-240.webp`
**DOC · 1600×1200.** NEO 180/240 page › Key features.
> Photoreal dusk photograph at an Indian logistics depot. Two NEO Smart Series DC fast chargers (off-white cabinets, brand-green side panels, glowing screens) charge a line of white electric delivery vans, each van with one CCS2 cable. A warehouse with roller shutters and soft yard lights sits behind. The left 35% falls into deep green-black shadow. Cool neutral grade, shallow depth of field, eye-level camera.
>
> Negative: NEG-ALL

### P2 · 11 · `assets/img/gen/scene-neo-360.webp`
**DOC · 1600×1200.** NEO 360 page › Key features.
> Photoreal night photograph at an Indian highway charging hub. A NEO Smart Series 360 kW DC fast charger (off-white cabinet, brand-green side panels, green status light bar on top, glowing screen) charges a white compact SUV through a heavy CCS2 cable. Highway lights and a canopy are blurred into soft bokeh behind. The left 35% falls into deep green-black shadow. Cool neutral grade, shallow depth of field, low camera angle that makes the charger feel powerful.
>
> Negative: NEG-ALL

### P2 · 12 · `assets/img/gen/hero-solutions.webp` (replaces the current file)
**DOC · 2560×1440.** /solutions page hero. Back up the old file as `hero-solutions.old.webp` first.
> Photoreal wide blue-hour photograph of one continuous Indian commercial site seen from a slightly elevated angle. On the left-centre, a retail forecourt where a white car charges at a NEO Smart Series DC charger. In the middle, a fleet bay where two white electric vans charge at two NEO chargers under a slim canopy. Far right, glimpsed through trees, a highway-side charging canopy. Every charger is a tall off-white floor-standing cabinet with brand-green side panels. Office and retail buildings only, no apartment blocks. The left 40% falls into deep green-black shadow. Cool neutral grade.
>
> Negative: NEG-ALL

### P2 · 13–18 · `assets/img/gen/stage-1.webp` … `stage-6.webp`
**ISO · 1600×1200 each.** Turnkey execution steps. **All six use the same slab, the same camera and the same layout of four bays**, so they read as one site progressing. Start every prompt with this shared opening, then add that stage's line:

> Isometric 3D diorama on a floating matte light-concrete slab, against a flat empty deep green-black background. The same small commercial car park with four parking bays, viewed from an identical 30° isometric camera, with soft top-left light and ambient occlusion. Small palm planters at two corners. Tiny figures only, in plain work clothes.

| File | Stage | Add to the prompt |
|---|---|---|
| `stage-1.webp` | Feasibility | Empty car park, bays unmarked. One surveyor with a tripod and a small electrical meter by the site's existing panel. Faint green outline circles mark possible charger spots. |
| `stage-2.webp` | Design & engineering | The same empty car park, overlaid with a translucent glowing-green wireframe plan: bay outlines, two charger positions and dashed cable routes running to the panel. |
| `stage-3.webp` | Procurement | Two crated chargers on pallets and a cable drum on the slab, with a small white delivery truck reversing in at the edge. |
| `stage-4.webp` | Installation | Open cable trenches, a cable drum and two concrete plinths with NEO chargers being placed on them. Two workers and a small mini-excavator. |
| `stage-5.webp` | Commissioning | Trenches closed. Two NEO chargers installed with screens lit, a technician holding a tablet, and one white test car connected by a single cable. |
| `stage-6.webp` | Handover | Finished site: bay lines glowing green, three white cars charging, and two tiny figures by the chargers, one handing a binder to the other. |

Negative for all six: NEG-ISO

---

## C. When you're done

1. List every file you saved with its pixel size, and flag any you're unsure about.
2. **Don't make anything live yourself.** The site owner reviews the images first.

After the owner approves (for whoever runs the site):
- **Product images 01–03** go live as soon as you run `node build.mjs`. In `index.html`, in the `#chargers` picker, change the three `/assets/img/atom-dc-fast.webp` sources to `neo-60-120.webp`, `neo-180-240.webp` and `neo-360.webp`, in that order.
- **Everything else:** set `"approved": true` for that slot in `content/images.json`, then run `node build.mjs`. The slot ids are `hero-chargers`, `hero-contact`, `hub-concept`, `seg-highway`, `seg-industrial`, `scene-neo-60-120`, `scene-neo-180-240`, `scene-neo-360`, `hero-solutions` (already approved, so the new file replaces the old one directly) and `stage-1` … `stage-6`.

---

## D. Redo: `hub-concept.webp` (review, 24 Nov 2026)

**What's wrong with the first version:** it shows 9 bays (5 front, 3 back, 1 empty) and the back-row cars have no cables. The section headline is "4 machines. 8 bays.", so the count must be exact. Everything else (style, slab, kiosk, canopy) is right, so keep it.

Regenerate at the same size (ISO · 1600×1200), overwriting `assets/img/gen/hub-concept.webp`:

> Isometric 3D diorama of an EV destination charging hub on a single floating matte light-concrete slab, against a flat empty deep green-black background. A raised central island runs left to right across the slab, under one long slim canopy. On the island stand **exactly four** NEO Smart Series DC fast chargers (tall off-white cabinets with green side panels), evenly spaced. **Exactly eight parking bays**, glowing soft green: **four bays in front of the island and four bays behind it**, each bay directly facing one charger, so every charger serves one bay in front and one bay behind with one cable each. **Seven** white vehicles (six cars and one van) are parked nose-in and charging. Each has a single visible cable to its charger. **One bay**, at the back right, is empty. A compact transformer kiosk sits at the left end of the island, with faint green lines for buried cables. Small palm planters at the four slab corners. 30° isometric camera, soft top-left light, ambient occlusion, generous empty background.
>
> Negative: NEG-ISO + extra parking bays, ninth bay, cars without cables, cars parked across bays

**Check before you deliver:** count 4 chargers, 8 bays, 7 vehicles each with a cable, and 1 empty bay.

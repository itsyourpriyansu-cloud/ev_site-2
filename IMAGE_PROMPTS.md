# Envizon EV landing page: image and video generation brief

This brief is for the build agent (Antigravity). It covers:
- the images and videos to generate for every slot on `index.html`;
- the exact output specs;
- how to drop the results in without touching any code.

**Keep the file names below.** The page already points at these paths, so a same-name file at the same aspect ratio replaces the old one with no code change. If a slot needs a different aspect ratio, see section 4.

---

## 1. Visual system (apply to every prompt)

**Brand palette.** Use these hex values in prompts and in grading.

| Role | Hex | Where it shows |
|---|---|---|
| Deep surface | `#0E1C18` | dark sections, image backgrounds |
| Ink | `#183028` | footer, text |
| Brand green | `#16B14C` | accent light strips, status LEDs, cable glow |
| Lime | `#71BF45` | secondary highlights |
| Mint | `#D6F1DB` | soft rim light, reflections |
| Forest gradient | `#052E1C → #07683A → #0C7A3D` | hero and partner grading |

**Two visual families. Don't mix them inside one slot.**

1. **Isometric dioramas** (process steps, solutions, support).
   - A miniature architectural model on a floating plinth.
   - Viewed in true isometric, about 30° from above and 45° around.
   - Background is a solid `#0E1C18` that blends into the dark image frames on the page.
   - Plinth in light concrete and white stone.
   - Thin **green (`#16B14C`) light strips** run along roads, cable trenches and canopy edges.
   - These replace the warm amber strips in the current images, so the art matches the green interface.
   - Soft studio light from the top left, gentle contact shadows.
   - Crisp product-render finish (Octane or Redshift look).
2. **Photography** (hero, partners, FAQ, footer).
   - Real-world Indian settings: Bengaluru, Mumbai, Delhi NCR, Pune.
   - Indian people where people appear.
   - Natural daylight or blue hour.
   - Graded slightly cool, with deep green shadows and mint highlights.
   - Shallow depth of field; looks shot on a 35mm or 50mm prime.

**Design psychology to keep.** Each slot has one job:
- **Hero:** calm confidence. One clear charging moment and nothing busy, so the headline does the talking.
- **Solutions:** recognition ("that's my kind of site"). Each image is unmistakably one site type.
- **Process:** progress and certainty. Each image shows the tangible output of that step.
- **FAQ panel:** reassurance. A real person helping.
- **Partners:** opportunity. A busy, healthy charging site seen from a host's point of view.
- **Footer:** momentum. Close, human, a plug going in.

**Hard rules for every image.** These come from the project's CLAUDE.md "BLOCKED" content.
- **No text, numbers, kW figures, prices or signage** of any kind. That includes the charger screens: show a soft green UI glow, never readable text.
- **No logos:** not Envizon's, not car makers', not any competitor's. Car bodies stay unbadged.
- **No phone numbers, emails, QR codes or social icons.**
- **Connectors:** CCS2 on DC chargers, Type 2 on AC chargers. Never Tesla/NACS and never CHAdeMO.
- **Indian road context:** left-hand traffic and Indian plates, blank or out of focus.
- **Charger design language:**
  - matte white or silver body with a black front panel;
  - a green LED status strip;
  - a slim modern pedestal.
  - It must **not** copy any real brand's charger, in particular Plugzmart Eclipz, Tata Power or Statiq.

**Universal negative prompt** (append to every image prompt):
```
text, letters, numbers, watermark, logo, brand badge, signage, readable screen UI, QR code, price tag, Tesla connector, CHAdeMO, right-hand-drive US roads, warm orange amber light strips, cluttered background, lens flare, oversaturated, cartoon, low poly, plastic toy look, distorted hands, extra fingers, duplicated cars, warped cables
```

---

## 2. Slot-by-slot prompts

Specs are the **export size**. The column after that is where the image appears and how it's cropped on the page. Export everything as **WebP, quality 80**, unless noted.

### A. Hero (top of page)

**A1. `assets/img/hero-charge-poster.webp`: 1920×1080 (16:9)**
- Poster frame for the hero video, and the page's main image for load speed (LCP).
- The headline sits top left, so keep the left 45% calm and darker.

```
Cinematic close-up photograph of a hand plugging a CCS2 charging connector into the charging port of a modern unbadged white electric SUV, parked at a premium covered charging bay in Bengaluru at blue hour. The car and connector sit in the right half of the frame; the left half falls into soft deep green-black shadow (#0E1C18) for headline space. A slim white-and-black DC charger with a green LED status strip glows softly out of focus behind. Cool cinematic grade, deep forest-green shadows, mint highlights on the car's paint, shallow depth of field, 35mm, photorealistic, calm and premium.
```

**A2. `assets/video/hero-charge-1920.mp4` (1920×1080) and `hero-charge-960.mp4` (960×540)**
- A loop of the same scene: the connector seats, the charger's LED strip pulses green twice, and the camera pushes in very slowly.
- 8–10 s, seamless loop, no audio, H.264, under 4 MB for 1920 and under 1.5 MB for 960.
- Its first frame must match A1.

### B. Product renders (hero card, Atom Range picker, 3D tour fallback)

All four products share one series design:
- matte white shell, black glass front, green LED strip;
- soft studio light, a three-quarter view from the front left.

Each must be a **transparent background** cutout: export as PNG with alpha, then WebP with alpha.

| File | Export | Aspect (must match) | Prompt subject |
|---|---|---|---|
| `assets/img/atom-ac-socket.webp` | 660×820 | 0.80 | Compact wall-mounted smart charging socket with an IEC 60309 socket and a thin green status ring, on a small white wall plate |
| `assets/img/atom-ac-wallbox.webp` | 368×698 shown; export 736×1396 | 0.527 | Slim rounded wall-mounted AC wallbox with a coiled black Type 2 cable hanging below, a green LED bar on its face |
| `assets/img/atom-ac-destination.webp` | 234×698 shown; export 468×1396 | 0.335 | Tall slim AC pedestal charger, single Type 2 gun holstered on the side, small dark display window, green LED strip |
| `assets/img/atom-dc-fast.webp` | 496×698 shown; export 992×1396 | 0.71 | Floor-standing DC fast charger with two CCS2 guns holstered left and right, a central dark 7-inch display window with a soft green glow (no text), green LED strips on both side edges, black plinth |

Prompt template:
```
Studio product render of [SUBJECT], original industrial design (not any existing brand), matte white powder-coated shell with black glass front, thin #16B14C green LED accent, three-quarter front-left view, soft large softbox key light from top left, subtle mint rim light, realistic cable and connector detail, isolated on a fully transparent background, crisp edges, no shadow on the background, photoreal, 8k product photography
```

`atom-dc-fast.webp` appears three times: the hero card, the picker, and the tour fallback. If its aspect changes, update the CSS too (see section 4).

### C. Solutions rows (image that follows the cursor)

- Shown in a **4:3** floating card, at most 340px wide, on a `#0E1C18` frame.
- Export **1600×1200**.
- Use the isometric diorama family. Centre the subject so a 4:3 crop never cuts it.

| File | Site type | Prompt subject |
|---|---|---|
| `assets/img/night-canopy.webp` | Commercial Charging | A mall or hotel forecourt with a sleek charging canopy, four DC charging bays and two cars charging, glass storefront behind, green light strips on the canopy edge |
| `assets/img/model-site-operator.webp` | Residential Communities | The basement or stilt parking of an Indian apartment society, six wall-mounted AC wallboxes on pillars, residents' cars in marked bays, a building block above |
| `assets/img/charger-120.webp` | Fleet Charging | A fleet depot yard with a row of electric delivery vans and two e-buses at high-power DC chargers, overhead cable trays, green-lit lane markings |
| `assets/img/model-turnkey.webp` | Charging Infrastructure | A site under construction: a transformer and LT panel, open cable trench with conduits, a mini excavator, two chargers being installed on fresh plinths |

Prompt template:
```
Isometric miniature architectural diorama of [SUBJECT], floating on a light concrete and white stone plinth, true isometric camera 30° elevation, thin glowing #16B14C green light strips along roads, trenches and canopy edges, soft top-left studio light, gentle contact shadows, tiny realistic details, Indian urban context, solid #0E1C18 background, centred composition with generous margin, premium 3D render, Octane look
```

### D. How it works bento (five process steps)

- Each card shows its image at **full card width × 180–240px tall**. That is a wide crop, between about 1.4:1 and 2.4:1.
- Export **1600×1000**. Keep the subject in the **centre 60% horizontally and the middle band vertically**.
- Use the isometric diorama family, as in section C.
- The image must show the step's **output**, the "You get" line on the card.

| File | Step and output | Prompt subject |
|---|---|---|
| `assets/img/activation-roadmap.webp` | 01 Consult → project brief | A small consultation table scene: a planner's desk with a rolled-out site plan and a tablet showing a soft green site map (no text), a miniature model of the client's parking area beside it |
| `assets/img/deployment-cutaway.webp` | 02 Site feasibility → feasibility report | A cutaway section of a parking bay: the soil layers, the cable route from the LT panel to two charger plinths shown as glowing green conduits, a surveyor's tripod on top |
| `assets/img/price-equipment.webp` | 03 Charger selection → charger configuration | Three chargers of different sizes (wall socket, AC pedestal, DC fast) lined up on a white turntable plinth, one highlighted by a green light ring, an unbadged car beside it |
| `assets/img/price-project.webp` | 04 Installation & commissioning → documented handover | A finished installation: two chargers on fresh plinths with bollards, neat cable tray, a technician in an orange-free hi-vis vest (use green or white PPE) handing over a closed folder |
| `assets/img/support-hub.webp` | 05 Monitoring & support → tracked service loop | A circular service hub: a central charger surrounded by four small desks with monitors glowing soft green (no readable UI), a service van at one edge, a looping green light path connecting them |

### E. FAQ help card

**`assets/img/faq-cta.webp`: 1600×750 (about 2.1:1)**
- Shown on a dark card with a gradient that is darkest on the left. Put the subject in the **right third**.

```
Photograph of a friendly Indian customer-support engineer wearing a headset, smiling while helping a site owner on a video call, modern bright office in Pune, the person positioned in the right third of the frame, left two-thirds soft out-of-focus office with deep green tones, natural window light, cool grade with mint highlights, shallow depth of field, 50mm, photoreal, warm and reassuring
```

### F. Partners section

**F1. `assets/img/partners-poster.webp`: 1920×1080, plus the video `assets/video/partners-1920.mp4` / `partners-960.mp4`**
- A dark gradient covers the left 60%, where the headline sits, so the action belongs on the right.

```
Wide cinematic photograph of a busy, healthy public EV charging hub at a highway food plaza in India at golden-to-blue hour, four slim white DC chargers with green LED strips, three unbadged electric cars charging, a host's café terrace with people in the background, action concentrated in the right half, left half darker open sky and forecourt, cool grade with deep green shadows, 35mm, photoreal, aspirational
```
- **Video:** the same scene with a slow lateral dolly, a car pulling into a bay and the LED strips pulsing. 10–12 s seamless loop, no audio. Same encoding limits as A2.

### G. Footer banner

**`assets/img/footer-ev-poster.webp`: 1080×1080, plus the video `assets/video/footer-ev.mp4` (1080×1080)**
- Shown in a cell about 290px wide and 330px tall, cropped to cover the cell. A pill with a rotating tagline sits in the centre, so keep the centre visually quiet.

```
Close-up photograph of a hand lifting a Type 2 charging connector from a white wallbox toward a white unbadged car's charging port, soft daylight, subject framed at the top-left and bottom-right edges leaving a calm blurred centre, cool grade with mint highlights, shallow depth of field, photoreal
```
- **Video:** the plug-in motion, 6–8 s, seamless loop, under 2 MB.

### H. Social share image

**`assets/brand/og.jpg`: 1200×630 JPEG.** This is the only image allowed a logo, and only the supplied file `assets/brand/logo-full-white.svg`, placed by code or by hand. Never let the image generator render the logo.

```
Premium wide photograph of a slim white DC charger with a green LED strip charging an unbadged white electric SUV under a modern canopy at blue hour, deep forest-green grade, clean dark negative space in the left half for a logo overlay, photoreal
```

---

## 3. Not generated (leave as is)

- **Car-maker logos** in `assets/logos/*.svg`: these are official vector marks, not artwork. Don't regenerate them.
- **Layer stack icons and Why tile icons:** inline SVG in `index.html`.
- **3D tour model** `assets/3d/concept-eclipz-240.glb`:
  - This is a **concept placeholder that must not go live**.
  - The image generator cannot replace it. It needs a 3D artist.
  - Spec for the artist:
    - glTF binary (`.glb`) under 3 MB, Draco-compressed, PBR materials;
    - origin at the floor centre, about 1.9 m tall, front facing +Z;
    - same design as `atom-dc-fast.webp`.
  - After swapping it in, re-tune the six `data-cam` camera stops and the 15 `data-position` pins inside `#inside` in `index.html`.
- **Unused files** that can be deleted: `delivery-team.webp`, `charger-60.webp`, `charger-240.webp`.

---

## 4. Wiring checklist for the build agent

1. Generate each asset and export it at the size given above.
2. Save it over the existing file **at the same path and name**.
3. **Aspect ratio changes** in section B need code edits:
   - **`atom-dc-fast.webp`:** update `aspect-ratio: 496 / 698` on `.tour-pic` in `style.css`. Also update the `width`/`height` attributes on its `<img>` tags in `index.html` (the hero card, the `#atom-dc-fast` picker panel, and `.tour-pic`).
   - **Other product renders:** they use `object-fit: contain`, so any ratio works. Still set the matching `width`/`height` attributes on their `<img>` tags to avoid layout shift.
4. **Videos:**
   - Keep `muted`, `playsinline` and `loop`.
   - The first frame must equal the poster image, so there's no flash on load.
   - Run `ffmpeg -i in.mov -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -an out.mp4`.
5. **Keep `assets/img/hero-charge-poster.webp` under 250 KB.** It is the page's main image for load speed (LCP), and the page preloads it in `<head>`.
6. **Check nothing breaks.** Run `python -m http.server 5173` in the project folder and open `http://localhost:5173`. Check each section at 1440 px and 375 px wide.
7. **Check every image against the "Hard rules"** in section 1: no text, no logos, no prices, and the correct connectors.

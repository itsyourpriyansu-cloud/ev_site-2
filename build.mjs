// Renders content/pages.json into <route>/index.html (+ 404.html), using index.html as the shell
// (head, sprite, header, footer, quote dialog), so every page shares one header, footer and form.
// Run: node build.mjs   (optional: SITE_URL=https://example.com node build.mjs for canonical/og:url/JSON-LD)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const root = new URL('.', import.meta.url);
const read = f => readFileSync(new URL(f, root), 'utf8');
const P = JSON.parse(read('content/pages.json'));
const ICONS = JSON.parse(read('content/icons.json'));
const SLOTS = JSON.parse(read('content/images.json')).slots;
const SITE = (process.env.SITE_URL || '').replace(/\/$/, '');
const shell = read('index.html');

// ---------- shell parts ----------
const cut = (a, b) => { const i = shell.indexOf(a), j = shell.indexOf(b, i); if (i < 0 || j < 0) throw new Error(`shell marker missing: ${a} … ${b}`); return [i, j]; };
const [hEnd] = cut('</head>', '<body>');
const [mStart] = cut('<main id="main">', '</main>');
const mEnd = shell.indexOf('</main>') + '</main>'.length;
const HEAD = shell.slice(0, hEnd), PRE = shell.slice(hEnd, mStart), POST = shell.slice(mEnd);
const KNOB = shell.match(/<span class="bp-knob" aria-hidden="true">[\s\S]*?<\/i><\/span>/)?.[0];
const FOOT_CTA = /(<span class="ft-h">Get Started with Us<\/span>\s*)<h2>[\s\S]*?<\/h2>\s*<button type="button" class="btn-pill" data-quote="GENERAL">Get a Quote<\/button>/;
if (!KNOB || !FOOT_CTA.test(POST)) throw new Error('shell changed: primary-button knob or footer CTA not found');

// ---------- helpers ----------
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const live = arr => (arr || []).filter(x => x?.status !== 'BLOCKED');
const pad = n => String(n).padStart(2, '0');
const QUOTE_ICON = { PRODUCT_QUOTE: 'i-quote', SITE_ASSESSMENT: 'i-pin', FLEET: 'i-arrow', PARTNERSHIP: 'i-arrow', GENERAL: 'i-call' };
const SEG_OF_ICON = { home: 'residential', apartment: 'residential', office: 'commercial', mall: 'commercial', hotel: 'commercial', depot: 'fleets', highway: 'public' };
const STANDARD_PROTECTIONS = ['Over/under-voltage', 'Over-current', 'Short circuit', 'Leakage current', 'Earth fault', 'Surge', 'Over-temperature'];
const products = live(P.products), bySlug = Object.fromEntries(products.map(p => [p.slug, p]));
let usedIcons, footCta;

const icon = name => { if (!name) return ''; usedIcons.add(name); return `<svg class="ico" aria-hidden="true"><use href="#u-${esc(name)}"/></svg>`; };
const abs = path => SITE + path;

// image slot: the generated file once approved (and present), otherwise the fallback
function pic(slot, image, alt) {
  const s = SLOTS[slot];
  if (s?.approved && existsSync(new URL('.' + s.file, root))) return { src: s.file, alt: s.alt };
  return { src: image || s?.fallback, alt: image ? alt : (s?.alt ?? alt) };
}
const img = (p, extra = '') => p.src ? `<img src="${esc(p.src)}" alt="${esc(p.alt)}" ${extra || 'loading="lazy" decoding="async"'}>` : '';

// one CTA object -> button or link. type = opens the quote dialog; href = navigates
function btn(c, { dark = false, small = false } = {}) {
  if (!c) return '';
  const data = c.type ? ` data-quote="${esc(c.type)}"${c.product ? ` data-product="${esc(c.product)}"` : ''}${c.partner ? ` data-partner="${esc(c.partner)}"` : ''}` : '';
  const sm = small ? ' btn-sm' : '';
  if (c.type && !c.ghost) return `<button type="button" class="btn btn-primary${sm}"${data}>${KNOB.replace(/#i-[a-z]+/, '#' + (QUOTE_ICON[c.type] || 'i-arrow'))}<span class="bp-label">${esc(c.label)}</span></button>`;
  const cls = `btn ${dark ? 'btn-glass' : 'btn-ghost'}${sm}`;
  return c.type ? `<button type="button" class="${cls}"${data}>${esc(c.label)}</button>` : `<a class="${cls}" href="${esc(c.href)}">${esc(c.label)} <em>→</em></a>`;
}
const ctaRow = (list, o) => list?.length ? `<div class="cta-row">${list.map(c => btn(c, o)).join('')}</div>` : '';

const h2 = s => s.eyebrow ? `<h2>${esc(s.eyebrow)}<span class="accent">${esc(s.title)}</span></h2>` : `<h2>${esc(s.title)}</h2>`;
const head = (s, cta, dark) => `<div class="head-row"><div class="head-copy">${h2(s)}${s.intro ? `<p class="head-note">${esc(s.intro)}</p>` : ''}</div>${btn(cta, { dark })}</div>`;
const section = (s, inner, extra = '') => {
  const tone = s.tone === 'dark' ? ' dark' : s.tone === 'soft' ? ' soft' : '';
  return `<section class="block${tone}${extra}"${s.id ? ` id="${esc(s.id)}"` : ''}>\n  <div class="wrap">\n${inner}\n  </div>\n</section>`;
};
const lines = t => esc(t).split(/(?<=[.,]) +/).map(l => `<span class="ln"><span>${l}</span></span>`).join('');

// product numbers come from data: "7.4 kW","22 kW" -> 7.4–22
// only "… kW" entries count, so "1–2 guns" is skipped
const kw = p => { const n = p.power.filter(x => /kW/.test(x)).flatMap(x => (x.match(/[\d.]+/g) || []).map(Number)); return n.length ? (Math.min(...n) === Math.max(...n) ? `${Math.min(...n)}` : `${Math.min(...n)}–${Math.max(...n)}`) : ''; };
const specVal = (p, ...names) => p.specs.flatMap(g => g.rows).find(([k, v]) => names.includes(k) && v)?.[1];
console.assert(kw({ power: ['7.4 kW', '11 kW', '22 kW'] }) === '7.4–22' && kw({ power: ['3.3 kW'] }) === '3.3' && kw({ power: ['7.4 kW', '22 kW', '1–2 guns'] }) === '7.4–22', 'kw');

// ---------- section renderers ----------
function crumbs(trail) {
  const items = [['Home', '/'], ...trail];
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([n, h], i) => i === items.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${h}">${esc(n)}</a></li>`).join('')}</ol></nav>`;
}

function hero(s, page, trail) {
  const p = pic('hero-' + page.route, s.image, s.imageAlt);
  const photo = !!p.src && page.status !== 'PAGE_PENDING';
  return `<section class="page-hero ${photo ? 'page-hero--photo' : 'page-hero--plain'}" id="top">
  ${photo ? `<div class="page-hero-media">${img(p, 'fetchpriority="high"')}</div>` : ''}
  <div class="wrap page-hero-in">
    ${crumbs(trail)}
    <div class="page-hero-copy">
      ${s.eyebrow ? `<p class="page-eyebrow">${esc(s.eyebrow)}</p>` : ''}
      <h1 class="page-title">${lines(s.title)}</h1>
      ${s.sub ? `<p class="page-sub">${esc(s.sub)}</p>` : ''}
      ${s.chips?.length ? `<ul class="chips chips--hero">${s.chips.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
      ${ctaRow(s.ctas, { dark: photo })}
    </div>
  </div>
</section>`;
}

function productCard(p, dark) {
  const specs = [specVal(p, 'Connector', 'Outlet'), specVal(p, 'Authentication', 'Control'), specVal(p, 'Ingress protection')].filter(Boolean);
  return `<article class="pcard">
      <a class="pcard-img" href="/chargers/${p.slug}/" tabindex="-1" aria-hidden="true">${img({ src: p.image, alt: '' })}</a>
      <div class="pcard-info">
        <p class="pick-kw">${kw(p)}<small>kW ${p.kind}</small></p>
        <h3><a href="/chargers/${p.slug}/">${esc(p.name)}</a></h3>
        <p>${esc(p.tagline)}</p>
        ${specs.length ? `<ul class="pick-specs">${specs.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        ${ctaRow([{ label: 'Request a Quote', type: 'PRODUCT_QUOTE', product: p.name }, { label: 'View specifications', href: `/chargers/${p.slug}/` }], { dark })}
      </div>
    </article>`;
}

function card(it, dark) {
  const p = pic(it.slot, it.image, it.imageAlt);
  const verify = it.status === 'VERIFY';
  return `<article class="card${it.contain ? ' card--contain' : ''}"${verify ? ' data-status="VERIFY"' : ''}>
      ${p.src ? `<figure class="card-img">${img(p)}</figure>` : icon(it.icon)}
      ${it.eyebrow ? `<p class="card-k">${esc(it.eyebrow)}</p>` : ''}
      <h3>${esc(it.title)}</h3>
      ${it.text ? `<p>${esc(it.text)}</p>` : ''}
      ${it.meta ? `<dl class="card-meta">${it.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
      ${verify ? '<span class="verify">To be confirmed</span>' : ''}
      ${it.links?.length ? `<div class="card-links">${it.links.map(l => btn({ ...l, ghost: !!l.type || l.ghost }, { dark, small: true })).join('')}</div>` : ''}
    </article>`;
}

function cards(s) {
  const dark = s.tone === 'dark', items = live(s.items);
  const body = items.every(i => i.product)
    ? `<div class="pcards">${items.map(i => productCard(bySlug[i.product], dark)).join('\n')}</div>`
    : `<div class="cards${s.layout === 'split' ? ' cards--split' : ''}" style="--cols:${s.cols || Math.min(items.length, 3)}">${items.map(i => card(i, dark)).join('\n')}</div>`;
  return section(s, `${head(s, null, dark)}\n${body}${s.note ? `\n<p class="cards-note">${esc(s.note)}</p>` : ''}`);
}

function segFlow(d) {
  if (!d) return '';
  return `<ol class="seg-flow" aria-label="How charging is laid out">
        <li>${icon('bolt')}<span>${esc(d.source)}</span></li>
        ${d.nodes.map(n => `<li class="is-node">${icon('plug')}<span>${esc(n)}</span></li>`).join('')}
        <li>${icon(d.icon)}<span>${esc(d.sink)}</span></li>
      </ol>`;
}

function rows(s) {
  const dark = s.tone === 'dark', items = live(s.items);
  if (s.layout === 'blocks') {
    return section(s, `${head(s)}\n<div class="seg-list">${items.map((it, i) => {
      const p = pic('seg-' + it.id, null, '');
      return `
    <article class="seg" id="${esc(it.id)}">
      <div class="seg-copy">
        <p class="seg-k"><span>${pad(i + 1)}</span> ${esc(it.eyebrow)}</p>
        <h3>${esc(it.headline)}</h3>
        <p>${esc(it.text)}</p>
        <p class="seg-h">What we cover</p>
        <ul class="seg-cover">${it.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
        <p class="seg-h">Recommended chargers</p>
        <ul class="chips">${it.chips.map(c => `<li><a href="${esc(c.href)}">${esc(c.label)}</a></li>`).join('')}</ul>
        ${ctaRow([it.cta])}
      </div>
      <figure class="seg-media">${img(p)}${segFlow(it.diagram)}</figure>
    </article>`;
    }).join('')}\n</div>`);
  }
  if (s.layout === 'steps') {
    return section(s, `${head(s)}\n<ol class="stages">${items.map((it, i) => {
      const p = pic(`stage-${i + 1}`, null, '');
      return `<li class="stage" data-item="${i}"><span class="stage-n">${pad(i + 1)} / ${pad(items.length)}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p><figure class="stage-img">${img(p)}</figure></li>`;
    }).join('\n')}</ol>`);
  }
  const media = pic(s.slot, s.image, s.imageAlt);
  return section(s, `${head(s, null, dark)}
<div class="rows${media.src ? ' rows--media' : ''}">
  ${media.src ? `<figure class="rows-img">${img(media)}</figure>` : ''}
  <ol class="rows-list">${items.map((it, i) => `<li class="row"><span class="row-n">${esc(it.num || pad(i + 1))}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></li>`).join('\n')}</ol>
  ${s.bullets ? `<ul class="rows-bullets">${s.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
</div>`);
}

function table(s) {
  const p = pic(s.slot, s.image, s.imageAlt);
  return section(s, `${head(s)}
<div class="tbl-split">
  ${p.src ? `<figure class="tbl-img">${img(p)}</figure>` : ''}
  <div class="tbl-wrap" tabindex="0" role="region" aria-label="${esc(s.title)}"><table class="tbl">
    <thead><tr>${s.head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
    <tbody>${s.rows.map(([k, ...v]) => `<tr><th scope="row">${esc(k)}</th>${v.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('\n')}</tbody>
  </table></div>
</div>`);
}

const chips = s => section(s, `${head(s)}\n<ul class="chips chips--lg">${s.items.map(c => typeof c === 'string' ? `<li>${esc(c)}</li>` : `<li><a href="${esc(c.href)}">${esc(c.label)} <em>→</em></a></li>`).join('')}</ul>`);
const flow = s => section(s, `${head(s)}\n<ol class="flow">${s.items.map((it, i) => `<li><span class="flow-n">${pad(i + 1)}</span>${icon(it.icon)}<h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></li>`).join('\n')}</ol>`);
const callout = s => section({}, `<aside class="callout"><p class="callout-k">${esc(s.eyebrow)}</p><h3>${esc(s.title)}</h3><ul>${s.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul></aside>`, ' block--tight');

// power ladder: each product as a band on a log kW scale (2–400 kW), stops link to the spec page
const LOG = k => (Math.log10(k) - Math.log10(2)) / (Math.log10(400) - Math.log10(2)) * 100;
const ladder = s => section(s, `${head(s)}
<div class="ladder"><ol class="ladder-track" aria-label="Atom range by output power">${products.map(p => {
  const [lo, hi = lo] = kw(p).split('–').map(Number);
  return `<li class="ladder-stop" style="--a:${LOG(lo).toFixed(1)}%;--b:${LOG(hi).toFixed(1)}%"><a href="/chargers/${p.slug}/"><b>${esc(p.name.replace(/^Atom (AC |DC )?/, ''))}</b><small>${kw(p)} kW ${p.kind}</small></a></li>`;
}).join('')}</ol></div>`);

function subnav(links, cta) {
  return `<nav class="subnav" aria-label="On this page"><div class="wrap subnav-in">
  <ul>${links.map(([label, href]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`).join('')}</ul>
  ${cta ? btn({ ...cta, ghost: false }, { small: true }) : ''}
</div></nav>`;
}

function faq(s, preset = { type: 'GENERAL', label: 'Talk to an Expert' }) {
  return `<section class="faq-sec" id="faq">
  <div class="wrap faq-wrap">
    <div class="faq-side">
      <div class="faq-intro">${h2(s)}</div>
      <div class="faq-panel">
        <div class="faq-panel-media" aria-hidden="true"><img src="/assets/img/faq-cta.webp" alt="" loading="lazy" width="1600" height="750"></div>
        <img class="faq-mark" src="/assets/brand/logo-mark.svg" alt="" width="54" height="28">
        <div><p class="faq-panel-title">Still have questions?</p><p>Tell us about your site and our team will get back to you with clear next steps.</p></div>
        <div class="faq-actions">${btn(preset)}</div>
      </div>
    </div>
    <div class="faq-list">
${s.items.map((q, i) => `        <details class="faq-item" name="faq"><summary><span class="faq-idx">${pad(i + 1)}</span><span class="faq-text">${esc(q.q)}</span><span class="faq-icon" aria-hidden="true"><i></i><i></i></span></summary><div class="faq-a"><p>${esc(q.a)}</p></div></details>`).join('\n')}
    </div>
  </div>
</section>`;
}

const PRESET = { chargers: { type: 'SITE_ASSESSMENT', label: 'Book a Site Assessment' }, solutions: { type: 'SITE_ASSESSMENT', label: 'Book a Site Assessment' }, partners: { type: 'PARTNERSHIP', label: 'Become a Partner' } };

function render(s, page, trail) {
  switch (s.type) {
    case 'hero': return hero(s, page, trail);
    case 'cards': return cards(s);
    case 'rows': return rows(s);
    case 'table': return table(s);
    case 'chips': return chips(s);
    case 'flow': return flow(s);
    case 'ladder': return ladder(s);
    case 'callout': return callout(s);
    case 'jump': return subnav(s.items, PRESET[page.route]);
    case 'faq': return faq(s, PRESET[page.route]);
    case 'cta': footCta = s; return '';
    case 'ref': return render(P.shared[s.ref], page, trail);
    default: throw new Error(`unknown section type "${s.type}" on /${page.route}/`);
  }
}

// ---------- product page ----------
function productPage(p) {
  const others = products.filter(o => o !== p);
  const quote = { label: 'Request a Quote', type: 'PRODUCT_QUOTE', product: p.name };
  const connector = specVal(p, 'Connector', 'Outlet') || 'Confirmed per datasheet';
  const scene = pic('scene-' + p.slug, null, '');
  const links = [['Overview', '#overview'], ['Features', '#features'], ['Use cases', '#use-cases'], ...(p.variants ? [['Variants', '#variants']] : []), ['Specifications', '#specs'], ['FAQ', '#faq']];
  const [f0, ...fRest] = p.features;
  footCta = { title: `Get a quote for the ${p.name}.`, primary: quote };
  return [
`<section class="page-hero page-hero--product" id="top">
  <div class="wrap page-hero-in">
    ${crumbs([['Chargers', '/chargers/'], [p.name]])}
    <div class="page-hero-copy">
      <p class="page-eyebrow">Atom · ${p.kind === 'DC' ? 'DC fast charger' : 'AC charger'}${p.model ? ` · ${esc(p.model)}` : ''}</p>
      <h1 class="page-title">${lines(p.name)}</h1>
      <p class="page-sub">${esc(p.tagline)}</p>
      <dl class="stats">
        <div><dt>Output</dt><dd>${kw(p)}<small>kW ${p.kind}</small></dd></div>
        <div><dt>Connector</dt><dd class="stats-txt">${esc(connector)}</dd></div>
        <div><dt>Protections</dt><dd>${p.protections.length}<small>built in</small></dd></div>
      </dl>
      ${ctaRow([quote, { label: 'See specifications', href: '#specs' }], { dark: true })}
    </div>
    <div class="page-hero-product">${img({ src: p.image, alt: p.imageAlt }, 'fetchpriority="high"')}</div>
  </div>
</section>`,
    subnav(links, quote),
    section({ id: 'overview' }, `<div class="head-row"><div class="head-copy"><h2>Overview<span class="accent">${esc(p.summary)}</span></h2></div></div>
<ul class="chips chips--lg">${p.power.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`),
    section({ id: 'features', tone: 'soft' }, `<div class="head-row"><div class="head-copy"><h2>Key features<span class="accent">Built into every unit.</span></h2></div></div>
<div class="feats">
  <article class="feat is-lg"><figure class="feat-img${scene.src && scene.src !== p.image ? '' : ' is-cutout'}">${img(scene.src ? scene : { src: p.image, alt: p.imageAlt })}</figure><div class="feat-body">${icon(f0.icon)}<h3>${esc(f0.title)}</h3><p>${esc(f0.text)}</p></div></article>
  ${fRest.map((f, i) => `<article class="feat${i === fRest.length - 1 ? ' is-mint' : ''}">${icon(f.icon)}<h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></article>`).join('\n  ')}
</div>`),
    section({ id: 'use-cases' }, `<div class="head-row"><div class="head-copy"><h2>Use cases<span class="accent">Where it fits.</span></h2></div></div>
<ul class="uses">${p.useCases.map(u => { const seg = SEG_OF_ICON[u.icon]; const inner = `${icon(u.icon)}<h3>${esc(u.title)}</h3><p>${esc(u.text)}</p>`; return `<li>${seg ? `<a class="use" href="/solutions/#${seg}">${inner}<span class="use-go" aria-hidden="true">→</span></a>` : `<div class="use">${inner}</div>`}</li>`; }).join('\n')}</ul>`),
    p.variants ? section({ id: 'variants', tone: 'soft' }, `${head({ eyebrow: 'Variants', title: 'One family, three power bands.' }, { label: 'Plan depot charging', type: 'FLEET' })}
<div class="tbl-wrap" tabindex="0" role="region" aria-label="Power bands"><table class="tbl">
  <thead><tr>${p.variants.head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
  <tbody>${p.variants.rows.map(([k, ...v]) => `<tr><th scope="row">${esc(k)}</th>${v.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('\n')}</tbody>
</table></div>`) : '',
    section({ id: 'specs' }, `${head({ eyebrow: 'Specifications', title: 'The full sheet.' }, { label: 'Request the datasheet', type: 'PRODUCT_QUOTE', product: p.name, ghost: true })}
<div class="spec">${p.specs.map(g => `
  <div class="spec-group"><h3>${esc(g.group)}</h3><dl>${g.rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v == null ? '<span class="verify">Confirmed per datasheet</span>' : esc(v)}</dd></div>`).join('')}</dl></div>`).join('')}
</div>
<p class="spec-note">Standards are listed as "designed to". Certificates are shared per model on request.</p>`),
    section({ id: 'protections', tone: 'dark' }, `<div class="head-row"><div class="head-copy"><h2>Protection<span class="accent">Guarded at every fault.</span></h2></div></div>
<ul class="chips chips--lg chips--dark">${p.protections.map(x => `<li${STANDARD_PROTECTIONS.includes(x) ? '' : ' class="is-extra"'}>${esc(x)}</li>`).join('')}</ul>`),
    section({ id: 'related' }, `<div class="head-row"><div class="head-copy"><h2>Related chargers<span class="accent">The rest of the Atom range.</span></h2></div>${btn({ label: 'All chargers', href: '/chargers/' })}</div>
<div class="related">${others.map(o => `<a class="hero-card" href="/chargers/${o.slug}/"><img src="${esc(o.image)}" alt="" width="72" height="72" loading="lazy"><span><b>${esc(o.name)}</b><small>${kw(o)} kW ${o.kind}</small></span></a>`).join('')}</div>`),
    faq({ eyebrow: 'FAQ', title: `About the ${p.name}.`, items: p.faq }, quote),
  ].join('\n');
}

// ---------- page assembly ----------
function page({ route, title, description, main, heroImg, trail, navRoute, ld = [] }) {
  let head = HEAD
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/<link rel="preload" href="\/assets\/img\/hero-charge-poster\.webp" as="image">\n?/, heroImg ? `<link rel="preload" href="${esc(heroImg)}" as="image">\n` : '');
  const url = route ? `/${route}/` : '/404.html';
  if (SITE) {
    head = head.replace('<meta property="og:image" content="/', `<meta property="og:image" content="${SITE}/`)
      + `<link rel="canonical" href="${abs(url)}">\n<meta property="og:url" content="${abs(url)}">\n`;
    if (trail) ld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ...trail].map(([name, h], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(h || url) })) });
  }
  head += ld.map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>\n`).join('');

  // inner pages: no preloader curtain; current nav item marked; page icons added to the sprite
  let pre = PRE.replace(/<!-- Preloader[\s\S]*?<div class="curtain"[\s\S]*?<\/div>\s*/, '');
  for (const r of navRoute || []) pre = pre.replaceAll(`href="/${r}/"`, `href="/${r}/" aria-current="page"`);
  if (navRoute?.includes('solutions')) pre = pre.replace('aria-controls="solMenu">', 'aria-controls="solMenu" data-current>'); // a button can't take aria-current
  const symbols = [...usedIcons].map(n => {
    const svg = ICONS.ui[n] ?? ICONS.solution[n];
    if (!svg) throw new Error(`icon "${n}" not in content/icons.json`);
    return `<symbol id="u-${n}" viewBox="0 0 ${ICONS.ui[n] ? 24 : 96} ${ICONS.ui[n] ? 24 : 96}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${svg}</symbol>`;
  }).join('');
  pre = pre.replace('</defs></svg>', symbols + '</defs></svg>');

  let post = POST;
  if (footCta) post = post.replace(FOOT_CTA, `$1<h2>${esc(footCta.title)}</h2>\n      <button type="button" class="btn-pill" data-quote="${esc(footCta.primary.type)}"${footCta.primary.product ? ` data-product="${esc(footCta.primary.product)}"` : ''}>${esc(footCta.primary.label)}</button>`);

  const html = `${head}${pre}<main id="main" data-page="${esc(route || '404')}">\n${main}\n</main>${post}`;
  const out = route ? `${route}/index.html` : '404.html';
  if (route) mkdirSync(new URL(route + '/', root), { recursive: true });
  writeFileSync(new URL(out, root), html);
  return out;
}

const NAMES = { chargers: 'Chargers', solutions: 'Solutions', partners: 'Partners', about: 'About', contact: 'Contact', privacy: 'Privacy Policy', terms: 'Terms of Use' };
const written = [];
for (const pg of P.pages.filter(p => p.status !== 'BLOCKED')) {
  usedIcons = new Set(); footCta = null;
  const trail = [[NAMES[pg.route] || pg.title]];
  const main = live(pg.sections).map(s => render(s, pg, trail)).join('\n');
  const h = pg.sections.find(s => s.type === 'hero');
  const heroImg = pg.status === 'PAGE_PENDING' ? null : pic('hero-' + pg.route, h?.image, '').src;
  written.push(page({ route: pg.route, title: pg.title, description: pg.description, main, heroImg, trail: [[NAMES[pg.route] || pg.title, `/${pg.route}/`]], navRoute: [pg.route] }));
}
for (const p of products) {
  usedIcons = new Set(); footCta = null;
  const main = productPage(p);
  const ld = [{ '@context': 'https://schema.org', '@type': 'Product', name: p.name, ...(p.model ? { model: p.model } : {}), description: p.tagline, image: abs(p.image), brand: { '@type': 'Brand', name: 'Envizon EV' } }];
  written.push(page({ route: `chargers/${p.slug}`, title: `${p.name} | ${kw(p)} kW ${p.kind} EV Charger | Envizon EV`, description: p.tagline, main, heroImg: p.image, trail: [['Chargers', '/chargers/'], [p.name, `/chargers/${p.slug}/`]], navRoute: ['chargers', `chargers/${p.slug}`], ld }));
}
usedIcons = new Set(); footCta = null;
written.push(page({ route: '', title: 'Page not found | Envizon EV Solutions', description: 'This page does not exist.', main: hero({ eyebrow: '404', title: "This page isn't here.", sub: 'The link may be old, or the page has moved. These will get you back on track.', ctas: [{ label: 'Get a Quote', type: 'GENERAL' }, { label: 'Home', href: '/' }, { label: 'Chargers', href: '/chargers/' }, { label: 'Solutions', href: '/solutions/' }, { label: 'Contact', href: '/contact/' }] }, { route: '404', status: 'PAGE_PENDING' }, [['Page not found']]) }));

console.log(`wrote ${written.length} pages:\n  ${written.join('\n  ')}`);

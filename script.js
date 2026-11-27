const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Light smooth wheel scrolling (touch stays native); skipped under reduced motion or if the CDN fails
const lenis = !reduceMotion && window.Lenis ? new Lenis({ lerp: 0.13 }) : null;
if (lenis) {
  const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  // in-page links glide with Lenis; focus still moves to the target for keyboard users
  document.addEventListener('click', e => {
    // same-page links only (#x, or /solutions/#x while on /solutions/); other pages load normally
    const a = e.target.closest('a[href*="#"]:not([data-quote])'), t = a && a.pathname === location.pathname && a.hash.length > 1 && document.querySelector(a.hash);
    if (!t) return;
    e.preventDefault();
 
    lenis.scrollTo(t, { offset: -parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) });
    history.pushState(null, '', a.hash);
    if (!t.matches('a, button, input, select, textarea, [tabindex]')) t.tabIndex = -1;
    t.focus({ preventScroll: true });
  });
}

// Preloader: slow, smooth typing -> EV toggle switch -> pill engulfs text -> full-height color-shift zoom reveal
const curtain = document.getElementById('curtain');
if (!curtain || reduceMotion) {
  curtain?.classList.add('done');
  document.body.classList.add('ready');
} else {
  document.body.classList.add('curtain-lock');
  lenis?.stop();
  const caret = document.getElementById('cCaret');
  const pillFill = document.getElementById('cPillFill');
  const gradStops = [...curtain.querySelectorAll('#c-evg stop')];
  const caretStops = [252, 514, 762, 838, 1040, 1300, 1566]; // right edge offsets (relative to x=124) for e-n-v-i-z-o-n
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    curtain.classList.add('done');
    document.body.classList.remove('curtain-lock');
    lenis?.start();
    document.body.classList.add('ready');
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpRgb = (c0, c1, t) => `rgb(${Math.round(lerp(c0[0], c1[0], t))} ${Math.round(lerp(c0[1], c1[1], t))} ${Math.round(lerp(c0[2], c1[2], t))})`;
  const easeInOutQuart = p => (p < .5 ? 8 * p * p * p * p : 1 - Math.pow(-2 * p + 2, 4) / 2);
  const tweenRect = (from, to, dur, onStep) => {
    if (!pillFill) return;
    const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      const e = easeInOutQuart(p);
      pillFill.setAttribute('x', lerp(from.x, to.x, e).toFixed(1));
      pillFill.setAttribute('y', lerp(from.y, to.y, e).toFixed(1));
      pillFill.setAttribute('width', lerp(from.w, to.w, e).toFixed(1));
      pillFill.setAttribute('height', lerp(from.h, to.h, e).toFixed(1));
      pillFill.setAttribute('rx', lerp(from.rx, to.rx, e).toFixed(1));
      onStep?.(e);
      if (p < 1 && !finished) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  // Compute SVG-unit bounds that guarantee 100% full viewport width + height on any screen aspect ratio
  const fullScreenRect = () => {
    const svg = curtain.querySelector('.curtain-logo');
    const r = svg ? svg.getBoundingClientRect() : { width: 380 };
    const unitPerPx = 2224 / Math.max(r.width, 1);
    const fullW = Math.ceil(innerWidth * unitPerPx) + 400;
    const fullH = Math.ceil(innerHeight * unitPerPx) + 400;
    return { x: 1234 - fullW / 2, y: 337 - fullH / 2, w: fullW, h: fullH, rx: 0 };
  };
  const cBrand = [[0, 166, 80], [22, 177, 76], [113, 191, 69]];   // #00A650 -> #16B14C -> #71BF45
  const cDeep  = [[5, 46, 28],  [10, 38, 26],  [14, 28, 24]];    // #052E1C -> #0A261A -> #0E1C18
  requestAnimationFrame(() => {
    curtain.classList.add('is-type');
    caretStops.forEach((dx, i) => setTimeout(() => {
      if (caret) caret.style.transform = `translateX(${dx}px)`;
    }, i * 95 + 25));
    setTimeout(() => curtain.classList.add('is-toggle'), 860);
    setTimeout(() => {
      curtain.classList.add('is-engulf');
      tweenRect(
        { x: 1720, y: 171, w: 624, h: 320, rx: 160 },
        { x: 124,  y: 146, w: 2220, h: 370, rx: 185 },
        680
      );
    }, 1880);
    setTimeout(() => {
      curtain.classList.add('is-zoom');
      tweenRect(
        { x: 124, y: 146, w: 2220, h: 370, rx: 185 },
        fullScreenRect(),
        860,
        e => gradStops.forEach((s, i) => s.setAttribute('stop-color', lerpRgb(cBrand[i], cDeep[i], e)))
      );
    }, 2600);
    setTimeout(() => {
      curtain.classList.add('is-fade');
      document.body.classList.add('ready');
    }, 3120);
    setTimeout(finish, 3720);
  });
  setTimeout(finish, 4600); // hard failsafe so curtain never blocks the page
}

// Header: shadow on scroll, mobile menu, Solutions dropdown
const header = document.getElementById('header');
const burger = document.getElementById('burger'), mobileMenu = document.getElementById('mobileMenu');
const setMenu = open => { burger.setAttribute('aria-expanded', open); mobileMenu.classList.toggle('open', open); header.classList.toggle('menu-open', open); };
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
mobileMenu.querySelectorAll('a, button').forEach(a => a.addEventListener('click', () => setMenu(false)));
const solBtn = document.querySelector('[aria-controls="solMenu"]'), solItem = solBtn.parentElement;
const setSol = open => { solItem.classList.toggle('open', open); solBtn.setAttribute('aria-expanded', open); };
solBtn.addEventListener('click', () => setSol(!solItem.classList.contains('open')));
document.addEventListener('click', e => { if (!solItem.contains(e.target)) setSol(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setSol(false); });

// Background videos hold still for visitors who ask for reduced motion
if (reduceMotion) document.querySelectorAll('video').forEach(v => v.pause());

// Layers: pinned scroll progress 0..1 opens the stack and steps through the five layers
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const stepOf = (p, n) => Math.min(n - 1, Math.floor(p * n));
console.assert(stepOf(0, 5) === 0 && stepOf(0.5, 5) === 2 && stepOf(1, 5) === 4, 'stepOf');

// Layer stack geometry, same constants as envizon_ev/js/layers.js (MID, gaps, lift)
const MID = 280, GAP_CLOSED = 18, GAP_OPEN = 88, LIFT = 8;
function layoutStack(el, cur, spread) {
  const plates = el.querySelectorAll('.ev-plate'), half = (plates.length - 1) / 2;
  const gap = GAP_CLOSED + (GAP_OPEN - GAP_CLOSED) * spread;
  // plates sit in reverse DOM order: the last one (layer 1) is on top, so the stack reads top-down like the rail
  plates.forEach((pl, k) => {
    const on = plates.length - 1 - k === cur;
    pl.style.transform = `translateY(${MID + (half - k) * gap - (on ? LIFT * spread : 0)}px)`;
    pl.classList.toggle('is-active', on);
  });
  const spine = el.querySelector('.ev-spine');
  spine.setAttribute('y1', MID - half * gap);
  spine.setAttribute('y2', MID + half * gap);
  el.querySelector('.ev-stack').style.setProperty('--glyph', Math.max(0, (spread - 0.35) / 0.65).toFixed(3));
}

const sections = [...document.querySelectorAll('.scrolly')].map(el => ({ el, n: +el.dataset.steps, step: -1 }));

function measure(el) {
  const r = el.getBoundingClientRect(), vh = innerHeight, travel = r.height - vh;
  const pinned = r.height - el.firstElementChild.offsetHeight > 50; // sticky child shorter than section = pinned layout
  // pinned: progress across the sticky travel; stacked (small screens): progress while passing through view
  return { pinned, p: clamp(pinned ? -r.top / travel : (vh * 0.6 - r.top) / r.height, 0, 1) };
}

function setStep(s, step) {
  s.step = step;
  s.el.querySelectorAll('[data-item]').forEach(it => {
    const k = +it.dataset.item;
    it.classList.toggle('is-active', k === step);
    it.classList.toggle('is-done', k < step);
  });
  s.el.querySelectorAll('[data-go]').forEach(b => { const k = step + +b.dataset.go; b.disabled = k < 0 || k >= s.n; });
  s.onStep?.(step);
}

const whyCards = [...document.querySelectorAll('.why-card')], stacks = matchMedia('(min-width: 48rem)');
let lastY = scrollY;
function update() {
  header.classList.toggle('scrolled', scrollY > 40);
  // hide while scrolling down, back on any scroll up; stays put near the top, with a menu open or with keyboard focus inside
  const dy = scrollY - lastY;
  if (Math.abs(dy) > 6) {
    header.classList.toggle('is-hidden', dy > 0 && scrollY > 120 && !header.classList.contains('menu-open') && !header.contains(document.activeElement) && !solItem.classList.contains('open'));
    lastY = scrollY;
  }
  for (const s of sections) {
    const r = s.el.getBoundingClientRect();
    if (r.bottom < -innerHeight || r.top > innerHeight * 2) continue; // off screen
    const { pinned, p } = measure(s.el);
    // pinned: first 25% opens the stack, then each slice activates a layer
    const spread = pinned ? Math.min(1, p / 0.25) : 1;
    const step = pinned ? clamp(Math.floor(((p - 0.2) / 0.7) * s.n), 0, s.n - 1) : stepOf(p, s.n);
    if ('layers' in s.el.dataset) layoutStack(s.el, step, spread);
    if (step !== s.step) setStep(s, step);
    s.el.style.setProperty('--p', p.toFixed(3)); // rail progress line
  }
  // Why cards stack (sticky) from 48rem: the covered card dims to 20% while the next one slides from 60% of the viewport to the top
  whyCards.forEach((card, i) => {
    const next = whyCards[i + 1];
    if (!next) return;
    const t = next.getBoundingClientRect().top;
    card.style.setProperty('--dim', stacks.matches && !reduceMotion ? (clamp(1 - t / (innerHeight * 0.6), 0, 1) * 0.8).toFixed(3) : 0);
  });
}
let ticking = false;
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); } }, { passive: true });
addEventListener('resize', update);
update();

// Rail rows jump the pinned scroll to the middle of that layer's slice (inverse of the step mapping in update)
const pOfStep = (k, n) => 0.2 + ((k + 0.5) / n) * 0.7;
console.assert(sections.length === 0 || [0, 2, 4].every(k => Math.floor(((pOfStep(k, 5) - 0.2) / 0.7) * 5) === k), 'pOfStep');
const jumpTo = (s, k) => {
  const top = s.el.getBoundingClientRect().top + scrollY + pOfStep(k, s.n) * (s.el.offsetHeight - innerHeight);
  lenis ? lenis.scrollTo(top) : scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
};
for (const s of sections) {
  s.el.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => jumpTo(s, +b.closest('[data-item]').dataset.item)));
  s.el.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => jumpTo(s, clamp(s.step + +b.dataset.go, 0, s.n - 1))));
}

// Charger tour: each chapter pans and zooms the NEO render to the part in focus (the ring marks it)
const tour = sections.find(s => s.el.id === 'inside');
if (tour) {
  const stage = tour.el.querySelector('.tour-stage'), count = tour.el.querySelector('.tour-count b');
  tour.onStep = k => {
    const [x, y, z] = tour.el.querySelector(`.tour-card [data-item="${k}"]`).dataset.at.split(' ');
    stage.style.cssText = `--x:${x}%;--y:${y}%;--s:${z}`;
    count.textContent = String(k + 1).padStart(2, '0');
  };
  tour.onStep(Math.max(0, tour.step));
}

// Roving-focus tablists (feature tabs, charger picker): arrow keys move and select
function tablist(tabs, select, keys) {
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', e => {
      const d = keys[e.key];
      if (!d) return;
      e.preventDefault();
      const n = (i + d + tabs.length) % tabs.length;
      tabs[n].focus();
      select(n);
    });
  });
}

// Charger picker
const pickTabs = [...document.querySelectorAll('.picker-list [role="tab"]')];
const pick = k => pickTabs.forEach((t, i) => {
  t.setAttribute('aria-selected', i === k);
  t.tabIndex = i === k ? 0 : -1;
  document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-active', i === k);
});
tablist(pickTabs, pick, { ArrowDown: 1, ArrowUp: -1, ArrowRight: 1, ArrowLeft: -1 });
const fromHash = pickTabs.findIndex(t => '#' + t.getAttribute('aria-controls') === location.hash);
pick(Math.max(0, fromHash));

// Reveal on enter (Why cards draw their divider rules on the same trigger)
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.addEventListener('transitionend', () => { e.target.style.transitionDelay = ''; }, { once: true }); // so later hovers aren't delayed
  io.unobserve(e.target);
}), { threshold: 0.15 });
document.querySelectorAll('.block .head-row, .sol-row, .picker, .why-intro, .step, .faq-intro, .faq-item, .faq-panel, .partners-in, .card, .pcard, .seg, .row, .stage, .feat, .spec-group, .flow li, .callout, .anat-list li, .figs > div, .mod, .prot-list li, .app, .rng').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4) * 70 + 'ms';
  io.observe(el);
});
whyCards.forEach(c => io.observe(c));

// Sub-nav scroll-spy: the link for the section crossing the middle band of the viewport gets aria-current
const spyLinks = [...document.querySelectorAll('.subnav a[href^="#"]')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const a = spyLinks.find(l => l.hash === '#' + e.target.id);
  spyLinks.forEach(l => l.removeAttribute('aria-current'));
  if (!a) return; // back at the hero: nothing current
  a.setAttribute('aria-current', 'true');
  a.parentElement.parentElement.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
}), { rootMargin: '-45% 0px -50% 0px' });
spyLinks.forEach(l => { const t = document.getElementById(l.hash.slice(1)); if (t) spy.observe(t); });
if (spyLinks.length) spy.observe(document.getElementById('top'));

// Rotators: parallel lists take turns (.is-active slides in, .is-prev slides out); picking one restarts the clock
function cycle(groups, ms) {
  if (!groups[0].length) return () => {}; // rotator not on this page
  let k = 0, timer;
  const set = n => { groups.forEach(g => g.forEach((el, i) => { el.classList.toggle('is-prev', i === k && n !== k); el.classList.toggle('is-active', i === n); })); k = n; };
  const play = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => set((k + 1) % groups[0].length), ms); };
  set(0); play();
  return n => { set(n); play(); };
}
const all = s => [...document.querySelectorAll(s)];
cycle([all('.hero-words i')], 2600); // hero: to charge. / revenue. / uptime. / scale.
cycle([all('.ft-tagline p')], 3000); // footer banner (homepage.json footer.bannerTexts)
const solNames = all('.ft-sol-names a'), solDots = all('.ft-sol-dots button');
const pickSol = cycle([all('.ft-sol-ico span'), solNames, solDots, all('.ft-sol-sub p')], 5000);
solNames.forEach((a, i) => ['pointerenter', 'focus'].forEach(ev => a.addEventListener(ev, () => pickSol(i))));
solDots.forEach((b, i) => b.addEventListener('click', () => pickSol(i)));

// Solutions: one image card trails the cursor over the rows (lerped, tilting with speed); each row wipes its own image in
const solList = document.querySelector('.sol-list'), solFloat = document.querySelector('.sol-float');
if (solFloat && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const imgs = [...solFloat.children];
  let x = 0, y = 0, tx = 0, ty = 0, raf = 0, cur = -1;
  const tick = () => {
    const dx = tx - x, k = reduceMotion ? 1 : 0.14;
    x += dx * k; y += (ty - y) * k;
    solFloat.style.transform = `translate(${x}px, ${y}px) rotate(${reduceMotion ? 0 : clamp(dx * 0.06, -8, 8)}deg)`;
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
  };
  solList.addEventListener('pointerenter', e => { x = tx = e.clientX; y = ty = e.clientY; tick(); solFloat.classList.add('is-on'); });
  solList.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(tick); });
  solList.addEventListener('pointerleave', () => solFloat.classList.remove('is-on'));
  solList.querySelectorAll('.sol-row').forEach((row, i) => row.addEventListener('pointerenter', () => {
    imgs.forEach((im, j) => { im.classList.toggle('is-prev', j === cur && j !== i); im.classList.toggle('is-active', j === i); });
    cur = i;
  }));
}

// Dark surfaces: a liquid light follows the cursor. The lead blob is quick, the trail blob lags, both stretch along
// the motion; only the innermost dark surface under the pointer lights up. Mouse only, never with reduced motion.
if (!reduceMotion && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const hosts = all('.dark, .why-sec, .why-card, .inside .sticky, .partners, .footer, .faq-panel, .step-cta');
  hosts.forEach(h => {
    h.classList.add('fx-host');
    if (getComputedStyle(h).position === 'static') h.style.position = 'relative';
    h.append(...[0, 1].map(() => Object.assign(document.createElement('span'), { className: 'fx-blob' })));
  });
  // k = share of the gap closed per 60 Hz frame; s = stretch, eased so it swells and settles instead of snapping
  const blobs = [{ k: 0.24, x: 0, y: 0, a: 0, s: 0 }, { k: 0.12, x: 0, y: 0, a: 0, s: 0 }];
  let cur = null, els = [], box = null, mx = 0, my = 0, raf = 0, last = 0;
  const tick = t => {
    raf = 0;
    if (!cur) return;
    const dt = Math.min((t - (last || t)) / 16.7, 3), tx = mx - box.left, ty = my - box.top; // same feel at 60/120 Hz
    last = t;
    let moving = false;
    blobs.forEach((b, i) => {
      const dx = tx - b.x, dy = ty - b.y, d = Math.hypot(dx, dy), f = 1 - (1 - b.k) ** dt;
      b.x += dx * f; b.y += dy * f;
      if (d > 2) b.a = Math.atan2(dy, dx); // no angle flicker as it comes to rest
      b.s += (Math.min(d / 420, 0.35) - b.s) * f;
      els[i].style.transform = `translate3d(${b.x}px, ${b.y}px, 0) rotate(${b.a}rad) scale(${1 + b.s}, ${1 - b.s * 0.4})`;
      moving ||= d > 0.3 || b.s > 0.004;
    });
    if (moving) raf = requestAnimationFrame(tick); else last = 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    const h = e.target.closest?.('.fx-host') || null;
    if (h !== cur) {
      cur?.classList.remove('fx-on');
      cur = h;
      if (cur) {
        box = cur.getBoundingClientRect();
        els = cur.querySelectorAll(':scope > .fx-blob');
        blobs.forEach(b => { b.x = mx - box.left; b.y = my - box.top; b.s = 0; });
        cur.classList.add('fx-on');
      }
    }
    kick();
  }, { passive: true });
  // the surface moves under a still cursor: one rect read per scroll, none per frame
  const reBox = () => { if (cur) { box = cur.getBoundingClientRect(); kick(); } };
  addEventListener('scroll', reBox, { passive: true });
  addEventListener('resize', reBox);
  document.documentElement.addEventListener('pointerleave', () => { cur?.classList.remove('fx-on'); cur = null; });
}

// Quote dialog: every [data-quote] button opens it with the enquiry type preset
const dlg = document.getElementById('quote'), form = document.getElementById('quoteForm');
const body = form.querySelector('.quote-body'), doneView = form.querySelector('.quote-done');
const titles = { PRODUCT_QUOTE: 'Request a Quote', SITE_ASSESSMENT: 'Book a Site Assessment', FLEET: 'Fleet Charging', PARTNERSHIP: 'Become a Partner', GENERAL: 'Talk to an Expert' };
document.addEventListener('click', e => {
  const t = e.target.closest('[data-quote]');
  if (!t) return;
  e.preventDefault();
  const type = t.dataset.quote;
  form.reset();
  body.hidden = false; doneView.hidden = true;
  document.getElementById('formError').textContent = '';
  form.querySelectorAll('[aria-invalid]').forEach(f => f.removeAttribute('aria-invalid'));
  document.getElementById('quoteType').value = type;
  if (t.dataset.product) document.getElementById('quoteCharger').value = t.dataset.product;
  document.getElementById('quote-title').textContent = titles[type] || titles.GENERAL;
  dlg.showModal();
  lenis?.stop();
});
const closeDlg = () => { dlg.close(); lenis?.start(); };
dlg.addEventListener('close', () => lenis?.start()); // Esc closes without our buttons
document.getElementById('quoteClose').addEventListener('click', closeDlg);
document.getElementById('quoteDone').addEventListener('click', closeDlg);
dlg.addEventListener('click', e => { if (e.target === dlg) closeDlg(); }); // backdrop click

form.addEventListener('submit', e => {
  e.preventDefault();
  const fields = [...form.querySelectorAll('input, select, textarea')];
  fields.forEach(f => f.setAttribute('aria-invalid', !f.checkValidity()));
  const bad = fields.find(f => !f.checkValidity());
  if (bad) {
    document.getElementById('formError').textContent = bad.name === 'consent' ? 'Please agree to be contacted so we can reply.' : 'Please check the highlighted fields.';
    bad.focus();
    return;
  }
  // shortcut: submission is mocked (envizon_ev blueprint §9.4 BLOCKED); POST to the lead endpoint once it exists
  const btn = document.getElementById('quoteSubmit');
  btn.classList.add('is-loading'); btn.setAttribute('aria-busy', 'true');
  setTimeout(() => {
    btn.classList.remove('is-loading'); btn.removeAttribute('aria-busy');
    body.hidden = true; doneView.hidden = false;
  }, 900); // loading state stands in for the real request time
});

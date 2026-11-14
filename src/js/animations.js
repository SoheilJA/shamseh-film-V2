/** GSAP motion system — "Light and Paper". Soft, intentional, performant. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Standard page entrance: curtain lift + staggered reveals. */
export function pageIntro(scope = document) {
  const curtain = document.getElementById('page-curtain');
  if (reduced) {
    curtain?.remove();
    scope.querySelectorAll('.reveal').forEach((el) => el.classList.add('done'));
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve });
    if (curtain) {
      tl.to(curtain, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' })
        .set(curtain, { display: 'none' });
    }
    const items = scope.querySelectorAll('.reveal');
    if (items.length) {
      tl.to(items, {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.07, ease: 'power3.out',
        onComplete: () => items.forEach((el) => el.classList.add('done')),
      }, '-=0.2');
    }
  });
}

/** Scroll-triggered reveals for everything marked .reveal-in.
 *  We set the hidden state FROM JS (gsap.fromTo) rather than CSS, so content
 *  is always visible when JS/motion is unavailable. A tiny pre-paint pass
 *  hides only elements that are actually below the fold. */
export function scrollReveals(scope = document) {
  const els = scope.querySelectorAll('.reveal-in');
  if (reduced || !els.length) return;
  els.forEach((el) => {
    const below = el.getBoundingClientRect().top > innerHeight * 0.96;
    if (!below) return; // above-the-fold items stay visible
    gsap.fromTo(el,
      { opacity: 0, y: 34 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onComplete: () => { el.style.willChange = 'auto'; },
      });
  });
  /* safety net: any element still hidden after 2.5s of no interaction shows up */
  setTimeout(() => {
    els.forEach((el) => {
      const st = gsap.getProperty(el, 'opacity');
      if (parseFloat(st) === 0) gsap.set(el, { opacity: 1, y: 0 });
    });
  }, 2500);
}

/** Leaf clip reveal for framed images. */
export function leafReveal(scope = document) {
  if (reduced) return;
  scope.querySelectorAll('[data-leaf-reveal]').forEach((el) => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
      {
        clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.15, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      });
  });
}

/** Parallax between image frames and background pattern. */
export function parallax(scope = document) {
  if (reduced) return;
  scope.querySelectorAll('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.dataset.parallax) || 0.12;
    gsap.fromTo(el, { yPercent: -strength * 100 }, {
      yPercent: strength * 100, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
    });
  });
}

/** Slow rotation of sunburst tied to scroll. */
export function sunburstScroll(scope = document) {
  if (reduced) return;
  scope.querySelectorAll('[data-sunburst-scroll]').forEach((el) => {
    gsap.fromTo(el, { rotate: 0 }, {
      rotate: 120, ease: 'none',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
    });
  });
}

/** Hero entrance: mask open, headline lines rise, light sweep. */
export function heroIntro(scope = document) {
  const hero = scope.querySelector('[data-hero]');
  if (!hero) return;
  if (reduced) {
    hero.querySelectorAll('.reveal').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }
  const tl = gsap.timeline({ delay: 0.15 });
  const frame = hero.querySelector('[data-hero-frame]');
  const media = hero.querySelector('[data-hero-media]');
  const lines = hero.querySelectorAll('[data-line]');
  const sweep = hero.querySelector('.light-sweep');
  if (frame) {
    tl.fromTo(frame,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power3.inOut' });
  }
  if (media) {
    tl.fromTo(media, { scale: 1.14, duration: 1.6 }, { scale: 1, ease: 'power2.out' }, '-=0.85');
  }
  if (lines.length) {
    tl.fromTo(lines,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, '-=0.75');
  }
  tl.fromTo(hero.querySelectorAll('[data-hero-fade]'),
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power2.out' }, '-=0.5');
  if (sweep) {
    tl.fromTo(sweep, { xPercent: -130 }, { xPercent: 130, duration: 1.35, ease: 'power2.inOut' }, '-=0.35');
  }
}

/** Initialize all standard effects for a page. */
export function initMotion(scope = document) {
  heroIntro(scope);
  scrollReveals(scope);
  leafReveal(scope);
  parallax(scope);
  sunburstScroll(scope);
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };

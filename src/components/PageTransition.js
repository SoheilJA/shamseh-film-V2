/** Page transition curtain (leaf wipe) — used on internal navigation. */
import { gsap } from 'gsap';
import { reduced } from '../js/animations.js';

let transitioning = false;

export async function withTransition(fn) {
  if (transitioning) return;
  transitioning = true;
  let curtain = document.getElementById('page-curtain');
  if (!curtain) {
    curtain = document.createElement('div');
    curtain.id = 'page-curtain';
    curtain.className = 'page-curtain';
    curtain.innerHTML = `<img src="/images/logo-full.png" alt="" width="120" height="55" class="opacity-80" />`;
    document.body.appendChild(curtain);
  }
  if (reduced) {
    await fn();
    transitioning = false;
    return;
  }
  await gsap.to(curtain, { yPercent: 0, duration: 0.32, ease: 'power3.in', display: 'block', y: 0 });
  await fn();
  await gsap.to(curtain, { yPercent: -100, duration: 0.45, ease: 'power3.out', delay: 0.06 });
  gsap.set(curtain, { display: 'none' });
  transitioning = false;
}

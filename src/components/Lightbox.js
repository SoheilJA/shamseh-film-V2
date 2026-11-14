/** Lightbox — ivory translucent backdrop, ink controls, keyboard + swipe. */
import { appUrl, esc } from '../js/utils.js';

let state = { items: [], index: 0, onClose: null };

export function openLightbox(items, index = 0, meta = null) {
  closeLightbox(true);
  state = { items, index, meta };
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'نمایش تصویر');
  lb.innerHTML = `
    <button type="button" class="lb-close absolute top-5 left-5 z-10 grid place-items-center w-12 h-12 rounded-full bg-white border border-line text-ink hover:text-teal-deep shadow-card" aria-label="بستن">
      <i data-lucide="x" class="w-5 h-5"></i>
    </button>
    <button type="button" class="lb-prev absolute top-1/2 -translate-y-1/2 right-3 md:right-6 z-10 grid place-items-center w-12 h-12 rounded-full bg-white border border-line text-ink hover:text-teal-deep shadow-card" aria-label="تصویر قبلی">
      <i data-lucide="chevron-right" class="w-6 h-6"></i>
    </button>
    <button type="button" class="lb-next absolute top-1/2 -translate-y-1/2 left-3 md:left-6 z-10 grid place-items-center w-12 h-12 rounded-full bg-white border border-line text-ink hover:text-teal-deep shadow-card" aria-label="تصویر بعدی">
      <i data-lucide="chevron-left" class="w-6 h-6"></i>
    </button>
    <figure class="mx-5">
      <img class="leaf" src="" alt="" />
      <figcaption class="mt-4 flex items-center justify-between gap-4">
        <span class="cap-text text-sm text-ink-soft"></span>
        <span class="cap-count label-mono" dir="ltr"></span>
      </figcaption>
    </figure>`;
  document.body.appendChild(lb);
  document.body.style.overflow = 'hidden';

  const render = () => {
    const item = state.items[state.index];
    const im = lb.querySelector('img');
    im.src = appUrl(item.src);
    im.alt = item.caption || '';
    lb.querySelector('.cap-text').textContent = item.caption || '';
    lb.querySelector('.cap-count').textContent = `${state.index + 1} / ${state.items.length}`;
    im.animate([{ opacity: 0.2, transform: 'scale(0.985)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 380, easing: 'cubic-bezier(0.22,1,0.36,1)' });
  };
  const move = (d) => {
    state.index = (state.index + d + state.items.length) % state.items.length;
    render();
  };
  lb.querySelector('.lb-close').addEventListener('click', () => closeLightbox());
  lb.querySelector('.lb-prev').addEventListener('click', () => move(-1));
  lb.querySelector('.lb-next').addEventListener('click', () => move(1));
  state.onKey = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') move(1);
    if (e.key === 'ArrowRight') move(-1);
  };
  document.addEventListener('keydown', state.onKey);
  // touch swipe
  let sx = 0;
  lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 48) move(dx > 0 ? -1 : 1);
  }, { passive: true });
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  import('../js/utils.js').then(({ icons }) => icons());
  render();
}

function closeLightbox(silent = false) {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;
  if (state.onKey) document.removeEventListener('keydown', state.onKey);
  lb.remove();
  document.body.style.overflow = '';
  if (state.meta && state.meta.onClose) state.meta.onClose();
}

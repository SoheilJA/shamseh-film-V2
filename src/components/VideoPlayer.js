/** Video preview block: aparat embed in leaf frame with custom play cover. */
import { esc } from '../js/utils.js';

/**
 * @param {string[]} aparatHashes
 * @param {string} poster local image path
 */
export function videoBlock(aparatHashes, poster, title = '') {
  if (!aparatHashes || !aparatHashes.length) return '';
  const hash = aparatHashes[0];
  return `
  <div class="video-preview" data-video-block>
    <div class="relative leaf overflow-hidden bg-ink aspect-video group/vp">
      <img src="${poster || ''}" alt="${title ? `پیش‌نمایش ${esc(title)}` : 'پیش‌نمایش ویدیو'}" class="absolute inset-0 w-full h-full object-cover opacity-90" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-t from-ink-deep/50 via-transparent to-transparent" aria-hidden="true"></div>
      <button type="button" class="vp-play absolute inset-0 grid place-items-center" data-hash="${hash}" aria-label="پخش پیش‌نمایش ${esc(title)}">
        <span class="relative grid place-items-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold text-ink-deep shadow-float transition-transform duration-500 group-hover/vp:scale-110" style="transition-timing-function:var(--ease-soft)">
          <svg viewBox="0 0 24 24" class="w-8 h-8 md:w-9 md:h-9 -scale-x-90" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>
          <span class="absolute inset-0 rounded-full border-2 border-gold/60 animate-ping" aria-hidden="true" style="animation-duration:2.6s"></span>
        </span>
      </button>
      <span class="absolute bottom-4 inset-x-5 flex items-center justify-between text-paper/90 pointer-events-none">
        <span class="text-[0.85rem] font-medium">پیش‌نمایش ${esc(title)}</span>
        <span class="label-mono !text-paper/60" dir="ltr">PREVIEW</span>
      </span>
    </div>
    <div class="vp-frame hidden mt-0"></div>
  </div>`;
}

export function initVideoBlocks(scope = document) {
  scope.querySelectorAll('[data-video-block]').forEach((block) => {
    const btn = block.querySelector('.vp-play');
    btn?.addEventListener('click', () => {
      const hash = btn.dataset.hash;
      const frame = block.querySelector('.vp-frame');
      const cover = block.querySelector('.aspect-video');
      frame.innerHTML = `<div class="aparat-frame leaf"><iframe src="https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame" allowfullscreen="true" title="پخش ویدیو" loading="lazy"></iframe></div>`;
      frame.classList.remove('hidden');
      cover.classList.add('hidden');
    });
  });
}

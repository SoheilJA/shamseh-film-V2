/** Reusable production card (framed print + museum label + ghost numeral). */
import { appUrl, img, esc, fa } from '../js/utils.js';

/**
 * @param {object} p production
 * @param {object} opts { index, size: 'feature'|'tall'|'wide'|'std', flip }
 */
export function productionCard(p, { index = 0, size = 'std', flip = false } = {}) {
  const num = fa(String(index + 1).padStart(2, '0'));
  const sizes = {
    feature: 'md:col-span-7 aspect-[4/3]',
    tall: 'md:col-span-5 aspect-[3/4] md:aspect-auto md:h-full',
    wide: 'md:col-span-7 aspect-[16/10]',
    std: 'aspect-[4/3]',
  };
  const cls = sizes[size] || sizes.std;
  return `
  <a href="${appUrl(`/productions/${p.slug}`)}" class="print-card group/print relative block reveal-in ${size !== 'std' ? cls.split(' ')[0] : ''}" aria-label="${esc(p.title)} — ${esc(p.categoryFa)}">
    <span class="ghost-num ${flip ? 'gold' : ''} ${flip ? '-top-8 -left-6' : '-top-8 -right-6'}" aria-hidden="true">${num}</span>
    <span class="print-frame leaf relative block overflow-hidden ${cls} ${flip ? 'leaf-flip' : ''} zoomable">
      ${p.poster ? `<img src="${img(p.poster)}" alt="تصویری از ${esc(p.title)}" class="w-full h-full object-cover" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async" />` : '<span class="grid w-full h-full place-items-center bg-sand text-ink-mute">بدون تصویر</span>'}
      <span class="absolute inset-0 bg-teal/0 group-hover/print:bg-teal-tint/35 transition-colors duration-500" aria-hidden="true"></span>
      <span class="view-badge leaf-xs" aria-hidden="true">
        <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M22 6 L26 16 L36 22 L26 28 L22 38 L18 28 L8 22 L18 16 Z" fill="none"/>
          <circle cx="36" cy="8" r="2.6" fill="currentColor" stroke="none"/>
        </svg>
      </span>
    </span>
    <span class="museum-label block">
      <span class="font-bold text-[1.02rem] group-hover/print:text-teal-deep transition-colors">${esc(p.title)}</span>
      <span class="label-mono !text-[0.6rem] self-center">${esc(p.categoryFa)}</span>
      <span class="text-[0.82rem] text-ink-mute leading-6">${esc(p.synopsis[0] || '').slice(0, 110)}${(p.synopsis[0] || '').length > 110 ? '…' : ''}</span>
      <span class="label-mono !text-[0.58rem] self-end" dir="ltr">No. ${String(index + 1).padStart(2, '0')}</span>
    </span>
  </a>`;
}

/** Gallery page — luminous masonry with filters + lightbox. */
import { img, esc, fa, icons, seo } from '../js/utils.js';
import { headerHTML, footerHTML, mobileMenuHTML, searchOverlayHTML, initChrome } from '../components/Chrome.js';
import { openLightbox } from '../components/Lightbox.js';
import { initMotion, gsap } from '../js/animations.js';
import gallery from '../data/gallery.js';
import productions from '../data/productions.js';

export async function render(app) {
  seo({ title: 'گالری تصاویر', description: 'گالری تصاویر پشت صحنه و تولیدات گروه سینمایی شمسه فیلم.' });

  // items: {src, caption, catKey} — cat from linked production
  const items = gallery.flatMap((g) => {
    const linked = productions.find((p) => p.slug === g.linkedProduction);
    return g.images.map((src) => ({
      src,
      caption: linked ? `${g.title} — ${linked.title}` : g.title,
      catKey: linked?.category || 'other',
      catFa: linked?.categoryFa || 'گالری',
    }));
  });
  const cats = [
    ['all', 'همه تصاویر'],
    ['documentary', 'مستند'],
    ['fiction', 'داستانی'],
    ['music-video', 'نماهنگ'],
    ['tv', 'برنامه تلویزیونی'],
  ].filter(([k]) => k === 'all' || items.some((i) => i.catKey === k));

  app.innerHTML = `
  ${headerHTML('gallery')}
  ${mobileMenuHTML()}
  ${searchOverlayHTML()}

  <main id="main" class="pt-[4.4rem] md:pt-[5.2rem]">
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 shamseh-pattern opacity-40" aria-hidden="true"></div>
      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 pt-14 pb-10 md:pt-20 md:pb-12">
        <p class="label-mono label-mono-teal mb-5 reveal-in" dir="ltr">CONTACT SHEETS</p>
        <div class="flex flex-wrap items-end justify-between gap-8">
          <h1 class="h-display text-5xl md:text-7xl">گالری تصاویر</h1>
          <p class="text-ink-soft leading-8 max-w-md">
            ${fa(items.length)} تصویر از پشت صحنه و کادرهای تولید؛
            برگه‌های تماسِ یک آرشیو روشن. برای بزرگ‌نمایی روی هر تصویر بزنید.
          </p>
        </div>
      </div>
    </section>

    <section class="sticky top-[4.4rem] md:top-[5.2rem] z-[100] bg-paper/92 backdrop-blur border-b border-line">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8 py-3.5 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="فیلتر گالری">
        ${cats.map(([key, label], i) => `
        <button type="button" role="tab" data-cat="${key}" class="chip leaf-xs ${i === 0 ? 'active' : ''}">
          ${esc(label)}
          <span class="chip-count">${fa(key === 'all' ? items.length : items.filter((it) => it.catKey === key).length)}</span>
        </button>`).join('')}
      </div>
    </section>

    <section class="py-10 md:py-14">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8">
        <div id="gallery-grid" class="columns-2 md:columns-3 xl:columns-4 gap-4 md:gap-5 [column-fill:balance]"></div>
        <div id="gallery-empty" class="hidden text-center py-24">
          <div class="mx-auto w-28 h-28 shamseh-pattern leaf-sm bg-sand/70 rotate-6"></div>
          <p class="mt-6 h-title text-xl">تصویری در این دسته نیست</p>
        </div>
      </div>
    </section>
  </main>

  ${footerHTML()}
  `;

  initChrome();

  const grid = app.querySelector('#gallery-grid');
  const emptyEl = app.querySelector('#gallery-empty');
  let activeCat = 'all';

  const ratios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[16/10]', 'aspect-square'];

  const apply = () => {
    const list = activeCat === 'all' ? items : items.filter((i) => i.catKey === activeCat);
    grid.innerHTML = list.map((it, i) => `
      <button type="button" class="group relative w-full mb-4 md:mb-5 break-inside-avoid overflow-hidden ${i % 2 ? 'leaf-flip' : 'leaf'} ${ratios[i % ratios.length]} bg-white border border-line shadow-card zoomable" data-gi="${i}" aria-label="بزرگ‌نمایی: ${esc(it.caption)}">
        <img src="${img(it.src)}" alt="${esc(it.caption)}" class="w-full h-full object-cover" loading="${i < 8 ? 'eager' : 'lazy'}" />
        <span class="absolute inset-0 bg-teal-tint/0 group-hover:bg-teal-tint/35 transition-colors" aria-hidden="true"></span>
        <span class="absolute bottom-0 inset-x-0 p-3 text-start bg-gradient-to-t from-ink-deep/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="text-[0.78rem] text-paper font-medium leading-5 block">${esc(it.caption)}</span>
        </span>
      </button>`).join('');
    emptyEl.classList.toggle('hidden', list.length > 0);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(grid.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'power3.out' });
    }
  };

  app.querySelectorAll('.chip[data-cat]').forEach((chip) => {
    chip.addEventListener('click', () => {
      activeCat = chip.dataset.cat;
      app.querySelectorAll('.chip[data-cat]').forEach((c) => c.classList.toggle('active', c === chip));
      apply();
    });
  });

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-gi]');
    if (!btn) return;
    const list = activeCat === 'all' ? items : items.filter((i) => i.catKey === activeCat);
    openLightbox(list.map((it) => ({ src: it.src, caption: it.caption })), parseInt(btn.dataset.gi, 10));
  });

  apply();
  initMotion(app);
  icons();
}

/** Productions archive — gallery wall with filters + search + counter. */
import { img, esc, fa, icons, seo, CATEGORY_LABELS } from '../js/utils.js';
import { headerHTML, footerHTML, mobileMenuHTML, searchOverlayHTML, initChrome } from '../components/Chrome.js';
import { initMotion, gsap } from '../js/animations.js';
import productions from '../data/productions.js';

const FILTERS = [
  ['all', 'همه آثار'],
  ['documentary', 'مستند'],
  ['fiction', 'داستانی'],
  ['music-video', 'نماهنگ'],
  ['tv', 'برنامه تلویزیونی'],
];

export async function render(app, params, query = new URLSearchParams(location.search)) {
  const initialCat = query.get('cat') || 'all';
  seo({
    title: 'تولیدات',
    description: 'آرشیو کامل تولیدات گروه سینمایی شمسه فیلم؛ مستند، داستانی، نماهنگ و برنامه تلویزیونی.',
  });

  app.innerHTML = `
  ${headerHTML('productions')}
  ${mobileMenuHTML()}
  ${searchOverlayHTML()}

  <main id="main" class="pt-[4.4rem] md:pt-[5.2rem]">
    <!-- editorial intro -->
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 shamseh-pattern opacity-40" aria-hidden="true"></div>
      <div class="sunburst absolute -top-[30rem] -left-[10rem] w-[60rem] h-[60rem] opacity-30" style="animation:spin 130s linear infinite" aria-hidden="true"></div>
      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 pt-14 pb-10 md:pt-20 md:pb-14">
        <p class="label-mono label-mono-teal mb-5 reveal-in" dir="ltr">THE ARCHIVE</p>
        <div class="flex flex-wrap items-end justify-between gap-8">
          <h1 class="h-display text-5xl md:text-7xl">آرشیوِ تولیدات</h1>
          <p class="text-ink-soft leading-8 max-w-md">
            دیواری روشن از ${fa(productions.length)} اثر؛ مستند، داستانی، نماهنگ و برنامه تلویزیونی.
            برای یافتن اثر، فیلتر کنید یا جستجو کنید.
          </p>
        </div>
      </div>
    </section>

    <!-- filters -->
    <section class="sticky top-[4.4rem] md:top-[5.2rem] z-[100] bg-paper/92 backdrop-blur border-b border-line">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8 py-3.5 flex items-center gap-4">
        <div class="flex-1 flex gap-2 overflow-x-auto no-scrollbar" id="filter-chips" role="tablist" aria-label="فیلتر دسته">
          ${FILTERS.map(([key, label]) => {
            const count = key === 'all' ? productions.length : productions.filter((p) => p.category === key).length;
            return `
            <button type="button" role="tab" data-cat="${key}" class="chip leaf-xs ${key === initialCat ? 'active' : ''}">
              ${esc(label)}
              <span class="chip-count">${fa(count)}</span>
            </button>`;
          }).join('')}
        </div>
        <div class="relative hidden sm:block shrink-0">
          <i data-lucide="search" class="absolute end-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute pointer-events-none"></i>
          <input type="search" id="archive-search" placeholder="جستجوی عنوان…" class="leaf-xs bg-white border border-line py-2.5 ps-10 pe-4 text-[0.88rem] w-44 md:w-56 outline-none focus:border-teal transition-colors" />
        </div>
        <p class="label-mono shrink-0 hidden md:block" dir="ltr"><span id="visible-count">${fa(productions.length)}</span> / ${fa(productions.length)}</p>
      </div>
    </section>

    <!-- grid -->
    <section class="py-12 md:py-16">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8">
        <div id="productions-grid" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-7"></div>
        <div id="empty-state" class="hidden text-center py-24">
          <div class="mx-auto w-28 h-28 shamseh-pattern leaf-sm bg-sand/70 rotate-6"></div>
          <p class="mt-6 h-title text-xl">اثری با این عنوان یافت نشد</p>
          <p class="mt-2 text-ink-mute text-[0.9rem]">فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید.</p>
          <button type="button" id="clear-filters" class="btn-ghost leaf-xs mt-7 !py-2.5 !px-6 text-[0.85rem]">پاک کردن فیلترها</button>
        </div>
      </div>
    </section>
  </main>

  ${footerHTML()}
  `;

  initChrome();

  const grid = app.querySelector('#productions-grid');
  const empty = app.querySelector('#empty-state');
  const counter = app.querySelector('#visible-count');
  const searchInput = app.querySelector('#archive-search');
  let activeCat = initialCat;
  let q = '';

  const card = (p, i) => `
    <a href="/productions/${p.slug}" class="print-card group/print reveal-in" aria-label="${esc(p.title)}">
      <div class="print-frame leaf overflow-hidden aspect-[3/4] zoomable relative">
        ${p.poster ? `<img src="${img(p.poster)}" alt="پوستر ${esc(p.title)}" class="w-full h-full object-cover" loading="${i < 8 ? 'eager' : 'lazy'}" />` : '<span class="grid w-full h-full place-items-center bg-sand text-ink-mute text-sm">بدون تصویر</span>'}
        <div class="absolute inset-0 bg-teal/0 group-hover/print:bg-teal-tint/40 transition-colors duration-500" aria-hidden="true"></div>
        <span class="view-badge leaf-xs" aria-hidden="true">
          <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M22 6 L26 16 L36 22 L26 28 L22 38 L18 28 L8 22 L18 16 Z" fill="none"/>
            <circle cx="36" cy="8" r="2.6" fill="currentColor" stroke="none"/>
          </svg>
        </span>
      </div>
      <div class="pt-3 px-1">
        <p class="font-bold text-[0.98rem] leading-6 group-hover/print:text-teal-deep transition-colors">${esc(p.title)}</p>
        <p class="label-mono !text-[0.58rem] mt-1">${esc(p.categoryFa)} · ${esc(p.dateFa.split(' ').slice(-1)[0])}</p>
      </div>
    </a>`;

  const apply = (animate = true) => {
    const list = productions.filter((p) => {
      const okCat = activeCat === 'all' || p.category === activeCat;
      const okQ = !q || p.title.includes(q) || p.synopsis.join(' ').includes(q);
      return okCat && okQ;
    });
    counter.textContent = fa(list.length);
    grid.innerHTML = list.map(card).join('');
    empty.classList.toggle('hidden', list.length > 0);
    if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(grid.children, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.035, ease: 'power3.out' });
    }
    icons();
  };

  app.querySelectorAll('#filter-chips .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      activeCat = chip.dataset.cat;
      app.querySelectorAll('#filter-chips .chip').forEach((c) => c.classList.toggle('active', c === chip));
      apply();
      history.replaceState({}, '', activeCat === 'all' ? '/productions' : `/productions?cat=${activeCat}`);
    });
  });
  searchInput?.addEventListener('input', () => { q = searchInput.value.trim(); apply(false); });
  app.querySelector('#clear-filters')?.addEventListener('click', () => {
    activeCat = 'all'; q = '';
    if (searchInput) searchInput.value = '';
    app.querySelectorAll('#filter-chips .chip').forEach((c) => c.classList.toggle('active', c.dataset.cat === 'all'));
    apply();
  });

  apply(false);
  initMotion(app);
}

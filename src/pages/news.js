/** News archive — editorial magazine layout with search. */
import { img, esc, fa, icons, seo } from '../js/utils.js';
import { headerHTML, footerHTML, mobileMenuHTML, searchOverlayHTML, initChrome } from '../components/Chrome.js';
import { initMotion, gsap } from '../js/animations.js';
import news from '../data/news.js';

const PER_PAGE = 6;

export async function render(app) {
  seo({ title: 'اخبار', description: 'اخبار و رویدادهای گروه سینمایی شمسه فیلم؛ گزارش مراحل تولید، جشنواره‌ها و اکران‌ها.' });

  app.innerHTML = `
  ${headerHTML('news')}
  ${mobileMenuHTML()}
  ${searchOverlayHTML()}

  <main id="main" class="pt-[4.4rem] md:pt-[5.2rem]">
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 shamseh-pattern-gold opacity-30" aria-hidden="true"></div>
      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 pt-14 pb-10 md:pt-20 md:pb-14">
        <p class="label-mono label-mono-teal mb-5 reveal-in" dir="ltr">NEWSROOM</p>
        <div class="flex flex-wrap items-end justify-between gap-8">
          <h1 class="h-display text-5xl md:text-7xl">اخبار و رویدادها</h1>
          <div class="relative">
            <i data-lucide="search" class="absolute end-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute pointer-events-none"></i>
            <input type="search" id="news-search" placeholder="جستجو در اخبار…" class="leaf-xs bg-white border border-line py-2.5 ps-10 pe-4 text-[0.88rem] w-56 md:w-64 outline-none focus:border-teal transition-colors" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-16">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8">
        <div id="news-list"></div>
        <div id="news-empty" class="hidden text-center py-24">
          <div class="mx-auto w-28 h-28 shamseh-pattern leaf-sm bg-sand/70 rotate-6"></div>
          <p class="mt-6 h-title text-xl">خبری یافت نشد</p>
        </div>
        <div class="mt-12 flex justify-center" id="news-more-wrap">
          <button type="button" id="news-more" class="btn-ghost leaf-sm">نمایش اخبار بیشتر</button>
        </div>
      </div>
    </section>
  </main>

  ${footerHTML()}
  `;

  initChrome();

  const list = app.querySelector('#news-list');
  const emptyEl = app.querySelector('#news-empty');
  const moreWrap = app.querySelector('#news-more-wrap');
  const moreBtn = app.querySelector('#news-more');
  const searchEl = app.querySelector('#news-search');
  let shown = PER_PAGE;
  let q = '';

  const itemHTML = (n, i) => {
    const [d, m, y] = n.dateFa.split(' ');
    if (i === 0 && !q) {
      return `
      <a href="/news/${n.slug}" class="group grid lg:grid-cols-12 gap-8 items-center pb-12 mb-12 border-b border-line reveal-in">
        <div class="lg:col-span-7 leaf overflow-hidden aspect-[16/10] shadow-frame bg-sand zoomable">
          ${n.image ? `<img src="${img(n.image)}" alt="${esc(n.title)}" class="w-full h-full object-cover" loading="eager" />` : ''}
        </div>
        <div class="lg:col-span-5">
          <div class="flex items-baseline gap-4">
            <span class="h-display text-6xl md:text-7xl text-gold/50 leading-none">${fa(d)}</span>
            <div>
              <p class="label-mono">${esc(m)} ${esc(y)}</p>
              <p class="label-mono !text-[0.55rem] mt-1" dir="ltr">LEAD STORY</p>
            </div>
          </div>
          <h2 class="h-title text-2xl md:text-[1.9rem] leading-9 mt-5 group-hover:text-teal-deep transition-colors">${esc(n.title)}</h2>
          <p class="mt-4 text-[0.95rem] leading-8 text-ink-soft">${esc(n.excerpt)}…</p>
          <span class="mt-6 inline-flex items-center gap-2 text-teal-deep font-bold text-[0.9rem]">خواندن خبر <i data-lucide="arrow-left" class="w-4 h-4"></i></span>
        </div>
      </a>`;
    }
    return `
    <a href="/news/${n.slug}" class="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-x-6 md:gap-x-10 items-center py-6 border-b border-line reveal-in">
      <div class="text-center w-16 md:w-20">
        <p class="h-display text-3xl md:text-4xl text-teal-deep leading-none">${fa(d)}</p>
        <p class="label-mono !text-[0.55rem] mt-1.5">${esc(m)}</p>
      </div>
      <div>
        <h3 class="font-bold text-[1.02rem] md:text-lg leading-7 group-hover:text-teal-deep transition-colors">${esc(n.title)}</h3>
        <p class="mt-1.5 text-[0.85rem] leading-6 text-ink-mute line-clamp-2">${esc(n.excerpt)}…</p>
      </div>
      <div class="hidden md:flex items-center gap-4">
        ${n.image ? `<span class="leaf-xs w-20 h-14 overflow-hidden bg-sand shrink-0"><img src="${img(n.image)}" alt="" class="w-full h-full object-cover" loading="lazy" /></span>` : ''}
        <i data-lucide="arrow-left" class="w-5 h-5 text-ink-mute group-hover:text-teal-deep group-hover:-translate-x-1 transition-all"></i>
      </div>
    </a>`;
  };

  const apply = (resetPage = true) => {
    if (resetPage) shown = PER_PAGE;
    const filtered = q ? news.filter((n) => n.title.includes(q) || n.body.includes(q)) : news;
    const page = filtered.slice(0, shown);
    list.innerHTML = page.map(itemHTML).join('');
    emptyEl.classList.toggle('hidden', filtered.length > 0);
    moreWrap.classList.toggle('hidden', shown >= filtered.length);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(list.children, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: 'power3.out' });
    }
    icons();
  };

  moreBtn.addEventListener('click', () => { shown += PER_PAGE; apply(false); });
  searchEl.addEventListener('input', () => { q = searchEl.value.trim(); apply(); });

  apply();
  initMotion(app);
}

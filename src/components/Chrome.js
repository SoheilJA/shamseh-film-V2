/** Header, footer, mobile menu, search overlay, custom cursor, page transitions. */
import { img, esc, icons } from '../js/utils.js';
import company from '../data/company.js';
import productions from '../data/productions.js';
import news from '../data/news.js';
import { navigate } from '../js/router.js';

/* ------------------------------------------------------------- header */
export function headerHTML(active) {
  const link = (href, label, key) => `
    <a href="${href}" class="nav-link link-underline relative py-2 text-[0.95rem] font-medium text-ink transition-colors hover:text-teal-deep ${active === key ? 'active text-teal-deep' : ''}">
      <span class="nav-dot" aria-hidden="true"></span>${label}
    </a>`;
  const cats = [
    ['tv', 'برنامه تلویزیونی'],
    ['fiction', 'داستانی'],
    ['documentary', 'مستند'],
    ['music-video', 'نماهنگ'],
  ];
  const previews = {};
  cats.forEach(([key, label]) => {
    const p = productions.find((x) => x.category === key);
    previews[key] = p ? p.poster : null;
  });
  return `
  <header class="site-header fixed top-0 inset-x-0 z-[110]" id="site-header">
    <div class="mx-auto max-w-[88rem] px-5 md:px-8">
      <div class="flex items-center justify-between h-[4.4rem] md:h-[5.2rem]">
        <a href="/" class="flex items-center gap-3 shrink-0" aria-label="شمسه فیلم — خانه">
          <img src="/images/logo-full.png" alt="گروه سینمایی شمسه فیلم" width="156" height="72" class="h-11 md:h-[3.4rem] w-auto" />
        </a>
        <nav class="hidden lg:flex items-center gap-8" aria-label="ناوبری اصلی">
          <div class="has-mega relative">
            <a href="/productions" class="nav-link link-underline relative py-2 text-[0.95rem] font-medium flex items-center gap-1.5 ${['productions', 'production'].includes(active) ? 'active text-teal-deep' : ''}">
              <span class="nav-dot" aria-hidden="true"></span>تولیدات
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </a>
            <div class="mega-panel !visible-hidden opacity-0" style="inset-inline-start:auto; inset-inline-end:-1rem; width:min(46rem,90vw);">
              <div class="grid grid-cols-4 gap-0">
                ${cats.map(([key, label]) => `
                  <a href="/productions?cat=${key}" class="group/cat p-5 border-s border-line first:border-s-0 hover:bg-teal-tint/50 transition-colors">
                    <span class="label-mono label-mono-teal !text-[0.58rem]">${esc(key)}</span>
                    <div class="leaf-sm overflow-hidden mt-3 aspect-[4/3] bg-sand">
                      ${previews[key] ? `<img src="${img(previews[key])}" alt="${esc(label)}" class="w-full h-full object-cover" loading="lazy" />` : ''}
                    </div>
                    <p class="mt-3 font-bold text-[0.95rem] group-hover/cat:text-teal-deep transition-colors">${esc(label)}</p>
                  </a>`).join('')}
              </div>
            </div>
          </div>
          ${link('/news', 'اخبار', 'news')}
          ${link('/about', 'معرفی', 'about')}
          ${link('/gallery', 'گالری تصاویر', 'gallery')}
          ${link('/contact', 'ارتباط با ما', 'contact')}
        </nav>
        <div class="flex items-center gap-2.5">
          <button type="button" id="search-open" class="grid place-items-center w-11 h-11 rounded-full border border-line bg-white/70 text-ink-soft hover:text-teal-deep hover:border-teal transition-colors" aria-label="جستجو در سایت">
            <i data-lucide="search" class="w-[1.1rem] h-[1.1rem]"></i>
          </button>
          <button type="button" id="menu-open" class="lg:hidden grid place-items-center w-11 h-11 rounded-full border border-line bg-white/70 text-ink" aria-label="باز کردن منو" aria-expanded="false">
            <span class="relative block w-5 h-3.5">
              <span class="menu-line absolute inset-x-0 top-0 h-[1.6px] bg-ink transition-all duration-400" style="transition-timing-function:var(--ease-soft)"></span>
              <span class="menu-line absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.6px] bg-ink transition-all duration-400" style="transition-timing-function:var(--ease-soft)"></span>
              <span class="menu-line absolute inset-x-0 bottom-0 h-[1.6px] bg-ink transition-all duration-400" style="transition-timing-function:var(--ease-soft)"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>`;
}

/* ------------------------------------------------------------- footer */
export function footerHTML() {
  const year = '۱۴۰۰';
  return `
  <footer class="relative bg-ink-deep text-paper overflow-hidden">
    <div class="absolute inset-0 shamseh-pattern-ink opacity-60" aria-hidden="true"></div>
    <div class="sunburst absolute -top-[30rem] left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] opacity-[0.35]" style="animation:spin 90s linear infinite" aria-hidden="true"></div>
    <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 pt-16 pb-8">
      <div class="grid gap-12 md:grid-cols-12">
        <div class="md:col-span-5">
          <img src="/images/logo-full.png" alt="گروه سینمایی شمسه فیلم" width="170" height="78" class="h-14 w-auto brightness-0 invert opacity-90" />
          <p class="mt-6 text-[0.95rem] leading-8 text-paper/70 max-w-sm">
            آرشیوی روشن از تولیدات سینمایی؛ از مستند و فیلم داستانی تا نماهنگ و برنامه تلویزیونی.
            سینما، هنرِ نور است و ما با نور روایت می‌سازیم.
          </p>
        </div>
        <nav class="md:col-span-3" aria-label="پیوندهای سایت">
          <p class="label-mono !text-gold/80 mb-5">MENU</p>
          <ul class="space-y-3.5 text-[0.95rem]">
            <li><a href="/" class="link-underline text-paper/80 hover:text-gold transition-colors">خانه</a></li>
            <li><a href="/productions" class="link-underline text-paper/80 hover:text-gold transition-colors">تولیدات</a></li>
            <li><a href="/news" class="link-underline text-paper/80 hover:text-gold transition-colors">اخبار</a></li>
            <li><a href="/about" class="link-underline text-paper/80 hover:text-gold transition-colors">معرفی</a></li>
            <li><a href="/gallery" class="link-underline text-paper/80 hover:text-gold transition-colors">گالری تصاویر</a></li>
            <li><a href="/contact" class="link-underline text-paper/80 hover:text-gold transition-colors">ارتباط با ما</a></li>
          </ul>
        </nav>
        <div class="md:col-span-4">
          <p class="label-mono !text-gold/80 mb-5">CONTACT</p>
          <address class="not-italic text-[0.92rem] leading-7 text-paper/75">
            ${esc(company.address)}
          </address>
          <div class="mt-4 space-y-1.5 text-paper/85" dir="ltr">
            <a href="${company.phoneHref}" class="block hover:text-gold transition-colors w-fit" dir="ltr">${esc(company.phone)}</a>
            ${company.mobiles.map((m, i) => `<a href="${company.mobileHrefs[i]}" class="block hover:text-gold transition-colors w-fit" dir="ltr">${esc(m)}</a>`).join('')}
          </div>
        </div>
      </div>
      <div class="rule-gold my-10" aria-hidden="true"></div>
      <div class="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        <p class="text-[0.8rem] text-paper/50">© ${year} — گروه سینمایی شمسه فیلم؛ کلیه حقوق محفوظ است.</p>
        <nav class="flex items-center gap-2.5" aria-label="پیوندهای مرتبط">
          ${company.links.slice(0, 4).map((l) => `
            <a href="${esc(l.url)}" target="_blank" rel="noopener" class="leaf-xs px-3.5 py-1.5 text-[0.75rem] border border-paper/15 text-paper/70 hover:border-gold hover:text-gold transition-colors">${esc(l.title)}</a>`).join('')}
        </nav>
      </div>
    </div>
  </footer>`;
}

/* -------------------------------------------------------- mobile menu */
export function mobileMenuHTML() {
  const cats = [
    ['/productions?cat=tv', 'برنامه تلویزیونی'],
    ['/productions?cat=fiction', 'داستانی'],
    ['/productions?cat=documentary', 'مستند'],
    ['/productions?cat=music-video', 'نماهنگ'],
  ];
  const items = [
    { href: '/', label: 'خانه', n: '۰۱' },
    { href: '/productions', label: 'تولیدات', n: '۰۲' },
    { href: '/news', label: 'اخبار', n: '۰۳' },
    { href: '/about', label: 'معرفی', n: '۰۴' },
    { href: '/gallery', label: 'گالری تصاویر', n: '۰۵' },
    { href: '/contact', label: 'ارتباط با ما', n: '۰۶' },
  ];
  return `
  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="منوی ناوبری" hidden>
    <div class="absolute inset-0 shamseh-pattern opacity-40" aria-hidden="true"></div>
    <div class="relative min-h-full flex flex-col px-6 pt-6 pb-10">
      <div class="flex items-center justify-between h-[4.4rem]">
        <img src="/images/logo-full.png" alt="گروه سینمایی شمسه فیلم" width="140" height="64" class="h-10 w-auto" />
        <button type="button" id="menu-close" class="grid place-items-center w-11 h-11 rounded-full border border-line bg-white/80" aria-label="بستن منو">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <nav class="flex-1 flex flex-col justify-center gap-1" aria-label="ناوبری موبایل">
        ${items.map((it) => `
          <a href="${it.href}" class="stagger-item group flex items-baseline gap-4 py-3 border-b border-line/70">
            <span class="label-mono !text-teal">${it.n}</span>
            <span class="h-display text-[2rem] leading-none group-hover:text-teal-deep transition-colors">${esc(it.label)}</span>
          </a>`).join('')}
      </nav>
      <div class="stagger-item mt-8">
        <p class="label-mono mb-3">CATEGORIES</p>
        <div class="flex flex-wrap gap-2">
          ${cats.map(([href, label]) => `<a href="${href}" class="leaf-xs bg-white border border-line px-4 py-2 text-[0.85rem] font-medium text-ink-soft hover:text-teal-deep hover:border-teal transition-colors">${esc(label)}</a>`).join('')}
        </div>
      </div>
      <div class="stagger-item mt-8 pt-6 border-t border-line">
        <p class="label-mono mb-3">CONTACT</p>
        <div class="text-[0.9rem] leading-7 text-ink-soft">${esc(company.addressShort)}</div>
        <div class="mt-2 flex flex-wrap gap-x-5 gap-y-1" dir="ltr">
          <a href="${company.phoneHref}" class="text-teal-deep font-semibold" dir="ltr">${esc(company.phone)}</a>
          <a href="${company.mobileHrefs[0]}" class="text-teal-deep font-semibold" dir="ltr">${esc(company.mobiles[0])}</a>
        </div>
      </div>
    </div>
  </div>`;
}

/* -------------------------------------------------------- search overlay */
export function searchOverlayHTML() {
  return `
  <div class="search-overlay hidden" id="search-overlay" role="dialog" aria-modal="true" aria-label="جستجو">
    <div class="max-w-3xl mx-auto px-5 pt-24 md:pt-32">
      <div class="flex items-center gap-4 border-b-2 border-ink/70 pb-4">
        <i data-lucide="search" class="w-6 h-6 text-teal-deep shrink-0"></i>
        <input type="search" id="search-input" class="flex-1 bg-transparent outline-none text-2xl md:text-3xl font-display font-bold placeholder:text-ink-mute/60" placeholder="جستجو در تولیدات و اخبار…" autocomplete="off" />
        <button type="button" id="search-close" class="grid place-items-center w-11 h-11 rounded-full border border-line bg-white/80" aria-label="بستن جستجو">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div id="search-results" class="mt-8 max-h-[55vh] overflow-y-auto"></div>
      <p class="mt-8 label-mono">ESC TO CLOSE</p>
    </div>
  </div>`;
}

/* ----------------------------------------------------------- behavior */
export function initChrome() {
  icons();

  /* header floating + hide-on-scroll */
  const header = document.getElementById('site-header');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (!header) return;
    header.classList.toggle('floating', y > 24);
    if (y > 320 && y > lastY + 6) header.classList.add('hidden-down');
    else if (y < lastY - 4 || y < 320) header.classList.remove('hidden-down');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* mobile menu */
  const menu = document.getElementById('mobile-menu');
  const openBtn = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');
  const setOpen = (v) => {
    if (!menu) return;
    if (v) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('open'));
      document.body.style.overflow = 'hidden';
      openBtn?.setAttribute('aria-expanded', 'true');
    } else {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      openBtn?.setAttribute('aria-expanded', 'false');
      setTimeout(() => { menu.hidden = true; }, 660);
    }
  };
  openBtn?.addEventListener('click', () => setOpen(true));
  closeBtn?.addEventListener('click', () => setOpen(false));
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  /* search overlay with live results */
  const overlay = document.getElementById('search-overlay');
  const sInput = document.getElementById('search-input');
  const sResults = document.getElementById('search-results');
  const openSearch = () => {
    overlay?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => sInput?.focus(), 40);
  };
  const closeSearch = () => {
    overlay?.classList.add('hidden');
    document.body.style.overflow = '';
  };
  document.getElementById('search-open')?.addEventListener('click', openSearch);
  document.getElementById('search-close')?.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSearch(); setOpen(false); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  if (sInput) {
    const run = () => {
      const q = sInput.value.trim();
      if (q.length < 2) {
        sResults.innerHTML = '<p class="text-ink-mute text-sm">حداقل دو نویسه بنویسید…</p>';
        return;
      }
      const qp = productions.filter((p) =>
        p.title.includes(q) || p.synopsis.join(' ').includes(q) ||
        p.credits.some((c) => c.names.some((n) => n.includes(q))));
      const qn = news.filter((n) => n.title.includes(q) || n.body.includes(q));
      if (!qp.length && !qn.length) {
        sResults.innerHTML = `
          <div class="text-center py-14">
            <div class="mx-auto w-24 h-24 shamseh-pattern opacity-70 leaf-sm bg-sand/60"></div>
            <p class="mt-5 text-ink-soft">نتیجه‌ای یافت نشد؛ عبارت دیگری بیازمایید.</p>
          </div>`;
        return;
      }
      sResults.innerHTML = `
        ${qp.length ? `<p class="label-mono mb-3">PRODUCTIONS · ${qp.length}</p>
        <ul class="divide-y divide-line">${qp.slice(0, 8).map((p) => `
          <li><a href="/productions/${p.slug}" class="flex items-center gap-4 py-3.5 group">
            <span class="leaf-xs w-14 h-10 overflow-hidden bg-sand shrink-0">${p.poster ? `<img src="${img(p.poster)}" alt="" class="w-full h-full object-cover" loading="lazy"/>` : ''}</span>
            <span class="flex-1">
              <span class="block font-bold group-hover:text-teal-deep transition-colors">${esc(p.title)}</span>
              <span class="block text-[0.78rem] text-ink-mute">${esc(p.categoryFa)}</span>
            </span>
            <i data-lucide="arrow-left" class="w-4 h-4 text-teal-deep opacity-0 group-hover:opacity-100 transition-opacity"></i>
          </a></li>`).join('')}</ul>` : ''}
        ${qn.length ? `<p class="label-mono mt-7 mb-3">NEWS · ${qn.length}</p>
        <ul class="divide-y divide-line">${qn.slice(0, 6).map((n) => `
          <li><a href="/news/${n.slug}" class="flex items-center gap-4 py-3.5 group">
            <span class="flex-1">
              <span class="block font-bold group-hover:text-teal-deep transition-colors">${esc(n.title)}</span>
              <span class="block text-[0.78rem] text-ink-mute">${esc(n.dateFa)}</span>
            </span>
            <i data-lucide="arrow-left" class="w-4 h-4 text-teal-deep opacity-0 group-hover:opacity-100 transition-opacity"></i>
          </a></li>`).join('')}</ul>` : ''}`;
      icons();
    };
    sInput.addEventListener('input', run);
  }

  /* custom leaf cursor (desktop fine pointers) */
  if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (!document.querySelector('.cursor-leaf')) {
      const cur = document.createElement('div');
      cur.className = 'cursor-leaf leaf-xs';
      cur.innerHTML = '<div class="inner leaf-xs"><span class="cursor-text">مشاهده</span></div>';
      document.body.appendChild(cur);
      let cx = -50, cy = -50, tx = -50, ty = -50;
      document.addEventListener('mousemove', (e) => {
        tx = e.clientX; ty = e.clientY;
        const over = e.target.closest('a[href^="/"], button, .print-card');
        cur.classList.toggle('grow', !!over);
      }, { passive: true });
      const tick = () => {
        cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
        cur.style.transform = `translate(${cx - cur.offsetWidth / 2}px, ${cy - cur.offsetHeight / 2}px)`;
        cur.style.opacity = '1';
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      document.documentElement.addEventListener('mouseleave', () => { cur.style.opacity = '0'; });
    }
  }
}

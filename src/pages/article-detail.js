/** Article detail — reading experience with progress line, related, prev/next. */
import { appUrl, img, esc, icons, seo } from '../js/utils.js';
import { headerHTML, footerHTML, mobileMenuHTML, searchOverlayHTML, initChrome } from '../components/Chrome.js';
import { initMotion } from '../js/animations.js';
import news from '../data/news.js';

export async function render(app, params) {
  const n = news.find((x) => x.slug === params.slug);
  if (!n) {
    const { render: notFound } = await import('./not-found.js');
    return notFound(app);
  }
  const idx = news.indexOf(n);
  const prev = news[(idx - 1 + news.length) % news.length];
  const next = news[(idx + 1) % news.length];
  const related = news.filter((x) => x.slug !== n.slug).slice(0, 2);

  seo({ title: n.title, description: n.excerpt, image: n.image });

  const shareUrl = encodeURIComponent(location.href);
  const shareTitle = encodeURIComponent(n.title);

  app.innerHTML = `
  <div class="reading-progress" id="reading-progress" aria-hidden="true"></div>
  ${headerHTML('news')}
  ${mobileMenuHTML()}
  ${searchOverlayHTML()}

  <main id="main" class="pt-[4.4rem] md:pt-[5.2rem]">
    <article>
      <header class="relative overflow-hidden border-b border-line">
        <div class="absolute inset-0 shamseh-pattern opacity-30" aria-hidden="true"></div>
        <div class="relative max-w-4xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-10 text-center">
          <nav class="flex items-center justify-center gap-2 text-[0.8rem] text-ink-mute mb-7 reveal-in" aria-label="مسیر">
            <a href="${appUrl('/')}" class="hover:text-teal-deep transition-colors">خانه</a><span>/</span>
            <a href="${appUrl('/news')}" class="hover:text-teal-deep transition-colors">اخبار</a>
          </nav>
          <p class="label-mono label-mono-teal mb-4">${esc(n.dateFa)}</p>
          <h1 class="h-display text-3xl md:text-5xl leading-[1.35] text-balance reveal-in">${esc(n.title)}</h1>
        </div>
      </header>

      ${n.image ? `
      <figure class="max-w-4xl mx-auto px-5 md:px-8 -mt-0 md:-mt-8 relative z-10 pt-8 md:pt-0">
        <div class="leaf overflow-hidden shadow-frame bg-sand aspect-[16/9]" data-leaf-reveal>
          <img src="${img(n.image)}" alt="${esc(n.title)}" class="w-full h-full object-cover" fetchpriority="high" />
        </div>
        <figcaption class="mt-3 text-center label-mono !text-[0.58rem]">${esc(n.title)} — تصویر: گروه سینمایی شمسه فیلم</figcaption>
      </figure>` : ''}

      <div class="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div class="prose-fa text-[1.02rem]">
          ${n.body.split(/(?<=[.!؟])\s+/).reduce((acc, s, i) => {
            if (i % 3 === 0) acc.push([]);
            acc[acc.length - 1].push(s);
            return acc;
          }, []).map((grp) => `<p class="reveal-in">${esc(grp.join(' '))}</p>`).join('')}
        </div>

        ${n.tags.length ? `
        <div class="mt-10 pt-8 border-t border-line">
          <p class="label-mono mb-3">TAGS · برچسب‌ها</p>
          <div class="flex flex-wrap gap-2">
            ${n.tags.map((t) => `<span class="leaf-xs bg-teal-tint text-teal-deep px-3.5 py-1.5 text-[0.8rem]">${esc(t)}</span>`).join('')}
          </div>
        </div>` : ''}

        <div class="mt-10 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <p class="label-mono">SHARE · اشتراک‌گذاری</p>
          <div class="flex items-center gap-2.5">
            <a href="https://t.me/share/url?url=${shareUrl}&text=${shareTitle}" target="_blank" rel="noopener" class="grid place-items-center w-10 h-10 leaf-xs border border-line bg-white text-ink-soft hover:text-teal-deep hover:border-teal transition-colors" aria-label="اشتراک در تلگرام">
              <i data-lucide="send" class="w-4 h-4"></i>
            </a>
            <a href="https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}" target="_blank" rel="noopener" class="grid place-items-center w-10 h-10 leaf-xs border border-line bg-white text-ink-soft hover:text-teal-deep hover:border-teal transition-colors" aria-label="اشتراک در واتس‌اپ">
              <i data-lucide="message-circle" class="w-4 h-4"></i>
            </a>
            <a href="mailto:?subject=${shareTitle}&body=${shareUrl}" class="grid place-items-center w-10 h-10 leaf-xs border border-line bg-white text-ink-soft hover:text-teal-deep hover:border-teal transition-colors" aria-label="اشتراک با ایمیل">
              <i data-lucide="mail" class="w-4 h-4"></i>
            </a>
            <button type="button" id="copy-link" class="grid place-items-center w-10 h-10 leaf-xs border border-line bg-white text-ink-soft hover:text-teal-deep hover:border-teal transition-colors" aria-label="کپی پیوند">
              <i data-lucide="link" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- related + prev/next -->
      <section class="bg-sand/60 border-t border-line py-14">
        <div class="max-w-[88rem] mx-auto px-5 md:px-8">
          <h2 class="h-title text-2xl mb-8">اخبار مرتبط</h2>
          <div class="grid sm:grid-cols-2 gap-8">
            ${related.map((r) => `
            <a href="${appUrl(`/news/${r.slug}`)}" class="group flex gap-5 items-center reveal-in">
              ${r.image ? `<span class="leaf-xs w-24 h-20 overflow-hidden bg-sand shrink-0"><img src="${img(r.image)}" alt="" class="w-full h-full object-cover" loading="lazy" /></span>` : ''}
              <span>
                <span class="label-mono block mb-2">${esc(r.dateFa)}</span>
                <span class="font-bold leading-7 group-hover:text-teal-deep transition-colors">${esc(r.title)}</span>
              </span>
            </a>`).join('')}
          </div>
        </div>
      </section>

      <nav class="border-t border-line" aria-label="ناوبری اخبار">
        <div class="max-w-[88rem] mx-auto grid grid-cols-2">
          <a href="${appUrl(`/news/${prev.slug}`)}" class="group py-9 px-5 md:px-8 border-e border-line hover:bg-sand/50 transition-colors">
            <p class="label-mono mb-2">→ خبر قبلی</p>
            <p class="font-bold group-hover:text-teal-deep transition-colors line-clamp-1">${esc(prev.title)}</p>
          </a>
          <a href="${appUrl(`/news/${next.slug}`)}" class="group py-9 px-5 md:px-8 text-start hover:bg-sand/50 transition-colors">
            <p class="label-mono mb-2">خبر بعدی ←</p>
            <p class="font-bold group-hover:text-teal-deep transition-colors line-clamp-1">${esc(next.title)}</p>
          </a>
        </div>
      </nav>
    </article>
  </main>

  ${footerHTML()}
  `;

  initChrome();
  initMotion(app);

  /* reading progress (tear down any previous listener before re-adding) */
  const prog = app.querySelector('#reading-progress');
  const article = app.querySelector('article');
  if (window.__readingProgressHandler) {
    window.removeEventListener('scroll', window.__readingProgressHandler);
  }
  const onScroll = () => {
    const rect = article.getBoundingClientRect();
    const total = rect.height - innerHeight;
    const done = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
    prog.style.transform = `scaleX(${done})`;
  };
  window.__readingProgressHandler = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* copy link */
  app.querySelector('#copy-link')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); } catch {}
    const b = app.querySelector('#copy-link');
    b.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 350 });
  });

  icons();
}

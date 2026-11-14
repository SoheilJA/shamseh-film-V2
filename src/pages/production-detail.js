/** Production detail — editorial feature page like a film catalogue. */
import { appUrl, img, esc, fa, icons, seo } from '../js/utils.js';
import { headerHTML, footerHTML, mobileMenuHTML, searchOverlayHTML, initChrome } from '../components/Chrome.js';
import { videoBlock, initVideoBlocks } from '../components/VideoPlayer.js';
import { openLightbox } from '../components/Lightbox.js';
import { initMotion } from '../js/animations.js';
import productions from '../data/productions.js';
import gallery from '../data/gallery.js';

const ROLE_EN = {
  'کارگردان': 'DIRECTOR', 'نویسنده': 'WRITER', 'نویسنده و کارگردان': 'WRITER / DIRECTOR',
  'تهیه‌کننده': 'PRODUCER', 'تهیه کنندگان': 'PRODUCERS', 'تهیه کننده و کارگردان': 'PRODUCER / DIRECTOR',
  'مدیر تصویربرداری': 'CINEMATOGRAPHY', 'تصویربردار': 'CAMERA', 'تدوین': 'EDITING',
  'صدابردار': 'SOUND', 'طراحی و ترکیب صدا': 'SOUND DESIGN', 'موسیقی': 'MUSIC', 'آهنگ‌ساز': 'COMPOSER',
  'بازیگران': 'CAST', 'عوامل': 'CREW', 'مجری طرح': 'EXECUTIVE PRODUCER', 'بازنویسی': 'REWRITE',
};

export async function render(app, params) {
  const p = productions.find((x) => x.slug === params.slug);
  if (!p) {
    const { render: notFound } = await import('./not-found.js');
    return notFound(app);
  }
  const idx = productions.indexOf(p);
  const prev = productions[(idx - 1 + productions.length) % productions.length];
  const next = productions[(idx + 1) % productions.length];
  const related = productions.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const gal = gallery.find((g) => g.linkedProduction === p.slug);
  const galImages = gal ? gal.images : p.images.slice(1);

  seo({
    title: p.title,
    description: (p.synopsis[0] || p.title).slice(0, 160),
    image: p.poster,
  });

  const dirCredit = p.credits.find((c) => c.role.includes('کارگردان'));

  app.innerHTML = `
  ${headerHTML('productions')}
  ${mobileMenuHTML()}
  ${searchOverlayHTML()}

  <main id="main" class="pt-[4.4rem] md:pt-[5.2rem]">
    <!-- hero -->
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 shamseh-pattern opacity-35" aria-hidden="true"></div>
      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
        <nav class="flex items-center gap-2 text-[0.8rem] text-ink-mute mb-8 reveal-in" aria-label="مسیر">
          <a href="${appUrl('/')}" class="hover:text-teal-deep transition-colors">خانه</a>
          <span aria-hidden="true">/</span>
          <a href="${appUrl('/productions')}" class="hover:text-teal-deep transition-colors">تولیدات</a>
          <span aria-hidden="true">/</span>
          <a href="${appUrl(`/productions?cat=${p.category}`)}" class="hover:text-teal-deep transition-colors">${esc(p.categoryFa)}</a>
        </nav>
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div class="lg:col-span-7">
            <p class="label-mono label-mono-teal mb-4" dir="ltr">${esc(p.category.toUpperCase())} · No.${String(idx + 1).padStart(2, '0')}</p>
            <h1 class="h-display text-4xl md:text-6xl leading-[1.2] text-balance reveal-in">${esc(p.title)}</h1>
            <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9rem] text-ink-soft reveal-in">
              <span class="inline-flex items-center gap-2">
                <i data-lucide="clapperboard" class="w-4 h-4 text-teal-deep"></i>${esc(p.categoryFa)}
              </span>
              <span class="inline-flex items-center gap-2">
                <i data-lucide="calendar" class="w-4 h-4 text-teal-deep"></i>${esc(p.dateFa)}
              </span>
              ${dirCredit ? `<span class="inline-flex items-center gap-2">
                <i data-lucide="film" class="w-4 h-4 text-teal-deep"></i>کارگردان: ${esc(dirCredit.names.join('، '))}
              </span>` : ''}
            </div>
          </div>
          <div class="lg:col-span-5 relative">
            <div class="ghost-num gold -top-14 -left-8 hidden lg:block" aria-hidden="true" dir="ltr">${String(idx + 1).padStart(2, '0')}</div>
            <div class="relative overflow-hidden leaf aspect-[4/5] shadow-frame bg-sand" data-leaf-reveal>
              ${p.poster ? `<img src="${img(p.poster)}" alt="پوستر ${esc(p.title)}" class="w-full h-full object-cover" fetchpriority="high" />` : '<span class="grid w-full h-full place-items-center text-ink-mute">بدون تصویر</span>'}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- synopsis + credits -->
    <section class="py-14 md:py-20">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12">
        <article class="lg:col-span-7 order-2 lg:order-1">
          <p class="label-mono label-mono-teal mb-6 reveal-in" dir="ltr">SYNOPSIS</p>
          <div class="prose-fa">
            ${p.synopsis.map((s) => `<p class="reveal-in">${esc(s)}</p>`).join('')}
          </div>

          ${p.aparat.length ? `
          <div class="mt-12 reveal-in">
            <p class="label-mono label-mono-teal mb-6" dir="ltr">PREVIEW</p>
            ${videoBlock(p.aparat, p.images[1] || p.poster, p.title)}
          </div>` : ''}

          ${galImages.length > 1 ? `
          <div class="mt-12 reveal-in">
            <p class="label-mono label-mono-teal mb-6" dir="ltr">STILLS / تصاویر</p>
            <div class="grid grid-cols-3 gap-3" id="detail-gallery">
              ${galImages.slice(0, 9).map((src, i) => `
              <button type="button" class="overflow-hidden ${i % 2 ? 'leaf-flip' : 'leaf'} aspect-[4/3] bg-white border border-line shadow-card zoomable" data-gi="${i}" aria-label="بزرگ‌نمایی تصویر ${i + 1}">
                <img src="${img(src)}" alt="تصویر ${i + 1} از ${esc(p.title)}" class="w-full h-full object-cover" loading="lazy" />
              </button>`).join('')}
            </div>
          </div>` : ''}
        </article>

        <aside class="lg:col-span-5 order-1 lg:order-2">
          <div class="lg:sticky lg:top-28">
            <div class="bg-white leaf-sm border border-line shadow-card p-6 md:p-8 reveal-in">
              <p class="label-mono label-mono-teal mb-6" dir="ltr">CREDITS · عوامل</p>
              <dl class="divide-y divide-line/70">
                ${p.credits.map((c) => `
                <div class="py-3.5 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-baseline">
                  <dt class="text-[0.82rem] text-ink-mute">${esc(c.role)}
                    <span class="label-mono !text-[0.52rem] block">${ROLE_EN[c.role] || ''}</span>
                  </dt>
                  <dd class="font-bold text-[0.95rem] leading-7 text-left">${c.names.map(esc).join('<br/>')}</dd>
                </div>`).join('')}
              </dl>
              ${!p.credits.length ? '<p class="text-ink-mute text-sm">اطلاعات عوامل برای این اثر ثبت نشده است.</p>' : ''}
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- related -->
    ${related.length ? `
    <section class="bg-sand/60 border-t border-line py-16 md:py-20">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8">
        <div class="flex items-end justify-between gap-6 mb-10">
          <h2 class="h-title text-2xl md:text-3xl">آثار مرتبط</h2>
          <a href="${appUrl(`/productions?cat=${p.category}`)}" class="link-underline text-teal-deep font-semibold text-[0.9rem]">سایر ${esc(p.categoryFa)}ها</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          ${related.map((r) => `
          <a href="${appUrl(`/productions/${r.slug}`)}" class="print-card group/print reveal-in">
            <div class="print-frame leaf overflow-hidden aspect-[3/4] zoomable relative">
              ${r.poster ? `<img src="${img(r.poster)}" alt="پوستر ${esc(r.title)}" class="w-full h-full object-cover" loading="lazy" />` : '<span class="grid w-full h-full place-items-center bg-sand text-ink-mute text-sm">بدون تصویر</span>'}
              <span class="view-badge leaf-xs" aria-hidden="true">
                <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 6 L26 16 L36 22 L26 28 L22 38 L18 28 L8 22 L18 16 Z" fill="none"/><circle cx="36" cy="8" r="2.6" fill="currentColor" stroke="none"/></svg>
              </span>
            </div>
            <div class="pt-3 px-1">
              <p class="font-bold group-hover/print:text-teal-deep transition-colors">${esc(r.title)}</p>
              <p class="label-mono !text-[0.58rem] mt-1">${esc(r.categoryFa)}</p>
            </div>
          </a>`).join('')}
        </div>
      </div>
    </section>` : ''}

    <!-- prev / next -->
    <nav class="border-t border-line" aria-label="ناوبری اثرها">
      <div class="max-w-[88rem] mx-auto grid grid-cols-2">
        <a href="${appUrl(`/productions/${prev.slug}`)}" class="group py-10 md:py-14 px-5 md:px-8 border-e border-line hover:bg-sand/50 transition-colors">
          <p class="label-mono mb-3">→ اثر قبلی</p>
          <p class="h-title text-lg md:text-2xl group-hover:text-teal-deep transition-colors">${esc(prev.title)}</p>
        </a>
        <a href="${appUrl(`/productions/${next.slug}`)}" class="group py-10 md:py-14 px-5 md:px-8 text-start hover:bg-sand/50 transition-colors">
          <p class="label-mono mb-3">اثر بعدی ←</p>
          <p class="h-title text-lg md:text-2xl group-hover:text-teal-deep transition-colors">${esc(next.title)}</p>
        </a>
      </div>
    </nav>
  </main>

  ${footerHTML()}
  `;

  initChrome();
  initMotion(app);
  initVideoBlocks(app);

  app.querySelector('#detail-gallery')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-gi]');
    if (!btn) return;
    openLightbox(galImages.map((src) => ({ src, caption: p.title })), parseInt(btn.dataset.gi, 10));
  });

  icons();
}

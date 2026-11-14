/** Homepage — "The Opening Sequence" — 7 sections of light. */
import { appUrl, img, esc, fa, icons, seo } from '../js/utils.js';
import { headerHTML, footerHTML, mobileMenuHTML, searchOverlayHTML, initChrome } from '../components/Chrome.js';
import { productionCard } from '../components/ProductionCard.js';
import { openLightbox } from '../components/Lightbox.js';
import { initMotion } from '../js/animations.js';
import productions from '../data/productions.js';
import news from '../data/news.js';
import gallery from '../data/gallery.js';
import company from '../data/company.js';

export async function render(app) {
  seo({
    title: 'گروه سینمایی شمسه فیلم',
    description: 'آرشیوی روشن از تولیدات سینمایی؛ مستند، فیلم داستانی، نماهنگ و برنامه تلویزیونی از مشهد.',
    image: '/images/logo-full.png',
  });

  const featured = productions.find((p) => p.slug === 'علی-مدد') || productions[0];
  const picks = [
    productions.find((p) => p.slug === 'ماهی-پرنده'),
    productions.find((p) => p.slug === 'موکب-الرضا'),
    productions.find((p) => p.slug === 'رفاقت-هایتک'),
    productions.find((p) => p.slug === 'عاشق-السلطان'),
    productions.find((p) => p.slug === 'ملت-شهر'),
  ].filter(Boolean);

  const cats = [
    { key: 'documentary', fa: 'مستند', faPl: 'مستندها', desc: 'روایت واقعیت با نگاهی سینمایی؛ از آثار کوتاه تا مجموعه‌های چندقسمتی.', tint: 'bg-teal-tint', accent: 'text-teal-deep' },
    { key: 'fiction', fa: 'داستانی', faPl: 'آثار داستانی', desc: 'فیلم‌های کوتاه داستانی؛ روایت‌های تازه از فیلمنامه‌نویسان و کارگردانان خراسان.', tint: 'bg-gold-tint', accent: 'text-gold-deep' },
    { key: 'music-video', fa: 'نماهنگ', faPl: 'نماهنگ‌ها', desc: 'تصویر و موسیقی در کنار هم؛ نماهنگ‌هایی با هویت بصری مشخص.', tint: 'bg-white', accent: 'text-teal-deep' },
    { key: 'tv', fa: 'برنامه تلویزیونی', faPl: 'برنامه‌های تلویزیونی', desc: 'مجموعه‌ها و برنامه‌های تلویزیونی؛ از گفت‌ومگو تا بازنمایی اندیشه.', tint: 'bg-sand', accent: 'text-ink' },
  ];

  const allGalleryImages = gallery.flatMap((g) => g.images.map((src) => ({ src, caption: g.title })));

  app.innerHTML = `
  ${headerHTML('home')}
  ${mobileMenuHTML()}
  ${searchOverlayHTML()}

  <main id="main">
    <!-- ══════════ SECTION 01 — Luminous Hero ══════════ -->
    <section class="relative overflow-hidden pt-[4.4rem] md:pt-[5.2rem]" data-hero>
      <div class="absolute inset-0 shamseh-pattern opacity-45" aria-hidden="true"></div>
      <div class="sunburst absolute -top-[42rem] left-1/2 -translate-x-1/2 w-[92rem] h-[92rem] opacity-50" style="animation:spin 120s linear infinite" data-sunburst-scroll aria-hidden="true"></div>

      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 pt-10 pb-16 md:pt-16 md:pb-24 grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-6 order-2 lg:order-1">
          <p class="label-mono label-mono-teal mb-5 reveal" dir="ltr">SHAMSEH FILM · MASHHAD</p>
          <h1 class="h-display text-[2.6rem] leading-[1.22] sm:text-6xl lg:text-[4.2rem] lg:leading-[1.18] text-balance">
            <span class="block overflow-hidden"><span class="block" data-line>سینما،</span></span>
            <span class="block overflow-hidden"><span class="block text-teal-deep" data-line>هنرِ نور است</span></span>
            <span class="block overflow-hidden"><span class="block" data-line>و ما با نور</span></span>
            <span class="block overflow-hidden"><span class="block" data-line>روایت می‌سازیم<span class="text-gold">.</span></span></span>
          </h1>
          <p class="mt-7 text-[1.02rem] leading-8 text-ink-soft measure reveal" data-hero-fade>
            گروه سینمایی شمسه فیلم؛ خانهٔ تولید مستند، فیلم داستانی، نماهنگ و برنامه تلویزیونی.
            اینجا آرشیوی روشن از آثار ماست — مثل چاپ‌هایی روی دیواری آفتابی.
          </p>
          <div class="mt-9 flex flex-wrap items-center gap-4 reveal" data-hero-fade>
            <a href="${appUrl('/productions')}" class="btn-primary leaf-sm">تماشای تولیدات
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
            </a>
            <a href="${appUrl('/about')}" class="btn-ghost leaf-sm">معرفی شمسه فیلم</a>
          </div>
          <div class="mt-10 flex items-center gap-6 reveal" data-hero-fade>
            <div class="film-strip flex-1" aria-hidden="true"></div>
            <span class="label-mono" dir="ltr">SC 01 · TAKE 01</span>
          </div>
        </div>

        <div class="lg:col-span-6 order-1 lg:order-2 relative" data-hero-frame>
          <div class="relative overflow-hidden leaf aspect-[4/3] shadow-frame bg-sand" data-leaf-reveal>
            <img src="${featured.poster ? img(featured.poster) : appUrl('/images/logo-full.png')}" alt="کادر شاخص از تولیدات شمسه فیلم" class="w-full h-full object-cover" data-hero-media data-parallax="0.06" fetchpriority="high" />
            <span class="light-sweep" aria-hidden="true"></span>
          </div>
          <div class="absolute -bottom-5 -right-3 md:-right-6 bg-white leaf-sm border border-line shadow-card px-5 py-3.5 reveal" data-hero-fade>
            <p class="text-[0.85rem] font-bold">${esc(featured.title)}</p>
            <p class="label-mono !text-[0.58rem] mt-0.5">${esc(featured.categoryFa)} · از آرشیو</p>
          </div>
          <div class="hidden md:grid absolute -top-6 -left-4 w-24 h-24 place-items-center leaf-sm bg-gold-tint border border-gold/30 rotate-[-8deg] reveal" data-hero-fade aria-hidden="true">
            <span class="label-mono !text-gold-deep" dir="ltr">EST<br>1400</span>
          </div>
        </div>
      </div>

      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 pb-8 flex items-center justify-center reveal" data-hero-fade>
        <a href="#selected" class="group flex flex-col items-center gap-2 text-ink-mute hover:text-teal-deep transition-colors" aria-label="ادامه به پایین">
          <span class="label-mono !text-[0.58rem]">SCROLL</span>
          <span class="grid place-items-center w-9 h-9 rounded-full border border-line group-hover:border-teal transition-colors animate-bounce" style="animation-duration:2.4s">
            <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </span>
        </a>
      </div>
    </section>

    <!-- ══════════ SECTION 02 — Selected Productions ══════════ -->
    <section id="selected" class="relative bg-sand/60 py-20 md:py-28 border-y border-line overflow-hidden">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8">
        <div class="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p class="label-mono label-mono-teal mb-4">SELECTED WORKS</p>
            <h2 class="h-title text-3xl md:text-5xl text-balance">انتخابی از دیوارِ آثار</h2>
          </div>
          <a href="${appUrl('/productions')}" class="link-underline text-teal-deep font-semibold flex items-center gap-2">
            آرشیو کامل تولیدات
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </a>
        </div>

        <div class="grid md:grid-cols-12 gap-x-8 gap-y-14">
          <div class="md:col-span-12 relative">
            ${productionCard(featured, { index: 0, size: 'feature' })}
          </div>
          <div class="md:col-span-5 md:pt-10">
            ${productionCard(picks[0], { index: 1, size: 'tall', flip: true })}
          </div>
          <div class="md:col-span-7 md:pt-24">
            ${productionCard(picks[1], { index: 2, size: 'wide' })}
          </div>
          <div class="md:col-span-4">
            ${productionCard(picks[2], { index: 3, flip: true })}
          </div>
          <div class="md:col-span-4 md:pt-12">
            ${productionCard(picks[3], { index: 4 })}
          </div>
          <div class="md:col-span-4 md:pt-6">
            ${productionCard(picks[4], { index: 5, flip: true })}
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ SECTION 03 — About ══════════ -->
    <section class="relative py-20 md:py-28 overflow-hidden">
      <div class="absolute inset-0 shamseh-pattern-gold opacity-30" aria-hidden="true"></div>
      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 grid gap-14 lg:grid-cols-12 items-center">
        <div class="lg:col-span-5 relative">
          <div class="absolute -inset-3 leaf border border-gold/40 translate-x-3 translate-y-3" aria-hidden="true"></div>
          <div class="relative overflow-hidden leaf aspect-[4/5] shadow-frame bg-sand" data-leaf-reveal>
            <img src="${img(picks[4]?.poster || featured.poster)}" alt="تصویری از پشت صحنه تولیدات شمسه فیلم" class="w-full h-full object-cover" loading="lazy" data-parallax="0.05" />
          </div>
          <div class="absolute -bottom-6 right-5 left-5 bg-white leaf-sm border border-line shadow-card px-5 py-4 reveal-in">
            <p class="text-[0.88rem] font-bold">گروه سینمایی شمسه فیلم</p>
            <p class="label-mono !text-[0.58rem] mt-1" dir="ltr">BASED IN MASHHAD, IRAN</p>
          </div>
        </div>
        <div class="lg:col-span-7 lg:ps-10">
          <p class="label-mono label-mono-teal mb-4 reveal-in">ABOUT SHAMSEH</p>
          <h2 class="h-title text-3xl md:text-5xl mb-8 text-balance reveal-in">
            «شمسه»، مدالی است که نور<br class="hidden md:block" /> از آن می‌تابد.
          </h2>
          <div class="prose-fa measure reveal-in">
            <p>
              گروه سینمایی شمسه فیلم یک گروه تولید سینمایی در مشهد است که فعالیت خود را در حوزه‌های
              مستند، فیلم داستانی، نماهنگ و برنامه تلویزیونی متمرکز کرده است. از مجموعه‌های مستند چندقسمتی
              تا فیلم‌های کوتاه داستانی، آثار این گروه در جشنواره‌هایی مانند جشنواره سیمرغ حضور یافته‌اند.
            </p>
            <p>
              در این خانه، نور تنها ابزار ثبت نیست؛ مادهٔ اصلی روایت است. هر اثر، از لحظهٔ پژوهش تا تدوین،
              با همین نگاه شکل می‌گیرد — روشن، دقیق و انسانی.
            </p>
          </div>
          <div class="mt-9 grid grid-cols-3 gap-4 reveal-in">
            ${[
              [fa(productions.length), 'اثر تولیدشده'],
              [fa(productions.filter((p) => p.category === 'documentary').length), 'مستند'],
              [fa(news.length), 'رویداد و خبر'],
            ].map(([n, l]) => `
              <div class="text-center py-5 leaf-sm bg-white border border-line shadow-card">
                <p class="h-display text-3xl md:text-4xl text-teal-deep">${n}</p>
                <p class="mt-1 text-[0.8rem] text-ink-mute">${l}</p>
              </div>`).join('')}
          </div>
          <a href="${appUrl('/about')}" class="mt-9 inline-flex items-center gap-2 link-underline text-teal-deep font-semibold reveal-in">
            بیشتر بخوانید
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- ══════════ SECTION 04 — Categories accordion ══════════ -->
    <section class="bg-sand/60 border-y border-line py-20 md:py-28">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8">
        <div class="mb-12 md:mb-16 max-w-2xl">
          <p class="label-mono label-mono-teal mb-4 reveal-in">CATEGORIES</p>
          <h2 class="h-title text-3xl md:text-5xl text-balance reveal-in">چهار قلمروِ روایت</h2>
        </div>
        <div class="flex flex-col md:flex-row gap-3 md:h-[30rem]" id="cat-accordion">
          ${cats.map((c, i) => {
            const sample = productions.find((p) => p.category === c.key);
            const count = productions.filter((p) => p.category === c.key).length;
            return `
            <div class="cat-panel group relative overflow-hidden leaf-sm border border-line ${i === 0 ? 'open md:flex-[2.4]' : 'md:flex-[1]'} ${c.tint} ${i !== 0 ? 'h-24 md:h-auto' : 'h-[26rem] md:h-auto'}" data-cat="${c.key}">
              <a href="${appUrl(`/productions?cat=${c.key}`)}" class="absolute inset-0 z-10" aria-label="${esc(c.faPl)}"></a>
              ${sample?.poster ? `
              <div class="absolute inset-0 ${i === 0 ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100 group-open:opacity-100'} transition-opacity duration-700">
                <img src="${img(sample.poster)}" alt="" class="w-full h-full object-cover" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-paper via-paper/60 to-paper/15"></div>
              </div>` : ''}
              <div class="relative h-full flex flex-col justify-between p-6 md:p-7 pointer-events-none">
                <div class="flex items-start justify-between">
                  <span class="label-mono">${String(i + 1).padStart(2, '0')}</span>
                  <span class="leaf-xs bg-white/85 border border-line px-3 py-1 text-[0.75rem] font-bold ${c.accent}">${fa(count)} اثر</span>
                </div>
                <div class="cat-detail ${i === 0 ? '' : 'md:opacity-0 md:group-hover:opacity-100 md:translate-y-3 md:group-hover:translate-y-0 transition-all duration-500'}">
                  <h3 class="h-display text-2xl md:text-[2rem] leading-tight">${esc(c.fa)}</h3>
                  <p class="mt-3 text-[0.9rem] leading-7 text-ink-soft max-w-sm">${esc(c.desc)}</p>
                  <span class="mt-4 inline-flex items-center gap-2 text-teal-deep font-bold text-[0.9rem]">
                    دیدن ${esc(c.faPl)}
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  </span>
                </div>
                <h3 class="h-display text-xl md:hidden">${esc(c.fa)}</h3>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </section>

    <!-- ══════════ SECTION 05 — News (editorial) ══════════ -->
    <section class="py-20 md:py-28">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8">
        <div class="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p class="label-mono label-mono-teal mb-4">NEWS & EVENTS</p>
            <h2 class="h-title text-3xl md:text-5xl text-balance">دفترِ رویدادها</h2>
          </div>
          <a href="${appUrl('/news')}" class="link-underline text-teal-deep font-semibold flex items-center gap-2">
            همهٔ اخبار
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </a>
        </div>
        <div class="grid lg:grid-cols-12 gap-10">
          <a href="${appUrl(`/news/${news[0].slug}`)}" class="lg:col-span-7 group reveal-in">
            ${news[0].image ? `
            <div class="leaf overflow-hidden aspect-[16/10] shadow-frame bg-sand zoomable">
              <img src="${img(news[0].image)}" alt="${esc(news[0].title)}" class="w-full h-full object-cover" loading="lazy" />
            </div>` : ''}
            <div class="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 items-start">
              <span class="h-display text-5xl md:text-6xl text-teal/25 leading-none" dir="ltr">${news[0].dateFa.split(' ')[0]}</span>
              <div>
                <p class="label-mono mb-2">${esc(news[0].dateFa)}</p>
                <h3 class="h-title text-xl md:text-2xl group-hover:text-teal-deep transition-colors">${esc(news[0].title)}</h3>
                <p class="mt-3 text-[0.95rem] leading-8 text-ink-soft">${esc(news[0].excerpt)}…</p>
              </div>
            </div>
          </a>
          <div class="lg:col-span-5 lg:border-s lg:border-line lg:ps-10 flex flex-col">
            ${news.slice(1, 5).map((n, i) => `
            <a href="${appUrl(`/news/${n.slug}`)}" class="group flex-1 py-5 ${i > 0 ? 'border-t border-line' : 'pt-0'} reveal-in">
              <div class="flex items-baseline justify-between gap-4">
                <p class="label-mono">${esc(n.dateFa)}</p>
                <span class="label-mono !text-[0.55rem]" dir="ltr">N.${String(i + 2).padStart(2, '0')}</span>
              </div>
              <h3 class="mt-2.5 font-bold text-[1.05rem] leading-7 group-hover:text-teal-deep transition-colors">${esc(n.title)}</h3>
              <p class="mt-2 text-[0.85rem] leading-6 text-ink-mute">${esc(n.excerpt.slice(0, 90))}…</p>
            </a>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ SECTION 06 — Gallery strip ══════════ -->
    <section class="bg-sand/60 border-y border-line py-20 md:py-28 overflow-hidden">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8">
        <div class="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p class="label-mono label-mono-teal mb-4">GALLERY</p>
            <h2 class="h-title text-3xl md:text-5xl text-balance">برگه‌هایی از پشت صحنه</h2>
          </div>
          <a href="${appUrl('/gallery')}" class="link-underline text-teal-deep font-semibold flex items-center gap-2">
            گالری کامل
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-5 md:px-8" id="home-gallery">
        ${allGalleryImages.slice(0, 8).map((g, i) => `
        <button type="button" class="relative overflow-hidden ${i % 2 ? 'leaf-flip' : 'leaf'} aspect-[4/3] bg-white border border-line shadow-card zoomable group" data-gi="${i}" aria-label="بزرگ‌نمایی تصویر ${i + 1}">
          <img src="${img(g.src)}" alt="${esc(g.caption)}" class="w-full h-full object-cover" loading="lazy" />
          <span class="absolute inset-0 bg-teal-tint/0 group-hover:bg-teal-tint/30 transition-colors" aria-hidden="true"></span>
        </button>`).join('')}
      </div>
    </section>

    <!-- ══════════ SECTION 07 — Closing (deep teal sunset) ══════════ -->
    <section class="relative bg-ink-deep text-paper overflow-hidden">
      <div class="absolute inset-0 shamseh-pattern-ink opacity-50" aria-hidden="true"></div>
      <div class="sunburst absolute -bottom-[34rem] left-1/2 -translate-x-1/2 w-[74rem] h-[74rem] opacity-40" style="animation:spin 100s linear infinite reverse" aria-hidden="true"></div>
      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
        <p class="label-mono !text-gold/80 mb-6 reveal-in" dir="ltr">LET THERE BE LIGHT</p>
        <h2 class="h-display text-4xl md:text-6xl leading-[1.25] max-w-3xl mx-auto text-balance reveal-in">
          روایتِ بعدی، از همین نور آغاز می‌شود.
        </h2>
        <p class="mt-7 text-paper/70 leading-8 max-w-xl mx-auto reveal-in">
          برای همکاری، سفارش تولید یا بازدید از آرشیو، با ما در تماس باشید.
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-4 reveal-in">
          <a href="${appUrl('/contact')}" class="btn-primary leaf-sm !bg-gold !text-ink-deep hover:!bg-gold-tint">
            ارتباط با شمسه فیلم
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </a>
          <a href="tel:${company.phoneHref.replace('tel:', '')}" class="btn-ghost leaf-sm !bg-transparent !border-paper/25 !text-paper hover:!border-gold hover:!text-gold" dir="ltr">${esc(company.phone)}</a>
        </div>
        <div class="mt-14 flex flex-col md:flex-row items-center justify-center gap-x-10 gap-y-3 text-[0.9rem] text-paper/65 reveal-in">
          <span>${esc(company.addressShort)}</span>
          <span class="hidden md:inline w-1 h-1 rounded-full bg-gold" aria-hidden="true"></span>
          <span dir="ltr">${esc(company.mobiles[0])} — ${esc(company.mobiles[1])}</span>
        </div>
      </div>
    </section>
  </main>

  ${footerHTML()}
  `;

  initChrome();
  initMotion(app);

  /* gallery lightbox */
  app.querySelector('#home-gallery')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-gi]');
    if (!btn) return;
    openLightbox(allGalleryImages.map((g) => ({ src: img(g.src).replace(/\.webp$/, '.jpg'), caption: g.caption })), parseInt(btn.dataset.gi, 10));
  });

  icons();
}

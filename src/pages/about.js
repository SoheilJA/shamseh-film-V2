/** About page — the story of light (only as supported by real content). */
import { appUrl, img, esc, fa, icons, seo } from '../js/utils.js';
import { headerHTML, footerHTML, mobileMenuHTML, searchOverlayHTML, initChrome } from '../components/Chrome.js';
import { initMotion } from '../js/animations.js';
import productions from '../data/productions.js';
import news from '../data/news.js';
import gallery from '../data/gallery.js';

export async function render(app) {
  seo({ title: 'معرفی', description: 'معرفی گروه سینمایی شمسه فیلم؛ گروه تولید سینمایی در مشهد، فعال در مستند، داستانی، نماهنگ و برنامه تلویزیونی.' });

  const aboutImg = productions.find((p) => p.slug === 'ملت-شهر')?.poster;
  const stills = gallery.flatMap((g) => g.images).slice(0, 4);

  app.innerHTML = `
  ${headerHTML('about')}
  ${mobileMenuHTML()}
  ${searchOverlayHTML()}

  <main id="main" class="pt-[4.4rem] md:pt-[5.2rem]">
    <!-- intro -->
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 shamseh-pattern opacity-40" aria-hidden="true"></div>
      <div class="sunburst absolute -top-[36rem] right-[-12rem] w-[70rem] h-[70rem] opacity-40" style="animation:spin 140s linear infinite" aria-hidden="true"></div>
      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20 grid lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7">
          <p class="label-mono label-mono-teal mb-5 reveal-in" dir="ltr">ABOUT · معرفی</p>
          <h1 class="h-display text-4xl md:text-6xl leading-[1.25] text-balance">
            «شمسه» یعنی خورشیدِ<br class="hidden md:block" /> تابناکِ نگارگری.
          </h1>
          <p class="mt-8 text-[1.05rem] leading-9 text-ink-soft measure reveal-in">
            در نگارگری سنتی ایرانی، «شمسه» مدالی هشت‌پر یا دوازده‌پر است در تابلوگاهِ کاشی و گچبری؛
            نقطه‌ای که نور ساختهٔ دستِ هنرمند از آن می‌تابد. گروه سینمایی شمسه فیلم با همین نام و همین نگاه
            آغاز به کار کرده است: سینما از نور می‌سازد و ما نور را جدی می‌گیریم.
          </p>
        </div>
        <div class="lg:col-span-5 relative">
          <div class="absolute -inset-3 leaf border border-gold/40 -translate-x-2 translate-y-2" aria-hidden="true"></div>
          <div class="relative overflow-hidden leaf aspect-[4/5] shadow-frame bg-sand" data-leaf-reveal>
            ${aboutImg ? `<img src="${img(aboutImg)}" alt="نمایی از تولیدات شمسه فیلم" class="w-full h-full object-cover" fetchpriority="high" />` : ''}
          </div>
        </div>
      </div>
    </section>

    <!-- who we are -->
    <section class="py-16 md:py-24">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12">
        <div class="lg:col-span-5">
          <h2 class="h-title text-2xl md:text-4xl mb-8 reveal-in">ما چه می‌کنیم؟</h2>
          <div class="prose-fa reveal-in">
            <p>
              گروه سینمایی شمسه فیلم یک گروه تولید سینمایی مستقر در مشهد است. فعالیت این گروه بر چهار
              محور متمرکز است: <strong class="text-ink font-bold">مستند</strong>،
              <strong class="text-ink font-bold">فیلم داستانی</strong>،
              <strong class="text-ink font-bold">نماهنگ</strong> و
              <strong class="text-ink font-bold">برنامه تلویزیونی</strong>.
              از مجموعه‌های مستند چندقسمتی دربارهٔ هنرمندان و تاریخ خراسان تا فیلم‌های کوتاه داستانی،
              تولیدات شمسه فیلم در جشنواره‌های ملی — از جمله جشنواره فیلم فجر (بخش سیمرغ) — حضور داشته‌اند.
            </p>
            <p>
              آنچه در این خانه مشترک است، نگاه است: نگاهی به آدم‌ها، به باور و به شهر؛ روایت‌هایی که
              با نورِ صادقانه ثبت می‌شوند، نه با جلوه‌های بی‌دلیل.
            </p>
          </div>
        </div>
        <div class="lg:col-span-7 grid sm:grid-cols-2 gap-6">
          <div class="grid gap-6 sm:mt-12">
            <img src="${img(stills[0] || aboutImg)}" alt="تصویری از پشت صحنه" class="leaf w-full aspect-[4/5] object-cover shadow-card bg-sand reveal-in" loading="lazy" />
            <img src="${img(stills[2] || aboutImg)}" alt="تصویری از تولید" class="leaf-flip w-full aspect-square object-cover shadow-card bg-sand reveal-in" loading="lazy" />
          </div>
          <div class="grid gap-6">
            <img src="${img(stills[1] || aboutImg)}" alt="تصویری از پشت صحنه" class="leaf-flip w-full aspect-square object-cover shadow-card bg-sand reveal-in" loading="lazy" />
            <img src="${img(stills[3] || aboutImg)}" alt="تصویری از تولید" class="leaf w-full aspect-[4/5] object-cover shadow-card bg-sand reveal-in" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- numbers -->
    <section class="bg-sand/60 border-y border-line py-16">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        ${[
          [fa(productions.length), 'اثر در آرشیو', 'WORKS'],
          [fa(productions.filter((p) => p.category === 'documentary').length), 'مستند', 'DOCS'],
          [fa(productions.filter((p) => p.category === 'fiction').length), 'فیلم داستانی', 'FICTIONS'],
          [fa(news.length + gallery.length), 'خبر و آلبوم', 'STORIES'],
        ].map(([n, l, en]) => `
        <div class="text-center py-8 leaf-sm bg-white border border-line shadow-card reveal-in">
          <p class="h-display text-4xl md:text-5xl text-teal-deep">${n}</p>
          <p class="mt-2 font-bold text-[0.95rem]">${l}</p>
          <p class="label-mono !text-[0.52rem] mt-1.5" dir="ltr">${en}</p>
        </div>`).join('')}
      </div>
    </section>

    <!-- logo story -->
    <section class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-5 md:px-8 text-center">
        <p class="label-mono label-mono-teal mb-5 reveal-in" dir="ltr">THE MARK · نشان</p>
        <h2 class="h-title text-2xl md:text-4xl mb-8 reveal-in">برگی فیروزه‌ای، امضایی طلایی</h2>
        <img src="${appUrl('/images/logo-full.png')}" alt="نشان گروه سینمایی شمسه فیلم" width="220" height="101" class="mx-auto h-24 md:h-28 w-auto reveal-in" />
        <div class="prose-fa mt-8 reveal-in">
          <p>
            نشان شمسه فیلم از دو عصر ساخته شده است: قابی برگ‌مانند به رنگ فیروزه — رنگ کاشی‌های
            ضریح و گنبد — و نامی طلایی به خط کوفیِ هندسی. فیروزه یادآور نور آسمانی است و طلا،
            یادآور آنچه در تاریکی می‌درخشد. همین دو رنگ و همین قاب برگ، کل هویت بصری این وب‌سایت
            را ساخته‌اند.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative bg-ink-deep text-paper overflow-hidden">
      <div class="absolute inset-0 shamseh-pattern-ink opacity-50" aria-hidden="true"></div>
      <div class="relative max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
        <h2 class="h-display text-3xl md:text-5xl text-balance reveal-in">نورِ روایتِ بعدی را با هم بسازیم.</h2>
        <div class="mt-9 flex flex-wrap justify-center gap-4 reveal-in">
          <a href="${appUrl('/productions')}" class="btn-primary leaf-sm !bg-gold !text-ink-deep hover:!bg-gold-tint">دیدن آرشیو تولیدات</a>
          <a href="${appUrl('/contact')}" class="btn-ghost leaf-sm !bg-transparent !border-paper/25 !text-paper hover:!border-gold hover:!text-gold">ارتباط با ما</a>
        </div>
      </div>
    </section>
  </main>

  ${footerHTML()}
  `;

  initChrome();
  initMotion(app);
  icons();
}

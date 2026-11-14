/** Contact page — light, warm, clickable. No fake form. */
import { esc, icons, seo } from '../js/utils.js';
import { headerHTML, footerHTML, mobileMenuHTML, searchOverlayHTML, initChrome } from '../components/Chrome.js';
import { initMotion } from '../js/animations.js';
import company from '../data/company.js';

export async function render(app) {
  seo({ title: 'ارتباط با ما', description: 'راه‌های ارتباط با گروه سینمایی شمسه فیلم در مشهد؛ نشانی، تلفن و پیوندهای مرتبط.' });

  const mapQuery = encodeURIComponent('مشهد، خیابان کوهسنگی، کوهسنگی 20، پلاک 31');

  app.innerHTML = `
  ${headerHTML('contact')}
  ${mobileMenuHTML()}
  ${searchOverlayHTML()}

  <main id="main" class="pt-[4.4rem] md:pt-[5.2rem]">
    <section class="relative overflow-hidden border-b border-line">
      <div class="absolute inset-0 shamseh-pattern opacity-40" aria-hidden="true"></div>
      <div class="sunburst absolute -top-[30rem] left-[-10rem] w-[60rem] h-[60rem] opacity-30" style="animation:spin 130s linear infinite" aria-hidden="true"></div>
      <div class="relative max-w-[88rem] mx-auto px-5 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16 text-center">
        <p class="label-mono label-mono-teal mb-5 reveal-in" dir="ltr">CONTACT</p>
        <h1 class="h-display text-5xl md:text-7xl">با ما در تماس باشید</h1>
        <p class="mt-6 text-ink-soft leading-8 max-w-lg mx-auto reveal-in">
          برای همکاری، سفارش تولید یا هر پرسش دیگری؛ راه‌های زیر همیشه باز است.
        </p>
      </div>
    </section>

    <section class="py-14 md:py-20">
      <div class="max-w-[88rem] mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-10">
        <!-- info cards -->
        <div class="lg:col-span-5 grid gap-6 content-start">
          <div class="leaf-sm bg-white border border-line shadow-card p-7 reveal-in">
            <p class="label-mono label-mono-teal mb-4" dir="ltr">ADDRESS · نشانی</p>
            <address class="not-italic font-bold text-[1.05rem] leading-8">${esc(company.address)}</address>
            <a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-2 text-teal-deep font-semibold link-underline">
              مسیریابی روی نقشه
              <i data-lucide="map-pin" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="leaf-sm bg-white border border-line shadow-card p-7 reveal-in">
            <p class="label-mono label-mono-teal mb-4" dir="ltr">PHONE · تلفن</p>
            <div class="space-y-4">
              <a href="${company.phoneHref}" class="group flex items-center justify-between">
                <span class="flex items-center gap-3">
                  <span class="grid place-items-center w-11 h-11 leaf-xs bg-teal-tint text-teal-deep"><i data-lucide="phone" class="w-4.5 h-4.5"></i></span>
                  <span>
                    <span class="block text-[0.8rem] text-ink-mute">تلفن ثابت</span>
                    <span class="block font-bold text-[1.05rem] group-hover:text-teal-deep transition-colors" dir="ltr">${esc(company.phone)}</span>
                  </span>
                </span>
                <i data-lucide="arrow-up-left" class="w-4 h-4 text-ink-mute group-hover:text-teal-deep transition-colors"></i>
              </a>
              ${company.mobiles.map((m, i) => `
              <a href="${company.mobileHrefs[i]}" class="group flex items-center justify-between">
                <span class="flex items-center gap-3">
                  <span class="grid place-items-center w-11 h-11 leaf-xs bg-gold-tint text-gold-deep"><i data-lucide="smartphone" class="w-4.5 h-4.5"></i></span>
                  <span>
                    <span class="block text-[0.8rem] text-ink-mute">تلفن همراه ${i === 0 ? '' : '۲'}</span>
                    <span class="block font-bold text-[1.05rem] group-hover:text-teal-deep transition-colors" dir="ltr">${esc(m)}</span>
                  </span>
                </span>
                <i data-lucide="arrow-up-left" class="w-4 h-4 text-ink-mute group-hover:text-teal-deep transition-colors"></i>
              </a>`).join('')}
            </div>
          </div>

          <div class="leaf-sm bg-white border border-line shadow-card p-7 reveal-in">
            <p class="label-mono label-mono-teal mb-4" dir="ltr">RELATED · پیوندهای مرتبط</p>
            <ul class="grid gap-2.5">
              ${company.links.map((l) => `
              <li>
                <a href="${esc(l.url)}" target="_blank" rel="noopener" class="group flex items-center justify-between py-2 border-b border-line/60 last:border-0">
                  <span class="font-medium text-[0.95rem] group-hover:text-teal-deep transition-colors">${esc(l.title)}</span>
                  <i data-lucide="external-link" class="w-4 h-4 text-ink-mute group-hover:text-teal-deep transition-colors"></i>
                </a>
              </li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- map -->
        <div class="lg:col-span-7">
          <div class="relative overflow-hidden leaf shadow-frame border border-line bg-sand reveal-in" style="aspect-ratio: 4 / 5;">
            <iframe
              title="نقشهٔ محل گروه سینمایی شمسه فیلم"
              src="https://www.google.com/maps?q=${mapQuery}&output=embed&hl=fa"
              class="absolute inset-0 w-full h-full grayscale-[0.25] contrast-[0.95] saturate-[0.85]"
              style="min-height: 0;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen></iframe>
          </div>
          <div class="mt-5 flex flex-wrap items-center justify-between gap-2 px-2 reveal-in">
            <p class="label-mono" dir="ltr">KOHSANGI ST. · MASHHAD</p>
            <p class="text-[0.85rem] text-ink-mute">پلاک ۳۱ — بن‌بست اول، سمت راست</p>
          </div>
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

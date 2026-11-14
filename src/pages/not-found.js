/** 404 — quiet, luminous empty state. */
import { appUrl, icons, seo } from '../js/utils.js';
import { headerHTML, footerHTML, mobileMenuHTML, searchOverlayHTML, initChrome } from '../components/Chrome.js';

export async function render(app) {
  seo({ title: 'صفحه یافت نشد' });
  app.innerHTML = `
  ${headerHTML()}
  ${mobileMenuHTML()}
  ${searchOverlayHTML()}
  <main id="main" class="pt-[4.4rem] md:pt-[5.2rem] min-h-[70vh] grid place-items-center relative overflow-hidden">
    <div class="absolute inset-0 shamseh-pattern opacity-50" aria-hidden="true"></div>
    <div class="relative text-center px-6 py-24">
      <div class="mx-auto w-32 h-32 shamseh-pattern leaf bg-sand rotate-6"></div>
      <h1 class="h-display text-6xl md:text-8xl mt-10 text-teal-deep">۴۰۴</h1>
      <p class="h-title text-xl md:text-2xl mt-4">این کادر از آرشیو پیدایش نشد</p>
      <p class="mt-3 text-ink-soft">شاید تصویرِ این فریم هنوز چاپ نشده باشد.</p>
      <a href="${appUrl('/')}" class="btn-primary leaf-sm mt-9">بازگشت به خانه</a>
    </div>
  </main>
  ${footerHTML()}`;
  initChrome();
  icons();
}

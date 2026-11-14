/** Shamseh Film — Luminous Archive. Entry point. */
import './styles/main.css';
import { start, route, onNotFound } from './js/router.js';

/* boot loader fade */
const boot = document.getElementById('boot-loader');
if (boot) {
  boot.style.transition = 'opacity .4s ease';
  boot.style.opacity = '0';
  setTimeout(() => boot.remove(), 420);
}

route('/', async (app) => {
  const { render } = await import('./pages/home.js');
  await render(app);
});
route('/productions', async (app, params) => {
  const { render } = await import('./pages/productions.js');
  await render(app, params, new URLSearchParams(location.search));
});
route('/productions/:slug', async (app, params) => {
  const { render } = await import('./pages/production-detail.js');
  await render(app, params);
});
route('/news', async (app, params) => {
  const { render } = await import('./pages/news.js');
  await render(app, params);
});
route('/news/:slug', async (app, params) => {
  const { render } = await import('./pages/article-detail.js');
  await render(app, params);
});
route('/about', async (app) => {
  const { render } = await import('./pages/about.js');
  await render(app);
});
route('/gallery', async (app) => {
  const { render } = await import('./pages/gallery.js');
  await render(app);
});
route('/contact', async (app) => {
  const { render } = await import('./pages/contact.js');
  await render(app);
});
onNotFound(async (app) => {
  const { render } = await import('./pages/not-found.js');
  await render(app);
});

start();

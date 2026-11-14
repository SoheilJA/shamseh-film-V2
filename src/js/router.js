/**
 * Lightweight hash-free History router.
 * Routes render into #app, relative to Vite's deployment base.
 */
import { appUrl } from './utils.js';

const routes = new Map();
let notFoundHandler = null;

export function route(path, handler) {
  routes.set(path, handler);
}

export function onNotFound(handler) {
  notFoundHandler = handler;
}

export function navigate(path, { replace = false } = {}) {
  path = appUrl(path);
  if (replace) {
    history.replaceState({}, '', path);
  } else {
    history.pushState({}, '', path);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function matchRoute(pathname) {
  if (routes.has(pathname)) return { handler: routes.get(pathname), params: {} };
  // dynamic segments like /productions/:slug
  for (const [pattern, handler] of routes) {
    if (pattern.includes(':')) {
      const pk = pattern.split('/').filter(Boolean);
      const ak = pathname.split('/').filter(Boolean);
      if (pk.length !== ak.length) continue;
      const params = {};
      let ok = true;
      pk.forEach((seg, i) => {
        if (seg.startsWith(':')) params[seg.slice(1)] = decodeURIComponent(ak[i]);
        else if (seg !== ak[i]) ok = false;
      });
      if (ok) return { handler, params };
    }
  }
  return null;
}

export async function render() {
  const base = import.meta.env.BASE_URL;
  const pathname = ('/' + location.pathname.slice(base.length)).replace(/\/+$/, '') || '/';
  const m = matchRoute(pathname);
  const app = document.getElementById('app');
  if (m) {
    await m.handler(app, m.params);
  } else if (notFoundHandler) {
    await notFoundHandler(app);
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}

export function start() {
  window.addEventListener('popstate', render);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || a.hasAttribute('download')) return;
    const url = new URL(a.href);
    if (url.origin !== location.origin || !url.pathname.startsWith(import.meta.env.BASE_URL)) return;
    if (a.target && a.target !== '_self') return;
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  });
  render();
}

/**
 * Lightweight hash-free History router.
 * Routes render into #app; every route works with direct open + refresh.
 */
const routes = new Map();
let notFoundHandler = null;

export function route(path, handler) {
  routes.set(path, handler);
}

export function onNotFound(handler) {
  notFoundHandler = handler;
}

export function navigate(path, { replace = false } = {}) {
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
  const pathname = location.pathname;
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
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
    if (a.target === '_blank') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  });
  render();
}

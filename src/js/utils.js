/** Shared helpers: webp-aware image paths, icons, fa digits, meta/SEO. */


const webpOK = (() => {
  try {
    const c = document.createElement('canvas');
    return c.toDataURL('image/webp').startsWith('data:image/webp');
  } catch {
    return false;
  }
})();

/** Prefer .webp variant when the browser supports it. */
export function img(src) {
  if (!src) return '/images/logo-full.png';
  if (!webpOK || !src.endsWith('.jpg')) return src;
  return src.replace(/\.jpg$/, '.webp');
}

export function fa(n) {
  return String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

/** Set page title + meta description + OG tags. */
export function seo({ title, description, image }) {
  const full = title ? `${title} | گروه سینمایی شمسه فیلم` : 'گروه سینمایی شمسه فیلم';
  document.title = full;
  const set = (selector, attr, value) => {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      if (selector.startsWith('[name=')) el.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
      else el.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  if (description) {
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:description"]', 'content', description);
  }
  set('meta[property="og:title"]', 'content', full);
  if (image) set('meta[property="og:image"]', 'content', image);
}

/** Render lucide icons inside a container after DOM update.
 *  Per-icon named imports keep the bundle tiny (vs. the full icon set). */
import {
  ArrowLeft, ArrowUpLeft, Calendar, ChevronDown, ChevronLeft, ChevronRight,
  Clapperboard, ExternalLink, Film, Link, Mail, MapPin, MessageCircle,
  Phone, Search, Send, Smartphone, X,
  createIcons,
} from 'lucide';

const LUCIDE_SUBSET = {
  ArrowLeft, ArrowUpLeft, Calendar, ChevronDown, ChevronLeft, ChevronRight,
  Clapperboard, ExternalLink, Film, Link, Mail, MapPin, MessageCircle,
  Phone, Search, Send, Smartphone, X,
};

export function icons(scope = document) {
  createIcons({ icons: LUCIDE_SUBSET, attrs: { 'stroke-width': 1.6 }, nameAttr: 'data-lucide' });
}

/** Escape HTML for user/data interjection. */
export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export const CATEGORY_LABELS = {
  documentary: 'مستند',
  fiction: 'داستانی',
  'music-video': 'نماهنگ',
  tv: 'برنامه تلویزیونی',
};


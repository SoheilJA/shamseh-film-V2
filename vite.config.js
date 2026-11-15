import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import productions from './src/data/productions.js';
import news from './src/data/news.js';

// GitHub Pages has no History API fallback, so emit an entry for each route.
const pageEntries = {
  name: 'pages-route-entries',
  generateBundle: {
    order: 'post',
    handler(_, bundle) {
      const html = bundle['index.html'].source;
      const paths = [
        'productions', 'news', 'about', 'gallery', 'contact',
        ...productions.map(({ slug }) => `productions/${slug}`),
        ...news.map(({ slug }) => `news/${slug}`),
      ];
      for (const path of paths) {
        this.emitFile({ type: 'asset', fileName: `${path}/index.html`, source: html });
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: html });
    },
  },
};

export default defineConfig({
  base: process.env.CF_PAGES ? '/' : '/shamseh-film-V2/',
  plugins: [tailwindcss(), pageEntries],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});

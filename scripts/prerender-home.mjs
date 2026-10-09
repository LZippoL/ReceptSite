import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { generateSW } from 'workbox-build';

const root = resolve(import.meta.dirname, '..');
const buildDir = resolve(root, process.env.SITE_BUILD_DIR || 'output/cloudflare/build');
const ssrDir = resolve(root, 'output/cloudflare/ssr');
await build({
  configFile: false,
  root,
  base: process.env.VITE_SITE_BASE || '/',
  plugins: [react()],
  build: {
    ssr: 'src/prerender.tsx',
    outDir: ssrDir,
    rollupOptions: { output: { entryFileNames: 'prerender.mjs' } }
  }
});
process.env.NODE_ENV = 'production';
const { renderHome } = await import(pathToFileURL(resolve(ssrDir, 'prerender.mjs')).href);
const languages = ['uk', 'en', 'de', 'zh'];
const homes = Object.fromEntries(await Promise.all(languages.map(async language => [language, await renderHome(language)])));
const indexPath = resolve(buildDir, 'index.html');
let html = await readFile(indexPath, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Expected an empty root before prerendering.');
const base = process.env.VITE_SITE_BASE || '/';
const variants = JSON.stringify(homes).replace(/</g, '\\u003c');
const bootstrap = `<script>(function(){var root=document.getElementById('root');if(location.pathname!==${JSON.stringify(base)}){root.replaceChildren();root.removeAttribute('data-prerendered');return;}var homes=${variants};var language='uk';try{var saved=localStorage.getItem('smakolyk_language');language=homes[saved]?saved:navigator.language.slice(0,2).toLowerCase();}catch(e){}if(!homes[language])language='uk';if(language!=='uk')root.innerHTML=homes[language];document.documentElement.lang=language;try{var theme=localStorage.getItem('smakolyk_theme');if(theme==='dark'||((!theme||theme==='system')&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');}catch(e){}})();</script>`;
html = html.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${homes.uk}</div>${bootstrap}`);
// The first paint needs one HTML response, without a separate stylesheet round trip.
const stylesheet = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/);
if (!stylesheet) throw new Error('Expected the generated application stylesheet.');
const cssPath = resolve(buildDir, stylesheet[1].replace(base, ''));
const css = await readFile(cssPath, 'utf8');
html = html.replace(stylesheet[0], `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`);
const entryScript = html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"[^>]*><\/script>/);
if (!entryScript) throw new Error('Expected the generated app entry.');
// Let the complete HTML paint before React hydrates it. Links already work as normal HTML.
// The timeout also starts the app in background tabs where animation frames are suspended.
const startApp = `<script>document.addEventListener('DOMContentLoaded',function(){var started=false;function start(){if(started)return;started=true;import(${JSON.stringify(entryScript[1])});}if(!document.getElementById('root').hasAttribute('data-prerendered')){start();return;}requestAnimationFrame(function(){requestAnimationFrame(start);});setTimeout(start,200);},{once:true});</script>`;
html = html.replace(entryScript[0], startApp).replace(/<link[^>]+rel="modulepreload"[^>]*>/g, '');
await writeFile(indexPath, html);
await generateSW({
  globDirectory: buildDir,
  globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json,webmanifest,txt,xml}'],
  globIgnores: ['sw.js', 'workbox-*.js', 'registerSW.js', '**/images/recipe-thumbnails/**'],
  runtimeCaching: [{ urlPattern: /\/images\/recipe-thumbnails\//, handler: 'CacheFirst', options: { cacheName: 'recipe-thumbnails', expiration: { maxEntries: 120, maxAgeSeconds: 2592000 }, cacheableResponse: { statuses: [200] } } }],
  swDest: resolve(buildDir, 'sw.js'),
  navigateFallback: `${base}index.html`,
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  dontCacheBustURLsMatching: /assets\/.*-[\w-]+\./
});
console.log(`Prerendered home in ${languages.length} languages with inline critical styles.`);

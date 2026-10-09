import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const rootPath = resolve(import.meta.dirname, '..');
const buildDir = resolve(rootPath, process.env.SITE_BUILD_DIR || 'output/cloudflare/build');
const html = await readFile(resolve(buildDir, 'index.html'), 'utf8');
const initial = html.match(/<div id="root" data-prerendered="true">([\s\S]+)<\/div><script>/)?.[1];
const bootstrap = html.match(/<script>(\(function\(\)\{var root=document[\s\S]*?)<\/script>/)?.[1];
assert.ok(initial && bootstrap, 'Home must contain readable HTML before JavaScript.');
assert.ok(html.includes('<style>'), 'The first paint must not wait for an external app stylesheet.');
process.env.NODE_ENV = 'production';
const { renderHome } = await import(pathToFileURL(resolve(rootPath, 'output/cloudflare/ssr/prerender.mjs')).href);
const homes = Object.fromEntries(await Promise.all(['uk', 'en', 'de', 'zh'].map(async language => [language, await renderHome(language)])));

function boot({ saved, browser = 'uk-UA', pathname = '/', storageBlocked = false, theme, systemDark = false } = {}) {
  const attributes = { 'data-prerendered': 'true' };
  const root = { innerHTML: initial, replaceChildren() { this.innerHTML = ''; }, removeAttribute(name) { delete attributes[name]; } };
  const classes = new Set();
  const document = { getElementById: () => root, documentElement: { lang: 'uk', classList: { add: value => classes.add(value) } } };
  runInNewContext(bootstrap, {
    document, location: { pathname }, navigator: { language: browser },
    localStorage: { getItem(key) { if (storageBlocked) throw new Error('Unavailable storage'); return key === 'smakolyk_language' ? saved : theme; } },
    matchMedia: () => ({ matches: systemDark })
  });
  return { root, document, attributes, classes };
}

for (const language of ['uk', 'en', 'de', 'zh']) {
  const result = boot({ saved: language });
  assert.equal(result.root.innerHTML, homes[language], `${language} must match React's hydration input.`);
  assert.equal(result.document.documentElement.lang, language);
}
assert.equal(boot({ browser: 'de-DE' }).root.innerHTML, homes.de);
assert.equal(boot({ saved: 'invalid', browser: 'en-US' }).root.innerHTML, homes.en);
assert.equal(boot({ storageBlocked: true }).root.innerHTML, homes.uk);
assert.ok(boot({ theme: 'dark' }).classes.has('dark'));
assert.ok(boot({ systemDark: true }).classes.has('dark'));
const deepRoute = boot({ pathname: '/recipes/ukrainian-red-borscht' });
assert.equal(deepRoute.root.innerHTML, '', 'Deep routes must not flash the home page.');
assert.equal(deepRoute.attributes['data-prerendered'], undefined);
const sw = await readFile(resolve(buildDir, 'sw.js'), 'utf8');
const revision = createHash('md5').update(html).digest('hex');
assert.ok(sw.includes(`url:"index.html",revision:"${revision}"`), 'Offline cache must reference the final prerendered home.');
console.log('Prerender checks passed: four languages, preferences, blocked storage, deep routes, inline styles and final offline revision.');

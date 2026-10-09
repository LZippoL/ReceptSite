import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const buildDir = resolve(root, process.env.SITE_BUILD_DIR || 'output/cloudflare/build');
const data = JSON.parse(await readFile(resolve(root, 'src/data/siteInfo.json'), 'utf8'));
const template = await readFile(resolve(buildDir, 'index.html'), 'utf8');
const base = new URL(data.siteUrl).pathname;
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const href = value => value.startsWith('/') ? `${base}${value.slice(1)}` : value;
const links = data.pages.map(page => `<a class="hover:underline" href="${escape(href(`/${page.slug}/`))}">${escape(page.title)}</a>`).join(' ');

// Real documents let crawlers and visitors read these pages without the SPA's 404 redirect or JavaScript.
for (const page of data.pages) {
  const sections = page.sections.map(section => `<section class="space-y-3">
    <h2 class="text-xl font-bold">${escape(section.heading)}</h2>
    ${(section.paragraphs || []).map(text => `<p class="leading-7 text-stone-700">${escape(text)}</p>`).join('')}
    ${section.items ? `<ul class="list-disc pl-5 space-y-2 leading-7">${section.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : ''}
    ${section.links ? `<ul class="space-y-2 text-brand-700">${section.links.map(link => `<li><a class="underline underline-offset-4" href="${escape(href(link.href))}">${escape(link.label)}</a></li>`).join('')}</ul>` : ''}
  </section>`).join('');
  const date = new Intl.DateTimeFormat('uk-UA', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(data.updatedAt));
  const content = `<main lang="uk" class="max-w-3xl mx-auto px-4 py-12 space-y-8 break-words">
    <a class="text-brand-700 hover:underline" href="${escape(base)}">← Кулінаріум</a>
    <h1 class="text-3xl sm:text-4xl font-extrabold">${escape(page.title)}</h1>
    <p class="leading-7 text-stone-600">${escape(page.description)}</p>
    <p class="text-sm text-stone-500">Оновлено: <time datetime="${escape(data.updatedAt)}">${escape(date)}</time></p>
    <div class="rounded-3xl border border-stone-200 bg-white p-5 sm:p-8 space-y-8">${sections}</div>
    <nav aria-label="Інформація про сайт" class="flex flex-wrap gap-4 text-brand-700">${links}</nav>
  </main>`;
  const canonical = new URL(`${page.slug}/`, data.siteUrl).href;
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)} | Кулінаріум</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${escape(page.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${escape(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${escape(page.description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, `$1${escape(page.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, `$1${escape(page.description)}$2`)
    .replace('</head>', `<link rel="canonical" href="${escape(canonical)}" /></head>`)
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  await mkdir(resolve(buildDir, page.slug), { recursive: true });
  await writeFile(resolve(buildDir, page.slug, 'index.html'), html);
}
console.log(`Generated ${data.pages.length} public information pages.`);

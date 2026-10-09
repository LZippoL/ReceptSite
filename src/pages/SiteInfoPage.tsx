import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteInfo from '../data/siteInfo.json';
import { updateMetaTags } from '../utils/seo';

interface InfoSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  links?: { label: string; href: string }[];
}

export const SiteInfoPage: React.FC<{ slug: string }> = ({ slug }) => {
  const page = siteInfo.pages.find(item => item.slug === slug)!;

  useEffect(() => {
    updateMetaTags({
      title: page.title,
      description: page.description,
      url: new URL(`${page.slug}/`, siteInfo.siteUrl).href,
    });
  }, [page]);

  return (
    <article lang="uk" className="max-w-3xl mx-auto py-8 sm:py-12 space-y-8 break-words">
      <header className="space-y-4">
        <Link to="/" className="text-sm text-brand-700 dark:text-brand-300 hover:underline">← Кулінаріум</Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">{page.title}</h1>
        <p className="text-base leading-7 text-stone-600 dark:text-stone-300">{page.description}</p>
        <p className="text-sm text-stone-500 dark:text-stone-400">Оновлено: <time dateTime={siteInfo.updatedAt}>{new Intl.DateTimeFormat('uk-UA', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(siteInfo.updatedAt))}</time></p>
      </header>
      <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8 space-y-8">
        {(page.sections as InfoSection[]).map(section => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{section.heading}</h2>
            {section.paragraphs?.map(paragraph => <p key={paragraph} className="text-stone-700 dark:text-stone-300 leading-7">{paragraph}</p>)}
            {section.items && <ul className="list-disc pl-5 space-y-2 text-stone-700 dark:text-stone-300 leading-7">{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
            {section.links && <ul className="flex flex-col gap-2 text-brand-700 dark:text-brand-300">{section.links.map(link => (
              <li key={link.href}>{link.href.startsWith('/')
                ? <Link to={link.href} className="underline underline-offset-4 hover:text-brand-800 dark:hover:text-brand-200">{link.label}</Link>
                : <a href={link.href} className="underline underline-offset-4 hover:text-brand-800 dark:hover:text-brand-200">{link.label}</a>}</li>
            ))}</ul>}
          </section>
        ))}
      </div>
      <nav aria-label="Інформація про сайт" className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-brand-700 dark:text-brand-300">
        {siteInfo.pages.map(item => <Link key={item.slug} to={`/${item.slug}`} aria-current={item.slug === slug ? 'page' : undefined} className="hover:underline">{item.title}</Link>)}
      </nav>
    </article>
  );
};

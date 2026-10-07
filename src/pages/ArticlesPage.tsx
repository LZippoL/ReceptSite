import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, ArrowRight, Search } from 'lucide-react';
import { Article } from '../types';
import { articleService } from '../services/articleService';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';

export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [query, setQuery] = useState('');
  const { t, language, localizeArticle } = useLanguage();

  useEffect(() => {
    updateMetaTags({
      title: `${t('articles.title')} — ${t('common.siteName')}`,
      description: t('articles.subtitle')
    });
    articleService.getAll().then(setArticles);
  }, [language, t]);

  const localizedArticles = articles.map(localizeArticle);
  const categories = Array.from(new Set(localizedArticles.map(a => a.category)));

  const filteredArticles = localizedArticles.filter(a => {
    if (selectedCategory && a.category !== selectedCategory) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const localeDate = language === 'uk' ? 'uk-UA' : language === 'de' ? 'de-DE' : language === 'zh' ? 'zh-CN' : 'en-US';

  return (
    <div className="space-y-8 pb-14 animate-fade-in pt-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-brand-600" />
            {t('articles.title')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t('articles.subtitle')}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.searchPlaceholder')}
            className="w-full h-11 pl-9 pr-4 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="w-full overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory('')}
            className={`shrink-0 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
              !selectedCategory
                ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-brand-300'
            }`}
          >
            {t('common.all')} ({articles.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
                selectedCategory === cat
                  ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-brand-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <article
            key={article.id}
            className="group bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 rounded-3xl overflow-hidden shadow-card hover:shadow-warm hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <Link to={`/articles/${article.slug}`} className="block relative aspect-video overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-xs font-bold text-brand-700 dark:text-brand-300 shadow-sm">
                  {article.category}
                </div>
              </Link>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-300 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {article.readTime} {t('common.min')}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(article.createdAt).toLocaleDateString(localeDate)}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                  <Link to={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 mt-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-stone-100 dark:border-stone-800/60 mt-2">
              <span className="text-xs text-stone-400">
                {t('articles.byAuthor')} {article.author.name}
              </span>
              <Link
                to={`/articles/${article.slug}`}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                {t('common.view')}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

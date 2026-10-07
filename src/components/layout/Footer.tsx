import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Heart, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, getCategoryName } = useLanguage();

  return (
    <footer className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pt-12 pb-24 lg:pb-12 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-amber-600 bg-clip-text text-transparent">
                {t('common.siteName')}
              </span>
            </Link>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-sm leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Link
                to="/what-to-cook"
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                {t('hero.fridgeTitle')}
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-4">
              {t('nav.categories')}
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 6).map(c => (
                <li key={c.id}>
                  <Link
                    to={`/recipes?category=${c.id}`}
                    className="text-stone-600 dark:text-stone-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {getCategoryName(c.id)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="text-brand-600 dark:text-brand-400 font-semibold text-xs hover:underline">
                  {t('common.viewAll')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-4">
              {t('nav.recipes')}
            </h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li>
                <Link to="/recipes" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('recipes.title')}
                </Link>
              </li>
              <li>
                <Link to="/what-to-cook" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('fridge.title')}
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('articles.title')}
                </Link>
              </li>
              <li>
                <Link to="/shopping-list" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('shoppingList.title')}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('favorites.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* User & Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-4">
              {t('nav.profile')}
            </h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li>
                <Link to="/profile" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('profile.title')}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('favorites.title')}
                </Link>
              </li>
              <li>
                <Link to="/shopping-list" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('shoppingList.title')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {t('common.siteName')}. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>{t('common.siteTagline')}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

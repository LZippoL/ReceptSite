import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Clock, 
  Flame, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  Zap,
  BookOpen
} from 'lucide-react';
import { Recipe, Article } from '../types';
import { recipeService } from '../services/recipeService';
import { articleService } from '../services/articleService';
import { CATEGORIES } from '../data/categories';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { Button } from '../components/common/Button';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';

interface HomePageProps {
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { t, localizeRecipe, localizeArticle, getCategoryName } = useLanguage();

  useEffect(() => {
    updateMetaTags({
      title: `${t('common.siteName')} — ${t('common.siteTagline')}`,
      description: t('hero.subtitle')
    });

    Promise.all([
      recipeService.getAll(),
      articleService.getAll()
    ]).then(([recList, artList]) => {
      setRecipes(recList);
      setArticles(artList);
    });
  }, [t]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/recipes?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      onOpenSearch();
    }
  };

  const rawRecipeOfTheDay = recipes.find(r => r.id === 'rec-1') || recipes[0];
  const recipeOfTheDay = rawRecipeOfTheDay ? localizeRecipe(rawRecipeOfTheDay) : null;
  const quickRecipes = recipes.filter(r => r.totalTime <= 20).slice(0, 4);
  const popularRecipes = [...recipes].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 4);
  const topRatedRecipes = [...recipes].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const budgetRecipes = recipes.filter(r => r.budget).slice(0, 4);

  return (
    <div className="space-y-14 sm:space-y-20 pb-12 animate-fade-in">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-amber-600 to-orange-700 text-white shadow-2xl p-6 sm:p-12 lg:p-16 my-4 sm:my-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            {t('hero.badge')}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            {t('hero.titleLine1')} <br className="hidden sm:inline" />
            <span className="text-amber-200">{t('hero.titleHighlight')}</span>
          </h1>

          <p className="text-sm sm:text-lg text-amber-100 max-w-xl font-normal leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-1.5 text-stone-900">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                className="w-full px-3 py-2 text-sm sm:text-base outline-none bg-transparent placeholder:text-stone-400"
              />
              <Button type="submit" size="md" className="shrink-0 rounded-xl px-5">
                {t('common.search')}
              </Button>
            </div>
          </form>

          {/* Fridge Search Callout Banner */}
          <div className="pt-2">
            <Link
              to="/what-to-cook"
              className="inline-flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/25 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  {t('hero.fridgeTitle')}
                  <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                </p>
                <p className="text-[11px] sm:text-xs text-amber-100">
                  {t('hero.fridgeDesc')}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              {t('home.categoriesTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t('home.categoriesSubtitle')}
            </p>
          </div>
          <Link
            to="/categories"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1"
          >
            {t('common.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.slice(0, 14).map((cat) => (
            <Link
              key={cat.id}
              to={`/recipes?category=${cat.id}`}
              className="group p-3 sm:p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-brand-300 dark:hover:border-brand-700/60 shadow-card hover:shadow-warm hover:-translate-y-1 transition-all text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-brand-600 transition-colors">
                {getCategoryName(cat.id)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* RECIPE OF THE DAY */}
      {recipeOfTheDay && (
        <section className="bg-amber-50/60 dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                ⭐ {t('home.recipeOfTheDay')}
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                {recipeOfTheDay.title}
              </h3>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                {recipeOfTheDay.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 pt-2">
                <span className="flex items-center gap-1.5 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700">
                  <Clock className="w-4 h-4 text-amber-500" />
                  {recipeOfTheDay.totalTime} {t('common.min')}
                </span>
                <span className="flex items-center gap-1.5 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700">
                  <Flame className="w-4 h-4 text-brand-500" />
                  {recipeOfTheDay.calories} {t('common.calories')}
                </span>
                <span className="flex items-center gap-1.5 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-amber-600 dark:text-amber-400 font-bold">
                  ★ {recipeOfTheDay.rating} ({recipeOfTheDay.reviewsCount} {t('reviews.count')})
                </span>
              </div>

              <div className="pt-4 flex gap-3">
                <Link to={`/recipes/${recipeOfTheDay.slug}`}>
                  <Button size="lg" className="shadow-lg shadow-brand-500/20">
                    {t('common.view')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img
                src={recipeOfTheDay.image}
                alt={recipeOfTheDay.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>
      )}

      {/* QUICK MEALS IN 20 MINUTES */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                {t('home.quickRecipes')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t('home.quickSubtitle')}
            </p>
          </div>
          <Link
            to="/recipes?maxTime=20"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1"
          >
            {t('common.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={localizeRecipe(recipe)} />
          ))}
        </div>
      </section>

      {/* POPULAR RECIPES */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                {t('home.popularRecipes')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t('home.popularSubtitle')}
            </p>
          </div>
          <Link
            to="/recipes?sortBy=popularity"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1"
          >
            {t('common.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={localizeRecipe(recipe)} />
          ))}
        </div>
      </section>

      {/* TOP RATED */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              {t('recipes.sortRating')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              ★ 4.9+
            </p>
          </div>
          <Link
            to="/recipes?sortBy=rating"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1"
          >
            {t('common.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={localizeRecipe(recipe)} />
          ))}
        </div>
      </section>

      {/* BUDGET MEALS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              {t('home.budgetRecipes')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t('home.budgetSubtitle')}
            </p>
          </div>
          <Link
            to="/recipes"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1"
          >
            {t('common.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgetRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={localizeRecipe(recipe)} />
          ))}
        </div>
      </section>

      {/* CULINARY ARTICLES HIGHLIGHT */}
      <section className="space-y-6 pt-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                {t('home.articlesTitle')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t('home.articlesSubtitle')}
            </p>
          </div>
          <Link
            to="/articles"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1"
          >
            {t('common.viewAll')} ({articles.length})
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map(rawArt => {
            const article = localizeArticle(rawArt);
            return (
              <article
                key={article.id}
                className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl overflow-hidden shadow-card hover:shadow-warm hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <Link to={`/articles/${article.slug}`} className="block relative aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-xs font-semibold text-brand-700 dark:text-brand-300">
                      {article.category}
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime} {t('articles.readTime')}</span>
                    </div>
                    <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                      <Link to={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mt-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <Link
                    to={`/articles/${article.slug}`}
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
                  >
                    {t('home.readArticle')} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

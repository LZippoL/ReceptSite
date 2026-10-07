import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Search, 
  BookOpen, 
  UtensilsCrossed,
  MessageSquare,
  RotateCcw,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { Recipe, Article, Review } from '../types';
import { recipeService } from '../services/recipeService';
import { articleService } from '../services/articleService';
import { reviewService } from '../services/reviewService';
import { supabase } from '../services/supabaseClient';
import { AdminRecipeForm } from '../components/admin/AdminRecipeForm';
import { AdminArticleForm } from '../components/admin/AdminArticleForm';
import { AdminReviewsTab } from '../components/admin/AdminReviewsTab';
import { AdminAuthGate } from '../components/admin/AdminAuthGate';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';

export const AdminPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'recipes' | 'articles' | 'reviews'>(
    (searchParams.get('tab') as 'recipes' | 'articles' | 'reviews') || 'recipes'
  );

  // Authentication State
  const [session, setSession] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mode: list, create_recipe, edit_recipe, create_article, edit_article
  const [mode, setMode] = useState<'list' | 'create_recipe' | 'edit_recipe' | 'create_article' | 'edit_article'>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { success, error } = useToast();
  const { t, language } = useLanguage();

  // Check Supabase session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthChecking(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadData = () => {
    recipeService.getAll().then(setRecipes);
    articleService.getAll().then(setArticles);
    reviewService.getAll().then(setReviews);
  };

  useEffect(() => {
    updateMetaTags({
      title: `${t('admin.title')} — ${t('common.siteName')}`,
      description: t('admin.title')
    });
    if (session) {
      loadData();
    }
  }, [language, t, session]);

  const handleTabChange = (tab: 'recipes' | 'articles' | 'reviews') => {
    setActiveTab(tab);
    setMode('list');
    setSearchParams({ tab });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    success('Вихід', 'Ви вийшли з адмін-панелі');
  };

  // Recipe actions
  const handleSaveRecipe = async (data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewsCount'>) => {
    try {
      if (mode === 'edit_recipe' && selectedRecipe) {
        await recipeService.update(selectedRecipe.id, data);
        success(t('admin.savedSuccess'), `"${data.title}"`);
      } else {
        await recipeService.create(data);
        success(t('admin.savedSuccess'), `"${data.title}"`);
      }
      setMode('list');
      setSelectedRecipe(null);
      loadData();
    } catch {
      error(t('common.error'), 'Error saving recipe');
    }
  };

  const handleDeleteRecipe = async (id: string, title: string) => {
    if (window.confirm(`${t('admin.deleteConfirm')} ("${title}")`)) {
      await recipeService.delete(id);
      success(t('admin.deletedSuccess'), `"${title}"`);
      loadData();
    }
  };

  // Article actions
  const handleSaveArticle = async (data: Omit<Article, 'id' | 'createdAt'>) => {
    try {
      if (mode === 'edit_article' && selectedArticle) {
        await articleService.update(selectedArticle.id, data);
        success(t('admin.savedSuccess'), `"${data.title}"`);
      } else {
        await articleService.create(data);
        success(t('admin.savedSuccess'), `"${data.title}"`);
      }
      setMode('list');
      setSelectedArticle(null);
      loadData();
    } catch {
      error(t('common.error'), 'Error saving article');
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (window.confirm(`${t('admin.deleteConfirm')} ("${title}")`)) {
      await articleService.delete(id);
      success(t('admin.deletedSuccess'), `"${title}"`);
      loadData();
    }
  };

  // Export / Import
  const handleExportRecipesJson = async () => {
    const jsonStr = await recipeService.exportAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipes-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    success(t('profile.downloadBackup'), 'JSON');
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset all recipes to default 42 recipes?')) {
      await recipeService.resetToDefault();
      loadData();
      success(t('common.reset'), 'OK');
    }
  };

  // Loading state while checking authentication
  if (isAuthChecking) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // If not logged in -> Show Supabase Auth Gate
  if (!session) {
    return <AdminAuthGate onAuthenticated={() => loadData()} />;
  }

  // Filtered lists
  const filteredRecipes = recipes.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16 animate-fade-in pt-4">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
              {t('admin.title')}
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              Supabase Auth
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Користувач: <strong className="text-stone-700 dark:text-stone-300">{session.user?.email}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {mode === 'list' && (
            <>
              <Button
                onClick={handleExportRecipesJson}
                variant="outline"
                size="sm"
                className="rounded-xl"
              >
                <Download className="w-4 h-4 mr-1.5" />
                JSON
              </Button>
              <Button
                onClick={handleResetDefaults}
                variant="ghost"
                size="sm"
                className="text-stone-500 hover:text-amber-600 rounded-xl"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                {t('common.reset')}
              </Button>
            </>
          )}

          <Button
            onClick={handleLogout}
            variant="secondary"
            size="sm"
            className="rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Вийти
          </Button>
        </div>
      </div>

      {/* Mode Switches */}
      {mode === 'create_recipe' && (
        <AdminRecipeForm
          onSubmit={handleSaveRecipe}
          onCancel={() => setMode('list')}
        />
      )}

      {mode === 'edit_recipe' && selectedRecipe && (
        <AdminRecipeForm
          initialRecipe={selectedRecipe}
          isEditing
          onSubmit={handleSaveRecipe}
          onCancel={() => {
            setMode('list');
            setSelectedRecipe(null);
          }}
        />
      )}

      {mode === 'create_article' && (
        <AdminArticleForm
          onSubmit={handleSaveArticle}
          onCancel={() => setMode('list')}
        />
      )}

      {mode === 'edit_article' && selectedArticle && (
        <AdminArticleForm
          initialArticle={selectedArticle}
          isEditing
          onSubmit={handleSaveArticle}
          onCancel={() => {
            setMode('list');
            setSelectedArticle(null);
          }}
        />
      )}

      {/* Main List Mode */}
      {mode === 'list' && (
        <div className="space-y-6">
          {/* Tabs: Recipes vs Articles vs Reviews */}
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
              <button
                onClick={() => handleTabChange('recipes')}
                className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 -mb-px shrink-0 ${
                  activeTab === 'recipes'
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                {t('admin.recipesTab')} ({recipes.length})
              </button>
              <button
                onClick={() => handleTabChange('articles')}
                className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 -mb-px shrink-0 ${
                  activeTab === 'articles'
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                {t('admin.articlesTab')} ({articles.length})
              </button>
              <button
                onClick={() => handleTabChange('reviews')}
                className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 -mb-px shrink-0 ${
                  activeTab === 'reviews'
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Відгуки ({reviews.length})
              </button>
            </div>

            {activeTab !== 'reviews' && (
              <Button
                onClick={() => setMode(activeTab === 'recipes' ? 'create_recipe' : 'create_article')}
                size="sm"
                className="rounded-xl mb-2 shrink-0"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                {activeTab === 'recipes' ? t('admin.addRecipeBtn') : t('admin.addArticleBtn')}
              </Button>
            )}
          </div>

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <AdminReviewsTab
              reviews={reviews}
              recipes={recipes}
              onReviewsChanged={loadData}
            />
          )}

          {/* Recipes List Table */}
          {activeTab === 'recipes' && (
            <>
              {/* Search filter input */}
              <div className="relative max-w-sm">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('admin.searchPlaceholder')}
                  className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
                />
              </div>

              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 font-bold">
                      <tr>
                        <th className="p-4">{t('nav.recipes')}</th>
                        <th className="p-4 hidden sm:table-cell">{t('filters.category')}</th>
                        <th className="p-4 hidden md:table-cell">{t('recipeDetail.totalTime')}</th>
                        <th className="p-4 hidden md:table-cell">{t('filters.difficulty')}</th>
                        <th className="p-4">Rating</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {filteredRecipes.map(recipe => (
                        <tr key={recipe.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-12 h-12 rounded-xl object-cover shrink-0"
                              />
                              <div>
                                <p className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                                  {recipe.title}
                                </p>
                                <p className="text-xs text-stone-400 font-mono">
                                  /{recipe.slug}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 hidden sm:table-cell">
                            <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 font-semibold text-xs text-stone-700 dark:text-stone-300">
                              {recipe.category}
                            </span>
                          </td>
                          <td className="p-4 hidden md:table-cell text-stone-500">
                            {recipe.totalTime} {t('common.min')}
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <span className="capitalize text-stone-600 dark:text-stone-400">{recipe.difficulty}</span>
                          </td>
                          <td className="p-4 font-bold text-amber-500">
                            ★ {recipe.rating} <span className="text-xs text-stone-400 font-normal">({recipe.reviewsCount})</span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  setSelectedRecipe(recipe);
                                  setMode('edit_recipe');
                                }}
                                className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-brand-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                                title={t('common.edit')}
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                                className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                title={t('common.delete')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Articles List Table */}
          {activeTab === 'articles' && (
            <>
              {/* Search filter input */}
              <div className="relative max-w-sm">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('admin.searchPlaceholder')}
                  className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
                />
              </div>

              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 font-bold">
                      <tr>
                        <th className="p-4">{t('nav.articles')}</th>
                        <th className="p-4 hidden sm:table-cell">{t('filters.category')}</th>
                        <th className="p-4 hidden md:table-cell">Read Time</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {filteredArticles.map(article => (
                        <tr key={article.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-12 h-12 rounded-xl object-cover shrink-0"
                              />
                              <div>
                                <p className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                                  {article.title}
                                </p>
                                <p className="text-xs text-stone-400 font-mono">
                                  /{article.slug}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 hidden sm:table-cell">
                            <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 font-semibold text-xs text-stone-700 dark:text-stone-300">
                              {article.category}
                            </span>
                          </td>
                          <td className="p-4 hidden md:table-cell text-stone-500">
                            {article.readTime} {t('common.min')}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  setSelectedArticle(article);
                                  setMode('edit_article');
                                }}
                                className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-brand-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                                title={t('common.edit')}
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(article.id, article.title)}
                                className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                title={t('common.delete')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

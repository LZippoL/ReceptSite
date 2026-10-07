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
  RotateCcw
} from 'lucide-react';
import { Recipe, Article } from '../types';
import { recipeService } from '../services/recipeService';
import { articleService } from '../services/articleService';
import { AdminRecipeForm } from '../components/admin/AdminRecipeForm';
import { AdminArticleForm } from '../components/admin/AdminArticleForm';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { updateMetaTags } from '../utils/seo';

export const AdminPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'recipes' | 'articles'>(
    (searchParams.get('tab') as 'recipes' | 'articles') || 'recipes'
  );

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mode: list, create_recipe, edit_recipe, create_article, edit_article
  const [mode, setMode] = useState<'list' | 'create_recipe' | 'edit_recipe' | 'create_article' | 'edit_article'>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { success, error } = useToast();

  const loadData = () => {
    recipeService.getAll().then(setRecipes);
    articleService.getAll().then(setArticles);
  };

  useEffect(() => {
    updateMetaTags({
      title: 'Панель редактора контенту (CMS)',
      description: 'Управління рецептами та кулінарними статтями сайту.'
    });
    loadData();
  }, []);

  const handleTabChange = (tab: 'recipes' | 'articles') => {
    setActiveTab(tab);
    setMode('list');
    setSearchParams({ tab });
  };

  // Recipe actions
  const handleSaveRecipe = async (data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewsCount'>) => {
    try {
      if (mode === 'edit_recipe' && selectedRecipe) {
        await recipeService.update(selectedRecipe.id, data);
        success('Успіх', `Рецепт "${data.title}" оновлено`);
      } else {
        await recipeService.create(data);
        success('Створено', `Новий рецепт "${data.title}" опубліковано!`);
      }
      setMode('list');
      setSelectedRecipe(null);
      loadData();
    } catch {
      error('Помилка', 'Не вдалося зберегти рецепт');
    }
  };

  const handleDeleteRecipe = async (id: string, title: string) => {
    if (window.confirm(`Ви впевнені, що хочете видалити рецепт "${title}"?`)) {
      await recipeService.delete(id);
      success('Видалено', `Рецепт "${title}" видалено`);
      loadData();
    }
  };

  // Article actions
  const handleSaveArticle = async (data: Omit<Article, 'id' | 'createdAt'>) => {
    try {
      if (mode === 'edit_article' && selectedArticle) {
        await articleService.update(selectedArticle.id, data);
        success('Успіх', `Статтю "${data.title}" оновлено`);
      } else {
        await articleService.create(data);
        success('Створено', `Нову статтю "${data.title}" опубліковано!`);
      }
      setMode('list');
      setSelectedArticle(null);
      loadData();
    } catch {
      error('Помилка', 'Не вдалося зберегти статтю');
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (window.confirm(`Ви впевнені, що хочете видалити статтю "${title}"?`)) {
      await articleService.delete(id);
      success('Видалено', `Статтю "${title}" видалено`);
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
    success('Експортовано', 'Базу рецептів збережено у JSON');
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Скинути всі модифікації рецептів до початкових 42 страв?')) {
      await recipeService.resetToDefault();
      loadData();
      success('Скинуто', 'Відновлено початкову бібліотеку страв');
    }
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
            Панель автора (CMS)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Створюйте та редагуйте рецепти і статті без редагування вихідного коду
          </p>
        </div>

        {mode === 'list' && (
          <div className="flex items-center gap-2">
            <Button
              onClick={handleExportRecipesJson}
              variant="outline"
              size="sm"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Експорт JSON
            </Button>
            <Button
              onClick={handleResetDefaults}
              variant="ghost"
              size="sm"
              className="text-stone-500 hover:text-amber-600"
              title="Відновити 42 базових рецепти"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Скинути
            </Button>
          </div>
        )}
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
          {/* Tabs: Recipes vs Articles */}
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800">
            <div className="flex gap-4">
              <button
                onClick={() => handleTabChange('recipes')}
                className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 -mb-px ${
                  activeTab === 'recipes'
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                Рецепти ({recipes.length})
              </button>
              <button
                onClick={() => handleTabChange('articles')}
                className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 -mb-px ${
                  activeTab === 'articles'
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Кулінарні статті ({articles.length})
              </button>
            </div>

            <Button
              onClick={() => setMode(activeTab === 'recipes' ? 'create_recipe' : 'create_article')}
              size="sm"
              className="rounded-xl mb-2"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              {activeTab === 'recipes' ? 'Новий рецепт' : 'Нова стаття'}
            </Button>
          </div>

          {/* Search filter input */}
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Швидкий фільтр за назвою..."
              className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
            />
          </div>

          {/* Recipes List Table */}
          {activeTab === 'recipes' && (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 font-bold">
                    <tr>
                      <th className="p-4">Страва</th>
                      <th className="p-4 hidden sm:table-cell">Категорія</th>
                      <th className="p-4 hidden md:table-cell">Час</th>
                      <th className="p-4 hidden md:table-cell">Складність</th>
                      <th className="p-4">Рейтинг</th>
                      <th className="p-4 text-right">Дії</th>
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
                              <p className="text-[11px] text-stone-400 font-mono">
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
                          {recipe.totalTime} хв
                        </td>
                        <td className="p-4 hidden md:table-cell capitalize text-stone-500">
                          {recipe.difficulty}
                        </td>
                        <td className="p-4 font-bold text-amber-500">
                          ★ {recipe.rating}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setSelectedRecipe(recipe);
                                setMode('edit_recipe');
                              }}
                              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-brand-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                              title="Редагувати"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                              className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Видалити"
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
          )}

          {/* Articles List Table */}
          {activeTab === 'articles' && (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 font-bold">
                    <tr>
                      <th className="p-4">Стаття</th>
                      <th className="p-4 hidden sm:table-cell">Категорія</th>
                      <th className="p-4 hidden md:table-cell">Час читання</th>
                      <th className="p-4 text-right">Дії</th>
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
                              <p className="text-[11px] text-stone-400 font-mono">
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
                          {article.readTime} хв
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setSelectedArticle(article);
                                setMode('edit_article');
                              }}
                              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-brand-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                              title="Редагувати"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(article.id, article.title)}
                              className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="Видалити"
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
          )}
        </div>
      )}
    </div>
  );
};

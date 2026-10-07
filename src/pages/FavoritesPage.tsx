import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, FolderHeart, Trash2 } from 'lucide-react';
import { Recipe } from '../types';
import { recipeService } from '../services/recipeService';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { updateMetaTags } from '../utils/seo';

export const FavoritesPage: React.FC = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const { 
    favorites, 
    collections, 
    createCollection, 
    deleteCollection 
  } = useFavorites();
  const { t, language, localizeRecipe } = useLanguage();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  useEffect(() => {
    updateMetaTags({
      title: `${t('favorites.title')} — ${t('common.siteName')}`,
      description: t('favorites.subtitle')
    });
    recipeService.getAll().then(setAllRecipes);
  }, [language, t]);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    const created = createCollection(newColName.trim(), newColDesc.trim());
    setActiveTab(created.id);
    setNewColName('');
    setNewColDesc('');
    setIsCreateModalOpen(false);
  };

  const getCollectionTitle = (col: { id: string; name: string }) => {
    if (col.id === 'col-fav') return t('favorites.allFavorites');
    if (col.id === 'col-breakfast') return t('categoriesList.breakfast.name');
    if (col.id === 'col-holiday') {
      if (language === 'en') return 'Holidays';
      if (language === 'de') return 'Feiertage';
      if (language === 'zh') return '节日盛宴';
      return col.name;
    }
    if (col.id === 'col-try') {
      if (language === 'en') return 'To Try';
      if (language === 'de') return 'Ausprobieren';
      if (language === 'zh') return '想尝试';
      return col.name;
    }
    if (col.id === 'col-quick-dinner') {
      if (language === 'en') return 'Quick Dinner';
      if (language === 'de') return 'Schnelles Abendessen';
      if (language === 'zh') return '快手晚餐';
      return col.name;
    }
    return col.name;
  };

  // Get active recipes to display
  let displayedRecipes: Recipe[] = [];
  if (activeTab === 'all') {
    displayedRecipes = allRecipes.filter(r => favorites.includes(r.id));
  } else {
    const activeCol = collections.find(c => c.id === activeTab);
    if (activeCol) {
      displayedRecipes = allRecipes.filter(r => activeCol.recipeIds.includes(r.id));
    }
  }

  const localizedDisplayedRecipes = displayedRecipes.map(localizeRecipe);

  return (
    <div className="space-y-8 pb-14 animate-fade-in pt-4">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            {t('favorites.title')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t('favorites.subtitle')}
          </p>
        </div>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          variant="outline"
          className="border-brand-300 text-brand-700 dark:text-brand-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('favorites.createCollection')}
        </Button>
      </div>

      {/* Collections Tabs Bar */}
      <div className="w-full overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border ${
              activeTab === 'all'
                ? 'bg-rose-500 border-rose-500 text-white shadow-md'
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300'
            }`}
          >
            ❤️ {t('favorites.allFavorites')} ({favorites.length})
          </button>

          {collections.map(col => {
            const isSelected = activeTab === col.id;
            return (
              <div key={col.id} className="relative group shrink-0">
                <button
                  onClick={() => setActiveTab(col.id)}
                  className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-brand-600 border-brand-600 text-white shadow-md'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                  }`}
                >
                  <span>{col.icon || '📁'}</span>
                  <span>{getCollectionTitle(col)}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/30 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'}`}>
                    {col.recipeIds.length}
                  </span>
                </button>

                {/* Delete custom collection button */}
                {col.id.startsWith('col-') && !['col-fav', 'col-breakfast', 'col-holiday', 'col-try', 'col-quick-dinner'].includes(col.id) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCollection(col.id);
                      setActiveTab('all');
                    }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                    title={t('common.delete')}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of recipes */}
      {localizedDisplayedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {localizedDisplayedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center max-w-md mx-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4 my-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center mx-auto">
            <FolderHeart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
            {t('favorites.emptyTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            {t('favorites.emptyDesc')}
          </p>
          <Link to="/recipes">
            <Button variant="primary">{t('favorites.exploreBtn')}</Button>
          </Link>
        </div>
      )}

      {/* Modal for creating a new collection */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={t('favorites.createCollection')}
        description={t('favorites.collectionNamePlaceholder')}
      >
        <form onSubmit={handleCreateCollection} className="space-y-4 pt-2">
          <Input
            label={t('favorites.collections')}
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
            placeholder={t('favorites.collectionNamePlaceholder')}
            required
          />
          <Input
            label={t('common.edit')}
            value={newColDesc}
            onChange={(e) => setNewColDesc(e.target.value)}
            placeholder={t('favorites.collectionNamePlaceholder')}
          />

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={!newColName.trim()}
              className="flex-1"
            >
              {t('common.save')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

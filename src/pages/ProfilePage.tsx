import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Heart, 
  Clock, 
  ShoppingBag, 
  Settings, 
  Sun, 
  Moon, 
  Laptop, 
  Plus, 
  X,
  Download
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useShoppingList } from '../context/ShoppingListContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { recipeService } from '../services/recipeService';
import { Recipe } from '../types';
import { Button } from '../components/common/Button';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { updateMetaTags } from '../utils/seo';

export const ProfilePage: React.FC = () => {
  const { 
    favorites, 
    recentlyViewed, 
    collections, 
    userStaples, 
    addStaple, 
    removeStaple 
  } = useFavorites();
  const { totalCount, uncompletedCount } = useShoppingList();
  const { theme, setTheme } = useTheme();
  const { success, error } = useToast();

  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [newStapleInput, setNewStapleInput] = useState('');

  useEffect(() => {
    updateMetaTags({
      title: 'Профіль кулінара & Налаштування',
      description: 'Ваш особистий кулінарний профіль, збережені інгредієнти та налаштування сайту.'
    });

    if (recentlyViewed.length > 0) {
      Promise.all(recentlyViewed.slice(0, 4).map(id => recipeService.getById(id))).then(list => {
        setRecentRecipes(list.filter((r): r is Recipe => r !== null));
      });
    }
  }, [recentlyViewed]);

  const handleAddStaple = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStapleInput.trim()) return;
    addStaple(newStapleInput.trim());
    setNewStapleInput('');
    success('Додано', 'Базовий продукт збережено');
  };

  const handleExportData = async () => {
    try {
      const data = {
        favorites: localStorage.getItem('smakolyk_favorites'),
        collections: localStorage.getItem('smakolyk_collections'),
        shoppingList: localStorage.getItem('smakolyk_shopping_list'),
        staples: localStorage.getItem('smakolyk_staples'),
        customRecipes: localStorage.getItem('smakolyk_recipes_custom'),
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `smakolyk-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      success('Експортовано', 'Резервну копію ваших даних завантажено');
    } catch {
      error('Помилка', 'Не вдалося створити файл експорту');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16 animate-fade-in pt-4">
      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-r from-brand-600 via-amber-600 to-orange-600 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-3xl font-bold shrink-0 shadow-lg">
          <User className="w-10 h-10" />
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold">Мій кулінарний профіль</h1>
          <p className="text-xs sm:text-sm text-amber-100">
            Зручне місце для управління улюбленими рецептами, покупками та базовими інгредієнтами
          </p>
          <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
              ❤️ {favorites.length} улюблених
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
              📁 {collections.length} колекцій
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
              🛒 {uncompletedCount} у списку покупок
            </span>
          </div>
        </div>
      </div>

      {/* QUICK LINKS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/favorites"
          className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-warm hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Улюблені рецепти</h3>
            <p className="text-xs text-stone-500">{favorites.length} збережених</p>
          </div>
        </Link>

        <Link
          to="/shopping-list"
          className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-warm hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Список покупок</h3>
            <p className="text-xs text-stone-500">{totalCount} товарів</p>
          </div>
        </Link>

        <Link
          to="/admin"
          className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-warm hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Панель автора (CMS)</h3>
            <p className="text-xs text-stone-500">Додати свій рецепт</p>
          </div>
        </Link>
      </div>

      {/* THEME SETTINGS */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 shadow-card space-y-4">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
          Тема оформлення інтерфейсу
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Світла', icon: Sun },
            { id: 'dark', label: 'Темна', icon: Moon },
            { id: 'system', label: 'Системна', icon: Laptop }
          ].map(opt => {
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id as typeof theme)}
                className={`p-3.5 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-300 ring-2 ring-brand-500/20'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                <opt.icon className="w-5 h-5" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PANTRY STAPLES SETTINGS */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 shadow-card space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Базові продукти на кухні
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Ці інгредієнти вважаються наявними за замовчуванням у функції «Що є у холодильнику?» (не блокують приготування)
          </p>
        </div>

        {/* Existing staples chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {userStaples.map((staple, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200"
            >
              <span>{staple}</span>
              <button
                onClick={() => removeStaple(staple)}
                className="w-4 h-4 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center text-stone-500"
                aria-label={`Видалити ${staple}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add staple form */}
        <form onSubmit={handleAddStaple} className="flex gap-2 max-w-sm pt-2">
          <input
            type="text"
            value={newStapleInput}
            onChange={(e) => setNewStapleInput(e.target.value)}
            placeholder="Додати базовий продукт..."
            className="flex-1 h-10 px-3 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl outline-none focus:border-brand-500"
          />
          <Button type="submit" size="sm" className="rounded-xl">
            <Plus className="w-4 h-4 mr-1" />
            Додати
          </Button>
        </form>
      </div>

      {/* RECENTLY VIEWED RECIPES */}
      {recentRecipes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Нещодавно переглянуті страви
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentRecipes.map(r => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      )}

      {/* BACKUP & DATA MANAGEMENT */}
      <div className="p-6 rounded-3xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-stone-800 dark:text-stone-200">
            Резервна копія та перенесення даних
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">
            Збережіть усі ваші колекції, обрані рецепти та список покупок у файл JSON.
          </p>
        </div>
        <Button
          onClick={handleExportData}
          variant="outline"
          size="sm"
          className="shrink-0"
        >
          <Download className="w-4 h-4 mr-2" />
          Завантажити резервну копію
        </Button>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, RotateCcw, Frown } from 'lucide-react';
import { Recipe, FilterState, RecipeCategory } from '../types';
import { recipeService } from '../services/recipeService';
import { CATEGORIES } from '../data/categories';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { FilterSheet } from '../components/search/FilterSheet';
import { Button } from '../components/common/Button';
import { updateMetaTags } from '../utils/seo';

export const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract filters from URL search params
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';
  const initialMaxTime = searchParams.get('maxTime') ? Number(searchParams.get('maxTime')) : null;
  const initialSort = (searchParams.get('sortBy') as FilterState['sortBy']) || 'popularity';

  const [filters, setFilters] = useState<FilterState>({
    query: initialQuery,
    category: initialCategory,
    cuisine: searchParams.get('cuisine') || '',
    maxTime: initialMaxTime,
    difficulty: searchParams.get('difficulty') || '',
    dietary: {
      vegetarian: searchParams.get('vegetarian') === 'true',
      vegan: searchParams.get('vegan') === 'true',
      glutenFree: searchParams.get('glutenFree') === 'true',
      lactoseFree: searchParams.get('lactoseFree') === 'true'
    },
    sortBy: initialSort
  });

  useEffect(() => {
    updateMetaTags({
      title: 'Усі рецепти — Каталог страв',
      description: 'Переглядайте понад 40 покрокових рецептів української та світової кухні з фільтрами за часом, складністю та дієтою.'
    });
    recipeService.getAll().then(setRecipes);
  }, []);

  // Sync state to URL search parameters
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.query) params.q = filters.query;
    if (filters.category) params.category = filters.category;
    if (filters.cuisine) params.cuisine = filters.cuisine;
    if (filters.maxTime) params.maxTime = filters.maxTime.toString();
    if (filters.difficulty) params.difficulty = filters.difficulty;
    if (filters.dietary.vegetarian) params.vegetarian = 'true';
    if (filters.dietary.vegan) params.vegan = 'true';
    if (filters.dietary.glutenFree) params.glutenFree = 'true';
    if (filters.dietary.lactoseFree) params.lactoseFree = 'true';
    if (filters.sortBy !== 'popularity') params.sortBy = filters.sortBy;

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleResetFilters = () => {
    setFilters({
      query: '',
      category: '',
      cuisine: '',
      maxTime: null,
      difficulty: '',
      dietary: {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        lactoseFree: false
      },
      sortBy: 'popularity'
    });
  };

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      // Query filter
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase().trim();
        const matchesQuery =
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some(t => t.toLowerCase().includes(q)) ||
          r.ingredients.some(i => i.name.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Category filter
      if (filters.category && r.category !== filters.category) {
        return false;
      }

      // Cuisine filter
      if (filters.cuisine && r.cuisine !== filters.cuisine) {
        return false;
      }

      // Max Time filter
      if (filters.maxTime !== null && r.totalTime > filters.maxTime) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty && r.difficulty !== filters.difficulty) {
        return false;
      }

      // Dietary filters
      if (filters.dietary.vegetarian && !r.dietary?.vegetarian) return false;
      if (filters.dietary.vegan && !r.dietary?.vegan) return false;
      if (filters.dietary.glutenFree && !r.dietary?.glutenFree) return false;
      if (filters.dietary.lactoseFree && !r.dietary?.lactoseFree) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (filters.sortBy === 'cookTime') return a.totalTime - b.totalTime;
      return b.reviewsCount - a.reviewsCount; // popularity
    });
  }, [recipes, filters]);

  const activeFiltersCount =
    (filters.category ? 1 : 0) +
    (filters.cuisine ? 1 : 0) +
    (filters.maxTime !== null ? 1 : 0) +
    (filters.difficulty ? 1 : 0) +
    Object.values(filters.dietary).filter(Boolean).length;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Title & Search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            Каталог рецептів
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Знайдено {filteredRecipes.length} з {recipes.length} страв
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick text search input */}
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              placeholder="Пошук страви..."
              className="w-full h-11 pl-9 pr-4 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl outline-none focus:border-brand-500"
            />
          </div>

          {/* Filter button for mobile and desktop */}
          <Button
            onClick={() => setIsFilterOpen(true)}
            variant={activeFiltersCount > 0 ? 'primary' : 'outline'}
            className="shrink-0 h-11"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Фільтри
            {activeFiltersCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-white text-brand-700 font-bold rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Horizontal categories scrollable chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
          className={`shrink-0 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
            !filters.category
              ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-brand-300'
          }`}
        >
          Всі категорії ({recipes.length})
        </button>
        {CATEGORIES.map(c => {
          const isSelected = filters.category === c.id;
          const count = recipes.filter(r => r.category === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setFilters(prev => ({ ...prev, category: isSelected ? '' : (c.id as RecipeCategory) }))}
              className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-brand-300'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/30 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of recipes */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-10 text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 mx-auto flex items-center justify-center">
            <Frown className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Нічого не знайдено
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            Ми не знайшли рецептів за вашими поточними фільтрами. Спробуйте скинути деякі параметри або спробуйте пошук за інгредієнтами з холодильника!
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button onClick={handleResetFilters} variant="secondary">
              <RotateCcw className="w-4 h-4 mr-2" />
              Скинути фільтри
            </Button>
          </div>
        </div>
      )}

      {/* Filter modal sheet */}
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
      />
    </div>
  );
};

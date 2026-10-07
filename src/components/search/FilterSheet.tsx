import React from 'react';
import { FilterState } from '../../types';
import { CUISINES } from '../../data/categories';
import { Button } from '../common/Button';
import { X, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/cn';

interface FilterSheetProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  filters,
  onChange,
  onReset,
  isOpen = false,
  onClose
}) => {
  const { t, getCuisineName } = useLanguage();

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleDietary = (key: keyof FilterState['dietary']) => {
    onChange({
      ...filters,
      dietary: {
        ...filters.dietary,
        [key]: !filters.dietary[key]
      }
    });
  };

  const hasActiveFilters =
    Boolean(filters.category) ||
    Boolean(filters.cuisine) ||
    filters.maxTime !== null ||
    Boolean(filters.difficulty) ||
    Object.values(filters.dietary).some(Boolean);

  const content = (
    <div className="space-y-6">
      {/* Header if modal */}
      {onClose && (
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {t('filters.title')}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Sorting */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 block">
          {t('recipes.sortBy')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'popularity', label: t('recipes.sortPopular') },
            { id: 'rating', label: `${t('recipes.sortRating')} ★` },
            { id: 'newest', label: t('recipes.sortNewest') },
            { id: 'cookTime', label: `${t('recipes.sortCookTime')} ⚡` }
          ].map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateFilter('sortBy', opt.id as FilterState['sortBy'])}
              className={cn(
                'text-xs font-semibold py-2.5 px-3 rounded-xl border text-center transition-all',
                filters.sortBy === opt.id
                  ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-brand-300'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cooking Time */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 block">
          {t('filters.maxTime')}
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: null, label: t('common.all') },
            { value: 15, label: t('filters.upTo15') },
            { value: 30, label: t('filters.upTo30') },
            { value: 60, label: t('filters.upTo60') }
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => updateFilter('maxTime', item.value)}
              className={cn(
                'text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all',
                filters.maxTime === item.value
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 block">
          {t('filters.difficulty')}
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: '', label: t('common.all') },
            { id: 'easy', label: t('recipeDetail.difficultyEasy') },
            { id: 'medium', label: t('recipeDetail.difficultyMedium') },
            { id: 'hard', label: t('recipeDetail.difficultyHard') }
          ].map(d => (
            <button
              key={d.id}
              type="button"
              onClick={() => updateFilter('difficulty', d.id)}
              className={cn(
                'text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all',
                filters.difficulty === d.id
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 block">
          {t('filters.dietary')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'vegetarian', label: `🌱 ${t('recipeDetail.dietVegetarian')}` },
            { key: 'vegan', label: `🥑 ${t('recipeDetail.dietVegan')}` },
            { key: 'glutenFree', label: `🌾 ${t('recipeDetail.dietGlutenFree')}` },
            { key: 'lactoseFree', label: `🥛 ${t('recipeDetail.dietLactoseFree')}` }
          ].map(item => {
            const active = filters.dietary[item.key as keyof FilterState['dietary']];
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => toggleDietary(item.key as keyof FilterState['dietary'])}
                className={cn(
                  'text-xs font-semibold py-2 px-3 rounded-xl border text-left transition-all',
                  active
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cuisine */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 block">
          {t('filters.cuisine')}
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
          <button
            type="button"
            onClick={() => updateFilter('cuisine', '')}
            className={cn(
              'text-xs font-medium px-3 py-1.5 rounded-xl border transition-all',
              !filters.cuisine
                ? 'bg-brand-600 border-brand-600 text-white'
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
            )}
          >
            {t('common.all')}
          </button>
          {CUISINES.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => updateFilter('cuisine', c.id)}
              className={cn(
                'text-xs font-medium px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1',
                filters.cuisine === c.id
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              )}
            >
              <span>{c.flag}</span>
              <span>{getCuisineName(c.id)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset & Apply */}
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex gap-2">
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onReset}
            className="flex-1 text-xs text-rose-600 hover:text-rose-700"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            {t('common.reset')}
          </Button>
        )}
        {onClose && (
          <Button onClick={onClose} className="flex-1">
            {t('filters.showResults')}
          </Button>
        )}
      </div>
    </div>
  );

  if (onClose) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
        <div className="fixed inset-0" onClick={onClose} />
        <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 max-h-[85vh] overflow-y-auto shadow-2xl z-10 animate-slide-up sm:animate-scale-up">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 rounded-3xl p-5 shadow-card">
      {content}
    </div>
  );
};

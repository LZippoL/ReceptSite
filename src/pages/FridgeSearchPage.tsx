import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Settings2, 
  ChefHat
} from 'lucide-react';
import { Recipe } from '../types';
import { recipeService } from '../services/recipeService';
import { IngredientChipInput } from '../components/fridge/IngredientChipInput';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { matchRecipesByIngredients } from '../utils/ingredientMatcher';
import { updateMetaTags } from '../utils/seo';

export const FridgeSearchPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { userStaples } = useFavorites();
  const { t, localizeRecipe } = useLanguage();

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smakolyk_fridge_selected');
      return saved ? JSON.parse(saved) : ['Яйця', 'Сир', 'Помідори'];
    } catch {
      return ['Яйця', 'Сир'];
    }
  });

  const [ignoreStaples, setIgnoreStaples] = useState<boolean>(true);
  const [onlyFullyReady, setOnlyFullyReady] = useState<boolean>(false);
  const [showStaplesSettings, setShowStaplesSettings] = useState<boolean>(false);

  useEffect(() => {
    updateMetaTags({
      title: `${t('fridge.title')} | ${t('common.siteName')}`,
      description: t('fridge.subtitle')
    });
    recipeService.getAll().then(setRecipes);
  }, [t]);

  useEffect(() => {
    localStorage.setItem('smakolyk_fridge_selected', JSON.stringify(selectedIngredients));
  }, [selectedIngredients]);

  // Extract all unique ingredients from database for autocomplete suggestions
  const allAvailableIngredients = useMemo(() => {
    const set = new Set<string>();
    recipes.forEach(r => {
      r.ingredients.forEach(i => set.add(i.name));
    });
    return Array.from(set).sort();
  }, [recipes]);

  // Match recipes
  const matchedResults = useMemo(() => {
    if (selectedIngredients.length === 0) return [];
    return matchRecipesByIngredients(
      recipes,
      selectedIngredients,
      ignoreStaples ? userStaples : []
    );
  }, [recipes, selectedIngredients, ignoreStaples, userStaples]);

  // Group matched results into 3 categories
  const readyNow = matchedResults.filter(r => r.matchType === 'ready_now');
  const almostReady = matchedResults.filter(r => r.matchType === 'almost_ready');
  const partialMatches = matchedResults.filter(r => r.matchType === 'partial');

  return (
    <div className="space-y-8 pb-14 animate-fade-in">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-600 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {t('hero.badge')}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t('fridge.title')}
          </h1>
          <p className="text-xs sm:text-base text-amber-100 leading-relaxed font-normal">
            {t('fridge.subtitle')}
          </p>
        </div>
      </div>

      {/* Ingredient Chip Input Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-8 shadow-card space-y-5">
        <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
          {t('fridge.yourIngredients')}
        </h2>

        <IngredientChipInput
          ingredients={selectedIngredients}
          onChange={setSelectedIngredients}
          availableSuggestions={allAvailableIngredients}
        />

        {/* Options & Settings Bar */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex flex-wrap items-center gap-4">
            {/* Ignore staples toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700 dark:text-stone-300">
              <input
                type="checkbox"
                checked={ignoreStaples}
                onChange={(e) => setIgnoreStaples(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span>{t('fridge.staplesModalDesc')}</span>
            </label>

            {/* Only ready recipes toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700 dark:text-stone-300">
              <input
                type="checkbox"
                checked={onlyFullyReady}
                onChange={(e) => setOnlyFullyReady(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span>{t('fridge.filterOnlyFullMatch')}</span>
            </label>
          </div>

          <button
            type="button"
            onClick={() => setShowStaplesSettings(!showStaplesSettings)}
            className="flex items-center gap-1.5 text-brand-600 hover:text-brand-700"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>{t('fridge.manageStaples')}</span>
          </button>
        </div>

        {/* Pantry Staples drawer */}
        {showStaplesSettings && (
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 text-xs space-y-2 animate-slide-up">
            <p className="font-bold text-stone-800 dark:text-stone-200">
              {t('fridge.staplesModalTitle')}:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {userStaples.map((staple, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium"
                >
                  {staple}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-stone-500">
              {t('profile.myStaplesDesc')}
            </p>
          </div>
        )}
      </div>

      {/* RESULTS DISPLAY */}
      {selectedIngredients.length > 0 ? (
        <div className="space-y-12">
          {/* SECTION 1: Ready to cook right now */}
          {readyNow.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200 dark:border-stone-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
                    {t('fridge.readyNowTitle')}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {t('fridge.readyNowSubtitle')} ({readyNow.length})
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {readyNow.map(result => (
                  <RecipeCard
                    key={result.recipe.id}
                    recipe={localizeRecipe(result.recipe)}
                    matchInfo={result}
                  />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 2: Almost ready (Missing 1-2 items) */}
          {!onlyFullyReady && almostReady.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200 dark:border-stone-800">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
                    {t('fridge.almostReadyTitle')}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {t('fridge.almostReadySubtitle')} ({almostReady.length})
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {almostReady.map(result => (
                  <RecipeCard
                    key={result.recipe.id}
                    recipe={localizeRecipe(result.recipe)}
                    matchInfo={result}
                  />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 3: Partial matches */}
          {!onlyFullyReady && partialMatches.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200 dark:border-stone-800">
                <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 flex items-center justify-center">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
                    {t('fridge.partialTitle')}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {t('fridge.partialSubtitle')} ({partialMatches.length})
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {partialMatches.slice(0, 8).map(result => (
                  <RecipeCard
                    key={result.recipe.id}
                    recipe={localizeRecipe(result.recipe)}
                    matchInfo={result}
                  />
                ))}
              </div>
            </section>
          )}

          {/* If nothing at all matched */}
          {matchedResults.length === 0 && (
            <div className="p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center max-w-md mx-auto space-y-3">
              <p className="font-bold text-stone-800 dark:text-stone-200 text-base">
                {t('fridge.noResultsTitle')}
              </p>
              <p className="text-xs text-stone-500">
                {t('fridge.noResultsDesc')}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Empty selection state */
        <div className="p-12 text-center max-w-lg mx-auto bg-stone-100/60 dark:bg-stone-900/40 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 space-y-3">
          <ChefHat className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
            {t('fridge.startPrompt')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            {t('fridge.subtitle')}
          </p>
        </div>
      )}
    </div>
  );
};

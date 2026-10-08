import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, Flame, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { Recipe, IngredientMatchResult } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { cn } from '../../utils/cn';

interface RecipeCardProps {
  recipe: Recipe;
  matchInfo?: IngredientMatchResult;
  className?: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  matchInfo,
  className
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { success, info } = useToast();
  const { t } = useLanguage();
  const favorite = isFavorite(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
    if (!favorite) {
      success(t('favorites.addedToast'), `"${recipe.title}"`);
    } else {
      info(t('favorites.removedToast'), `"${recipe.title}"`);
    }
  };

  const difficultyLabels = {
    easy: { text: t('recipeDetail.difficultyEasy'), variant: 'success' as const },
    medium: { text: t('recipeDetail.difficultyMedium'), variant: 'warning' as const },
    hard: { text: t('recipeDetail.difficultyHard'), variant: 'primary' as const }
  };

  return (
    <article
      className={cn(
        'group bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 rounded-3xl overflow-hidden shadow-card hover:shadow-warm hover:-translate-y-1 transition-all duration-300 flex flex-col',
        className
      )}
    >
      <Link to={`/recipes/${recipe.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={recipe.image || `${import.meta.env.BASE_URL}images/recipe-placeholder.svg`}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Favorite heart button */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            'absolute top-3 right-3 w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90',
            favorite
              ? 'bg-rose-500 text-white shadow-rose-500/40'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-900 hover:text-rose-500'
          )}
          aria-label={favorite ? t('favorites.removedToast') : t('favorites.addedToast')}
        >
          <Heart className={cn('w-5 h-5 transition-transform', favorite ? 'fill-current scale-110' : '')} />
        </button>

        {/* Difficulty & Quick badge top left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant={difficultyLabels[recipe.difficulty]?.variant || 'default'} size="sm" className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-none shadow-sm">
            {difficultyLabels[recipe.difficulty]?.text || recipe.difficulty}
          </Badge>
          {recipe.totalTime <= 20 && (
            <Badge variant="primary" size="sm" className="bg-amber-500 text-white border-none shadow-sm font-bold">
              ⚡ 20 {t('common.min')}
            </Badge>
          )}
        </div>

        {/* Total Time & Calories bottom overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold drop-shadow-sm pointer-events-none">
          <span className="flex items-center gap-1 bg-stone-950/40 backdrop-blur-md px-2.5 py-1 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {recipe.totalTime} {t('common.min')}
          </span>
          <span className="flex items-center gap-1 bg-stone-950/40 backdrop-blur-md px-2.5 py-1 rounded-xl">
            <Flame className="w-3.5 h-3.5 text-brand-400" />
            {recipe.calories} {t('common.calories')}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <RatingStars
              rating={recipe.rating}
              size="sm"
              showScore
              reviewsCount={recipe.reviewsCount}
            />
            <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3 h-3 text-stone-500" />
              {recipe.servings} {t('common.servings')}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
            <Link to={`/recipes/${recipe.slug}`}>
              {recipe.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Ingredient match info (if in Fridge Mode) */}
        {matchInfo && (
          <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
              {matchInfo.matchType === 'ready_now' ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('fridge.allIngredientsReady')} ({matchInfo.matchedIngredients.length})
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {t('fridge.youHave')} {matchInfo.matchedIngredients.length} / {matchInfo.matchedIngredients.length + matchInfo.missingIngredients.length}
                </span>
              )}
            </div>
            {matchInfo.missingIngredients.length > 0 && (
              <p className="text-[11px] text-stone-600 dark:text-stone-300 truncate">
                <span className="font-medium text-stone-700 dark:text-stone-200">{t('fridge.missingIngredients')} </span>
                {matchInfo.missingIngredients.join(', ')}
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

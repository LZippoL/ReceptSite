import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Flame, 
  Users, 
  ChefHat, 
  Heart, 
  Share2, 
  Play, 
  Calendar,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Recipe } from '../types';
import { recipeService } from '../services/recipeService';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { RatingStars } from '../components/common/RatingStars';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { IngredientChecklist } from '../components/recipe/IngredientChecklist';
import { CookingTimer } from '../components/recipe/CookingTimer';
import { CookingModeModal } from '../components/recipe/CookingModeModal';
import { ShareModal } from '../components/recipe/ShareModal';
import { ReviewSection } from '../components/reviews/ReviewSection';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { updateMetaTags, generateRecipeSchema } from '../utils/seo';

export const RecipeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCookingModeOpen, setIsCookingModeOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { isFavorite, toggleFavorite, recordRecipeView } = useFavorites();
  const { success, info } = useToast();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    recipeService.getBySlug(slug).then(found => {
      setRecipe(found);
      setLoading(false);

      if (found) {
        recordRecipeView(found.id);
        updateMetaTags({
          title: found.seoTitle || found.title,
          description: found.seoDescription || found.description,
          image: found.image,
          url: window.location.href
        });

        // Load related recipes in same category
        recipeService.getAll().then(all => {
          const related = all
            .filter(r => r.id !== found.id && (r.category === found.category || r.cuisine === found.cuisine))
            .slice(0, 4);
          setRelatedRecipes(related);
        });
      }
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-stone-500 font-medium">Завантажуємо смачний рецепт...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
          Рецепт не знайдено
        </h2>
        <p className="text-sm text-stone-500">
          Можливо, сторінку було переміщено або видалено.
        </p>
        <Link to="/recipes">
          <Button variant="primary">Перейти до каталогу рецептів</Button>
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(recipe.id);

  const handleFavoriteClick = () => {
    toggleFavorite(recipe.id);
    if (!favorite) success('Додано в улюблені', `"${recipe.title}" збережено`);
    else info('Вилучено', `"${recipe.title}" видалено з улюблених`);
  };

  const difficultyNames = {
    easy: 'Легко',
    medium: 'Середня складність',
    hard: 'Висока складність'
  };

  return (
    <div className="space-y-10 pb-16 animate-fade-in">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateRecipeSchema(recipe) }}
      />

      {/* Breadcrumb / Back button */}
      <div className="pt-2">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад до каталогу
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recipe Hero Image */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-stone-100 dark:bg-stone-800">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Float Action buttons top right */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleFavoriteClick}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90 ${
                  favorite
                    ? 'bg-rose-500 text-white shadow-rose-500/40'
                    : 'bg-white/85 dark:bg-stone-900/85 text-stone-700 dark:text-stone-300 hover:bg-white hover:text-rose-500'
                }`}
                aria-label={favorite ? 'Видалити з улюблених' : 'Додати в улюблені'}
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-current scale-110' : ''}`} />
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="w-11 h-11 rounded-2xl bg-white/85 dark:bg-stone-900/85 hover:bg-white text-stone-700 dark:text-stone-300 flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90"
                aria-label="Поділитися"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Cooking Mode Button on Image */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <Button
                onClick={() => setIsCookingModeOpen(true)}
                size="lg"
                className="bg-brand-600/95 hover:bg-brand-500 text-white font-bold backdrop-blur-md shadow-xl border border-white/20"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                Режим шеф-кухаря
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Recipe Metadata & Description */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{recipe.category}</Badge>
              <Badge variant="secondary">{recipe.cuisine} кухня</Badge>
              <Badge variant="outline">{difficultyNames[recipe.difficulty]}</Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
              {recipe.title}
            </h1>

            <div className="flex items-center gap-3 pt-1">
              <RatingStars
                rating={recipe.rating}
                showScore
                reviewsCount={recipe.reviewsCount}
              />
            </div>
          </div>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            {recipe.description}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm text-xs">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-amber-500" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Час</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{recipe.totalTime} хв</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Flame className="w-5 h-5 text-brand-500" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Калорії</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{recipe.calories} ккал</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-sky-500" />
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Порції</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{recipe.servings} порц.</span>
              </div>
            </div>
          </div>

          {/* Nutrition Info (Б / Ж / В) */}
          {recipe.nutrition && (
            <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
                Харчова цінність на порцію:
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white dark:bg-stone-900">
                  <span className="text-stone-400 block text-[10px]">Білки</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{recipe.nutrition.protein} г</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-stone-900">
                  <span className="text-stone-400 block text-[10px]">Жири</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{recipe.nutrition.fat} г</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-stone-900">
                  <span className="text-stone-400 block text-[10px]">Вуглеводи</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{recipe.nutrition.carbs} г</span>
                </div>
              </div>
            </div>
          )}

          {/* Author info */}
          <div className="flex items-center gap-3 pt-2 text-xs text-stone-500">
            <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 font-bold flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <p className="font-semibold text-stone-800 dark:text-stone-200">{recipe.author.name}</p>
              <p className="text-[11px] text-stone-400">{recipe.author.role || 'Автор рецепту'}</p>
            </div>
            <span className="text-stone-300 dark:text-stone-700 ml-auto flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(recipe.createdAt).toLocaleDateString('uk-UA')}
            </span>
          </div>
        </div>
      </div>

      {/* INGREDIENTS & STEPS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
        {/* Ingredients Checklist */}
        <div className="lg:col-span-5 sticky top-24">
          <IngredientChecklist recipe={recipe} />
        </div>

        {/* Step-by-Step Instructions Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              Покрокове приготування
            </h3>
            <Button
              onClick={() => setIsCookingModeOpen(true)}
              variant="outline"
              size="sm"
              className="text-brand-600"
            >
              <Play className="w-3.5 h-3.5 mr-1 fill-current" />
              Режим шефа
            </Button>
          </div>

          <div className="space-y-6">
            {recipe.instructions.map((step) => (
              <div
                key={step.stepNumber}
                id={`step-${step.stepNumber}`}
                className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 rounded-3xl p-5 sm:p-6 shadow-card space-y-3 scroll-mt-24"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                    Крок {step.stepNumber}
                  </span>

                  {/* Step timer */}
                  {step.timerMinutes && (
                    <CookingTimer
                      initialMinutes={step.timerMinutes}
                      label="Таймер"
                    />
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                  {step.title}
                </h4>

                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
                  {step.instruction}
                </p>

                {/* Chef Tip */}
                {step.tip && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/60 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-snug">
                      <strong className="font-semibold text-amber-800 dark:text-amber-300">Підказка: </strong>
                      {step.tip}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="pt-8">
        <ReviewSection recipeId={recipe.id} recipeTitle={recipe.title} />
      </div>

      {/* RELATED RECIPES */}
      {relatedRecipes.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-stone-200 dark:border-stone-800">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              Схожі рецепти
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Вам також можуть сподобатися ці страви
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedRecipes.map(rel => (
              <RecipeCard key={rel.id} recipe={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Cooking Mode Modal */}
      <CookingModeModal
        recipe={recipe}
        isOpen={isCookingModeOpen}
        onClose={() => setIsCookingModeOpen(false)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={recipe.title}
        description={recipe.description}
      />
    </div>
  );
};

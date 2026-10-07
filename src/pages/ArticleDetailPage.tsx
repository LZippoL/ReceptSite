import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Share2, ChefHat, Sparkles } from 'lucide-react';
import { Article, Recipe } from '../types';
import { articleService } from '../services/articleService';
import { recipeService } from '../services/recipeService';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { ShareModal } from '../components/recipe/ShareModal';
import { updateMetaTags, generateArticleSchema } from '../utils/seo';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    articleService.getBySlug(slug).then(found => {
      setArticle(found);
      setLoading(false);

      if (found) {
        updateMetaTags({
          title: found.title,
          description: found.summary,
          image: found.image,
          url: window.location.href
        });

        // Load related recipes if mentioned
        if (found.relatedRecipeSlugs && found.relatedRecipeSlugs.length > 0) {
          Promise.all(found.relatedRecipeSlugs.map(s => recipeService.getBySlug(s))).then(results => {
            const valid = results.filter((r): r is Recipe => r !== null);
            setRelatedRecipes(valid);
          });
        }
      }
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-stone-500 font-medium">Завантажуємо статтю...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
          Статтю не знайдено
        </h2>
        <Link to="/articles" className="text-brand-600 hover:underline">
          Повернутися до статей
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8 pb-16 animate-fade-in pt-4">
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateArticleSchema(article) }}
      />

      {/* Back button */}
      <div>
        <Link
          to="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Всі кулінарні статті
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-bold">
            {article.category}
          </span>
          <span className="text-xs text-stone-600 dark:text-stone-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime} хв читання
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
          {article.summary}
        </p>

        {/* Author bar */}
        <div className="flex items-center justify-between pt-4 pb-2 border-y border-stone-100 dark:border-stone-800 text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 flex items-center justify-center font-bold">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                {article.author.name}
              </p>
              <p className="text-[11px] text-stone-400">
                {article.author.role || 'Кулінарний експерт'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.createdAt).toLocaleDateString('uk-UA')}
            </span>
            <button
              onClick={() => setIsShareOpen(true)}
              className="p-2 rounded-xl text-stone-500 hover:text-brand-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Поділитися"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Rich Content Render */}
      <div
        className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-base leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-400 mr-1">Теги:</span>
          {article.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Related recipes */}
      {relatedRecipes.length > 0 && (
        <div className="space-y-4 pt-10 border-t border-stone-200 dark:border-stone-800">
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            Спробуйте рецепти до цієї теми:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedRecipes.map(rec => (
              <RecipeCard key={rec.id} recipe={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={article.title}
        description={article.summary}
      />
    </article>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Share2, ChefHat, Sparkles } from 'lucide-react';
import { Article, Recipe } from '../types';
import { articleService } from '../services/articleService';
import { recipeService } from '../services/recipeService';
import { useLanguage } from '../context/LanguageContext';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { ShareModal } from '../components/recipe/ShareModal';
import { updateMetaTags, generateArticleSchema } from '../utils/seo';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { t, language, localizeArticle, localizeRecipe } = useLanguage();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    articleService.getBySlug(slug).then(found => {
      setArticle(found);
      setLoading(false);

      if (found) {
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

  const localizedArticle = article ? localizeArticle(article) : null;
  const localizedRelated = relatedRecipes.map(localizeRecipe);

  useEffect(() => {
    if (localizedArticle) {
      updateMetaTags({
        title: `${localizedArticle.title} — ${t('common.siteName')}`,
        description: localizedArticle.summary,
        image: localizedArticle.image,
        url: window.location.href
      });
    }
  }, [localizedArticle, language, t]);

  const localeDate = language === 'uk' ? 'uk-UA' : language === 'de' ? 'de-DE' : language === 'zh' ? 'zh-CN' : 'en-US';
  const tagsLabel = language === 'zh' ? '标签:' : language === 'de' ? 'Schlagwörter:' : language === 'en' ? 'Tags:' : 'Теги:';

  if (loading) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-stone-500 font-medium">{t('common.loading')}</p>
      </div>
    );
  }

  if (!article || !localizedArticle) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
          {t('notFound.title')}
        </h2>
        <Link to="/articles" className="text-brand-600 hover:underline">
          {t('articles.title')}
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8 pb-16 animate-fade-in pt-4">
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateArticleSchema(localizedArticle) }}
      />

      {/* Back button */}
      <div>
        <Link
          to="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')} ({t('nav.articles')})
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-bold">
            {localizedArticle.category}
          </span>
          <span className="text-xs text-stone-600 dark:text-stone-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            {localizedArticle.readTime} {t('common.min')}
          </span>
        </div>

        <h1 className="text-3xl sm:5xl font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
          {localizedArticle.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
          {localizedArticle.summary}
        </p>

        {/* Author bar */}
        <div className="flex items-center justify-between pt-4 pb-2 border-y border-stone-100 dark:border-stone-800 text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 flex items-center justify-center font-bold">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                {localizedArticle.author.name}
              </p>
              <p className="text-[11px] text-stone-400">
                {localizedArticle.author.role || t('articles.byAuthor')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(localizedArticle.createdAt).toLocaleDateString(localeDate)}
            </span>
            <button
              onClick={() => setIsShareOpen(true)}
              className="p-2 rounded-xl text-stone-500 hover:text-brand-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title={t('articles.shareArticle')}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
        <img
          src={localizedArticle.image}
          alt={localizedArticle.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Rich Content Render */}
      <div
        className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-base leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: localizedArticle.content }}
      />

      {/* Tags */}
      {localizedArticle.tags.length > 0 && (
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-400 mr-1">{tagsLabel}</span>
          {localizedArticle.tags.map(tag => (
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
      {localizedRelated.length > 0 && (
        <div className="space-y-4 pt-10 border-t border-stone-200 dark:border-stone-800">
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            {t('articles.relatedRecipes')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {localizedRelated.map(rec => (
              <RecipeCard key={rec.id} recipe={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={localizedArticle.title}
        description={localizedArticle.summary}
      />
    </article>
  );
};

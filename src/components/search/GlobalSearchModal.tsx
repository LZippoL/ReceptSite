import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, Flame, ChevronRight, Tag, Sparkles, History } from 'lucide-react';
import { Recipe } from '../../types';
import { recipeService } from '../../services/recipeService';
import { useLanguage } from '../../context/LanguageContext';
import { POPULAR_SEARCH_TAGS } from '../../i18n/tags';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose
}) => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { t, language, localizeRecipe } = useLanguage();

  const [recentQueries, setRecentQueries] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smakolyk_recent_searches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const popularTags = useMemo(() => {
    return POPULAR_SEARCH_TAGS[language] || POPULAR_SEARCH_TAGS.uk;
  }, [language]);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      recipeService.getAll().then(setRecipes);
      setTimeout(() => inputRef.current?.focus(), 100);

      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const localizedRecipes = useMemo(() => {
    return recipes.map(localizeRecipe);
  }, [recipes, localizeRecipe]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Autocomplete suggestions based on title, ingredients, tags
  const suggestions: string[] = [];
  if (trimmed.length >= 2) {
    localizedRecipes.forEach(r => {
      if (r.title.toLowerCase().includes(trimmed) && !suggestions.includes(r.title)) {
        suggestions.push(r.title);
      }
      r.ingredients.forEach(i => {
        if (i.name.toLowerCase().includes(trimmed) && !suggestions.includes(i.name)) {
          suggestions.push(i.name);
        }
      });
      r.tags.forEach(tag => {
        if (tag.toLowerCase().includes(trimmed) && !suggestions.includes(tag)) {
          suggestions.push(tag);
        }
      });
    });
  }

  // Filtered recipes
  const filteredRecipes = trimmed.length > 0
    ? localizedRecipes.filter((r, idx) => {
        const orig = recipes[idx];
        return (
          r.title.toLowerCase().includes(trimmed) ||
          r.description.toLowerCase().includes(trimmed) ||
          r.tags.some(t => t.toLowerCase().includes(trimmed)) ||
          (orig && orig.tags.some(t => t.toLowerCase().includes(trimmed))) ||
          r.author.name.toLowerCase().includes(trimmed) ||
          r.ingredients.some(i => i.name.toLowerCase().includes(trimmed)) ||
          (orig && orig.ingredients.some(i => i.name.toLowerCase().includes(trimmed)))
        );
      }).slice(0, 8)
    : [];

  const handleSelectRecipe = (slug: string) => {
    saveRecentSearch(query);
    onClose();
    navigate(`/recipes/${slug}`);
  };

  const saveRecentSearch = (term: string) => {
    const clean = term.trim();
    if (clean.length > 1) {
      const next = [clean, ...recentQueries.filter(q => q !== clean)].slice(0, 6);
      setRecentQueries(next);
      localStorage.setItem('smakolyk_recent_searches', JSON.stringify(next));
    }
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const suggestionsLabel = language === 'zh' ? '搜索建议' : language === 'de' ? 'Vorschläge' : language === 'en' ? 'Suggestions' : 'Підказки';
  const foundLabel = language === 'zh' ? '搜索结果' : language === 'de' ? 'Gefundene Rezepte' : language === 'en' ? 'Found Recipes' : 'Знайдені рецепти';
  const popularTagsLabel = language === 'zh' ? '热门标签与推荐' : language === 'de' ? 'Beliebte Tags' : language === 'en' ? 'Popular Tags' : 'Популярні теги';
  const recentSearchesLabel = language === 'zh' ? '最近搜索' : language === 'de' ? 'Kürzliche Suchen' : language === 'en' ? 'Recent Searches' : 'Недавні пошуки';
  const noFoundTitle = language === 'zh' ? `未找到与 “${query}” 相关的食谱` : language === 'de' ? `Keine Rezepte gefunden für "${query}"` : language === 'en' ? `No recipes found for "${query}"` : `Нічого не знайдено за запитом "${query}"`;
  const noFoundDesc = language === 'zh' ? '尝试搜索其他关键词或使用冰箱食材查找' : language === 'de' ? 'Versuchen Sie einen anderen Begriff oder durchsuchen Sie Ihren Kühlschrank' : language === 'en' ? 'Try a different term or search by ingredients in your fridge' : 'Спробуйте інше слово або скористайтеся пошуком за наявними продуктами у холодильнику';

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh] animate-scale-up">
        {/* Search input header */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-stone-100 dark:border-stone-800 gap-3">
          <Search className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.searchPlaceholder')}
            className="flex-1 bg-transparent text-base sm:text-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
          >
            Esc
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Autocomplete Chips */}
          {suggestions.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2.5">
                {suggestionsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 6).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 text-brand-800 dark:text-brand-200 text-xs font-medium border border-brand-200 dark:border-brand-800/60 transition-colors"
                  >
                    <Tag className="w-3 h-3 text-brand-500" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results list */}
          {trimmed.length > 0 ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                {foundLabel} ({filteredRecipes.length})
              </p>

              {filteredRecipes.length > 0 ? (
                <div className="space-y-2">
                  {filteredRecipes.map(recipe => (
                    <div
                      key={recipe.id}
                      onClick={() => handleSelectRecipe(recipe.slug)}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800/80 cursor-pointer transition-colors group"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                          {recipe.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {recipe.totalTime} {t('common.min')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-brand-500" />
                            {recipe.calories} {t('common.cal')}
                          </span>
                          <span className="text-amber-500 font-semibold">
                            ★ {recipe.rating}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-stone-400 group-hover:translate-x-1 group-hover:text-brand-600 transition-all" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                    {noFoundTitle}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    {noFoundDesc}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Popular tags & Recent searches when empty query */
            <div className="space-y-5">
              {/* Multilingual Popular Tags */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {popularTagsLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tagObj) => (
                    <button
                      key={tagObj.raw}
                      onClick={() => handleSuggestionClick(tagObj.raw)}
                      className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-900/50 text-brand-800 dark:text-brand-200 text-xs font-medium border border-brand-200/80 dark:border-brand-800/50 transition-colors flex items-center gap-1.5"
                    >
                      {tagObj.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent searches if user searched anything */}
              {recentQueries.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-stone-400" />
                      {recentSearchesLabel}
                    </p>
                    <button
                      onClick={() => {
                        setRecentQueries([]);
                        localStorage.removeItem('smakolyk_recent_searches');
                      }}
                      className="text-[11px] text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                    >
                      {t('common.clear')}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentQueries.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

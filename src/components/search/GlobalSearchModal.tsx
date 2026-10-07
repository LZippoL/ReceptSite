import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, Flame, ChevronRight, Tag } from 'lucide-react';
import { Recipe } from '../../types';
import { recipeService } from '../../services/recipeService';

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
  const [recentQueries, setRecentQueries] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smakolyk_recent_searches');
      return saved ? JSON.parse(saved) : ['борщ', 'сирники', 'паста', 'курка'];
    } catch {
      return ['борщ', 'сирники'];
    }
  });

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      recipeService.getAll().then(setRecipes);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger search modal from shortcut
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Autocomplete suggestions based on title, ingredients, tags
  const suggestions: string[] = [];
  if (trimmed.length >= 2) {
    recipes.forEach(r => {
      if (r.title.toLowerCase().includes(trimmed) && !suggestions.includes(r.title)) {
        suggestions.push(r.title);
      }
      r.ingredients.forEach(i => {
        if (i.name.toLowerCase().includes(trimmed) && !suggestions.includes(i.name)) {
          suggestions.push(i.name);
        }
      });
      r.tags.forEach(t => {
        if (t.toLowerCase().includes(trimmed) && !suggestions.includes(t)) {
          suggestions.push(t);
        }
      });
    });
  }

  // Filtered recipes
  const filteredRecipes = trimmed.length > 0
    ? recipes.filter(r => {
        return (
          r.title.toLowerCase().includes(trimmed) ||
          r.description.toLowerCase().includes(trimmed) ||
          r.tags.some(t => t.toLowerCase().includes(trimmed)) ||
          r.author.name.toLowerCase().includes(trimmed) ||
          r.ingredients.some(i => i.name.toLowerCase().includes(trimmed))
        );
      }).slice(0, 8)
    : [];

  const handleSelectRecipe = (slug: string) => {
    saveRecentSearch(query);
    onClose();
    navigate(`/recipes/${slug}`);
  };

  const saveRecentSearch = (term: string) => {
    const t = term.trim();
    if (t.length > 1) {
      const next = [t, ...recentQueries.filter(q => q !== t)].slice(0, 6);
      setRecentQueries(next);
      localStorage.setItem('smakolyk_recent_searches', JSON.stringify(next));
    }
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
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
            placeholder="Що ви хочете приготувати? (страва, продукт, автор...)"
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
                Підказки
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
                Знайдені рецепти ({filteredRecipes.length})
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
                            {recipe.totalTime} хв
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-brand-500" />
                            {recipe.calories} ккал
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
                    Нічого не знайдено за запитом "{query}"
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Спробуйте інше слово або скористайтеся пошуком за наявними продуктами у холодильнику
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Recent searches when empty query */
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                Популярні запити
              </p>
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
      </div>
    </div>
  );
};

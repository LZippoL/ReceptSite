import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Plus, X, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../i18n/types';
import { cn } from '../../utils/cn';

interface IngredientChipInputProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
  availableSuggestions: string[];
}

const LOCALIZED_PRESETS: Record<Language, string[]> = {
  uk: [
    'Яйця', 'Картопля', 'Цибуля', 'Куряче філе', 'Сир', 
    'Помідори', 'Молоко', 'Вершкове масло', 'Борошно', 'Часник', 'Морква'
  ],
  en: [
    'Eggs', 'Potatoes', 'Onion', 'Chicken', 'Cheese', 
    'Tomatoes', 'Milk', 'Butter', 'Flour', 'Garlic', 'Carrots'
  ],
  de: [
    'Eier', 'Kartoffeln', 'Zwiebeln', 'Hähnchen', 'Käse', 
    'Tomaten', 'Milch', 'Butter', 'Mehl', 'Knoblauch', 'Karotten'
  ],
  zh: [
    '鸡蛋', '土豆', '洋葱', '鸡肉', '奶酪', 
    '西红柿', '牛奶', '黄油', '面粉', '大蒜', '胡萝卜'
  ]
};

export const IngredientChipInput: React.FC<IngredientChipInputProps> = ({
  ingredients,
  onChange,
  availableSuggestions
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const presets = useMemo(() => {
    return LOCALIZED_PRESETS[language] || LOCALIZED_PRESETS.uk;
  }, [language]);

  // Filter autocomplete suggestions based on current input
  const query = inputValue.trim().toLowerCase();
  const suggestions = query.length >= 1
    ? availableSuggestions.filter(s =>
        s.toLowerCase().includes(query) &&
        !ingredients.some(existing => existing.toLowerCase() === s.toLowerCase())
      ).slice(0, 8)
    : [];

  const addIngredient = (name: string) => {
    const clean = name.trim();
    if (clean && !ingredients.some(i => i.toLowerCase() === clean.toLowerCase())) {
      onChange([...ingredients, clean]);
    }
    setInputValue('');
  };

  const removeIngredient = (indexToRemove: number) => {
    onChange(ingredients.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (suggestions.length > 0) {
        addIngredient(suggestions[0]);
      } else if (inputValue.trim()) {
        addIngredient(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && ingredients.length > 0) {
      removeIngredient(ingredients.length - 1);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="w-full space-y-3">
      {/* Input container with chips */}
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          'min-h-[60px] p-2.5 sm:p-3 bg-white dark:bg-stone-900 border-2 rounded-3xl transition-all cursor-text flex flex-wrap items-center gap-2 relative shadow-sm',
          isFocused
            ? 'border-brand-500 ring-4 ring-brand-500/10 dark:ring-brand-500/20'
            : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
        )}
      >
        {/* Render chips */}
        {ingredients.map((ing, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-2xl bg-gradient-to-r from-brand-500 to-amber-500 text-white text-xs sm:text-sm font-semibold shadow-sm animate-scale-up select-none"
          >
            <span>{ing}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeIngredient(idx);
              }}
              className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
              aria-label={`Remove ${ing}`}
            >
              <X className="w-3 h-3 stroke-[3]" />
            </button>
          </span>
        ))}

        {/* Text input */}
        <div className="flex-1 min-w-[140px] relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder={ingredients.length === 0 ? t('fridge.inputPlaceholder') : "..."}
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none p-1"
          />
        </div>

        {/* Clear all button if any */}
        {ingredients.length > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange([]);
            }}
            className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 font-semibold px-2 py-1"
          >
            {t('fridge.clearAll')}
          </button>
        )}

        {/* Autocomplete dropdown */}
        {isFocused && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl z-30 overflow-hidden divide-y divide-stone-100 dark:divide-stone-800 max-h-60 overflow-y-auto animate-slide-up">
            <div className="p-2 text-[11px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50 dark:bg-stone-950/40">
              {t('common.search')}
            </div>
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => addIngredient(s)}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-brand-50 dark:hover:bg-brand-950/50 hover:text-brand-600 flex items-center justify-between transition-colors"
              >
                <span>{s}</span>
                <Plus className="w-4 h-4 text-brand-500" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Popular pantry presets */}
      <div>
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          {t('fridge.popularTitle')}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => {
            const isAlreadyAdded = ingredients.some(i => i.toLowerCase() === preset.toLowerCase());
            return (
              <button
                key={preset}
                type="button"
                onClick={() => isAlreadyAdded ? onChange(ingredients.filter(i => i.toLowerCase() !== preset.toLowerCase())) : addIngredient(preset)}
                className={cn(
                  'text-xs font-medium px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1',
                  isAlreadyAdded
                    ? 'bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border-brand-300 dark:border-brand-700'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-brand-300'
                )}
              >
                {isAlreadyAdded ? <Check className="w-3 h-3 text-brand-600" /> : <Plus className="w-3 h-3 text-stone-400" />}
                {preset}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Minus, Plus, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ServingsCalculatorProps {
  servings: number;
  baseServings: number;
  onChange: (newServings: number) => void;
}

export const ServingsCalculator: React.FC<ServingsCalculatorProps> = ({
  servings,
  baseServings,
  onChange
}) => {
  const { t } = useLanguage();

  const decrease = () => {
    if (servings > 1) onChange(servings - 1);
  };

  const increase = () => {
    if (servings < 24) onChange(servings + 1);
  };

  const isModified = servings !== baseServings;

  return (
    <div className="flex items-center justify-between gap-3 bg-stone-100 dark:bg-stone-800/80 p-2.5 px-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-brand-600 dark:text-brand-400" />
        <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100">
          {t('common.servings')}:
        </span>
        {isModified && (
          <span className="text-[11px] text-stone-500 hidden sm:inline">
            ({baseServings})
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrease}
          disabled={servings <= 1}
          className="w-8 h-8 rounded-xl bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 flex items-center justify-center font-bold text-sm shadow-sm disabled:opacity-40 disabled:pointer-events-none hover:bg-stone-50 active:scale-95 transition-all"
          aria-label="Decrease servings"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="w-8 text-center text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
          {servings}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={servings >= 24}
          className="w-8 h-8 rounded-xl bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 flex items-center justify-center font-bold text-sm shadow-sm disabled:opacity-40 disabled:pointer-events-none hover:bg-stone-50 active:scale-95 transition-all"
          aria-label="Increase servings"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../i18n/types';
import { cn } from '../../utils/cn';

interface LanguageSelectorProps {
  variant?: 'header' | 'inline' | 'compact';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'header',
  className 
}) => {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'inline') {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-2", className)}>
        {languages.map((item) => {
          const isSelected = item.code === language;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelect(item.code)}
              className={cn(
                "flex items-center gap-2.5 p-3 rounded-2xl border text-sm font-semibold transition-all text-left",
                isSelected
                  ? "bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/25 ring-2 ring-brand-400/40"
                  : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-stone-50 dark:hover:bg-stone-800"
              )}
            >
              <span className="text-xl leading-none">{item.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="truncate leading-tight">{item.nativeName}</div>
                <div className={cn("text-[10px] uppercase font-bold tracking-wider", isSelected ? "text-brand-100" : "text-stone-600 dark:text-stone-300")}>
                  {item.code}
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4 shrink-0" />}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 h-10 px-2.5 sm:px-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all select-none",
          isOpen
            ? "bg-stone-200 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
            : "bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/80 dark:hover:bg-stone-800 border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300"
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Змінити мову / Change language"
        aria-label="Вибір мови / Language selection"
      >
        <span className="text-base leading-none">{currentOption.flag}</span>
        <span className="hidden sm:inline uppercase font-bold text-xs tracking-wider">
          {currentOption.code}
        </span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-stone-500 dark:text-stone-300 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 sm:w-52 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-200 dark:border-stone-800 shadow-xl shadow-stone-900/10 dark:shadow-black/40 py-1.5 z-50 animate-scale-up origin-top-right focus:outline-none"
          role="listbox"
        >
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-stone-600 dark:text-stone-300 border-b border-stone-100 dark:border-stone-800/80 flex items-center gap-1.5">
            <Globe className="w-3 h-3" />
            <span>Select Language / Мова</span>
          </div>

          <div className="py-1">
            {languages.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-medium transition-colors text-left",
                    isSelected
                      ? "bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white"
                  )}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{item.flag}</span>
                    <div>
                      <div className="leading-tight">{item.nativeName}</div>
                      <div className="text-[10px] text-stone-600 dark:text-stone-300 font-normal">
                        {item.name}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-brand-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

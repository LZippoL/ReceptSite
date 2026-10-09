import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { Language, SUPPORTED_LANGUAGES, LanguageOption } from '../i18n/types';
import { getTranslation, translations, loadLanguage } from '../i18n';
import { Recipe, Article } from '../types';
import type { getLocalizedRecipe } from '../i18n/recipeTranslations';
import { getLocalizedArticle } from '../i18n/articleTranslations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: LanguageOption[];
  t: (path: string, params?: Record<string, string | number>) => string;
  getCategoryName: (categoryId: string) => string;
  getCategoryDesc: (categoryId: string) => string;
  getCuisineName: (cuisineId: string) => string;
  localizeRecipe: (recipe: Recipe) => Recipe;
  localizeArticle: (article: Article) => Article;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'smakolyk_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({ children, initialLanguage }) => {
  const [recipeLocalizer, setRecipeLocalizer] = useState<typeof getLocalizedRecipe | null>(null);
  const languageRequest = useRef(0);
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLanguage) return initialLanguage;
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && (saved === 'uk' || saved === 'en' || saved === 'de' || saved === 'zh')) {
        return saved;
      }
      // Check browser language
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (browserLang === 'en') return 'en';
      if (browserLang === 'de') return 'de';
      if (browserLang === 'zh') return 'zh';
      return 'uk';
    } catch {
      return 'uk';
    }
  });

  const setLanguage = async (lang: Language) => {
    const request = ++languageRequest.current;
    try { await loadLanguage(lang); }
    catch (error) { console.warn('Interface language could not be loaded:', error); return; }
    if (request !== languageRequest.current) return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (language === 'uk' || recipeLocalizer) return;
    let active = true;
    import('../i18n/recipeTranslations')
      .then(module => {
        if (active) setRecipeLocalizer(() => module.getLocalizedRecipe);
      })
      .catch(error => console.warn('Recipe translations could not be loaded:', error));
    return () => { active = false; };
  }, [language, recipeLocalizer]);

  const t = useMemo(() => {
    return (path: string, params?: Record<string, string | number>) => {
      return getTranslation(language, path, params);
    };
  }, [language]);

  const getCategoryName = useMemo(() => {
    return (categoryId: string) => {
      const dict = translations[language]?.categoriesList || translations.uk.categoriesList;
      return dict[categoryId]?.name || categoryId;
    };
  }, [language]);

  const getCategoryDesc = useMemo(() => {
    return (categoryId: string) => {
      const dict = translations[language]?.categoriesList || translations.uk.categoriesList;
      return dict[categoryId]?.description || '';
    };
  }, [language]);

  const getCuisineName = useMemo(() => {
    return (cuisineId: string) => {
      const dict = translations[language]?.cuisinesList || translations.uk.cuisinesList;
      return dict[cuisineId] || cuisineId;
    };
  }, [language]);

  const localizeRecipeFn = useMemo(() => {
    return (recipe: Recipe) => recipeLocalizer ? recipeLocalizer(recipe, language) : recipe;
  }, [language, recipeLocalizer]);

  const localizeArticleFn = useMemo(() => {
    return (article: Article) => getLocalizedArticle(article, language);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        t,
        getCategoryName,
        getCategoryDesc,
        getCuisineName,
        localizeRecipe: localizeRecipeFn,
        localizeArticle: localizeArticleFn
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

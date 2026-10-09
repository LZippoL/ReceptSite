import { Language, TranslationSchema } from './types';
import { uk } from './locales/uk';

export * from './types';

export const translations: { uk: TranslationSchema } & Partial<Record<Language, TranslationSchema>> = { uk };
const loaders = {
  en: () => import('./locales/en').then(m => m.en),
  de: () => import('./locales/de').then(m => m.de),
  zh: () => import('./locales/zh').then(m => m.zh)
};
const pending: Partial<Record<Language, Promise<void>>> = {};
export async function loadLanguage(language: Language): Promise<void> {
  if (language === 'uk' || translations[language]) return;
  await (pending[language] ||= loaders[language]().then(dict => { translations[language] = dict; }).catch(error => {
    delete pending[language];
    throw error;
  }));
}

/**
 * Access a nested translation value by dot path, e.g. "hero.titleLine1"
 */
export function getTranslation(lang: Language, path: string, params?: Record<string, string | number>): string {
  const dict = translations[lang] || translations.uk;
  const keys = path.split('.');
  let current: any = dict;

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // Fallback to Ukrainian if missing
      let fallback: any = translations.uk;
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return path;
        }
      }
      current = fallback;
      break;
    }
  }

  if (typeof current !== 'string') {
    return path;
  }

  let text = current;
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      text = text.replace(new RegExp(`{${key}}`, 'g'), String(val));
    }
  }
  return text;
}

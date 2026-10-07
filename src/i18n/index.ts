import { Language, TranslationSchema } from './types';
import { uk } from './locales/uk';
import { en } from './locales/en';
import { de } from './locales/de';
import { zh } from './locales/zh';

export * from './types';

export const translations: Record<Language, TranslationSchema> = {
  uk,
  en,
  de,
  zh
};

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

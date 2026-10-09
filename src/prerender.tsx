import { renderToString } from 'react-dom/server';
import App from './App';
import { AppProviders } from './AppProviders';
import type { Language } from './i18n/types';
import { loadLanguage } from './i18n';

export async function renderHome(language: Language) {
  await loadLanguage(language);
  return renderToString(<AppProviders initialLanguage={language}><App /></AppProviders>);
}

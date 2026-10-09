import { renderToString } from 'react-dom/server';
import App from './App';
import { AppProviders } from './AppProviders';
import type { Language } from './i18n/types';

export function renderHome(language: Language) {
  return renderToString(<AppProviders initialLanguage={language}><App /></AppProviders>);
}

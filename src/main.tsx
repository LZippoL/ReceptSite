import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { AppProviders } from './AppProviders';
import type { Language } from './i18n/types';
import { loadLanguage } from './i18n';

const root = document.getElementById('root') as HTMLElement;
const prerendered = root.dataset.prerendered === 'true';
let initialLanguage: Language = prerendered ? document.documentElement.lang as Language : 'uk';
if (!prerendered) {
  try {
    const saved = localStorage.getItem('smakolyk_language');
    const selected = saved && ['uk', 'en', 'de', 'zh'].includes(saved) ? saved : navigator.language.slice(0, 2).toLowerCase();
    if (['uk', 'en', 'de', 'zh'].includes(selected)) initialLanguage = selected as Language;
  } catch { /* Use Ukrainian when browser storage is unavailable. */ }
}
async function startApp() {
  let hydrate = prerendered;
  try { await loadLanguage(initialLanguage); }
  catch (error) {
    console.warn('Interface language could not be loaded:', error);
    initialLanguage = 'uk';
    hydrate = false;
  }
  const app = <React.StrictMode><AppProviders initialLanguage={initialLanguage}><App /></AppProviders></React.StrictMode>;

  if (hydrate) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
void startApp();

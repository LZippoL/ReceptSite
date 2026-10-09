import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { AppProviders } from './AppProviders';
import type { Language } from './i18n/types';

const root = document.getElementById('root') as HTMLElement;
const prerendered = root.dataset.prerendered === 'true';
const initialLanguage = prerendered ? document.documentElement.lang as Language : undefined;
const app = <React.StrictMode><AppProviders initialLanguage={initialLanguage}><App /></AppProviders></React.StrictMode>;

if (prerendered) hydrateRoot(root, app);
else createRoot(root).render(app);

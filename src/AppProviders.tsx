import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import type { Language } from './i18n/types';

export function AppProviders({ children, initialLanguage }: { children: React.ReactNode; initialLanguage?: Language }) {
  return (
    <ThemeProvider>
      <LanguageProvider initialLanguage={initialLanguage}>
        <ToastProvider>
          <AuthProvider>
            <FavoritesProvider>
              <ShoppingListProvider>{children}</ShoppingListProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

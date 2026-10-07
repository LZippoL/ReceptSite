import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ShoppingListProvider } from './context/ShoppingListContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <ShoppingListProvider>
            <App />
          </ShoppingListProvider>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);

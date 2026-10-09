import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { RecipesPage } from './pages/RecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { FridgeSearchPage } from './pages/FridgeSearchPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ShoppingListPage } from './pages/ShoppingListPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SiteInfoPage } from './pages/SiteInfoPage';
import siteInfo from './data/siteInfo.json';

import { AuthModal } from './components/auth/AuthModal';
import { GuestSaveWarningModal } from './components/auth/GuestSaveWarningModal';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors font-sans overflow-x-hidden w-full max-w-full">
        {/* Sticky Header */}
        <Header onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Main Content Body */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full pt-2 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage onOpenSearch={() => setIsSearchOpen(true)} />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
            <Route path="/what-to-cook" element={<FridgeSearchPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/shopping-list" element={<ShoppingListPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {siteInfo.pages.map(page => <Route key={page.slug} path={`/${page.slug}`} element={<SiteInfoPage slug={page.slug} />} />)}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Fixed Bottom Navigation */}
        <MobileBottomNav onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Global Instant Search Modal */}
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        {/* Authentication Modal */}
        <AuthModal />

        {/* Guest Save Warning Modal */}
        <GuestSaveWarningModal />
      </div>
    </BrowserRouter>
  );
}

export default App;

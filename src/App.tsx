import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { useAuth } from './context/AuthContext';
const GlobalSearchModal = lazy(() => import('./components/search/GlobalSearchModal').then(m => ({ default: m.GlobalSearchModal })));

// Pages
import { HomePage } from './pages/HomePage';
const RecipesPage = lazy(() => import('./pages/RecipesPage').then(m => ({ default: m.RecipesPage })));
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage').then(m => ({ default: m.RecipeDetailPage })));
const FridgeSearchPage = lazy(() => import('./pages/FridgeSearchPage').then(m => ({ default: m.FridgeSearchPage })));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage').then(m => ({ default: m.FavoritesPage })));
const ShoppingListPage = lazy(() => import('./pages/ShoppingListPage').then(m => ({ default: m.ShoppingListPage })));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage').then(m => ({ default: m.ArticlesPage })));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage').then(m => ({ default: m.ArticleDetailPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const SiteInfoPage = lazy(() => import('./pages/SiteInfoPage').then(m => ({ default: m.SiteInfoPage })));
import siteInfo from './data/siteInfo.json';

const AuthModal = lazy(() => import('./components/auth/AuthModal').then(m => ({ default: m.AuthModal })));
const GuestSaveWarningModal = lazy(() => import('./components/auth/GuestSaveWarningModal').then(m => ({ default: m.GuestSaveWarningModal })));

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
  const { isAuthModalOpen, isGuestWarningOpen } = useAuth();
  React.useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(open => !open);
      }
    };
    window.addEventListener('keydown', openSearch);
    return () => window.removeEventListener('keydown', openSearch);
  }, []);
  const Router = import.meta.env.SSR ? MemoryRouter : BrowserRouter;

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors font-sans overflow-x-hidden w-full max-w-full">
        {/* Sticky Header */}
        <Header onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Main Content Body */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full pt-2 overflow-x-hidden">
          <Suspense fallback={<div className="min-h-[60vh] animate-pulse rounded-3xl bg-stone-100 dark:bg-stone-900" role="status" aria-label="Loading" />}>
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
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Fixed Bottom Navigation */}
        <MobileBottomNav onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Global Instant Search Modal */}
        <Suspense fallback={null}>
        {isSearchOpen && <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />}

        {/* Authentication Modal */}
        {isAuthModalOpen && <AuthModal />}

        {/* Guest Save Warning Modal */}
        {isGuestWarningOpen && <GuestSaveWarningModal />}
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

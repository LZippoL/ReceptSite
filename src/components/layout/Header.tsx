import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Settings, 
  Menu, 
  X,
  BookOpen,
  UtensilsCrossed,
  ChefHat
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { useFavorites } from '../../context/FavoritesContext';
import { useShoppingList } from '../../context/ShoppingListContext';
import { cn } from '../../utils/cn';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const { favorites } = useFavorites();
  const { uncompletedCount } = useShoppingList();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: '/recipes', label: 'Рецепти', icon: UtensilsCrossed },
    { to: '/categories', label: 'Категорії', icon: BookOpen },
    { 
      to: '/what-to-cook', 
      label: 'Що приготувати?', 
      icon: Sparkles,
      highlight: true 
    },
    { to: '/articles', label: 'Статті', icon: BookOpen },
    { to: '/favorites', label: 'Улюблене', icon: Heart, count: favorites.length },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/70 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group select-none shrink-0"
          aria-label="Смаколик - Головна сторінка"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <ChefHat className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-amber-600 to-brand-700 dark:from-brand-400 dark:to-amber-400 bg-clip-text text-transparent">
              Смаколик
            </span>
            <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 -mt-1">
              Рецепти щодня
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all relative flex items-center gap-1.5',
                  link.highlight
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/60 border border-brand-200 dark:border-brand-800/50'
                    : active
                    ? 'bg-stone-200/70 dark:bg-stone-800 text-brand-600 dark:text-brand-400'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60'
                )}
              >
                {link.highlight && <Sparkles className="w-4 h-4 text-brand-500 animate-pulse" />}
                {link.label}
                {link.count !== undefined && link.count > 0 && (
                  <span className="ml-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-500 text-white leading-none">
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action icons right */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Global search trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-2xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-medium transition-all group"
            aria-label="Пошук рецептів"
          >
            <Search className="w-4 h-4 text-stone-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
            <span className="hidden md:inline">Пошук...</span>
            <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-stone-200 dark:bg-stone-800 text-stone-500 rounded border border-stone-300 dark:border-stone-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Shopping list button */}
          <Link
            to="/shopping-list"
            className="relative p-2.5 rounded-2xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-brand-600 transition-colors"
            title="Список покупок"
            aria-label="Список покупок"
          >
            <ShoppingBag className="w-5 h-5" />
            {uncompletedCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-scale-up">
                {uncompletedCount > 9 ? '9+' : uncompletedCount}
              </span>
            )}
          </Link>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Admin link */}
          <Link
            to="/admin"
            className="hidden sm:flex p-2.5 rounded-2xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-brand-600 transition-colors"
            title="Панель автора / редактора"
            aria-label="Редактор контенту"
          >
            <Settings className="w-5 h-5" />
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Меню сайту"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu for extra links */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50/98 dark:bg-stone-950/98 border-b border-stone-200 dark:border-stone-800 p-4 animate-slide-up">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-colors',
                    active
                      ? 'bg-brand-500 text-white'
                      : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </div>
                  {link.count !== undefined && link.count > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-800 dark:text-brand-200">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="border-t border-stone-200 dark:border-stone-800 my-2 pt-2 flex flex-col gap-1.5">
              <Link
                to="/shopping-list"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Список покупок</span>
                {uncompletedCount > 0 && (
                  <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-brand-500 text-white">
                    {uncompletedCount}
                  </span>
                )}
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900"
              >
                <Settings className="w-5 h-5" />
                <span>Панель автора (CMS)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

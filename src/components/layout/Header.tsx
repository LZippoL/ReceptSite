import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Menu, 
  X,
  BookOpen,
  UtensilsCrossed,
  User,
  LogIn
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSelector } from '../common/LanguageSelector';
import { useFavorites } from '../../context/FavoritesContext';
import { useShoppingList } from '../../context/ShoppingListContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const { favorites } = useFavorites();
  const { uncompletedCount } = useShoppingList();
  const { t } = useLanguage();
  const { user, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: '/recipes', label: t('nav.recipes'), icon: UtensilsCrossed },
    { to: '/categories', label: t('nav.categories'), icon: BookOpen },
    { 
      to: '/what-to-cook', 
      label: t('nav.fridge'), 
      icon: Sparkles,
      highlight: true 
    },
    { to: '/articles', label: t('nav.articles'), icon: BookOpen },
    { to: '/favorites', label: t('nav.favorites'), icon: Heart, count: favorites.length },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/70 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 sm:gap-2.5 group select-none min-w-0 sm:shrink-0"
          aria-label="Кулінаріум - Головна сторінка"
        >
          <img
            src={`${import.meta.env.BASE_URL}icon-192.png`}
            alt=""
            width={44}
            height={44}
            className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-2xl shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform"
          />
          <div className="min-w-0">
            <span className="block truncate text-lg sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 via-amber-600 to-brand-700 dark:from-brand-400 dark:to-amber-400 bg-clip-text text-transparent">
              {t('common.siteName')}
            </span>
            <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 -mt-1">
              {t('common.siteTagline')}
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
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Global search trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 h-10 px-3 sm:px-4 rounded-2xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200/80 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-medium transition-all group"
            aria-label={t('common.search')}
          >
            <Search className="w-4 h-4 text-stone-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
            <span className="hidden md:inline">{t('common.search')}...</span>
            <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-stone-200 dark:bg-stone-800 text-stone-500 rounded border border-stone-300 dark:border-stone-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Shopping list button */}
          <Link
            to="/shopping-list"
            className="hidden sm:block relative p-2.5 rounded-2xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-brand-600 transition-colors"
            title={t('nav.shoppingList')}
            aria-label={t('nav.shoppingList')}
          >
            <ShoppingBag className="w-5 h-5" />
            {uncompletedCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-scale-up">
                {uncompletedCount > 9 ? '9+' : uncompletedCount}
              </span>
            )}
          </Link>

          {/* Language Selector Dropdown */}
          <LanguageSelector variant="header" className="hidden sm:block" />

          {/* Theme Switcher */}
          <div className="hidden sm:block"><ThemeToggle /></div>

          {/* User Profile / Login (Only show profile if logged in, otherwise show login button) */}
          {user ? (
            <Link
              to="/profile"
              className={cn(
                'flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-2xl border transition-all text-xs font-bold shrink-0',
                isActive('/profile')
                  ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-200 hover:border-brand-500/50'
              )}
              title={t('profile.title')}
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                {user.user_metadata?.full_name
                  ? user.user_metadata.full_name[0].toUpperCase()
                  : user.email
                  ? user.email[0].toUpperCase()
                  : 'U'}
              </div>
              <span className="hidden sm:inline max-w-[90px] truncate">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="flex items-center justify-center gap-1.5 h-11 w-11 sm:w-auto sm:px-3 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white text-xs sm:text-sm font-bold transition-all shadow-sm shadow-brand-500/20 shrink-0"
              aria-label="Увійти"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Увійти</span>
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center h-11 w-11 shrink-0 rounded-2xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Меню"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu for extra links */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50/98 dark:bg-stone-950/98 border-b border-stone-200 dark:border-stone-800 p-4 animate-slide-up space-y-3">
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
                <span>{t('nav.shoppingList')}</span>
                {uncompletedCount > 0 && (
                  <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-brand-500 text-white">
                    {uncompletedCount}
                  </span>
                )}
              </Link>

              {/* Conditional Profile or Login in Mobile Drawer */}
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60"
                >
                  <User className="w-5 h-5 text-brand-600" />
                  <div className="flex flex-col text-left">
                    <span>{t('profile.title')}</span>
                    <span className="text-[10px] text-stone-500 font-normal truncate max-w-[180px]">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl text-sm font-bold bg-brand-500 text-white shadow-md shadow-brand-500/20"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Увійти / Зареєструватися</span>
                </button>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <div className="sm:hidden flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-stone-600 dark:text-stone-300">Тема оформлення</span>
              <ThemeToggle />
            </div>
            <div className="text-xs font-semibold text-stone-500 mb-2">
              {t('profile.languageTitle')}
            </div>
            <LanguageSelector variant="inline" />
          </div>
        </div>
      )}
    </header>
  );
};

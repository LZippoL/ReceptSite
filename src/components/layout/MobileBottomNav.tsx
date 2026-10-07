import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Sparkles, Heart, User } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { cn } from '../../utils/cn';

interface MobileBottomNavProps {
  onOpenSearch: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const { favorites } = useFavorites();

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <nav className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {/* Головна */}
        <NavLink
          to="/"
          className={cn(
            'flex flex-col items-center justify-center flex-1 py-1 text-center select-none transition-colors relative min-h-[44px]',
            isCurrent('/') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-stone-500 dark:text-stone-400'
          )}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[11px] leading-tight">Головна</span>
          {isCurrent('/') && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-500" />
          )}
        </NavLink>

        {/* Пошук */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center flex-1 py-1 text-center select-none text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors min-h-[44px]"
        >
          <Search className="w-5 h-5 mb-1" />
          <span className="text-[11px] leading-tight">Пошук</span>
        </button>

        {/* Що приготувати (Prominent centerpiece button!) */}
        <NavLink
          to="/what-to-cook"
          className={cn(
            'flex flex-col items-center justify-center flex-1 py-1 text-center select-none transition-transform min-h-[44px]',
            isCurrent('/what-to-cook') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-stone-600 dark:text-stone-300'
          )}
        >
          <div className="w-10 h-10 -mt-5 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-[10px] leading-tight font-semibold mt-0.5">В холодильнику</span>
        </NavLink>

        {/* Улюблене */}
        <NavLink
          to="/favorites"
          className={cn(
            'flex flex-col items-center justify-center flex-1 py-1 text-center select-none transition-colors relative min-h-[44px]',
            isCurrent('/favorites') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-stone-500 dark:text-stone-400'
          )}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-1" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 text-[9px] font-bold px-1 py-0.2 bg-brand-500 text-white rounded-full">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-tight">Улюблене</span>
          {isCurrent('/favorites') && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-500" />
          )}
        </NavLink>

        {/* Профіль */}
        <NavLink
          to="/profile"
          className={cn(
            'flex flex-col items-center justify-center flex-1 py-1 text-center select-none transition-colors relative min-h-[44px]',
            isCurrent('/profile') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-stone-500 dark:text-stone-400'
          )}
        >
          <User className="w-5 h-5 mb-1" />
          <span className="text-[11px] leading-tight">Профіль</span>
          {isCurrent('/profile') && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-500" />
          )}
        </NavLink>
      </nav>
    </div>
  );
};

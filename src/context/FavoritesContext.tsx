import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserCollection } from '../types';
import { DEFAULT_STAPLES } from '../data/categories';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: string[]; // recipe IDs
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  collections: UserCollection[];
  createCollection: (name: string, description?: string, icon?: string) => UserCollection;
  deleteCollection: (id: string) => void;
  toggleRecipeInCollection: (collectionId: string, recipeId: string) => void;
  isRecipeInCollection: (collectionId: string, recipeId: string) => boolean;
  recentlyViewed: string[]; // recipe IDs
  recordRecipeView: (recipeId: string) => void;
  userStaples: string[];
  setUserStaples: (staples: string[]) => void;
  addStaple: (staple: string) => void;
  removeStaple: (staple: string) => void;
}

const DEFAULT_COLLECTIONS: UserCollection[] = [
  { id: 'col-fav', name: 'Улюблене', description: 'Найкращі перевірені рецепти', icon: '❤️', recipeIds: [], createdAt: '2024-01-01' }
];

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isGuest, openGuestWarning } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collections, setCollections] = useState<UserCollection[]>(DEFAULT_COLLECTIONS);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [userStaples, setUserStaplesState] = useState<string[]>(DEFAULT_STAPLES);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    const restore = <T,>(key: string, fallback: T): T => {
      try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
      } catch { return fallback; }
    };
    setFavorites(restore('smakolyk_favorites', []));
    setCollections(restore('smakolyk_collections', DEFAULT_COLLECTIONS));
    setRecentlyViewed(restore('smakolyk_history', []));
    setUserStaplesState(restore('smakolyk_staples', DEFAULT_STAPLES));
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    localStorage.setItem('smakolyk_favorites', JSON.stringify(favorites));
  }, [favorites, preferencesLoaded]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    localStorage.setItem('smakolyk_collections', JSON.stringify(collections));
  }, [collections, preferencesLoaded]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    localStorage.setItem('smakolyk_history', JSON.stringify(recentlyViewed));
  }, [recentlyViewed, preferencesLoaded]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    localStorage.setItem('smakolyk_staples', JSON.stringify(userStaples));
  }, [userStaples, preferencesLoaded]);

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(recipeId);
      const next = exists ? prev.filter(id => id !== recipeId) : [...prev, recipeId];
      
      // If adding recipe as guest, show the warning about cache loss
      if (!exists && isGuest && sessionStorage.getItem('smakolyk_guest_warning_dismissed') !== 'true') {
        openGuestWarning();
      }

      // Also sync with the 'Улюблене' collection
      setCollections(curr => curr.map(col => {
        if (col.id === 'col-fav') {
          return {
            ...col,
            recipeIds: exists ? col.recipeIds.filter(id => id !== recipeId) : [...col.recipeIds, recipeId]
          };
        }
        return col;
      }));

      return next;
    });
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  const createCollection = (name: string, description?: string, icon?: string): UserCollection => {
    const newCol: UserCollection = {
      id: `col-${Date.now()}`,
      name,
      description,
      icon: icon || '📁',
      recipeIds: [],
      createdAt: new Date().toISOString()
    };
    setCollections(prev => [...prev, newCol]);
    return newCol;
  };

  const deleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  const toggleRecipeInCollection = (collectionId: string, recipeId: string) => {
    setCollections(prev => prev.map(c => {
      if (c.id !== collectionId) return c;
      const exists = c.recipeIds.includes(recipeId);
      return {
        ...c,
        recipeIds: exists ? c.recipeIds.filter(id => id !== recipeId) : [...c.recipeIds, recipeId]
      };
    }));
  };

  const isRecipeInCollection = (collectionId: string, recipeId: string): boolean => {
    const col = collections.find(c => c.id === collectionId);
    return col ? col.recipeIds.includes(recipeId) : false;
  };

  const recordRecipeView = (recipeId: string) => {
    setRecentlyViewed(prev => [recipeId, ...prev.filter(id => id !== recipeId)].slice(0, 20));
  };

  const setUserStaples = (staples: string[]) => {
    setUserStaplesState(staples);
  };

  const addStaple = (staple: string) => {
    const term = staple.trim().toLowerCase();
    if (term && !userStaples.includes(term)) {
      setUserStaplesState(prev => [...prev, term]);
    }
  };

  const removeStaple = (staple: string) => {
    setUserStaplesState(prev => prev.filter(s => s !== staple));
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      collections,
      createCollection,
      deleteCollection,
      toggleRecipeInCollection,
      isRecipeInCollection,
      recentlyViewed,
      recordRecipeView,
      userStaples,
      setUserStaples,
      addStaple,
      removeStaple
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};

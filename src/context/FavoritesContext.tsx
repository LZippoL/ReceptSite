import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserCollection } from '../types';
import { DEFAULT_STAPLES } from '../data/categories';

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
  { id: 'col-fav', name: 'Улюблене', description: 'Найкращі перевірені рецепти', icon: '❤️', recipeIds: [], createdAt: '2024-01-01' },
  { id: 'col-breakfast', name: 'Сніданки', description: 'Ідеї на добрий ранок', icon: '🍳', recipeIds: ['rec-2', 'rec-10', 'rec-12'], createdAt: '2024-01-01' },
  { id: 'col-holiday', name: 'На свята', description: 'Святковий стіл та гості', icon: '🎉', recipeIds: ['rec-9', 'rec-34'], createdAt: '2024-01-01' },
  { id: 'col-try', name: 'Спробувати', description: 'Страви в черзі на приготування', icon: '📌', recipeIds: ['rec-6', 'rec-33'], createdAt: '2024-01-01' },
  { id: 'col-quick-dinner', name: 'Швидка вечеря', description: 'Вечеря за 20-30 хвилин', icon: '⚡', recipeIds: ['rec-6', 'rec-41'], createdAt: '2024-01-01' }
];

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smakolyk_favorites');
      return saved ? JSON.parse(saved) : ['rec-1', 'rec-2', 'rec-6', 'rec-22'];
    } catch {
      return ['rec-1', 'rec-2', 'rec-6', 'rec-22'];
    }
  });

  const [collections, setCollections] = useState<UserCollection[]>(() => {
    try {
      const saved = localStorage.getItem('smakolyk_collections');
      return saved ? JSON.parse(saved) : DEFAULT_COLLECTIONS;
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smakolyk_history');
      return saved ? JSON.parse(saved) : ['rec-1', 'rec-2', 'rec-6'];
    } catch {
      return ['rec-1', 'rec-2', 'rec-6'];
    }
  });

  const [userStaples, setUserStaplesState] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smakolyk_staples');
      return saved ? JSON.parse(saved) : DEFAULT_STAPLES;
    } catch {
      return DEFAULT_STAPLES;
    }
  });

  useEffect(() => {
    localStorage.setItem('smakolyk_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('smakolyk_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('smakolyk_history', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('smakolyk_staples', JSON.stringify(userStaples));
  }, [userStaples]);

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(recipeId);
      const next = exists ? prev.filter(id => id !== recipeId) : [...prev, recipeId];
      
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

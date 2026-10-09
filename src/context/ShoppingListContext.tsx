import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingListItem } from '../types';

interface AddItemParams {
  name: string;
  amount?: string;
  category?: string;
  recipeTitle?: string;
  recipeId?: string;
}

interface ShoppingListContextType {
  items: ShoppingListItem[];
  addItem: (item: AddItemParams) => void;
  addMultipleItems: (items: AddItemParams[]) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCompleted: () => void;
  clearAll: () => void;
  totalCount: number;
  uncompletedCount: number;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ShoppingListItem[]>(() => [
        { id: 'item-1', name: 'Кисломолочний сир 9%', amount: '500 г', completed: false, recipeTitle: 'Пишні сирники', createdAt: '2024-03-01' },
        { id: 'item-2', name: 'Ванільний цукор', amount: '1 пакетик', completed: true, recipeTitle: 'Пишні сирники', createdAt: '2024-03-01' },
        { id: 'item-3', name: 'Пармезан', amount: '100 г', completed: false, recipeTitle: 'Паста Карбонара', createdAt: '2024-03-02' }
  ]);

  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('smakolyk_shopping_list');
      if (saved) setItems(JSON.parse(saved));
    } catch { /* Keep the defaults if storage is unavailable. */ }
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    localStorage.setItem('smakolyk_shopping_list', JSON.stringify(items));
  }, [items, preferencesLoaded]);

  const addItem = (params: AddItemParams) => {
    const newItem: ShoppingListItem = {
      id: `shop-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: params.name.trim(),
      amount: params.amount || '',
      category: params.category || 'Різне',
      completed: false,
      recipeTitle: params.recipeTitle,
      recipeId: params.recipeId,
      createdAt: new Date().toISOString()
    };
    setItems(prev => [newItem, ...prev]);
  };

  const addMultipleItems = (newItems: AddItemParams[]) => {
    const created: ShoppingListItem[] = newItems.map(params => ({
      id: `shop-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: params.name.trim(),
      amount: params.amount || '',
      category: params.category || 'Різне',
      completed: false,
      recipeTitle: params.recipeTitle,
      recipeId: params.recipeId,
      createdAt: new Date().toISOString()
    }));
    setItems(prev => [...created, ...prev]);
  };

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setItems(prev => prev.filter(item => !item.completed));
  };

  const clearAll = () => {
    setItems([]);
  };

  const totalCount = items.length;
  const uncompletedCount = items.filter(i => !i.completed).length;

  return (
    <ShoppingListContext.Provider value={{
      items,
      addItem,
      addMultipleItems,
      toggleItem,
      removeItem,
      clearCompleted,
      clearAll,
      totalCount,
      uncompletedCount
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const ctx = useContext(ShoppingListContext);
  if (!ctx) throw new Error('useShoppingList must be used within ShoppingListProvider');
  return ctx;
};

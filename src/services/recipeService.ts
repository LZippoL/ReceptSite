import { Recipe } from '../types';
import { INITIAL_RECIPES } from '../data/recipes/initialRecipes';
import { storage } from './storageService';

const STORAGE_KEY = 'smakolyk_recipes_custom';
const DELETED_KEY = 'smakolyk_recipes_deleted';

export interface IRecipeService {
  getAll(): Promise<Recipe[]>;
  getBySlug(slug: string): Promise<Recipe | null>;
  getById(id: string): Promise<Recipe | null>;
  getFeatured(): Promise<Recipe[]>;
  getQuick20(): Promise<Recipe[]>;
  getTopRated(): Promise<Recipe[]>;
  getBudget(): Promise<Recipe[]>;
  create(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewsCount'>): Promise<Recipe>;
  update(id: string, updates: Partial<Recipe>): Promise<Recipe>;
  delete(id: string): Promise<boolean>;
  resetToDefault(): Promise<void>;
  exportAsJson(): Promise<string>;
  importFromJson(jsonStr: string): Promise<number>;
}

class RecipeService implements IRecipeService {
  async getAll(): Promise<Recipe[]> {
    const customRecipes = await storage.get<Recipe[]>(STORAGE_KEY, []);
    const deletedIds = await storage.get<string[]>(DELETED_KEY, []);

    // Filter out deleted initial recipes, then merge custom/modified ones
    const activeInitial = INITIAL_RECIPES.filter(r => !deletedIds.includes(r.id));
    
    // Map existing initial recipes if custom modified version exists
    const customMap = new Map(customRecipes.map(r => [r.id, r]));
    const result: Recipe[] = [];

    for (const r of activeInitial) {
      if (customMap.has(r.id)) {
        result.push(customMap.get(r.id)!);
        customMap.delete(r.id);
      } else {
        result.push(r);
      }
    }

    // Add remaining purely new custom recipes
    for (const custom of customMap.values()) {
      result.unshift(custom);
    }

    return result;
  }

  async getBySlug(slug: string): Promise<Recipe | null> {
    const all = await this.getAll();
    return all.find(r => r.slug === slug) || null;
  }

  async getById(id: string): Promise<Recipe | null> {
    const all = await this.getAll();
    return all.find(r => r.id === id) || null;
  }

  async getFeatured(): Promise<Recipe[]> {
    const all = await this.getAll();
    return all.filter(r => r.featured);
  }

  async getQuick20(): Promise<Recipe[]> {
    const all = await this.getAll();
    return all.filter(r => r.totalTime <= 20 || r.quick20);
  }

  async getTopRated(): Promise<Recipe[]> {
    const all = await this.getAll();
    return [...all].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }

  async getBudget(): Promise<Recipe[]> {
    const all = await this.getAll();
    return all.filter(r => r.budget);
  }

  async create(recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewsCount'>): Promise<Recipe> {
    const customRecipes = await storage.get<Recipe[]>(STORAGE_KEY, []);
    const now = new Date().toISOString();
    const newRecipe: Recipe = {
      ...recipeData,
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: now,
      updatedAt: now,
      rating: 5.0,
      reviewsCount: 0
    };

    customRecipes.unshift(newRecipe);
    await storage.set(STORAGE_KEY, customRecipes);
    return newRecipe;
  }

  async update(id: string, updates: Partial<Recipe>): Promise<Recipe> {
    const all = await this.getAll();
    const existing = all.find(r => r.id === id);
    if (!existing) {
      throw new Error(`Recipe with ID ${id} not found`);
    }

    const updatedRecipe: Recipe = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const customRecipes = await storage.get<Recipe[]>(STORAGE_KEY, []);
    const filtered = customRecipes.filter(r => r.id !== id);
    filtered.unshift(updatedRecipe);
    await storage.set(STORAGE_KEY, filtered);

    return updatedRecipe;
  }

  async delete(id: string): Promise<boolean> {
    const customRecipes = await storage.get<Recipe[]>(STORAGE_KEY, []);
    const filtered = customRecipes.filter(r => r.id !== id);
    await storage.set(STORAGE_KEY, filtered);

    // If it was in initial recipes, add to deletedIds
    if (INITIAL_RECIPES.some(r => r.id === id)) {
      const deletedIds = await storage.get<string[]>(DELETED_KEY, []);
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        await storage.set(DELETED_KEY, deletedIds);
      }
    }

    return true;
  }

  async resetToDefault(): Promise<void> {
    await storage.remove(STORAGE_KEY);
    await storage.remove(DELETED_KEY);
  }

  async exportAsJson(): Promise<string> {
    const all = await this.getAll();
    return JSON.stringify(all, null, 2);
  }

  async importFromJson(jsonStr: string): Promise<number> {
    const parsed = JSON.parse(jsonStr) as Recipe[];
    if (!Array.isArray(parsed)) throw new Error('Invalid recipe JSON structure');
    await storage.set(STORAGE_KEY, parsed);
    return parsed.length;
  }
}

export const recipeService = new RecipeService();

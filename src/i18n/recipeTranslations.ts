import { Recipe } from '../types';
import { Language } from './types';
import { translateTag } from './tags';
import { RECIPES_1_TO_10 } from './recipes/recipes1to10';
import { RECIPES_11_TO_20 } from './recipes/recipes11to20';
import { RECIPES_21_TO_30 } from './recipes/recipes21to30';
import { RECIPES_31_TO_42 } from './recipes/recipes31to42';

export interface LocalizedRecipeData {
  title: string;
  description: string;
  tags?: string[];
  ingredients?: { name: string; unit?: string; notes?: string }[];
  instructions?: { title: string; instruction: string; tip?: string }[];
}

export const RECIPE_TRANSLATIONS: Record<string, Partial<Record<Language, LocalizedRecipeData>>> = {
  ...RECIPES_1_TO_10,
  ...RECIPES_11_TO_20,
  ...RECIPES_21_TO_30,
  ...RECIPES_31_TO_42
};

/**
 * Localizes a recipe object according to the active language.
 * If language is 'uk', returns the original recipe unchanged.
 * If translations exist, merges translated title, description, tags, ingredients, and instructions.
 */
export function getLocalizedRecipe(recipe: Recipe, lang: Language): Recipe {
  if (lang === 'uk') {
    return recipe;
  }

  const recipeTr = RECIPE_TRANSLATIONS[recipe.slug]?.[lang];
  
  // Localize tags always via tag translation dictionary
  const localizedTags = recipeTr?.tags && recipeTr.tags.length > 0
    ? recipeTr.tags
    : recipe.tags.map(t => translateTag(t, lang));

  if (!recipeTr) {
    return {
      ...recipe,
      tags: localizedTags
    };
  }

  let ingredients = recipe.ingredients;
  if (recipeTr.ingredients && recipeTr.ingredients.length > 0) {
    ingredients = recipe.ingredients.map((ing, idx) => {
      const trIng = recipeTr.ingredients?.[idx];
      if (!trIng) return ing;
      return {
        ...ing,
        name: trIng.name || ing.name,
        unit: trIng.unit !== undefined ? trIng.unit : ing.unit,
        notes: trIng.notes !== undefined ? trIng.notes : ing.notes
      };
    });
  }

  let instructions = recipe.instructions;
  if (recipeTr.instructions && recipeTr.instructions.length > 0) {
    instructions = recipe.instructions.map((step, idx) => {
      const trStep = recipeTr.instructions?.[idx];
      if (!trStep) return step;
      return {
        ...step,
        title: trStep.title || step.title,
        instruction: trStep.instruction || step.instruction,
        tip: trStep.tip !== undefined ? trStep.tip : step.tip
      };
    });
  }

  return {
    ...recipe,
    title: recipeTr.title || recipe.title,
    description: recipeTr.description || recipe.description,
    tags: localizedTags,
    ingredients,
    instructions
  };
}

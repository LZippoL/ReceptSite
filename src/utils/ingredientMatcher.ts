import { Recipe, IngredientMatchResult } from '../types';
import { DEFAULT_STAPLES } from '../data/categories';

// Synonym map mapping canonical root keys to equivalent terms
const SYNONYM_GROUPS: string[][] = [
  ['яйце', 'яйця', 'яєць', 'курячі яйця', 'куряче яйце', 'жовток', 'білок'],
  ['помідор', 'помідори', 'томат', 'томати', 'томатна паста', 'помідори чері', 'чері'],
  ['картопля', 'картоплини', 'бульба', 'молода картопля'],
  ['цибуля', 'ріпчаста цибуля', 'цибулина', 'зелена цибуля', 'шалот', 'порей'],
  ['часник', 'зубчики часнику', 'зубчик часнику', 'часниковий соус'],
  ['морква', 'морквина', 'терта морква'],
  ['куряче філе', 'курка', 'курятина', 'куряча грудка', 'курячі стегна', 'курячі гомілки', 'курячі крильця', 'курча'],
  ['яловичина', 'телятина', 'яловичий фарш', 'стейк'],
  ['свинина', 'свиняче філе', 'свиняча корейка', 'свинячий фарш'],
  ['бекон', 'панчетта', 'гуанчале', 'копчена грудинка'],
  ['вершки', 'кулінарні вершки', 'жирні вершки', 'вершки 15%', 'вершки 20%', 'вершки 33%'],
  ['молоко', 'незбиране молоко', 'рослинне молоко'],
  ['вершкове масло', 'масло', 'топлене масло'],
  ['сир', 'твердий сир', 'голландський сир', 'гауда', 'чедер'],
  ['кисломолочний сир', 'сир домашній', 'творог', 'домашній сир'],
  ['пармезан', 'грана падано', 'пекоріно'],
  ['моцарела', 'моцарелла', 'сир моцарела'],
  ['борошно', 'мука', 'пшеничне борошно', 'вівсяне борошно'],
  ['рис', 'довгозернистий рис', 'круглий рис', 'рис басматі', 'рис арборіо'],
  ['паста', 'спагеті', 'макарони', 'фетучіні', 'пенне'],
  ['гриби', 'печериці', 'гливи', 'білі гриби'],
  ['огірок', 'огірки', 'свіжі огірки', 'квашені огірки', 'солоні огірки'],
  ['капуста', 'білокачанна капуста', 'пекінська капуста', 'цвітна капуста', 'броколі'],
  ['буряк', 'червоний буряк', 'бурячок'],
  ['кріп', 'петрушка', 'зелень', 'кінза', 'базилік'],
  ['лимон', 'лимонний сік', 'цедра лимона', 'лайм'],
  ['оливкова олія', 'олія', 'рослинна олія', 'соняшникова олія'],
  ['сметана', 'густа сметана', 'сметана 15%', 'сметана 20%'],
  ['яблуко', 'яблука', 'солодкі яблука', 'кислі яблука'],
  ['мед', 'натуральний мед', 'квітковий мед'],
  ['лосось', 'форель', 'червона риба', 'сьомга'],
  ['шоколад', 'чорний шоколад', 'какао', 'какао-порошок']
];

export function normalizeIngredient(term: string): string {
  return term.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
}

export function areIngredientsMatching(userIngredient: string, recipeIngredient: string): boolean {
  const normUser = normalizeIngredient(userIngredient);
  const normRecipe = normalizeIngredient(recipeIngredient);

  if (normUser === normRecipe) return true;
  if (normRecipe.includes(normUser) || normUser.includes(normRecipe)) return true;

  // Check synonym groups
  for (const group of SYNONYM_GROUPS) {
    const userInGroup = group.some(item => normUser.includes(normalizeIngredient(item)) || normalizeIngredient(item).includes(normUser));
    const recipeInGroup = group.some(item => normRecipe.includes(normalizeIngredient(item)) || normalizeIngredient(item).includes(normRecipe));
    if (userInGroup && recipeInGroup) {
      return true;
    }
  }

  return false;
}

export function isIngredientStaple(name: string, customStaples: string[] = DEFAULT_STAPLES): boolean {
  const norm = normalizeIngredient(name);
  return customStaples.some(staple => {
    const normStaple = normalizeIngredient(staple);
    return norm.includes(normStaple) || normStaple.includes(norm);
  });
}

export function matchRecipesByIngredients(
  recipes: Recipe[],
  userIngredients: string[],
  customStaples: string[] = DEFAULT_STAPLES
): IngredientMatchResult[] {
  if (userIngredients.length === 0) {
    return [];
  }

  const results: IngredientMatchResult[] = [];

  for (const recipe of recipes) {
    const matchedIngredients: string[] = [];
    const missingIngredients: string[] = [];
    let totalNonStapleCount = 0;

    for (const ing of recipe.ingredients) {
      const isStaple = ing.isStaple || isIngredientStaple(ing.name, customStaples);

      // Check if user has this ingredient
      const isMatched = userIngredients.some(userIng => areIngredientsMatching(userIng, ing.name));

      if (isMatched) {
        matchedIngredients.push(ing.name);
      } else {
        if (!isStaple) {
          missingIngredients.push(ing.name);
        }
      }

      if (!isStaple) {
        totalNonStapleCount++;
      }
    }

    // Must have at least 1 match to be considered
    if (matchedIngredients.length > 0) {
      const matchedNonStapleCount = totalNonStapleCount - missingIngredients.length;
      const matchScore = totalNonStapleCount > 0 
        ? Math.max(0, matchedNonStapleCount / totalNonStapleCount)
        : 1;

      let matchType: 'ready_now' | 'almost_ready' | 'partial';
      if (missingIngredients.length === 0) {
        matchType = 'ready_now';
      } else if (missingIngredients.length <= 2) {
        matchType = 'almost_ready';
      } else {
        matchType = 'partial';
      }

      results.push({
        recipe,
        matchScore,
        matchedIngredients,
        missingIngredients,
        matchType,
        totalNonStapleCount
      });
    }
  }

  // Sort results by match score descending, then by recipe rating
  return results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return b.recipe.rating - a.recipe.rating;
  });
}

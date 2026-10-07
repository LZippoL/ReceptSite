import { Recipe, IngredientMatchResult } from '../types';
import { DEFAULT_STAPLES } from '../data/categories';

// Synonym map mapping canonical root keys to equivalent terms
// Multilingual synonym groups (Ukrainian, English, German, Chinese)
const SYNONYM_GROUPS: string[][] = [
  ['яйце', 'яйця', 'яєць', 'курячі яйця', 'куряче яйце', 'жовток', 'білок', 'egg', 'eggs', 'yolk', 'ei', 'eier', 'eigelb', '鸡蛋', '蛋', '蛋黄', '蛋清'],
  ['помідор', 'помідори', 'томат', 'томати', 'томатна паста', 'помідори чері', 'чері', 'tomato', 'tomatoes', 'cherry tomatoes', 'tomato paste', 'tomate', 'tomaten', 'cherrytomaten', '西红柿', '番茄', '番茄酱', '小番茄'],
  ['картопля', 'картоплини', 'бульба', 'молода картопля', 'potato', 'potatoes', 'kartoffel', 'kartoffeln', 'erdapfel', '土豆', '马铃薯', '洋芋'],
  ['цибуля', 'ріпчаста цибуля', 'цибулина', 'зелена цибуля', 'шалот', 'порей', 'onion', 'onions', 'shallot', 'scallion', 'zwiebel', 'zwiebeln', 'schalotte', 'lauch', '洋葱', '小葱', '大葱', '红葱头'],
  ['часник', 'зубчики часнику', 'зубчик часнику', 'часниковий соус', 'garlic', 'garlic clove', 'knoblauch', 'knoblauchzehe', '大蒜', '蒜', '蒜瓣', '蒜末'],
  ['морква', 'морквина', 'терта морква', 'carrot', 'carrots', 'karotte', 'karotten', 'möhre', '胡萝卜', '红萝卜'],
  ['куряче філе', 'курка', 'курятина', 'куряча грудка', 'курячі стегна', 'курячі гомілки', 'курячі крильця', 'курча', 'chicken', 'chicken breast', 'chicken wings', 'chicken thighs', 'hähnchen', 'huhn', 'hühnerbrust', 'hähnchenflügel', '鸡肉', '鸡胸肉', '鸡翅', '鸡腿', '鸡'],
  ['яловичина', 'телятина', 'яловичий фарш', 'стейк', 'beef', 'ground beef', 'steak', 'veal', 'rindfleisch', 'rinderhack', '牛肉', '牛肉馅', '牛排', '小牛肉'],
  ['свинина', 'свиняче філе', 'свиняча корейка', 'свинячий фарш', 'pork', 'pork chops', 'ground pork', 'schweinefleisch', 'schweinehack', '猪肉', '猪肉末', '猪排'],
  ['бекон', 'панчетта', 'гуанчале', 'копчена грудинка', 'bacon', 'guanciale', 'pancetta', 'speck', 'schinken', '培根', '烟熏肉', '风干肉'],
  ['вершки', 'кулінарні вершки', 'жирні вершки', 'вершки 15%', 'вершки 20%', 'вершки 33%', 'heavy cream', 'cream', 'whipping cream', 'sahne', 'schlagsahne', 'crème', '奶油', '淡奶油', '稀奶油'],
  ['молоко', 'незбиране молоко', 'рослинне молоко', 'milk', 'whole milk', 'oat milk', 'milch', 'hafermilch', '牛奶', '鲜奶', '植物奶'],
  ['вершкове масло', 'масло', 'топлене масло', 'butter', 'clarified butter', 'ghee', 'butter', 'butterfett', '黄油', '无盐黄油', '酥油'],
  ['сир', 'твердий сир', 'голландський сир', 'гауда', 'чедер', 'cheese', 'cheddar', 'gouda', 'hard cheese', 'käse', 'hartkäse', '奶酪', '芝士', '干酪', '车达'],
  ['кисломолочний сир', 'сир домашній', 'творог', 'домашній сир', 'cottage cheese', 'farmers cheese', 'quark', 'schichtkäse', 'topfen', '农家奶酪', '乡村干酪', '茅屋芝士'],
  ['пармезан', 'грана падано', 'пекоріно', 'parmesan', 'parmigiano', 'pecorino', 'grana padano', 'parmesan', 'pecorino', '帕玛森', '帕马森奶酪', '佩科里诺'],
  ['моцарела', 'моцарелла', 'сир моцарела', 'mozzarella', 'mozzarella cheese', 'mozzarella', '马苏里拉', '马苏里拉奶酪'],
  ['борошно', 'мука', 'пшеничне борошно', 'вівсяне борошно', 'flour', 'all-purpose flour', 'wheat flour', 'mehl', 'weizenmehl', '面粉', '小麦粉', '中筋面粉'],
  ['рис', 'довгозернистий рис', 'круглий рис', 'рис басматі', 'рис арборіо', 'rice', 'basmati rice', 'jasmine rice', 'reis', 'basmatireis', '大米', '大米饭', '香米', '白米'],
  ['паста', 'спагеті', 'макарони', 'фетучіні', 'пенне', 'pasta', 'spaghetti', 'noodles', 'penne', 'nudeln', 'pasta', 'spaghetti', '意面', '意大利面', '面条', '通心粉'],
  ['гриби', 'печериці', 'гливи', 'білі гриби', 'mushrooms', 'champignons', 'porcini', 'pilze', 'champignons', 'steinpilze', '蘑菇', '香菇', '口蘑', '牛肝菌'],
  ['огірок', 'огірки', 'свіжі огірки', 'квашені огірки', 'солоні огірки', 'cucumber', 'cucumbers', 'pickles', 'gurke', 'gurken', 'essiggurke', '黄瓜', '青瓜', '酸黄瓜'],
  ['капуста', 'білокачанна капуста', 'пекінська капуста', 'цвітна капуста', 'броколі', 'cabbage', 'broccoli', 'cauliflower', 'kohl', 'weißkohl', 'brokkoli', 'blumenkohl', '卷心菜', '包菜', '西兰花', '花椰菜'],
  ['буряк', 'червоний буряк', 'бурячок', 'beet', 'beets', 'beetroot', 'rote bete', 'rote rübe', '甜菜', '红甜菜', '甜菜根'],
  ['кріп', 'петрушка', 'зелень', 'кінза', 'базилік', 'dill', 'parsley', 'herbs', 'cilantro', 'basil', 'petersilie', 'kräuter', 'basilikum', 'koriander', '莳萝', '欧芹', '香菜', '罗勒', '香草'],
  ['лимон', 'лимонний сік', 'цедра лимона', 'лайм', 'lemon', 'lemon juice', 'lime', 'zitrone', 'zitronensaft', 'limette', '柠檬', '柠檬汁', '青柠'],
  ['оливкова олія', 'олія', 'рослинна олія', 'соняшникова олія', 'olive oil', 'vegetable oil', 'sunflower oil', 'olivenöl', 'pflanzenöl', 'sonnenblumenöl', '橄榄油', '植物油', '菜籽油', '色拉油'],
  ['сметана', 'густа сметана', 'сметана 15%', 'сметана 20%', 'sour cream', 'crème fraîche', 'saure sahne', 'schmand', '酸奶油', '法式酸奶油'],
  ['яблуко', 'яблука', 'солодкі яблука', 'кислі яблука', 'apple', 'apples', 'apfel', 'äpfel', '苹果', '红富士', '青苹果'],
  ['мед', 'натуральний мед', 'квітковий мед', 'honey', 'honig', 'blütenhonig', '蜂蜜', '百花蜜'],
  ['лосось', 'форель', 'червона риба', 'сьомга', 'salmon', 'trout', 'lachs', 'forelle', '三文鱼', '鲑鱼', '鳟鱼'],
  ['шоколад', 'чорний шоколад', 'какао', 'какао-порошок', 'chocolate', 'dark chocolate', 'cocoa', 'schokolade', 'zartbitterschokolade', 'kakao', '巧克力', '黑巧克力', '可可粉']
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

import { Recipe, Article } from '../types';

export function updateMetaTags({
  title,
  description,
  image,
  url
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}) {
  document.title = `${title} | Смаколик`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg) ogImg.setAttribute('content', image || '');

  if (url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  } else {
    // A page that supplies no canonical must not inherit the previous page's URL.
    document.querySelector('link[rel="canonical"]')?.remove();
  }
}

export function generateRecipeSchema(recipe: Recipe): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: recipe.image ? [recipe.image] : undefined,
    author: {
      '@type': 'Person',
      name: recipe.author.name
    },
    datePublished: recipe.createdAt,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.totalTime}M`,
    recipeYield: `${recipe.servings} порцій`,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    nutrition: recipe.nutrition ? {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.protein} grams`,
      fatContent: `${recipe.nutrition.fat} grams`,
      carbohydrateContent: `${recipe.nutrition.carbs} grams`
    } : undefined,
    recipeIngredient: recipe.ingredients.map(i => `${i.amount > 0 ? `${i.amount} ` : ''}${i.unit ? `${i.unit} ` : ''}${i.name}`),
    recipeInstructions: recipe.instructions.map(step => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.instruction,
      url: window.location.href + `#step-${step.stepNumber}`,
      image: step.image
    })),
    aggregateRating: recipe.reviewsCount > 0 && recipe.rating >= 1 && recipe.rating <= 5 ? {
      '@type': 'AggregateRating',
      ratingValue: recipe.rating.toString(),
      reviewCount: recipe.reviewsCount.toString(),
      bestRating: '5',
      worstRating: '1'
    } : undefined
  };

  return JSON.stringify(schema);
}

export function generateArticleSchema(article: Article): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: [article.image],
    datePublished: article.createdAt,
    author: {
      '@type': 'Person',
      name: article.author.name
    }
  };

  return JSON.stringify(schema);
}

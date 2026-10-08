import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

const text = z.string().trim().min(1);
const url = text.refine(value => {
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; }
}, 'Use an HTTP(S) URL or a site-relative path');
export const categories = ['breakfast', 'lunch', 'dinner', 'soup', 'salad', 'appetizer', 'meat', 'fish', 'baking', 'dessert', 'drink', 'quick', 'healthy', 'vegetarian'];
export const cuisines = ['ukrainian', 'italian', 'french', 'asian', 'american', 'mexican', 'georgian', 'mediterranean', 'other'];
export const author = z.object({ name: text.max(200), avatar: url.optional(), role: text.max(200).optional() }).strict();
export const slug = text.max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a unique Latin slug, e.g. ukrainskyi-borshch');
const minutes = z.number().int().min(0).max(10080);
export const recipeSchema = z.object({
  slug, title: text.max(300), description: text.max(10000), image: url,
  category: z.enum(categories), cuisine: z.enum(cuisines), difficulty: z.enum(['easy', 'medium', 'hard']),
  prepTime: minutes, cookTime: minutes, servings: z.number().int().min(1).max(1000),
  calories: z.number().min(0).max(100000),
  nutrition: z.object({ protein: z.number().min(0), fat: z.number().min(0), carbs: z.number().min(0), calories: z.number().min(0).optional() }).strict().optional(),
  tags: z.array(text.max(100)).max(50).default([]), author,
  dietary: z.object({ vegetarian: z.boolean().optional(), vegan: z.boolean().optional(), glutenFree: z.boolean().optional(), lactoseFree: z.boolean().optional() }).strict().optional(),
  ingredients: z.array(z.object({ name: text.max(200), amount: z.number().min(0).max(1000000), unit: text.max(50), notes: text.max(1000).optional(), isStaple: z.boolean().optional() }).strict()).min(1).max(200),
  instructions: z.array(z.object({ title: text.max(300), instruction: text.max(10000), timerMinutes: minutes.optional(), tip: text.max(2000).optional(), image: url.optional() }).strict()).min(1).max(100)
}).strict();
export const articleSchema = z.object({
  slug, title: text.max(300), summary: text.max(10000),
  content: text.max(200000).describe('HTML article body, not Markdown. Use headings, paragraphs and lists; scripts are removed.'),
  image: url, category: text.max(100), readTime: z.number().int().min(1).max(1000), author,
  tags: z.array(text.max(100)).max(50).default([]),
  relatedRecipeSlugs: z.array(slug).max(50).default([]),
  status: z.enum(['draft', 'published']).default('draft')
}).strict();
export const recipePatch = recipeSchema.partial().strict().refine(v => Object.keys(v).length > 0, 'Provide at least one field');
export const articlePatch = articleSchema.partial().strict().refine(v => Object.keys(v).length > 0, 'Provide at least one field');
export const idSchema = text.max(200).refine(v => !v.startsWith('__SYSTEM_'), 'System records cannot be accessed');

export function cleanArticle(html) {
  const cleaned = sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'figure', 'figcaption', 'h1', 'h2'],
    allowedAttributes: { a: ['href', 'title'], img: ['src', 'alt', 'width', 'height'], '*': ['class'] },
    allowedSchemes: ['http', 'https', 'mailto'], allowProtocolRelative: false
  });
  if (!sanitizeHtml(cleaned, { allowedTags: [], allowedAttributes: {} }).trim()) {
    throw new Error('Article must contain readable text');
  }
  return cleaned;
}

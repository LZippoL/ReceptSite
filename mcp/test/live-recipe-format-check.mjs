// Validates the deployed recipe pipeline without publishing a test recipe:
// a valid input deliberately reuses an existing unique slug and must be rejected.
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { GatewayRepository } from '../src/gateway-repository.mjs';
process.loadEnvFile(fileURLToPath(new URL('../.env', import.meta.url)));
const repository = new GatewayRepository(process.env.MCP_GATEWAY_URL, process.env.MCP_AGENT_TOKEN);
const existing = await repository.list('recipes', { limit: 1 });
assert.equal(existing.length, 1);
const input = {
  title: 'Перевірка формату без публікації', slug: existing[0].slug,
  description: 'Тестовий опис формату рецепта', category: 'lunch', cuisine: 'ukrainian',
  prepTime: 15, cookTime: 25, servings: 4, difficulty: 'easy', calories: 320,
  nutrition: { protein: 18, fat: 12, carbs: 30, calories: 320 }, tags: ['домашнє', 'смачно'],
  ingredients: [{ id: '1', name: 'Куряче філе', amount: 400, unit: 'г' }, { id: '2', name: 'Сіль', amount: 1, unit: 'ч. л.', isStaple: true }],
  instructions: [{ stepNumber: 1, title: 'Підготовка', instruction: 'Наріжте продукти.', timerMinutes: 5 }],
  seoTitle: 'Куряче філе — домашній рецепт на чотири порції',
  seoDescription: 'Покроковий рецепт курячого філе на чотири порції з кількостями інгредієнтів, часом приготування й харчовою цінністю.'
};
await assert.rejects(repository.create('recipes', input), /slug or ID already exists/);
await assert.rejects(repository.create('recipes', { ...input, seoTitle: '' }), /Invalid content fields/);
const after = await repository.get('recipes', existing[0].id);
assert.equal(after.title, existing[0].title);
assert.equal(after.image, existing[0].image);
console.log('Deployed gateway accepts site JSON without image; requires SEO; existing recipe unchanged.');

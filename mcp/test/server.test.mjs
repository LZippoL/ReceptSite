import test from 'node:test';
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createServer } from '../src/server.mjs';
import { ContentRepository, mapFields } from '../src/repository.mjs';
import { cleanArticle } from '../src/schemas.mjs';
import { fileURLToPath } from 'node:url';

const recipe = {
  slug: 'test-soup', title: 'Суп', description: 'Домашній суп', image: 'https://example.com/soup.webp',
  category: 'soup', cuisine: 'ukrainian', difficulty: 'easy', prepTime: 10, cookTime: 20,
  servings: 2, calories: 200, author: { name: 'Шеф' },
  nutrition: { protein: 5, fat: 4, carbs: 30, calories: 200 }, tags: ['домашнє'],
  seoTitle: 'Домашній овочевий суп — простий рецепт', seoDescription: 'Приготуйте домашній овочевий суп із морквою за 30 хвилин. Покроковий рецепт на дві порції з точними кількостями інгредієнтів.',
  ingredients: [{ name: 'Морква', amount: 100, unit: 'г' }],
  instructions: [{ title: 'Приготувати', instruction: 'Зваріть овочі.' }]
};
const article = {
  slug: 'test-article', title: 'Поради', summary: 'Кулінарні поради', content: '<p>Корисний текст</p>',
  image: '/images/article.webp', category: 'tips', readTime: 3, author: { name: 'Шеф' }
};
test('repository produces frontend-compatible recipes and preserves ratings on edits', () => {
  const repo = new ContentRepository(null);
  const row = repo.payload('recipes', recipe);
  assert.equal(row.total_time, 30);
  assert.equal(row.rating, 0);
  assert.equal(row.reviews_count, 0);
  assert.equal(row.instructions[0].stepNumber, 1);
  assert.ok(row.ingredients[0].id);
  assert.equal(row.author.isDraft, false);
  const fields = { prepTime: 'prep_time', cookTime: 'cook_time', totalTime: 'total_time', createdAt: 'created_at', seoTitle: 'seo_title', seoDescription: 'seo_description' };
  const existing = mapFields({ ...row, rating: 4.8 }, fields, true);
  const update = repo.payload('recipes', { title: 'Оновлений суп' }, existing);
  assert.equal(update.title, 'Оновлений суп');
  assert.equal(update.ingredients[0].id, row.ingredients[0].id);
  assert.equal(update.rating, undefined);
  assert.equal(update.id, undefined);
  assert.equal(update.created_at, undefined);
  assert.equal(row.image, '');
  assert.equal(row.seo_title, recipe.seoTitle);
  const withImage = repo.payload('recipes', { image: 'https://example.com/new.webp' }, { ...existing, image: 'https://example.com/original.webp' });
  assert.equal(withImage.image, 'https://example.com/original.webp');
});
test('site JSON IDs and step numbers work; missing or empty SEO is rejected', () => {
  const repo = new ContentRepository(null);
  const { author, image, ...input } = recipe;
  const row = repo.payload('recipes', { ...input, ingredients: [{ ...input.ingredients[0], id: '1' }], instructions: [{ ...input.instructions[0], stepNumber: 1 }] });
  assert.equal(row.ingredients[0].id, '1');
  assert.equal(row.instructions[0].stepNumber, 1);
  assert.equal(row.author.name, 'Смаколик');
  assert.equal(row.image, '');
  assert.throws(() => repo.payload('recipes', { ...input, seoTitle: '' }));
  const { seoDescription, ...withoutSeo } = input;
  assert.throws(() => repo.payload('recipes', withoutSeo));
});
test('articles default to drafts and unsafe HTML is removed', () => {
  const repo = new ContentRepository(null);
  assert.equal(repo.payload('articles', article).status, 'draft');
  const clean = cleanArticle('<h2>Поради</h2><script>alert(1)</script><img src="https://example.com/a.jpg" onerror="alert(1)"><a href="javascript:alert(1)">Текст</a>');
  assert.match(clean, /<h2>Поради<\/h2>/);
  assert.doesNotMatch(clean, /script|onerror|javascript:/);
  assert.throws(() => cleanArticle('<script>alert(1)</script>'), /readable text/);
});
test('MCP handshake, discovery, validation, writes, patches and error reporting', async t => {
  const calls = [];
  const repo = {
    create: async (kind, input) => { calls.push({ kind, input }); return { id: 'created', ...input }; },
    update: async (kind, id, input) => { calls.push({ kind, id, input }); return { id, ...input }; },
    list: async () => [], get: async () => { throw new Error('Content not found'); }
  };
  const server = createServer(repo);
  const client = new Client({ name: 'test', version: '1.0.0' });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  await client.connect(clientTransport);
  t.after(async () => { await client.close(); await server.close(); });
  const { tools } = await client.listTools();
  assert.equal(tools.length, 9);
  assert.ok(!tools.some(tool => tool.name.startsWith('delete_')));
  const created = await client.callTool({ name: 'create_article', arguments: { article } });
  assert.ok(!created.isError);
  assert.equal(calls.at(-1).input.status, 'draft');
  const updated = await client.callTool({ name: 'update_article', arguments: { id: 'created', changes: { title: 'Нова назва' } } });
  assert.ok(!updated.isError);
  assert.deepEqual(calls.at(-1).input, { title: 'Нова назва' });
  const invalid = await client.callTool({ name: 'create_recipe', arguments: { recipe: { ...recipe, servings: 0 } } });
  assert.equal(invalid.isError, true);
  const empty = await client.callTool({ name: 'update_article', arguments: { id: 'created', changes: {} } });
  assert.equal(empty.isError, true);
  const hidden = await client.callTool({ name: 'get_recipe', arguments: { id: '__SYSTEM_users' } });
  assert.equal(hidden.isError, true);
  const missing = await client.callTool({ name: 'get_article', arguments: { id: 'missing' } });
  assert.equal(missing.isError, true);
});
test('delete requires exact current title and does not write on mismatch', async () => {
  const repo = new ContentRepository(null);
  repo.get = async () => ({ title: 'Actual title' });
  await assert.rejects(repo.delete('articles', 'art-1', 'Wrong title'), /exactly match/);
});
test('database failures are surfaced instead of pretending a write succeeded', async () => {
  const client = { from: () => ({ insert: () => ({ select: () => ({ single: async () => ({ error: { code: '42501', message: 'private diagnostic' } }) }) }) }) };
  const repo = new ContentRepository(client);
  await assert.rejects(repo.create('articles', article), /Database operation failed \(42501\)/);
});
test('real stdio process starts from a different working directory', async t => {
  const client = new Client({ name: 'stdio-test', version: '1.0.0' });
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL('../src/index.mjs', import.meta.url))],
    cwd: fileURLToPath(new URL('../../', import.meta.url)),
    env: { ...process.env, SUPABASE_URL: 'https://example.supabase.co', SUPABASE_SECRET_KEY: 'sb_secret_test-placeholder', MCP_ENABLE_DELETE: 'false' },
    stderr: 'pipe'
  });
  t.after(async () => { await client.close(); });
  await client.connect(transport);
  const response = await client.callTool({ name: 'get_content_options', arguments: {} });
  assert.equal(JSON.parse(response.content[0].text).recipePublication, 'immediate');
});

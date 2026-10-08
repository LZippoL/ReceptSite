// Explicit smoke test: creates one temporary article draft, never publishes recipes.
// Cleanup of the printed draft ID must be performed through the authorized SQL tool.
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
process.loadEnvFile(fileURLToPath(new URL('../.env', import.meta.url)));
process.loadEnvFile(fileURLToPath(new URL('../../.env', import.meta.url)));
const url = process.env.MCP_GATEWAY_URL;
const unauth = await fetch(url, { method: 'POST', body: '{}' });
assert.equal(unauth.status, 401);
console.log('Unauthenticated gateway: denied');
const client = new Client({ name: 'smakolyk-live-check', version: '1.0.0' });
const transport = new StdioClientTransport({ command: process.execPath, args: [fileURLToPath(new URL('../src/index.mjs', import.meta.url))], env: process.env, stderr: 'pipe' });
try {
  await client.connect(transport);
  async function call(name, args) {
    const response = await client.callTool({ name, arguments: args });
    if (response.isError) throw new Error(response.content[0].text);
    return JSON.parse(response.content[0].text);
  }
  const tools = await client.listTools();
  assert.equal(tools.tools.length, 9);
  assert.ok(!tools.tools.some(tool => tool.name.startsWith('delete_')));
  const recipes = await call('list_recipes', { limit: 2 });
  assert.equal(recipes.length, 2);
  const recipe = await call('get_recipe', { id: recipes[0].id });
  assert.ok(recipe.ingredients.length > 0);
  const articles = await call('list_articles', { limit: 1 });
  assert.ok(Array.isArray(articles));
  console.log('Live stdio MCP: 9 tools, recipes and articles readable');
  const slug = `mcp-connectivity-check-${Date.now()}`;
  const draft = await call('create_article', { article: {
    slug, title: 'MCP connectivity check (temporary draft)', summary: 'Temporary integration check',
    content: '<p>Temporary integration check.</p><script>alert(1)</script>', image: '/images/check.webp',
    category: 'test', readTime: 1, author: { name: 'MCP integration test' }
  } });
  // Print immediately, so the caller can clean up even if a later assertion fails.
  console.log(`CLEANUP_ARTICLE_ID=${draft.id}`);
  assert.equal(draft.status, 'draft');
  assert.doesNotMatch(draft.content, /<script/);
  const updated = await call('update_article', { id: draft.id, changes: { summary: 'Updated integration check' } });
  assert.equal(updated.status, 'draft');
  assert.equal(updated.summary, 'Updated integration check');
  const read = await call('get_article', { id: draft.id });
  assert.equal(read.summary, updated.summary);
  const publicClient = createClient(process.env.SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  const { data, error } = await publicClient.from('articles').select('id').eq('id', draft.id);
  assert.equal(error, null);
  assert.deepEqual(data, []);
  const deleteResponse = await fetch(url, {
    method: 'POST', headers: { Authorization: `Bearer ${process.env.MCP_AGENT_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', kind: 'articles', id: draft.id, confirmTitle: draft.title })
  });
  assert.equal(deleteResponse.status, 403);
  console.log('Draft create/update/read: passed; public draft access denied; deletion denied');
} finally { await client.close(); }

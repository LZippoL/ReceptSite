import test from 'node:test';
import assert from 'node:assert/strict';
import { GatewayRepository } from '../src/gateway-repository.mjs';

test('gateway forwards only the scoped token and content operation', async () => {
  let captured;
  const repository = new GatewayRepository('https://example.com/functions/v1/content', 'fake-agent-token', async (url, options) => {
    captured = { url, ...options };
    return { ok: true, json: async () => ({ data: { id: 'art-1' } }) };
  });
  assert.deepEqual(await repository.update('articles', 'art-1', { summary: 'Changed' }), { id: 'art-1' });
  assert.equal(captured.headers.Authorization, 'Bearer fake-agent-token');
  assert.deepEqual(JSON.parse(captured.body), { action: 'update', kind: 'articles', id: 'art-1', input: { summary: 'Changed' } });
});
test('gateway reports denied authorization and hides network details', async () => {
  const unauthorized = new GatewayRepository('https://example.com', 'fake', async () => ({ ok: false, status: 401, json: async () => ({ error: 'Unauthorized' }) }));
  await assert.rejects(unauthorized.list('recipes'), /rejected the agent token/);
  const unavailable = new GatewayRepository('https://example.com', 'fake', async () => { throw new Error('network diagnostic with secret'); });
  await assert.rejects(unavailable.get('articles', 'art-1'), error => error.message.includes('unavailable') && !error.message.includes('secret'));
});

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { ContentRepository } from './repository.mjs';
import { recipeSchema, articleSchema, recipePatch, articlePatch, idSchema } from './schemas.mjs';

const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false, autoRefreshToken: false }
});
const repository = new ContentRepository(client);
const kind = z.enum(['recipes', 'articles']);
const options = z.object({ query: z.string().max(200).optional(), limit: z.number().int().min(1).max(100).default(20), offset: z.number().int().min(0).max(100000).default(0) }).strict();
const envelope = z.discriminatedUnion('action', [
  z.object({ action: z.literal('list'), kind, options: options.default({}) }).strict(),
  z.object({ action: z.literal('get'), kind, id: idSchema }).strict(),
  z.object({ action: z.literal('create'), kind, input: z.unknown() }).strict(),
  z.object({ action: z.literal('update'), kind, id: idSchema, input: z.unknown() }).strict(),
  z.object({ action: z.literal('delete'), kind, id: idSchema, confirmTitle: z.string().min(1).max(300) }).strict()
]);
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
});
// Custom bearer authentication. Platform JWT verification is disabled because these
// are scoped random agent tokens, not Supabase JWTs. Every operation authenticates.
Deno.serve(async request => {
  if (request.method !== 'POST') return json({ error: 'Use POST' }, 405);
  const header = request.headers.get('authorization') || '';
  if (!/^Bearer [a-f0-9]{64}$/.test(header)) return json({ error: 'Unauthorized' }, 401);
  const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(header.slice(7)))))
    .map(byte => byte.toString(16).padStart(2, '0')).join('');
  const { data: token, error } = await client.from('mcp_agent_tokens')
    .select('allow_delete,revoked').eq('token_hash', hash).maybeSingle();
  if (error) return json({ error: 'Agent authentication unavailable' }, 503);
  if (!token || token.revoked) return json({ error: 'Unauthorized' }, 401);
  if (Number(request.headers.get('content-length') || 0) > 512000) return json({ error: 'Request too large' }, 413);
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 512000) return json({ error: 'Request too large' }, 413);
    const args = envelope.parse(JSON.parse(raw));
    let data;
    switch (args.action) {
      case 'list': data = await repository.list(args.kind, args.options); break;
      case 'get': data = await repository.get(args.kind, args.id); break;
      case 'create': {
        const schema = args.kind === 'recipes' ? recipeSchema : articleSchema;
        data = await repository.create(args.kind, schema.parse(args.input)); break;
      }
      case 'update': {
        const schema = args.kind === 'recipes' ? recipePatch : articlePatch;
        data = await repository.update(args.kind, args.id, schema.parse(args.input)); break;
      }
      case 'delete':
        if (!token.allow_delete) return json({ error: 'Deletion is disabled for this agent token' }, 403);
        data = await repository.delete(args.kind, args.id, args.confirmTitle); break;
    }
    return json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) return json({ error: 'Invalid content fields', issues: error.issues.map(({ path, message }) => ({ path, message })) }, 400);
    if (error instanceof SyntaxError) return json({ error: 'Invalid JSON' }, 400);
    // Repository errors are deliberately generic and contain no credentials.
    return json({ error: error.message || 'Content operation failed' }, 400);
  }
});

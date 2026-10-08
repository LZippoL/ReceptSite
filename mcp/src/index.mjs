import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ContentRepository } from './repository.mjs';
import { GatewayRepository } from './gateway-repository.mjs';
import { createServer } from './server.mjs';

const envFile = fileURLToPath(new URL('../.env', import.meta.url));
if (existsSync(envFile)) process.loadEnvFile(envFile);
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const gatewayUrl = process.env.MCP_GATEWAY_URL;
const agentToken = process.env.MCP_AGENT_TOKEN;
let repository;
if (gatewayUrl && agentToken) {
  try {
    const parsed = new URL(gatewayUrl);
    if (parsed.protocol !== 'https:') throw new Error();
  } catch {
    console.error('MCP_GATEWAY_URL must be a valid HTTPS URL.');
    process.exit(1);
  }
  repository = new GatewayRepository(gatewayUrl, agentToken);
} else {
if (!url || !key) {
  console.error('Set MCP_GATEWAY_URL and MCP_AGENT_TOKEN, or SUPABASE_URL and SUPABASE_SECRET_KEY, in mcp/.env.');
  process.exit(1);
}
try {
  const parsed = new URL(url);
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error();
  if (key.startsWith('sb_publishable_')) throw new Error();
  if (!key.startsWith('sb_secret_')) {
    const claims = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString());
    if (claims.role !== 'service_role') throw new Error();
  }
} catch {
  console.error('Use a valid Supabase URL and a server secret/service_role key, not the browser publishable/anon key.');
  process.exit(1);
}
const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
repository = new ContentRepository(client);
}
const server = createServer(repository, { enableDelete: process.env.MCP_ENABLE_DELETE === 'true' });
await server.connect(new StdioServerTransport());

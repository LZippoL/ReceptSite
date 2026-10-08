create table if not exists public.mcp_agent_tokens (
  token_hash text primary key check (token_hash ~ '^[a-f0-9]{64}$'),
  label text not null,
  allow_delete boolean not null default false,
  revoked boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.mcp_agent_tokens enable row level security;
revoke all on public.mcp_agent_tokens from public, anon, authenticated;
grant select on public.mcp_agent_tokens to service_role;
-- No public policies: token hashes are accessible only inside the Edge Function.

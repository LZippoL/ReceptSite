-- Run in Supabase SQL Editor. Does not alter the existing recipes table.
begin;
-- Enforce idempotency through unique slugs. Resolve any existing duplicate recipe
-- slugs before running this migration; the transaction will roll back on duplicates.
create unique index if not exists recipes_content_slug_unique
  on public.recipes (slug) where category <> 'system';
create table if not exists public.content_editors (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.content_editors enable row level security;
revoke all on public.content_editors from anon, authenticated;
grant select on public.content_editors to authenticated;
drop policy if exists content_editors_self on public.content_editors;
create policy content_editors_self on public.content_editors
  for select to authenticated using (user_id = (select auth.uid()));

create table if not exists public.articles (
  id text primary key,
  slug text not null unique,
  title text not null,
  summary text not null,
  content text not null,
  image text not null,
  category text not null,
  read_time integer not null check (read_time > 0),
  author jsonb not null,
  tags jsonb not null default '[]'::jsonb,
  related_recipe_slugs jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published')),
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.articles enable row level security;
grant select on public.articles to anon, authenticated;
grant insert, update, delete on public.articles to authenticated;
grant all on public.articles, public.content_editors to service_role;
drop policy if exists articles_public_read on public.articles;
create policy articles_public_read on public.articles
  for select to anon, authenticated using (status = 'published');
-- Published tombstones are readable so built-in seed articles do not reappear after deletion.
drop policy if exists articles_editor_manage on public.articles;
create policy articles_editor_manage on public.articles
  for all to authenticated
  using (exists (select 1 from public.content_editors where user_id = (select auth.uid())))
  with check (exists (select 1 from public.content_editors where user_id = (select auth.uid())));
commit;

-- Add only the actual administrator's UUID from Supabase Authentication:
-- insert into public.content_editors (user_id) values ('ADMIN-USER-UUID') on conflict do nothing;

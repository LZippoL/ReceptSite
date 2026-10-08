alter table public.recipes add column if not exists seo_title text not null default '';
alter table public.recipes add column if not exists seo_description text not null default '';

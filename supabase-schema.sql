-- Run this in Supabase SQL Editor. The panel uses Supabase Auth for login.
create table if not exists public.skaftalia_posts (
  id uuid primary key default gen_random_uuid(),
  writer_id uuid not null references auth.users(id) on delete cascade,
  novel_id text not null default 'skaftalia',
  novel_title text not null default 'Skaftalia',
  novel_subtitle text not null default '',
  genre text not null default 'Roman',
  novel_description text not null default '',
  accent text not null default 'amber',
  chapter_title text not null default 'Yeni Bölüm',
  chapter_number integer not null default 1,
  published_date text not null default '',
  excerpt text not null default '',
  body text not null default '',
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists skaftalia_posts_public_idx on public.skaftalia_posts(status, novel_id, chapter_number);
alter table public.skaftalia_posts enable row level security;

-- Public visitors can read only published content.
create policy "Public can read published posts" on public.skaftalia_posts
  for select using (status = 'published');
-- Logged-in writer may read their own drafts and posts.
create policy "Writer can read own posts" on public.skaftalia_posts
  for select to authenticated using (auth.uid() = writer_id);
create policy "Writer can insert own posts" on public.skaftalia_posts
  for insert to authenticated with check (auth.uid() = writer_id);
create policy "Writer can update own posts" on public.skaftalia_posts
  for update to authenticated using (auth.uid() = writer_id) with check (auth.uid() = writer_id);
create policy "Writer can delete own posts" on public.skaftalia_posts
  for delete to authenticated using (auth.uid() = writer_id);


-- Table privileges; Row Level Security policies above still control which rows each role can access.
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON TABLE public.skaftalia_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.skaftalia_posts TO authenticated;

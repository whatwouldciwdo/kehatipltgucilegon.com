create extension if not exists pgcrypto;

create type public.cms_role as enum ('admin', 'editor');
create type public.content_status as enum ('draft', 'published');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.cms_role not null default 'editor',
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text not null default '' check (char_length(excerpt) <= 320),
  body text not null default '',
  status public.content_status not null default 'draft',
  author_id uuid not null references public.profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_status_published_idx on public.articles(status, published_at desc);
create index articles_author_idx on public.articles(author_id);

alter table public.profiles enable row level security;
alter table public.articles enable row level security;

create schema if not exists private;

create function private.is_cms_user(required_role public.cms_role default null)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid())
      and (required_role is null or role = required_role)
  );
$$;

revoke execute on function private.is_cms_user(public.cms_role) from public;
grant usage on schema private to authenticated;
grant execute on function private.is_cms_user(public.cms_role) to authenticated;

revoke all on public.profiles from anon, authenticated;
revoke all on public.articles from anon, authenticated;
grant select on public.profiles to authenticated;
grant select, insert, update, delete on public.articles to authenticated;
grant select on public.articles to anon;

create policy "CMS users can read profiles" on public.profiles
for select to authenticated
using ((select auth.uid()) = id or (select private.is_cms_user('admin')));

create policy "Published articles are public" on public.articles
for select to anon
using (status = 'published' and published_at <= now());

create policy "CMS users can read articles" on public.articles
for select to authenticated
using ((select private.is_cms_user()));

create policy "CMS users can create articles" on public.articles
for insert to authenticated
with check (author_id = (select auth.uid()) and (select private.is_cms_user()));

create policy "Authors or admins can update articles" on public.articles
for update to authenticated
using (author_id = (select auth.uid()) or (select private.is_cms_user('admin')))
with check (author_id = (select auth.uid()) or (select private.is_cms_user('admin')));

create policy "Authors or admins can delete articles" on public.articles
for delete to authenticated
using (author_id = (select auth.uid()) or (select private.is_cms_user('admin')));

create function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_set_updated_at before update on public.articles
for each row execute function public.set_updated_at();

-- Create CMS users in Authentication > Users, then grant access explicitly:
-- insert into public.profiles (id, full_name, role)
-- values ('AUTH_USER_UUID', 'Nama Pengelola', 'admin');
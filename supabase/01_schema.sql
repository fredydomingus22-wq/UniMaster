-- GarimpoCloud core schema for Supabase
-- Run in Supabase SQL editor. Uses auth.users as identity source.

create extension if not exists "pgcrypto";

-- USERS / PROFILES
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role text not null check (role in ('student', 'teacher', 'admin')),
  university text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  unique(email)
);

alter table public.users enable row level security;

create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- COMMUNITIES
create table if not exists public.communities (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  banner_url text,
  price_monthly numeric(12,2) not null default 0,
  is_public boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists communities_owner_idx on public.communities(owner_id);

alter table public.communities enable row level security;

create or replace function public.is_active_subscription(target_community uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.subscriptions s
    where s.user_id = auth.uid()
      and s.community_id = target_community
      and s.status in ('active', 'trial')
      and s.started_at <= timezone('utc', now())
      and (s.ends_at is null or s.ends_at > timezone('utc', now()))
  );
$$;

drop policy if exists "Public or member can read community" on public.communities;
create policy "Public or member can read community" on public.communities
  for select using (
    is_public
    or owner_id = auth.uid()
    or public.is_active_subscription(id)
  );

drop policy if exists "Owner manages community" on public.communities;
create policy "Owner manages community" on public.communities
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- COURSES
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities(id) on delete cascade,
  title text not null,
  description text,
  order_index int not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists courses_community_idx on public.courses(community_id);
create index if not exists courses_order_idx on public.courses(community_id, order_index);

alter table public.courses enable row level security;

create policy "Community member can read courses" on public.courses
  for select using (
    exists (
      select 1 from public.communities c
      where c.id = community_id
        and (
          c.owner_id = auth.uid()
          or public.is_active_subscription(c.id)
        )
    )
  );

create policy "Owner manages courses" on public.courses
  for all using (
    exists (
      select 1 from public.communities c
      where c.id = community_id and c.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.communities c
      where c.id = community_id and c.owner_id = auth.uid()
    )
  );

-- LESSONS
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  video_url text not null,
  pdf_url text,
  order_index int not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists lessons_course_idx on public.lessons(course_id);
create index if not exists lessons_order_idx on public.lessons(course_id, order_index);

alter table public.lessons enable row level security;

create policy "Community member can read lessons" on public.lessons
  for select using (
    exists (
      select 1 from public.courses co
      join public.communities c on c.id = co.community_id
      where co.id = course_id
        and (
          c.owner_id = auth.uid()
          or public.is_active_subscription(c.id)
        )
    )
  );

create policy "Owner manages lessons" on public.lessons
  for all using (
    exists (
      select 1 from public.courses co
      join public.communities c on c.id = co.community_id
      where co.id = course_id and c.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.courses co
      join public.communities c on c.id = co.community_id
      where co.id = course_id and c.owner_id = auth.uid()
    )
  );

-- POSTS
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,
  title text,
  body text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists posts_community_idx on public.posts(community_id);
create index if not exists posts_author_idx on public.posts(author_id);

alter table public.posts enable row level security;

create policy "Community member can read posts" on public.posts
  for select using (
    exists (
      select 1 from public.communities c
      where c.id = community_id
        and (
          c.owner_id = auth.uid()
          or public.is_active_subscription(c.id)
        )
    )
  );

create policy "Members can create posts" on public.posts
  for insert with check (
    auth.uid() = author_id
    and exists (
      select 1 from public.communities c
      where c.id = community_id
        and (
          c.owner_id = auth.uid()
          or public.is_active_subscription(c.id)
        )
    )
  );

create policy "Authors can update their posts" on public.posts
  for update using (auth.uid() = author_id) with check (auth.uid() = author_id);

create policy "Authors can delete their posts" on public.posts
  for delete using (auth.uid() = author_id);

-- COMMENTS
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists comments_post_idx on public.comments(post_id);
create index if not exists comments_author_idx on public.comments(author_id);

alter table public.comments enable row level security;

create policy "Community member can read comments" on public.comments
  for select using (
    exists (
      select 1 from public.posts p
      join public.communities c on c.id = p.community_id
      where p.id = post_id
        and (
          c.owner_id = auth.uid()
          or public.is_active_subscription(c.id)
        )
    )
  );

create policy "Members can create comments" on public.comments
  for insert with check (
    auth.uid() = author_id
    and exists (
      select 1 from public.posts p
      join public.communities c on c.id = p.community_id
      where p.id = post_id
        and (
          c.owner_id = auth.uid()
          or public.is_active_subscription(c.id)
        )
    )
  );

create policy "Authors can update their comments" on public.comments
  for update using (auth.uid() = author_id) with check (auth.uid() = author_id);

create policy "Authors can delete their comments" on public.comments
  for delete using (auth.uid() = author_id);

-- SUBSCRIPTIONS
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  community_id uuid not null references public.communities(id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'cancelled', 'trial')),
  started_at timestamptz not null default timezone('utc', now()),
  ends_at timestamptz,
  unique (user_id, community_id)
);

create index if not exists subscriptions_community_idx on public.subscriptions(community_id);
create index if not exists subscriptions_user_idx on public.subscriptions(user_id);

alter table public.subscriptions enable row level security;

create policy "User or owner can read subscription" on public.subscriptions
  for select using (
    auth.uid() = user_id
    or exists (
      select 1 from public.communities c
      where c.id = community_id and c.owner_id = auth.uid()
    )
  );

create policy "User manages own subscription" on public.subscriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Owner can manage community subscriptions" on public.subscriptions
  for all using (
    exists (
      select 1 from public.communities c
      where c.id = community_id and c.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.communities c
      where c.id = community_id and c.owner_id = auth.uid()
    )
  );

-- EVENTS
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities(id) on delete cascade,
  title text not null,
  description text,
  start_time timestamptz not null,
  end_time timestamptz,
  meeting_url text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists events_community_idx on public.events(community_id, start_time);

alter table public.events enable row level security;

create policy "Community member can read events" on public.events
  for select using (
    exists (
      select 1 from public.communities c
      where c.id = community_id
        and (
          c.owner_id = auth.uid()
          or public.is_active_subscription(c.id)
        )
    )
  );

create policy "Owner manages events" on public.events
  for all using (
    exists (
      select 1 from public.communities c
      where c.id = community_id and c.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.communities c
      where c.id = community_id and c.owner_id = auth.uid()
    )
  );


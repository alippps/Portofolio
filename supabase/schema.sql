-- Schema + hardening for the contact message board.
-- Run in the Supabase dashboard: SQL Editor -> New query -> Run.
-- Safe to re-run: every statement is idempotent.
--
-- WHY THIS MATTERS
-- The anon key is public - it ships inside the JS bundle, anyone can read it
-- from devtools. A table with RLS disabled is fully writable by that key, so
-- without the policies below a stranger can delete every message on the board.
--
-- BEFORE RUNNING: replace the salt on the RATE_SALT line with your own random
-- string (any long random text works).

-- ---------------------------------------------------------------- table ----
create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  name       text        not null default 'Anonymous',
  message    text        not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_created_at_idx
  on public.comments (created_at);

-- Length limits enforced by the database, not only by the form's maxLength.
alter table public.comments
  drop constraint if exists comments_name_len,
  add  constraint comments_name_len
       check (char_length(name) between 1 and 40);

alter table public.comments
  drop constraint if exists comments_message_len,
  add  constraint comments_message_len
       check (char_length(btrim(message)) between 1 and 300);

-- ----------------------------------------------------------- rate limit ----
-- Kept in a separate table so the public `comments` payload (including the
-- realtime broadcast) never carries anything derived from a visitor's IP.
create table if not exists public.comment_rate_limit (
  sender_hash       text primary key,
  window_started_at timestamptz not null default now(),
  hits              int         not null default 0
);

alter table public.comment_rate_limit enable row level security;
-- Deliberately no policies: anon and authenticated get no access at all.
-- Only the SECURITY DEFINER trigger below can touch this table.

create or replace function public.comments_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  RATE_SALT    constant text := 'change-me-to-a-long-random-string';
  PER_SENDER   constant int  := 3;   -- messages per sender per minute
  GLOBAL_LIMIT constant int  := 30;  -- messages from everyone per minute
  window_start timestamptz := now() - interval '1 minute';
  sender       text;
  current_hits int;
  global_hits  int;
begin
  -- PostgREST exposes the original request headers to the database.
  sender := coalesce(
    nullif(split_part(
      current_setting('request.headers', true)::json ->> 'x-forwarded-for',
      ',', 1
    ), ''),
    'unknown'
  );
  sender := md5(sender || RATE_SALT);

  insert into public.comment_rate_limit (sender_hash, window_started_at, hits)
  values (sender, now(), 1)
  on conflict (sender_hash) do update
    set hits = case
          when comment_rate_limit.window_started_at > window_start
          then comment_rate_limit.hits + 1
          else 1
        end,
        window_started_at = case
          when comment_rate_limit.window_started_at > window_start
          then comment_rate_limit.window_started_at
          else now()
        end
  returning hits into current_hits;

  if current_hits > PER_SENDER then
    raise exception 'Rate limit: too many messages. Please wait a minute.';
  end if;

  select count(*) into global_hits
  from public.comments
  where created_at > window_start;

  if global_hits >= GLOBAL_LIMIT then
    raise exception 'Rate limit: the board is busy right now. Try again shortly.';
  end if;

  -- Occasional cheap garbage collection of stale counters.
  if random() < 0.01 then
    delete from public.comment_rate_limit
    where window_started_at < now() - interval '1 day';
  end if;

  return new;
end;
$$;

drop trigger if exists comments_rate_limit_trg on public.comments;
create trigger comments_rate_limit_trg
  before insert on public.comments
  for each row execute function public.comments_rate_limit();

-- ------------------------------------------------------------------ rls ----
alter table public.comments enable row level security;

drop policy if exists "comments_select_public" on public.comments;
create policy "comments_select_public"
  on public.comments for select
  to anon, authenticated
  using (true);

drop policy if exists "comments_insert_public" on public.comments;
create policy "comments_insert_public"
  on public.comments for insert
  to anon, authenticated
  with check (true);

-- No UPDATE or DELETE policy is defined, so neither is possible with the
-- anon key. Moderate from the dashboard (service_role bypasses RLS).

-- ------------------------------------------------------------- realtime ----
-- Required for the live inbox in src/pages/Contact.jsx.
do $$
begin
  alter publication supabase_realtime add table public.comments;
exception
  when duplicate_object then null;
end
$$;

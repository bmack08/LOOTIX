-- ─────────────────────────────────────────────────────────────
-- LOOTIX raffle schema
-- Paste this into Supabase → SQL Editor → Run (once).
-- RLS is ON with no public policies, so ONLY the server (service_role
-- key) can read/write. The anon/public key can't touch these tables.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- Everyone who's given us their email
create table if not exists subscribers (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null unique,
  source     text not null default 'newsletter',
  created_at timestamptz not null default now()
);

-- Entry ledger — each row grants N entries to an email.
-- Total entries for the draw = sum(count) per email.
create table if not exists entries (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null,
  count      int  not null default 0,
  source     text not null,             -- signup | newsletter | order | mail-in
  meta       jsonb,                      -- e.g. { "order_id": "..." }
  created_at timestamptz not null default now()
);
create index if not exists entries_email_idx on entries (email);

-- Every draw we run (the winner + an audit trail)
create table if not exists draws (
  id            uuid primary key default uuid_generate_v4(),
  prize         text not null,
  winner_email  text not null,
  total_entries int  not null,
  entrant_count int  not null,
  method        text not null default 'weighted-random',
  note          text,
  created_at    timestamptz not null default now()
);

alter table subscribers enable row level security;
alter table entries     enable row level security;
alter table draws       enable row level security;
-- No policies added on purpose → locked to the service_role key only.

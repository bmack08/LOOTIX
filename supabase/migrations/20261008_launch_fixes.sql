-- ─────────────────────────────────────────────────────────────
-- LOOTIX launch fixes
--
-- File name is the one the brief specified (20261008_launch_fixes.sql); the
-- contents also carry the OWNER DECISIONS of Oct 22, 2026, which replaced the
-- earlier "1 entry per order" model with per-dollar entries.
--
-- DO NOT RUN THIS AUTOMATICALLY. Review it, then paste it into
-- Supabase → SQL Editor → Run, once. It is written to be idempotent, so a
-- second run is a no-op.
--
-- What it does:
--   1. entries: adds the weighted `entries` column, giveaway_id,
--      normalized_email, entrant_name, order_ref (UNIQUE), voided_at and
--      void_reason. Backfills `entries` from the legacy `count` column.
--   2. entries: UNIQUE(order_ref) so a Stripe retry cannot double-grant, and a
--      partial UNIQUE(giveaway_id, normalized_email) WHERE source='subscribe'
--      so one email can only ever earn one sign-up entry per giveaway.
--   3. subscribers: adds normalized_email with a UNIQUE index.
--   4. draws: rebuilt as the full winner record — identity, payout, the draw
--      itself, the notification ladder, and status timestamps.
--      It deliberately has NO column for SSN, tax ID, date of birth, or W-9
--      contents. w9_status is a status only; the W-9 lives outside this app.
--   5. RLS stays ON with no public policies, so only the service_role key can
--      read or write any of it.
--
-- Divergence from supabase/schema.sql, on purpose: columns added to tables
-- that already have rows are added NULLABLE, because Postgres cannot add a
-- NOT NULL column to a non-empty table. schema.sql (the from-scratch version)
-- marks draws.full_name / draws.email / draws.mailing_address and
-- subscribers.normalized_email NOT NULL. The application always supplies all
-- of them, so behaviour is the same either way.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ── 1. Entry ledger ──────────────────────────────────────────
create table if not exists entries (
  id         uuid primary key default uuid_generate_v4(),
  email      text,
  count      int  not null default 0,   -- legacy; superseded by `entries`
  source     text not null,
  meta       jsonb,
  created_at timestamptz not null default now()
);

alter table entries add column if not exists giveaway_id      text;
alter table entries add column if not exists normalized_email text;
alter table entries add column if not exists entrant_name     text;
-- How many times this row counts in the draw. A $129.99 order row is worth
-- 129; a mail-in card is worth 25; a sign-up is worth 10.
alter table entries add column if not exists entries          int not null default 0;
-- Stripe checkout session id. UNIQUE → webhook retries insert nothing.
alter table entries add column if not exists order_ref        text;
-- Set on refund / chargeback. The row is KEPT and counts 0, never deleted.
alter table entries add column if not exists voided_at        timestamptz;
alter table entries add column if not exists void_reason      text;

-- A mail-in card has no email, so `email` must be nullable.
alter table entries alter column email drop not null;
alter table entries alter column count  drop not null;

-- Backfill: carry the old flat counts over to the weighted column, so the
-- historical rows stay readable.
update entries set entries = coalesce(count, 0) where entries = 0 and coalesce(count, 0) > 0;

-- CRITICAL: pre-existing rows were written under the OLD entry model — sign-ups
-- were worth 25 (not 10) and orders carried a flat per-product count (a $35 tee
-- granted 60, not 35). Tagging them 'launch-vault' would put those wrong weights
-- straight into the launch draw and make the published odds false.
--
-- So they are parked under 'pre-launch' instead: kept in full (nothing is
-- deleted), still readable, but excluded from every ledger/stats/CSV/draw read,
-- because the app only ever queries giveaway_id = 'launch-vault'.
--
-- If you would rather carry a specific entrant forward, re-tag that single row
-- by hand after reviewing its weight against the current model.
update entries set giveaway_id = 'pre-launch' where giveaway_id is null;
-- Best-effort normalization of historical rows (lowercase/trim only; the app
-- applies the full Gmail dot/+tag rules on write).
update entries set normalized_email = lower(btrim(email)) where normalized_email is null and email is not null;

-- Fold the old per-source signup names into the single 'subscribe' source the
-- dedupe index is built on.
update entries set source = 'subscribe'
 where source in ('signup', 'newsletter', 'giveaway-first-winner', 'enter-to-win');

-- Folding those sources together can leave one email holding several sign-up
-- rows (e.g. it had both a 'newsletter' and an 'enter-to-win' grant), which
-- would make the unique index below fail. Keep the earliest row per email and
-- VOID the extras — rows are stamped, never deleted, so the ledger stays
-- auditable and the voided copies count 0.
with ranked as (
  select id,
         row_number() over (
           partition by giveaway_id, normalized_email
           order by created_at asc, id asc
         ) as rn
    from entries
   where source = 'subscribe'
     and normalized_email is not null
     and voided_at is null
)
update entries e
   set voided_at   = now(),
       void_reason = 'duplicate signup, folded during 20261008 migration'
  from ranked r
 where e.id = r.id
   and r.rn > 1;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'entries_entries_nonneg') then
    alter table entries add constraint entries_entries_nonneg check (entries >= 0) not valid;
    alter table entries validate constraint entries_entries_nonneg;
  end if;
end $$;

-- Promote the legacy meta.session_id into the new order_ref column, so a
-- refund or chargeback on a pre-migration order can still be matched and
-- voided (voidOrderEntries only looks at order_ref and meta.payment_intent,
-- and legacy rows have neither).
--
-- The old webhook had no idempotency, so a retry could have written the same
-- session_id twice. Keep the earliest row per session and VOID the rest,
-- otherwise the unique index below cannot be created.
with legacy as (
  select id,
         meta->>'session_id' as sid,
         row_number() over (
           partition by meta->>'session_id'
           order by created_at asc, id asc
         ) as rn
    from entries
   where order_ref is null
     and meta ? 'session_id'
     and coalesce(meta->>'session_id', '') <> ''
)
update entries e
   set order_ref   = case when l.rn = 1 then l.sid else e.order_ref end,
       voided_at   = case when l.rn > 1 then coalesce(e.voided_at, now()) else e.voided_at end,
       void_reason = case when l.rn > 1 then coalesce(e.void_reason, 'duplicate order grant, folded during 20261008 migration') else e.void_reason end
  from legacy l
 where e.id = l.id;

-- One order can only ever grant once.
--
-- NOT a partial index on purpose: Postgres ON CONFLICT (order_ref) inference
-- cannot match a partial index, and the app relies on that inference for the
-- "ignore duplicate Stripe retries" insert. A plain unique index is correct
-- anyway — Postgres treats NULLs as distinct, so every non-order row (which
-- has order_ref = NULL) is still allowed.
create unique index if not exists entries_order_ref_key on entries (order_ref);

-- One LIVE sign-up entry per normalized email, per giveaway. THIS is the real
-- guarantee behind /api/subscribe; the app just handles the 409.
-- Scoped to voided_at is null so a voided row never blocks a legitimate
-- re-grant, and so the dedupe above satisfies it.
create unique index if not exists entries_signup_once_per_email
  on entries (giveaway_id, normalized_email)
  where source = 'subscribe' and normalized_email is not null and voided_at is null;

create index if not exists entries_email_idx       on entries (email);
create index if not exists entries_normalized_idx  on entries (normalized_email);
create index if not exists entries_giveaway_idx    on entries (giveaway_id);
create index if not exists entries_source_idx      on entries (source);
-- The draw and the stats only ever read live rows.
create index if not exists entries_live_idx        on entries (giveaway_id, created_at) where voided_at is null;

-- ── 2. Subscribers (the mailing list) ────────────────────────
create table if not exists subscribers (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null unique,
  source     text not null default 'newsletter',
  created_at timestamptz not null default now()
);

alter table subscribers add column if not exists normalized_email text;
update subscribers set normalized_email = lower(btrim(email)) where normalized_email is null;
create unique index if not exists subscribers_normalized_email_key on subscribers (normalized_email);

-- ── 3. Winner records ────────────────────────────────────────
-- One winner = one row. Alternates are their own rows, alternate_rank 2, 3, …
create table if not exists draws (
  id            uuid primary key default uuid_generate_v4(),
  prize         text not null,
  total_entries int  not null default 0,
  entrant_count int  not null default 0,
  method        text not null default 'random.org-weighted',
  note          text,
  created_at    timestamptz not null default now()
);

alter table draws add column if not exists giveaway_id text;

-- identity + payout
alter table draws add column if not exists full_name             text;
alter table draws add column if not exists email                 text;
alter table draws add column if not exists phone                 text;
alter table draws add column if not exists mailing_address       text;
alter table draws add column if not exists shipping_address      text;
alter table draws add column if not exists paypal_email          text;
alter table draws add column if not exists paypal_transaction_id text;
alter table draws add column if not exists tracking_number       text;
alter table draws add column if not exists hoodie_size           text;
alter table draws add column if not exists tee_size              text;

-- the draw itself
alter table draws add column if not exists drawn_at              timestamptz;
alter table draws add column if not exists draw_date             date;
alter table draws add column if not exists draw_verification_url text;
alter table draws add column if not exists random_number         bigint;

-- the winning entry
alter table draws add column if not exists entry_id     uuid;
alter table draws add column if not exists entry_method text;
alter table draws add column if not exists entry_date   timestamptz;

-- notification ladder
alter table draws add column if not exists alternate_rank    int  not null default 1;
alter table draws add column if not exists notification_date date;
alter table draws add column if not exists attempt_number    int  not null default 1;
alter table draws add column if not exists response_deadline date;

-- status + timestamps
alter table draws add column if not exists status            text not null default 'notified';
alter table draws add column if not exists notified_at       timestamptz;
alter table draws add column if not exists docs_sent_at      timestamptz;
alter table draws add column if not exists docs_returned_at  timestamptz;
alter table draws add column if not exists paid_at           timestamptz;
alter table draws add column if not exists forfeited_at      timestamptz;
alter table draws add column if not exists w9_status         text not null default 'not_needed';

-- Carry anything recorded under the old shape across, if the column is there,
-- then drop its NOT NULL. The legacy `winner_email` column is kept (so no
-- recorded data is lost) but the app no longer writes it — without this, every
-- new insert would fail the old NOT NULL constraint.
do $$
begin
  if exists (
    select 1 from information_schema.columns
     where table_name = 'draws' and column_name = 'winner_email'
  ) then
    update draws set email     = coalesce(email, winner_email)     where winner_email is not null;
    update draws set full_name = coalesce(full_name, winner_email) where full_name is null;
    alter table draws alter column winner_email drop not null;
  end if;
end $$;

update draws set drawn_at    = coalesce(drawn_at, created_at)            where drawn_at is null;
update draws set draw_date   = coalesce(draw_date, created_at::date)     where draw_date is null;
update draws set giveaway_id = 'launch-vault'                            where giveaway_id is null;

-- Every legacy row defaults to alternate_rank 1, which would make the unique
-- (giveaway_id, alternate_rank) index below fail if more than one exists.
-- Renumber by draw order: oldest row stays rank 1, the rest become alternates.
with ranked as (
  select id,
         row_number() over (partition by giveaway_id order by drawn_at asc, created_at asc, id asc) as rn
    from draws
)
update draws d
   set alternate_rank = r.rn
  from ranked r
 where d.id = r.id
   and d.alternate_rank <> r.rn;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'draws_status_check') then
    alter table draws add constraint draws_status_check
      check (status in ('notified', 'docs_sent', 'docs_returned', 'paid', 'forfeited')) not valid;
    alter table draws validate constraint draws_status_check;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'draws_w9_status_check') then
    alter table draws add constraint draws_w9_status_check
      check (w9_status in ('not_needed', 'requested', 'received')) not valid;
    alter table draws validate constraint draws_w9_status_check;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'draws_attempt_check') then
    alter table draws add constraint draws_attempt_check
      check (attempt_number between 1 and 3) not valid;
    alter table draws validate constraint draws_attempt_check;
  end if;

  if not exists (select 1 from pg_constraint where conname = 'draws_alternate_rank_check') then
    alter table draws add constraint draws_alternate_rank_check
      check (alternate_rank >= 1) not valid;
    alter table draws validate constraint draws_alternate_rank_check;
  end if;
end $$;

-- One record per rank per giveaway: no two "primary winners" by accident.
create unique index if not exists draws_rank_per_giveaway
  on draws (giveaway_id, alternate_rank) where giveaway_id is not null;

create index if not exists draws_created_idx on draws (created_at desc);

-- ── 4. Lock everything to the service_role key ───────────────
alter table subscribers enable row level security;
alter table entries     enable row level security;
alter table draws       enable row level security;
-- No policies added on purpose → the anon/public key cannot touch these tables.

-- ─────────────────────────────────────────────────────────────
-- LOOTIX raffle schema — the current shape of the database.
--
-- This is the from-scratch version. For an EXISTING database, run
-- supabase/migrations/20261008_launch_fixes.sql instead, which migrates the
-- old shape onto this one without losing rows, then
-- supabase/migrations/20261023_orders.sql for the orders table.
--
-- Paste into Supabase → SQL Editor → Run (once).
-- RLS is ON with no public policies, so ONLY the server (service_role key)
-- can read/write. The anon/public key can't touch these tables.
--
-- Entry model (owner decision Oct 22, 2026): entries are PER DOLLAR.
--   order    → 1 entry per $1 of subtotal, after discounts, before tax/shipping
--   mail-in  → 25 entries per card (one card per envelope, no cap)
--   subscribe→ 25 entries, once per normalized email per giveaway
-- The `entries` column is the weight: a row worth 129 counts 129 times in the
-- draw. Voided rows (refund / chargeback) count 0 and are never deleted.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- Everyone who's given us their email
create table if not exists subscribers (
  id               uuid primary key default uuid_generate_v4(),
  email            text not null unique,
  -- trimmed + lowercased, and for Gmail with dots and "+tag" stripped
  normalized_email text not null,
  source           text not null default 'newsletter',
  created_at       timestamptz not null default now()
);
create unique index if not exists subscribers_normalized_email_key on subscribers (normalized_email);

-- Entry ledger — each row is worth `entries` chances in the draw.
-- Total entries for the draw = sum(entries) where voided_at is null.
create table if not exists entries (
  id               uuid primary key default uuid_generate_v4(),
  giveaway_id      text not null default 'launch-vault',
  -- null for a mail-in card with no email given
  email            text,
  normalized_email text,
  -- the name on a mail-in card
  entrant_name     text,
  entries          int  not null default 0 check (entries >= 0),
  -- legacy flat count, kept so historical rows stay readable
  count            int  default 0,
  source           text not null,              -- subscribe | order | mail-in
  -- Stripe checkout session id; UNIQUE so retries can't double-grant
  order_ref        text,
  -- mail-in: { mailing_address, postmark_date, received_date }
  -- order:   { payment_intent, amount_subtotal, amount_discount }
  meta             jsonb,
  -- set on refund / chargeback; the row is kept and counts 0
  voided_at        timestamptz,
  void_reason      text,
  created_at       timestamptz not null default now()
);

-- One order grants exactly once.
--
-- NOT a partial index on purpose: ON CONFLICT (order_ref) inference cannot
-- match a partial index, and the webhook's "ignore duplicate retries" insert
-- depends on that inference. Postgres treats NULLs as distinct, so every
-- non-order row (order_ref = NULL) is still allowed.
create unique index if not exists entries_order_ref_key on entries (order_ref);

-- One LIVE sign-up entry per normalized email, per giveaway. This index — not
-- the application code — is what makes repeat submissions worth nothing.
-- Scoped to voided_at is null so a voided row never blocks a re-grant.
create unique index if not exists entries_signup_once_per_email
  on entries (giveaway_id, normalized_email)
  where source = 'subscribe' and normalized_email is not null and voided_at is null;

create index if not exists entries_email_idx      on entries (email);
create index if not exists entries_normalized_idx on entries (normalized_email);
create index if not exists entries_giveaway_idx   on entries (giveaway_id);
create index if not exists entries_source_idx     on entries (source);
create index if not exists entries_live_idx       on entries (giveaway_id, created_at) where voided_at is null;

-- Winner records. One winner = one row; alternates are their own rows with
-- alternate_rank 2, 3, …
--
-- There is deliberately NO column for SSN, tax ID, date of birth, or W-9
-- contents. w9_status is a status only — the W-9 is handled outside this app.
create table if not exists draws (
  id                    uuid primary key default uuid_generate_v4(),
  giveaway_id           text not null default 'launch-vault',
  prize                 text not null,

  -- identity + payout
  full_name             text not null,
  email                 text not null,
  phone                 text,
  mailing_address       text not null,
  shipping_address      text,
  paypal_email          text,
  paypal_transaction_id text,
  tracking_number       text,
  hoodie_size           text,
  tee_size              text,

  -- the draw itself
  drawn_at              timestamptz not null default now(),
  draw_date             date not null default current_date,
  -- the RANDOM.ORG result page for the drawn number
  draw_verification_url text,
  random_number         bigint,
  method                text not null default 'random.org-weighted',
  total_entries         int  not null default 0,
  entrant_count         int  not null default 0,
  note                  text,

  -- the winning entry
  entry_id              uuid,
  entry_method          text,
  entry_date            timestamptz,

  -- notification ladder
  alternate_rank        int  not null default 1 check (alternate_rank >= 1),
  notification_date     date,
  attempt_number        int  not null default 1 check (attempt_number between 1 and 3),
  -- notification_date + 7 days
  response_deadline     date,

  -- status + timestamps
  status                text not null default 'notified'
                          check (status in ('notified', 'docs_sent', 'docs_returned', 'paid', 'forfeited')),
  notified_at           timestamptz,
  docs_sent_at          timestamptz,
  docs_returned_at      timestamptz,
  paid_at               timestamptz,
  forfeited_at          timestamptz,
  w9_status             text not null default 'not_needed'
                          check (w9_status in ('not_needed', 'requested', 'received')),

  created_at            timestamptz not null default now()
);

create unique index if not exists draws_rank_per_giveaway on draws (giveaway_id, alternate_rank);
create index if not exists draws_created_idx on draws (created_at desc);

-- Shop orders. One row per PAID Stripe checkout session, which is also what
-- gets turned into a DRAFT Printful order (never confirmed from code — the
-- owner reviews and pays for it in the Printful dashboard).
--
-- status_detail is a short reason code / message for the owner. It deliberately
-- never carries secrets, tokens, or the buyer's address.
--
-- updated_at has a default but no trigger, matching the rest of this schema:
-- the application sets it on write.
create table if not exists orders (
  id                    uuid primary key default uuid_generate_v4(),

  -- Stripe. UNIQUE session id → a webhook retry cannot create a second order.
  -- A plain UNIQUE (not partial) so ON CONFLICT (stripe_session_id) inference
  -- works for the webhook's idempotent insert.
  stripe_session_id     text not null unique,
  stripe_payment_intent text,

  -- buyer
  email                 text,
  name                  text,
  phone                 text,

  -- shipping address, as Stripe collected it
  ship_line1            text,
  ship_line2            text,
  ship_city             text,
  ship_state            text,
  ship_postal_code      text,
  ship_country          text,

  -- what was bought: [{ slug, name, size, qty, variant_id }, …]
  items                 jsonb not null default '[]'::jsonb,

  -- money, in cents, exactly as Stripe reported it
  amount_subtotal       int,
  amount_total          int,
  currency              text default 'usd',

  -- fulfilment state
  --   new           → stored, Printful draft not attempted yet
  --   needs_variant → no Printful sync variant mapped for a line item
  --   draft_created → draft order exists in Printful, awaiting owner
  --   error         → something failed; see status_detail
  status                text not null default 'new'
                          check (status in ('new', 'needs_variant', 'draft_created', 'error')),
  status_detail         text,

  -- Printful
  printful_order_id     text,
  -- the short order number shown to the owner and to Printful: `LX` + the first
  -- 10 hex chars of sha256(stripe_session_id), uppercased. At most 32 chars,
  -- and NEVER the Stripe session id itself.
  printful_external_id  text unique,

  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- The owner's order list reads newest first.
create index if not exists orders_created_idx on orders (created_at desc);
-- Finding the rows that still need attention (needs_variant / error).
create index if not exists orders_status_idx  on orders (status);

alter table subscribers enable row level security;
alter table entries     enable row level security;
alter table draws       enable row level security;
alter table orders      enable row level security;
-- No policies added on purpose → locked to the service_role key only.

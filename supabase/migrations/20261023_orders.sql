-- ─────────────────────────────────────────────────────────────
-- LOOTIX orders — one row per PAID Stripe checkout session
--
-- DO NOT RUN THIS AUTOMATICALLY. Review it, then paste it into
-- Supabase → SQL Editor → Run, once. It is written to be idempotent, so a
-- second run is a no-op.
--
-- What it adds:
--   1. orders: the fulfilment record for a paid checkout — Stripe ids, buyer
--      contact, shipping address, the line items as jsonb, the money, and the
--      Printful draft-order ids.
--   2. orders: UNIQUE(stripe_session_id) so a Stripe webhook retry cannot
--      create a second order, and UNIQUE(printful_external_id) so the same
--      short order number cannot be sent to Printful twice.
--   3. orders: a status check — new | needs_variant | draft_created | error.
--   4. Indexes on created_at desc (the owner's newest-first list) and status
--      (finding the rows that still need attention).
--   5. RLS stays ON with no policies, so only the service_role key can read or
--      write any of it.
--
-- Printful orders are created as DRAFTS only (never confirmed from code); the
-- owner reviews and pays for them in the Printful dashboard.
--
-- Notes on purpose:
--   * status_detail holds a short reason code / message for the owner. It must
--     never carry secrets, tokens, or the buyer's address.
--   * printful_external_id is the short order number (`LX` + the first 10 hex
--     chars of sha256(stripe_session_id), uppercased) — at most 32 characters,
--     and NEVER the Stripe session id itself, because Printful treats the
--     external id as a user-visible reference.
--   * updated_at has a default but NO trigger: the other migrations in this
--     repo use no trigger pattern, so the application sets updated_at on write.
--   * created_at / updated_at are NOT NULL here, matching entries, subscribers
--     and draws. The app never writes them explicitly, so the defaults apply.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ── 1. Orders ────────────────────────────────────────────────
create table if not exists orders (
  id                    uuid primary key default uuid_generate_v4(),

  -- Stripe
  stripe_session_id     text not null,
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
  status                text not null default 'new',
  -- short, non-PII reason code / message. Never secrets, never addresses.
  status_detail         text,

  -- Printful
  printful_order_id     text,
  -- short order number, <= 32 chars; never the Stripe session id
  printful_external_id  text,

  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- One paid session can only ever produce one order.
--
-- A plain unique index, not a partial one: the webhook relies on
-- ON CONFLICT (stripe_session_id) inference to make retries a no-op, and
-- Postgres cannot infer a conflict target from a partial index.
create unique index if not exists orders_stripe_session_id_key
  on orders (stripe_session_id);

-- The short order number is the reference the owner and Printful both see, so
-- it has to be unique. NULLs are distinct in Postgres, so rows that have not
-- reached Printful yet are still allowed.
create unique index if not exists orders_printful_external_id_key
  on orders (printful_external_id);

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'orders_status_check') then
    alter table orders add constraint orders_status_check
      check (status in ('new', 'needs_variant', 'draft_created', 'error')) not valid;
    alter table orders validate constraint orders_status_check;
  end if;
end $$;

-- The owner's order list reads newest first.
create index if not exists orders_created_idx on orders (created_at desc);
-- Finding the rows that still need attention (needs_variant / error).
create index if not exists orders_status_idx  on orders (status);

-- ── 2. Lock it to the service_role key ───────────────────────
alter table orders enable row level security;
-- No policies added on purpose → the anon/public key cannot touch this table.

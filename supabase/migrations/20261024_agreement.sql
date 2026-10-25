-- LOOTIX agreement record (Legal, 2026-10-24)
--
-- DO NOT RUN THIS AUTOMATICALLY. Review it, then paste it into
-- Supabase -> SQL Editor -> Run, once. Idempotent: a second run is a no-op.
--
-- Adds to entries and orders: when the person ticked the required box, which
-- document version(s) they agreed to, and which box (checkout / signup).
-- No IP address is stored. Until this runs, the app retries inserts without
-- these columns (entries keep a copy in meta.agreement; orders keep it only in
-- the Stripe session metadata).

alter table public.entries add column if not exists agreed_at timestamptz;
alter table public.entries add column if not exists agreement_version text;
alter table public.entries add column if not exists agreement_box text;

alter table public.orders add column if not exists agreed_at timestamptz;
alter table public.orders add column if not exists agreement_version text;
alter table public.orders add column if not exists agreement_box text;

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'entries_agreement_box_check') then
    alter table public.entries add constraint entries_agreement_box_check
      check (agreement_box is null or agreement_box in ('checkout', 'signup'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'orders_agreement_box_check') then
    alter table public.orders add constraint orders_agreement_box_check
      check (agreement_box is null or agreement_box in ('checkout', 'signup'));
  end if;
end $$;
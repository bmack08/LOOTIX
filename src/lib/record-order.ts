// ─────────────────────────────────────────────────────────────
// Paid Stripe session → order row → Printful DRAFT.
//
// SERVER-SIDE ONLY: this module pulls in src/lib/orders.ts (which reads
// SUPABASE_SERVICE_ROLE_KEY) and src/utils/printful.ts (which reads
// PRINTFUL_API). Keep every import of this file inside a route handler.
//
// The one rule here: recordPaidOrder NEVER THROWS and never changes the
// webhook's response. A paid order that cannot be stored is a problem for the
// owner to see in the logs, not a reason to hand Stripe a 500 and have the
// entries path replayed forever.
//
// DRAFTS ONLY. createDraftOrder creates an unconfirmed Printful order and
// nothing in this file confirms or pays for one — the owner does that in the
// Printful dashboard.
//
// LOGGING: the short order number, a status and a reason code. Never the
// session object, the email, the phone, the address or anything from a header.
// ─────────────────────────────────────────────────────────────

import type Stripe from 'stripe';
import { agreementFromMetadata } from '@/config/agreement';
import { printfulVariantFor } from '@/config/printful-variants';
import { ONE_SIZE } from '@/config/sizes';
import { insertOrderIfNew, ordersDbConfigured, shortOrderNumber } from '@/lib/orders';
import type { NewOrder, OrderItem } from '@/lib/orders';
import { createDraftOrder } from '@/utils/printful';

/**
 * How long we are willing to wait for the Printful draft before letting the
 * webhook get on with answering Stripe.
 *
 * Printful's own call in createDraftOrder is capped at 15s per request, which
 * is longer than Stripe is happy to wait for a webhook response. Losing the
 * race does not cancel the draft — the attempt carries on and writes its own
 * outcome to the row; we simply stop waiting for it.
 */
const DRAFT_TIMEOUT_MS = 8000;

/** Trim to a stored value, or null when there is nothing worth storing. */
function text(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

/** A positive whole quantity; anything unusable counts as one. */
function qtyOf(value: unknown): number {
  const n = typeof value === 'number' ? Math.floor(value) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 1;
}

/**
 * The session's compact `slug:size:qty,...` fallback, as set by
 * /api/checkout. Only used for a line whose product metadata did not survive.
 */
function parseCompactItems(raw: unknown): { slug: string; size: string; qty: number }[] {
  if (typeof raw !== 'string' || !raw.trim()) return [];

  const parsed: { slug: string; size: string; qty: number }[] = [];
  for (const chunk of raw.split(',')) {
    const [rawSlug, rawSize, rawQty] = chunk.split(':');
    const slug = text(rawSlug);
    if (!slug) continue;
    const qty = Number.parseInt((rawQty || '').trim(), 10);
    parsed.push({
      slug,
      size: text(rawSize)?.toUpperCase() || ONE_SIZE,
      qty: Number.isFinite(qty) && qty > 0 ? qty : 1,
    });
  }
  return parsed;
}

/**
 * The expanded product on a line item, when there is one to read.
 *
 * price.product is `string | Product | DeletedProduct`: a bare id when the
 * expand did not apply, and a DeletedProduct (which has no name and no
 * metadata) for a product that has since been removed.
 */
function productOf(line: Stripe.LineItem): Stripe.Product | null {
  const product = line.price?.product;
  if (!product || typeof product !== 'object') return null;
  if ('deleted' in product) return null;
  return product;
}

/**
 * One order line per Stripe line item.
 *
 * {slug, size} comes from the per-line product metadata that /api/checkout
 * sets — the primary channel. A line that lost it falls back to the compact
 * session metadata at the same position: both lists are built from the same
 * line_items array in the same order, so the positions line up.
 *
 * A line that resolves to neither is still stored, as slug 'unknown' / size
 * 'ONE'. That lands the order in needs_variant for the owner to look at, which
 * is the point — a paid line is never dropped to make the row look tidy.
 */
function itemsFromLines(lines: Stripe.LineItem[], fallback: { slug: string; size: string; qty: number }[]): OrderItem[] {
  return lines.map((line, index) => {
    const product = productOf(line);
    const metaSlug = text(product?.metadata?.slug);
    const metaSize = text(product?.metadata?.size);
    const spare = fallback[index];

    const slug = metaSlug || spare?.slug || 'unknown';
    const size = (metaSize || spare?.size || ONE_SIZE).toUpperCase();

    return {
      slug,
      name: text(product?.name) || text(line.description) || slug,
      size,
      qty: qtyOf(line.quantity ?? spare?.qty),
      variant_id: printfulVariantFor(slug, size),
    };
  });
}

/** The compact fallback on its own, for the odd session that lists no lines. */
function itemsFromCompact(fallback: { slug: string; size: string; qty: number }[]): OrderItem[] {
  return fallback.map((entry) => ({
    slug: entry.slug,
    name: entry.slug,
    size: entry.size,
    qty: entry.qty,
    variant_id: printfulVariantFor(entry.slug, entry.size),
  }));
}

/**
 * Store a PAID checkout session as an order, then try to create its Printful
 * draft. Safe to call again for the same session: the row is keyed on
 * stripe_session_id and a row that already reached Printful is left alone.
 *
 * Does not throw. Does not report anything back — the row is the record.
 */
export async function recordPaidOrder(stripe: Stripe, session: Stripe.Checkout.Session): Promise<void> {
  // The short order number is the only safe handle on this order for a log
  // line, so compute it first and use it everywhere below.
  const orderNumber = shortOrderNumber(session.id);

  try {
    if (!ordersDbConfigured()) {
      console.warn(`[orders] Supabase is not configured — paid order ${orderNumber} was NOT stored`);
      return;
    }

    // ── the buyer and where it ships ──

    // In this SDK (22.3.2, API 2026-06-24.dahlia) the collected shipping
    // address lives at collected_information.shipping_details and there is no
    // top-level session.shipping_details. The cast below is purely defensive:
    // a webhook endpoint pinned to an older API version in the Stripe
    // dashboard still sends the old top-level shape.
    const collected = session.collected_information?.shipping_details ?? null;
    const legacy = collected
      ? null
      : (session as unknown as { shipping_details?: { name?: string | null; address?: Stripe.Address | null } | null })
          .shipping_details ?? null;
    const shipping = collected ?? legacy;
    const address = shipping?.address ?? null;

    const paymentIntent = session.payment_intent;

    // ── what was bought ──

    const fallback = parseCompactItems(session.metadata?.items);

    let items: OrderItem[] = [];
    let status: NewOrder['status'] = 'new';
    let statusDetail: string | null = null;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
        expand: ['data.price.product'],
      });
      const lines = Array.isArray(lineItems?.data) ? lineItems.data : [];
      items = lines.length ? itemsFromLines(lines, fallback) : itemsFromCompact(fallback);
    } catch {
      // Stripe would not tell us what was in the order. The row is still
      // written — a paid order must never be lost because of this call — with
      // a reason code the owner can act on by opening the session in Stripe.
      items = [];
      status = 'error';
      statusDetail = 'line_items_unavailable';
      console.error(`[orders] could not list line items for order ${orderNumber} — storing it with no items`);
    }

    const row: NewOrder = {
      stripe_session_id: session.id,
      stripe_payment_intent:
        typeof paymentIntent === 'string' ? paymentIntent : text(paymentIntent?.id),

      email: text(session.customer_details?.email ?? session.customer_email),
      name: text(shipping?.name) ?? text(session.customer_details?.name),
      phone: text(session.customer_details?.phone),

      ship_line1: text(address?.line1),
      ship_line2: text(address?.line2),
      ship_city: text(address?.city),
      ship_state: text(address?.state),
      ship_postal_code: text(address?.postal_code),
      ship_country: text(address?.country),

      items,

      amount_subtotal: session.amount_subtotal ?? null,
      amount_total: session.amount_total ?? null,
      currency: text(session.currency),

      status,
      status_detail: statusDetail,

      printful_order_id: null,
      printful_external_id: orderNumber,

      ...(agreementFromMetadata(session.metadata) ?? {}),
    };

    const stored = await insertOrderIfNew(row);
    if ('error' in stored) {
      console.error(`[orders] paid order ${orderNumber} was NOT stored: ${stored.error}`);
      return;
    }

    const order = stored.order;
    console.log(
      `[orders] order ${orderNumber}: ${stored.created ? 'stored' : 'already stored (duplicate event)'} with ${order.items.length} line(s)`,
    );

    // Already through to Printful on an earlier delivery of this event → there
    // is nothing left to do, and nothing that should be done twice.
    if (order.printful_order_id || order.status === 'draft_created') {
      console.log(`[orders] order ${orderNumber}: Printful draft already exists — nothing to do`);
      return;
    }

    // No items means the listing above failed. createDraftOrder could only
    // overwrite 'line_items_unavailable' with its own 'no_items', so leave the
    // row with the reason that actually explains it.
    if (!order.items.length) return;

    await raceDraft(order, orderNumber);
  } catch {
    // Belt and braces. Nothing in this function is allowed to reach the
    // webhook, so even an unexpected throw stops here. The error itself is not
    // logged: it can carry the session, and with it the buyer's details.
    console.error(`[orders] recording paid order ${orderNumber} failed unexpectedly`);
  }
}

/**
 * Wait up to DRAFT_TIMEOUT_MS for the Printful draft.
 *
 * On timeout the attempt is left running — it writes its own outcome to the
 * row — and the webhook gets its response back to Stripe on time.
 */
async function raceDraft(order: Parameters<typeof createDraftOrder>[0], orderNumber: string): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const draft = createDraftOrder(order).then(
    (result) => result.status,
    // createDraftOrder does not throw, but this promise outlives the race, so
    // it must never be able to become an unhandled rejection.
    () => 'error' as const,
  );

  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), DRAFT_TIMEOUT_MS);
    // Don't hold the process open just for this timer.
    timer.unref?.();
  });

  try {
    const status = await Promise.race([draft, timeout]);
    if (status === null) {
      console.warn(
        `[orders] order ${orderNumber}: Printful draft is taking too long — carrying on, the row keeps its own status`,
      );
      return;
    }
    console.log(`[orders] order ${orderNumber}: Printful draft attempt finished as ${status}`);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

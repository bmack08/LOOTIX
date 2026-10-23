// ─────────────────────────────────────────────────────────────
// /admin/orders — the owner's read-only order list.
//
// STRICTLY READ-ONLY. This page renders stored rows and nothing else: no
// forms, no server actions, no buttons, no fetches that change anything.
// Confirming and paying for a Printful draft happens in the Printful
// dashboard, by hand, by the owner — never from here.
//
// Street address and phone are stored on the row but deliberately NOT shown:
// the email and the short order number are enough to find an order, and
// Printful/Stripe already hold the address.
// ─────────────────────────────────────────────────────────────

import { isAuthed, adminConfigured } from '@/lib/admin';
import AdminLogin from '@/components/lootix/AdminLogin';
import {
  listOrders,
  ordersDbConfigured,
  NO_ORDERS_DB,
  ORDER_STATUSES,
  type OrderItem,
  type OrderRow,
  type OrderStatus,
} from '@/lib/orders';
import { unmappedPurchasableKeys } from '@/config/printful-variants';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Lootix Orders', robots: { index: false, follow: false } };

const CARD = { background: '#111113', border: '1px solid rgba(255,255,255,.08)' } as const;
const WARN = { background: 'rgba(220,140,60,.07)', border: '1px solid rgba(220,140,60,.4)' } as const;

/** Badge colours, drawn from the palette the rest of the admin area uses. */
const STATUS_STYLE: Record<OrderStatus, React.CSSProperties> = {
  new: { color: '#8E8A82', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.14)' },
  needs_variant: { color: '#e0a86b', background: 'rgba(220,140,60,.07)', border: '1px solid rgba(220,140,60,.4)' },
  draft_created: { color: '#C9A94A', background: 'rgba(212,175,55,.08)', border: '1px solid rgba(212,175,55,.3)' },
  error: { color: '#f0837d', background: 'rgba(220,38,38,.08)', border: '1px solid rgba(220,38,38,.4)' },
};

const DASH = '—';

/**
 * `2026-10-23 14:05 UTC`.
 *
 * Fixed to UTC rather than a locale string so the server and the browser can
 * never disagree about what it says, and so two rows are always comparable.
 */
function utcStamp(iso: string | null): string {
  if (!iso) return DASH;
  const at = new Date(iso);
  if (Number.isNaN(at.getTime())) return DASH;
  return `${at.toISOString().slice(0, 16).replace('T', ' ')} UTC`;
}

/** `Guild Hoodie — Black · M · 1` */
function itemLine(item: OrderItem): string {
  const qty = Number.isFinite(item?.qty) ? String(item.qty) : '?';
  return [item?.name || item?.slug || 'unknown item', item?.size || DASH, qty].join(' · ');
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className="font-mono text-[10.5px] tracking-[.1em] uppercase rounded-tier px-2 py-1 whitespace-nowrap"
      style={STATUS_STYLE[status] ?? STATUS_STYLE.new}
    >
      {status}
    </span>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="font-mono text-[10px] tracking-[.14em] uppercase text-muted-2">{label}</div>
      <div className="font-mono text-[12px] text-cream break-words">{value}</div>
    </div>
  );
}

function OrderCard({ order }: { order: OrderRow }) {
  return (
    <div className="rounded-card p-5" style={CARD}>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
        <div className="min-w-0">
          <div className="font-archivo font-bold text-[15px] text-cream break-all">
            {order.printful_external_id || DASH}
          </div>
          <div className="font-mono text-[11px] text-muted-2">{utcStamp(order.created_at)}</div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="font-mono text-[12px] text-cream mb-4">
        {order.items.length === 0 ? (
          <span className="text-muted-2">No items recorded</span>
        ) : (
          order.items.map((item, i) => (
            <div key={`${item?.slug ?? 'item'}-${item?.size ?? ''}-${i}`} className="break-words">
              {itemLine(item)}
            </div>
          ))
        )}
      </div>

      <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <Field label="Buyer email" value={order.email || DASH} />
        <Field label="Printful order" value={order.printful_order_id || DASH} />
      </div>

      {order.status_detail && (
        <div className="font-mono text-[11px] mt-4 break-words" style={{ color: STATUS_STYLE[order.status]?.color ?? '#8E8A82' }}>
          {order.status_detail}
        </div>
      )}
    </div>
  );
}

export default async function AdminOrdersPage() {
  // Auth first. Nothing order-related is read or rendered above this gate.
  if (!adminConfigured()) {
    return (
      <div className="max-w-[640px] mx-auto px-6 py-24">
        <div className="rounded-card p-7" style={WARN}>
          <h1 className="font-archivo font-black uppercase text-cream text-[22px] mb-3">Admin is disabled</h1>
          <p className="font-archivo text-[14px] text-muted m-0">
            <code className="text-cream">ADMIN_PASSWORD</code> is not set on the server, so there is no admin login. Set it in the
            environment and redeploy. There is no default password.
          </p>
        </div>
      </div>
    );
  }

  if (!(await isAuthed())) return <AdminLogin />;

  const live = ordersDbConfigured();
  const result = live ? await listOrders() : { error: NO_ORDERS_DB };
  const orders = 'orders' in result ? result.orders : [];
  const loadError = 'error' in result ? result.error : null;

  const counts = ORDER_STATUSES.map((status) => ({
    status,
    count: orders.filter((o) => o.status === status).length,
  }));
  const unmapped = unmappedPurchasableKeys();

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-16">
      <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
        <div>
          <div className="lx-eyebrow mb-2">Lootix Admin</div>
          <h1 className="font-archivo font-black uppercase text-cream text-[34px] leading-none">Orders</h1>
        </div>
        <a href="/admin" className="link-gold font-mono text-[11px]">
          ← The Vault
        </a>
      </div>

      {/* The one thing the owner must know on this screen. */}
      <div className="rounded-tier px-5 py-4 mb-6" style={{ background: 'rgba(212,175,55,.08)', border: '1px solid rgba(212,175,55,.3)' }}>
        <p className="font-archivo font-bold text-[14px] m-0" style={{ color: '#C9A94A' }}>
          Drafts only: confirm and pay in the Printful dashboard
        </p>
        <p className="font-mono text-[11px] text-muted-2 m-0 mt-1 break-all">
          <a href="https://www.printful.com/dashboard/store" target="_blank" rel="noopener noreferrer" className="link-gold font-mono text-[11px]">
            printful.com/dashboard/store
          </a>
        </p>
      </div>

      {/* Counts by status */}
      <div className="rounded-tier px-5 py-4 mb-6 flex flex-wrap items-center gap-x-5 gap-y-2" style={CARD}>
        <span className="font-mono text-[11px] tracking-[.12em] uppercase text-muted-2">
          {orders.length} order{orders.length === 1 ? '' : 's'}
        </span>
        {counts.map(({ status, count }) => (
          <span key={status} className="font-mono text-[11px] whitespace-nowrap" style={{ color: STATUS_STYLE[status].color }}>
            {status} {count}
          </span>
        ))}
      </div>

      {unmapped.length > 0 && (
        <div className="rounded-card p-5 mb-6" style={WARN}>
          <p className="font-archivo text-[13.5px] m-0" style={{ color: '#e0a86b' }}>
            ⚠ {unmapped.length} shop size{unmapped.length === 1 ? '' : 's'} have no Printful variant id yet (see
            <code className="text-cream"> src/config/printful-variants.ts</code>). Orders for those sizes are stored with status{' '}
            <code className="text-cream">needs_variant</code> and no Printful draft is created.
          </p>
        </div>
      )}

      {loadError && (
        <div className="rounded-card p-5 mb-6" style={WARN}>
          <p className="font-archivo text-[13.5px] m-0" style={{ color: '#e0a86b' }}>
            ⚠ {loadError}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {!loadError && orders.length === 0 && (
          <div className="rounded-card p-6" style={CARD}>
            <p className="font-archivo text-[14px] text-muted m-0">No orders stored yet.</p>
          </div>
        )}
        {orders.map((order) => (
          <OrderCard key={order.id ?? order.stripe_session_id} order={order} />
        ))}
      </div>
    </div>
  );
}

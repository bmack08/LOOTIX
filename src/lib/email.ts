import 'server-only';
import { NO_PURCHASE_LINE, FREE_ENTRY_URL, FREE_ENTRY_LINK_TEXT } from '@/config/giveaway';
import { COMPANY_ADDRESS } from '@/config/legal';

// Sends transactional email via Resend when RESEND_API_KEY is set.
// No-ops (logs) otherwise, so the app works before email is provisioned.

const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || 'Lootix <onboarding@resend.dev>';
const REPLY_TO = process.env.EMAIL_REPLY_TO || 'admin@getlootix.com';

async function send(to: string, subject: string, html: string) {
  if (!KEY) {
    // Dev no-op. Deliberately logs no recipient — winner and mail-in
    // addresses are personal data and must never reach the logs.
    console.log(`[email:dev] skipped (no RESEND_API_KEY): "${subject}"`);
    return { ok: true, dev: true };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to, reply_to: REPLY_TO, subject, html }),
    });
    // Status only. Resend quotes the offending `to` address back in its
    // validation errors, so logging the body would put a winner's or
    // subscriber's email address in the logs.
    if (!res.ok) console.error('Resend failed with status', res.status);
    return { ok: res.ok };
  } catch (e) {
    console.error('Resend error:', e instanceof Error ? e.message : 'request failed');
    return { ok: false };
  }
}

/**
 * Every entry-related email carries the standard no-purchase line and a link
 * to the free mail-in entry method, with the exact same wording as the site
 * (NO_PURCHASE_LINE in src/config/giveaway.ts), plus the sender's physical
 * postal address, which CAN-SPAM requires on every commercial message.
 */
const shell = (inner: string) => `
  <div style="background:#0a0a0b;color:#f4f0e6;font-family:Arial,Helvetica,sans-serif;padding:32px;border-radius:14px;max-width:520px;margin:auto">
    <div style="font-weight:900;letter-spacing:.3em;font-size:20px;color:#f4f0e6;margin-bottom:24px">LOOTIX</div>
    ${inner}
    <p style="color:#6b675f;font-size:11px;margin-top:28px;line-height:1.6">
      ${NO_PURCHASE_LINE}
      <a href="${FREE_ENTRY_URL}" style="color:#e0b83c">${FREE_ENTRY_LINK_TEXT}</a>.
      18+. See the Official Rules for full details.
    </p>
    <p style="color:#6b675f;font-size:11px;margin-top:12px;line-height:1.6">${COMPANY_ADDRESS}</p>
  </div>`;

/**
 * Confirmation email. `entries` of 0 means no entry was created — the
 * giveaway hasn't opened (or has closed), so this email must NOT say
 * "you're entered".
 */
export function sendWelcome(to: string, entries: number) {
  if (entries <= 0) {
    return send(
      to,
      "You're on the Lootix list",
      shell(`
        <h1 style="font-size:24px;font-weight:900;text-transform:uppercase;margin:0 0 12px">You're on the list.</h1>
        <p style="color:#b7b2a8;font-size:15px;line-height:1.6;margin:0 0 16px">
          You'll get drop alerts and first access to limited gear. The next giveaway hasn't opened yet —
          we'll email you the moment entries are live. The
          <a href="${FREE_ENTRY_URL}" style="color:#e0b83c">free mail-in entry method</a> is in the Official Rules.
        </p>
        <a href="https://getlootix.com/shop" style="display:inline-block;background:#e0b83c;color:#0a0a0b;font-weight:800;text-decoration:none;padding:14px 24px;border-radius:5px;text-transform:uppercase;font-size:13px;letter-spacing:.06em">Shop the Drop</a>
      `),
    );
  }
  return send(
    to,
    "You're entered — Lootix Loot Vault",
    shell(`
      <h1 style="font-size:24px;font-weight:900;text-transform:uppercase;margin:0 0 12px">You're in the vault.</h1>
      <p style="color:#b7b2a8;font-size:15px;line-height:1.6;margin:0 0 16px">
        You've locked in <strong style="color:#f0ce6b">${entries} ${entries === 1 ? 'entry' : 'entries'}</strong>
        for the launch giveaway — <strong style="color:#f4f0e6">$250 cash plus a custom Lootix hoodie and tee</strong>.
      </p>
      <p style="color:#b7b2a8;font-size:14px;line-height:1.6;margin:0 0 16px">
        Want more? Every $1 you spend is 1 more entry, and free entry is always available by mail —
        <a href="${FREE_ENTRY_URL}" style="color:#e0b83c">see the Official Rules</a>.
      </p>
      <a href="https://getlootix.com/shop" style="display:inline-block;background:#e0b83c;color:#0a0a0b;font-weight:800;text-decoration:none;padding:14px 24px;border-radius:5px;text-transform:uppercase;font-size:13px;letter-spacing:.06em">Shop the Drop</a>
    `),
  );
}

export function sendWinner(to: string, prize: string) {
  return send(
    to,
    '🏆 You won the Lootix Loot Vault',
    shell(`
      <h1 style="font-size:24px;font-weight:900;text-transform:uppercase;margin:0 0 12px;color:#f0ce6b">You won.</h1>
      <p style="color:#b7b2a8;font-size:15px;line-height:1.6;margin:0 0 16px">
        Your name was drawn from the vault. You've won <strong style="color:#f4f0e6">${prize}</strong>.
        Reply to this email to claim your prize — we'll verify and pay out fast.
      </p>
    `),
  );
}

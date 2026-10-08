import 'server-only';

// Sends transactional email via Resend when RESEND_API_KEY is set.
// No-ops (logs) otherwise, so the app works before email is provisioned.

const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || 'Lootix <onboarding@resend.dev>';
const REPLY_TO = process.env.EMAIL_REPLY_TO || 'admin@getlootix.com';

async function send(to: string, subject: string, html: string) {
  if (!KEY) {
    console.log(`[email:dev] would send "${subject}" → ${to}`);
    return { ok: true, dev: true };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to, reply_to: REPLY_TO, subject, html }),
    });
    if (!res.ok) console.error('Resend failed', res.status, await res.text());
    return { ok: res.ok };
  } catch (e) {
    console.error('Resend error', e);
    return { ok: false };
  }
}

const shell = (inner: string) => `
  <div style="background:#0a0a0b;color:#f4f0e6;font-family:Arial,Helvetica,sans-serif;padding:32px;border-radius:14px;max-width:520px;margin:auto">
    <div style="font-weight:900;letter-spacing:.3em;font-size:20px;color:#f4f0e6;margin-bottom:24px">LOOTIX</div>
    ${inner}
    <p style="color:#6b675f;font-size:11px;margin-top:28px;line-height:1.6">
      No purchase necessary to enter or win; a purchase does not improve your chances. One entry per order.
      Open to legal US residents, 18+. Void where prohibited. See the
      <a href="https://getlootix.com/official-rules" style="color:#e0b83c">Official Rules</a>
      for the free mail-in entry method with equal odds.
    </p>
  </div>`;

export function sendWelcome(to: string, entries: number) {
  const label = `${entries.toLocaleString()} ${entries === 1 ? 'entry' : 'entries'}`;
  return send(
    to,
    "You're entered — Lootix Loot Vault",
    shell(`
      <h1 style="font-size:24px;font-weight:900;text-transform:uppercase;margin:0 0 12px">You're in the vault.</h1>
      <p style="color:#b7b2a8;font-size:15px;line-height:1.6;margin:0 0 16px">
        You've locked in <strong style="color:#f0ce6b">${label}</strong> for the launch giveaway —
        <strong style="color:#f4f0e6">$250 cash + a free merch bundle</strong>.
      </p>
      <a href="https://getlootix.com/#shop" style="display:inline-block;background:#e0b83c;color:#0a0a0b;font-weight:800;text-decoration:none;padding:14px 24px;border-radius:5px;text-transform:uppercase;font-size:13px;letter-spacing:.06em">Shop the Drop</a>
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

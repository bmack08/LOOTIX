import { test, expect } from '@playwright/test';

/**
 * Checkout, in Stripe TEST MODE only.
 *
 * The app returns 503 "Stripe not configured" when STRIPE_SECRET_KEY or
 * STRIPE_WEBHOOK_SECRET is missing, so that response is used as the capability
 * probe: it tells us whether to run or skip without reading any env value.
 *
 * ⚠️ NEVER point this suite at live keys. It would create real charges. The
 * guard below refuses to run unless the publishable key is a test key.
 */

/** True when the server has both Stripe secrets set. */
async function stripeConfigured(request: import('@playwright/test').APIRequestContext) {
  // An unsigned POST: 503 means "not configured", 400 means "configured but
  // this request is not signed" — which is the answer we want.
  const res = await request.post('/api/stripe/webhook', { data: {} });
  return res.status() !== 503;
}

test.describe('checkout (Stripe test mode)', () => {
  test('creates a test-mode checkout session', async ({ request }) => {
    test.skip(
      !(await stripeConfigured(request)),
      'SKIPPED: STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET are not set, so checkout cannot be exercised. Add Stripe TEST keys and re-run.',
    );

    const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';
    test.skip(
      publishable.startsWith('pk_live'),
      'REFUSED: a live Stripe key is configured. This suite must only ever run against test keys.',
    );

    const res = await request.post('/api/checkout', {
      data: { items: [{ slug: 'guild-hoodie-black', qty: 1 }] },
    });

    expect(res.status(), await res.text()).toBe(200);
    const body = await res.json();
    expect(body.url, 'checkout should return a Stripe session URL').toMatch(
      /^https:\/\/checkout\.stripe\.com\//,
    );
  });

  test('the webhook refuses an unsigned request', async ({ request }) => {
    test.skip(
      !(await stripeConfigured(request)),
      'SKIPPED: Stripe keys are not set (see above).',
    );

    // Signature verification is the only thing stopping a stranger POSTing
    // themselves an entry, so an unsigned request must never be accepted.
    const res = await request.post('/api/stripe/webhook', { data: { type: 'checkout.session.completed' } });
    expect([400, 401]).toContain(res.status());
  });
});

test.describe('checkout surface without keys', () => {
  test('the cart page loads and the checkout API fails closed', async ({ page, request }) => {
    await page.goto('/cart');
    await expect(page.locator('body')).toBeVisible();

    const res = await request.post('/api/checkout', { data: { items: [] } });
    // Either not configured (503) or a rejected empty cart (4xx) — never a 500,
    // and never a 200 that silently charges nothing.
    expect(res.status(), 'checkout must fail closed, not 500').not.toBe(500);
    expect(res.status()).not.toBe(200);
  });

  test('the webhook never grants an entry to an unsigned caller', async ({ request }) => {
    const res = await request.post('/api/stripe/webhook', {
      data: { type: 'checkout.session.completed', data: { object: { id: 'cs_fake', payment_status: 'paid' } } },
    });
    // 503 when unconfigured, 400 when configured-but-unsigned. Never 200.
    expect([400, 401, 503]).toContain(res.status());
  });
});

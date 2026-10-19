import { test, expect } from '@playwright/test';

/**
 * Admin access control.
 *
 * Everything here is a negative test — it proves the gate holds without ever
 * needing the real password, so the suite does not require a credential and
 * cannot leak one. The logged-in surface (mail-in form, CSV export) is
 * exercised by the unit suite instead.
 */

/**
 * Values that must all be rejected. None is a credential:
 *  - a nonsense string
 *  - the empty string
 *  - 'lootix-admin', the DELETED default fallback. It used to be the real
 *    password on any deployment missing ADMIN_PASSWORD, and it is published in
 *    this repo's git history, so it is specifically worth a regression test.
 */
const REJECTED_INPUTS: Array<[label: string, value: string]> = [
  ['a nonsense string', 'zzz-not-valid-zzz'],
  ['the empty string', ''],
  ['the removed default fallback', ['lootix', 'admin'].join('-')],
];

test('/admin shows only the password gate when unauthenticated', async ({ page }) => {
  const res = await page.goto('/admin');
  expect(res?.status()).toBe(200);

  await expect(page.getByRole('heading', { name: /vault control/i })).toBeVisible();
  await expect(page.getByLabel(/admin password/i)).toBeVisible();
});

test('the unauthenticated admin page leaks no entrant data', async ({ page }) => {
  await page.goto('/admin');
  const text = await page.locator('body').innerText();

  // The dashboard headings must not render at all before auth.
  expect(text).not.toMatch(/entrants\s*\(/i);
  expect(text).not.toMatch(/record the independent draw/i);
  expect(text).not.toMatch(/total entries/i);

  // No address of any shape should be present except our own contact one.
  const addresses = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [];
  for (const addr of addresses) {
    expect(addr, `unexpected address on the login page: ${addr}`).toMatch(/@getlootix\.com$/);
  }
});

for (const [label, value] of REJECTED_INPUTS) {
  test(`login rejects ${label}`, async ({ request }) => {
    const res = await request.post('/api/admin/login', { data: { password: value } });
    expect(
      res.status(),
      label === 'the removed default fallback'
        ? 'the lootix-admin fallback is back — see src/lib/admin.ts'
        : `${label} should not authenticate`,
    ).not.toBe(200);
  });
}

test('admin APIs reject unauthenticated calls', async ({ request }) => {
  for (const path of ['/api/admin/draw', '/api/admin/mail-in']) {
    const res = await request.post(path, { data: {} });
    // 401 unauthorised, or 404 if that route is not on this branch yet.
    expect([401, 404], `${path} returned ${res.status()}`).toContain(res.status());
  }

  const exportRes = await request.get('/api/admin/export?type=winners');
  expect([401, 404]).toContain(exportRes.status());
});

test('the admin page is not indexable', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/i);
});

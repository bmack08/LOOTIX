import { test, expect } from '@playwright/test';

/**
 * Every public route answers, the legal documents are reachable, and the
 * retired routes redirect instead of 404ing.
 */

const PAGES = [
  '/',
  '/shop',
  '/giveaways',
  '/winners',
  '/about',
  '/faq',
  '/official-rules',
  '/cart',
];

/**
 * These exist as standalone documents and must NOT be folded into
 * /official-rules or /faq. They were once permanent (301) redirects, which
 * browsers and crawlers cache hard, leaving the site with no reachable Terms
 * or Privacy document at all.
 */
const LEGAL_PAGES = ['/terms', '/privacy', '/returns', '/shipping', '/contact', '/accessibility'];

/** Retired routes → where each must land. */
const REDIRECTS: Record<string, string> = {
  '/quick-entries': '/giveaways',
  '/mens': '/shop',
  '/womens': '/shop',
  '/new-drops': '/shop',
  '/products': '/shop',
};

for (const path of PAGES) {
  test(`${path} responds 200 and renders`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status(), `${path} should be 200`).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });
}

for (const path of LEGAL_PAGES) {
  test(`${path} serves its own document, not a redirect`, async ({ request }) => {
    const res = await request.get(path, { maxRedirects: 0 });
    expect(res.status(), `${path} must serve directly — see next.config.js`).toBe(200);
  });
}

for (const [from, to] of Object.entries(REDIRECTS)) {
  test(`${from} redirects to ${to}`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 });
    expect([301, 307, 308]).toContain(res.status());
    expect(res.headers()['location']).toBe(to);
  });
}

test('no page logs a console error', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  for (const path of ['/', '/shop', '/giveaways', '/official-rules']) {
    await page.goto(path);
  }
  expect(errors, errors.join('\n')).toHaveLength(0);
});

test('the footer links to the real legal documents', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  for (const href of ['/terms', '/privacy', '/official-rules']) {
    await expect(footer.locator(`a[href="${href}"]`).first()).toBeAttached();
  }
});

import { test, expect } from '@playwright/test';

/**
 * Entry-rule claims as a visitor actually sees them.
 *
 * The arithmetic is unit-tested in scripts/test-entry-rules.cjs; what matters
 * here is that no page still advertises a rule the system does not implement.
 * Advertising entries that are never granted is the kind of claim that
 * invalidates a sweepstakes, so these read as compliance checks, not copy nits.
 *
 * Read-only by design: nothing here POSTs to /api/subscribe, because with
 * Supabase credentials present that writes to the real project.
 */

/** Claims that must appear nowhere on the site any more. */
const FORBIDDEN = [
  /60\s*entries/i,
  /150\s*entries/i,
  /350\s*entries/i,
  /3,?000\s*entries/i,
  /25\s*(free\s*)?(bonus\s*)?entries/i,
  /bonus\s*entries/i,
  /\bbest\s*odds\b/i,
  /\bbetter\s*odds\b/i,
  /bigger\s*(your\s*)?odds/i,
  /stack\s*your\s*entries/i,
  /every\s*\$?1\s*=/i,
  /per\s*dollar/i,
  /\d+\s*X\s*ENTRIES/i,
  /entry\s*multiplier/i,
];

const SURFACES = ['/', '/shop', '/giveaways', '/about', '/faq', '/official-rules'];

for (const path of SURFACES) {
  test(`${path} makes no multiplier or bonus-entry claim`, async ({ page }) => {
    await page.goto(path);
    const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
    for (const pattern of FORBIDDEN) {
      expect(text, `${path} still claims ${pattern}`).not.toMatch(pattern);
    }
  });
}

test('the homepage states one entry per order', async ({ page }) => {
  await page.goto('/');
  const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
  expect(text).toMatch(/1\s*entry|one\s*entry/i);
  expect(text).toMatch(/no purchase necessary/i);
});

test('the free mail-in route is advertised with equal odds', async ({ page }) => {
  await page.goto('/');
  const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
  // Equal odds between the paid and free routes is what makes this lawful, so
  // it has to be stated, not implied.
  expect(text).toMatch(/equal odds|same odds/i);
});

test('product cards carry no per-item entry count', async ({ page }) => {
  await page.goto('/shop');
  const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
  // "+100 entries" style badges are gone; only the per-order rule may appear.
  expect(text).not.toMatch(/\+\s*\d+\s*entries/i);
});

test('the Official Rules state an 8:00 PM ET close', async ({ page }) => {
  await page.goto('/official-rules');
  const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');
  expect(text).toMatch(/8:00\s*PM\s*ET/i);
});

test('the Official Rules carry no unfilled placeholder', async ({ page }) => {
  await page.goto('/official-rules');
  const text = await page.locator('body').innerText();
  // Catches "[start date]", "[STREET ADDRESS]", "[COUNTY]" etc. before launch.
  expect(text, 'an unfilled [placeholder] is still in the Rules').not.toMatch(/\[[a-z\s]+\]/i);
});

test('the Quick Entries concept is gone from the navigation', async ({ page }) => {
  await page.goto('/');
  // The retired page sold buyable/grindable entries. Any surviving link to it
  // would now bounce the visitor, so there should be none.
  await expect(page.locator('a[href="/quick-entries"]')).toHaveCount(0);
});

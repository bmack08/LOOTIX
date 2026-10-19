import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the Lootix beta checks.
 *
 * @playwright/test is NOT in package.json — adding a dependency needs the
 * owner's sign-off. Install it first:
 *
 *   npm install -D @playwright/test
 *   npx playwright install chromium
 *   npm run test:e2e
 *
 * The suite builds and serves the app itself (see `webServer`), so it runs
 * against the production build rather than `next dev`.
 *
 * ⚠️ These specs are deliberately READ-ONLY against anything that persists.
 * If SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are present in .env.local, the
 * app writes to the real Supabase project — so no spec here POSTs to
 * /api/subscribe or /api/admin/mail-in. Entry-granting behaviour is covered by
 * the unit suites (`npm test`), which touch no network at all.
 */
export default defineConfig({
  testDir: './e2e',
  // A failing beta check should be loud, not retried into green.
  retries: 0,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never', outputFolder: '.playwright-report' }]],
  use: {
    baseURL: process.env.LOOTIX_BASE_URL || 'http://localhost:3210',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  // Skip the managed server when pointing at an already-running instance.
  webServer: process.env.LOOTIX_BASE_URL
    ? undefined
    : {
        command: 'npm run build && npm run start -- -p 3210',
        url: 'http://localhost:3210',
        reuseExistingServer: !process.env.CI,
        timeout: 300_000,
      },
});

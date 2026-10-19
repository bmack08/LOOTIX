# PROJECT.md — Lootix (engineering facts for Claude Code)

Verified from the repo on 2026-09-25 (package.json, node_modules, file tree, grep). Items marked TODO were not verified — check before relying on them. The orchestrator rules are in `CLAUDE.md`; this file is the technical ground truth. Update it when facts change.

## What it is
Giveaway-driven streetwear e-commerce site (per `.claude/business-context.md`; that file is partly stale — see "Known doc drift").
Repo: https://github.com/bmack08/LOOTIX · default branch `main`.

## Stack (verified)
| Piece | Declared (package.json) | Installed (node_modules) |
|---|---|---|
| next | ^16.0.7 | 16.0.7 |
| react / react-dom | ^18.2.0 | react 18.3.1 |
| stripe (Node SDK) | ^22.3.2 | 22.3.2 |
| typescript | ^5.0.0 | TODO |
| tailwindcss | ^3.4.17 | TODO |
| eslint / eslint-config-next | ^8.0.0 / 14.1.0 | TODO |

- App Router: `src/app/` (pages include about, admin, api, cart, collections, contact, faq, giveaways, membership, order, product(s), shop, terms, winners, …).
- Supabase: **yes, via REST, no SDK.** `supabase/schema.sql` exists ("Paste this into Supabase SQL Editor"); `src/lib/raffle.ts` says it uses Supabase REST when `SUPABASE_URL` + key are set; `src/app/admin/page.tsx` imports `usingSupabase` from `@/lib/raffle`. `@supabase/supabase-js` is NOT a dependency and not installed.
- Email: `RESEND_API_KEY` in env templates; `src/components/lootix/v2/EmailCapture.tsx` posts to `/api/subscribe` (comment: Supabase-backed, grants entries + welcome email). TODO: confirm the route implementation.
- Env var NAMES (never values): `.env.example` → SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, EMAIL_FROM, EMAIL_REPLY_TO. `.env.local` additionally has SUPABASE_PUBLISHABLE_KEY and ADMIN_PASSWORD. No STRIPE_* variable in either file (TODO: where does the Stripe key come from?).

## Commands (from package.json)
- `npm run dev` — next dev
- `npm run build` — next build (the main correctness gate today)
- `npm run start` — next start
- `npm run lint` — `next lint`. TODO: verify it still runs on Next 16 (check output; Next may have removed `next lint`).
- Tests: **none** — no test script, no test runner in dependencies. Verification = build + manual/Playwright checks (see `.claude/commands/qa.md`).

## Verify before "done"
1. `npm run build` passes with 0 errors.
2. The changed route renders (dev server + Playwright MCP screenshot, or curl for API routes).
3. For Supabase/Stripe/auth changes: follow the `supabase-rls-audit` / `stripe-integration-check` skills.

## Watch-outs (verified facts, decisions pending)
- Next 16 with React 18.3.1: TODO — check `node_modules/next/package.json` `peerDependencies` to confirm React 18 is supported for the App Router in 16.x.
- `eslint-config-next` is 14.1.0 while next is 16.0.7 — version mismatch.
- Both `.eslintrc.json` and `eslint.config.mjs`, and both `postcss.config.js` and `postcss.config.mjs` exist — which one is active is TODO.
- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS: it must only be used in server code. TODO: audit `src/lib/raffle.ts` call sites.
- Large binaries sit in the repo root (`Rave-x64-Setup-1.18.14.exe` ~162 MB, `redesign-handoff.zip` ~22 MB, `GetLootix Website Evaluation.zip` ~14 MB). TODO: check whether they are tracked by git (`git ls-files`).
- `reference/` holds three third-party example stores (clothing-store-main, jamstack-ecommerce-next, next-ecommerce-master) — don't edit or import from them.

## Known doc drift
`.claude/business-context.md` says "No Database", "No Payments", React 18.2.0. The repo has a Supabase schema + data layer, the `stripe` package, and React 18.3.1 installed. Ask the owner before rewriting business-context.md.

## Claude setup in this repo
`CLAUDE.md` (CEO orchestrator), `.claude/agents/` (frontend-worker, api-worker, qa-worker, security-auditor, agent-creator, agent-updater), `.claude/protocols/`, `.claude/commands/qa.md`, `.claude/settings.local.json` (prettier PostToolUse hook). No `.claude/frozen.json`. Global agents/hooks in `~/.claude` also apply.

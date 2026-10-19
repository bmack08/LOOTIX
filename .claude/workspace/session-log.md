# Session Log — Lootix

> Running log of what was done each session. CEO writes an entry at the end of every session.
> **Read this at the start of every session to pick up where you left off.**

---

## 2026-03-12 — Printify Integration + Agent System Rebuild

### Objective
Owner requested two things: (1) build the Printify API integration module, (2) reorganize the entire `.claude/` agent system from TaleForge VTT to Lootix.

### What Was Done

**Printify Integration:**
- Created `src/types/printify.ts` — full TypeScript types for Printify API
- Created `src/utils/printify.ts` — service module with full upload → create → publish pipeline, plus orders and catalog browsing
- Created 3 API routes: `/api/printify/catalog`, `/api/printify/products`, `/api/printify/drop`
- Added `images-api.printify.com` to `next.config.js` remote patterns
- Build verified: all routes registered, zero errors

**Agent System Rebuild:**
- Rewrote `CLAUDE.md` from TaleForge VTT to Lootix CEO orchestrator
- Rewrote `.claude/business-context.md` with full Lootix project context
- Rewrote `.claude/iteration-plan.md` with Lootix priority queue (P0–P6)
- Rewrote `.claude/agents/_registry.md` — 4 active agents, 7 retired TaleForge agents
- Created `api-worker.md` — new agent for Next.js API routes and integrations
- Rewrote `frontend-worker.md` for Next.js/React/Tailwind (was React/Canvas/Three.js)
- Rewrote `qa-worker.md` for Next.js build verification (was FastAPI/SQLite)
- Rewrote `security-auditor.md` for Lootix e-commerce security (was TaleForge VTT)
- Deleted 6 TaleForge-only agents: Dev Lead, Backend Worker, DevOps, Docs Writer, Test Writer, Researcher
- Deleted TaleForge workspace artifacts (gap-analysis/)
- Updated QA command for Lootix
- Cleaned settings.local.json (removed TaleForge-specific permissions)

### What's In Progress
- Nothing — both tasks complete

### Blocked / Needs Owner Input
- Need `PRINTIFY_API_TOKEN` and `PRINTIFY_SHOP_ID` to test the integration
- Database technology choice needed for P1 (Supabase, Prisma+Postgres, etc.)

### Next Steps
- Add Printify credentials to `.env.local` and test catalog browsing
- Lock in blueprint/provider/variant IDs for the first drop
- Begin P1: database setup for entries, users, memberships

---

## 2026-09-23 — Legal docs rewrite (benchmarked vs lvlup.us)

### What Was Done
- Gap analysis vs lvlup.us legal pages; rewrote in original wording (no copying).
- New `src/config/legal.ts` (single source: sponsor, address, AMOE counts, effective date).
- Rewrote Official Rules (Part A general / Part B current giveaway), Terms (arbitration + 30-day opt-out, auto-renewal, chargebacks, DMCA), Privacy (state rights, GPC, retention), Returns (entry forfeiture, chargebacks). New /accessibility page.
- Sitewide: removed false "60 entries per $1", "independent third party / drawn live", "Launch Vault", "best odds" claims; footer Terms/Privacy/Accessibility links.
- Checkout restricted to US shipping. /quick-entries redirects to / (its entry + bonus-entry UI was fake, client-side only).
- Build passes. NOT committed.

### Blocked / Needs Owner Input
- Fill `[STREET ADDRESS]`, `[COUNTY]`, `[START DATE]` in src/config/legal.ts.
- Register DMCA agent with US Copyright Office; attorney review before launch.
- AMOE set at 25 entries/card, 1 card/day (legally must be comparable to purchase entries).
- Follow-up: sponsor address filled (212 Whirlaway Lane, Havre de Grace, MD 21078; Harford County). Shipping page made US-only.
- Launch Readiness tracker (all blockers + 34 launch questions): https://claude.ai/artifact/CUKfq58VKfgWpezTsgCoyC — start date = public launch day (tracked there as L1).

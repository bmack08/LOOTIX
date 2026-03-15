# Business Context — Lootix

> **This file defines the current project. Read it at the start of every session.**

---

## Project Overview

**Name:** Lootix
**Type:** Giveaway-driven streetwear e-commerce platform with print-on-demand fulfillment
**Owner:** Mack

Lootix is a direct-to-consumer streetwear brand where every purchase earns giveaway entries. AI-generated designs flow from a ComfyUI pipeline into Printify for print-on-demand production. The platform handles product browsing, membership tiers, giveaway mechanics, and automated order fulfillment — all without traditional inventory.

---

## Product Identity

**What It Does:**
- Streetwear storefront with product browsing, filtering, and collections
- Giveaway system: every dollar spent = entries into prize drawings (60x multiplier events)
- Membership tiers (Free/Bronze/Silver/Gold) with escalating perks
- Print-on-demand fulfillment via Printify API (upload → create → publish pipeline)
- Product catalog synced from Printful (legacy) and Printify (primary)
- Quick entry forms for giveaway participation

**Target Users:**
- Primary: Streetwear enthusiasts who like winning free stuff
- Secondary: Giveaway hunters looking for legitimate entry opportunities

**Design Philosophy:**
- Dark theme, bold typography (Oswald + Inter)
- Urgency-driven UI (countdown timers, entry multipliers, limited drops)
- Mobile-first, fast loading

---

## Tech Stack

**Framework:** Next.js 16.0.7 (App Router) + React 18.2.0 + TypeScript 5.0
**Styling:** Tailwind CSS 3.4.17 with custom theme (earth tones, urgency animations)
**Build:** Next.js built-in (Turbopack)
**Hosting:** TBD (Vercel likely)

**No Backend Framework** — Next.js API routes handle all server logic.
**No Database** — Not yet configured. Will be needed for entries, users, memberships.
**No Auth** — Not yet implemented.
**No Payments** — Stripe planned but not integrated.

---

## Integrations

| Service | Status | Purpose |
|---------|--------|---------|
| **Printify API** | ✅ Wired (needs credentials) | Primary POD — upload, create, publish, orders |
| **Printful API** | ✅ Wired (needs credentials) | Legacy product sync |
| **Stripe** | ❌ Planned | Membership payments, checkout |
| **Email service** | ❌ Planned | Waitlist, notifications, winner alerts |
| **ComfyUI** | ✅ External | AI design generation (feeds images to Printify) |

---

## Current Development State

**UI: ~90% complete.** All pages exist and render.
**Backend: ~20% complete.** API routes for Printify/Printful exist. No database, auth, payments, or form handlers.

### What's Built
- All public pages (home, shop, products, collections, about, rules, giveaway, membership, quick-entries)
- Product detail pages with variant selection and entry calculator
- Printify service module: full upload → create → publish pipeline (`src/utils/printify.ts`)
- Printful service module: product fetching (`src/utils/printful.ts`)
- API routes: `/api/products`, `/api/printify/catalog`, `/api/printify/products`, `/api/printify/drop`
- Membership tier UI with comparison table and waitlist modal
- Giveaway config system with entry multiplier logic
- Component library: Header, Footer, Hero, FeaturedProducts, CategoryGrid, ProductCard, etc.

### What's Stubbed / TODO
- `EmailSignup.tsx` — console.log instead of real API call
- `WaitlistModal.tsx` — console.log instead of POST to /api/waitlist
- `AddToCart.tsx` — TODO: implement checkout
- `QuickEntryForm.tsx` — TODO: POST to /api/entries
- No `/api/entries` endpoint
- No `/api/waitlist` endpoint
- No `/api/checkout` endpoint
- No user accounts or authentication
- No database for persistence

### Dead Links (linked in nav/footer but no page.tsx exists)
- `/faq`, `/privacy`, `/terms`, `/how-it-works`, `/past-winners` — footer links, no pages
- `/cart` — nav icon, no cart page
- `/mens`, `/womens`, `/new-drops` — nav + footer links, no pages
- Footer has placeholder address: "[Street Address]", "[City, State ZIP]"

### Missing Trust Signals (identified via 80eighty comparison)
- No reviews/testimonials section
- No social proof (follower counts, embedded feeds)
- No past winners gallery
- No contact page
- No returns/exchanges or shipping policy pages
- No search functionality
- No tiered Quick Entry products (80eighty has 6 tiers with escalating multipliers)
- No mega menu for nav categories
- No BBB accreditation badge (80eighty displays theirs in footer)
- No "Add to Cart" from homepage product cards (requires navigation to product page)
- No sold out / inventory indicators on product cards
- No clearance or youth categories
- `/about` page exists but needs founder story for personal connection

---

## Key File Paths

| Area | Path | Notes |
|------|------|-------|
| App entry | `src/app/layout.tsx` | Root layout (Oswald + Inter fonts) |
| Home page | `src/app/page.tsx` | Landing page |
| API routes | `src/app/api/` | All backend endpoints |
| — Printify | `src/app/api/printify/` | catalog, products, drop pipeline |
| — Products | `src/app/api/products/` | Printful product fetch |
| Components | `src/components/` | All React components |
| — Products | `src/components/products/` | ProductGrid, Gallery, Filters, AddToCart, SizeChart |
| — Membership | `src/components/membership/` | TierCard, Comparison, FAQ, WaitlistModal |
| — Quick entries | `src/components/quick-entries/` | EntryForm, GiveawayGrid, BonusActions |
| Services | `src/utils/` | Printify + Printful API clients |
| Types | `src/types/` | TypeScript interfaces (index, printify, printful, giveaway, membership) |
| Config | `src/config/giveaway.ts` | Giveaway settings, entry math |
| Static data | `src/data/` | dummyProducts, membershipTiers |

---

## Environment Variables

```
# Printify (primary POD)
PRINTIFY_API_TOKEN=
PRINTIFY_SHOP_ID=

# Printful (legacy sync)
PRINTFUL_API=
PRINTFUL_STORE_ID=

# Future
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## Architectural Constraints

1. **Next.js App Router only** — no Pages Router, no separate backend
2. **No database yet** — adding one is a near-term priority (likely Supabase or Prisma + Postgres)
3. **TypeScript strict** — all new code must be typed
4. **Tailwind only** — no CSS modules, no styled-components
5. **Native fetch** — no axios, no external HTTP clients
6. **Environment variables** for all secrets — never hardcoded

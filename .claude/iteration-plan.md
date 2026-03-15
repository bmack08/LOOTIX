# Iteration Plan — Lootix

> **Current development roadmap. Updated as priorities shift.**

---

## Current Status: UI ~90%, Backend ~20%

All pages render. Product integrations (Printify/Printful) are wired but need credentials. Everything else on the backend is missing. Site evaluation against 80eighty.com revealed dead links, missing trust signals, and commerce gaps that need addressing before launch.

---

## Priority Queue

### P0 — Printify Integration (Active)
- ✅ Service module built: upload → create → publish pipeline
- ✅ API routes: `/api/printify/catalog`, `/api/printify/products`, `/api/printify/drop`
- ✅ Order creation for giveaway fulfillment
- ⬜ Add Printify API token + Shop ID to `.env.local`
- ⬜ Test catalog browsing and lock in blueprint/provider/variant IDs
- ⬜ Test full drop pipeline end-to-end
- ⬜ Get real product images flowing from Printify (replace placeholder product data)
- **Owner:** API Worker

### P1 — Dead Link Pages (Pre-Launch Blocker)
These pages are linked from nav/footer but have no `page.tsx` yet:
- ⬜ `/faq` — Frequently asked questions (linked in footer, critical for "is this legit?" trust)
- ⬜ `/privacy` — Privacy policy (footer Legal section, legally required)
- ⬜ `/terms` — Terms of service (footer Legal section, legally required)
- ⬜ `/how-it-works` — Standalone how-it-works page (footer Info section)
- ⬜ `/past-winners` — Past winners gallery (footer Info section, critical trust signal)
- ⬜ `/cart` — Shopping cart page (nav icon, needed for checkout flow)
- ⬜ `/mens` — Men's collection filter (nav + footer)
- ⬜ `/womens` — Women's collection filter (nav + footer)
- ⬜ `/new-drops` — New drops page (footer, could redirect to `/shop`)
- ⬜ Fill in placeholder business address in footer ("[Street Address]", "[City, State ZIP]")
- **Owner:** Frontend Worker

### P2 — Trust & Credibility Signals
The biggest gap vs. 80eighty — what separates "looks like a giveaway site" from "looks legitimate":
- ⬜ Reviews/testimonials section on homepage (start with beta tester quotes)
- ⬜ Social proof: display follower counts or embedded social feed on homepage
- ⬜ Past Winners page populated once first giveaway completes (photos, names, prizes)
- ⬜ Contact Us page (80eighty has one — builds trust)
- ⬜ Returns & Exchanges policy page (needed once selling)
- ⬜ Shipping policy page (needed once selling)
- ⬜ BBB accreditation badge in footer (major trust signal — 80eighty displays theirs prominently)
- ⬜ Enhance `/about` page with founder story (personal connection builds legitimacy)
- **Owner:** Frontend Worker

### P3 — Quick Entry Products & Commerce
- ⬜ Create tiered Quick Entry packs as purchasable products (like 80eighty: Base → Elite, $10-$100 range, escalating multipliers)
- ⬜ Add search functionality to nav bar (80eighty has search with trending products)
- ⬜ "Add to Cart" directly from homepage product cards (faster conversion)
- ⬜ Sold out / inventory indicators on product cards (creates scarcity)
- ⬜ Mega menu dropdowns for nav categories (Mens → Shirts, Hoodies, Bottoms, etc.)
- ⬜ Consider clearance section for deals/urgency
- ⬜ Consider youth category for broader audience reach
- **Owner:** Frontend Worker + API Worker

### P4 — Database & Persistence
- Choose and configure a database (Supabase, Prisma + Postgres, or PlanetScale)
- Schema: users, giveaway_entries, waitlist, orders, memberships
- Wire up existing form stubs to real endpoints
- **Owner:** API Worker

### P5 — Giveaway Entry System
- Build `/api/entries` endpoint
- Persist entries to database with entry multiplier math
- Connect `QuickEntryForm.tsx` to real backend
- Tiered multiplier system (not just flat 60x — higher-spend packs get higher multipliers)
- Entry history and validation
- **Owner:** API Worker + Frontend Worker

### P6 — User Authentication
- Auth system (NextAuth.js, Clerk, or Supabase Auth)
- Protected routes for membership features
- User profile with entry history
- **Owner:** API Worker + Frontend Worker

### P7 — Payments (Stripe)
- Stripe checkout for product purchases
- Membership subscription billing
- Entry calculation on successful payment
- Wire `AddToCart.tsx` to real checkout flow
- **Owner:** API Worker + Frontend Worker

### P8 — Email & Notifications
- Email service (Resend, SendGrid, or Postmark)
- Waitlist signup (`/api/waitlist`)
- Newsletter signup (`EmailSignup.tsx`)
- Winner notification emails
- Order/shipping notification via Printify webhooks
- **Owner:** API Worker

### P9 — Admin & Operations
- Admin dashboard for giveaway management
- Winner selection logic
- Automated fulfillment (Printify order on winner selection)
- Analytics and entry tracking
- **Owner:** Future iteration

---

## Completed

### Iteration 0 — Foundation
- Next.js 16 project with App Router + TypeScript
- Tailwind CSS theming (dark mode, earth tones, urgency animations)
- All public pages: home, shop, products, about, rules, giveaway, membership, quick-entries, collections
- Component library: Header, Footer, Hero, FeaturedProducts, CategoryGrid, ProductCard, etc.

### Iteration 1 — Product Integration
- Printful API client and product sync
- Printify full pipeline: upload → create → publish + order creation
- API routes for catalog browsing, product management, drop automation
- Product detail pages with variant selection
- Collections pages with category filtering

### Iteration 2 — Giveaway UI
- Giveaway config system with entry multiplier logic (60x events)
- Quick entry forms with bonus action tracking
- Entry calculator on product pages
- Countdown timer and urgency UI elements

### Iteration 3 — Membership UI
- 4-tier membership system (Free/Bronze/Silver/Gold)
- Tier comparison table
- Feature breakdown per tier
- Waitlist modal (UI only — backend pending)

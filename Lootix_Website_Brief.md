# LOOTIX WEBSITE REBUILD BRIEF
## Technical Specification for Web Development

**Project:** Lootix Website Rebuild  
**Platform:** Next.js 14+ on Vercel  
**Current URL:** https://getlootix.com  
**Date:** January 2026  

---

# SECTION 1: PROJECT OVERVIEW

## 1.1 What Lootix Is

Lootix is a giveaway-driven streetwear brand. The business model works like this:

1. Customers can enter giveaways for FREE (via mail-in method) or by making purchases
2. Every $1 spent = entries into the current giveaway (multiplied by promotional multipliers like 60x, 120x)
3. A $50 hoodie purchase during a 60x promotion = 3,000 entries
4. Prizes are gaming-related: custom PC builds, gift cards, collectibles, peripherals
5. This model is proven by 80eighty.com which generates ~$820K/month

## 1.2 Brand Positioning

**Current brand expression (WRONG):** Indoor tabletop gaming, D&D dice, basement gamer aesthetic

**Target brand expression (CORRECT):** Epic, strong, outdoors adventure gaming lifestyle. Think: a gamer who also hikes, camps, and rejects the sedentary stereotype. Premium streetwear you'd wear on a mountain trail or at a LAN party.

**Tagline:** "Look cool and get cool shit"

**This means:**
- NO: Neon colors, RGB gaming aesthetics, fantasy fonts, dungeon imagery
- YES: Earth tones, outdoor photography, clean typography, adventure/explorer influence

## 1.3 Target Audience

- Age: 18-40 years old
- Interests: Gaming, anime, collectibles, but also fitness and outdoor activities
- Mindset: Wants to look fashionable without being stereotypically "nerdy"
- Behavior: Comfortable with online shopping, responds to urgency and FOMO, values authenticity

---

# SECTION 2: CRITICAL ISSUES TO FIX

These issues exist on the current site and MUST be fixed. They break trust and kill conversions.

## 2.1 Broken Countdown Timer

**Current state:** Timer displays `00 DAYS | 00 HOURS | 00 MINS | 00 SECS`  
**Why it's broken:** Either non-functional JavaScript or pointing to a past date  
**Required fix:** 
- Implement functional countdown that accepts a target date
- Timer must update every 1 second
- When time remaining < 24 hours, numbers turn red (#DC2626) and pulse
- Display the actual end date above the timer: "Giveaway Ends [Month Day, Year]"
- When timer reaches zero, display "GIVEAWAY ENDED" or redirect to next giveaway

## 2.2 Outdated Dates

**Current state:** References to "December 15, 2024" and similar past dates  
**Required fix:**
- Search entire codebase for hardcoded dates: `grep -r "2024" --include="*.tsx" --include="*.ts" --include="*.json"`
- Replace with either:
  - Dynamic dates pulled from a config/CMS
  - Future dates (minimum 30 days from current date)
- Create a centralized giveaway config file for easy date management

## 2.3 Typo in Meta Description

**Current state:** "Legendary Irems" appears in meta description  
**Required fix:** Change to "Legendary Items"  
**Location to check:** `<meta name="description">` tag, likely in layout.tsx or head component

## 2.4 Fake Winner Avatars

**Current state:** Winner section uses Dicebear-generated avatars (api.dicebear.com URLs)  
**Why this is fatal:** Savvy users recognize AI-generated avatars instantly. This screams "scam" to anyone familiar with sweepstakes.  
**Required fix:** 
- Remove the fake winners section entirely
- Replace with "Be Our First Winner" launch messaging:

```
Section heading: "BE OUR FIRST WINNER"
Body text: "We're launching soon! Enter our inaugural giveaway for your chance to make history as a Lootix winner. Real prizes. Real winners. Real soon."
CTA button: "ENTER NOW"
```

- Once real winners exist, display actual photos of real people with their prizes

## 2.5 Missing Physical Address

**Current state:** No business address in footer  
**Why it matters:** Sweepstakes require a physical address for legal compliance. Missing address = looks illegitimate.  
**Required fix:** Add to footer:

```
Lootix LLC
[Street Address]
[City, State ZIP]
hello@getlootix.com
```

*Note: Owner must provide actual address. Use placeholder text that's obviously placeholder.*

## 2.6 Stock Photography

**Current state:** Product and prize images are Unsplash stock photos (identifiable by URL patterns)  
**Required fix:** 
- Replace with actual product photography when available
- Until then, use placeholder boxes with "Product Image Coming Soon" text
- Never use stock photos that could appear on other sites

## 2.7 Inconsistent Entry Messaging

**Current state:** Homepage says "100% Free to Enter" but About page explains purchase-based entries  
**Required fix:** Consistent messaging across all pages:

```
Primary message: "FREE ENTRY + BONUS ENTRIES WITH EVERY PURCHASE"
Explanation: "Enter for free via mail, or multiply your chances with every order. $1 spent = [X] entries during [current multiplier]x events."
```

---

# SECTION 3: DESIGN SYSTEM SPECIFICATIONS

## 3.1 Color Palette

### Primary Backgrounds
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Deep Navy | #1A1A2E | `--bg-primary` | Main page background, body |
| Midnight Blue | #16213E | `--bg-secondary` | Cards, elevated surfaces, input backgrounds |
| True Dark | #0F0F1A | `--bg-dark` | Header, footer, hero overlays, modal backgrounds |

### Earth Tone Accents (Brand Differentiator)
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Forest Green | #2D5016 | `--accent-forest` | Success states, verified badges, positive indicators |
| Saddle Brown | #8B4513 | `--accent-earth` | Borders, dividers, card outlines on hover |
| Rust/Sienna | #A0522D | `--accent-rust` | Hover states, selected items, active states |
| Stone Gray | #708090 | `--accent-stone` | Disabled states, inactive elements |

### Action Colors (Conversion-Optimized)
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Amber/Gold | #D97706 | `--cta-primary` | ALL primary CTA buttons (Enter Now, Add to Cart, Shop Now) |
| Dark Amber | #B45309 | `--cta-hover` | Primary CTA hover state |
| Urgency Red | #DC2626 | `--urgency` | Countdown timer when <24h, low stock warnings, sale badges |
| Trust Blue | #1D4ED8 | `--trust` | Payment icons, security badges, verified checkmarks |
| Success Green | #16A34A | `--success` | Form success states, confirmed messages |

### Text Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Off-White | #F5F5F5 | `--text-primary` | Headlines, primary text, important content |
| Muted Silver | #B8B8B8 | `--text-secondary` | Body text, descriptions, secondary content |
| Gray | #6B7280 | `--text-muted` | Captions, timestamps, fine print, placeholders |

## 3.2 Typography

### Font Families
| Usage | Font Stack | CSS Variable | Google Fonts Import |
|-------|------------|--------------|---------------------|
| Headlines | 'Oswald', 'Bebas Neue', sans-serif | `--font-display` | `Oswald:wght@400;500;600;700` |
| Body Text | 'Inter', 'Roboto', sans-serif | `--font-body` | `Inter:wght@400;500;600;700` |

### Type Scale
| Element | Mobile Size | Desktop Size | Weight | Line Height | Letter Spacing | Font Family |
|---------|-------------|--------------|--------|-------------|----------------|-------------|
| Hero H1 | 36px | 64px | 700 | 1.1 | -0.02em | Display |
| Section H2 | 28px | 42px | 700 | 1.2 | -0.01em | Display |
| Card H3 | 20px | 24px | 600 | 1.3 | 0 | Display |
| Body Large | 18px | 20px | 400 | 1.6 | 0 | Body |
| Body | 16px | 18px | 400 | 1.6 | 0 | Body |
| Body Small | 14px | 14px | 400 | 1.5 | 0 | Body |
| Caption | 12px | 12px | 400 | 1.4 | 0.02em | Body |
| Button | 14px | 16px | 600 | 1.0 | 0.05em | Body |
| Badge | 11px | 12px | 700 | 1.0 | 0.05em | Body |

### Typography Rules
- Headlines: UPPERCASE for hero and section titles, Title Case for card headings
- Body: Sentence case
- Buttons: UPPERCASE always
- Badges: UPPERCASE always
- Never use fantasy/gaming fonts (no medieval, runic, or pixel fonts)
- Never use more than 2 font families on a page

## 3.3 Spacing System

Based on 8px grid. All spacing values must be multiples of 8px (with 4px for tight situations).

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon padding, inline element gaps |
| `--space-sm` | 8px | Button icon gaps, tight padding |
| `--space-md` | 16px | Card padding, form field spacing |
| `--space-lg` | 24px | Section internal padding, card margins |
| `--space-xl` | 32px | Component gaps, grid gutters |
| `--space-2xl` | 48px | Section padding (mobile) |
| `--space-3xl` | 64px | Section padding (desktop) |
| `--space-4xl` | 96px | Major section breaks |

## 3.4 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Buttons, badges, small inputs |
| `--radius-md` | 8px | Cards, modals, dropdowns |
| `--radius-lg` | 16px | Feature cards, hero elements |
| `--radius-full` | 9999px | Pills, avatars, circular buttons |

## 3.5 Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Buttons, inputs at rest |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.4)` | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.5)` | Modals, popovers |
| `--shadow-glow` | `0 0 20px rgba(217,119,6,0.3)` | CTA button hover glow |

## 3.6 Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| Mobile | 0 - 639px | Single column, stacked layouts |
| Tablet | 640px - 1023px | 2-column grids, side-by-side |
| Desktop | 1024px - 1279px | Full layouts |
| Large | 1280px+ | Max-width containers, extra spacing |

**Container max-width:** 1280px with 16px padding on mobile, 24px on tablet, 32px on desktop.

---

# SECTION 4: COMPONENT SPECIFICATIONS

## 4.1 Primary CTA Button

**Used for:** Enter Giveaway, Add to Cart, Shop Now, Submit

| Property | Value |
|----------|-------|
| Background | #D97706 (`--cta-primary`) |
| Background (hover) | #B45309 (`--cta-hover`) |
| Text color | #FFFFFF |
| Font | 600 weight, 16px, UPPERCASE |
| Letter spacing | 0.05em |
| Padding | 16px 32px (desktop), 14px 24px (mobile) |
| Border radius | 4px |
| Min height | 48px (desktop), 44px (mobile) |
| Min touch target | 44px × 44px (critical for mobile) |
| Transition | all 0.2s ease-in-out |
| Hover shadow | 0 0 20px rgba(217,119,6,0.3) |
| Cursor | pointer |
| Display | inline-flex, align-items: center, justify-content: center |

**States:**
- Default: Background #D97706
- Hover: Background #B45309 + glow shadow
- Active/Pressed: Background #92400E, transform: scale(0.98)
- Disabled: Background #708090, cursor: not-allowed, opacity: 0.6

## 4.2 Secondary Button

**Used for:** Browse, Learn More, View All, Cancel

| Property | Value |
|----------|-------|
| Background | transparent |
| Border | 2px solid #D97706 |
| Text color | #D97706 |
| Font | 600 weight, 16px, UPPERCASE |
| Letter spacing | 0.05em |
| Padding | 14px 30px (account for border) |
| Border radius | 4px |
| Min height | 48px |
| Transition | all 0.2s ease-in-out |

**States:**
- Default: As above
- Hover: Background rgba(217,119,6,0.1), border #B45309
- Active: Background rgba(217,119,6,0.2)
- Disabled: Border #708090, text #708090, opacity: 0.6

## 4.3 Countdown Timer

**Used for:** Hero section, giveaway page, announcement bar

### Container
- Display: flex
- Gap: 16px (desktop), 12px (mobile)
- Justify-content: center
- Align-items: center

### Time Block (each of: Days, Hours, Mins, Secs)
| Property | Value |
|----------|-------|
| Width | 80px (desktop), 60px (mobile) |
| Height | 80px (desktop), 60px (mobile) |
| Background | #16213E (`--bg-secondary`) |
| Border radius | 8px |
| Display | flex, flex-direction: column, align-items: center, justify-content: center |

### Time Number
| Property | Value |
|----------|-------|
| Font family | Oswald (`--font-display`) |
| Font size | 36px (desktop), 24px (mobile) |
| Font weight | 700 |
| Color | #F5F5F5 (normal), #DC2626 (urgent <24h) |

### Time Label
| Property | Value |
|----------|-------|
| Font family | Inter (`--font-body`) |
| Font size | 12px |
| Font weight | 400 |
| Color | #6B7280 (`--text-muted`) |
| Text transform | uppercase |
| Letter spacing | 0.1em |
| Margin top | 4px |

### Urgency State (when remaining time < 24 hours)
- Number color changes to #DC2626
- Add CSS animation: pulse (opacity 1 → 0.7 → 1, 1.5s infinite)
- Optional: Add subtle red glow to blocks

### End Date Label (above timer)
- Text: "Giveaway Ends [Month Day, Year]"
- Font: Inter, 14px, 400 weight
- Color: #6B7280
- Text transform: uppercase
- Letter spacing: 0.05em
- Margin bottom: 16px

## 4.4 Product Card

**Used for:** Shop grid, featured products, quick entries

### Card Container
| Property | Value |
|----------|-------|
| Background | #16213E |
| Border | 1px solid rgba(139,69,19,0.3) |
| Border radius | 8px |
| Overflow | hidden |
| Transition | all 0.2s ease-in-out |
| Cursor | pointer |

**Hover state:**
- Border color: #8B4513
- Box shadow: 0 4px 6px rgba(0,0,0,0.4)

### Product Image Container
| Property | Value |
|----------|-------|
| Aspect ratio | 1:1 (square) |
| Overflow | hidden |
| Position | relative |

### Product Image
| Property | Value |
|----------|-------|
| Object fit | cover |
| Width/Height | 100% |
| Transition | transform 0.3s ease |

**Hover state:** transform: scale(1.05)

### Entry Multiplier Badge
| Property | Value |
|----------|-------|
| Position | absolute |
| Top | 12px |
| Right | 12px |
| Background | #D97706 |
| Color | #FFFFFF |
| Font | 12px, 700 weight, uppercase |
| Padding | 4px 8px |
| Border radius | 4px |
| Text | "[X]X ENTRIES" (e.g., "60X ENTRIES") |

### Card Content Area
| Property | Value |
|----------|-------|
| Padding | 16px |

### Product Title
| Property | Value |
|----------|-------|
| Font | Inter, 18px, 600 weight |
| Color | #F5F5F5 |
| Line clamp | 2 lines |
| Margin bottom | 8px |

### Price Row
| Property | Value |
|----------|-------|
| Display | flex |
| Justify-content | space-between |
| Align-items | center |

### Price
| Property | Value |
|----------|-------|
| Font | Oswald, 20px, 700 weight |
| Color | #D97706 |

### Entry Count
| Property | Value |
|----------|-------|
| Font | Inter, 14px, 400 weight |
| Color | #6B7280 |
| Text | "[X,XXX] entries" |

## 4.5 Navigation

### Desktop Navigation (≥1024px)

#### Header Container
| Property | Value |
|----------|-------|
| Position | fixed |
| Top | 0 |
| Left/Right | 0 |
| Height | 72px |
| Background | rgba(15,15,26,0.9) |
| Backdrop filter | blur(10px) |
| Z-index | 1000 |
| Border bottom | 1px solid rgba(139,69,19,0.2) |

#### Inner Container
| Property | Value |
|----------|-------|
| Max-width | 1280px |
| Margin | 0 auto |
| Padding | 0 32px |
| Height | 100% |
| Display | flex |
| Align-items | center |
| Justify-content | space-between |

#### Logo
| Property | Value |
|----------|-------|
| Height | 40px |
| Width | auto |

#### Nav Links Container
| Property | Value |
|----------|-------|
| Display | flex |
| Gap | 32px |
| Align-items | center |

#### Nav Link
| Property | Value |
|----------|-------|
| Font | Inter, 14px, 500 weight |
| Color | #B8B8B8 |
| Text transform | uppercase |
| Letter spacing | 0.05em |
| Text decoration | none |
| Transition | color 0.2s |

**States:**
- Hover: Color #F5F5F5
- Active/Current: Color #D97706, border-bottom: 2px solid #D97706

#### Right Section
| Property | Value |
|----------|-------|
| Display | flex |
| Gap | 16px |
| Align-items | center |

Contains: "ENTER NOW" CTA button, Cart icon with count badge

#### Cart Icon
| Property | Value |
|----------|-------|
| Size | 24px |
| Color | #B8B8B8 |
| Hover color | #F5F5F5 |

#### Cart Count Badge
| Property | Value |
|----------|-------|
| Position | absolute (relative to cart icon) |
| Top | -8px |
| Right | -8px |
| Background | #D97706 |
| Color | #FFFFFF |
| Font | 11px, 700 weight |
| Min-width | 18px |
| Height | 18px |
| Border radius | 9999px |
| Display | flex, center |

### Mobile Navigation (<1024px)

#### Header Container
- Height: 64px
- Same other properties as desktop

#### Hamburger Button
| Property | Value |
|----------|-------|
| Width | 24px |
| Height | 24px |
| Display | flex, flex-direction: column, justify-content: center, gap: 5px |

#### Hamburger Lines
| Property | Value |
|----------|-------|
| Width | 24px |
| Height | 2px |
| Background | #F5F5F5 |
| Border radius | 1px |
| Transition | transform 0.3s, opacity 0.3s |

**Open state animation:**
- Top line: rotate 45deg, translate to center
- Middle line: opacity 0
- Bottom line: rotate -45deg, translate to center

#### Mobile Menu Overlay
| Property | Value |
|----------|-------|
| Position | fixed |
| Top | 64px |
| Left/Right/Bottom | 0 |
| Background | #0F0F1A |
| Z-index | 999 |
| Padding | 24px |
| Transform | translateX(100%) when closed |
| Transition | transform 0.3s ease |

#### Mobile Nav Links
| Property | Value |
|----------|-------|
| Display | flex |
| Flex-direction | column |
| Gap | 8px |

#### Mobile Nav Link
| Property | Value |
|----------|-------|
| Font | Inter, 20px, 500 weight |
| Color | #F5F5F5 |
| Padding | 16px 0 |
| Border-bottom | 1px solid rgba(139,69,19,0.2) |
| Min-height | 56px (touch target) |

### Mobile Sticky CTA Bar

**Appears on mobile only, after scrolling past hero section**

| Property | Value |
|----------|-------|
| Position | fixed |
| Bottom | 0 |
| Left/Right | 0 |
| Background | #0F0F1A |
| Border-top | 1px solid rgba(139,69,19,0.3) |
| Padding | 12px 16px |
| Padding-bottom | calc(12px + env(safe-area-inset-bottom)) |
| Z-index | 1000 |
| Transform | translateY(100%) when hidden |
| Transition | transform 0.3s ease |

**Contains:** Full-width primary CTA button "ENTER GIVEAWAY — FREE"

**Show/hide logic:**
- Hidden when scrollY < 400px
- Visible when scrollY ≥ 400px
- Hidden when mobile menu is open

## 4.6 Announcement Bar

**Appears at very top of page, above navigation**

| Property | Value |
|----------|-------|
| Height | 40px |
| Background | #D97706 |
| Color | #FFFFFF |
| Font | Inter, 14px, 600 weight |
| Display | flex |
| Align-items | center |
| Justify-content | center |
| Text transform | uppercase |
| Letter spacing | 0.05em |
| Overflow | hidden |

**Content:** Scrolling/marquee text OR static text with close button

**Example text:** "🔥 60X ENTRIES ON ALL ORDERS — FREE SHIPPING OVER $75 🔥"

**Optional close button:**
- Position: absolute right
- Size: 24px
- Color: white
- Saves preference to localStorage

## 4.7 Entry Calculator

**Used on:** Product pages, giveaway page, cart

**Purpose:** Shows users exactly how many entries they'll earn

### Calculator Display
| Property | Value |
|----------|-------|
| Background | rgba(217,119,6,0.1) |
| Border | 1px solid rgba(217,119,6,0.3) |
| Border radius | 8px |
| Padding | 16px |

### Calculator Text
```
Format: "This purchase = [X,XXX] entries"
Example: "This purchase = 3,000 entries"

Calculation: price × current_multiplier
If multiplier is 60x and price is $50: 50 × 60 = 3,000
```

| Property | Value |
|----------|-------|
| Font | Inter, 16px, 600 weight |
| Color | #D97706 |
| Text-align | center |

### Multiplier Badge (inline)
| Property | Value |
|----------|-------|
| Background | #D97706 |
| Color | #FFFFFF |
| Font | 12px, 700 weight |
| Padding | 2px 6px |
| Border radius | 4px |
| Margin-left | 8px |
| Text | "60X ACTIVE" |

---

# SECTION 5: PAGE SPECIFICATIONS

## 5.1 Homepage

### Section Order (top to bottom)
1. Announcement Bar
2. Navigation (fixed)
3. Hero Section
4. Trust Bar
5. Current Giveaway Feature
6. How It Works
7. Quick Entry Products
8. Featured Apparel
9. Winners Section (or Launch Messaging)
10. Email Signup
11. Footer

### Hero Section

| Property | Value |
|----------|-------|
| Height | 100vh (full viewport) |
| Min-height | 600px |
| Position | relative |
| Display | flex |
| Align-items | center |
| Justify-content | center |
| Text-align | center |
| Padding | 0 24px |

#### Background
- **Ideal:** Video or high-res photo of OUTDOOR/ADVENTURE scene (mountain, forest, urban exploration)
- **Until real imagery available:** Dark gradient:
```css
background: linear-gradient(180deg, #0F0F1A 0%, #1A1A2E 50%, rgba(45,80,22,0.3) 100%);
```
- **Overlay:** rgba(15,15,26,0.7) to ensure text readability

#### Content Stack
| Element | Specification |
|---------|---------------|
| Headline | "LOOT LEGENDARY" — Oswald, 64px/36px, 700, #F5F5F5, uppercase |
| Subheadline | "LIVE BOLD" or "Gear Up. Level Up." — Inter, 24px/18px, 400, #B8B8B8 |
| Countdown Timer | As specified in 4.3, with end date label |
| CTA Buttons | Row of 2: "ENTER NOW" (primary) + "BROWSE GEAR" (secondary), gap: 16px |
| Trust Badges | Row of 3: "✓ Free Entry" "✓ Weekly Drawings" "✓ Ships Worldwide" — Inter, 14px, #6B7280 |

#### Scroll Indicator
- Positioned absolute bottom: 32px
- Animated chevron icon bouncing (translateY 0 → 8px → 0, 1.5s infinite)
- Color: #6B7280
- Size: 32px

### Trust Bar

| Property | Value |
|----------|-------|
| Background | #16213E |
| Padding | 24px |
| Display | flex |
| Justify-content | center |
| Gap | 48px (desktop), 24px (mobile) |
| Flex-wrap | wrap |

#### Stat Item
```
Format: [BIG NUMBER/TEXT] + [LABEL]
Examples:
- "$50K+" / "PRIZES GIVEN"
- "250+" / "WINNERS"
- "10K+" / "MEMBERS"
- "FREE" / "TO ENTER"
```

| Property | Value |
|----------|-------|
| Display | flex, flex-direction: column, align-items: center |
| Number font | Oswald, 32px, 700, #D97706 |
| Label font | Inter, 12px, 500, #6B7280, uppercase |

### Current Giveaway Feature Section

| Property | Value |
|----------|-------|
| Background | #1A1A2E |
| Padding | 64px 24px |

#### Layout
- Desktop: 2 columns (image left 50%, content right 50%)
- Mobile: Stacked (image top, content bottom)

#### Prize Image
| Property | Value |
|----------|-------|
| Aspect ratio | 4:3 or 1:1 |
| Border radius | 16px |
| Object fit | cover |

#### Value Badge (overlaid on image)
| Property | Value |
|----------|-------|
| Position | absolute, top: 16px, left: 16px |
| Background | #DC2626 |
| Color | #FFFFFF |
| Font | Oswald, 24px, 700 |
| Padding | 8px 16px |
| Border radius | 8px |
| Text | "VALUE: $5,000" |

#### Content
| Element | Specification |
|---------|---------------|
| Section label | "CURRENT GIVEAWAY" — Inter, 14px, 600, #D97706, uppercase |
| Prize title | [Prize name] — Oswald, 36px, 700, #F5F5F5 |
| Prize description | 2-3 sentences — Inter, 18px, 400, #B8B8B8 |
| Prize details | Bullet list of what's included — Inter, 16px, 400, #B8B8B8 |
| Countdown | Timer component |
| Entry info | Entry calculator component |
| CTA | "ENTER NOW — FREE" button, full-width on mobile |
| Rules link | "Official Rules" — Inter, 14px, #6B7280, underline |

### How It Works Section

| Property | Value |
|----------|-------|
| Background | #0F0F1A |
| Padding | 64px 24px |
| Text-align | center |

#### Section Title
- "HOW IT WORKS" — Oswald, 42px, 700, #F5F5F5

#### Steps Container
- Display: grid
- Grid-template-columns: repeat(3, 1fr) desktop, 1fr mobile
- Gap: 32px
- Max-width: 900px
- Margin: 0 auto

#### Step Card
| Element | Specification |
|---------|---------------|
| Step number | Large circle with "1", "2", "3" — 64px diameter, border: 2px solid #D97706, Oswald 24px 700 #D97706 |
| Icon | 48px, #D97706 (shopping bag, ticket, trophy) |
| Title | "BROWSE" / "ENTER" / "WIN" — Oswald, 24px, 700, #F5F5F5 |
| Description | Brief text — Inter, 16px, 400, #B8B8B8 |

#### Connecting Lines (desktop only)
- Dotted lines between step circles
- Color: rgba(217,119,6,0.3)

### Quick Entry Products Section

| Property | Value |
|----------|-------|
| Background | #1A1A2E |
| Padding | 64px 24px |

#### Section Title
- "QUICK ENTRIES" — Oswald, 42px, 700, #F5F5F5
- Subtitle: "Just want entries? No problem." — Inter, 18px, 400, #B8B8B8

#### Product Grid
- Display: grid
- Grid-template-columns: repeat(4, 1fr) desktop, repeat(2, 1fr) tablet, 1fr mobile
- Gap: 24px

**Products:** Digital entry packages at $25, $50, $100, $200, $300 price points
- Each shows entry count prominently
- No physical product image needed (use abstract graphic or entry ticket icon)

### Featured Apparel Section

| Property | Value |
|----------|-------|
| Background | #0F0F1A |
| Padding | 64px 24px |

#### Section Title
- "GEAR UP" — Oswald, 42px, 700, #F5F5F5
- Subtitle: "Premium streetwear that earns entries." — Inter, 18px, 400, #B8B8B8

#### Product Grid
- Display: grid
- Grid-template-columns: repeat(4, 1fr) desktop, repeat(2, 1fr) tablet/mobile
- Gap: 24px
- Show 4-8 products

#### View All Link
- "VIEW ALL GEAR →" — Inter, 16px, 600, #D97706
- Underline on hover

### Winners Section (Pre-Launch Alternative)

**If no real winners yet:**

| Property | Value |
|----------|-------|
| Background | #16213E |
| Padding | 64px 24px |
| Text-align | center |

```
Heading: "BE OUR FIRST WINNER"
Body: "We're launching soon! Enter our inaugural giveaway for your chance to make history as a Lootix winner. Real prizes. Real winners. Real soon."
CTA: "ENTER NOW" button
```

**If real winners exist:**
- Grid of winner cards (3-4)
- Each card: Photo of winner with prize, first name + last initial, prize won, date, testimonial quote
- MUST be real photos, not stock or AI-generated

### Email Signup Section

| Property | Value |
|----------|-------|
| Background | #D97706 |
| Padding | 48px 24px |
| Text-align | center |

```
Heading: "GET NOTIFIED" — Oswald, 36px, 700, #FFFFFF
Subheading: "Be first to know about new giveaways + get bonus entries." — Inter, 18px, 400, rgba(255,255,255,0.9)

Form: Email input + Submit button in row
- Input: White background, placeholder "Enter your email", full height match button
- Button: #0F0F1A background, white text, "JOIN"
```

### Footer

| Property | Value |
|----------|-------|
| Background | #0F0F1A |
| Padding | 64px 24px 32px |
| Border-top | 1px solid rgba(139,69,19,0.2) |

#### Footer Layout
- Desktop: 4 columns
- Mobile: Stacked

#### Column 1: Brand
- Logo
- Tagline: "Look cool and get cool shit."
- Social icons row (Instagram, TikTok, Twitter, Discord)

#### Column 2: Shop
- New Drops
- Mens
- Womens
- Quick Entries

#### Column 3: Info
- How It Works
- Current Giveaway
- Past Winners
- FAQ

#### Column 4: Legal + Contact
- Business address (Lootix LLC, street, city/state/zip)
- Email: hello@getlootix.com
- Terms of Service link
- Privacy Policy link
- Official Rules link

#### Bottom Bar
- Copyright: "© 2026 Lootix LLC. All rights reserved."
- "NO PURCHASE NECESSARY" disclaimer link

---

## 5.2 Giveaway Page

**URL:** /current-giveaway or /giveaway/[id]

### Hero Section
- Prize image gallery (large main image + thumbnails)
- Value badge overlaid
- Countdown timer (sticky on mobile)

### Entry Section
- Clear display of FREE entry method (mail-in instructions)
- Purchase entry explanation with entry calculator
- Current multiplier badge
- "X people entered in the last hour" social proof counter

### Prize Details
- Full description
- Bullet list of everything included
- Retail values if applicable
- Shipping/delivery info

### CTA Section
- Large "ENTER NOW — FREE" button
- "SHOP TO EARN MORE ENTRIES" secondary button
- Official Rules link

### Past Winners Section
- 3-4 recent winner cards at bottom
- Builds trust

---

## 5.3 Product Page

### Layout
- Desktop: 2 columns (60% image gallery, 40% product info)
- Mobile: Stacked

### Image Gallery
- Large main image
- Thumbnail strip below
- Zoom on hover/click

### Product Info Column
| Element | Specification |
|---------|---------------|
| Category | "MENS / HOODIES" — Inter, 12px, 500, #6B7280, uppercase |
| Title | Product name — Oswald, 32px, 700, #F5F5F5 |
| Price | "$XX" — Oswald, 28px, 700, #D97706 |
| Entry badge | "EARN 60X ENTRIES" — prominent badge near price |
| Entry calculator | "This purchase = X,XXX entries" |
| Size selector | Visual buttons (S, M, L, XL, 2XL), show stock per size |
| Add to Cart | Primary button, full-width, "ADD TO CART — EARN X,XXX ENTRIES" |
| Description | Accordion or tabs: Description, Size Chart, Shipping |

### Related Products
- "COMPLETE THE LOOK" — 3-4 related items

---

# SECTION 6: GLOBAL ELEMENTS

## 6.1 Page Transitions
- Fade in on route change (opacity 0 → 1, 0.2s)
- Loading state: Subtle shimmer effect on content areas

## 6.2 Scroll Behavior
- Smooth scroll for anchor links
- Scroll restoration on back navigation

## 6.3 Error States
- 404 page: Branded, with search and nav
- Form errors: Red (#DC2626) text below field, red border on field
- Loading states: Skeleton screens matching component shapes

## 6.4 Accessibility Requirements
- All images must have alt text
- Focus states visible on all interactive elements (2px #D97706 outline)
- Minimum contrast ratio 4.5:1 for body text
- Skip to main content link
- ARIA labels on icon-only buttons

## 6.5 Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

---

# SECTION 7: IMPLEMENTATION PRIORITY

## Phase 1: Critical Fixes (Must be first)
1. Fix countdown timer
2. Update all dates to future
3. Fix "Irems" typo
4. Remove fake winner avatars
5. Add physical address
6. Fix entry messaging consistency

## Phase 2: Design System
1. Implement CSS variables
2. Install and configure fonts
3. Create Button component
4. Create base layout styles

## Phase 3: Core Components
1. Countdown Timer component
2. Product Card component
3. Navigation (desktop + mobile)
4. Mobile Sticky CTA
5. Announcement Bar

## Phase 4: Homepage Rebuild
1. Hero section
2. Trust bar
3. Current Giveaway section
4. How It Works
5. Quick Entry Products
6. Featured Apparel
7. Winners/Launch section
8. Email signup
9. Footer

## Phase 5: Secondary Pages
1. Giveaway detail page
2. Product pages
3. Shop listing pages
4. Cart and checkout (if custom)

---

# SECTION 8: FILES TO MODIFY

Based on typical Next.js structure, these files likely need changes:

```
app/
├── layout.tsx          # Add fonts, update metadata
├── globals.css         # Add CSS variables, base styles
├── page.tsx            # Homepage rebuild
├── giveaway/
│   └── page.tsx        # Giveaway page
├── shop/
│   └── page.tsx        # Shop listing
└── products/
    └── [slug]/
        └── page.tsx    # Product detail

components/
├── ui/
│   ├── Button.tsx      # Create
│   └── Badge.tsx       # Create
├── CountdownTimer.tsx  # Create/Fix
├── ProductCard.tsx     # Create/Update
├── Navigation.tsx      # Update
├── MobileStickyBar.tsx # Create
├── AnnouncementBar.tsx # Create
├── Footer.tsx          # Update
└── EntryCalculator.tsx # Create

config/
└── giveaways.ts        # Create - centralized giveaway data
```

---

# SECTION 9: TESTING CHECKLIST

Before considering complete, verify:

- [ ] Countdown timer counts down (not stuck at 00:00:00:00)
- [ ] No dates from 2024 in codebase
- [ ] No "Irems" typo anywhere
- [ ] No Dicebear avatar URLs in codebase
- [ ] Physical address appears in footer
- [ ] Primary CTA buttons are #D97706
- [ ] Buttons have minimum 44px touch targets
- [ ] Oswald font loads for headlines
- [ ] Inter font loads for body text
- [ ] Mobile menu opens and closes
- [ ] Mobile sticky CTA appears on scroll
- [ ] All links work
- [ ] Images have alt text
- [ ] Site builds without errors: `npm run build`
- [ ] No console errors in browser
- [ ] Page loads in under 3 seconds

---

**END OF SPECIFICATION**

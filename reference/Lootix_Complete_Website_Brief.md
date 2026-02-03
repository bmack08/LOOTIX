# LOOTIX COMPLETE WEBSITE BRIEF
## Visual Design, Feel, Animations, and Technical Specification

**Project:** Lootix Website Rebuild  
**Inspiration:** DRKN (visual feel) + 80eighty (functionality)  
**Platform:** Next.js 14+ on Vercel  
**Date:** January 2026

---

# EXECUTIVE SUMMARY

This document specifies how to build a website that:
1. **FEELS like DRKN** — Cinematic, atmospheric, alive with motion and imagery
2. **FUNCTIONS like 80eighty** — Giveaway mechanics, entry system, conversion optimization
3. **LOOKS like LOOTIX** — Earth tones, adventure aesthetic, outdoor/epic brand positioning

The current Lootix site is **dead**. It has:
- No motion or animation
- No lifestyle imagery
- A broken countdown timer
- Stock photos from Unsplash
- Walls of text instead of visual storytelling

This brief fixes all of that.

---

# PART 1: THE FEEL

## 1.1 Visual Atmosphere

**Mood Board Keywords:**
- Epic mountain sunrises
- Forest trails at dusk
- Urban exploration at night
- Campfire glow
- Adventure gear closeups
- Cinematic color grading
- Silhouettes against dramatic skies

**NOT This:**
- Basement gaming setups
- D&D dice on tables
- Neon RGB lighting
- Anime character art
- Comic-con booth photos

**Color Temperature:**
- Warm golden hour tones
- Cool blue twilight
- Deep forest greens
- Weathered earth browns
- Smoky atmospheric grays

## 1.2 Motion Philosophy

The site should feel like it's **breathing**. Nothing is static.

**Constant Motion:**
- Hero slideshow auto-advances (5 second intervals)
- Subtle parallax on scroll
- Product images zoom slightly on hover
- Buttons glow/pulse on hover
- Loading skeletons shimmer
- Countdown numbers flip/animate

**User-Triggered Motion:**
- Page transitions fade in
- Sections reveal on scroll
- Products quick-view overlay slides in
- Mobile menu slides from right
- Cart drawer slides from right
- Modals fade + scale in

**Speed Guidelines:**
- Micro-interactions: 150-200ms
- Page transitions: 300ms
- Slideshow transitions: 500ms
- Scroll reveals: 400ms with stagger

---

# PART 2: IMAGERY REQUIREMENTS

## 2.1 Hero Section Images

**Quantity Needed:** 3-5 images for rotating slideshow

**Image 1: The Summit**
```
Scene: Silhouette of person standing on mountain peak at golden hour
Mood: Achievement, aspiration, "I made it"
Overlay text position: Center
Color tones: Orange/gold sky, dark foreground silhouette
```

**Image 2: The Trail**
```
Scene: Forest trail with morning fog, person walking away from camera
Mood: Journey, adventure, discovery
Overlay text position: Left-aligned
Color tones: Greens, misty grays, dappled light
```

**Image 3: Urban Night**
```
Scene: City rooftop at night, city lights below, person looking out
Mood: Urban explorer, nightlife, edge
Overlay text position: Right-aligned
Color tones: Deep blues, amber city lights, cool shadows
```

**Image 4: The Gear**
```
Scene: Close-up of adventure gear (backpack, boots, compass) laid out
Mood: Preparation, quality, craftsmanship
Overlay text position: Center-bottom
Color tones: Earth browns, leather textures, metal accents
```

**Image 5: The Prize**
```
Scene: Custom gaming PC setup with dramatic lighting
Mood: The reward, tech meets lifestyle
Overlay text position: Center
Color tones: RGB glow but MUTED, dark environment
```

**Technical Specs:**
- Resolution: 1920x1080 minimum, 2560x1440 preferred
- Format: WebP with JPEG fallback
- File size: Under 500KB optimized
- Aspect ratio: 16:9
- Must work with 60% dark overlay for text readability

## 2.2 Product Photography Style

**Apparel - Primary Shot:**
```
Style: Model wearing product in outdoor/adventure setting
NOT: Flat lay on white background
NOT: Mannequin shots
Example: Person in Lootix hoodie standing on rocky overlook
Lighting: Natural, golden hour preferred
```

**Apparel - Secondary Shots:**
```
Shot 2: Close-up of fabric/detail/logo
Shot 3: Back view
Shot 4: Lifestyle context (campfire, trail, urban)
```

**Quick Entry Products:**
```
Style: Abstract/graphic design representing "entries"
Elements: Ticket motifs, geometric patterns, prize imagery
Background: Dark with amber/gold accents
No physical product (digital item)
```

**Accessories:**
```
Style: Product on textured surface (wood, stone, leather)
Lighting: Dramatic, directional
Props: Adventure context (compass, map, rope)
```

## 2.3 Placeholder Strategy

Until real photography is available, use these AI-generated or stock guidelines:

**Hero Placeholders:**
```
Source: Midjourney or DALL-E with prompts:
"Cinematic wide shot of silhouette on mountain peak at golden hour, 
adventure photography style, dramatic lighting, 16:9 aspect ratio"

Alternative: Unsplash search terms:
- "mountain summit silhouette"
- "forest trail fog"  
- "urban rooftop night"
BUT: Edit heavily with color grading to match brand palette
```

**Product Placeholders:**
```
Create dark cards with:
- Product category icon (shirt icon, hoodie icon)
- "PRODUCT IMAGE COMING SOON"
- Brand pattern background
This is better than obviously fake stock photos
```

## 2.4 Image Treatment

All images should have consistent treatment:

**Color Grading:**
```css
/* Apply to all hero/lifestyle images */
filter: contrast(1.1) saturate(0.9);
/* Slight desaturation keeps earth tone palette consistent */
```

**Overlays:**
```css
/* Hero images need dark overlay for text */
.hero-overlay {
  background: linear-gradient(
    180deg,
    rgba(15, 15, 26, 0.4) 0%,
    rgba(15, 15, 26, 0.7) 50%,
    rgba(15, 15, 26, 0.9) 100%
  );
}
```

**Vignette Effect:**
```css
/* Subtle vignette on lifestyle images */
box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.5);
```

---

# PART 3: ANIMATION SPECIFICATIONS

## 3.1 Page Load Sequence

When homepage loads:

```
T+0ms:    Background color renders (#1A1A2E)
T+100ms:  Navigation fades in (opacity 0→1, 300ms)
T+200ms:  Hero background image fades in
T+400ms:  Hero headline animates in (slide up + fade, 400ms)
T+500ms:  Hero subheadline animates in
T+600ms:  Countdown timer animates in
T+700ms:  CTA buttons animate in
T+800ms:  Trust badges animate in
```

**CSS for staggered entrance:**
```css
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-headline { animation: slideUpFade 0.5s ease-out 0.4s both; }
.hero-subheadline { animation: slideUpFade 0.5s ease-out 0.5s both; }
.hero-countdown { animation: slideUpFade 0.5s ease-out 0.6s both; }
.hero-ctas { animation: slideUpFade 0.5s ease-out 0.7s both; }
```

## 3.2 Hero Slideshow

**Behavior:**
- Auto-advances every 5 seconds
- Crossfade transition (500ms)
- Pause on hover (desktop)
- Pause/play button visible
- Dot indicators show current slide
- Swipe navigation on mobile

**Transition Effect:**
```css
.slide-enter {
  opacity: 0;
  transform: scale(1.05);
}
.slide-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: all 500ms ease-out;
}
.slide-exit {
  opacity: 1;
}
.slide-exit-active {
  opacity: 0;
  transition: opacity 500ms ease-out;
}
```

**Ken Burns Effect (subtle zoom while visible):**
```css
@keyframes kenBurns {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}

.slide-active .slide-image {
  animation: kenBurns 6s ease-out forwards;
}
```

## 3.3 Scroll Animations

**Reveal on Scroll:**
Elements below the fold should animate in when they enter viewport.

```javascript
// Using Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1 });
```

**Section Reveal Styles:**
```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease-out;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.scroll-reveal.revealed .child:nth-child(1) { transition-delay: 0ms; }
.scroll-reveal.revealed .child:nth-child(2) { transition-delay: 100ms; }
.scroll-reveal.revealed .child:nth-child(3) { transition-delay: 200ms; }
.scroll-reveal.revealed .child:nth-child(4) { transition-delay: 300ms; }
```

## 3.4 Product Card Interactions

**Hover State (Desktop):**
```
Duration: 300ms
Effects:
  - Image scales to 1.08
  - Border color transitions to accent
  - Shadow increases
  - Entry badge pulses once
  - "Quick View" button fades in (overlay)
```

```css
.product-card {
  transition: all 0.3s ease;
}

.product-card:hover {
  border-color: var(--accent-earth);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  transform: translateY(-4px);
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

.product-card .quick-view {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .quick-view {
  opacity: 1;
}
```

**Quick View Button:**
```
Position: Centered on image
Background: rgba(15, 15, 26, 0.9)
Text: "QUICK VIEW" uppercase
Border: 1px solid var(--cta-primary)
On click: Opens modal with product details
```

## 3.5 Button Animations

**Primary CTA Hover:**
```css
.btn-primary {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Glow effect */
.btn-primary::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--cta-primary);
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn-primary:hover::before {
  opacity: 0.5;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(217, 119, 6, 0.4);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
```

**Shine/Shimmer Effect on Hero CTA:**
```css
@keyframes shine {
  from { left: -100%; }
  to { left: 200%; }
}

.btn-primary.hero-cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shine 3s infinite;
}
```

## 3.6 Countdown Timer Animation

**Number Change Effect:**
```css
@keyframes flipDown {
  0% {
    transform: rotateX(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
  51% {
    transform: rotateX(90deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

.countdown-number.changing {
  animation: flipDown 0.5s ease-in-out;
}
```

**Urgency Pulse (when < 24 hours):**
```css
@keyframes urgentPulse {
  0%, 100% { 
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
  }
  50% { 
    opacity: 0.8;
    box-shadow: 0 0 20px 5px rgba(220, 38, 38, 0.2);
  }
}

.countdown-block.urgent {
  animation: urgentPulse 1.5s ease-in-out infinite;
}

.countdown-block.urgent .countdown-number {
  color: var(--urgency);
}
```

## 3.7 Loading States

**Skeleton Loading:**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 25%,
    var(--bg-primary) 50%,
    var(--bg-secondary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

.skeleton-product-image {
  aspect-ratio: 1;
}

.skeleton-text {
  height: 1em;
  margin-bottom: 0.5em;
}

.skeleton-text.short {
  width: 60%;
}
```

## 3.8 Mobile Menu Animation

```css
/* Overlay */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 15, 26, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* Menu Panel */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 400px;
  background: var(--bg-dark);
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu.open {
  transform: translateX(0);
}

/* Menu Items - Staggered */
.mobile-menu-item {
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;
}

.mobile-menu.open .mobile-menu-item {
  opacity: 1;
  transform: translateX(0);
}

.mobile-menu.open .mobile-menu-item:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu.open .mobile-menu-item:nth-child(2) { transition-delay: 0.15s; }
.mobile-menu.open .mobile-menu-item:nth-child(3) { transition-delay: 0.2s; }
/* ...etc */
```

## 3.9 Cart Drawer Animation

```css
.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 90vw;
  background: var(--bg-dark);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

.cart-drawer.open {
  transform: translateX(0);
}

/* Cart items animate in */
.cart-item {
  opacity: 0;
  transform: translateY(10px);
}

.cart-drawer.open .cart-item {
  animation: slideUpFade 0.3s ease forwards;
}
```

---

# PART 4: DESIGN SYSTEM

## 4.1 Color Palette

### Primary Backgrounds
| Name | Hex | Usage |
|------|-----|-------|
| Deep Navy | #1A1A2E | Main background |
| Midnight | #16213E | Cards, surfaces |
| True Dark | #0F0F1A | Header, footer, overlays |

### Earth Tone Accents
| Name | Hex | Usage |
|------|-----|-------|
| Forest | #2D5016 | Success, verified |
| Earth | #8B4513 | Borders, dividers |
| Rust | #A0522D | Hover accents |
| Stone | #708090 | Disabled, muted |

### Action Colors
| Name | Hex | Usage |
|------|-----|-------|
| Amber | #D97706 | **ALL PRIMARY CTAs** |
| Amber Dark | #B45309 | CTA hover |
| Urgency | #DC2626 | Timer <24h, alerts |
| Trust | #1D4ED8 | Payment, security |
| Success | #16A34A | Confirmations |

### Text Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary | #F5F5F5 | Headlines |
| Secondary | #B8B8B8 | Body text |
| Muted | #6B7280 | Captions |

## 4.2 Typography

### Font Stack
```css
--font-display: 'Oswald', 'Bebas Neue', sans-serif;
--font-body: 'Inter', 'Roboto', sans-serif;
```

### Type Scale
| Element | Mobile | Desktop | Weight |
|---------|--------|---------|--------|
| Hero H1 | 40px | 72px | 700 |
| Section H2 | 28px | 48px | 700 |
| Card H3 | 20px | 24px | 600 |
| Body | 16px | 18px | 400 |
| Button | 14px | 16px | 600 |
| Caption | 12px | 14px | 400 |

### Special Typography Treatments

**DRKN-Style Underscore:**
```css
.section-label {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--cta-primary);
}

.section-label::after {
  content: '_';
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

## 4.3 Spacing

8px grid system:
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

## 4.4 Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-full: 9999px;
```

## 4.5 Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
--shadow-md: 0 4px 12px rgba(0,0,0,0.4);
--shadow-lg: 0 8px 30px rgba(0,0,0,0.5);
--shadow-glow: 0 0 30px rgba(217,119,6,0.3);
```

---

# PART 5: COMPONENT LIBRARY

## 5.1 Hero Slideshow Component

```jsx
<HeroSlideshow 
  slides={[
    {
      image: "/hero/summit.webp",
      headline: "LOOT LEGENDARY",
      subheadline: "GEAR UP. LEVEL UP.",
      cta1: { text: "ENTER NOW", href: "/giveaway" },
      cta2: { text: "SHOP GEAR", href: "/shop" },
      textAlign: "center"
    },
    // ... more slides
  ]}
  interval={5000}
  showControls={true}
  showIndicators={true}
/>
```

**Features:**
- Auto-advances with configurable interval
- Pause on hover
- Play/pause button
- Dot indicators
- Swipe on mobile
- Ken Burns zoom effect
- Crossfade transitions
- Staggered text animation on each slide

## 5.2 Product Card Component

```jsx
<ProductCard
  product={{
    id: "prod_123",
    title: "Adventure Hoodie",
    price: 89,
    image: "/products/hoodie-forest.webp",
    hoverImage: "/products/hoodie-forest-back.webp",
    href: "/products/adventure-hoodie",
    entryMultiplier: 60,
    badge: "NEW" // or "SALE" or null
  }}
  showQuickView={true}
  onQuickView={(product) => openModal(product)}
/>
```

**Features:**
- Image zoom on hover
- Secondary image on hover (if available)
- Entry multiplier badge
- Sale/New badge
- Quick view button overlay
- Entry count calculation
- Hover lift effect

## 5.3 Countdown Timer Component

```jsx
<CountdownTimer
  targetDate={new Date('2026-03-15T23:59:59')}
  showLabel={true}
  size="large" // "small" | "medium" | "large"
  onComplete={() => handleGiveawayEnd()}
/>
```

**Features:**
- Flip animation on number change
- Urgency state when < 24 hours
- Urgency pulse animation
- "Giveaway Ends [Date]" label above
- "GIVEAWAY ENDED" state when complete
- Responsive sizing

## 5.4 Section Header Component

```jsx
<SectionHeader
  label="FEATURED_"
  title="CURRENT GIVEAWAY"
  subtitle="Enter for your chance to win"
  align="center" // "left" | "center" | "right"
/>
```

**Features:**
- Animated underscore on label
- Staggered reveal animation
- Consistent spacing

## 5.5 Quick View Modal

```jsx
<QuickViewModal
  product={selectedProduct}
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
/>
```

**Features:**
- Fade + scale entrance
- Image gallery within modal
- Size selector
- Add to cart button with entry count
- Entry calculator
- Close on overlay click
- Close on Escape key

## 5.6 Navigation Component

```jsx
<Navigation
  logo="/images/lootix-logo.svg"
  items={[
    { label: "JUST ARRIVED_", href: "/new", highlight: true },
    { 
      label: "MENS", 
      children: [
        { label: "Shirts", href: "/mens/shirts" },
        { label: "Hoodies", href: "/mens/hoodies" },
        // ...
      ]
    },
    // ...
  ]}
  ctaText="ENTER NOW"
  ctaHref="/giveaway"
/>
```

**Features:**
- Fixed on scroll with blur backdrop
- Mega menu dropdowns
- Highlight style for featured items
- Mobile hamburger with slide-out menu
- Cart icon with count badge
- Smooth show/hide on scroll

## 5.7 Announcement Bar

```jsx
<AnnouncementBar
  messages={[
    "🔥 60X ENTRIES ON ALL ORDERS",
    "FREE SHIPPING OVER $75",
    "GIVEAWAY ENDS MARCH 15"
  ]}
  scrolling={true}
  dismissible={true}
/>
```

**Features:**
- Marquee scroll effect
- Multiple rotating messages
- Dismissible with localStorage persistence
- Sticky above header

## 5.8 Category Card Grid

```jsx
<CategoryGrid
  categories={[
    { name: "Hoodies", image: "/categories/hoodies.webp", href: "/hoodies" },
    { name: "Shirts", image: "/categories/shirts.webp", href: "/shirts" },
    { name: "Accessories", image: "/categories/accessories.webp", href: "/accessories" },
  ]}
/>
```

**Features:**
- Image overlay with category name
- Hover zoom + darken effect
- Responsive grid (4 cols desktop, 2 mobile)
- Staggered reveal on scroll

## 5.9 Featured Collection Carousel

```jsx
<FeaturedCarousel
  title="JUST ARRIVED_"
  products={justArrivedProducts}
  viewAllHref="/new"
/>
```

**Features:**
- Horizontal scroll on mobile
- Arrow navigation on desktop
- "View all" link
- Product cards with quick view
- Staggered entrance animation

## 5.10 Entry Calculator

```jsx
<EntryCalculator
  price={89}
  multiplier={60}
  variant="inline" // "inline" | "card" | "prominent"
/>
```

**Output:**
```
This purchase = 5,340 entries  [60X ACTIVE]
```

---

# PART 6: PAGE LAYOUTS

## 6.1 Homepage Structure

```
┌──────────────────────────────────────────────────┐
│ ANNOUNCEMENT BAR                                 │
│ "🔥 60X ENTRIES ON ALL ORDERS — ENDS MARCH 15"  │
├──────────────────────────────────────────────────┤
│ NAVIGATION (fixed, blur backdrop)               │
├──────────────────────────────────────────────────┤
│                                                  │
│              HERO SLIDESHOW                      │
│         (full viewport height)                   │
│                                                  │
│    ┌────────────────────────────────┐           │
│    │     LOOT LEGENDARY             │           │
│    │     GEAR UP. LEVEL UP.         │           │
│    │                                │           │
│    │  ┌────┐ ┌────┐ ┌────┐ ┌────┐  │           │
│    │  │ 12 │ │ 05 │ │ 32 │ │ 18 │  │           │
│    │  │DAYS│ │HRS │ │MINS│ │SECS│  │           │
│    │  └────┘ └────┘ └────┘ └────┘  │           │
│    │                                │           │
│    │  [ENTER NOW]  [SHOP GEAR]     │           │
│    │                                │           │
│    │  ✓ Free Entry  ✓ Weekly Draw  │           │
│    └────────────────────────────────┘           │
│                                                  │
│    ○ ○ ● ○ ○  (slide indicators)              │
│    ▼ (scroll indicator)                         │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  TRUST STATS BAR                                │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ $50K+  │ │  250+  │ │  10K+  │ │  FREE  │   │
│  │ PRIZES │ │WINNERS │ │MEMBERS │ │ ENTRY  │   │
│  └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  JUST ARRIVED_                    [View All →]  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│  │     │ │     │ │     │ │     │ │     │      │
│  │ NEW │ │ NEW │ │     │ │     │ │     │      │
│  │     │ │     │ │     │ │     │ │     │      │
│  │$45  │ │$89  │ │$65  │ │$120 │ │$35  │      │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘      │
│  ←                                          →   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  CURRENT GIVEAWAY_                              │
│  ┌────────────────────┬──────────────────────┐  │
│  │                    │                      │  │
│  │    [PRIZE IMAGE]   │  VALUE: $5,000       │  │
│  │                    │                      │  │
│  │    [VALUE BADGE]   │  Custom Gaming PC    │  │
│  │                    │  Build               │  │
│  │                    │                      │  │
│  │                    │  Win a fully loaded  │  │
│  │                    │  custom gaming PC... │  │
│  │                    │                      │  │
│  │                    │  ┌──────────────┐    │  │
│  │                    │  │ COUNTDOWN    │    │  │
│  │                    │  └──────────────┘    │  │
│  │                    │                      │  │
│  │                    │  [ENTER NOW — FREE]  │  │
│  │                    │                      │  │
│  └────────────────────┴──────────────────────┘  │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  QUICK ENTRIES_                                 │
│  Skip the shopping. Get straight to entries.    │
│                                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │ STARTER │ │ POWER   │ │ ELITE   │ │ULTIMATE ││
│  │  $25    │ │  $50    │ │  $100   │ │  $200   ││
│  │ 3,750   │ │ 7,500   │ │ 15,000  │ │ 30,000  ││
│  │ entries │ │ entries │ │ entries │ │ entries ││
│  │ [150X]  │ │ [150X]  │ │ [150X]  │ │ [150X]  ││
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘│
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  SHOP BY CATEGORY_                              │
│  ┌──────────────┐ ┌──────────────┐              │
│  │   [IMAGE]    │ │   [IMAGE]    │              │
│  │   HOODIES    │ │   SHIRTS     │              │
│  └──────────────┘ └──────────────┘              │
│  ┌──────────────┐ ┌──────────────┐              │
│  │   [IMAGE]    │ │   [IMAGE]    │              │
│  │ ACCESSORIES  │ │   BUNDLES    │              │
│  └──────────────┘ └──────────────┘              │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  FEATURED GEAR_                   [View All →]  │
│  Premium streetwear that earns entries.         │
│                                                  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│  │     │ │     │ │     │ │     │               │
│  │[60X]│ │[60X]│ │[60X]│ │[60X]│               │
│  │     │ │     │ │     │ │     │               │
│  │$89  │ │$45  │ │$120 │ │$65  │               │
│  └─────┘ └─────┘ └─────┘ └─────┘               │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  HOW IT WORKS_                                  │
│                                                  │
│     ①              ②              ③            │
│   BROWSE          ENTER           WIN           │
│                                                  │
│  Shop gear or    Every $1 =     Winners drawn   │
│  grab Quick      60 entries.    weekly. Ships   │
│  Entries.        Free entry     worldwide.      │
│                  available.                      │
│                                                  │
│              [START ENTERING NOW]               │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │                                          │   │
│  │       BE OUR FIRST WINNER_              │   │
│  │                                          │   │
│  │   We're launching soon! Enter our       │   │
│  │   inaugural giveaway for your chance    │   │
│  │   to make history as a Lootix winner.   │   │
│  │                                          │   │
│  │            [ENTER NOW]                   │   │
│  │                                          │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  ████████████████████████████████████████████   │
│  ████  GET NOTIFIED_                     ████   │
│  ████                                    ████   │
│  ████  Be first to know about new        ████   │
│  ████  giveaways + get bonus entries.    ████   │
│  ████                                    ████   │
│  ████  [email input] [JOIN]              ████   │
│  ████                                    ████   │
│  ████  🎁 500 BONUS ENTRIES for signing  ████   │
│  ████████████████████████████████████████████   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  FOOTER                                         │
│  ┌─────────────┬───────────┬───────────┬──────┐ │
│  │ LOOTIX      │ SHOP      │ INFO      │LEGAL │ │
│  │ Logo        │ New Drops │ Giveaway  │Terms │ │
│  │             │ Mens      │ Winners   │Priv  │ │
│  │ Look cool   │ Womens    │ How Works │Rules │ │
│  │ get cool    │ Bundles   │ FAQ       │      │ │
│  │ shit.       │ Quick     │ Contact   │      │ │
│  │             │ Entries   │           │      │ │
│  │ [socials]   │           │           │      │ │
│  ├─────────────┴───────────┴───────────┴──────┤ │
│  │ Lootix LLC • [Address] • hello@getlootix   │ │
│  │ © 2026 • NO PURCHASE NECESSARY             │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

## 6.2 Collection/Shop Page Structure

```
┌──────────────────────────────────────────────────┐
│ ANNOUNCEMENT + NAVIGATION                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  ████████ COLLECTION HERO IMAGE ████████████    │
│  ████████                       ████████████    │
│  ████████     MENS HOODIES      ████████████    │
│  ████████                       ████████████    │
│  ████████████████████████████████████████████   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  [FILTER] [SORT: Featured ▼]    24 products     │
│                                                  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│  │     │ │     │ │     │ │     │               │
│  │[60X]│ │[60X]│ │[80X]│ │[60X]│               │
│  │     │ │SALE │ │     │ │NEW  │               │
│  │$89  │ │$65  │ │$120 │ │$95  │               │
│  └─────┘ └─────┘ └─────┘ └─────┘               │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│  │     │ │     │ │     │ │     │               │
│  ...                                            │
│                                                  │
│            [1] [2] [3] [4] [→]                  │
│                                                  │
├──────────────────────────────────────────────────┤
│ FOOTER                                           │
└──────────────────────────────────────────────────┘
```

## 6.3 Product Detail Page Structure

```
┌──────────────────────────────────────────────────┐
│ ANNOUNCEMENT + NAVIGATION                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  Mens > Hoodies > Adventure Hoodie              │
│                                                  │
│  ┌────────────────────┬──────────────────────┐  │
│  │                    │                      │  │
│  │   [MAIN IMAGE]     │  ADVENTURE HOODIE    │  │
│  │                    │                      │  │
│  │                    │  $89.00              │  │
│  │   ┌───┐┌───┐┌───┐  │                      │  │
│  │   │th1││th2││th3│  │  ┌──────────────────┐│  │
│  │   └───┘└───┘└───┘  │  │ EARN 60X ENTRIES ││  │
│  │                    │  │ = 5,340 entries  ││  │
│  │                    │  └──────────────────┘│  │
│  │                    │                      │  │
│  │                    │  SIZE:              │  │
│  │                    │  [S][M][L][XL][2XL] │  │
│  │                    │                      │  │
│  │                    │  [ADD TO CART ——]   │  │
│  │                    │  [—— EARN 5,340 ——] │  │
│  │                    │                      │  │
│  │                    │  ▼ DESCRIPTION       │  │
│  │                    │  ▼ SIZE GUIDE        │  │
│  │                    │  ▼ SHIPPING          │  │
│  └────────────────────┴──────────────────────┘  │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  COMPLETE THE LOOK_                             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│  │     │ │     │ │     │ │     │               │
│  └─────┘ └─────┘ └─────┘ └─────┘               │
│                                                  │
├──────────────────────────────────────────────────┤
│ FOOTER                                           │
└──────────────────────────────────────────────────┘
```

---

# PART 7: REQUIRED PAGES & SECTIONS

## 7.1 Pages to Build

| Page | Route | Priority |
|------|-------|----------|
| Homepage | / | P0 |
| Current Giveaway | /giveaway | P0 |
| Shop All | /shop | P0 |
| Collection: New/Just Arrived | /new | P0 |
| Collection: Mens | /mens | P0 |
| Collection: Womens | /womens | P0 |
| Collection: Hoodies | /hoodies | P1 |
| Collection: Shirts | /shirts | P1 |
| Collection: Accessories | /accessories | P1 |
| Collection: Headwear | /headwear | P1 |
| Collection: Bundles | /bundles | P1 |
| Collection: Quick Entries | /quick-entries | P0 |
| Collection: Clearance | /clearance | P2 |
| Product Detail | /products/[slug] | P0 |
| Cart | /cart | P0 |
| Membership | /membership | P1 |
| Past Winners | /winners | P1 |
| How It Works | /how-it-works | P1 |
| About | /about | P2 |
| FAQ | /faq | P2 |
| Contact | /contact | P2 |
| Terms | /terms | P2 |
| Privacy | /privacy | P2 |
| Official Rules | /rules | P1 |
| Refer a Friend | /refer | P2 |

## 7.2 Navigation Structure

```
JUST ARRIVED_  (highlighted, links to /new)

MENS
├── All Mens
├── Shirts
├── Hoodies
├── Sweatpants
├── Tank Tops
└── Headwear

WOMENS
├── All Womens
├── Shirts
├── Hoodies
├── Leggings
└── Tank Tops

ACCESSORIES
├── All Accessories
├── Hats & Beanies
├── Bags
├── Wallets
└── Stickers & Patches

BUNDLES

QUICK ENTRIES

MEMBERSHIP

[ENTER NOW] (CTA button)
[Cart icon with count]
```

---

# PART 8: FUNCTIONALITY REQUIREMENTS

## 8.1 Entry System

**Entry Multiplier Tiers:**
| Tier | Multiplier | Applied To |
|------|------------|------------|
| Base | 20x | Standard products during normal periods |
| Standard | 40x | Bundles, accessories |
| Premium | 60x | Default promotional rate |
| Elite | 80x | Limited edition items |
| Exclusive | 120x | Quick Entry products |
| Ultra | 150x-240x | Special promotions, limited bundles |

**Entry Calculator Logic:**
```javascript
const calculateEntries = (price, multiplier = 60) => {
  return Math.floor(price * multiplier);
};

// Display: "This purchase = 5,340 entries"
```

**Display on Product:**
- Price: $89.00
- Badge: "60X ENTRIES"
- Calculator: "= 5,340 entries"

## 8.2 Social Proof Elements

**"X Past Winners bought this"**
```
On product cards: "🏆 45 Past Winners bought a Hoodie"
```

**Real-time Entry Counter**
```
"247 people entered in the last 24 hours"
(Can be simulated initially, real data later)
```

**Entry Progress Bar** (on giveaway page)
```
Your Entries: 5,340
━━━━━━━━━━░░░░░░░░░░
"Add $17 more to reach 6,000 entries!"
```

## 8.3 Referral System

```
Page: /refer

"Invite friends, earn entries"

Your referral link: https://getlootix.com/?ref=ABC123

For each friend who makes a purchase:
- You get: 500 BONUS ENTRIES
- They get: 10% OFF first order

[COPY LINK] [SHARE ON TWITTER] [SHARE ON FACEBOOK]
```

## 8.4 Membership Features

```
LOOTIX MEMBERSHIP
$49/month

✓ 3,000 entries every month (auto-deposited)
✓ 2X entry multiplier on all purchases
✓ Early access to new drops
✓ Member-only products
✓ Free shipping on all orders
✓ 10% off everything

[JOIN NOW]

FAQ:
- Do membership entries count? Yes, immediately.
- Can I cancel? Yes, anytime through your account.
- When are entries deposited? 1st of each month.
```

---

# PART 9: MOBILE CONSIDERATIONS

## 9.1 Mobile-Specific Components

**Sticky Bottom CTA Bar:**
```
Appears after scrolling 400px
Fixed to bottom
Full-width amber CTA button
"ENTER GIVEAWAY — FREE"
Safe area padding for notch phones
```

**Mobile Menu:**
```
Full-screen overlay
Slide from right
Accordion for categories
Social links at bottom
Entry count displayed
```

**Mobile Product Grid:**
```
2 columns
Smaller cards
Quick view becomes "tap to view"
Swipe to see more in carousels
```

## 9.2 Touch Targets

```
Minimum touch target: 44x44px
Button padding: 14px 24px minimum
Link spacing: 8px minimum
Form inputs: 48px height minimum
```

## 9.3 Performance on Mobile

```
Hero images: Serve smaller versions (<500KB)
Lazy load: All images below fold
Skeleton screens: Show immediately while loading
Infinite scroll: Optional on collection pages
```

---

# PART 10: IMPLEMENTATION PHASES

## Phase 1: Foundation (Week 1)
- [ ] Set up design tokens (colors, typography, spacing)
- [ ] Create base layout components
- [ ] Fix countdown timer
- [ ] Remove fake winners
- [ ] Add placeholder address
- [ ] Basic homepage structure

## Phase 2: Design System (Week 2)
- [ ] Button components with animations
- [ ] Product card component
- [ ] Navigation with mobile menu
- [ ] Hero slideshow component
- [ ] Section header component
- [ ] Footer component

## Phase 3: Homepage Build (Week 3)
- [ ] Hero with slideshow
- [ ] Trust stats bar
- [ ] Just Arrived carousel
- [ ] Current giveaway feature
- [ ] Quick entries section
- [ ] Shop by category grid
- [ ] Featured products
- [ ] How it works
- [ ] Winners/launch section
- [ ] Email signup
- [ ] All scroll animations

## Phase 4: Collection Pages (Week 4)
- [ ] Collection page template
- [ ] Filter/sort functionality
- [ ] Pagination
- [ ] Quick view modal
- [ ] All collection routes

## Phase 5: Product & Cart (Week 5)
- [ ] Product detail page
- [ ] Image gallery
- [ ] Size selector
- [ ] Entry calculator
- [ ] Add to cart with animation
- [ ] Cart drawer
- [ ] Cart page

## Phase 6: Supporting Pages (Week 6)
- [ ] Giveaway detail page
- [ ] Membership page
- [ ] Winners page
- [ ] How it works page
- [ ] FAQ page
- [ ] About/Contact
- [ ] Legal pages

## Phase 7: Polish (Week 7)
- [ ] All animations refined
- [ ] Performance optimization
- [ ] Mobile testing
- [ ] Accessibility audit
- [ ] SEO meta tags
- [ ] Analytics setup

---

# PART 11: TESTING CHECKLIST

## Visual/Feel
- [ ] Hero slideshow auto-advances and crossfades
- [ ] Ken Burns zoom effect on hero images
- [ ] Page elements animate in on load
- [ ] Sections reveal on scroll
- [ ] Product cards zoom and lift on hover
- [ ] Quick view overlay appears on hover
- [ ] Buttons glow on hover
- [ ] Countdown timer flips numbers
- [ ] Urgency state activates < 24 hours
- [ ] Mobile menu slides smoothly
- [ ] Cart drawer slides smoothly

## Functionality
- [ ] Countdown shows real future date
- [ ] Entry calculator shows correct math
- [ ] Add to cart works
- [ ] Cart updates live
- [ ] Mobile sticky CTA appears on scroll
- [ ] Navigation dropdowns work
- [ ] Search works
- [ ] All links work

## Content
- [ ] No "00:00:00:00" timer
- [ ] No 2024 dates
- [ ] No "Irems" typo
- [ ] No Dicebear avatars
- [ ] Real address in footer
- [ ] No Unsplash URLs in production

## Performance
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Images lazy load
- [ ] Fonts load without flash

---

# APPENDIX A: CSS CUSTOM PROPERTIES

```css
:root {
  /* Colors */
  --bg-primary: #1A1A2E;
  --bg-secondary: #16213E;
  --bg-dark: #0F0F1A;
  
  --accent-forest: #2D5016;
  --accent-earth: #8B4513;
  --accent-rust: #A0522D;
  --accent-stone: #708090;
  
  --cta-primary: #D97706;
  --cta-hover: #B45309;
  --urgency: #DC2626;
  --trust: #1D4ED8;
  --success: #16A34A;
  
  --text-primary: #F5F5F5;
  --text-secondary: #B8B8B8;
  --text-muted: #6B7280;
  
  /* Typography */
  --font-display: 'Oswald', 'Bebas Neue', sans-serif;
  --font-body: 'Inter', 'Roboto', sans-serif;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.5);
  --shadow-glow: 0 0 30px rgba(217,119,6,0.3);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* Z-index */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-header: 300;
  --z-overlay: 400;
  --z-modal: 500;
  --z-toast: 600;
}
```

---

# APPENDIX B: IMAGE PROMPT TEMPLATES

For generating placeholder images with AI tools:

**Hero - Summit:**
```
Cinematic wide shot, silhouette of person standing triumphantly on mountain peak, 
golden hour sunset, dramatic clouds, earth tones, adventure photography style, 
16:9 aspect ratio, high contrast, film grain, --ar 16:9 --v 6
```

**Hero - Trail:**
```
Forest hiking trail disappearing into morning fog, person with backpack walking 
away from camera, dappled sunlight through trees, earth tones green and brown, 
moody atmospheric, adventure photography, 16:9 aspect ratio --ar 16:9 --v 6
```

**Hero - Urban:**
```
Person standing on urban rooftop at night, city lights bokeh below, 
cinematic lighting, teal and amber color grade, adventure streetwear style,
16:9 aspect ratio, cyberpunk influence but natural --ar 16:9 --v 6
```

**Product - Lifestyle:**
```
Person wearing black hoodie outdoors, mountain background, golden hour,
looking into distance, adventure lifestyle, earth tones, natural lighting,
fashion photography style, 1:1 square crop --ar 1:1 --v 6
```

**Category - Accessories:**
```
Flat lay of adventure gear on weathered wood surface, compass, leather wallet,
beanie, tactical flashlight, overhead shot, earth tones, product photography,
soft directional lighting --ar 1:1 --v 6
```

---

**END OF SPECIFICATION**

This document should give a developer everything they need to build a site that 
FEELS like DRKN, FUNCTIONS like 80eighty, and LOOKS like Lootix.

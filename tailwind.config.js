/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Existing "gaming prizes" system (keep — secondary pages use these) ──
        'bg-primary': '#1A1A2E',
        'bg-secondary': '#16213E',
        'bg-dark': '#0F0F1A',
        'accent-forest': '#2D5016',
        'accent-earth': '#8B4513',
        'accent-rust': '#A0522D',
        'accent-stone': '#708090',
        'cta-primary': '#D97706',
        'cta-hover': '#B45309',
        'urgency': '#DC2626',
        'trust': '#1D4ED8',
        'success': '#16A34A',
        'text-primary': '#F5F5F5',
        'text-secondary': '#B8B8B8',
        'text-muted': '#6B7280',
        primary: '#D97706',
        secondary: '#8B4513',
        dark: { 900: '#0F0F1A', 800: '#16213E', 700: '#1A1A2E', 600: '#23232f' },

        // ══ LOOTIX v2 — "Forged" design system (design_handoff_lootix_site) ══
        // Sharp corners, no shadows, hairline borders, Cinzel display.
        ink: '#0D0B08',        // page background
        'ink-alt': '#0A0806',  // alt sections / panels
        'ink-card': '#100D08', // cards
        'ink-deep': '#080604', // announce bar / footer
        brass: '#C9A45C',      // gold accent (CTA fill, chips, rules)
        'brass-fg': '#14100A', // text on gold
        parchment: '#F0E6CE',  // cream headline
        linen: '#E8DCC2',      // cream text
        sand: '#A79878',       // body text
        stone: '#8F8168',      // muted
        ash: '#6E6250',        // dim

        // ── LOOTIX Obsidian & Gold (v1 — being replaced) ──
        obsidian: '#0A0A0B',
        panel: '#111113',
        'panel-warm': '#1A1610',
        gold: {
          DEFAULT: '#D4AF37',
          bright: '#F0CE6B',
          deep: '#C99B2C',
          label: '#C9A94A',
          soft: '#E8C66A',
        },
        cream: '#F4F0E6',
        muted: '#9A958C',
        'muted-2': '#8E8A82',
        faint: '#6B675F',
        'lootix-black': '#0A0A0B',
        'lootix-gold': { DEFAULT: '#D4AF37', light: '#F0CE6B', dark: '#C99B2C' },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-earth': 'linear-gradient(180deg, #0F0F1A 0%, #1A1A2E 50%, rgba(45,80,22,0.3) 100%)',
        // redesign gradients
        'gold-gradient': 'linear-gradient(180deg,#F0CE6B,#D4AF37)',
        'gold-text': 'linear-gradient(180deg,#F6D87E,#C99B2C)',
        'panel-warm': 'linear-gradient(165deg,#1A1610,#0D0D0E)',
        'panel-warm-soft': 'linear-gradient(165deg,#131210,#0D0D0E)',
      },
      fontFamily: {
        // keep existing (secondary pages): sans/display/body
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Bebas Neue', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
        // redesign fonts (explicitly used by new components)
        archivo: ['var(--font-archivo)', 'Archivo', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'Space Mono', 'monospace'],
        // v2 display face — all headings, prices, countdown digits, stat numbers
        cinzel: ['var(--font-cinzel)', 'Cinzel', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-mobile': ['36px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section': ['42px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'section-mobile': ['28px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'card-title': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['20px', { lineHeight: '1.6', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
        'badge': ['12px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '700' }],
      },
      letterSpacing: {
        eyebrow: '.28em',
        display: '-.03em',
        wordmark: '.34em',
      },
      spacing: {
        'xs': '4px', 'sm': '8px', 'md': '16px', 'lg': '24px',
        'xl': '32px', '2xl': '48px', '3xl': '64px', '4xl': '96px',
      },
      borderRadius: {
        'sm': '4px', 'md': '8px', 'lg': '16px', 'full': '9999px',
        // redesign radii
        btn: '5px', tier: '10px', card: '14px', feature: '16px',
      },
      maxWidth: {
        'container': '1280px',
        site: '1320px',
        prose: '1100px',
        v2: '1360px', // v2 max content width
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.3)',
        'md': '0 4px 6px rgba(0,0,0,0.4)',
        'lg': '0 10px 15px rgba(0,0,0,0.5)',
        'glow': '0 0 20px rgba(217,119,6,0.3)',
        'glow-hover': '0 0 30px rgba(217,119,6,0.5)',
        // redesign shadows
        'gold-btn': '0 10px 30px rgba(212,175,55,.30)',
        'gold-btn-sm': '0 6px 22px rgba(212,175,55,.28)',
        vault: '0 30px 70px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05)',
        card: '0 30px 70px rgba(0,0,0,.5)',
      },
      keyframes: {
        'pulse-urgency': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
        'float': { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        'bounce-slow': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(8px)' } },
        'lx-rise': { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'lx-marquee': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'pulse-urgency': 'pulse-urgency 1.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 1.5s ease-in-out infinite',
        'rise': 'lx-rise .7s ease both',
        'rise-slow': 'lx-rise .9s ease both',
        'marquee': 'lx-marquee 64s linear infinite',
      },
      screens: {
        'mobile': '0px', 'tablet': '640px', 'desktop': '1024px', 'large': '1280px',
      },
    },
  },
  plugins: [],
};

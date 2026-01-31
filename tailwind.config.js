/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Backgrounds (from brief Section 3.1)
        'bg-primary': '#1A1A2E',      // Deep Navy - Main page background
        'bg-secondary': '#16213E',    // Midnight Blue - Cards, elevated surfaces
        'bg-dark': '#0F0F1A',         // True Dark - Header, footer, hero overlays

        // Earth Tone Accents (Brand Differentiator)
        'accent-forest': '#2D5016',   // Forest Green - Success states, verified badges
        'accent-earth': '#8B4513',    // Saddle Brown - Borders, dividers, card outlines
        'accent-rust': '#A0522D',     // Rust/Sienna - Hover states, selected items
        'accent-stone': '#708090',    // Stone Gray - Disabled states

        // Action Colors (Conversion-Optimized)
        'cta-primary': '#D97706',     // Amber/Gold - ALL primary CTA buttons
        'cta-hover': '#B45309',       // Dark Amber - Primary CTA hover
        'urgency': '#DC2626',         // Urgency Red - Timer <24h, low stock
        'trust': '#1D4ED8',           // Trust Blue - Payment icons, security
        'success': '#16A34A',         // Success Green - Form success

        // Text Colors
        'text-primary': '#F5F5F5',    // Off-White - Headlines, primary text
        'text-secondary': '#B8B8B8',  // Muted Silver - Body text
        'text-muted': '#6B7280',      // Gray - Captions, timestamps

        // Legacy aliases for compatibility
        primary: '#D97706',           // Now amber/gold
        secondary: '#8B4513',         // Earth tone
        dark: {
          900: '#0F0F1A',
          800: '#16213E',
          700: '#1A1A2E',
          600: '#23232f',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Earth-tone gradient for overlays
        'gradient-earth': 'linear-gradient(180deg, #0F0F1A 0%, #1A1A2E 50%, rgba(45,80,22,0.3) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Bebas Neue', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Type Scale from brief Section 3.2
        'hero': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-mobile': ['36px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section': ['42px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'section-mobile': ['28px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'card-title': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['20px', { lineHeight: '1.6', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
        'badge': ['12px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '700' }],
      },
      spacing: {
        // Spacing System from brief Section 3.3
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      borderRadius: {
        // Border Radius from brief Section 3.4
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'full': '9999px',
      },
      boxShadow: {
        // Shadows from brief Section 3.5
        'sm': '0 1px 2px rgba(0,0,0,0.3)',
        'md': '0 4px 6px rgba(0,0,0,0.4)',
        'lg': '0 10px 15px rgba(0,0,0,0.5)',
        'glow': '0 0 20px rgba(217,119,6,0.3)',
        'glow-hover': '0 0 30px rgba(217,119,6,0.5)',
      },
      animation: {
        'pulse-urgency': 'pulse-urgency 1.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-urgency': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      screens: {
        // Breakpoints from brief Section 3.6
        'mobile': '0px',
        'tablet': '640px',
        'desktop': '1024px',
        'large': '1280px',
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
};

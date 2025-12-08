/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
<<<<<<< HEAD
          // Brand Colors
          'lootix-black': '#0f0f0f',
          'lootix-silver': {
            DEFAULT: '#c0c0c0',
            light: '#e0e0e0',
            dark: '#808080',
          },
          'lootix-gold': {
            DEFAULT: '#d4af37',
            light: '#ffd700',
            dark: '#b8860b',
          },
          'lootix-neon': {
            DEFAULT: '#00ff9d',
            pink: '#ff00ff',
            blue: '#00ffff',
          },
          // Semantic Colors
          primary: '#d4af37', // gold
          secondary: '#c0c0c0', // silver
          accent: '#00ff9d', // neon
          background: '#0f0f0f',
          surface: '#1a1a1a',
          text: {
            primary: '#ffffff',
            secondary: '#c0c0c0',
            muted: '#808080',
          },
        },
        fontFamily: {
          'orbitron': ['Orbitron', 'sans-serif'],
          'unica': ['Unica One', 'cursive'],
          'inter': ['Inter', 'sans-serif'],
          'poppins': ['Poppins', 'sans-serif'],
=======
          // Hormozi-style: ONE accent color, high contrast base
          primary: "#a855f7", // vibrant purple (ONLY accent)
          accent: "#a855f7", // same as primary for clarity
          dark: {
            900: "#0a0a0f", // very dark gray (not pure black)
            800: "#13131a",
            700: "#1a1a24",
            600: "#23232f",
          },
          // Keep these for backwards compatibility but use sparingly
          secondary: "#06b6d4",
          neon: {
            purple: "#a855f7",
            cyan: "#06b6d4",
            pink: "#ec4899",
            green: "#10b981",
            yellow: "#fbbf24",
          },
>>>>>>> 13414a3 (Update Lootix UX/UI and membership/quick entries pages)
        },
        backgroundImage: {
          'hero-pattern': "url('/images/hero-bg.jpg')",
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
<<<<<<< HEAD
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'zoom-in': 'zoomIn 0.5s ease-in-out',
          'parallax': 'parallax 20s linear infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          zoomIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          parallax: {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-50%)' },
=======
          'gradient-gaming': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          'gradient-neon': 'linear-gradient(90deg, #a855f7 0%, #06b6d4 50%, #ec4899 100%)',
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Rajdhani', 'sans-serif'], // Gaming-style font
          mono: ['JetBrains Mono', 'monospace'],
        },
        boxShadow: {
          'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
          'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
          'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
          'glow': '0 0 30px rgba(168, 85, 247, 0.3)',
        },
        animation: {
          'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 3s ease-in-out infinite',
          'gradient-shift': 'gradient-shift 3s ease infinite',
        },
        keyframes: {
          'pulse-glow': {
            '0%, 100%': {
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
              transform: 'scale(1)',
            },
            '50%': {
              boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)',
              transform: 'scale(1.02)',
            },
          },
          'float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          'gradient-shift': {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
>>>>>>> 13414a3 (Update Lootix UX/UI and membership/quick entries pages)
          },
        },
      },
    },
    plugins: [],
  };
  
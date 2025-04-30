/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
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
        },
        backgroundImage: {
          'hero-pattern': "url('/images/hero-bg.jpg')",
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
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
          },
        },
      },
    },
    plugins: [],
  };
  
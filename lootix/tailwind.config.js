/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#7c3aed", // purple
          dark: "#18181b",
        },
        backgroundImage: {
          'hero-pattern': "url('/images/hero-bg.jpg')",
        },
      },
    },
    plugins: [],
  };
  
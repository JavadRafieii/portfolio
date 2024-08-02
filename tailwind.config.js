/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-white":"#FFFFFF",
        "primary-light-gray":"#DDDDDD",
        "primary-purple":"#8750F7",
        "primary-dark-purple":"#2A1454",
        "primary-deep-purple":"#0F0715",
        "primary-pale-purple": "#2a1454",
        "primary-black":"#050709",
      },
      backgroundImage: {
        'primary-gradient-light': "linear-gradient(90deg, rgba(135,80,247,1) 0%, rgba(255,255,255,1) 100%);",
        'primary-gradient-dark': "linear-gradient(90deg, rgba(135,80,247,1) 0%, rgba(42,20,84,1) 100%);",
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2.5rem',
      },
    },
    screens: {
      'sm': '576px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 992px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1400px) { ... }
    }
  },
  plugins: [],
};

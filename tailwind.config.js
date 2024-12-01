/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown': {
          DEFAULT: '#8B4513',
        },
        'orange': {
          DEFAULT: '#f97316',
          light: '#FFF0E6',
        },
      }
    },
  },
  plugins: [],
}
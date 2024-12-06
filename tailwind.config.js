/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8B4513',
        'secondary': '#E97451',
        'success': '#22c55e',
      }
    },
  },
  plugins: [],
}
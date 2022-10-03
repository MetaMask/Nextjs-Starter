/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ganache': '#3fe0c5',
        'truffle': '#ff6b4a'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),],
}

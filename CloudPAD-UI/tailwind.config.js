/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { // use 60/30/10 rule
        'primary': '#F1F9F7',
        'primary-dark': '#49AB93',
        'secondary': '#ACDDE7',
        'secondary-dark': '#2D8A9C',
        'accent': '#ADB9E3',
        'accent-dark': "#334894",
  
      },
    },
  },
  plugins: [],
}

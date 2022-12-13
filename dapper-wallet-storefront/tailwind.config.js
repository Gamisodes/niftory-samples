/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dosis: ['"Dosis"', "sans-serif"],
      },
      colors: {
        main: "#15318E",
        purple: "#8B11B2",
        "purple.hover": "#670d84",
      },
    },
  },
  plugins: [],
}

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
      },
    },
  },
  plugins: [],
}

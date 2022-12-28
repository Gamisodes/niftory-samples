/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dosis: ['"Dosis"', "sans-serif"],
        bangers: ['"Bangers"', "cursive"],
        roboto: ['"Roboto"', "sans-serif"],
      },
      colors: {
        main: "#15318E",
        purple: "#8B11B2",
        "purple.hover": "#670d84",
        header: "rgb(149, 0, 202)",
        "header.opacity": "rgba(149, 0, 202, 0.4)",
      },
    },
  },
  plugins: [],
}

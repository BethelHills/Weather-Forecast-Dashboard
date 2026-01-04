/** @type {import('tailwindcss').Config} */
/* eslint-env node */
/* global module */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkStart: "#002E78",
        darkEnd: "#160524",
        lightStart: "#6E85D3",
        lightEnd: "#C38EF0",
      },
    },
  },
  plugins: [],
};

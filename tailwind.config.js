/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    screens: {
      xxs: "305px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    screens: {
      xxs: "305px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        back: "#78D8D1",
        primary: "#FF6F61",
        secondary: "#C5A3FF",
        "secondary-alt": "#F5F775",
        accent: "#00FFFF",
      },
    },
  },
  plugins: [],
};

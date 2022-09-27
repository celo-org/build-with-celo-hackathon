/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#09080E",
          dull: "#121118",
          light: "#2C2739",
          normal: "#1A1B1F",
        },
        grad: {
          green: "#7DF3D0",
          blue: "#6DBAFE",
          purple: "#BC84FE",
        },
        secondary: "#A6A0BB",
      },
    },
  },
  plugins: [],
};

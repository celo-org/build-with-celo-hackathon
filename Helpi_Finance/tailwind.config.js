module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
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
  variants: {
    extend: {},
  },
  plugins: [],
};

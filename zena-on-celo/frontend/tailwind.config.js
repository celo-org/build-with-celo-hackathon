/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'yellow': {
          DEFAULT: '#F9D923',
          'medium': '#DBC025',
          'dark': '#A68E08',
        },
        'green': {
          DEFAULT: '#36AE7C',
          'medium': '#2E9469',
          'dark': '#267A57'
        },
        'blue': {
          DEFAULT: '#187498',
          'medium': '#146180',
          'dark': '#104E66'
        },
        'font': {
          DEFAULT: '#3A3627',
          'medium': '#4F4A35',
          'light': '#726E5B',
          'grey': '#C7C0A4',
          'egg': '#C7C0A4',
        },
      }
    },
  },
  plugins: [],
}
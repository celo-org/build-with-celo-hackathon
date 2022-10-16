module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'inter': ['Inter','sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'poppins': ['poppins','sans-serif'],
      'passion':['Passion One', 'cursive'],
      'jost': ['Jost', 'sans-serif'],
      'open': ['Open Sans', 'sans-serif'],
      'work':['Work Sans', 'sans-serif']
    },
    screens: {
      'xxs':'320px',
      
      'xsm':'450px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}
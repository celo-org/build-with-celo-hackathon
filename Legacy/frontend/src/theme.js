import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1441px',
});

const colors = {
    brand: {
      primary: '#7000FF',
      white: '#FFFFFF',
      yellow: '#F7E427',
      dark: '#040211',
      teal: "#15F4CB",
      grey: "#1A1B5A",
      primaryGrey: "#F3F4F6"
    },
  }

  const fonts = {
    heading: `'Chakra Petch', k2d`,
    body: `'Chakra Petch', k2d`,
  }

  const styles = {
      body: {
        fontFamily: "'Coda', cursive",
      },
      '::placeholder': {
        color: '#BABABA',
      },
  };

const theme = extendTheme({ colors, styles, fonts, breakpoints });

export default theme;
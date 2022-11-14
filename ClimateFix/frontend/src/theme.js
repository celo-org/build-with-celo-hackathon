import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "1024px",
  xl: "1200px",
  xxl: "1441px",
});

const colors = {
  brand: {
    green: "#18541A",
    primary: "#119606",
    white: "#FFFFFF",
    lightGrey: "#FAF9F7",
    lightGreen: "#65D593",
    yellow: "#F7E427",
    dark: "#212529",
    secondary: "#C2E189",
    orange: "#FE9D1A",
    gray: '#A2ADBE',
    grey: '#F0F2F5',
  },
};

const fonts = {
  heading: `'Poppins', 'Arimo', san-serif`,
  body: `'Poppins', 'Arimo', san-serif`,
};

const styles = {
  body: {
    fontFamily: "'Poppins', 'Arimo', san-serif",
  },
  "::placeholder": {
    color: "#BABABA",
  },
};

const theme = extendTheme({ colors, styles, fonts, breakpoints });

export default theme;

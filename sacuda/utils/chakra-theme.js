import { extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light', // this is fallback if system color is not resolved
};

export default extendTheme({ config });

import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import Header from '../template/Header';

import theme from '../utils/chakra-theme';

import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;

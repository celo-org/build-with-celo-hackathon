import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Frame } from '../frontend/core/frame/Frame';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Frame>
        <Component {...pageProps} />
      </Frame>
    </SSRProvider>
  );
}

export default MyApp;

import Head from 'next/head';
import { PropsWithChildren, useState } from 'react';
import { Container } from 'react-bootstrap';
import { TopBar } from './ui/TopBar';
import classNames from 'classnames';
import { CeloProvider, NetworkNames } from '@celo/react-celo';
import '@celo/react-celo/lib/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = PropsWithChildren<{
  title?: string;
}>;

export const Frame = ({ children, title = 'Koral Earth' }: Props) => {
  const [queryClient] = useState(new QueryClient());
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Your gateway to getting rewards through carbon offsetting"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <CeloProvider
          dapp={{
            name: 'Koral Earth',
            description: 'Win rewards for offsetting your carbon footprint',
            url: 'http://celo-demo.koral.earth',
            icon: '',
          }}
          networks={[
            {
              name: NetworkNames.Localhost,
              rpcUrl: 'http://127.0.0.1:7545',
              explorer: 'http://127.0.0.1:7545',
              chainId: 1337,
            },
          ]}
          manualNetworkMode={true}
          defaultNetwork={NetworkNames.Localhost}
        >
          <TopBar />
          <Container className={classNames('pt-5')}>{children}</Container>
        </CeloProvider>
      </QueryClientProvider>
    </>
  );
};

import '@celo/react-celo/lib/styles.css';

import { CeloProvider, NetworkNames } from '@celo/react-celo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { PropsWithChildren, useState } from 'react';
import { Container } from 'react-bootstrap';
import classNames from 'classnames';
import { TopBar } from './ui/TopBar';
import type { Network } from '../../../common/blockchain';
import { celoNetworkConfig } from '../../../common/celo';

const network = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK as Network;
const celoNetworks = celoNetworkConfig(network);

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
          networks={celoNetworks}
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

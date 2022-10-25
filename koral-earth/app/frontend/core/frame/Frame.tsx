import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import { TopBar } from './ui/TopBar';
import classNames from 'classnames';
import { CeloProvider } from '@celo/react-celo';
import '@celo/react-celo/lib/styles.css';

type Props = PropsWithChildren<{
  title?: string;
}>;

export const Frame = ({ children, title = 'Koral Earth' }: Props) => (
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
    <CeloProvider
      dapp={{
        name: 'Koral Earth',
        description: 'Win rewards for offsetting your carbon footprint',
        url: 'http://celo-demo.koral.earth',
        icon: '',
      }}
    >
      <TopBar />
      <Container className={classNames('pt-5')}>{children}</Container>
    </CeloProvider>
  </>
);

import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import { TopBar } from './ui/TopBar';
import classNames from 'classnames';

type Props = PropsWithChildren<{
  title?: string;
}>;

export const Frame = ({ children, title = 'Koral Earth' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content="Your gateway to " />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <TopBar />
    <Container className={classNames('pt-5')}>{children}</Container>
  </>
);

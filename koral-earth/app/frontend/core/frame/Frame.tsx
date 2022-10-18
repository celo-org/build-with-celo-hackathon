import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title?: string;
}>;

export const Frame: FC<Props> = ({ children, title = 'Koral Earth' }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content="Your gateway to " />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
  </>
);

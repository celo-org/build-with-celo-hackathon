import Head from "next/head";
import React from "react";
import { Constant } from "../../utils/constant";

type Props = {
  title?: string;
};

export default function Meta({ title }: Props) {
  return (
    <Head>
      <title>{title ?? Constant.APP_NAME}</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      <link rel="mask-icon" href="/favicon.ico" color="#000000" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000" />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={Constant.APP_URL} />
      <meta name="twitter:title" content={Constant.APP_NAME} />

      <meta name="twitter:image" content="/favicon.ico" />
      <meta name="twitter:creator" content="@mmujhtech" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={Constant.APP_NAME} />
      <meta property="og:site_name" content={Constant.APP_NAME} />
      <meta property="og:url" content={Constant.APP_URL} />
      <meta property="og:image" content="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

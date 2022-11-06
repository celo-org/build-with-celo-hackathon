import Head from "next/head";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

export default function MainLayout({ children, title = "Page" }) {
  const pageTitle = `${title} | Nomis`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

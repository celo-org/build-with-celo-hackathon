import * as React from "react";
import Head from "next/head";
// import styles from "../styles/local/components/write.module.css";
import ActionAlerts from "../components/custom/ActionAlert";
import BandTable from "../components/Finance/Page";
import Invest from "../components/Invest";
import Digdao from "../components/DigDao";
import HomePage from "../components/HomePage";
// import Button from "@mui/material/Button";
// import Container  from "@mui/material/Container";
// import { CeloProvider, Alfajores, NetworkNames, SupportedProviders } from "@celo/react-celo";
import Layout from "../components/layout/Layout";

// interface MyAppPro {
//   lightMode:boolean;
//   currentPageRef:number;
//   routePage:(x:number) => {};
//   setmessage:(x:string) => {};
// }

export default function Home(): React.ReactElement {
  const [message, setMessage] = React.useState("");
  const [currentPageRef, setPage] = React.useState(0);
  const [lightMode, setMode] = React.useState(true);

  const toggleMode = () => setMode(!lightMode);

  // React.useEffect(() => {
  //   setPage(0);
  //   setMode(true);
  // }, []);

  const routePage = (index: number) => setPage(index);
  const setmessage = (value: string) => setMessage(value);

  function renderPage(index: number) {
    const PAGES = [
      <HomePage tvl={0} currency={"cUSD"} networkName={"Alfajores"} lightMode={lightMode} setPageRef={routePage} setmessage={setmessage} />, 
      <BandTable setPageRef={routePage} setmessage={setmessage} currentPageRef={currentPageRef} message={message} />, 
      <Invest lightMode={lightMode} setPageRef={routePage} setmessage={setmessage} />, 
      <Digdao lightMode={lightMode} setPageRef={routePage} />
  ];
    return PAGES[index];
  }

  return (
    <div className={lightMode ? "lightMode" : "darkMode"}>
      <Layout toggleMode={toggleMode} setPageRef={routePage} setmessage={setmessage}>
        <Head>
          <title>QuatreFinance</title>
          <meta name="description" content="Quatrefinance App" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <main >
          {/* <section className={" w-screen mx-auto p-2"}> */}
            {renderPage(currentPageRef)}
          {/* </section> */}
        </main>
      </Layout>
    </div>
  );
}

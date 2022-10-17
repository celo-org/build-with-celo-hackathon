import React from "react";
import "@celo/react-celo/lib/styles.css";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { Alfajores, CeloProvider } from "@celo/react-celo";
import { AppProps } from "next/app";
import { CustomThemeProvider } from "@/contexts/userTheme";
import { Provider } from "react-redux";
import store from "@/state/index";
import AppUpdater from "@/state/app/updater";
import Layout from "@/components_/Layout";
import "../styles/index.css";

function Updaters() {
  return (
    <>
      <AppUpdater />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <CeloProvider
          dapp={{
            name: "Celo Composer",
            description: "A demo dApp to showcase functionality",
            url: "https://celo-composer.netlify.app/",
            icon: "https://celo-composer.netlify.app/favicon.ico",
          }}
          network={Alfajores}
          // networks={[Mainnet, Alfajores]}
        >
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Updaters />
            <ApolloProvider client={client}>
              <div suppressHydrationWarning>
                {typeof window === "undefined" ? null : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </div>
            </ApolloProvider>
          </SnackbarProvider>
        </CeloProvider>
      </CustomThemeProvider>
    </Provider>
  );
}

export default MyApp;

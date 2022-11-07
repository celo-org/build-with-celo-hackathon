import React from "react";
import '@celo/react-celo/lib/styles.css';
import {Mainnet, Alfajores, CeloProvider } from "@celo/react-celo";
import { SnackbarProvider } from "notistack"
import { ApolloProvider } from "@apollo/client";
import client from "apollo-client";
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {

  return  < CeloProvider
            dapp={{
              name: "ArrowCatch",
              description: "onchain NFT game",
              url: "https://celo-composer.netlify.app/",
              icon: "https://celo-composer.netlify.app/favicon.ico",
            }}
            networks={[Alfajores, Mainnet]}
          >
          <ApolloProvider client={client}>
              <div suppressHydrationWarning>

                <Component {...pageProps} />
                
              </div>
            </ApolloProvider>
            </CeloProvider>
}

export default MyApp

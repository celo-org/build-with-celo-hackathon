import { useState } from "react"
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import AppContext from '../components/AppContext';
import Header from '../template/Header';
import theme from '../utils/chakra-theme';
import { connectorsForWallets, RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, omniWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// Import known recommended wallets
import { Valora, CeloWallet, CeloDance } from "@celo/rainbowkit-celo/wallets";

// Import CELO chain information
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";

import '../styles/globals.css';

const { chains, provider } = configureChains(
  [Alfajores, Celo],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains }),
      CeloWallet({ chains }),
      CeloDance({ chains }),
      metaMaskWallet({ chains }),
      omniWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
  ]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [uMail, setUMail] = useState()
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <AppContext.Provider value={{uMail,setUMail}}>
              <Header />
                <Component {...pageProps} />
             </AppContext.Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;

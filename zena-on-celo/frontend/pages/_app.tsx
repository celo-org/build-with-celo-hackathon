import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import {
  Chain,
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import Alfajores from "@celo/rainbowkit-celo/chains/alfajores.js";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Valora } from "../utils/valora.js";
import {
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

const { chains, provider, webSocketProvider } = configureChains(
  [Alfajores],
  [
    jsonRpcProvider({
      rpc: (chain: Chain) => ({ http: chain.rpcUrls.default }),
    }),
  ]
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains: chains }),
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

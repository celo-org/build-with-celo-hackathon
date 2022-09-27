import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// ------------------------- custom chains --------------->>>
const celoAlfajoresChain = {
  id: 44787,
  name: "Celo (Alfajores Testnet)",
  network: "celo",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/5567.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Alfajores",
    symbol: "CELO",
  },
  rpcUrls: {
    default: "https://alfajores-forno.celo-testnet.org",
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://alfajores-blockscout.celo-testnet.org",
    },
  },
  testnet: true,
};
const avalancheChain = {
  id: 43_114,
  name: "Avalanche",
  network: "avalanche",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/5805.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: "https://api.avax.network/ext/bc/C/rpc",
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};
const cronosChain = {
  id: 25,
  name: "Cronos",
  network: "Cronos",
  iconUrl: "https://cronoscan.com/images/brandassets/logo.jpg?v=22.8.3.0",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos",
    symbol: "CRO",
  },
  rpcUrls: {
    default: "https://evm-cronos.crypto.org",
  },
  blockExplorers: {
    default: { name: "Cronos", url: "https://cronos.crypto.org/explorer/" },
  },
  testnet: true,
};
// ------------------------- custom chains ---------------<<<

const { chains, provider, webSocketProvider } = configureChains(
  [
    celoAlfajoresChain,
    avalancheChain,
    cronosChain,
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Helpi Finance",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

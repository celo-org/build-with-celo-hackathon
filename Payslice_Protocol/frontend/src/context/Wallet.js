import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const baobab = {
    id: 1001,
    name: 'Klaytn Baobab',
    network: 'klaytn',
    nativeCurrency: {
      decimals: 18,
      name: 'Klay',
      symbol: 'KLAY',
    },
    rpcUrls: {
      default: 'https://public-node-api.klaytnapi.com/v1/baobab',
    },
    blockExplorers: {
      default: { name: 'Klaytnscope', url: 'https://baobab.scope.klaytn.com/' },
    },
    testnet: true
  }
const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.hardhat, baobab],
    [alchemyProvider({ apiKey: process.env.REACT_APP_POLYGON_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "Payslice",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export {chains, wagmiClient}

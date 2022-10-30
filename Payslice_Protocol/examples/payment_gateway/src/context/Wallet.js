import {
  connectorsForWallets,
  getWalletConnectConnector,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";


const [celo, alfajores] = [{
  id: 42220,
  name: 'Celo Mainnet',
  network: 'celo mainnet',
  iconUrl: process.env.REACT_APP_CELO_ICON,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'celo',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: process.env.REACT_APP_CELO_RPC,
  },
  blockExplorers: {
    default: { name: 'CeloScan', url: 'https://celoscan.io' },
    etherscan: { name: 'CeloScan', url: 'https://celoscan.io' },
  },
  testnet: false,
}, {
  id: 44787,
  name: 'Alfajores',
  network: 'alfajores',
  iconUrl: process.env.REACT_APP_CELO_ICON,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'celo',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: process.env.REACT_APP_ALFAJORES_RPC,
  },
  blockExplorers: {
    default: { name: 'CeloScan', url: 'https://alfajores.celoscan.io' },
    etherscan: { name: 'CeloScan', url: 'https://alfajores.celoscan.io' },
  },
  testnet: true,
} ];

const { chains, provider } = configureChains(
  [celo, alfajores],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) }), publicProvider()]
);


const Valora = ({ chains = [alfajores, celo], }) => ({
  id: "valora",
  name: "Valora",
  iconUrl: "https://registry.walletconnect.com/api/v1/logo/md/d01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974",
  iconBackground: "#FFF",
  downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=co.clabs.valora",
      ios: "https://apps.apple.com/app/id1520414263?mt=8",
      qrCode: "https://valoraapp.com/"
  },
  createConnector: () => {
      const connector = getWalletConnectConnector ({
          chains,
      });
      async function getUri() {
          const provider = await connector.getProvider();
          return provider.connector.uri;
      }
      return {
          connector,
          mobile: {
              getUri,
          },
          qrCode: {
              getUri,
              instructions: {
                  learnMoreUrl: "https://valoraapp.com/learn",
                  steps: [
                      {
                          description: "The crypto wallet to buy, send, spend, earn, and collect NFTs on the Celo blockchain.",
                          step: "install",
                          title: "Open the Valora app",
                      },
                      {
                          description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                          step: "scan",
                          title: "Tap the scan button",
                      },
                  ],
              },
          },
      };
  },
});

const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains }),
      wallet.metaMask({ chains }),
      wallet.walletConnect({ chains }),
    ],
  },
])

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export {chains, wagmiClient}

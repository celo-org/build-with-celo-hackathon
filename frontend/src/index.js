import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WagmiConfig, configureChains, chain, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import {
  RainbowKitProvider,
  connectorsForWallets,
  wallet,
  darkTheme
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import * as CONSTANTS from './constants';

const Kardiachain_testNet = {
  id: CONSTANTS.KARDIACHAIN_TESTNET.ID,
  name: CONSTANTS.KARDIACHAIN_TESTNET.NAME,
  network: CONSTANTS.KARDIACHAIN_TESTNET.NETWORK,
  iconUrl: CONSTANTS.KARDIACHAIN_TESTNET.ICONURL,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: CONSTANTS.KARDIACHAIN_TESTNET.NATIVECURRENCT_NAME,
    name: CONSTANTS.KARDIACHAIN_TESTNET.NATIVECURRENCT_NAME,
    symbol: CONSTANTS.KARDIACHAIN_TESTNET.NATIVECURRENCT_SYMBOLS,
  },
  rpcUrls: {
    default: CONSTANTS.KARDIACHAIN_TESTNET.NATIVECURRENCT_RPCURL_DEFAULT,
  },
  blockExplorers: {
    default: {
      name: CONSTANTS.KARDIACHAIN_TESTNET.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_NAME,
      url: CONSTANTS.KARDIACHAIN_TESTNET.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_URL,
    },
  },
  testnet: CONSTANTS.KARDIACHAIN_TESTNET.TESTNET,
}

const Kardiachain_mainnet = {
  id: CONSTANTS.KARDIACHAIN_MAINNET.ID,
  name: CONSTANTS.KARDIACHAIN_MAINNET.NAME,
  network: CONSTANTS.KARDIACHAIN_MAINNET.NETWORK,
  iconUrl: CONSTANTS.KARDIACHAIN_MAINNET.ICONURL,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: CONSTANTS.KARDIACHAIN_MAINNET.NATIVECURRENCT_NAME,
    name: CONSTANTS.KARDIACHAIN_MAINNET.NATIVECURRENCT_NAME,
    symbol: CONSTANTS.KARDIACHAIN_MAINNET.NATIVECURRENCT_SYMBOLS,
  },
  rpcUrls: {
    default: CONSTANTS.KARDIACHAIN_MAINNET.NATIVECURRENCT_RPCURL_DEFAULT,
  },
  blockExplorers: {
    default: {
      name: CONSTANTS.KARDIACHAIN_MAINNET.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_NAME,
      url: CONSTANTS.KARDIACHAIN_MAINNET.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_URL,
    },
  },
  testnet: CONSTANTS.KARDIACHAIN_MAINNET.TESTNET,
}

const { chains, provider } = configureChains(
  [Kardiachain_mainnet, Kardiachain_testNet, chain.polygon],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
)

// const {connectors} = getDefaultWallets({
//   appName: "My App",
//   chains
// })

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.rainbow({ chains }),
      wallet.walletConnect({ chains }),
      wallet.metaMask({ chains }),
      wallet.trust({ chains }),
      wallet.argent({ chains }),
      wallet.coinbase({ appName: 'My App', chains }),
      wallet.brave({ chains }),
      wallet.omni({ chains }),
      wallet.imToken({ chains }),
      wallet.ledger({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme()}
        coolMode
        showRecentTransactions={true}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

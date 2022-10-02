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

const Baklava = {
  id: CONSTANTS.Baklava.ID,
  name: CONSTANTS.Baklava.NAME,
  network: CONSTANTS.Baklava.NETWORK,
  iconUrl: CONSTANTS.Baklava.ICONURL,
  iconBackground: CONSTANTS.Baklava.ICON_BG,
  nativeCurrency: {
    decimals: CONSTANTS.Baklava.NATIVECURRENCT_NAME,
    name: CONSTANTS.Baklava.NATIVECURRENCT_NAME,
    symbol: CONSTANTS.Baklava.NATIVECURRENCT_SYMBOLS,
  },
  rpcUrls: {
    default: CONSTANTS.Baklava.NATIVECURRENCT_RPCURL_DEFAULT,
  },
  blockExplorers: {
    default: {
      name: CONSTANTS.Baklava.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_NAME,
      url: CONSTANTS.Baklava.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_URL,
    },
  },
  testnet: CONSTANTS.Baklava.TESTNET,
}

const Alfajores = {
  id: CONSTANTS.Alfajores.ID,
  name: CONSTANTS.Alfajores.NAME,
  network: CONSTANTS.Alfajores.NETWORK,
  iconUrl: CONSTANTS.Alfajores.ICONURL,
  iconBackground: CONSTANTS.Alfajores.ICON_BG,
  nativeCurrency: {
    decimals: CONSTANTS.Alfajores.NATIVECURRENCT_NAME,
    name: CONSTANTS.Alfajores.NATIVECURRENCT_NAME,
    symbol: CONSTANTS.Alfajores.NATIVECURRENCT_SYMBOLS,
  },
  rpcUrls: {
    default: CONSTANTS.Alfajores.NATIVECURRENCT_RPCURL_DEFAULT,
  },
  blockExplorers: {
    default: {
      name: CONSTANTS.Alfajores.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_NAME,
      url: CONSTANTS.Alfajores.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_URL,
    },
  },
  testnet: CONSTANTS.Alfajores.TESTNET,
}

const Celo = {
  id: CONSTANTS.Celo.ID,
  name: CONSTANTS.Celo.NAME,
  network: CONSTANTS.Celo.NETWORK,
  iconUrl: CONSTANTS.Celo.ICONURL,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: CONSTANTS.Celo.NATIVECURRENCT_NAME,
    name: CONSTANTS.Celo.NATIVECURRENCT_NAME,
    symbol: CONSTANTS.Celo.NATIVECURRENCT_SYMBOLS,
  },
  rpcUrls: {
    default: CONSTANTS.Celo.NATIVECURRENCT_RPCURL_DEFAULT,
  },
  blockExplorers: {
    default: {
      name: CONSTANTS.Celo.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_NAME,
      url: CONSTANTS.Celo.NATIVECURRENCT_BLOCKEXPLORER_DEFAULT_URL,
    },
  },
  testnet: CONSTANTS.Celo.TESTNET,
}

const { chains, provider } = configureChains(
  [Celo, Alfajores],
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

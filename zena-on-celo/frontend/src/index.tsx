import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Alfajores from "@celo/rainbowkit-celo/chains/alfajores";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, provider, webSocketProvider } = configureChains(
  [Alfajores],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: "Zena",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

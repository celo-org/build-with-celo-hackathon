import React from "react";
import Box from "@mui/material/Box";
import { Toolbar, Typography } from "@mui/material";
import { NavBar, LandingPage, Footer, Explore } from "./components";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "LETS GO",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <BrowserRouter>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Box>
            <NavBar />
            <Toolbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/explore" element={<Explore />} />
            </Routes>
            <Footer />
          </Box>
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  );
};

export default App;

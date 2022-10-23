import "./App.css";
import { Layout } from "antd";
import Payment from "./pages/Payment";
import Navigation from "./components/Navigation";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { chains, wagmiClient } from "./context/Wallet";
import { WagmiConfig } from "wagmi";
import Home from "./pages/Home";
import Router from "./pages";

const { Header, Content, Footer } = Layout;
function App() {
    return (
        
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider theme={darkTheme()} chains={chains}>
                <Router />
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default App;

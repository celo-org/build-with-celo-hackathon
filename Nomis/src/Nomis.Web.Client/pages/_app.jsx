import { ThemeProvider } from "next-themes";
import { createContext, useState } from "react";
import "../styles/index.scss";

export const WalletContext = createContext();

export default function App({ Component, pageProps }) {
  const [wallet, setWallet] = useState();

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </WalletContext.Provider>
  );
}

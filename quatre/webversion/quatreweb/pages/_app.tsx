import "@celo/react-celo/lib/styles.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import styles from '../styles/local/components/write.module.css'
import type { AppProps } from "next/app";
import { CeloProvider, Alfajores, SupportedProviders} from "@celo/react-celo";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CeloProvider
      dapp={{
        name: "Quatrefinance",
        description: "Solution for lifestyle finances",
        url: "https://quatrefi.link.eth",
        icon: ""
      }}

      // theme={{
      //   primary: "#6366f1",
      //   secondary: "#eef2ff",
      //   text: "#000000",
      //   textSecondary: "#1f2937",
      //   textTertiary: "#64748b",
      //   muted: "#e2e8f0",
      //   background: "#ffffff",
      //   error: "#ef4444"
      // }}

      defaultNetwork={Alfajores.name}
      connectModal={{
        title: (
          <span>
            Connect Wallet
          </span>
        ),
        providersOptions: {
          hideFromDefaults: [
            SupportedProviders.Omni,
            SupportedProviders.Ledger,
            SupportedProviders.Valora,
            SupportedProviders.Injected,
            SupportedProviders.CeloDance,
            SupportedProviders.PrivateKey, 
            SupportedProviders.Steakwallet,
            SupportedProviders.CeloTerminal,
            SupportedProviders.CoinbaseWallet,
            SupportedProviders.CeloExtensionWallet
          ],
          // searchable: true
        }
      }}
    >
      <Component {...pageProps} />
    </CeloProvider>
  );
}

export default MyApp
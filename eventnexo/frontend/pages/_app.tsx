import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/space-mono";
import "@fontsource/fira-sans";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { CeloProvider, Alfajores, Mainnet } from "@celo/react-celo";
import { Provider } from "react-redux";
import { store } from "../app/store";
import "@celo/react-celo/lib/styles.css";
import PersistWrapper from "next-persist/lib/NextPersistWrapper";

const PersistWrapperTypeFixed = PersistWrapper as any;

function MyApp({ Component, pageProps }: AppProps) {
  const nextPersistConfig = {
    method: "localStorage",
    allowList: {
      tokenPrice: ["prices"],
    },
  };

  return (
    <Provider store={store}>
      <PersistWrapperTypeFixed wrapperConfig={nextPersistConfig}>
        <CeloProvider
          networks={[Alfajores, Mainnet]}
          defaultNetwork={Alfajores.name}
          dapp={{
            name: "Eventnexo",
            description: "Community First Event Management on Celo Network",
            url: "https://example.com",
            icon: "",
          }}
        >
          <Component {...pageProps} />
        </CeloProvider>
      </PersistWrapperTypeFixed>
    </Provider>
  );
}

export default MyApp;

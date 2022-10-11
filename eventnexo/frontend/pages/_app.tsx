import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/space-mono";
import "@fontsource/fira-sans"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

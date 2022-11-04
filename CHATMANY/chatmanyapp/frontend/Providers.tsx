import React from "react";
import { MoralisProvider } from "react-moralis";
import Moralis from "moralis/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enableViaWalletConnect } from "./Moralis/enableViaWalletConnect";
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from "./WalletConnect";
import { Platform } from "react-native";
import Qrcode from "./Qrcode";
import { expo } from "../app.json";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import {
  REACT_APP_MORALIS_APPLICATION_ID,
  REACT_APP_MORALIS_SERVER_URL,
} from "@env";

interface ProvidersProps {
  readonly children: JSX.Element;
}

const { scheme } = expo;

/**
 * Initialization of Moralis
 */
const appId = REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = REACT_APP_MORALIS_SERVER_URL;
const environment = "native";
// Initialize Moralis with AsyncStorage to support react-native storage
Moralis.setAsyncStorage(AsyncStorage);
// Replace the enable function to use the react-native WalletConnect
// @ts-ignore
Moralis.enable = enableViaWalletConnect;
console.log(AsyncStorage.getAllKeys(), "KEYS");

const walletConnectOptions: WalletConnectProviderProps = {
  redirectUrl: Platform.OS === "web" ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
  // Uncomment to show a QR-code to connect a wallet
  // renderQrcodeModal: Qrcode,
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId={appId}
        serverUrl={serverUrl}
        environment={environment}>
        <MoralisDappProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            {children}
          </ApplicationProvider>
        </MoralisDappProvider>
      </MoralisProvider>
    </WalletConnectProvider>
  );
};

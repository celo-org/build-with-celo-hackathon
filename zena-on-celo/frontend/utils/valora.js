// imported from https://github.com/celo-org/rainbowkit-celo/blob/main/packages/rainbowkit-celo/wallets/valora.ts

import { getWalletConnectConnector } from "@rainbow-me/rainbowkit";
// import { Alfajores, Baklava, Celo } from "../ /chains/index.js";
// rainbowkit utils has it but doesn't export it :/
function isAndroid() {
    return (typeof navigator !== "undefined" && /android/i.test(navigator.userAgent));
}
export const Valora = ({ chains }) => ({
    id: "valora",
    name: "Valora",
    iconUrl: "https://registry.walletconnect.com/api/v1/logo/md/d01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974",
    iconBackground: "#FFF",
    downloadUrls: {
        android: "https://play.google.com/store/apps/details?id=co.clabs.valora",
        ios: "https://apps.apple.com/app/id1520414263?mt=8",
        qrCode: "https://valoraapp.com/"
    },
    createConnector: () => {
        const connector = getWalletConnectConnector({
            chains,
        });
        async function getUri() {
            const { uri } = (await connector.getProvider()).connector;
            return isAndroid()
                ? uri
                : // ideally this would use the WalletConnect registry, but this will do for now
                `https://valoraapp.com/wc?uri=${encodeURIComponent(uri)}`;
        }
        return {
            connector,
            mobile: {
                getUri,
            },

        };
    },
});
export default Valora;

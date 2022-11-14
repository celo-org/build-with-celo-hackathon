import type { MetaMaskInpageProvider } from "@metamask/providers";
declare var window: any;
export const useMetaMask = () => {
  const ethereum = window?.ethereum;
  if (!ethereum || !ethereum.isMetaMask) return;
  return ethereum as unknown as MetaMaskInpageProvider;
};

export const requestAccount = async (metaMask) => {
  if (typeof window.ethereum !== "undefined") {
    let provider = window.ethereum;
    // edge case if MM and CBW are both installed
    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach(async (p) => {
        if (metaMask === true) {
          if (p.isMetaMask) provider = p;
        } else {
          if (p.isCoinbaseWallet) {
            provider = p;
          }
        }
      });
    }
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }], // chainId must be in hexadecimal numbers
    });
    await provider.request({
      method: "eth_requestAccounts",
      params: [],
    });
  }
};

export const isConnected = async () => {
  if (window.ethereum) {
    let connectionStatus = await window.ethereum.isConnected();
    console.log(connectionStatus);
    let chainId = window.ethereum.networkVersion;
    console.log(chainId);
    if (chainId == "80001" && connectionStatus == true) {
      return connectionStatus;
    }
  }
  return false;
};

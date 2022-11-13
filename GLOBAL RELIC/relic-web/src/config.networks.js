const NETWORK_PARAMS = {
    chainName: "Celo",
    nativeCurrency: {
      name: "Celo",
      symbol: "CELO",
      decimals: 18,
    },
  };
  
  const MAINNET_PARAMS = {
    ...NETWORK_PARAMS,
    chainId: "0xa4ec", // 42220
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://explorer.celo.org/"],
  };
  
  const ALFAJORES_PARAMS = {
    ...NETWORK_PARAMS,
    chainId: "0xaef3", // 44787
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
  };

  export { MAINNET_PARAMS, ALFAJORES_PARAMS };
import { Goerli,DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";

import  { Alfajores}  from './utils/celoChain';


export const DAPP_CONFIG = {
  //readOnlyChainId: Goerli.chainId,
  readOnlyChainId: Alfajores.chainId,
  readOnlyUrls: {
    // [Goerli.chainId]: "https://eth-goerli.g.alchemy.com/v2/VFVeT3J9yUX9SZs4FStpZUZSJyIUolda",
    [Alfajores.chainId]: 'https://celo-hackathon.lavanet.xyz/celo-alfajores/http',

  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, Alfajores],
  noMetamaskDeactivate: true
};

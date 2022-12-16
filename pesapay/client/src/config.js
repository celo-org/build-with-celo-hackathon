import { DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core"

import { Celo, Alfajores } from "./utils/celoChain"

export const DAPP_CONFIG = {
  readOnlyChainId: Alfajores.chainId,
  readOnlyUrls: {
    [Alfajores.chainId]:
      "https://celo-hackathon.lavanet.xyz/celo-alfajores/http",
    [Celo.chainId]: "https://celo-hackathon.lavanet.xyz/celo/http",
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, Alfajores],
  noMetamaskDeactivate: true,
}

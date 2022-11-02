import { chainIds, Network, rpcUrls } from './blockchain';
import { NetworkNames } from '@celo/react-celo';

export type SupportedNeworkNames = {
  [k in Network]: keyof typeof NetworkNames;
};

const CeloNetworkNames: SupportedNeworkNames = {
  ganache: NetworkNames.Localhost,
  alfajores: NetworkNames.Alfajores,
  mainnet: NetworkNames.Mainnet,
};

export const celoNetworkConfig = (network: Network) => [
  {
    name: CeloNetworkNames[network],
    rpcUrl: rpcUrls[network],
    explorer: rpcUrls[network],
    chainId: chainIds[network],
  },
];

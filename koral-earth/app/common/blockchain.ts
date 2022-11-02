import type { NetworkUserConfig } from 'hardhat/types';
import { getEnvVar } from './env';

export const chainIds = {
  ganache: 1337,
  mainnet: 42220,
  alfajores: 44787,
};

export type Network = keyof typeof chainIds;

export type RpcUrls = {
  [k in Network]: string;
};

export const rpcUrls: RpcUrls = {
  ganache: 'http://127.0.0.1:7545',
  mainnet: 'https://forno.celo.org',
  alfajores: 'https://alfajores-forno.celo-testnet.org',
};

export const explorerUrls: RpcUrls = {
  ganache: 'http://127.0.0.1:7545',
  mainnet: 'http://explorer.celo.org/',
  alfajores: 'https://alfajores-blockscout.celo-testnet.org',
};

export function getNetworkConfig(network: Network): NetworkUserConfig {
  return {
    accounts: {
      count: 10,
      mnemonic: getEnvVar('MNEMONIC'),
      path: getEnvVar('ACCOUNT_PATH'),
    },
    chainId: chainIds[network],
    url: rpcUrls[network],
  };
}

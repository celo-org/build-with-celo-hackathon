import '@nomiclabs/hardhat-web3';
import 'dotenv/config';
import 'hardhat-celo';
import 'hardhat-deploy';
import 'hardhat-ethernal';
import type { HardhatUserConfig } from 'hardhat/config';
import { getEnvVar } from './app/common/env';
import { getNetworkConfig, Network } from './app/common/blockchain';

const defaultNetwork = getEnvVar<Network>('DEPLOYMENT_NETWORK');

const config: HardhatUserConfig = {
  defaultNetwork,
  ethernal: {
    email: getEnvVar('ETHERNAL_USERNAME'),
    password: getEnvVar('ETHERNAL_PASSWORD'),
    disableSync: false,
    disableTrace: false,
    workspace: 'colony',
    uploadAst: true,
    disabled: false,
    resetOnStart: undefined,
    serverSync: false,
  },
  etherscan: {
    apiKey: {
      mainnet: getEnvVar('CELOSCAN_API_KEY'),
      alfajores: getEnvVar('CELOSCAN_API_KEY'),
    },
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    ganache: getNetworkConfig('ganache'),
    mainnet: getNetworkConfig('mainnet'),
    alfajores: getNetworkConfig('alfajores'),
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  solidity: {
    version: '0.8.17',
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: 'none',
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: 'app/typechain',
    target: 'web3-v1',
  },
};

export default config;

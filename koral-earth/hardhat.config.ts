import '@nomiclabs/hardhat-web3';
import 'dotenv/config';
import 'hardhat-celo';
import 'hardhat-deploy';
import 'hardhat-ethernal';
import type { HardhatUserConfig } from 'hardhat/config';
import type { NetworkUserConfig } from 'hardhat/types';

function getEnvVar(key: EnvVarName): string {
  const val = process.env[key];
  if (!val) {
    throw new Error(
      `Requested env var not defined. Please provide a ${key} in the process environment`
    );
  }
  return val;
}

const chainIds = {
  ganache: 1337,
  mainnet: 42220,
  alfajores: 44787,
};

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl = 'http://127.0.0.1:7545';

  if (chain === 'alfajores') {
    jsonRpcUrl = 'https://alfajores-forno.celo-testnet.org';
  }

  if (chain === 'mainnet') {
    jsonRpcUrl = 'https://forno.celo.org';
  }

  return {
    accounts: {
      count: 10,
      mnemonic: getEnvVar('MNEMONIC'),
      path: getEnvVar('ACCOUNT_PATH'),
    },
    chainId: chainIds[chain],
    url: jsonRpcUrl,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: 'ganache',
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
    ganache: getChainConfig('ganache'),
    mainnet: getChainConfig('mainnet'),
    alfajores: getChainConfig('alfajores'),
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
    outDir: 'typechain',
    target: 'web3-v1',
  },
};

export default config;

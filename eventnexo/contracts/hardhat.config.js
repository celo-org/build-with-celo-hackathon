require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-celo");
require("dotenv").config({ path: ".env" });

const defaultNetwork = "hardhat";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork,
  solidity: "0.8.10",
  etherscan: {
    apiKey: {
      alfajores: "K7KR894CXR3JMRI6H84RIV5WT9X9FKS71K",
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  typechain: {
    outDir: "types",
    target: "web3-v1",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
};

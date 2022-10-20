require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
require("hardhat-celo");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// npx hardhat verify 0x90Cb84baB5699298122b90830fE7674ccB3109eA --network alfajores
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const CELO_API_KEY = process.env.CELO_API_KEY;

const API = process.env.API;

const RPC_URL = process.env.RPC_URL;


module.exports = {
  solidity: "0.8.7",
  networks: {
    goerli: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
    alfajores: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },

  },
  etherscan: {
    apiKey: {
      alfajores: CELO_API_KEY,
    },
  },

  // etherscan: {
  //   apiKey: {
  //     alfajores: CELO_API_KEY,
  //   },
  //   customChains: [
  //     {
  //       network: "alfajores",
  //       chainId: 44787,
  //       urls: {
  //         apiURL: "https://api-alfajores.celoscan.io/api",
  //         browserURL: "https://alfajores.celoscan.io",
  //       },
  //     },
  //     {
  //       network: "celo",
  //       chainId: 42220,
  //       urls: {
  //         apiURL: "https://api.celoscan.io/api",
  //         browserURL: "https://celoscan.io/",
  //       },
  //     },
  //   ],
  // },
};


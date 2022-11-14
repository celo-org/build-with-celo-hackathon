require("@nomicfoundation/hardhat-chai-matchers")
require("@openzeppelin/hardhat-upgrades")
require("@nomiclabs/hardhat-ethers")
require("dotenv").config({ path: ".env" })

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",

  networks: {
    local: {
      url: "http://localhost:8545",
    },
    alfajores: {
      // url: "https://alfajores-forno.celo-testnet.org",
      url: "https://celo-hackathon.lavanet.xyz/celo-alfajores/http",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
    celo: {
      // url: "https://forno.celo.org",
      url: "https://celo-hackathon.lavanet.xyz/celo/http",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
  },
  etherscan: {
    apiKey: {
      alfajores: process.env.CELOSCAN_API_KEY,
      celo: process.env.CELOSCAN_API_KEY,
    },
    customChains: [
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },
      {
        network: "celo",
        chainId: 44220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io",
        },
      },
    ],
  },
  mocha: {
    timeout: 80000,
  },
}

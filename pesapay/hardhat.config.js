require("@nomicfoundation/hardhat-chai-matchers")
require("@openzeppelin/hardhat-upgrades")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-celo")
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
  etherscan: {
    apiKey: {
      alfajores: process.env.CELOSCAN_API_KEY,
      celo: process.env.CELOSCAN_API_KEY,
    },
  },
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad",
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: "https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad",
      accounts: [process.env.PRIVATE_KEY],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    fantom: {
      url: "https://rpcapi.fantom.network",
      gasPrice: 1000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    testnetFantom: {
      url: "https://rpc.testnet.fantom.network",
      gasPrice: 1000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
}
// customChains: [
//   {
//     network: "alfajores",
//     chainId: 44787,
//     urls: {
//       apiURL: "https://api-alfajores.celoscan.io/api",
//       browserURL: "https://alfajores.celoscan.io",
//     },
//   },
//   {
//     network: "celo",
//     chainId: 42220,
//     urls: {
//       apiURL: "https://api.celoscan.io/api",
//       browserURL: "https://celoscan.io/",
//     },
//   },
// ],

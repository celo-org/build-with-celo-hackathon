require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.15",
  networks: {
    hardhat: {
      forking: {
        url: process.env.CELO_FERNO_RPC
      }
    },
    mainnet: {
      url: process.env.CELO_FERNO_RPC,
      accounts: [process.env.MAIN_ACCOUNT_PRIVATE_KEY]
    },
    alfajores: {
      url: process.env.ALFAJORE_FERNO_RPC,
      accounts: [proccess.env.ACCOUNT_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey:{
      alfajores: proccess.env.CELO_SCAN_API_KEY,
      celo: proccess.env.CELO_SCAN_API_KEY
    }
  }
  
};

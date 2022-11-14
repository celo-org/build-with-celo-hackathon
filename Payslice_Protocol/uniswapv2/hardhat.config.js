require("@nomicfoundation/hardhat-toolbox");
// require("hardhat-celo");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.15",
  networks: {
    alfajores: {
      url: process.env.ALFAJORE_FERNO_RPC,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey:{
      alfajores: process.env.CELO_SCAN_API_KEY
    }
  }
};

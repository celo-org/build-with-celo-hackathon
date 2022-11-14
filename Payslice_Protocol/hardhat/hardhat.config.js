require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.15",
  networks: {
    // hardhat: {
    //   forking: {
    //     url: process.env.CELO_FERNO_RPC
    //   }
    // },
    // mainnet: {
    //   url: process.env.CELO_FERNO_RPC,
    //   accounts: [process.env.MAIN_ACCOUNT_PRIVATE_KEY]
    // },
    alfajores: {
      url: process.env.ALFAJORE_FERNO_RPC,
      accounts: [process.env.TEST_ACCOUNT_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey:{
      alfajores: process.env.CELO_SCAN_API_KEY,
      celo: process.env.CELO_SCAN_API_KEY
    }
  }
  
};

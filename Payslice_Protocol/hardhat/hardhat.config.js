require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
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
  
};

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    baobab: {
      url: "https://public-node-api.klaytnapi.com/v1/baobab",
      accounts: [process.env.ACCOUNT_KEY]
    }
  }
};

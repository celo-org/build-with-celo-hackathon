require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});
const account = process.env.myAccount;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    alfajores:{
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [account],
      chainId: 44787,
    },
  },
};

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "alfajores",
  networks: {
   alfajores: {
     url: "https://alfajores-forno.celo-testnet.org",
     accounts: ['0x' + process.env.PRIVATE_KEY],
     chainId: 44787
   }
  }
};

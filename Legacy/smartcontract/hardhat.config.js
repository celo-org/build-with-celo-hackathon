require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "alfajores",
  networks: {
   alfajores: {
     url: "https://celo-hackathon.lavanet.xyz/celo-alfajores/http",
     accounts: [process.env.P, process.env.PRIVATE_KEY],
     chainId: 44787
   }
  }
};

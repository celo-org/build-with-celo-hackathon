require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "alfajores",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
      chainId: 44787
    }
  },
  paths: {
    artifacts: './src/artifacts'
  }
};

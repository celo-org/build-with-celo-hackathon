require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "alfajores",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: ['c98941859bb9d1141e6387ded62ec039b74ee0d1759c383a5774b233da5bb4bf'],
      chainId: 44787
    }
  },
  paths: {
    artifacts: './src/artifacts'
  }
};

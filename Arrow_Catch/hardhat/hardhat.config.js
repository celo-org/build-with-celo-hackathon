require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    networks: {
      alfajores: {
          // can be replaced with the RPC url of your choice.
          url: "https://alfajores-forno.celo-testnet.org",
          accounts: [
              "<YOUR_PRIVATE_KEY>"
          ],
      },
      celo: {
          url: "https://forno.celo.org",
          accounts: [
              "<YOUR_PRIVATE_KEY>"
          ],
      }
  },
  etherscan: {
      apiKey: {
          alfajores: "<CELOSCAN_API_KEY>",
          celo: "<CELOSCAN_API_KEY>"
      },
  },
  solidity: "0.8.0",
};

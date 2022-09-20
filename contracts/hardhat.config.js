require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('@openzeppelin/hardhat-upgrades')

const infura_projectId = '403f2033226a44788c2638cc1c29d438'
const fs = require('fs')
const privateKey = fs.readFileSync('.secret').toString()

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },

    celo_testnet: {
      url: `https://alfajores-forno.celo-testnet.org`,
      accounts: [privateKey],
    },
    celo_mainnet: {
      url: `https://forno.celo.org`,
      accounts: [privateKey],
    }
  },
  etherscan: {
    apiKey: '5PB2QWEDWRA9JBUWGBDHHZFM2X5YECC5Q2',
  },
  solidity: '0.8.2',
  paths: {
    artifacts: '../web/artifacts',
  },
}

import '@nomiclabs/hardhat-waffle'

module.exports = {
  solidity: '0.8.17',
  networks: {
    localhost: { url: `http://127.0.0.1:7545` },
    //Alfajores testnet
    testnet: {
      url: 'https://alfajores-forno.celo-testnet.org',
      accounts: ['555bbf12d0931a8068f41c2126a1860f85727a4156e5e22bf224c1604dbb0919'],
    },
  },
}

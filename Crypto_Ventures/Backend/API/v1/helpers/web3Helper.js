require("dotenv").config();
const Web3 = require("web3");

class Web3JS {
  constructor() {
    this.web3 = new Web3(process.env.CELO_ALFAJORES);
  }

  switchProvider(providerUrl) {
    this.web3 = new Web3(providerUrl);
  }

  getAccounts() {
    return this.web3.getAccounts();
  }

  createWallet() {
    return this.web3.eth.accounts.create();
  }

  encrypt(privateKey, password) {
    return web3.eth.accounts.encrypt(privateKey, password);
  }

  decrypto(keystoreJsonV3, password) {
    return web3.eth.accounts.decrypt(keystoreJsonV3, password);
  }
}

module.exports = Web3JS;

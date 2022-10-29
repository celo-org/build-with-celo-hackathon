require("dotenv").config();
const Web3 = require("web3");
const Event = require("node:events");

class Web3JS extends Event {
  constructor(network, contractABI, contractAddress) {
    super();
    this.web3 = new Web3(new Web3.providers.HttpProvider(network));
    this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
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

  decrypt(keystoreJsonV3, password) {
    return web3.eth.accounts.decrypt(keystoreJsonV3, password);
  }

  async createFund(nameOfFund, size, sender) {
    const sizeInWei = this.toWei(size);
    await this.contract.methods
      .createFund(nameOfFund, sizeInWei)
      .send({
        from: sender,
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        this.emit("fundCreated", { nameOfFund, size, sender });
        console.log("confirmationNumber:", confirmationNumber);
        console.log("receipt:", receipt);
      })
      .on("error", (error, receipt) => console.log("ERROR:", error));
  }

  async investInFund(fundOwnerAddress, investorAddress, nameOfFund, amount) {
    const amountInWei = this.toWei(amount);
    await this.contract.methods
      .investInFund(fundOwnerAddress, nameOfFund)
      .send({
        from: investorAddress,
        value: amountInWei,
      })
      .on("receipt", () =>
        this.emit("investedInFund", { nameOfFund, amount, investorAddress })
      )
      .on("error", (error, receipt) => console.log("ERROR:", error));
  }

  async investInStartup(vcFirmAddress, startupAddress, nameOfFund, size) {
    const sizeInWei = this.toWei(size);
    await this.contract.methods
      .investInStartup(startupAddress, nameOfFund)
      .send({
        from: vcFirmAddress,
        value: sizeInWei,
      })
      .on("transactionHash", (hash) => {
        this.emit("investedInStartup", { startupAddress, nameOfFund, size });
        console.log("hash:", hash);
      });
  }

  async getTotalContributions(nameOfFund) {
    const balance = await this.contract.methods
      .getTotContributions(nameOfFund)
      .call()
      .then((res) => {
        return res;
      });

    return this.toEther(balance);
  }

  /**
   * `toWei` - converts ether to Wei
   * @param {Number} ether
   *
   * @returns Wei equivalent of the passed value
   */
  toWei(ether) {
    return this.web3.utils.toWei(ether, "ether");
  }

  toEther(wei) {
    return this.web3.utils.fromWei(wei, "ether");
  }
}

module.exports = Web3JS;

const CryptoVenturesContract = artifacts.require("CryptoVentures");

module.exports = function (deployer) {
  deployer.deploy(CryptoVenturesContract);
};

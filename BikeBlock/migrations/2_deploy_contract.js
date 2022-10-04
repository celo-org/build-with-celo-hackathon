
var BikeBlock = artifacts.require("./BikeBlock.sol");
var TestToken = artifacts.require("./TestToken.sol");

module.exports = function(deployer, network,accounts) {

  deployer.deploy(TestToken,100_000_000).then(function() {
    return deployer.deploy(BikeBlock,TestToken.address);
  })

};
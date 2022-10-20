
var BikeBlock = artifacts.require("./BikeBlock.sol");
var TestToken = artifacts.require("./TestToken.sol");

module.exports = function(deployer, network,accounts) {

  deployer.deploy(BikeBlock,"0x874069fa1eb16d44d622f2e0ca25eea172369bc1");
  // Use for local deployment
  //deployer.deploy(TestToken,100_000_000).then(function() {
  //  return deployer.deploy(BikeBlock,TestToken.address);
  //})

};

var RideManager = artifacts.require("./RideManager.sol");
var MockToken = artifacts.require("./MockToken.sol");

module.exports = function(deployer, network,accounts) {

  deployer.deploy(MockToken,100_000_000).then(function() {
    return deployer.deploy(RideManager,MockToken.address);
  })

};
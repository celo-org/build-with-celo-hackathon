
var RideManager = artifacts.require("./RideManager.sol");
//var MockToken = artifacts.require("./MockToken.sol");
//var DriverRole = artifacts.require("./DriverRole.sol");

module.exports = function(deployer, network,accounts) {

  deployer.deploy(RideManager,"0x874069fa1eb16d44d622f2e0ca25eea172369bc1");
  //deployer.deploy(DriverRole);
  
  //deployer.deploy(MockToken,100_000_000_000).then(function() {
  //  return deployer.deploy(RideManager,MockToken.address);
  //})

};
const EventHub = artifacts.require('EventHub')

module.exports = function (deployer) {
  deployer.deploy(EventHub)
}

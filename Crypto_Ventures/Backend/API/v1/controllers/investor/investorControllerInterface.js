const createInvestorController = require("./createInvestorController");
const logInInvestorController = require("./logInInvestorContoller");

module.exports = Object.freeze({
  createInvestorController: (req, res) => createInvestorController(req, res),
  logInInvestorController: (req, res) => logInInvestorController(req, res),
});

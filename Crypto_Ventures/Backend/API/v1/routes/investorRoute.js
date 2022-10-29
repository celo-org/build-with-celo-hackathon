const express = require("express");

const investorControllerInterface = require("../controllers/investor/investorControllerInterface");

let router = express.Router();

router
  .route("/signUp")
  .post(investorControllerInterface.createInvestorController);

router
  .route("/login")
  .post(investorControllerInterface.logInInvestorController);

module.exports = router;

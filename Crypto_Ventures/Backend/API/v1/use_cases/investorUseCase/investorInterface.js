const createInvestor = require("./createInvestor");
const loginInvestor = require("./loginInvestor");

module.exports = Object.freeze({
  createInvestor: (
    investorDetails,
    dbInstance,
    uuidGenerator,
    hashGenerator,
    oauthHandler,
    roles,
    InvestorModel
  ) =>
    createInvestor(
      investorDetails,
      dbInstance,
      uuidGenerator,
      hashGenerator,
      oauthHandler,
      roles,
      InvestorModel
    ),
  loginInvestor: (
    investorDetails,
    dbInstance,
    oauthHandler,
    InvestorModel,
    hashGenerator
  ) =>
    loginInvestor(
      investorDetails,
      dbInstance,
      oauthHandler,
      InvestorModel,
      hashGenerator
    ),
});

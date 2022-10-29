const investorUseCase = require("../../use_cases/investorUseCase/investorInterface");
const DB = require("../../DB/mongoDB/mongoDBInterface");
const hashGenerator = require("../../helpers/hashGenerator");
const oauthHandler = require("../../helpers/oauthHandler");
const InvestorModel = require("../../DB/mongoDB/schemas/InvestorSchema");

const logInInvestorController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new Error("email not provided");
  if (!password) throw new Error("password not provided");

  const dbInstance = new DB();
  try {
    const investorObj = await investorUseCase.loginInvestor(
      req.body,
      dbInstance,
      oauthHandler,
      InvestorModel,
      hashGenerator
    );

    res.cookie(investorObj.refreshToken);
    res.status(200).json({
      status: "SUCCESS",
      data: {
        user: investorObj.investor,
        accessToken: investorObj.accessToken,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = logInInvestorController;

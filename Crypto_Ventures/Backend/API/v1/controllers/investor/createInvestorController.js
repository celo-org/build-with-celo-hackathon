const investorUseCase = require("../../use_cases/investorUseCase/investorInterface");
const DB = require("../../DB/mongoDB/mongoDBInterface");
const uuidGenerator = require("../../helpers/uuidGenerator");
const hashGenerator = require("../../helpers/hashGenerator");
const oauthHandler = require("../../helpers/oauthHandler");
const roles = require("../../config/roles");
const InvestorModel = require("../../DB/mongoDB/schemas/InvestorSchema");

const createInvestorController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username) {
    res.status(400).json({
      status: "ERROR",
      message: "username not provided",
    });
  }
  if (!email) {
    res.status(400).json({
      status: "ERROR",
      message: "email not provided",
    });
  }
  if (!password) {
    res.status(400).json({
      status: "ERROR",
      message: "password not provided",
    });
  }
  const dbInstance = new DB();
  const investorDetails = {
    username: username,
    email: email,
    password: password,
  };
  try {
    const newUser = await investorUseCase.createInvestor(
      investorDetails,
      dbInstance,
      uuidGenerator,
      hashGenerator,
      oauthHandler,
      roles,
      InvestorModel
    );
    res.cookie(newUser.refreshToken);
    res.status(200).json({
      status: "SUCCESS",
      newUser: newUser.user,
      accessToken: newUser.accessToken,
    });
  } catch (error) {
    res.status(401).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = createInvestorController;

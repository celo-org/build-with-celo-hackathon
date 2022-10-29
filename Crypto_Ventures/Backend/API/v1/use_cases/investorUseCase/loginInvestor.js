const Investor = require("../../entities/investor");

const loginInvestor = async (
  investorDetails,
  dbInstance,
  oauthHandler,
  InvestorModel,
  hashGenerator
) => {
  const existingInvestor = new Investor(
    investorDetails,
    dbInstance,
    InvestorModel
  );
  existingInvestor.removeSpaces();
  const exists = await existingInvestor.checkInstanceInDb();
  if (!exists) throw new Error("No user found");

  const match = await existingInvestor.comparePassword(
    hashGenerator,
    exists.password
  );
  if (!match) throw new Error("Incorrect password or email provided");

  existingInvestor.updateObject(exists);
  const investorObj = existingInvestor.investorDetails();
  const accessToken = await oauthHandler.generateJWT(investorObj, "access");
  const refreshToken = await oauthHandler.generateJWT(investorObj, "refresh");

  dbInstance.on("modelUpdated", (obj) => {
    console.log("model Updated: ", obj.email, obj.roles);
  });

  await existingInvestor.updateObjectInDB(
    { email: investorObj.email },
    { refreshToken: refreshToken }
  );

  return {
    investor: investorObj,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

module.exports = loginInvestor;

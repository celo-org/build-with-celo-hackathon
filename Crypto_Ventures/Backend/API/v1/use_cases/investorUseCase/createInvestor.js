const Investor = require("../../entities/investor");

/**
 * Creates an investor and registeres them in DB
 * @param {Investor Details} investorDetails
 * @param {An instance of the database in use} dbInstance
 * @param {uuid generator package} uuidGenerator
 * @param {hash generator package} hashGenerator
 * @param {oauth generator package} oauthHandler
 */
const createInvestor = async (
  investorDetails,
  dbInstance,
  uuidGenerator,
  hashGenerator,
  oauthHandler,
  roles,
  InvestorModel
) => {
  if (!investorDetails.username || !investorDetails.email) {
    throw new Error("username or email not provided");
  }

  if (!investorDetails.password) throw new Error("Password not provided");

  investorDetails.uid = uuidGenerator.generate();
  investorDetails.roles = new Array();
  investorDetails.roles = [roles.investor];
  console.log("roles assigned: ", investorDetails.roles);

  try {
    const newInvestor = new Investor(
      investorDetails,
      dbInstance,
      InvestorModel
    );

    const dbOccurence = await newInvestor.checkInstanceInDb();
    if (dbOccurence) throw new Error("User already exists");
    newInvestor.validatePassword();
    await newInvestor.replacewithHashedPassword(hashGenerator);
    await newInvestor.save();

    const newInvestorObject = newInvestor.investorDetails();
    const accessToken = await oauthHandler.generateJWT(
      newInvestorObject,
      "access"
    );
    const refreshToken = await oauthHandler.generateJWT(
      newInvestorObject,
      "token"
    );
    await newInvestor.updateObjectInDB(
      { email: newInvestorObject.email },
      { refreshToken: refreshToken }
    );

    return {
      user: newInvestorObject,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = createInvestor;

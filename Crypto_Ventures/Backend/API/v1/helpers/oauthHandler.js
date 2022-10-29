require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 *
 * @param {payload to generate the jwt token with} payload
 * @param {type of token: access or refresh} type
 */
const generateJWT = async (payload, type) => {
  const secret =
    type === "access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;
  const expires = type === "access" ? 60 * 60 : 3600 * 24 * 6;
  const token = jwt.sign(payload, secret, { expiresIn: expires });

  return token;
};

const verify = async (token, value) => {
  try {
    var decoded = jwt.verify(token, value);
    return decoded;
  } catch (err) {
    // err
    return new Error(err.message);
  }
};

module.exports = {
  generateJWT,
  verify,
};

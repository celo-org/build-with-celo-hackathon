const argon2 = require("argon2");

/**
 * Hashes the provided data and returns the hash
 * @param {String} data Data to hash
 * @param {Number} length length of hash produced, defaults to 64
 * @returns Hash string
 */
const generateHash = async (data, length) => {
  try {
    const hash = await argon2.hash(data, {
      memoryCost: 2 ** 16,
      hashLength: length ? length : 64,
    });
    console.log(hash);
    console.log(typeof hash);
    return hash;
  } catch (error) {
    throw new Error(error.message);
  }
};

const compare = async (hash, password) => {
  try {
    const match = await argon2.verify(hash, password);
    return match;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  generateHash,
  compare,
};

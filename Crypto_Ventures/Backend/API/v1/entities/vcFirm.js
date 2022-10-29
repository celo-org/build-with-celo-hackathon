class VCFirm {
  constructor(vcFirm) {
    this.uid = vcFirm.uid;
    this.contact = vcFirm.contact;
    this.wallet = vcFirm.wallet;
    this.password = vcFirm.password;
    this.roles = vcFirm.roles;
    this.username = vcFirm.username;
  }

  removeSpaces(password) {
    return password.replace(/ /g, "");
  }

  validatePassword() {
    if (this.password.length < 8) {
      throw new Error("Password length too short");
    }
  }

  /**
   * Generates ahash and replaces the raw password with the hash
   * @param {function to generate hash} hashGenerator
   */
  replacewithHashedPassword(hashGenerator) {
    this.password = hashGenerator.generateHash(this.password);
  }
}

module.exports = VCFirm;

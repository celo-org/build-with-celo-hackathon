class Investor {
  constructor(investor, dbInstance, InvestorModel) {
    this.uid = investor.uid;
    this.username = investor.username;
    this.email = investor.email;
    this.password = investor.password;
    this.wallet_addresses = investor.wallet_addresses;
    this.roles = investor.roles;

    this.dbInstance = dbInstance ? dbInstance : null;
    this.InvestorModel = InvestorModel;
  }

  removeSpaces() {
    return this.password.replace(/ /g, "");
  }

  validatePassword() {
    this.removeSpaces();
    if (this.password.length < 8) {
      throw new Error("Password length too short");
    }
  }

  /**
   * Generates ahash and replaces the raw password with the hash
   * @param {function to generate hash} hashGenerator
   */
  async replacewithHashedPassword(hashGenerator) {
    this.password = await hashGenerator.generateHash(this.password);
  }

  async comparePassword(hashGenerator, passwordHash) {
    const match = await hashGenerator.compare(passwordHash, this.password);
    return match;
  }

  investorDetails() {
    return Object.freeze({
      uid: this.uid,
      username: this.username,
      email: this.email,
      roles: this.roles,
    });
  }

  allInvestorDetails() {
    return Object.freeze({
      uid: this.uid,
      username: this.username,
      email: this.email,
      password: this.password,
      wallet_addresses: this.wallet_addresses ? this.wallet_addresses : [],
      roles: this.roles,
    });
  }

  async checkInstanceInDb() {
    if (!this.dbInstance) throw new Error("Database instance not provided");

    if (!this.InvestorModel) throw new Error("Investor model not provided");

    const investorDocument = await this.dbInstance.checkInstanceByField(
      this.InvestorModel,
      "email",
      this.email
    );

    return investorDocument;
  }

  updateObject(newObj) {
    this.uid = newObj.uid;
    this.username = newObj.username;
    this.email = newObj.email;
    this.wallet_addresses = newObj.wallet_addresses;
    this.roles = newObj.roles;
  }

  /**
   * Saves the object the the database
   * @param {an Instance of the database ORD/ODM} dbInstance
   */
  async save() {
    console.log("Details to create: ", this.allInvestorDetails());
    await this.dbInstance.makeEntry(
      this.InvestorModel,
      this.allInvestorDetails()
    );
  }

  async updateObjectInDB(query, newValueObject) {
    await this.dbInstance.findOneAndUpdate(
      this.InvestorModel,
      query,
      newValueObject
    );
  }
}

module.exports = Investor;

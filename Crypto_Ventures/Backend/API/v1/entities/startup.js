class Startup {
  constructor(startup) {
    this.uid = startup.uid;
    this.name = startup.name;
    this.headquarters = startup.headquarters;
    this.contact = startup.contact;
    this.founders = startup.founders;
    this.documents = startup.documents;
    this.wallet = startup.wallet;
    this.roles = startup.roles;
    this.password = this.removeSpaces(startup.password);

    this.created_at = startup.created_at
      ? startup.created_at
      : new Date(Date.now());
    if (!this.roles) throw new Error("Roles not provided");
    if (!this.uid) throw new Error("uid not provided");
    if (!this.name) throw new Error("name not provided");
    if (!this.wallet) throw new Error("wallet not provided");
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

  startupDetails() {
    return Object.freeze({
      uid: this.uid,
      name: this.name,
      headquarters: this.headquarters,
      contact: this.contact,
    });
  }

  startupFounders() {
    if (this.founders) {
      return Object.freeze({
        founders: this.founders,
      });
    }
  }
}

module.exports = Startup;

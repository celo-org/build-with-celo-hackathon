class Fund {
  constructor(investor) {
    this.uid = investor.uid;
    this.fundOwner = investor.fundOwner;
    this.size = investor.size;
    this.created_at = investor.created_at
      ? investor.created_at
      : new Date(Date.now());
    this.funders = investor.funders;
    this.closing_date = investor.closing_date;
    this.amount_contributed = investor.amount_contributed;
    this.amount_remaining = investor.amount_remaining;
    this.status = investor.status;
  }

  validate() {
    if (this.fundOwner.uid || this.fundOwner.public_wallet_addresss) {
      throw new Error("FundOwner object missing one parameter");
    }
  }

  getFunders() {
    if (this.funders.length > 0) {
      return this.funders;
    } else {
      return null;
    }
  }

  getIndividualFunder(uid) {
    if (this.funders.length > 0) {
      for (let i = 0; i < this.funders.length; i++) {
        if (funders[i].uid === uid) return funders[i];
      }
    }
  }
}

module.exports = Fund;

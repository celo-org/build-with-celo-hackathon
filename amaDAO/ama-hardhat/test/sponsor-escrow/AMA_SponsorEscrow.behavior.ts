import { expect } from "chai";

export function shouldBehaveLikeAMA_SponsorEscrow(): void {
  it("should create escrow", async function () {
    expect(await this.AMA_SponsorEscrow.nEscrow()).to.exist;

    //*** check we have a balance before sponsor contract created
    const createEscrowTx = await this.AMA_SponsorEscrow.connect(this.signers.alice).create("Test", 40, 1000);
    // wait until the transaction is mined
    //await createEscrowTx.wait();

    expect(await this.AMA_SponsorEscrow.connect(this.signers.admin).nEscrow()).to.equal(1);
  });


  it("should sum escrows by alice", async function () {
    expect(await this.AMA_SponsorEscrow.nEscrow()).to.exist;

    //*** check we have a balance before sponsor contract created
    await this.AMA_SponsorEscrow.connect(this.signers.alice).create("Test", 40, 1000);
    await this.AMA_SponsorEscrow.connect(this.signers.alice).create("Test2", 80, 1000); // 40+80 = 120

    const escAll = await this.AMA_SponsorEscrow.connect(this.signers.admin).escrowSponsor;

    let sum = 0;
    for (let i = 0; i < escAll.length; i++) {
      const e = escAll[i];
      if (e == this.signers.alice) {
        const escrow = await this.AMA_SponsorEscrow.connect(this.signers.admin).escrows(e);
        //** check it's approved */
        sum = sum + escrow.funds;
      }
    };

    expect(await this.AMA_SponsorEscrow.connect(this.signers.admin).nEscrow()).to.equal(2);
    expect(sum = 120);
  });


  it("faucet request cannot be excessive", async function () {
    expect(this.AMA_SponsorEscrow.userFaucet(1, 10)).to.throw;
  });

  it("faucet cannot be too frequent", async function () {
    // first test will succeed
    expect(this.AMA_SponsorEscrow.userFaucet(1, 1)).to.eq(1);
    // 2nd < lock time should throw error
    expect(this.AMA_SponsorEscrow.userFaucet(1, 4)).to.throw;
  });

}

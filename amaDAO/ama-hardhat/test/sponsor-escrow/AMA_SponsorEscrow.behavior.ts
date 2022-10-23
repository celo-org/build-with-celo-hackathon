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

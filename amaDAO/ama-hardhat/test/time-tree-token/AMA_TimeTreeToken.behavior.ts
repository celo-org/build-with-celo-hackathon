import { expect } from "chai";
import { ethers } from "hardhat";

export function shouldBehaveLikeAMA_TimeTreeToken(): void {
  // Test cases
  it("Creates a token with a name", async function () {
    expect(await this.AMA_TimeTreeToken.name()).to.exist;
    console.log("Address:", this.AMA_TimeTreeToken.address); //0xE574F636E9Dd392987d32c6d249cda305C615b25
    // expect(await this.AMA_TimeTreeToken.name()).to.equal('TreeToken');
  });

  it("Creates a token with a symbol", async function () {
    expect(await this.AMA_TimeTreeToken.symbol()).to.exist;
    // expect(await this.AMA_TimeTreeToken.symbol()).to.equal('FUN');
  });

  it("Has a valid decimal", async function () {
    expect((await this.AMA_TimeTreeToken.decimals()).toString()).to.equal("18");
  });

  it("Has a valid total supply", async function () {
    const expectedSupply = ethers.utils.parseUnits("1000000", this.decimals);
    expect((await this.AMA_TimeTreeToken.totalSupply()).toString()).to.equal(expectedSupply);
  });

  it("Is able to query account balances", async function () {
    const ownerBalance = await this.AMA_TimeTreeToken.balanceOf(this.owner.address);
    expect(await this.AMA_TimeTreeToken.balanceOf(this.owner.address)).to.equal(ownerBalance);
  });

  it("Transfers the right amount of tokens to/from an account", async function () {
    const transferAmount = 1000;
    await expect(this.AMA_TimeTreeToken.transfer(this.recipient.address, transferAmount)).to.changeTokenBalances(
      this.AMA_TimeTreeToken,
      [this.owner.address, this.recipient.address],
      [-transferAmount, transferAmount],
    );
  });

  it("Emits a transfer event with the right arguments", async function () {
    const transferAmount = 100000;
    await expect(
      this.AMA_TimeTreeToken.transfer(
        this.recipient.address,
        ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
      ),
    )
      .to.emit(this.AMA_TimeTreeToken, "Transfer")
      .withArgs(
        this.owner.address,
        this.recipient.address,
        ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
      );
  });

  it("Allows for allowance approvals and queries", async function () {
    const approveAmount = 10;
    await this.signerContract.approve(this.owner.address, ethers.utils.parseUnits(approveAmount.toString()));
    expect(await this.AMA_TimeTreeToken.allowance(this.recipient.address, this.owner.address)).to.equal(
      ethers.utils.parseUnits(approveAmount.toString()),
    );
  });

  it("Emits an approval event with the right arguments", async function () {
    const approveAmount = 10000;
    await expect(
      this.signerContract.approve(this.owner.address, ethers.utils.parseUnits(approveAmount.toString(), this.decimals)),
    )
      .to.emit(this.AMA_TimeTreeToken, "Approval")
      .withArgs(
        this.recipient.address,
        this.owner.address,
        ethers.utils.parseUnits(approveAmount.toString(), this.decimals),
      );
  });

  it("Allows an approved spender to transfer from owner", async function () {
    const transferAmount = 10;
    await this.AMA_TimeTreeToken.transfer(
      this.recipient.address,
      ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
    );
    await this.signerContract.approve(
      this.owner.address,
      ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
    );
    await expect(
      this.AMA_TimeTreeToken.transferFrom(this.recipient.address, this.owner.address, transferAmount),
    ).to.changeTokenBalances(
      this.AMA_TimeTreeToken,
      [this.owner.address, this.recipient.address],
      [transferAmount, -transferAmount],
    );
  });

  it("Emits a transfer event with the right arguments when conducting an approved transfer", async function () {
    const transferAmount = 10000;
    await this.AMA_TimeTreeToken.transfer(
      this.recipient.address,
      ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
    );
    await this.signerContract.approve(
      this.owner.address,
      ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
    );
    await expect(
      this.AMA_TimeTreeToken.transferFrom(
        this.recipient.address,
        this.owner.address,
        ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
      ),
    )
      .to.emit(this.AMA_TimeTreeToken, "Transfer")
      .withArgs(
        this.recipient.address,
        this.owner.address,
        ethers.utils.parseUnits(transferAmount.toString(), this.decimals),
      );
  });

  it("Allows allowance to be increased and queried", async function () {
    const initialAmount = 100;
    const incrementAmount = 10000;
    await this.signerContract.approve(
      this.owner.address,
      ethers.utils.parseUnits(initialAmount.toString(), this.decimals),
    );
    const previousAllowance = await this.AMA_TimeTreeToken.allowance(this.recipient.address, this.owner.address);
    await this.signerContract.increaseAllowance(
      this.owner.address,
      ethers.utils.parseUnits(incrementAmount.toString(), this.decimals),
    );
    const expectedAllowance = ethers.BigNumber.from(previousAllowance).add(
      ethers.BigNumber.from(ethers.utils.parseUnits(incrementAmount.toString(), this.decimals)),
    );
    expect(await this.AMA_TimeTreeToken.allowance(this.recipient.address, this.owner.address)).to.equal(
      expectedAllowance,
    );
  });

  it("Emits approval event when alllowance is increased", async function () {
    const incrementAmount = 10000;
    await expect(
      this.signerContract.increaseAllowance(
        this.owner.address,
        ethers.utils.parseUnits(incrementAmount.toString(), this.decimals),
      ),
    )
      .to.emit(this.AMA_TimeTreeToken, "Approval")
      .withArgs(
        this.recipient.address,
        this.owner.address,
        ethers.utils.parseUnits(incrementAmount.toString(), this.decimals),
      );
  });

  it("Allows allowance to be decreased and queried", async function () {
    const initialAmount = 100;
    const decrementAmount = 10;
    await this.signerContract.approve(
      this.owner.address,
      ethers.utils.parseUnits(initialAmount.toString(), this.decimals),
    );
    const previousAllowance = await this.AMA_TimeTreeToken.allowance(this.recipient.address, this.owner.address);
    await this.signerContract.decreaseAllowance(
      this.owner.address,
      ethers.utils.parseUnits(decrementAmount.toString(), this.decimals),
    );
    const expectedAllowance = ethers.BigNumber.from(previousAllowance).sub(
      ethers.BigNumber.from(ethers.utils.parseUnits(decrementAmount.toString(), this.decimals)),
    );
    expect(await this.AMA_TimeTreeToken.allowance(this.recipient.address, this.owner.address)).to.equal(
      expectedAllowance,
    );
  });

  it("Emits approval event when alllowance is decreased", async function () {
    const initialAmount = 100;
    const decrementAmount = 10;
    await this.signerContract.approve(
      this.owner.address,
      ethers.utils.parseUnits(initialAmount.toString(), this.decimals),
    );
    const expectedAllowance = ethers.BigNumber.from(
      ethers.utils.parseUnits(initialAmount.toString(), this.decimals),
    ).sub(ethers.BigNumber.from(ethers.utils.parseUnits(decrementAmount.toString(), this.decimals)));
    await expect(
      this.signerContract.decreaseAllowance(
        this.owner.address,
        ethers.utils.parseUnits(decrementAmount.toString(), this.decimals),
      ),
    )
      .to.emit(this.AMA_TimeTreeToken, "Approval")
      .withArgs(this.recipient.address, this.owner.address, expectedAllowance);
  });
}

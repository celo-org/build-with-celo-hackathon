const { expect } = require('chai');
const { ethers } = require("hardhat");

describe('TreeToken', function () {
  before(async function () {
    this.TreeToken = await ethers.getContractFactory('AMA_TimeTreeToken');
  });

  beforeEach(async function () {
    this.treeToken = await this.TreeToken.deploy();
    await this.treeToken.deployed();

    this.decimals = await this.treeToken.decimals();

    const signers = await ethers.getSigners();

    const [owner, recipient] = await ethers.getSigners();

    this.ownerAddress = signers[0].address;
    this.recipientAddress = recipient.address; //signers[1].address;
  
    this.signerContract = this.treeToken.connect(recipient); // signers[1]);
  });

  // Test cases
  it('Creates a token with a name', async function () {
    expect(await this.treeToken.name()).to.exist;
    // expect(await this.treeToken.name()).to.equal('TreeToken');
  });

  it('Creates a token with a symbol', async function () {
    expect(await this.treeToken.symbol()).to.exist;
    // expect(await this.treeToken.symbol()).to.equal('FUN');
  });

  it('Has a valid decimal', async function () {
    expect((await this.treeToken.decimals()).toString()).to.equal('18');
  })

  it('Has a valid total supply', async function () {
    const expectedSupply = ethers.utils.parseUnits('1000000', this.decimals);
    expect((await this.treeToken.totalSupply()).toString()).to.equal(expectedSupply);
  });

  it('Is able to query account balances', async function () {
    const ownerBalance = await this.treeToken.balanceOf(this.ownerAddress);
    expect(await this.treeToken.balanceOf(this.ownerAddress)).to.equal(ownerBalance);
  });

  it('Transfers the right amount of tokens to/from an account', async function () {
    const transferAmount = 1000;
    await expect(this.treeToken.transfer(this.recipientAddress, transferAmount)).to.changeTokenBalances(
        this.treeToken,
        [this.ownerAddress, this.recipientAddress],
        [-transferAmount, transferAmount]
      );
  });

  it('Emits a transfer event with the right arguments', async function () {
    const transferAmount = 100000;
    await expect(this.treeToken.transfer(this.recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals)))
        .to.emit(this.treeToken, "Transfer")
        .withArgs(this.ownerAddress, this.recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals))
  });

  it('Allows for allowance approvals and queries', async function () {
    const approveAmount = 10000;
    await this.signerContract.approve(this.ownerAddress, ethers.utils.parseUnits(approveAmount.toString(), this.decimals));
    expect((await this.treeToken.allowance(this.recipientAddress, this.ownerAddress))).to.equal(ethers.utils.parseUnits(approveAmount.toString(), this.decimals));
  });

  it('Emits an approval event with the right arguments', async function () {
    const approveAmount = 10000;
    await expect(this.signerContract.approve(this.ownerAddress, ethers.utils.parseUnits(approveAmount.toString(), this.decimals)))
        .to.emit(this.treeToken, "Approval")
        .withArgs(this.recipientAddress, this.ownerAddress, ethers.utils.parseUnits(approveAmount.toString(), this.decimals))
  }); 

  it('Allows an approved spender to transfer from owner', async function () {
    const transferAmount = 10000;
    await this.treeToken.transfer(this.recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals))
    await this.signerContract.approve(this.ownerAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals))
    await expect(this.treeToken.transferFrom(this.recipientAddress, this.ownerAddress, transferAmount)).to.changeTokenBalances(
        this.treeToken,
        [this.ownerAddress, this.recipientAddress],
        [transferAmount, -transferAmount]
      );
  });

  it('Emits a transfer event with the right arguments when conducting an approved transfer', async function () {
    const transferAmount = 10000;
    await this.treeToken.transfer(this.recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals))
    await this.signerContract.approve(this.ownerAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals))
    await expect(this.treeToken.transferFrom(this.recipientAddress, this.ownerAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals)))
        .to.emit(this.treeToken, "Transfer")
        .withArgs(this.recipientAddress, this.ownerAddress, ethers.utils.parseUnits(transferAmount.toString(), this.decimals))
  });

  it('Allows allowance to be increased and queried', async function () {
    const initialAmount = 100;
    const incrementAmount = 10000;
    await this.signerContract.approve(this.ownerAddress, ethers.utils.parseUnits(initialAmount.toString(), this.decimals))
    const previousAllowance = await this.treeToken.allowance(this.recipientAddress, this.ownerAddress);
    await this.signerContract.increaseAllowance(this.ownerAddress, ethers.utils.parseUnits(incrementAmount.toString(), this.decimals));
    const expectedAllowance = ethers.BigNumber.from(previousAllowance).add(ethers.BigNumber.from(ethers.utils.parseUnits(incrementAmount.toString(), this.decimals)))
    expect((await this.treeToken.allowance(this.recipientAddress, this.ownerAddress))).to.equal(expectedAllowance);
  });

  it('Emits approval event when alllowance is increased', async function () {
    const incrementAmount = 10000;
    await expect(this.signerContract.increaseAllowance(this.ownerAddress, ethers.utils.parseUnits(incrementAmount.toString(), this.decimals)))
        .to.emit(this.treeToken, "Approval")
        .withArgs(this.recipientAddress, this.ownerAddress, ethers.utils.parseUnits(incrementAmount.toString(), this.decimals))
  });

  it('Allows allowance to be decreased and queried', async function () {
    const initialAmount = 100;
    const decrementAmount = 10;
    await this.signerContract.approve(this.ownerAddress, ethers.utils.parseUnits(initialAmount.toString(), this.decimals))
    const previousAllowance = await this.treeToken.allowance(this.recipientAddress, this.ownerAddress);
    await this.signerContract.decreaseAllowance(this.ownerAddress, ethers.utils.parseUnits(decrementAmount.toString(), this.decimals));
    const expectedAllowance = ethers.BigNumber.from(previousAllowance).sub(ethers.BigNumber.from(ethers.utils.parseUnits(decrementAmount.toString(), this.decimals)))
    expect((await this.treeToken.allowance(this.recipientAddress, this.ownerAddress))).to.equal(expectedAllowance);
  });

  it('Emits approval event when alllowance is decreased', async function () {
    const initialAmount = 100;
    const decrementAmount = 10;
    await this.signerContract.approve(this.ownerAddress, ethers.utils.parseUnits(initialAmount.toString(), this.decimals))
    const expectedAllowance = ethers.BigNumber.from(ethers.utils.parseUnits(initialAmount.toString(), this.decimals)).sub(ethers.BigNumber.from(ethers.utils.parseUnits(decrementAmount.toString(), this.decimals)))
    await expect(this.signerContract.decreaseAllowance(this.ownerAddress, ethers.utils.parseUnits(decrementAmount.toString(), this.decimals)))
        .to.emit(this.treeToken, "Approval")
        .withArgs(this.recipientAddress, this.ownerAddress, expectedAllowance)
  });

});
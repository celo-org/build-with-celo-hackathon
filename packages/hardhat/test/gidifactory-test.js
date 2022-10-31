const { expect } = require("chai");
const { ethers } = require("hardhat");

before(async function () {
  const [signerOne, signerTwo] = await ethers.getSigners();

  this.WalletImp = await ethers.getContractFactory("WalletImplementation");
  this.walletImp = await this.WalletImp.deploy();

  this.GidiFactory = await ethers.getContractFactory("GidiFactory");
  this.gidiFactory = await this.GidiFactory.deploy();

  await this.gidiFactory.deployed();
  await this.walletImp.deployed();

  //This is MOCK Tokens, in live we will be dealing with mainnet cUSD Tokens
  const CUSD = await ethers.getContractFactory("Token");
  const cUSD = await CUSD.deploy("USD", "cUSD");

  this.cUSD = cUSD;
  this.signerOne = signerOne;
  this.signerTwo = signerTwo;

  await this.gidiFactory.initialize(this.walletImp.address);
});

describe("GidiWallet System", function () {
  it("Should have the correct wallet implementation", async function () {
    const implementation = await this.gidiFactory.walletImp();

    expect(implementation).to.equal(this.walletImp.address);
  });

  it("should create new wallet", async function () {
    const uuid = "4f1c85804af011edb8780242ac120002";

    const res = await this.gidiFactory.newWallet(uuid);

    this.customer1Address = await this.gidiFactory.wallets(uuid);

    await expect(res)
      .to.emit(this.gidiFactory, "NewWallet")
      .withArgs(uuid, this.customer1Address);
  });

  it("should revert on create new wallet", async function () {
    const uuid = "4f1c85804af011edb8780242";

    await expect(this.gidiFactory.newWallet(uuid)).to.be.revertedWith(
      "XF: Invalid uuid"
    );
  });

  it("should return wallet version as v1.1.0", async function () {
    const wallet = this.WalletImp.attach(this.customer1Address);

    const version = await wallet.version();

    expect(version).to.equal("v1.1.0");
  });

  it("should confirm cUSD  to be 100", async function () {
    const payment = ethers.utils.parseEther("100");

    await this.cUSD.mint(this.customer1Address, payment);

    const wp = this.WalletImp.attach(this.customer1Address);

    const cUsdBal = await wp.erc20TokenBalance(this.cUSD.address);

    expect(cUsdBal).to.eq(payment);
  });

  it("should hold CELO native token", async function () {
    const payment = ethers.utils.parseEther("100");

    await this.signerOne.sendTransaction({
      to: this.customer1Address,
      value: payment
    });

    const balance = await ethers.provider.getBalance(this.customer1Address);

    expect(balance).to.eq(payment);
  });

  it("should be able to transfer out tokens", async function () {
    const payment = ethers.utils.parseEther("50");

    const wp = this.WalletImp.attach(this.customer1Address);

    await wp.withdrawErc20Token(
      this.cUSD.address,
      this.signerOne.address,
      payment
    );
    await wp.withdrawCeloToken(this.signerOne.address, payment);

    const balance = await ethers.provider.getBalance(this.customer1Address);
    const cUsdBal = await wp.erc20TokenBalance(this.cUSD.address);

    expect(balance).to.eq(payment);
    expect(cUsdBal).to.eq(payment);
  });
});

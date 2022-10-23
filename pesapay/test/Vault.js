const { ethers, upgrades } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const assert = require("assert")
const { signMetaTxRequest } = require("../signer/signer")
describe("Testing vault contract", async () => {
  async function deployContract() {
    const TTx = await ethers.getContractFactory("Token")
    const Tx = await TTx.deploy("USD", "cUSD").then((x) => x.deployed())
    const TTy = await ethers.getContractFactory("Token")
    const Ty = await TTy.deploy("USDT", "USDT").then((x) => x.deployed())
    const Xy = await ethers.getContractFactory("MinimalForwarderUpgradeable")
    const XY = await Xy.deploy().then((f) => f.deployed())
    const Xz = await ethers.getContractFactory("Vault")
    const XZ = await upgrades.deployProxy(
      Xz,
      [XY.address],
      { initializer: "initialize" },
      { kind: "uups" }
    )
    const [owner, otherAccount, relayerAccount] = await ethers.getSigners()
    return { XZ, XY, Ty, Tx, owner, otherAccount, relayerAccount }
  }
  describe("without forwarder", async () => {
    it("should add allowed Tokens", async () => {
      const { XZ, Tx, owner } = await loadFixture(deployContract)
      const x = await XZ.connect(owner).addAllowedToken(Tx.address)
      expect(x).to.emit(XZ, "UniqueTokenAdded").withArgs(Tx.address)
    })
    it("should not add allowed Tokens twice", async () => {
      const { XZ, Tx, owner } = await loadFixture(deployContract)
      await XZ.connect(owner).addAllowedToken(Tx.address)
      await expect(
        XZ.connect(owner).addAllowedToken(Tx.address)
      ).to.be.revertedWith("token Already Exists")
    })
    it("only owner can add allowed tokens", async () => {
      const { XZ, Tx, otherAccount } = await loadFixture(deployContract)
      await expect(
        XZ.connect(otherAccount).addAllowedToken(Tx.address)
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })
    it("can't deposit not allowed token", async () => {
      const { XZ, Tx, otherAccount } = await loadFixture(deployContract)
      const amount = ethers.utils.parseEther("1")
      await expect(
        XZ.connect(otherAccount).depositToken(Tx.address, amount)
      ).to.be.revertedWith("the token is not currently allowed")
    })
    it("can't deposit more than they have in the account", async () => {
      const { XZ, Tx, owner, otherAccount } = await loadFixture(deployContract)
      const amount = ethers.utils.parseEther("1")
      await Tx.connect(owner).mint(otherAccount.address, amount)
      await XZ.connect(owner).addAllowedToken(Tx.address)
      const excessAmount = ethers.utils.parseEther("2")
      await expect(
        XZ.connect(otherAccount).depositToken(Tx.address, excessAmount)
      ).to.be.revertedWith(
        "you have insufficient Funds available in your wallet"
      )
    })
    it("can successfully Deposit to contract", async () => {
      const { XZ, Tx, owner, otherAccount } = await loadFixture(deployContract)
      const amount = ethers.utils.parseEther("1")
      await Tx.connect(owner).mint(otherAccount.address, amount)
      await XZ.connect(owner).addAllowedToken(Tx.address)
      const depositAmount = ethers.utils.parseEther("0.8")
      await Tx.connect(otherAccount).approve(XZ.address, depositAmount)
      const y = await XZ.connect(otherAccount).depositToken(
        Tx.address,
        depositAmount
      )
      await XZ.connect(otherAccount).depositCoin({ value: amount })
      const p = await XZ.coinBalance()
      const w = await XZ.contractTokenBalances(Tx.address)
      // console.log(w, depositAmount)
      // assert(w === depositAmount)
      expect(w).to.be.equal(depositAmount)
      expect(p).to.be.equal(amount)
      await expect(y)
        .to.emit(XZ, "contractTokenBalanceAdjusted")
        .withArgs(Tx.address, depositAmount)
      await expect(y)
        .to.emit(XZ, "FundsDeposited")
        .withArgs(Tx.address, depositAmount)
      const num = ethers.utils.parseEther("0.2")
      const bal = await Tx.balanceOf(otherAccount.address)
      expect(bal).to.be.lessThanOrEqual(num)
    })
    it("can successfully withdraw from contract", async () => {
      const { XZ, Tx, owner, otherAccount } = await loadFixture(deployContract)
      const amount = ethers.utils.parseEther("1")
      await Tx.connect(owner).mint(otherAccount.address, amount)
      await XZ.connect(owner).addAllowedToken(Tx.address)
      const depositAmount = ethers.utils.parseEther("0.8")
      await Tx.connect(otherAccount).approve(XZ.address, depositAmount)
      await XZ.connect(otherAccount).depositToken(Tx.address, depositAmount)
      await XZ.connect(otherAccount).depositCoin({ value: amount })
      const withdrawAmount = ethers.utils.parseEther("0.5")
      const y = await XZ.connect(owner).withdrawToken(
        Tx.address,
        otherAccount.address,
        withdrawAmount
      )
      const x = await XZ.connect(owner).withdrawCoin(
        otherAccount.address,
        withdrawAmount
      )
      const bal = ethers.utils.parseEther("0.3")
      const contBal = await XZ.contractTokenBalances(Tx.address)
      const coinBal = await XZ.coinBalance()
      expect(contBal).to.be.equal(bal)
      expect(coinBal).to.be.equal(withdrawAmount)
      await expect(y)
        .to.emit(XZ, "contractTokenBalanceAdjusted")
        .withArgs(Tx.address, bal)
      await expect(y)
        .to.emit(XZ, "TokenFundsWithdrawn")
        .withArgs(Tx.address, otherAccount.address, withdrawAmount)
      await expect(x)
        .to.emit(XZ, "CoinFundsWithdrawn")
        .withArgs(otherAccount.address, withdrawAmount)
    })
    it("only owner can withdraw", async () => {
      const { XZ, Tx, owner, otherAccount } = await loadFixture(deployContract)
      const amount = ethers.utils.parseEther("1")
      await Tx.connect(owner).mint(otherAccount.address, amount)
      await XZ.connect(owner).addAllowedToken(Tx.address)
      const depositAmount = ethers.utils.parseEther("0.8")
      await Tx.connect(otherAccount).approve(XZ.address, depositAmount)
      await XZ.connect(otherAccount).depositToken(Tx.address, depositAmount)
      await XZ.connect(otherAccount).depositCoin({ value: amount })
      const withdrawAmount = ethers.utils.parseEther("0.5")
      await expect(
        XZ.connect(otherAccount).withdrawToken(
          Tx.address,
          otherAccount.address,
          withdrawAmount
        )
      ).to.be.revertedWith("Ownable: caller is not the owner")
      await expect(
        XZ.connect(otherAccount).withdrawCoin(
          otherAccount.address,
          withdrawAmount
        )
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })
    it("can't withdraw more than available funds", async () => {
      const { XZ, Tx, owner, otherAccount } = await loadFixture(deployContract)
      const amount = ethers.utils.parseEther("1")
      await Tx.connect(owner).mint(otherAccount.address, amount)
      await XZ.connect(owner).addAllowedToken(Tx.address)
      const depositAmount = ethers.utils.parseEther("0.8")
      await Tx.connect(otherAccount).approve(XZ.address, depositAmount)
      await XZ.connect(otherAccount).depositToken(Tx.address, depositAmount)
      await XZ.connect(otherAccount).depositCoin({ value: amount })
      const withdrawAmount = ethers.utils.parseEther("2")
      await expect(
        XZ.connect(owner).withdrawToken(
          Tx.address,
          otherAccount.address,
          withdrawAmount
        )
      ).to.be.revertedWith("insufficient tokens available in the contract")
      await expect(
        XZ.connect(owner).withdrawCoin(otherAccount.address, withdrawAmount)
      ).to.be.revertedWith("insufficient coins available in the contract")
    })
  })
  describe("deposit via meta_tx/forwarder", async () => {
    it("can successfully Deposit to contract via Relayer", async () => {
      const { XZ, XY, Tx, owner, otherAccount } = await loadFixture(
        deployContract
      )
      const amount = ethers.utils.parseEther("1")
      await Tx.connect(owner).mint(otherAccount.address, amount)
      await XZ.connect(owner).addAllowedToken(Tx.address)
      const depositAmount = ethers.utils.parseEther("0.8")
      await Tx.connect(otherAccount).approve(XZ.address, depositAmount)
      const forwarder = await XY.connect(owner)
      const { request, signature } = await signMetaTxRequest(
        otherAccount.provider,
        forwarder,
        {
          from: otherAccount.address,
          to: XZ.address,
          data: XZ.interface.encodeFunctionData("depositToken", [
            Tx.address,
            depositAmount,
          ]),
        }
      )
      await forwarder.execute(request, signature).then((tx) => tx.wait())
      await XZ.connect(otherAccount).depositCoin({ value: amount })
      const p = await XZ.coinBalance()
      const w = await XZ.contractTokenBalances(Tx.address)
      // console.log(w, depositAmount)
      // assert(w === depositAmount)
      expect(w).to.be.equal(depositAmount)
      expect(p).to.be.equal(amount)
      await expect(y)
        .to.emit(XZ, "contractTokenBalanceAdjusted")
        .withArgs(Tx.address, depositAmount)
      await expect(y)
        .to.emit(XZ, "FundsDeposited")
        .withArgs(Tx.address, depositAmount)
      const num = ethers.utils.parseEther("0.2")
      const bal = await Tx.balanceOf(otherAccount.address)
      expect(bal).to.be.lessThanOrEqual(num)
    })
  })
})

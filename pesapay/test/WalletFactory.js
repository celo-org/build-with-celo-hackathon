const { ethers, upgrades } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const assert = require("assert")

describe("verify correct upgradeable contract implementaion", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {
    const TTx = await ethers.getContractFactory("Token")
    const Tx = await TTx.deploy("USD", "cUSD")
    await Tx.deployed()
    const TTy = await ethers.getContractFactory("Token")
    const Ty = await TTy.deploy("USDT", "USDT")
    await Ty.deployed()
    const WT = await ethers.getContractFactory("Wallet")
    const WTx = await WT.deploy()
    await WTx.deployed()
    const WF = await ethers.getContractFactory("WalletFactory")
    const WFx = await upgrades.deployProxy(
      WF,
      [WTx.address],
      { intializer: "initialize" },
      {
        kind: "uups",
      }
    )
    const [owner, otherAccount] = await ethers.getSigners()
    return { WFx, WTx, owner, otherAccount, Ty, Tx, WT }
  }
  describe("test1", async () => {
    it("gets right implementaion address", async () => {
      const { WFx, WTx } = await loadFixture(deployContract)
      const xt = await WFx.walletImplementation()
      assert(xt === WTx.address)
      // expect(await WFx.walletImplementation()).to.equal(WTx.address)
    })
    it("creates new wallets", async () => {
      const uuid1 = "9d3a196048c211edb8780242ac120002"
      const { WFx } = await loadFixture(deployContract)
      const res = await WFx.newWallet(uuid1)
      const customer1Address = await WFx.wallets(uuid1)
      expect(res).to.emit(WFx, "NewWallets").withArgs(uuid1, customer1Address)
    })
    it("can't create two wallets for one user", async () => {
      const uuid1 = "9d3a196048c211edb8780242ac120002"
      const { WFx } = await loadFixture(deployContract)
      await WFx.newWallet(uuid1)
      await expect(WFx.newWallet(uuid1)).to.be.revertedWith(
        "WI: Already has Wallet"
      )
    })
    it("uuid should be 32 bytes else revert", async () => {
      const uuid1 = "9d3a196048c211edb8780242ac1200"
      const { WFx } = await loadFixture(deployContract)
      await expect(WFx.newWallet(uuid1)).to.be.revertedWith("WI: Invalid ID")
    })
    it("should be able to deposit erc20 token", async () => {
      const payment = ethers.utils.parseEther("100")
      const uuid1 = "9d3a196048c211edb8780242ac120002"
      const { WFx, WT, Tx, Ty } = await loadFixture(deployContract)
      await WFx.newWallet(uuid1)
      const acc1 = await WFx.wallets(uuid1)
      await Tx.mint(acc1, payment)
      await Ty.mint(acc1, payment)
      const wt = await WT.attach(acc1)
      const TxBal = await wt.erc20TokenBalance(Tx.address)
      const TyBal = await wt.erc20TokenBalance(Ty.address)
      expect(TxBal).to.equal(payment)
      expect(TyBal).to.equal(payment)
    })
    it("should be able to deposit Native Token", async () => {
      const payment = ethers.utils.parseEther("100")
      const uuid1 = "9d3a196048c211edb8780242ac120002"
      const { WFx, WT, owner } = await loadFixture(deployContract)
      await WFx.newWallet(uuid1)
      const acc1 = await WFx.wallets(uuid1)
      await owner.sendTransaction({ to: acc1, value: payment })
      const wt = await WT.attach(acc1)
      const txBal = await wt.nativeTokenBalance()
      const tyBal = await ethers.provider.getBalance(acc1)
      expect(txBal).to.equal(payment)
      expect(tyBal).to.equal(payment)
    })
    it("should be able to withdraw native and ERC20 token", async () => {
      const payment = ethers.utils.parseEther("100")
      const amount = ethers.utils.parseEther("20")
      const uuid1 = "9d3a196048c211edb8780242ac120002"
      const { WFx, WT, Ty, otherAccount, owner } = await loadFixture(
        deployContract
      )
      await WFx.newWallet(uuid1)
      const acc1 = await WFx.wallets(uuid1)
      const wt = await WT.attach(acc1)
      await Ty.mint(acc1, payment)
      await owner.sendTransaction({ to: acc1, value: payment })
      await wt.withdrawErc20Token(Ty.address, otherAccount.address, amount)
      await wt.withdrawNativeToken(otherAccount.address, amount)
      const tx = await wt.nativeTokenBalance()
      const ty = await wt.erc20TokenBalance(Ty.address)
      const bal = ethers.utils.parseEther("80")
      expect(tx).to.be.lessThanOrEqual(bal)
      expect(ty).to.be.lessThanOrEqual(bal)
    })
  })
})

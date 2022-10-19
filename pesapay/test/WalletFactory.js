const { ethers, upgrades } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const assert = require("assert")

describe("verify correct upgradeable contract implementaion", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {
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
    return { WFx, WTx, owner, otherAccount }
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
      // const uuid2 = "9d3a1be048c211edb8780242ac120002"
      const { WFx } = await loadFixture(deployContract)
      const res = await WFx.newWallet(uuid1)
      const customer1Address = await WFx.wallets(uuid1)
      expect(res).to.emit(WFx, "NewWallets").withArgs(uuid1, customer1Address)
    })
    it("can't create two wallets for one user", async () => {
      const uuid1 = "9d3a196048c211edb8780242ac120002"
      // const uuid2 = "9d3a1be048c211edb8780242ac120002"
      const { WFx } = await loadFixture(deployContract)
      await WFx.newWallet(uuid1)
      expect(await WFx.newWallet(uuid1)).to.be.revertedWith(
        "WI: Already has Wallet"
      )
    })
  })
})

const { ethers, upgrades } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const assert = require("assert")

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
    const [owner, otherAccount] = await ethers.getSigners()
    return { XZ, Ty, Tx, owner, otherAccount }
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
  })
})

const { ethers, upgrades } = require("hardhat")
const { expect } = require("chai")
const assert = require("assert")

describe("testing upgradablity", async () => {
  const [owner, otherAccount] = await ethers.getSigners()
  before("verify correct upgradeable contract implementaion", async () => {
    const WT = await ethers.getContractFactory("Wallet")
    const WTx = await WT.deploy()
    await WTx.deployed()
    const WF = await ethers.getContractFactory("WalletFactory")

    describe("test1", async () => {
      it("gets right implementaion address", async () => {
        const WFx = await upgrades.deployProxy(WF, {
          kind: "uups",
        })
        WFx.intialize(WTx.address)
        expect((await WFx.walletImplementation) === WTx.address)
      })
    })
  })
})

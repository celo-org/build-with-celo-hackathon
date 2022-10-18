const { ethers, upgrades } = require("hardhat")
async function main() {
  const WT = await ethers.getContractFactory("Wallet")
  const WTx = await WT.deploy()
  await WTx.deployed()
  const WF = await ethers.getContractFactory("WalletFactory")
  const WFx = await upgrades.deployProxy(WF, {
    kind: "uups",
  })
  await WFx.intialize(WTx.address)
  console.log("address of WF is", WFx.address)
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

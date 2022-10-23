const { ethers, upgrades } = require("hardhat")

async function main() {
  const Xy = await ethers.getContractFactory("MinimalForwarderUpgradeable")
  const XY = await Xy.deploy().then((f) => f.deployed())
  const Xz = await ethers.getContractFactory("Vault")
  const XZ = await upgrades.deployProxy(
    Xz,
    [XY.address],
    { initializer: "initialize" },
    { kind: "uups" }
  )
  console.log("address of Vault deployed at", XZ.address)
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

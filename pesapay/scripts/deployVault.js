const { ethers, upgrades } = require("hardhat")
const { writeFileSync } = require("fs")
const {
  DefenderRelayProvider,
  DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers")
require("dotenv").config()
async function main() {
  const credentials = {
    apiKey: process.env.RELAYER_API_KEY,
    apiSecret: process.env.RELAYER_API_SECRET,
  }
  const provider = new DefenderRelayProvider(credentials)
  const relaySigner = new DefenderRelaySigner(credentials, provider, {
    speed: "fast",
  })
  const Xy = await ethers.getContractFactory("MinimalForwarderUpgradeable")
  const XY = await Xy.connect(relaySigner)
    .deploy()
    .then((f) => f.deployed())
  const Xz = await ethers.getContractFactory("Vault")
  const XZ = await upgrades.deployProxy(
    Xz.connect(relaySigner),
    [XY.address],
    { initializer: "initialize" },
    { kind: "uups" }
  )
  console.log("address of Vault deployed at", XZ.address)
  writeFileSync(
    "deploy.json",
    JSON.stringify(
      {
        MinimalForwarder: XY.address,
        Vault: XZ.address,
      },
      null,
      2
    )
  )
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

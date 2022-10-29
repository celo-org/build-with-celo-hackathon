const { ethers, upgrades } = require("hardhat")
const { writeFileSync, readFileSync } = require("fs")
const {
  DefenderRelayProvider,
  DefenderRelaySigner,
} = require("defender-relay-client/lib/ethers")
require("dotenv").config()
function getInstance(name) {
  const address = JSON.parse(readFileSync("deploy.json"))[name]
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`)
  return ethers.getContractFactory(name).then((f) => f.attach(address))
}
async function main() {
  const credentials = {
    apiKey: process.env.RELAYER_API_KEY,
    apiSecret: process.env.RELAYER_API_SECRET,
  }
  const provider = new DefenderRelayProvider(credentials)
  const relaySigner = new DefenderRelaySigner(credentials, provider, {
    speed: "fast",
  })
  const TX = await getInstance("Token")
  const XY = await getInstance("MinimalForwarderUpgradeable")

  const Xz = await ethers.getContractFactory("Vault")
  const XZ = await upgrades.deployProxy(
    Xz.connect(relaySigner),
    [XY.address],
    { initializer: "initialize" },
    { kind: "uups" }
  )
  await XZ.connect(relaySigner).addAllowedToken(TX.address)
  console.log("address of Vault deployed at", XZ.address)
  writeFileSync(
    "deploy.json",
    JSON.stringify(
      {
        MinimalForwarderUpgradeable: XY.address,
        Vault: XZ.address,
        Token: TX.address,
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

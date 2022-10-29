const { ethers } = require("hardhat")
const { signMetaTxRequest } = require("../src/signer")
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require("fs")
require("dotenv").config()

function getInstance(name) {
  const address = JSON.parse(readFileSync("deployRegistry2.json"))[name]
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`)
  return ethers.getContractFactory(name).then((f) => f.attach(address))
}

async function main() {
  const forwarder = await getInstance("MinimalForwarderUpgradeable")
  const mainContract = await getInstance("Registry")
  //   const mainContract = await getInstance("Vault")
  const { PRIVATE_KEY: signer } = process.env
  const from = new ethers.Wallet(signer).address
  const data = mainContract.interface.encodeFunctionData("register", [
    "eliasStoner",
  ])
  const result = await signMetaTxRequest(signer, forwarder, {
    to: mainContract.address,
    from,
    data,
  })
  const path = __dirname + "/tmp"
  if (!existsSync(path)) {
    mkdirSync(path)
  }
  writeFileSync("tmp/requestRegistry2.json", JSON.stringify(result, null, 2))
  console.log(`Signature: `, result.signature)
  console.log(`Request: `, result.request)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

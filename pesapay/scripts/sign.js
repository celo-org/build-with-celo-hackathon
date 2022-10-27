const { ethers } = require("hardhat")
const { signMetaTxRequest } = require("../src/signer")
const { readFileSync, writeFileSync } = require("fs")
require("dotenv").config()

function getInstance(name) {
  const address = JSON.parse(readFileSync("deploy.json"))[name]
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`)
  return ethers.getContractFactory(name).then((f) => f.attach(address))
}
async function main() {
  const forwarder = await getInstance("MinimalForwarderUpgradeable")
  const mainContract = await getInstance("Vault")
  const { PRIVATE_KEY: signer } = process.env
  const from = new ethers.Wallet(signer).address
  const data = mainContract.interface.encodeFunctionData("depositCoin", [])
  const result = await signMetaTxRequest(signer, forwarder, {
    to: mainContract.address,
    from,
    data,
    value: 20000000000,
  })

  writeFileSync("tmp/request.json", JSON.stringify(result, null, 2))
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

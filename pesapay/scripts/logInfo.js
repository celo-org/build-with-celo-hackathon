const { ethers } = require("hardhat")
const { readFileSync } = require("fs")
require("dotenv").config()

function getInstance(name) {
  const address = JSON.parse(readFileSync("deployRegistry.json"))[name]
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`)
  return ethers.getContractFactory(name).then((f) => f.attach(address))
}

async function main() {
  const mainContract = await getInstance("RegistryTest")
  //   const mainContract = await getInstance("Vault")
  const { PRIVATE_KEY: signer } = process.env
  const from = new ethers.Wallet(signer).address
  const tx = await mainContract.owners("elias")
  const tx1 = await mainContract.owners("eliasStoner")
  console.log(tx, tx1)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

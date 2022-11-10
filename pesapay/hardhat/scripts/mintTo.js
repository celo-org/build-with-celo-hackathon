const { ethers } = require("hardhat")
const { readFileSync } = require("fs")
require("dotenv").config()
// const { WrapperBuilder } = require("@redstone-finance/evm-connector")

function getInstance(name) {
  const address = JSON.parse(readFileSync("deployCashout.json"))[name]
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`)
  return ethers.getContractFactory(name).then((f) => f.attach(address))
}

async function main() {
  const token = await getInstance("Token")
  const from = "0x0FaF8Dbb2a7820E34D943aAc81D8Aef9A6e9d0B1"
  const amount = ethers.utils.parseEther("1000")
  await token.mint(from, amount)
}
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

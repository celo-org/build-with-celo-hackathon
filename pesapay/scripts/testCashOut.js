const { ethers } = require("hardhat")
const { readFileSync } = require("fs")
require("dotenv").config()

function getInstance(name) {
  const address = JSON.parse(readFileSync("deployCashOut.json"))[name]
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`)
  return ethers.getContractFactory(name).then((f) => f.attach(address))
}

async function main() {
  const mainContract = await getInstance("CashOut")
  const token = await getInstance("Token")
  const { PRIVATE_KEY: signer } = process.env
  const from = new ethers.Wallet(signer).address
  const amount = ethers.utils.parseEther("1")
  await token.mint(from, amount)
  await mainContract.addAllowedToken(token.address)
  await token.approve(mainContract.address, amount)
  await mainContract.depositToken(token.address, amount)
  console.log("perfectly working")
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

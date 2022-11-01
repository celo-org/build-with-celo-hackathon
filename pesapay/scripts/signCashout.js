const { ethers } = require("hardhat")
const { signMetaTxRequest } = require("../src/signer")
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require("fs")
require("dotenv").config()

function getInstance(name) {
  const address = JSON.parse(readFileSync("deployCashOut.json"))[name]
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`)
  return ethers.getContractFactory(name).then((f) => f.attach(address))
}

async function main() {
  const forwarder = await getInstance("MinimalForwarder")
  const mainContract = await getInstance("CashOut")
  const token = await getInstance("Token")
  const { PRIVATE_KEY: signer } = process.env
  const from = new ethers.Wallet(signer).address
  const amount = ethers.utils.parseEther("1")
  await token.mint(from, amount)
  await token.approve(mainContract.address, amount)
  const data = mainContract.interface.encodeFunctionData("depositToken", [
    token.address,
    amount,
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
  writeFileSync("tmp/requestCashOut.json", JSON.stringify(result, null, 2))
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

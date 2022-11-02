const { ethers } = require("hardhat")
const { writeFileSync, readFileSync } = require("fs")

function getInstance(name) {
  const address = JSON.parse(readFileSync("deployCashout.json"))[name]
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`)
  return ethers.getContractFactory(name).then((f) => f.attach(address))
}

async function main() {
  const token = await getInstance("Token")
  const Forwarder = await ethers.getContractFactory("MinimalForwarder")
  const forwarder = await Forwarder.deploy().then((f) => f.deployed())

  const CashOut = await ethers.getContractFactory("CashOut")
  const cashOut = await CashOut.deploy(forwarder.address).then((f) =>
    f.deployed()
  )
  await cashOut.addAllowedToken(token.address)
  writeFileSync(
    "deployCashout.json",
    JSON.stringify(
      {
        MinimalForwarder: forwarder.address,
        CashOut: cashOut.address,
        Token: "0x53cb991435c6f6d8bb9d4d32c127384d999a1548",
      },
      null,
      2
    )
  )

  console.log(
    `MinimalForwarder: ${forwarder.address}\nCashOut: ${cashOut.address}`
  )
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

const { ethers } = require("hardhat")
const { writeFileSync } = require("fs")

async function main() {
  const Forwarder = await ethers.getContractFactory("MinimalForwarder")
  const forwarder = await Forwarder.deploy().then((f) => f.deployed())

  const CashOut = await ethers.getContractFactory("CashOut")
  const cashOut = await CashOut.deploy(forwarder.address).then((f) =>
    f.deployed()
  )

  writeFileSync(
    "deployCashOut.json",
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

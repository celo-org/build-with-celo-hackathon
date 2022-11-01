const { ethers } = require("hardhat")
const { writeFileSync } = require("fs")

async function main() {
  const CashOut = await ethers.getContractFactory("CashOut")
  const cashOut = await upgrades
    .deployProxy(CashOut, { kind: "uups" })
    .then((f) => f.deployed())

  writeFileSync(
    "deployCashOut.json",
    JSON.stringify(
      {
        CashOut: cashOut.address,
        Token: "0x53cb991435c6f6d8bb9d4d32c127384d999a1548",
      },
      null,
      2
    )
  )

  console.log(`done  \nCashOut: ${cashOut.address}`)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

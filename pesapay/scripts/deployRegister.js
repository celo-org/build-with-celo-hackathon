const { ethers, upgrades } = require("hardhat")
const { writeFileSync } = require("fs")

async function main() {
  const Registry = await ethers.getContractFactory("Registry")
  const registry = await upgrades.deployProxy(Registry, {
    kind: "uups",
  })

  writeFileSync(
    "deployRegistry2.json",
    JSON.stringify(
      {
        MinimalForwarderUpgradeable:
          "0x80CFD5ef82c2286b3c5FA197C0345dabf620ad41",
        Registry: registry.address,
      },
      null,
      2
    )
  )

  console.log(`hey there \nRegistry: ${registry.address}`)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

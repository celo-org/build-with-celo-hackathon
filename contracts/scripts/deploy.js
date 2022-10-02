const { ethers, upgrades } = require("hardhat")


async function main() {

  const gac = await ethers.getContractFactory("Growachild")
  const proxy = await upgrades.deployProxy(gac)
  //const phoneLink = await phoneLinks.deploy();
  //await phoneLink.deployed();
  console.log("Growachild deployed to:", proxy.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("This is error")
    console.error(error)
    process.exit(1)
  })

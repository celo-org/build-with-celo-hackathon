const { ethers, upgrades } = require("hardhat")


async function main() {

  const gactoken = await ethers.getContractFactory("GAC")
  const proxyToken = await upgrades.deployProxy(gactoken)
  console.log("Gac Coin deployed to:", proxyToken.address)

  const gac = await ethers.getContractFactory("Growachild")
  const proxy = await upgrades.deployProxy(gac, [proxyToken.address])
  console.log("Growachild deployed to:", proxy.address)


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("This is error")
    console.error(error)
    process.exit(1)
  })

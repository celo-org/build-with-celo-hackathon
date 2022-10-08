const { ethers, upgrades } = require("hardhat")

async function main() {
    const gac = await ethers.getContractFactory("Growachild")
    let proxy = await upgrades.upgradeProxy("0x0021926f723cbf8f13158Db2bFfB89c82a49F78F", gac); //alfajores (proxy deployed)
    console.log("Contract has been successfully upgraded.")
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("This is error")
        console.error(error)
        process.exit(1)
    })

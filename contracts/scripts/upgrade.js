const { ethers, upgrades } = require("hardhat")

async function main() {
    const gac = await ethers.getContractFactory("Growachild")
    let proxy = await upgrades.upgradeProxy("0x9f59e812dAE124049BFf53A131c66fe456baE1f1", gac); //alfajores (proxy deployed)
    console.log("Contract has been successfully upgraded.")
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("This is error")
        console.error(error)
        process.exit(1)
    })

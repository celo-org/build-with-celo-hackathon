const { ethers, upgrades } = require("hardhat")

async function main() {
    const gac = await ethers.getContractFactory("Growachild")
    let proxy = await upgrades.upgradeProxy("0x3dACfA490A54A02008d47D7e441ec73B11299721", gac); //alfajores (proxy deployed)
    console.log("Contract has been successfully upgraded.")
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("This is error")
        console.error(error)
        process.exit(1)
    })

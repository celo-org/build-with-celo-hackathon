const { ethers, upgrades } = require("hardhat")

async function main() {
    const gac = await ethers.getContractFactory("Growachild")
    let proxy = await upgrades.upgradeProxy("0xdDd21F1357AD10D89e8AFa7FbDa248718c007a2d", gac); //alfajores (proxy deployed)
    console.log("Contract has been successfully upgraded.")
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("This is error")
        console.error(error)
        process.exit(1)
    })

const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const fs = require("fs");

async function main() {
    const celodropcontract = await ethers.getContractFactory("CeloDrop");

    // here we deploy the contract
    const deployedContract = await celodropcontract.deploy(

    );
    await deployedContract.deployed();

    // print the address of the deployed contract
    console.log("CeloDrop Contract Address:", deployedContract.address);

    // console.log("Sleeping.....");
    // Wait for etherscan to notice that the contract has been deployed
    // await sleep(10000);

    // Verify the contract after deploying
    // await hre.run("verify:verify", {
    //     address: deployedContract.address,
    //     constructorArguments: [],
    // });
}

// function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

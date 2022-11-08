// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
    // const celoContract = await ethers.getContractFactory("Celo");
    // const cdefiContract = await ethers.getContractFactory("cDEFI");
    // const cethContract = await ethers.getContractFactory("cETH");
    // const ceurContract = await ethers.getContractFactory("cEUR");
    // const crealContract = await ethers.getContractFactory("cREAL");
    // const cusdContract = await ethers.getContractFactory("cUSD");
    // const usdcContract = await ethers.getContractFactory("USDC");
    // const wmaticContract = await ethers.getContractFactory("WMATIC");
    const daiContract = await ethers.getContractFactory("DAI");

    // const deployedceloContract = await celoContract.deploy();
    // const deployedcdefiContract = await cdefiContract.deploy();
    // const deployedcethContract = await cethContract.deploy();
    // const deployedceurContract = await ceurContract.deploy();
    // const deployedcrealContract = await crealContract.deploy();
    // const deployedcusdContract = await cusdContract.deploy();
    // const deployedusdcContract = await usdcContract.deploy();
    // const deployedwmaticContract = await wmaticContract.deploy();
    const deployeddaiContract = await daiContract.deploy();

    // await deployedceloContract.deployed();
    // await deployedcdefiContract.deployed();
    // await deployedcethContract.deployed();
    // await deployedceurContract.deployed();
    // await deployedcrealContract.deployed();
    // await deployedcusdContract.deployed();
    // await deployedusdcContract.deployed();
    // await deployedwmaticContract.deployed();
    await deployeddaiContract.deployed();

    // storeContractData(deployedceloContract, "Celo");
    // storeContractData(deployedcdefiContract, "cDEFI");
    // storeContractData(deployedcethContract, "cETH");
    // storeContractData(deployedceurContract, "cEUR");
    // storeContractData(deployedcrealContract, "cREAL");
    // storeContractData(deployedcusdContract, "cUSD");
    // storeContractData(deployedusdcContract, "USDC");
    // storeContractData(deployedwmaticContract, "WMATIC");
    storeContractData(deployeddaiContract, "DAI");
}

const storeContractData = (contract, contractName) => {
    const fs = require("fs");
    const contractDir = `${__dirname}/../abis`;

    if (!fs.existsSync(contractDir)) {
        fs.mkdirSync(contractDir);
    }

    const contractArtiacts = artifacts.readArtifactSync(contractName);

    fs.writeFileSync(
        contractDir + `/${contractName}.json`,
        JSON.stringify({ address: contract.address, ...contractArtiacts }, null, 2)
    );
};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

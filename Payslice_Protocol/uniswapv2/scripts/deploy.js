// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const factoryContract = await ethers.getContractFactory("ZuniswapV2Factory");
  const libraryContract = await ethers.getContractFactory("ZuniswapV2Library");

  const deployedfactory = await factoryContract.deploy();

  const deployedlibrary = await libraryContract.deploy();

  await deployedlibrary.deployed();

  const routerContract = await ethers.getContractFactory("ZuniswapV2Router", {
    libraries: {
      ZuniswapV2Library: deployedlibrary.address
    }
  });

  const deployedRouter = await routerContract.deploy(deployedfactory.address);

  await deployedfactory.deployed();
  await deployedRouter.deployed();

  storeContractData(deployedRouter, "ZuniswapV2Router");
  storeContractData(deployedfactory, "ZuniswapV2Factory");
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

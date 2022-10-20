// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const kdaiContract = await ethers.getContractFactory("KDAI");
  const wklayContract = await ethers.getContractFactory("WKLAY");
  const ousdcContract = await ethers.getContractFactory("oUSDC");
  const factoryContract = await ethers.getContractFactory("ZuniswapV2Factory");
  const libraryContract = await ethers.getContractFactory("ZuniswapV2Library");


  const deployedKDAI = await kdaiContract.deploy();
  const deployedWKLAY = await wklayContract.deploy();
  const deployedoUSDC = await ousdcContract.deploy();
  const deployedfactory = await factoryContract.deploy();
  const deployedlibrary = await libraryContract.deploy();


  await deployedlibrary.deployed();
  await deployedKDAI.deployed();
  await deployedWKLAY.deployed();
  await deployedoUSDC.deployed();

  const routerContract = await ethers.getContractFactory("ZuniswapV2Router", {
    libraries: {
      ZuniswapV2Library: deployedlibrary.address
    }
  });

  const deployedRouter = await routerContract.deploy(deployedfactory.address);

  await deployedfactory.deployed();
  await deployedRouter.deployed();

  //fund exchange
  const fundAmount = ethers.utils.parseEther("10000000000");
  const [signer ] =  await ethers.getSigners();

  console.log(fundAmount.toString());

  await Promise.all([deployedKDAI.mint(fundAmount),
  deployedWKLAY.mint(fundAmount),
  deployedoUSDC.mint(fundAmount)]);

  await Promise.all([deployedKDAI.approve(deployedRouter.address, fundAmount),
  deployedWKLAY.approve(deployedRouter.address, fundAmount),
  deployedKDAI.approve(deployedRouter.address, fundAmount)]);

  await deployedRouter.addLiquidity(
    deployedKDAI.address, 
    deployedWKLAY.address, 
    fundAmount, 
    fundAmount, 
    ethers.utils.parseEther("100000"), 
    ethers.utils.parseEther("100000"),
    signer.address
    )


  storeContractData(deployedKDAI, "KDAI");
  storeContractData(deployedWKLAY, "WKLAY");
  storeContractData(deployedoUSDC, "oUSDC");
  storeContractData(deployedRouter, "ZuniswapV2Router");
  storeContractData(deployedfactory, "ZuniswapV2Factory");

  console.log(
    `KDAI: ${deployedKDAI.address} \r\n 
    WKLAY: ${deployedWKLAY.address} \r\n 
    oUSDC: ${deployedoUSDC.address} \r\n 
    ZuniswapV2Library: ${deployedlibrary.address} \r\n 
    ZuniswapV2Router: ${deployedRouter.address} \r\n `
  )
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

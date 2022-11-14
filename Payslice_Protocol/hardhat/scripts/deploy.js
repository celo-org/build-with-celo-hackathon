// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
require("dotenv").config();
const hre = require("hardhat");

async function main() {

  const forwarderContract = await ethers.getContractFactory("PaysliceForwarder");
  // const sliceContract = await ethers.getContractFactory("SliceMetaTxn");
  // const loggerContract = await ethers.getContractFactory("Logger");
  // const paysliceContract = await ethers.getContractFactory("Payslice");

  const deployForwarder = await forwarderContract.deploy(process.env.EXCHANGE_ADDRESS);
  // const deployedLogger = await loggerContract.deploy();
  // const deployedSlice = await sliceContract.deploy(deployForwarder.address);
  // const deployedPayslice = await paysliceContract.deploy();

   // await deployedLogger.deployed();
  // await deployedSlice.deployed();
  // await deployedPayslice.deployed();
  await deployForwarder.deployed();
  await deployForwarder.registerRelayer("0xdf69cf42e1e8cf4acfb8b09649096ecfe1cee0d7");
 

  // const txn = await deployedPayslice.initialize(
  //   deployedSlice.address,
  //   process.env.EXCHANGE_ADDRESS,
  //   deployedLogger.address
  // );

  // await txn.wait();

  // storeContractData(deployedSlice, "Slice");
  // storeContractData(deployedPayslice, "Payslice");
  // storeContractData(deployedLogger, "Logger");
  storeContractData(deployForwarder, "PaysliceForwarder");
  

  // console.log(`
  // logger contract at: ${deployedLogger.address} \r\n
  // slice contract at: ${deployedSlice.address}
  // `);
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
  console.error(error);``
  process.exitCode = 1;
});

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {

  const Telemed = await hre.ethers.getContractFactory("Telemed");
  const telemed = await Telemed.deploy();

  await telemed.deployed();

  console.log(
    `deployed to ${telemed.address}`
  );

   //Pull the address and ABI out while you deploy, since that will be key in interacting with the smart contract later
  const data = {
    address: telemed.address,
    abi: JSON.parse(telemed.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  //This data is then used by frontend files to connect with the smart contract
  fs.writeFileSync('../src/telemed.json', JSON.stringify(data))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

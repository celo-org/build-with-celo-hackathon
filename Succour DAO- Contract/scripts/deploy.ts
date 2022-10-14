import { ethers } from "hardhat";

async function main() {
  

  console.log("Deploying Succour contract")
  const Succour = await ethers.getContractFactory("Succour");
  const succour = await Succour.deploy();
  await succour.deployed();
  console.log(`Succour contract deployed to ${succour.address}`);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

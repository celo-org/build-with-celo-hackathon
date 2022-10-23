import { ethers } from "hardhat";

async function main() {
  

  console.log("Deploying Succour contract")
  const Succour = await ethers.getContractFactory("Succour");
  const succour = await Succour.deploy();
  await succour.deployed();
  console.log(`Succour contract deployed to ${succour.address}`);

  const minimumRequirement = await ethers.utils.parseEther("10");
  const maximumRequirement = await ethers.utils.parseEther("200");
  const tokenAddress = "0x07b8b15Afd654e9334A3D63396B5f9092bfb0D9E";

  // const constructData = await succour.encode(minimumRequirement, maximumRequirement,tokenAddress )
  
  // console.log("Deploying Succour proxy contract")
  // const Proxy = await ethers.getContractFactory("Proxy");
  // const proxy = await Proxy.deploy(constructData, succour.address)
  // await proxy.deployed();
  // console.log("Proxy contract deployed to ", proxy.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

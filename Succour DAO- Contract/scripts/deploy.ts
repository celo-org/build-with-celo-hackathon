import { ethers } from "hardhat";

async function main() {
  

  console.log("Deploying Token contract")
  const Token = await ethers.getContractFactory("Erc20Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("This is the sucour contract address", token.address)
  
  console.log("Deploying Succour contract")
  const Succour = await ethers.getContractFactory("Succour");
  const succour = await Succour.deploy();
  await succour.deployed();
  console.log(`Succour contract deployed to ${succour.address}`);

  const minimumRequirement = await ethers.utils.parseEther("5000");
  const maximumRequirement = await ethers.utils.parseEther("100000");

  const constructData = await succour.encode(minimumRequirement, maximumRequirement, token.address)
  
  console.log("Deploying Succour proxy contract")
  const Proxy = await ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy(constructData, succour.address)
  await proxy.deployed();
  console.log("Proxy contract deployed to ", proxy.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

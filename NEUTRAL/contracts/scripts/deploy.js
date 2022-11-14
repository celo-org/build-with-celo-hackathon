const { ethers } = require("hardhat");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */
  const NeutralContract = await ethers.getContractFactory("Neutral");

  // here we deploy the contract
  const deployedNeutralContract = await NeutralContract.deploy();

  // Wait for it to finish deploying
  await deployedNeutralContract.deployed();

  // print the address of the deployed contract
  console.log("Neutral Contract Address:", deployedNeutralContract.address);

  // 0x7Bd6604e45A25630EfB009C96d03a99EF14b72cB
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

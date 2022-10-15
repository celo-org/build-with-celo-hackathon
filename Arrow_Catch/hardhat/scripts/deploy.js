// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Tri = await hre.ethers.getContractFactory("Trigonometry")
  const tri = await Tri.deploy();
  await tri.deployed();
  const ArrowCatch = await hre.ethers.getContractFactory("ArrowCatch", {
    libraries: {
      Trigonometry: tri.address,
    },
  })
  const arrowCatch = await ArrowCatch.deploy();

  await arrowCatch.deployed();

  console.log("trigonometry deployed to:", tri.address);
  console.log("ArrowCatch deployed to:", arrowCatch.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

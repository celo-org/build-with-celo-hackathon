import ethers from "@nomiclabs/hardhat-ethers"
const hre = require("hardhat")

async function main() {

  const CELO = await hre.ethers.getContractFactory("CELO_HACK")
  const celo = await CELO.deploy()

  await celo.deployed()

  console.log(`CELO_HACK deployed to ${celo.address}`)

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


//0xb44D65bfD8971043cf6B04c0dCe3C7ec246ca4Eb
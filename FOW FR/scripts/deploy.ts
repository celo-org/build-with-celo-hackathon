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


//0x813B8a84A802aAdA2A873a8cbcAa703BEE9f68C4
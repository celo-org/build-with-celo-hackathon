const hre = require("hardhat");
async function main ()
{
const MintExample = await hre.ethers.getContractFactory("MintExample");
const mintExample = await MintExample.deploy("Minter","MINT");

await mintExample.deployed();
console.log("MintExample deployed to :", mintExample.address,"address");

}
main()
.then(() => process.exit(a))
.catch((error) => {
console.error(error);
process.exit(1);
});

// const { ethers, run, network } = require("hardhat")

async function main(contractName, contractAddress) {
  let contractFactory
  let contract

  if (contractAddress == "0") {
    console.log("Deploying contract...");
    contractFactory = await ethers.getContractFactory(contractName)
    contract = await contractFactory.deploy("Sidoux NFT", "SDXNFT", "ipfs://QmQLn1HcBHMLq545Ye23mYBVNURUZevhPEkU9hcSjR8vTC/")

    await contract.deployed()

    console.log(`Contract deployed to ${contract.address}`)
  } else {
    console.log("Getting deployed contract...");
    contractFactory = await ethers.getContractFactory(contractName);
    contract = await contractFactory.attach(contractAddress);
  }


  // console.log(network.config)
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contract...");
    await verify(contract.address, ["Sidoux NFT", "SDXNFT", "ipfs://QmQLn1HcBHMLq545Ye23mYBVNURUZevhPEkU9hcSjR8vTC/"])
  }

}
async function verify(contractAddress, args) {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

main("SimpleBadge", "0x0A93A232DEBde76151D454A721EDD81e3CF38114")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
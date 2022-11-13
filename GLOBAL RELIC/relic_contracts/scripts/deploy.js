const hre = require("hardhat");
const fs = require('fs')

async function main() {
  const txFee = 3
  const Contract = await hre.ethers.getContractFactory('RelicCF')
  const contract = await Contract.deploy(txFee)

  await contract.deployed()
  
  const contractAddress = contract.address
  console.log('Contract deployed to:', contractAddress)

  // const contractABI = contract.interface.format('json')
  // const contractABIPath = './relic-web/src/abis/RelicCF.json'
  // fs.writeFileSync(contractABIPath, contractABI)
  // console.log('Contract ABI written to:', contractABIPath)

  const address = JSON.stringify({ address: contractAddress }, null, 4)
  const contractAddressPath = './relic-web/src/abis/RelicCFaddress.json'
  fs.writeFileSync(contractAddressPath, address, 'utf8')
  console.log('Contract address written to:', contractAddressPath)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
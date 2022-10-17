import { ethers } from 'hardhat'

async function main() {
  const run3TAddress = '0xe6cc5BB123EBf28257d2fAE9714e211cb29A7D39'

  const watch = await ethers.getContractFactory('Watch')
  const watchToDep = await watch.deploy()

  await watchToDep.deployed()

  console.log('Watch deployed to:', watchToDep.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

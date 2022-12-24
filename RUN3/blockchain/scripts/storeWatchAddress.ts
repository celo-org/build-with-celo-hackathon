import { ethers } from 'hardhat'

async function main() {
  const run3TAddress = '0x570b9f03D8Bfb024F0998eb9E8E1B42A97cA3128'
  const watchAddress = '0x0Cad7f1012c6201bed812dF1181c5E5B383D96ee'

  const run3Token = await ethers.getContractFactory('Run3Token')

  const run3 = await run3Token.attach(run3TAddress)

  run3.updateWatchAddress(watchAddress)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

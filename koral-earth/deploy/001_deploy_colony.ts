import type { HardhatRuntimeEnvironment } from 'hardhat/types';

async function deployer(_hre: HardhatRuntimeEnvironment) {
  console.log(`Deployed all contracts successfully`);
}

deployer.tags = ['Colony'];

export default deployer;

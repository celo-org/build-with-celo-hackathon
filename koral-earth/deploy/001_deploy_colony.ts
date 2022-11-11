import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { getEnvVar } from '../app/common/env';
import { Network } from '../app/common/blockchain';

const contractName = 'Colony';
const defaultNetwork = getEnvVar<Network>('DEPLOYMENT_NETWORK');

async function deployer(hre: HardhatRuntimeEnvironment) {
  const [ownerAddress] = await hre.getUnnamedAccounts();

  const { deploy: deployContract } = hre.deployments;

  const colony = await deployContract(contractName, {
    from: ownerAddress,
    log: true,
    autoMine: true,
    proxy: {
      owner: ownerAddress,
      execute: {
        methodName: 'initialize',
        args: ['AB Airline', 10, 2],
      },
    },
  });

  if (defaultNetwork === 'ganache') {
    await hre.ethernal.push({
      name: contractName,
      address: colony.address,
    });
  }

  console.log(`Deployed colony successfully`, colony.address);
}

deployer.tags = [`${contractName}_001`];

export default deployer;

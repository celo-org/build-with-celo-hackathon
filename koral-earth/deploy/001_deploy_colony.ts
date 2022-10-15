import type { HardhatRuntimeEnvironment } from 'hardhat/types';

const contractName = 'Colony';

async function deployer(hre: HardhatRuntimeEnvironment) {
  const [ownerAddress] = await hre.getUnnamedAccounts();
  console.log('ownerAddress', ownerAddress);
  const { deploy: deployContract } = hre.deployments;

  const colony = await deployContract(contractName, {
    from: ownerAddress,
    log: true,
    autoMine: true,
    proxy: {
      owner: ownerAddress,
      execute: {
        methodName: "initialize",
        args: ["DataCooper", 10, 2]
      }
    }
  });

  await hre.ethernal.push({
    name: contractName,
    address: colony.address
  });

  console.log(`Deployed colony successfully`, colony.address);
}

deployer.tags = [`${contractName}_001`];

export default deployer;

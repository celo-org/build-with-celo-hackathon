// deploy/00_deploy_my_contract.js

// const { ethers } = require("hardhat");

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer, feeTo } = await getNamedAccounts();

  const alcManager = await deploy("AccountManager", {
    from: deployer,
    args: [feeTo],
    log: true,
  });

  const digesuLib = await deploy("DigesuLib", {
    from: deployer,
    args: [],
    log: true,
  });

  const token = await deploy("QuatreToken", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    args: [ deployer ],
    log: true,
  });

  await deploy("Digesu", [], {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [
      token.address, 
      ethers.utils.parseEther("0.1"),
      feeTo,
      alcManager.address
    ],
    log: true,
  }, 
  {
    LibraryName: digesuLib.address
  });

  // Getting a previously deployed contract
  // const Greeter = new ethers.Contract("Greeter", deployer);

  // await Greeter.setGreeting("Hello Celo!");

  /*
  // If you want to send value to an address from the deployer
  
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some CELO to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
    value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
    LibraryName: **LibraryAddress**
  });
  */
};

module.exports.tags = ["AccountManager", "QuatreToken", "Digesu"];

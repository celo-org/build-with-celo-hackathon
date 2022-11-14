// module.exports = async ({
//   getNamedAccounts,
//   deployments,
//   getChainId,
//   getUnnamedAccounts,
// }) => {
//   const { deploy } = deployments;
//   const { deployer } = await getNamedAccounts();

//   // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
//   await deploy("Greeter", {
//     from: deployer,
//     // gas: 4000000,
//     args: ["Greeting set from ./deploy/Greeter.ts"],
//   });
// };

// deploy/00_deploy_my_contract.js

// import { ethers } from "hardhat";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments }) => {
  // const initTokenReceiver = "0xe63537C16094Fcd6b49FE6730c182eC973940F4F";
  const { deploy } = deployments;
  const { deployer, feeTo } = await getNamedAccounts();

  
  // const dexPool = await deploy("DexPoolOneFile", {
  //   from: deployer,
  //   args: [],
  //   log: true,
  // });
  
  // const token = await deploy("QuatreTokenModule", {
  //   from: deployer,
  //   args: [dexPool.address], // Setting grandMarshall
  //   log: true,
  // });

  // Upgraded contract deployment. 
  // This handles deployment for refactored contracts. Though in porgress.


  const alcManager = await deploy("AccountManager", {
    from: deployer,
    args: [],
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
    args: [],
    log: true,
  });

  const Digesu = await deploy("Digesu", {
    from: deployer,
    args: [],
    log: true,
    libraries: {
      DigesuLib: digesuLib.address
    }
  });

  // await deploy("Digesu", [
  //   token.address, 
  //   ethers.utils.parseEther("0.1"),
  //   feeTo,
  //   alcManager.address
  // ], {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   log: true,
  // }, 
  // {
  //   LibraryName: digesuLib.address
  // });

};

module.exports.tags = ["AccountManager", "DigesuLib", "QuatreToken", "Digesu"];

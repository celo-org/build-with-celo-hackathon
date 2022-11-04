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
  console.log("FeeTo", feeTo);
  // const [ deployer, feeTo ] = ethers.getSigners();

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

  await deploy("Digesu", {
    from: deployer,
    args: [
      // token.address, 
      // ethers.utils.parseEther("0.1"),
      // feeTo,
      // alcManager.address
    ],
    log: true,
    libraries: {
      DigesuLib: digesuLib.address
    }
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

  // reusing "AccountManager" at 0x91785D0709b0997AC3BFf046E5b9648A9AEE8278
  // reusing "DigesuLib" at 0xad7f56d2a09E33Ba67C8C6002B8a96eBC6bF9f54
  // reusing "QuatreToken" at 0xb40f24ddF6B5dD8841B8EDbaB9eF7d0cD2357267
  // deploying "Digesu" (tx: 0xcc3b8a67f9de11ad453cd9e488f02ba56d7c0371296cd18ad9b649b91581d8a0)...: deployed 
  // at 0x44839f1D348276478545de52D17E71AaA213C17d with 4488272 gas
};

module.exports.tags = ["AccountManager", "QuatreToken", "Digesu"];

// graph init --contract-name 0xcc3b8a67f9de11ad453cd9e488f02ba56d7c0371296cd18ad9b649b91581d8a0 \
// --index-events --studio \
// --from-contract 0xcc3b8a67f9de11ad453cd9e488f02ba56d7c0371296cd18ad9b649b91581d8a0
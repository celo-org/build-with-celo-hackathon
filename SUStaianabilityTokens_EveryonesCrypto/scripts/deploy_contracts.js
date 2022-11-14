// scripts/deploy.js

//const { ethers } = require("hardhat");
//const { WrapperBuilder } = require("@redstone-finance/evm-connector");
//import { WrapperBuilder } from "@redstone-finance/evm-connector";

async function main () {
    console.log('');
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    console.log('');
    const Roles = await ethers.getContractFactory('Roles');
    console.log('Deploying Roles contract...');
    const roles = await Roles.deploy();
    await roles.deployed();
    console.log('Roles contract deployed to:', roles.address);

    console.log('');
    const SUStaianablilityTokens = await ethers.getContractFactory('SUStaianablilityTokens');
    console.log('Deploying SUST ERC20 contract...');
    const sust = await SUStaianablilityTokens.deploy(roles.address);
    await sust.deployed();
    console.log('SUStaianablilityTokens contract deployed to:', sust.address);

    console.log('');
    const BandOracle = await ethers.getContractFactory('BandOracle');
    console.log('Deploying BandOracle contract...');
    const bandReferenceAddress_Alfajores = '0x71046b955Cdd96bC54aCa5E66fd69cfb5780f3BB';
    const bandReferenceAddress_CeloMainnet = '0xDA7a001b254CD22e46d3eAB04d937489c93174C3';
    const bandOracle = await BandOracle.deploy(bandReferenceAddress_Alfajores);
    await bandOracle.deployed();
    console.log('Band Oracle contract deployed to:', bandOracle.address);
    /*Enter the Alfajores testnet Band reference data aggregator contract address 
    (0x71046b955Cdd96bC54aCa5E66fd69cfb5780f3BB) to the DemoOracle constructor and deploy the contract. 
    You can access the reference data aggregator contract on mainnet at 0xDA7a001b254CD22e46d3eAB04d937489c93174C3.
    */

    console.log('');
    const FrontFace = await ethers.getContractFactory('FrontFace');
    console.log('Deploying FrontFace contract...');
    const frontFace = await FrontFace.deploy(roles.address, sust.address, bandOracle.address);
    await frontFace.deployed();
    console.log('FrontFace input contract deployed to:', frontFace.address);

    // console.log('');
    // const ExampleContractCustomUrls = await ethers.getContractFactory('ExampleContractCustomUrls');
    // console.log('Deploying RedStone contract...');
    // const exampleContractCustomUrls = await ExampleContractCustomUrls.deploy();
    // await exampleContractCustomUrls.deployed();
    // console.log('ExampleContractCustomUrls contract deployed to:', exampleContractCustomUrls.address);


    console.log('');
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
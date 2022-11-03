import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "bignumber.js";
import Web3 from "web3";
import { Hex } from "web3-utils";

// I created this custom utils for flexiblity working with BigNumber. Although it can be more improved

function assert(arg0: boolean, errorMessage?: string) {
  if(!arg0) throw new Error(errorMessage);
}

const bn = (arg : any ) : BigNumber => {
  const big = new BigNumber(arg);
  return big;
}

const format = (arg : any) : number => {
  return bn(arg).toNumber();
}

async function deployToken(deployer: any, initialTokenReceiver: string) {
  const Token = await ethers.getContractFactory("SimpleToken");
  const token = await Token.connect(deployer).deploy(initialTokenReceiver);

  return token;
}

async function deployAccountManager(deployer: any, feeTo: string) {
  const AccountManager = await ethers.getContractFactory("AccountManager");
  const accountManager = await AccountManager.connect(deployer).deploy(feeTo);

  return accountManager;
}

async function deployLibrary(deployer: any) {
  const DigesuLib = await ethers.getContractFactory("DigesuLib");
  const digesuLib = await DigesuLib.deploy();

  return digesuLib;
}

async function deployDigesu(
  deployer: any, 
  owner: string,
  feeTo: string,
  minimumPoolAmount: Hex
  ) {
  const libAddr = await deployLibrary(deployer);
  const token = await deployToken(deployer, owner);
  const accountManager = await deployAccountManager(deployer, feeTo);
  const tokenAddress = token.address;
  const managerAddress = accountManager.address;
  const Digesu = await ethers.getContractFactory("Digesu", {
    libraries: {
      DigesuLib: libAddr.address,
    },
  });
  const digesu = await Digesu.deploy(
    token.address, 
    minimumPoolAmount, 
    feeTo, 
    accountManager.address
  );

  const digesuAddress = digesu.address;
  
  return { 
    digesu, 
    token, 
    accountManager,
    digesuAddress,
    managerAddress,
    tokenAddress
  }
  
}

export const testUtils = {
  convertFromHex: (x:Hex) => {
    return Web3.utils.hexToNumberString(x);
  },
  convertToHex : (x : any) => {
    return Web3.utils.numberToHex(x);
  },
  wrap : (x: string | number) => {
    return Web3.utils.toBN(x);
  },

  bn : bn,
  format : format,

  add : (a:any, b:any) : number => {
    return bn(a).plus(bn(b)).toNumber();
  },

  reduce : (a: any, b:any) : BigNumber => {
    assert(bn(a).gte(bn(b)), `${a} is less than ${b}`)
    return bn(a).minus(bn(b));
  },

  compareEqualNumber : (a:any, b:any): void => {
    expect(format(a)).to.equal(format(b));
  },

  compareEqualString : (a:string, b:string): void => {
    expect(a).to.equal(b);
  },

  assertIsCorrectAddress : (x: string) => {
    assert(Web3.utils.isAddress(x), "Not a valid address");
  },

  getSigners : async() => {
    const [owner, misc1, misc2, escapeAddr, feeTo, member1, member2, member3 ] = await ethers.getSigners();
    return {
      owner,
      misc1,
      misc2,
      escapeAddr,
      feeTo,
      member1,
      member2,
      member3
    }
  },
  VALUE_TO_SEND: ethers.utils.parseEther('2.0'),
  INITIAL_ACCOUNT_BALANCE : ethers.utils.parseEther('1.0'),
  ZERO_ADDRESS : "0x0000000000000000000000000000000000000000",
  CREATION_FEE : ethers.utils.parseEther('0.02'),
  MINIMUM_POOL_AMOUNT : 1_000_000_000_000_000,
  deployContracts: deployDigesu,
  deployToken: deployToken,
  assertValue: assert,
}
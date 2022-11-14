import { expect } from "chai";
import { ethers } from "hardhat";
import { testUtils } from "./utils";
import { loadCustomTokenFixtures } from "./TokenUtils";

const {
  bn,
  add, 
  wrap,
  reduce, 
  convertToHex,
  convertFromHex, 
  compareEqualNumber, 
  compareEqualString } = testUtils;

describe("Token", function () {
  describe("Deployment: Token : Should set token parameters correctly", function () {

    const expectedName = "SimpleFinance Token";
    const symbol = "SFT";
    const decimals = 18
    const totalSupply = wrap('880000000000000000000000000');
    const maxSupply = wrap('1000000000000000000000000000');

    it("Should set token name correctly", async function () {
      const { token } = await loadCustomTokenFixtures();
      compareEqualString(await token.name(), expectedName);
    });

    it("Should set token symbol correctly", async function () {
      const { token } = await loadCustomTokenFixtures();
      compareEqualString(await token.symbol(), symbol);
    });

    it("Should set maxSupply correctly", async function () {
      const { token } = await loadCustomTokenFixtures();
      compareEqualNumber(convertFromHex(await token.maxSupply()), bn(maxSupply));
    });

    it("Should set token decimals correctly", async function () {
      const { token } = await loadCustomTokenFixtures();
      expect(await token.decimals()).to.equal(decimals);
    });

    it("Should confirm token totalSupply", async function () {
      const { token } = await loadCustomTokenFixtures();
      compareEqualNumber(convertFromHex(await token.totalSupply()), bn(totalSupply));
    });

    it("Should set liquidity reserve correctly.", async () => {
      const { token } = await loadCustomTokenFixtures();
      compareEqualNumber(convertFromHex(await token.reserved()), reduce(maxSupply, totalSupply));
    });

    it("Should confirm amount minted to initial recipient.", async () => {
      const { signers, balanceOf } = await loadCustomTokenFixtures();
      compareEqualNumber(await balanceOf(signers[0].address), bn(totalSupply));
    });

    it("Should transfer token successFully", async function () {
      const { token } = await loadCustomTokenFixtures();
      compareEqualNumber(convertFromHex(await token.totalSupply()), bn(totalSupply));
    });

    it("Should mint successfully.", async () => {
      const { token, balanceOf, signers, mint } = await loadCustomTokenFixtures();
      const initBalMisc1 = await balanceOf(signers[1].address);
      const valueSent = await mint();
      const accountBalances = await token.accountBalances(signers[1].address);
      compareEqualNumber(await balanceOf(signers[1].address), add(initBalMisc1, valueSent));
      compareEqualNumber(convertFromHex(accountBalances[0]), add(initBalMisc1, valueSent));
    });
    
    it("Should transfer SFT successfully from A to B", async () => {
      const { balanceOf, balances, signers, transfer, mint } = await loadCustomTokenFixtures();
      const misc2 = signers[2]
      const transferAmount = convertToHex('1000000000000000000000'); //
      await mint();
      const balMisc1Before = await balanceOf(signers[1].address);
      await transfer(misc2.address, 1, transferAmount);
      const [ balMsc1, balMsc2 ] = await balances(signers[1].address, misc2.address);
      compareEqualNumber(balMsc1, reduce(balMisc1Before, transferAmount));
      compareEqualNumber(balMsc2, add(balMisc1Before, transferAmount));
    });

    it("Should execute batch transfer successfully", async () => {
      const { token, balanceOf, balances, signers, mint } = await loadCustomTokenFixtures();
      await mint();
      const owner = signers[0];
      const misc2 = signers[2];
      const value = convertToHex('10000000000000000000000');
      const values = [value, value];
      const initBalOwner = await balanceOf(owner.address);
      const [ initBalMsc1, initBalMsc2 ] = await balances(signers[1].address, misc2.address);
      
      await token.connect(owner).dynamicTransfer(values, [signers[1].address, misc2.address]); //Send 10,000 SFT
      const [ balMsc1, balMsc2 ] = await balances(signers[1].address, misc2.address);
      compareEqualNumber(await balanceOf(owner.address), reduce(initBalOwner, add(bn(value), bn(value))));
      compareEqualNumber(balMsc1, add(bn(initBalMsc1), bn(value)));
      compareEqualNumber(balMsc2, add(bn(initBalMsc2), bn(value)));
    });

    it("Should increase allowance of B after approval from A.", async () => {
      const { token, signers, mint} = await loadCustomTokenFixtures();
      await mint();
      const misc2 = signers[2];
      const value = convertToHex('10000000000000000000');
      await token.connect(signers[1]).approve(misc2.address, value);
      compareEqualNumber(convertFromHex(await token.allowance(signers[1].address, misc2.address)), value);
    });

    it("Should reduce the allowance of a when b calls the decreaseAllowance", async () => {
      const { signers, mint, approve, getAllowance, decreaseAllowance } = await loadCustomTokenFixtures();
      await mint();
      const increase = convertToHex('1000000000000000000000');
      const decrease = convertToHex('10000000000000000000');
      const misc2 = signers[2];
      await approve(1, misc2.address, increase);
      await decreaseAllowance(1, misc2.address, decrease);
      const newAllowance = await getAllowance(1, misc2.address);
      compareEqualNumber(convertFromHex(newAllowance), reduce(increase, decrease));
    });

    it("Should increase the balance of misc2 when call the transferFrom()", async () => {
      const { token, balances, signers, transferFrom, mint, approve, getAllowance, decreaseAllowance } = await loadCustomTokenFixtures();
      await mint();
      const misc2 = signers[2];
      const value = convertToHex('1000000000000000000000');
      const [ initBalMsc1, initBalMsc2 ] = await balances(signers[1].address, misc2.address);
      await approve(1, misc2.address, value);
      await transferFrom(2, signers[1].address, value);
      const [ balMsc1, balMsc2 ] = await balances(signers[1].address, misc2.address);

      compareEqualNumber(balMsc2, add(initBalMsc2, value));
      compareEqualNumber(balMsc1, reduce(initBalMsc1, value));
    });

    it("Should lock specific amount for zero days.", async () => {
      const { token, balanceOf, signers, lockSpecific, mint } = await loadCustomTokenFixtures();
      await mint();
      const lockedAmount = convertToHex('10000000000000000000');
      const initBal = await balanceOf(signers[1].address);
      await lockSpecific(1, lockedAmount);
      const accountBalances = await token.accountBalances(signers[1].address);
      compareEqualNumber(convertFromHex(accountBalances[0]), reduce(initBal, lockedAmount));
      compareEqualNumber(convertFromHex(accountBalances[1]), lockedAmount);
      compareEqualNumber(convertFromHex(accountBalances[2]), wrap(0));
    });

    it("Should unlock specific amount.", async () => {
      const { token, balances, signers, unlockSpecific, lockSpecific, mint } = await loadCustomTokenFixtures();
      const balInit = await mint();
      const [initBalMisc1,] = await balances(signers[1].address, signers[3].address);
      const amount = convertToHex('1000000000000000000');
      await lockSpecific(1, amount);
      await unlockSpecific(1, amount);
      const accountBalances = await token.accountBalances(signers[1].address);
      const [, balEsc] = await balances(signers[1].address, signers[3].address);

      compareEqualNumber(convertFromHex(accountBalances[0]), reduce(initBalMisc1, amount));
      compareEqualNumber(convertFromHex(accountBalances[1]), reduce(amount, amount));
      compareEqualNumber(balEsc, add(balInit, amount));
    });

    it("Should panic move balances from misc1 to escapeAddr.", async () => {
      const { token, balances, signers, mint, lockSpecific} = await loadCustomTokenFixtures();
      const lockedAmount = convertToHex('10000000000000000000');
      const initBal = await mint();
      const misc1 = signers[1];
      const escapeAddr = signers[3];
      const [initBalMisc1, initBalEsc] = await balances(misc1.address, escapeAddr.address);
      await lockSpecific(1, lockedAmount);
      await token.connect(signers[0]).panicMove(signers[1].address);

      // We call panicMove on behalf of 'misc1'. 
      const [balMisc1, balEsc] = await balances(signers[1].address, escapeAddr.address);
      compareEqualNumber(balMisc1, convertToHex('0'));
      compareEqualNumber(balEsc, add(initBalEsc, initBalMisc1));
    });

    it("Should revert if there was no previous locked amount.", async () => {
      const {token, signers, mint, lockSpecific } = await loadCustomTokenFixtures();
      await mint();
      const unlockedAmt = convertToHex('1000000000000000000');
      await expect(token.connect(signers[2]).unlockSpecific(unlockedAmt)).to.be.revertedWith(
        "No prev locked"
      );
    });

    it("Should revert if contract is paused.", async () => {
      const { token, signers } = await loadCustomTokenFixtures();
      const unlockedAmt = ethers.BigNumber.from('1000000000000000000');
      await token.connect(signers[0]).pause();
      await expect(token.connect(signers[2]).unlockSpecific(unlockedAmt)).to.be.revertedWith(
        "Pausable: paused"
      );
    });
  });
});
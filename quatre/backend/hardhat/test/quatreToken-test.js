
/*
Testing for Quatre Token
*/
let QuatreToken = artifacts.require("QuatreToken");
const catchRevert = require("./helpers.js").catchRevert;
const { BigNumber } = require("bignumber.js");
const { expect, assert } = require("chai");
const truffleAssertions = require("truffle-assertions");
const Web3 = require("web3");

let acc1, acc2, acc3, escapeAddr, acc4;
// const format = (x) => { return Web3.utils.hexToNumberString(x); }

const add = (x, y) => { 
    const bigX = new BigNumber(x);
    const bigY = new BigNumber(y);
    const z = bigX.plus(bigY);
    return z.toNumber(); 
}

const subtract = (x, y) => {
    if(y > x) return null;
    const bigX = new BigNumber(x);
    const bigY = new BigNumber(y);
    const z = bigX.minus(bigY);
    return z.toNumber(); 
}

const formatBN = (x) => { 
    const bigX = new BigNumber(x);
    return bigX.toNumber();
 }

 
 contract('QuatreToken', accounts => {

    acc1 = accounts[0];
    acc2 = accounts[1];
    acc3 = accounts[2];
    escapeAddr = accounts[3];
    acc4 = accounts[4];
    let instance, tokenAddress;
    const msupply = Web3.utils.toBN('1000000000000000000000000000').toString();
    const val1 = Web3.utils.toBN('1000000000000000000000').toString();
    const val2 = Web3.utils.toBN('10000000000000000000000').toString();
    const allowance_1 = Web3.utils.toBN('2000000000000000000000').toString();
    const allowance_2= Web3.utils.toBN('1000000000000000000000').toString();
    const allowance_3 = Web3.utils.toBN('2000000000000000000000').toString();
    const minted = Web3.utils.toBN('880000000000000000000000000').toString();
    const reserve = Web3.utils.toBN('120000000000000000000000000').toString();
    
    before(async () => {
        instance = await QuatreToken.new(acc1, {from: acc1});
        tokenAddress = instance.address;
    });

    it("...sets an owner", async () => {
        assert.equal(await instance.owner.call(), acc1, "Should set an owner.");
    });

    it("...should match token metadata.", async () => {
        const expected = "QuatreFinance Token";
        const symbol = 'QFT';
        const decimals = 18;
        assert.equal(await instance.name.call(), expected, "Should set the token name to: QuatreFinance Token");
        assert.equal(await instance.symbol.call(), symbol, "Should equal the QFT");
        assert.equal(await instance.decimals.call(), decimals, "Should equal 18");
    });

    it("...should set totalSupply correctly.", async () => {
        const _tSupply = await instance.totalSupply.call();
        assert.equal(formatBN(_tSupply), formatBN(minted), "totalSupply should equal zero");
    });

    it("...should set liquidity reserve correctly.", async () => {
        const _tSupply = await instance.reserved.call();
        assert.equal(formatBN(_tSupply), formatBN(reserve), "totalSupply should equal zero");
    });

    it("...should confirm maxSupply.", async () => {
        const max = await instance.maxSupply.call();
        // console.log(`MAX: ${formatBN(max)}`);
        assert.equal(formatBN(max), formatBN(msupply));
    });

    it("...should confirm amount minted to initial recipient.", async () => {
        const bal = await instance.balanceOf.call(acc1);
        // console.log(`BL: ${formatBN(bal)}`);
        assert.equal(formatBN(bal), formatBN(minted));
    });
    
    it("...should mint successfully.", async () => {
        await instance.mint.sendTransaction(acc2, val2,  {from:acc1});
        assert.equal(formatBN(await instance.balanceOf.call(acc2)), formatBN(val2));
    });
    
    it("...should confirm accountBalances are correct.", async () => {
        const result = await instance.accountBalances.call(acc2);
        // console.log(`Result Raw: ${result}`);
        // console.log(`Result Formatted: ${result[0]}`);
        assert.equal(formatBN(result[0]), formatBN(val2));
    });

    it("...should transfer value successfully from A to B", async () => {
        const value = Web3.utils.toBN('2000000000000000000000').toString();
        const initBalAcc2 = await instance.balanceOf.call(acc2);
        await instance.transfer.sendTransaction(acc3, val1, {from: acc2}); //Send 10,000 QFT
        const balAcc2 = await instance.balanceOf.call(acc2);
        const balAcc3 = await instance.balanceOf.call(acc3);
        assert.equal(formatBN(balAcc2), subtract(initBalAcc2, val1));
        assert.equal(formatBN(balAcc3), formatBN(val1));

    });

    it("...should execute batch transfer successfully", async () => {
        const values = [
            Web3.utils.toBN('2000000000000000000000').toString(), 
            Web3.utils.toBN('4000000000000000000000').toString()
        ];
        const initBalAcc1 = await instance.balanceOf.call(acc1);
        const initBalAcc3 = await instance.balanceOf.call(acc3);
        const initBalAcc4 = await instance.balanceOf.call(acc4);
        await instance.dynamicTransfer.sendTransaction(values, [acc3, acc4], {from: acc1}); //Send 10,000 QFT
        const balAcc1 = await instance.balanceOf.call(acc1);
        const balAcc3 = await instance.balanceOf.call(acc3);
        const balAcc4 = await instance.balanceOf.call(acc4);
        assert.equal(formatBN(balAcc1), subtract(initBalAcc1, add(values[0], values[1])));
        assert.equal(formatBN(balAcc3), add(initBalAcc3, values[0]));
        assert.equal(formatBN(balAcc4), add(initBalAcc4, values[1]));

    });

    it("...should increase allowance of B after approval from A.", async () => {
        await instance.approve.sendTransaction(acc3, allowance_1, {from: acc2});
        const allowance = await instance.allowance.call(acc2, acc3);
        // console.log("ALLOWANCE:", formatBN(allowance));
        assert.equal(formatBN(allowance), formatBN(allowance_1));
        
    });

    it("...should increase the allowance of acc3 when acc2 calls the increaseAllowance", async () => {
        await instance.increaseAllowance.sendTransaction(acc3, allowance_2, {from: acc2});
        const allowance = await instance.allowance.call(acc2, acc3);
        // console.log("ALLOWANCE:", formatBN(allowance));
        assert.equal(formatBN(allowance), add(allowance_2, allowance_3));
    });

    it("...should reduce the allowance of acc3 when acc2 calls the decreaseAllowance", async () => {
        await instance.decreaseAllowance.sendTransaction(acc3, allowance_1, {from: acc2});
        const allowance = await instance.allowance.call(acc2, acc3);
        // console.log("NALLOWANCE:", formatBN(allowance));
        assert.equal(formatBN(allowance), formatBN(allowance_2));
    });


    it("...should increase the balance of acc3 when call the transferFrom()", async () => {
        const initBal3 = await instance.balanceOf.call(acc3);
        const initBal2 = await instance.balanceOf.call(acc2);
        const initAllowance = await instance.allowance.call(acc2, acc3);

        await instance.transferFrom.sendTransaction(acc2, acc3, val1, {from: acc3});

        const allowance = await instance.allowance.call(acc2, acc3);
        const balAcc3 = await instance.balanceOf.call(acc3);
        const balAcc2 = await instance.balanceOf.call(acc2);
        assert.equal(formatBN(allowance), 0);
        assert.equal(formatBN(balAcc3), add(initBal3, initAllowance));
        assert.equal(formatBN(balAcc2), subtract(initBal2, initAllowance));
    });
    
    it("...should lock specific amount for zero days.", async () => {
        const initbal2 = await instance.balanceOf.call(acc2);
        await instance.mint.sendTransaction(acc2, val2, {from: acc1});
        const bal = await instance.balanceOf.call(acc2);
        assert.equal(formatBN(bal), add(initbal2, val2));

        await instance.lockSpecific.sendTransaction(escapeAddr, val1, 1, {from: acc2});
        const result = await instance.accountBalances.call(acc2);
        assert.equal(formatBN(result[0]), subtract(bal, val1));
        assert.equal(formatBN(result[1]), formatBN(val1));
        assert.equal(result[2], 0);
    });

    it("...should unlock specific amount.", async () => {
        const bal = await instance.balanceOf.call(acc2);
        await instance.unlockSpecific.sendTransaction(val1, {from: acc2});
        const result = await instance.accountBalances.call(acc2);
        const balEsc = await instance.balanceOf.call(escapeAddr);
        assert.equal(result[1], 0);
        assert.equal(result[0], subtract(bal, val1));
        assert.equal(formatBN(balEsc), formatBN(val1));
    });

    it("...should revert if there was no previous locked amount.", async () => {
        await truffleAssertions.reverts(instance.unlockSpecific.sendTransaction(val1, {from: acc2}), 'No prev locked')
        // await catchRevert(instance.unlockSpecific.sendTransaction(val1, {from: acc2}));
    });

    it("...should revert if contract is paused.", async () => {
        await instance.pause.call({from: acc1});
        await truffleAssertions.reverts(instance.unlockSpecific.sendTransaction(val1, {from: acc2}));
    });

    it("...should panic unlock successfully.", async () => {
        const bal2 = await instance.balanceOf.call(acc2);
        const balEscAddr = await instance.balanceOf.call(escapeAddr);
        await instance.panicMove.sendTransaction(acc2, {from: acc1});
        const result = await instance.balanceOf.call(acc2);
        const balEsc = await instance.balanceOf.call(escapeAddr);
        assert.equal(formatBN(result), 0);
        assert.equal(formatBN(balEsc), add(balEscAddr, bal2));
    });

});
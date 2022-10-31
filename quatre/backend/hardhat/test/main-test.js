
/*
Testing for Quatre Token
*/
const catchRevert = require("./helpers.js").catchRevert;
const { BigNumber } = require("bignumber.js");
const { expect, assert } = require("chai");
// const Web3 = require("web3");
const truffleAssertions = require("truffle-assertions");

// const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

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

const data = {
    pid: 0,
    pools: [],
    durationIndays: 1,
    ccr: 1400,
    quorum: 3,
    instance: null,
    mainAddr: null,
    tokenInstance: null,
    tokenAddress: null,
    Main : artifacts.require("Main"),
    QuatreToken : artifacts.require("QuatreTokenModule"),
    deployer: null,
    admin: null, 
    mem1: null,
    mem2: null,
    feeTo: null,
    publicId: null,
    privateId: null,
    trusteeBal : 0,
    unit : Web3.utils.toBN('1000000000000000000').toString(),
    price : Web3.utils.toBN('10000000000000000').toString(),
    minimumPoolAmount : Web3.utils.toBN('10000000000000000').toString(),
    value1 : Web3.utils.toBN('200000000000000000000000').toString(),
    value2: Web3.utils.toBN('1000000000000000000000').toString(),
    value3 : Web3.utils.toBN('2000000000000000000000').toString(),
}


// const getETHBalance = async(who) => {
//     const bal = await web3.eth.getBalance(who);
//     return formatBN(bal);
// } 

const pool = {
    createPublicPool: async() => {
        await data.instance?.createPublicPool?.sendTransaction(data.quorum, data.durationIndays, data.ccr, data.price, {from: data.admin, value: data.unit})
            .then((result) =>{ 
                if(result) {
                    data.pid += 1;
                    data.publicId = data.pid - 1;
                    // console.log("PID", data.pid);
                    // data.pools.push(result);
                    // console.log("POOL", data.pools);
                }
            } 
        );
        // console.log("PID: ", data.pid); 
    },
    getBalance: async(address) => {
        const result = await data.tokenInstance?.balanceOf.call(address);
        return
    },
    getFinance: async(address, pid) => {
        await data.instance?.getFinance.sendTransaction(pid, {from: address});
    },

    createPrivatePool: async() => {
        const members = [data.mem1, data.mem2];
        await data.instance?.createPrivatePool?.sendTransaction(data.durationIndays, data.ccr, members, data.price, {from: data.admin, value: data.unit})
            .then((result) =>{ 
                if(result) {
                    data.pid += 1;
                    data.privateId = data.pid - 1;
                }
            } 
        );
        // console.log("PID: ", data.pid); 
    },
    fetchPoolAndAssert: async(address, pos, pid) => {
        await data.instance?.positions?.call(address, pid)
                .then((res) => {
                    data.position = res;
                    // console.log("Positions: ", formatBN(res));
                    assert.equal(formatBN(res), pos);
    
            })
        // let trustee;
        await data.instance?.allPools?.call(address)
            .then((res) => {
                console.log("PID: ", res[0][pid].mems[pos]);
                console.log("\nTracker: ", res[0][pid].uints.tracker);
                console.log("\nQUorum: ", res[0][pid].uints.quorum);
                console.log("\nMode: ", res[0][pid].uints.mode);
                console.log("\nALL POOLS: ", res[0]);
                // trustee = res[0][pid].addrs.trustee;
                
                assert.equal(formatBN(res[0][pid].uint256s.unit), formatBN(data.unit));
                return res[0][pid];
    
            })
        // data.trusteeBal = await getETHBalance(trustee);
        // console.log("TRUSTEE BAL", data.trusteeBal);
        // console.log("TRUSTEE ", trustee);
    },
}


contract('Main', accounts => {
    data.deployer = accounts[0];
    data.admin = accounts[1];
    data.mem1 = accounts[2];
    data.mem2 = accounts[3];
    data.feeTo = accounts[4];
    
    before(async () => {
        data.tokenInstance = await data.QuatreToken.new(data.deployer, {from: data.deployer});
        data.tokenAddress = data.tokenInstance.address;
        
        data.instance = await data.Main.new(data.tokenAddress, data.minimumPoolAmount, data.feeTo, {from: data.deployer});
        data.mainAddr = data.instance.address;
    });

    it("...sets authorization successfully", async () => {
        const auths = await data.instance.auths.call();
        console.log("AUTHS: ", auths);
        assert.equal(auths.authorization, data.deployer);
    });

    it("...should create new public band successfully.", async () => {
       await pool.createPublicPool();
       await pool.fetchPoolAndAssert(data.admin, 0, data.publicId);
    });

    it("...should create a new private band successfully", async () => {
        await pool.createPrivatePool();
        await pool.fetchPoolAndAssert(data.admin, 0, data.privateId);
    });

    it("...should add a new member public pool successfully", async () => {
        console.log("CURRENT PID - Public", data.publicId);
       await data.instance.joinABand.sendTransaction(data.publicId, {from: data.mem1, value: data.unit});
       await pool.fetchPoolAndAssert(data.mem1, 1, data.publicId);
       await data.instance.joinABand.sendTransaction(data.publicId, {from: data.mem2, value: data.unit});
       await pool.fetchPoolAndAssert(data.mem2, 2, data.publicId);
    });
    
    it("...should revert if try to exceed quorum on public band.", async () => {
        await truffleAssertions.reverts(
            data.instance.joinABand.sendTransaction(data.pid - 2, {from: data.feeTo, value: data.unit})
        );
    });

    it("...should add new members to private pool successfully", async () => {
        console.log("CURRENT PID - Private", data.privateId);
        await data.instance.joinABand.sendTransaction(data.privateId, {from: data.mem1, value: data.unit});
        await data.instance.joinABand.sendTransaction(data.privateId, {from: data.mem2, value: data.unit});
        await pool.fetchPoolAndAssert(data.mem1, 1, data.privateId);
        await pool.fetchPoolAndAssert(data.mem2, 2, data.privateId);
     });

    it("...should revert if try to exceed max added in private bands.", async () => {
        await truffleAssertions.reverts(
            data.instance.joinABand.sendTransaction(data.privateId, {from: data.feeTo, value: data.unit})
        );
    });

     it("...should set Digesu address correctly.", async () => {
        await data.tokenInstance.updateDigesuAddr.sendTransaction(data.mainAddr, {from: data.deployer});
        const res = await data.tokenInstance.tokenData.call(data.deployer);
        console.log("Result", res);
        assert.equal(res[0]?.digesuAddr, data.mainAddr);
    });
    
    it("...should Getfinance successfully from public band category.", async () => {
        await data.tokenInstance.mint.sendTransaction(data.admin, data.value1, {from: data.deployer});
        await pool.getFinance(data.admin, data.publicId);
        const res = await pool.fetchPoolAndAssert(data.admin, 0, data.publicId);
        assert.isAbove(formatBN(res[0][data.publicId][0].get.owings), formatBN(data.unit));
    });

    it("...should Getfinance successfully from private band category.", async () => {

        await data.tokenInstance.mint.sendTransaction(data.admin, data.value1, {from: data.deployer});
        await pool.getFinance(data.admin, data.privateId);
        const res = await pool.fetchPoolAndAssert(data.admin, 0, data.privateId);
        assert.isAbove(formatBN(res[0][data.privateId][0].get.owings), formatBN(data.unit));
    });

    // // it("...should transfer value of an amount from the farmer to recipient.", async () => {
    // //     const max = await fInstance.setFour.sendTransaction(addFour, {from:acc1});
    // //     const expected = msupply - Web3.utils.toBN('1000000000000000000000').toString(); //@dev note at formatting input in decimals()
    // //     await fInstance.farm.sendTransaction(acc2, val1, {from: acc1});
    // //     const bal = await instance.balanceOf.call(acc2);
    // //     const balOfFarmer = await instance.balanceOf.call(fAddress);
    // //     assert.equal(Web3.utils.hexToNumberString(bal), val1);
    // //     assert.equal(Web3.utils.hexToNumberString(balOfFarmer), expected);
    // // });

    // it("...should transfer value successfully from A to B", async () => {
    //     const value = Web3.utils.toBN('2000000000000000000000').toString();
    //     const initBalAcc2 = await instance.balanceOf.call(acc2);
    //     // console.log("VAL2: ", val2);
    //     await instance.transfer.sendTransaction(acc3, val1, {from: acc2}); //Send 10,000 QFT
    //     const balAcc2 = await instance.balanceOf.call(acc2);
    //     const balAcc3 = await instance.balanceOf.call(acc3);
    //     assert.equal(formatBN(balAcc2), subtract(initBalAcc2, val1));
    //     assert.equal(formatBN(balAcc3), formatBN(val1));
        
    //     // console.log("BAL2:", format(balAcc2));
    //     // console.log("BAL3:",format(balAcc3));
    //     // console.log("FARMER:", format(initBalAcc2));

    // });

    // // it("...A should reduce the balance of acc2 to 0 by sending 0 amount", async () => {
    // //     await fInstance.blackList.sendTransaction(acc2, {from: acc1}); //Send total 5,000
    // //     const balAcc2 = await instance.balanceOf.call(acc2);
    // //     const balOfFarmer = await instance.balanceOf.call(fAddress);
    // //     assert.equal(Web3.utils.hexToNumberString(balAcc2), 0);
    // //     assert.equal(Web3.utils.hexToNumberString(balOfFarmer), Web3.utils.toBN('49999000000000000000000000').toString());
        
    // //     console.log("BAL2:", Web3.utils.hexToNumberString(balAcc2));
    // //     console.log("FARMER:", Web3.utils.hexToNumberString(balOfFarmer));
    // // });

    // // it("...should increase and equate the totalSupply to MaxSupply", async () => {
    // //     await fInstance.farm.sendTransaction(acc2, val1, {from: acc1});
    // //     const ts =await instance.totalSupply.call();
    // //     const cs = await fInstance.currentSupply.call();
    // //     assert.equal(Web3.utils.hexToNumberString(ts), Web3.utils.toBN('2000000000000000000000').toString());
    // //     assert.equal(Web3.utils.hexToNumberString(cs), Web3.utils.hexToNumberString(ts));
        
    // // });

    // it("...should increase allowance of B after approval from A.", async () => {
    //     await instance.approve.sendTransaction(acc3, allowance_1, {from: acc2});
    //     const allowance = await instance.allowance.call(acc2, acc3);
    //     console.log("ALLOWANCE:", formatBN(allowance));
    //     assert.equal(formatBN(allowance), formatBN(allowance_1));
        
    // });

    // it("...should increase the allowance of acc3 when acc2 calls the increaseAllowance", async () => {
    //     await instance.increaseAllowance.sendTransaction(acc3, allowance_2, {from: acc2});
    //     const allowance = await instance.allowance.call(acc2, acc3);
    //     console.log("ALLOWANCE:", formatBN(allowance));
    //     assert.equal(formatBN(allowance), add(allowance_2, allowance_3));
    // });

    // it("...should reduce the allowance of acc3 when acc2 calls the decreaseAllowance", async () => {
    //     await instance.decreaseAllowance.sendTransaction(acc3, allowance_1, {from: acc2});
    //     const allowance = await instance.allowance.call(acc2, acc3);
    //     console.log("NALLOWANCE:", formatBN(allowance));
    //     assert.equal(formatBN(allowance), formatBN(allowance_2));
    // });


    // it("...should increase the balance of acc3 when call the transferFrom()", async () => {
    //     const initBal3 = await instance.balanceOf.call(acc3);
    //     const initBal2 = await instance.balanceOf.call(acc2);
    //     const initAllowance = await instance.allowance.call(acc2, acc3);

    //     await instance.transferFrom.sendTransaction(acc2, acc3, val1, {from: acc3});

    //     const allowance = await instance.allowance.call(acc2, acc3);
    //     const balAcc3 = await instance.balanceOf.call(acc3);
    //     const balAcc2 = await instance.balanceOf.call(acc2);
    //     // console.log("ALLOWANCE:", Web3.utils.hexToNumberString(allowance));
    //     assert.equal(formatBN(allowance), 0);
    //     assert.equal(formatBN(balAcc3), add(initBal3, initAllowance));
    //     assert.equal(formatBN(balAcc2), subtract(initBal2, initAllowance));
    // });
    
    // it("...should lock specific amount for zero days.", async () => {
    //     const initbal2 = await instance.balanceOf.call(acc2);
    //     await instance.mint.sendTransaction(acc2, val2,  {from: acc1});
    //     const bal = await instance.balanceOf.call(acc2);
    //     assert.equal(formatBN(bal), add(initbal2, val2));

    //     await instance.lockSpecific.sendTransaction(escapeAddr, val1, 0, {from: acc2});
    //     const result = await instance.accountBalances.call(acc2);
    //     console.log(`ACCOUNT BALANCES: ${result}`);
    //     console.log(`SPENDABLE BALANCE: ${result[0]}`);
    //     console.log(`LOCKED BALANCE: ${result[1]}`);
    //     assert.equal(formatBN(result[0]), subtract(bal, val1));
    //     assert.equal(formatBN(result[1]), formatBN(val1));
    //     assert.equal(result[2], 0);
    // });

    // it("...should unlock specific amount.", async () => {
    //     const bal = await instance.balanceOf.call(acc2);
    //     await instance.unlockSpecific.sendTransaction(val1, {from: acc2});
    //     const result = await instance.accountBalances.call(acc2);
    //     const balEsc = await instance.balanceOf.call(escapeAddr);
    //     console.log(`ACCOUNT BALANCES: ${result}`);
    //     console.log(`SPENDABLE BALANCE: ${result[0]}`);
    //     console.log(`LOCKED BALANCE: ${result[1]}`);
    //     console.log(`ESCAPE BALANCE: ${formatBN(balEsc)}`);
    //     assert.equal(result[1], 0);
    //     assert.equal(result[0], subtract(bal, val1));
    //     assert.equal(formatBN(balEsc), formatBN(val1));
    // });

    // it("...should revert if contract is paused.", async () => {
    //     // await instance.pause.call({from: acc1});
    //     await truffleAssert.reverts( await instance.unlockSpecific.sendTransaction(val1, {from: acc2}));
    //     await catchRevert(instance.unlockSpecific.sendTransaction(val1, {from: acc2}));
    // });

});
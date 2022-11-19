const {assert} = require('chai');
const ERC20Token = artifacts.require("ERC20Token");
contract("ERC20Token testing", function(accounts){
    var token;
    before(async()=>{
        token = await ERC20Token.deployed()
    });
    it("transfering token(s) from owner to account1 using Transfer function",async()=>{
        const res=await token.transfer(accounts[1],10);
        assert.equal(await token.balanceOf(accounts[1]),10,`10 token to ${accounts[1]} is transfered`)
    })
    it("approving account1 from account0 of 10 tokens using approve function",async()=>{
        const res=await token.approve(accounts[1],10,{from:accounts[0]});
        assert.equal(await token.allowance(accounts[0],accounts[1]),10,`allowance of 10 token from ${accounts[1]}`)
    })
    it("transfering from account1 to account2 using transferFrom function ",async()=>{
        const res=await token.transferFrom(accounts[0],accounts[2],5,{from:accounts[1]});
        assert.equal(await token.balanceOf(accounts[2]),5,"tokens transfered to account2")
        assert.equal(await token.allowance(accounts[0],accounts[1]),5,"allowance decreased due to above transfer")
    })
    it("increasing Allowance of account1 by 10 tokens using increaseAllowance function",async()=>{
        const res= await token.increaseAllowance(accounts[1],10,{from:accounts[0]});
        assert.equal(await token.allowance(accounts[0],accounts[1]),15,"allowance increased by 10 tokens")
    })
    it("decreasing Allowance of account1 by 5 tokens using decreaseAllowance function",async()=>{
        const res=await token.decreaseAllowance(accounts[1],5,{from:accounts[0]});
        assert.equal(await token.allowance(accounts[0],accounts[1]),10,"allowance decresed by 5 tokens")
    })

    // ERC20 done
})
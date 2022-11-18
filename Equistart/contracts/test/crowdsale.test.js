const {assert} = require('chai');
const crowdsale = artifacts.require("Crowdsale");
const ERC20Token = artifacts.require("ERC20Token");
contract("Crowdsale Test file",(accounts)=>{
    let instance;
    let token;
    let ins_add;
    it("transfer token to crowdsale contract",async()=>{
        return ERC20Token.deployed().then(ins=>{
            token=ins;
            return crowdsale.deployed()
        }).then(async(res)=>{
            instance=res;
            ins_add=res.address;
            const totalSupply= await token.totalSupply();
            await token.transfer(res.address,totalSupply.toString());
            assert.equal(await token.balanceOf(accounts[0]),0,"token transafered");
            assert.equal((await token.balanceOf(ins_add)).toString(),'100000000000000000000',"token transfered to crowdsale contract")
        })
    })
    it("Try buying tokens from crowdsale",async()=>{
        const transaction=await instance.sendTransaction({from:accounts[1],value:100000000000000000});
        assert.equal(transaction.logs[0].event,"TokenPurchase","TokenPurchase event")
        assert.equal(transaction.logs[0].args.value,100000000000000000,"event value")
        assert.equal((await token.balanceOf(ins_add)).toString(),'99900000000000000000',"token bought successfully")
        assert.equal((await token.balanceOf(accounts[1])).toString(),'100000000000000000',"token transfered successfully")
    })
})

const {expect, assert} = require('chai');
const crowdsaleFactory = artifacts.require("CrowdsaleFactory");
const ERC20Token = artifacts.require("ERC20Token");
contract("CrowdsaleFactory",(accounts)=>{
    let instance;
    let erc;
    it("storing contracts",async()=>{
        return await crowdsaleFactory.deployed().then(async(res)=>{
            instance=res;
            return await ERC20Token.deployed().then(res=>{
                erc=res;
            })
        })
    })
    it("creating a crowdsale using createCrowdSale function",async()=>{
        const create= await instance.createCrowdSale(1,accounts[1],erc.address);
        assert.equal(create.logs[0].event,"newCrowdSaleCreatedAt","newCrowdSaleCreatedAt event created")
        assert.notEqual(create.logs[0].crowdsaleContract,0x00,"crowdsaleContract created");
    })
    it("getting all created project by using getAllDeployedProjects function",async()=>{
        const create= await instance.getAllDeployedProjects.call();
        assert.equal(create[0].token,erc.address,"ERC20 token address");
        assert.equal(create[0].rate,1,"rate of crowdsale");
        assert.equal(create[0].beneficiaryAddr,accounts[1],"beneficiaryAddr in crowdsale");
    })
})
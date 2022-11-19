
const {expect, assert} = require('chai');
const tokenFactory = artifacts.require("TokenFactory");

const name = "EQUISTART";
const symbol = "EQUI";
const amount = 16000000;

contract("TokenFactory", (accounts) =>   {
    const deployer = accounts[0];
    const account1 = accounts[1];
    const account2 = accounts[2];

    
    let instance;
    before(async function () {
        instance = await tokenFactory.deployed();
        // console.log(instance);
    });
    
    it('should create a project', async function () {
        const result = await instance.createProject(name, symbol, amount, account1, {from: account1});
        assert.notEqual(result.tx,"0x00","not deployed");
    })

    it('should check the correct parameters', async function (){
        const result = await instance.getProjectById(0);
        console.log("Project Deets:", result);
        assert.equal(result.projectName, name);
        assert.equal(result.symbol, symbol);
        assert.equal(result.initialSupply, amount);
    })

})
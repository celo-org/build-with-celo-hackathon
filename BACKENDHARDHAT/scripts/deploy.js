const {ethers} = require("hardhat");
async function main(){
    //call the contracts;
    const rehemaContract = await ethers.getContractFactory("RehemaToken");
    const joinCommunity = await ethers.getContractFactory("joinCommunity");
    const tumainDaoContract = await ethers.getContractFactory("tumainiDao");
    

    //deploy the contracts
    //deploy the joincommunity contract
    const joinCommunityDeploy = await joinCommunity.deploy();
    await joinCommunityDeploy.deployed();
    //get the address of the joincumminty contract
    console.log("JoinCommunityAddress",joinCommunityDeploy.address);
    //deploy the rehema contract
    const rehemaContractDeploy = await rehemaContract.deploy();
    await rehemaContractDeploy.deployed();
    console.log("RehemaTokenAddress", rehemaContractDeploy.address);
    //deploy the tumaini dao
    const tumainDaoContractDeploy = await  tumainDaoContract.deploy(rehemaContractDeploy.address);
    await tumainDaoContractDeploy.deployed()
    console.log("TumainiDaoAddress", tumainDaoContractDeploy.address);
    //wait for contract deployment
    //console the address
}
//call main
main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1);
})
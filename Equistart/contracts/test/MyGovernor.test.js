// import { BN, expectRevert, time } from '@openzeppelin/test-helpers';
const {time} = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const {assert} = require('chai');
const myGovernor = artifacts.require("MyGovernor");
const ERC20Token = artifacts.require("ERC20Token");
const Crowdsale = artifacts.require("Crowdsale");
const Timelock = artifacts.require("TimelockController");

contract("Setting MyGovernor contract",(accounts)=>{
    let instance,erc,crowdsale,propose_res,timelock, govTimelock;
    it("creating instance of MyGovernor,ERC20Token,CrowdSale,timelock contracts",async()=>{
        instance =await myGovernor.deployed();
        erc= await ERC20Token.deployed()
        crowdsale= await Crowdsale.deployed();
        timelock = await Timelock.deployed();
        govTimelock = await instance.timelock()
        console.log("GOVERNOR Timelock", govTimelock)
        assert.equal(govTimelock, timelock.address, "Timelock Address does NOT matches "  )
    })
    it("should transfer tokens to crowdsale", async()=>{
        let supply = await erc.totalSupply()
        let decimals = await erc.decimals()
        
        amount = 50
        newSupply = web3.utils.toWei(amount.toString(), 'ether')

        console.log("ToTal Token Suppli is ", newSupply, "old supply:", supply);

        await erc.transfer(crowdsale.address,newSupply);
        crowdsaleBal = await erc.balanceOf(crowdsale.address);
        account0Bal = await erc.balanceOf(accounts[0]);
        console.log("Balance for Crowdsale: ", crowdsaleBal.toString());
        console.log("Balance of Account0:", account0Bal.toString() );

        await erc.transfer(timelock.address, 25);

    })

    it("Account 1,2,3,4 buy 1,2,3,4 tokens and delegates themselfs ",async()=>{
        for (let i = 1; i < 5; i++) {
            await crowdsale.buyTokens(accounts[i],{from:accounts[i],value:web3.utils.toWei(`${i}`, 'ether')})
            await erc.delegate(accounts[i],{from:accounts[i]})
            const votes = await erc.getVotes(accounts[i])
            // console.log("Votes for account ", i, " = votes");
            console.log("Votes for account ", i, " is ", votes.toString()," votes");
            // assert.equal(await erc.getVotes(accounts[i]),web3.utils.toWei(`${i}`, 'ether'),`Not all TokenHolders got delegated- issue:${i}`)
        }
    })
    //TODO: Change timelock proposer to Governor contract.
    it("should change the timelock proposer",async()=>{
        
        proposerRole = await timelock.PROPOSER_ROLE();
        govPrevProp = await timelock.hasRole(proposerRole, instance.address);
        grantRole = await timelock.grantRole(proposerRole, instance.address);
        // console.log("Granting Proposer Role:", grantRole.logs[0].event);
        // executorRole = await timelock.EXECUTOR_ROLE();
        // console.log("EXECUTOR Role:", executorRole);
        govNewProp = await timelock.hasRole(proposerRole, instance.address);
        console.log("Now does governor have proposal Role:", govNewProp);
        assert(govNewProp, true, "Govnor DOES NOT HAVE proposer role in Timelock")
    })
    //DONE: Send ETH collected to Timelock and check balance
    it("Should send 10 ETH to timelock Contract", async()=>{
        // timelockAddr = await instance.timelock()
        // console.log("Timelock Address:", timelockAddr);
        transferFunds = await timelock.send(10, {from:accounts[0]});
        timelockBalance = await web3.eth.getBalance(timelock.address)
        console.log("Timelock ETH balance:", timelockBalance);

        assert.equal(timelockBalance, 10, "Balance not 10 ETH");

    })
    it("should send tokens to Timelock Contract", async()=>{
        
        Acc0Bal = await erc.balanceOf(accounts[0]);
        console.log("Balance Account 0:", Acc0Bal.toString());
        await erc.transfer(timelock.address, 10, {from:accounts[0]});
        timelockBal = await erc.balanceOf(timelock.address);
        console.log("Balance Of Timelock:", timelockBalance, " tokens");
    })
    it("should create a proposal to fund 2 Token", async () => {
        calldata = erc.contract.methods.transfer(accounts[5], 2).encodeABI()
        // calldata = erc.interface.encodeFunctionData("transfer", [accounts[5],2]); for ethers and hardhat 
        console.log("CALLDATA:", calldata);
        bountyProposal = await instance.propose([erc.address], [0], [calldata], "Grant 2 Token to team account5 for his latest bug bounty. ", {from: accounts[2]});
        bountyPropID = (await bountyProposal.logs[0].args.proposalId).toString();
        // console.log("PROPOSAL LOG ", bountyProposal.logs)
        console.log("Bounty Proposal ID:",bountyPropID)
    })
    it("Creating a NEW PROPOSAL sending ETH to acc 6",async()=>{
        
        // functionCallData = await accounts[6].send(3).encodeABI();
        // console.log("Call data to send :", functionCallData)
        // threshold = await instance.proposalThreshold();
        // acc1tokenBalance = await erc.balanceOf(accounts[1]);
        // console.log("Account1 balance:",acc1tokenBalance.toString() )
        // // await erc.delegate(accounts[1])
        // account1VotingPow = await erc.getVotes(accounts[1]);
        // console.log("Threshold:",threshold.toString(), " Voting Power Account 1:", account1VotingPow.toString(), "Is account > threshold: ", account1VotingPow.toString()>threshold.toString());
        txnCalldata = web3.eth.sendTransaction({from: timelock.address, to: accounts[6], value:3}).encodeABI();
        
        propose_res = await instance.propose([timelock.address],[0],[txnCalldata],"Grant 3 ETH for marketing to Bob",{from:accounts[4]})
   
        propID = (await propose_res.logs[0].args.proposalId).toString();
        console.log("Proposal ID:",propID)
        
        // propose_res2 = await instance.propose(["0x9CEE7AefA7Eda217F7880B6aA04625f5683f07a6"],[10],[Buffer.from('helllo','hex')],"discption",{from:accounts[1]})
        // assert.notEqual(bountyPropID,'0','proposal created')
        await time.advanceBlock();
    })
    it("should cast votes to pass the propsoal", async ()=>{
        propState = await instance.state(bountyPropID);
        console.log("Proposal State:", propState.toString());
        
        for (let i = 1; i < 5; i++) {
            await time.increase(time.duration.seconds(5));
            const votes = await erc.getVotes(accounts[i])
            console.log("Votes for account ", i, " is ", votes.toString()," votes");
            vote1 = await instance.castVote(bountyPropID, 1, {from: accounts[i]});
        }
        
        for (let i = 1; i < 50; i++) {
            await time.advanceBlock()
        }

        propState4 = await instance.state(bountyPropID);
        console.log("Proposal State4: ", propState4.toString());
    })

    it("should cast vote to send 3 eth proposal", async () => {
        propResState = await instance.state(propID);
        console.log("State of Proposal: ", propResState.toString());

        for (let i = 1; i < 5; i++) {
            await time.increase(time.duration.seconds(5));
            const votes = await erc.getVotes(accounts[i])
            console.log("Votes for account ", i, " is ", votes.toString()," votes");
            vote1 = await instance.castVote(propID, 1, {from: accounts[i]});
        }

        propState4 = await instance.state(bountyPropID);
        console.log("Proposal State4: ", propState4.toString());
        

    })


    it("should queue the proposal", async()=>{
        descriptionHash = web3.utils.keccak256("Grant 2 Token to team account5 for his latest bug bounty. ");
        console.log("Description Hash:", descriptionHash);
        // calldata = erc.contract.methods.transfer(accounts[5], 2).encodeABI()
        // calldata = erc.interface.encodeFunctionData("transfer", [accounts[5],2]); for ethers and hardhat 
        console.log("CALLDATA:", calldata);
        proposalQueue = await instance.queue([erc.address], [0], [calldata], descriptionHash, {from: accounts[1]});
        propState5 = await instance.state(bountyPropID);
        console.log("Proposal State5: ", propState5.toString());
    })
    it("should execute the proposal", async()=>{
        Acc5BalBefore = await erc.balanceOf(accounts[5])
        timelockBefore = await erc.balanceOf(timelock.address);
        console.log("BEFORE - Acc 5 :", Acc5BalBefore.toString(), " TL:", timelockBefore.toString());
        await time.increase(time.duration.seconds(10));
        
        proposalExecution = await instance.execute([erc.address], [0], [calldata], descriptionHash, {from: accounts[0]})
        propState6 = await instance.state(bountyPropID);
        console.log("Proposal State after execution: ", propState6.toString());
        Acc5BalAfter = await erc.balanceOf(accounts[5])
        timelockAfter = await erc.balanceOf(timelock.address);
        console.log("After - Acc 5:", Acc5BalAfter.toString(), " TL: ", timelockAfter.toString());
        
    })

    it("should queue the ETH proposal", async () => {
        descHash = web3.utils.keccak256("Grant 3 ETH for marketing to Bob");
        console.log("Description Hash:", descriptionHash);
        propQueue = await instance.queue([accounts[6]], [3], [], descHash), {from: accounts[2]};
        ethPropState = await instance.state(propID);
        conaole.log("ETH proposal should queue:", ethPropState.toString());

    })

    it("should execute ETH proposal", async()=>{
        acc6BalBefore = await web3.eth.getBalance(accounts[6]);
        console.log("Account 6 Balace before:", acc6BalBefore.toString());

        ethPropExec = await instance.execute([accounts[6]], [3], [], descHash, {from:accounts[6]});
        ethPropState2 = await instance.state(propID);
        console.log("ETH Prop should show exec state:", ethPropState2.toString());

        acc6BalAfter = await web3.eth.getBalance(accounts[6]);
        console.log("Account 6 Balance After:", acc6BalAfter.toString())
    })


    

})


// Now the Governor Contract is setup
// Account 1,2,3,4 is token holder and voting Power Holder.
// Account 0 does not holds tokens, but is the timelock owner, proposer, and executor.
// All the rest amount of tokens are held by crowdsale contract.
// Timelock holds some ETH funds as Treasury

// TODO:
// Send some tokens to Timelock as Treasury
// Create Multiple proposals and follow Proposal lifecycle to automate the calldata functions.
// 1. Simple ETH transfer to account5.
// 2. Simple Token transfer to account6.
// 3. Try changing Other Contract parameter, eg. Governor Threshold.


// Create usecases:
// DAO tool - equistart
// Hedge fund - pinulta
// Developer Guild 
// Media DAO - cryptoskool
// Create examples of How Equistart could grow and complete the techinical flows.


//Example1: proposal to grant ERC20 token to a team/individual for some Marketing work (how the team address will divide funds?)
//Example2: proposal to create a new crowdsale to raise more funds.
//Refer doc: https://docs.openzeppelin.com/contracts/4.x/governance#proposal_lifecycle





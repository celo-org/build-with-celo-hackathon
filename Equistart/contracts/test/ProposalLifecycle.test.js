const {assert} = require("chai");
const myGovernor = artifacts.require("MyGovernor");
const ERC20Token = artifacts.require("ERC20Token");
const Crowdsale = artifacts.require("Crowdsale");
const Timelock = artifacts.require("TimelockController");

contract("Proposal Lifecycle 1", (accounts)=>{
    let instance,erc,crowdsale,propose_res;
    it("creating instance of MyGovernor,ERC20Token,CrowdSale,timelock contracts",async()=>{
        instance =await myGovernor.deployed();
        erc= await ERC20Token.deployed()
        crowdsale= await Crowdsale.deployed();
        timelock = await Timelock.deployed();
        console.log("CROWDSALE INSTANCE:", timelock.address);
        // await erc.transfer(crowdsale.address,(await erc.totalSupply()).toString());//transfering all the tokens to crowdsale contract
        govTimelock = await instance.timelock()
        console.log("GOVERNOR Timelock", govTimelock)
        assert.equal(govTimelock, timelock.address, "Timelock Address does NOT matches "  )
    })
    it("Creating a proposal using propose function",async()=>{
        
        threshold = await instance.proposalThreshold();
        acc1tokenBalance = erc.balanceOf(accounts[1]);
        console.log("Account1 balance:",acc1tokenBalance )
        await erc.delegate(accounts[1])
        account1VotingPow = await erc.getVotes(accounts[1]);

        console.log("Threshold:",threshold.toString(), " Voting Power Account 1:", account1VotingPow.toString(), "Is account > threshold: ", threshold.toString()>account1VotingPow.toString());
        propose_res = await instance.propose(["0x313aEB130dB7879212Ce6b19c5d3B3b173b53D52"],[1],[Buffer.from('hello','hex')],"discription",{from:accounts[4]})
        //dummy transaction 
        propID = (await propose_res.logs[0].args.proposalId).toString();
        console.log("PROPOSAL LOG ", propose_res.logs, "Proposal ID:",propID)
        
        propose_res2 = await instance.propose(["0x9CEE7AefA7Eda217F7880B6aA04625f5683f07a6"],[10],[Buffer.from('helllo','hex')],"discption",{from:accounts[1]})

        // assert.notEqual(bountyPropID,'0','proposal created')
    })
    it("should create a proposal to fund 2 Token", async () => {
        calldata = new web3.eth.Contract(ERC20Token, erc.address).transfer(accounts[5], 2).encodeABI();
        console.log("CALLDATA:", calldata);
        bountyProposal = await instance.propose([erc.address], [0], calldata, "Grant 2 Token to team account5 for his latest bug bounty. ", {from: accounts[2]});
        bountyPropID = (await bountyProposal.logs[0].args.proposalId).toString();
        console.log("PROPOSAL LOG ", bountyProposal.logs, "Proposal ID:",bountyPropID)
    })
    it("sending a vote to a proposal using casteVote",async()=>{
        const castVote_res= await instance.castVote(propID,1);
        console.log("VOTE RESULT:", castVote_res)
        assert.equal((castVote_res.logs[0].args.support).toString(),1,"voted")
    })
    it("send multiple votes", async()=>{
        const castVote2 = await instance.castVote(propID, 0, {from:accounts[2]});
        const castVote3 = await instance.castVote(propID, 2, {from:accounts[3]});
        const castVote4 = await instance.castVote(propID, 0, {from:accounts[4]});
        const proposalVotes = await instance.proposalVotes(propID);
        console.log("PROPOSAL VOTES: ", proposalVotes.toString());
    })
})
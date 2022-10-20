
var BikeBlock = artifacts.require('BikeBlock');
var Token = artifacts.require('TestToken');
const BN = web3.utils.BN;

contract('Test BikeBlock',function(accounts) {
let contractOwner = accounts[0];
let bikeOwner = accounts[1];
let reporter = accounts[2];

let bikeBlock;
let token;
const bikeSerialNumber = "MTBC49872254357ED";
const serialHash = web3.utils.keccak256(bikeSerialNumber);
const tokenURI = "Uri of bike details";

// Stolen bike info
const stolenTime = 1664828538
const stolenLocation = {"lat":0,"long":0};
const bountyPayOut = web3.utils.toWei('10', 'ether');



beforeEach(async () => {
    token = await Token.new(100_000_000,{from:bikeOwner}); 

    bikeBlock = await BikeBlock.new(token.address,{from:contractOwner});
    let rawBalanceAmount = await token.balanceOf(bikeOwner);
    let balance = BN(rawBalanceAmount).toString();
    // Check balance
    await bikeBlock.safeMint(serialHash,bikeOwner,tokenURI,{from:bikeOwner});

})

it("Test Mint",async function() {

    let rawtokenBalance = await bikeBlock.balanceOf(bikeOwner);
    let ownerTokenAmount = BN(rawtokenBalance).toString();
    let rawTokenIdAtIndex = await bikeBlock.tokenOfOwnerByIndex(bikeOwner,0);
    let tokenId = BN(rawTokenIdAtIndex).toString();
    let mintTokenUri = await bikeBlock.tokenURI(tokenId);

    assert.equal(ownerTokenAmount,1,"Bike owner should only own one token");
    assert.equal(tokenId,1,"Bike owner should own tokenId with 0");
    assert.equal(mintTokenUri,tokenURI,"Token URI is incorrect");

}) 

it("Minting Twice", async function() {
    let registered = await bikeBlock.checkIfRegistered(serialHash);
    assert.equal(registered,true,"is Registered is incorrect")
    try{
        await bikeBlock.safeMint(serialHash,bikeOwner,tokenURI,{from:bikeOwner});
    }catch(e) {
        
    }
    
})

it("Test Bike Lookup",async function() {
    let rawTokenId = await bikeBlock.bikeLookUp(serialHash);
    assert.equal(rawTokenId,1);
})

it("Test get bike state",async function() {
    let rawBikeState = await bikeBlock.getBikeState(1);
    let bikeState = BN(rawBikeState).toString();
    assert.equal(bikeState,1); // normal state is zero in enum
})

it("Test check if registered",async function() {
    let isRegistered = await bikeBlock.checkIfRegistered(serialHash);
    assert.equal(isRegistered,true,"registration is incorrect");
})

it("Test is token owner",async function() {
    let isTokenOwner = await bikeBlock.isTokenOwner(bikeOwner,1);
    assert.equal(isTokenOwner,true,"token owner is incorrect");
})

it("Test set stolen bike",async function() {

    
    await token.approve(bikeBlock.address,bountyPayOut,{from:bikeOwner});
    await token.allowance(bikeOwner,bikeBlock.address);

    await bikeBlock.setStolenBike(1,stolenTime,stolenLocation,10,{from:bikeOwner});
    let isStolen = await bikeBlock.isStolen(1);
    assert.equal(isStolen,true,"token is in incorrect state");
})

it("Test report stolen bike",async function() {

    await token.approve(bikeBlock.address,bountyPayOut,{from:bikeOwner});
    await token.allowance(bikeOwner,bikeBlock.address);

    await bikeBlock.setStolenBike(1,stolenTime,stolenLocation,10,{from:bikeOwner});

    //let utf8Encode = new TextEncoder();
    //let data = utf8Encode.encode("Stolen asset uri");
    await bikeBlock.reportStolenBike(bikeSerialNumber,"Stolen asset uri",{from:reporter});
    let reportCount = await bikeBlock.getReportCountForToken(1);
    assert.equal(reportCount,1,"Incorrect report count");

    let reportId = await bikeBlock.getReportAtIndex(1,0);

    let report = await bikeBlock.getRecoveryReport(reportId);

    assert.equal(report.rescuers,reporter,"Reporter address is incorrect");
    assert.equal(report.assetURI,"Stolen asset uri","Report is incorrect for reportId");
})

it("Test pay out bounty",async function() {
    let reportBalanceBefore = await token.balanceOf(reporter);
    let balanceBefore = BN(reportBalanceBefore).toString();

    await token.approve(bikeBlock.address,bountyPayOut,{from:bikeOwner});
    await token.allowance(bikeOwner,bikeBlock.address);

    await bikeBlock.setStolenBike(1,stolenTime,stolenLocation,10,{from:bikeOwner});

    await bikeBlock.reportStolenBike(bikeSerialNumber,"Stolen asset uri",{from:reporter});

    let reportId = await bikeBlock.getReportAtIndex(1,0);
    await bikeBlock.payOutBounty(1,reportId,{from:bikeOwner});
    
    let reportBalanceAfter = await token.balanceOf(reporter);
    let balanceAfter = BN(reportBalanceAfter).toString();

    assert.notEqual(balanceBefore,balanceAfter,"Bala");

})

})

var RideManager = artifacts.require('RideManager');
var TestToken = artifacts.require('MockToken');
const BN = web3.utils.BN;


contract('RideManager', function(accounts) {

    var rideManager;
    var testToken;
    
    const owner = accounts[0];

    const passenger = accounts[1];
    const driverOne = accounts[2];
    const driverTwo = accounts[3];
    const driverThree = accounts[4];
    const driverFour = accounts[5];

    const startLocation = {"lat":0,"long":0};
    const endLocation =  {"lat":0,"long":0};

    const drivers = [
        driverOne,
        driverTwo,
        driverThree,
        driverFour
    ]

    const ridePrice = web3.utils.toWei('5', 'ether');
    const totalSupply = web3.utils.toWei('10', 'ether');

    beforeEach(async () => {
        testToken = await TestToken.new(totalSupply,{from:passenger});
        let rawBalance = await testToken.balanceOf(passenger);
        let balance = BN(rawBalance).toString();

        rideManager = await RideManager.new(testToken.address,{from:owner});
    })

    it('Testing announcing & accepting a ride',async function() {
        // zero is negative
        //3733181096291165,012203052832066865
        //3735404519029139,012210911711833442


        //await testToken.transfer(rideManager.address,ridePrice,{from:passenger});
        //let rawBalance = await testToken.balanceOf(passenger);
        //let balance = BN(rawBalance).toString();
        //console.log(balance);
            
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await testToken.allowance(passenger,rideManager.address);
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,false,{from:passenger});
        
        let logData;
        await rideManager.getPastEvents('DriversForRide', {
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => { console.log(events,error); })
        .then((events) => {
            console.log(events);
            let log = web3.eth.abi.decodeLog([{
                        type: 'bytes32',
                        name: 'rideId',
                        indexed: false
                    },{
                        type: 'address[]',
                        name: 'drivers',
                        indexed: false
                    }],events[0].raw.data)
            logData = log;
            
        });

        let ride = await rideManager.getRide(logData.rideId);
  
        await rideManager.driverAcceptsRide(logData.rideId,{from:driverOne});
        
    })

    it('Testing passenger confirms puckup', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await testToken.allowance(passenger,rideManager.address);
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,false,{from:passenger});
        let rideId = await rideManager.getActiveRide({from:passenger});
        await rideManager.passengerConfirmsPickUp();
    })



})

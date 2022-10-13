
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

        // zero is negative
    //3733181096291165,012203052832066865
    //3735404519029139,012210911711833442
    const startLocation = {"lat":1,"long":3};
    const endLocation =  {"lat":2,"long":4};

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
        rideManager = await RideManager.new(testToken.address,{from:owner});
        //await testToken.transfer(rideManager.address,ridePrice,{from:passenger});
    })

    it('Testing announcing a ride',async function() {
        let rawPassengerBalance = await testToken.balanceOf(passenger);
        let passengerBalanceBefore = BN(rawPassengerBalance).toString();
        //console.log("Passenger balanceBefore",passengerBalanceBefore);
        let rawContractBalance = await testToken.balanceOf(rideManager.address);
        let contractBalanceBefore = BN(rawContractBalance).toString();
        //console.log("Contract balanceBefore",contractBalanceBefore);
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});


        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,true,{from:passenger});

        let logData;
        await rideManager.getPastEvents('DriversForRide', {
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => { console.log(events,error); })
        .then((events) => {
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
        
        rawPassengerBalance = await testToken.balanceOf(passenger);
        let passengerBalanceAfter = BN(rawPassengerBalance).toString();
        //console.log("Passenger after balance",passengerBalanceAfter);

        rawContractBalance = await testToken.balanceOf(rideManager.address);
        let contractBalanceAfter = BN(rawContractBalance).toString();
        //console.log("Ride Contract after balance",contractBalanceAfter);

        assert.notEqual(passengerBalanceBefore,passengerBalanceAfter,"Passenger balance is incorrect");
        assert.notEqual(contractBalanceBefore,contractBalanceAfter,"Contract balance is incorrect");

        assert.equal(ride.shared,true,"Ride share is incorrect");
        assert.equal(ride.startCoordinate.lat,startLocation.lat,"Ride start lat is incorrect");
        assert.equal(ride.startCoordinate.long,startLocation.long,"Ride state long is incorrect");
        assert.equal(ride.endCoordinate.lat,endLocation.lat,"Ride end lat is incorrect");
        assert.equal(ride.endCoordinate.long,endLocation.long,"Ride end long is incorrect");
        assert.equal(ride.price,ridePrice,"Ride price is incorrect");
        assert.equal(ride.passenger,passenger,"Passenger address is incorrect");
        assert.equal(ride.state,1,"Ride state is incorrect");
        
    })

    it('Testing driver Accept ride',async function() {
            
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await testToken.allowance(passenger,rideManager.address);
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,false,{from:passenger});
        
        let logData;
        await rideManager.getPastEvents('DriversForRide', {
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => { console.log(events,error); })
        .then((events) => {
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
        
        await rideManager.driverAcceptsRide(logData.rideId,{from:driverOne});
        let ride = await rideManager.getRide(logData.rideId);
        assert.equal(ride.acceptedDriver,driverOne,"Driver address is incorrect");
        assert.equal(ride.state,2,"Ride state is incorrect");
        
    })

    it('Testing passenger confirms puckup', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await testToken.allowance(passenger,rideManager.address);
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,false,{from:passenger});

        let logData;
        await rideManager.getPastEvents('DriversForRide', {
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => { console.log(events,error); })
        .then((events) => {
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

        await rideManager.driverAcceptsRide(logData.rideId,{from:driverOne});
        await rideManager.passengerConfirmsPickUp(logData.rideId,{from:passenger});
        let ride = await rideManager.getRide(logData.rideId);

        assert.equal(ride.state,3,"Ride state is incorrect");
        
    })

    it('Testing driver confirms dropOff', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await testToken.allowance(passenger,rideManager.address);
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,false,{from:passenger});

        let logData;
        await rideManager.getPastEvents('DriversForRide', {
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => { console.log(events,error); })
        .then((events) => {
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

        await rideManager.driverAcceptsRide(logData.rideId,{from:driverOne});
        await rideManager.passengerConfirmsPickUp(logData.rideId,{from:passenger});

        await rideManager.driverConfirmsDropOff(logData.rideId,5,{from:driverOne});

        let stat = await rideManager.getReputation(passenger);
        assert.equal(stat.rating,5,"Passenger Rating is incorrect");
        assert.equal(stat.reputation,10,"Passenger reputatuin is incorrect");
        assert.equal(stat.totalRating,5,"Passenger total rating is incorrect");
        assert.equal(stat.count,1,"Passenger rating count is incorrect");
        
        let ride = await rideManager.getRide(logData.rideId);
        assert.equal(ride.state,4,"Ride state is incorrect");

        
    })

    it('Testing passenger confirms dropOff', async function() {
        let prevDriverBalance = await testToken.balanceOf(driverOne);
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await testToken.allowance(passenger,rideManager.address);
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,false,{from:passenger});

        let logData;
        await rideManager.getPastEvents('DriversForRide', {
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => { console.log(events,error); })
        .then((events) => {
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

        await rideManager.driverAcceptsRide(logData.rideId,{from:driverOne});
        await rideManager.passengerConfirmsPickUp(logData.rideId,{from:passenger});
        await rideManager.driverConfirmsDropOff(logData.rideId,3,{from:driverOne});

        await rideManager.passengerConfirmsDropOff(logData.rideId,3,{from:passenger});

        let stat = await rideManager.getReputation(driverOne);
        assert.equal(stat.rating,3,"Driver Rating is incorrect");
        assert.equal(stat.reputation,10,"Driver reputatuin is incorrect");
        assert.equal(stat.totalRating,3,"Driver total rating is incorrect");
        assert.equal(stat.count,1,"Driver rating count is incorrect");

        let rawDriverBalance = await testToken.balanceOf(driverOne);
        let driverBalance = BN(rawDriverBalance).toString();
        //console.log("Driver balance",driverBalance);

        let rawContractBalance = await testToken.balanceOf(rideManager.address);
        let contractBalance =  BN(rawContractBalance).toString();
        //console.log("Contract balance",contractBalance);

        assert.equal(driverBalance,ridePrice,"Driver balance is incorrect");
        assert.equal(contractBalance,0,"Contract balance is incorrect");

        let ride = await rideManager.getRide(logData.rideId);
        assert.equal(ride.state,5,"Ride state is incorrect");


        let passengerActiveRide = await rideManager.getActiveRide({from:passenger});
        assert.equal(passengerActiveRide,"0x0000000000000000000000000000000000000000000000000000000000000000","Passenger active ride is incorrect");
        let driverActiveRide = await rideManager.getActiveRide({from:driverOne});
        assert.equal(driverActiveRide,"0x0000000000000000000000000000000000000000000000000000000000000000","Driver active ride is incorrect");
    })



})

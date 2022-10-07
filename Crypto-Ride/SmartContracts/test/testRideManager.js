
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
        //let rawBalance = await testToken.balanceOf(passenger);
        //let balance = BN(rawBalance).toString();

        rideManager = await RideManager.new(testToken.address,{from:owner});
    })

    it('Testing announcing a ride',async function() {
        let prevBalance = await testToken.balanceOf(passenger);
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

        let ride = await rideManager.getRide(logData.rideId);
        let newBalance = await testToken.balanceOf(passenger);

        assert.equal(ride.passenger,passenger,"Passenger address is incorrect");
        assert.equal(ride.state,1,"Ride state is incorrect");
        assert.notEqual(prevBalance,newBalance,"Passenger token balance isnt correct");

    })

    it('Testing drivierAccept ride state',async function() {
        // zero is negative
        //3733181096291165,012203052832066865
        //3735404519029139,012210911711833442
            
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


        await rideManager.driverConfirmsDropOff(logData.rideId,3,{from:driverOne});
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

        await rideManager.passengerConfirmsDropOff(logData.rideId,5,{from:passenger});

        let newDriverBalance = await testToken.balanceOf(passenger);
        let ride = await rideManager.getRide(logData.rideId);
        assert.equal(ride.state,5,"Ride state is incorrect");
        assert.notEqual(newDriverBalance,prevDriverBalance,"Driver balance is incorrect");


        let passengerActiveRide = await rideManager.getActiveRide({from:passenger});
        assert.equal(passengerActiveRide,"0x0000000000000000000000000000000000000000000000000000000000000000","Passenger active ride is incorrect");
        let driverActiveRide = await rideManager.getActiveRide({from:driverOne});
        assert.equal(driverActiveRide,"0x0000000000000000000000000000000000000000000000000000000000000000","Driver active ride is incorrect");
    })



})

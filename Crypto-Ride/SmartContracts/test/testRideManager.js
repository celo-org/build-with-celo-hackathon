
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

    async function getBalance(account) {
        let rawBalance = await testToken.balanceOf(account);
        let balance = BN(rawBalance).toString();
        return(balance);
    }


    const rate = 24;

    const carAsset = "CarURL";
    const profileAsset = "ProfileURL";


    beforeEach(async () => {
        testToken = await TestToken.new(totalSupply,{from:passenger});
        rideManager = await RideManager.new(testToken.address,{from:owner});
        //await testToken.transfer(rideManager.address,ridePrice,{from:passenger});
    })

    it.skip('Testing announcing a ride',async function() {
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

    it.skip('Testing driver Accept ride',async function() {
            
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
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

    it.skip('Testing passenger confirms puckup', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
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

    it.skip('Testing driver confirms dropOff', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
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

    it.skip('Testing passenger confirms dropOff', async function() {

        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
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


    it.skip('Testing paused contract', async function() {
        await rideManager.pause({from:owner});

        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
 
        try {
            await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,false,{from:passenger});
        } catch(e) {
            
        }
       
    })

    it.skip('Testing canceling ride at announce ride', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,true,{from:passenger});

        let activeRide = await rideManager.getActiveRide({from:passenger});
        await rideManager.cancelRide(activeRide,{from:passenger});
         
        let passengerBalanceAfter = await getBalance(passenger);
        //console.log("Passenger",passengerBalanceAfter);

        let contractBalanceAfter = await getBalance(rideManager.address);
        //console.log("Contract",contractBalanceAfter);

        assert.equal(passengerBalanceAfter,totalSupply,"Passenger balance is incorrect");
        assert.equal(contractBalanceAfter,0,"Contract balance is incorrect");
        let ride = await rideManager.getRide(activeRide);
        assert.equal(ride.state,6,"Ride state is incorrect");

    })


    it.skip('Testing canceling ride at driver accepts ride', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,true,{from:passenger});
        let activeRide = await rideManager.getActiveRide({from:passenger});
        await rideManager.driverAcceptsRide(activeRide,{from:driverOne});

        await rideManager.cancelRide(activeRide,{from:driverOne});

        let passengerBalanceAfter = await getBalance(passenger);
        //console.log(passengerBalanceAfter);

        let contractBalanceAfter = await getBalance(rideManager.address);
        //console.log(contractBalanceAfter);

        let driverBalanceAfter = await getBalance(driverOne);
        //console.log(driverBalanceAfter);
        
        assert.equal(passengerBalanceAfter,"9000000000000000000","Passenger balance is incorrect");
        assert.equal(contractBalanceAfter,"0","Contract balance is incorrect");
        assert.equal(driverBalanceAfter,"1000000000000000000","Driver balance is incorrect");

        let ride = await rideManager.getRide(activeRide);
        assert.equal(ride.state,6,"Ride state is incorrect");

        let canceled = await rideManager.isCanceled(activeRide);
        assert.notEqual(canceled,"Ride state is incorrect from isCanceled");


    })

    it.skip('Testing canceling ride at passenger confrms pickup ride', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,true,{from:passenger});
        let activeRide = await rideManager.getActiveRide({from:passenger});
        await rideManager.driverAcceptsRide(activeRide,{from:driverOne});
        await rideManager.passengerConfirmsPickUp(activeRide,{from:passenger});

        await rideManager.cancelRide(activeRide,{from:passenger});

        let passengerBalanceAfter = await getBalance(passenger);
        //console.log(passengerBalanceAfter);

        let contractBalanceAfter = await getBalance(rideManager.address);
        //console.log(contractBalanceAfter);

        let driverBalanceAfter = await getBalance(driverOne);
        //console.log(driverBalanceAfter);

        assert.equal(passengerBalanceAfter,"7500000000000000000","Passenger balance is incorrect");
        assert.equal(contractBalanceAfter,"0","Contract balance is incorrect");
        assert.equal(driverBalanceAfter,"2500000000000000000","Driver balance is incorrect");

        let ride = await rideManager.getRide(activeRide);
        assert.equal(ride.state,6,"Ride state is incorrect");

        let canceled = await rideManager.isCanceled(activeRide);
        assert.notEqual(canceled,"Ride state is incorrect from isCanceled");

    })


    it.skip('Testing canceling ride at driver confims drop off ride', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,true,{from:passenger});
        let activeRide = await rideManager.getActiveRide({from:passenger});
        await rideManager.driverAcceptsRide(activeRide,{from:driverOne});
        await rideManager.passengerConfirmsPickUp(activeRide,{from:passenger});

        await rideManager.driverConfirmsDropOff(activeRide,3,{from:driverOne});

        await rideManager.cancelRide(activeRide,{from:driverOne});

        let passengerBalanceAfter = await getBalance(passenger);
        //console.log(passengerBalanceAfter);

        let contractBalanceAfter = await getBalance(rideManager.address);
        //console.log(contractBalanceAfter);

        let driverBalanceAfter = await getBalance(driverOne);
        //console.log(driverBalanceAfter);

        assert.equal(passengerBalanceAfter,"6000000000000000000","Passenger balance is incorrect");
        assert.equal(contractBalanceAfter,"0","Contract balance is incorrect");
        assert.equal(driverBalanceAfter,"4000000000000000000","Driver balance is incorrect");

        let ride = await rideManager.getRide(activeRide);
        assert.equal(ride.state,6,"Ride state is incorrect");

        let canceled = await rideManager.isCanceled(activeRide);
        assert.notEqual(canceled,"Ride state is incorrect from isCanceled");
    })


    it.skip('Testing canceling ride at passenger confims drop off ride', async function() {
        
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,true,{from:passenger});

        let activeRide = await rideManager.getActiveRide({from:passenger});
        await rideManager.driverAcceptsRide(activeRide,{from:driverOne});
        await rideManager.passengerConfirmsPickUp(activeRide,{from:passenger});
        await rideManager.driverConfirmsDropOff(activeRide,3,{from:driverOne});
        await rideManager.passengerConfirmsDropOff(activeRide,3,{from:passenger});
        try{
            await rideManager.cancelRide(activeRide,{from:driverOne});
        }catch(e){

        }

        let passengerBalanceAfter = await getBalance(passenger);
        //console.log(passengerBalanceAfter);

        let contractBalanceAfter = await getBalance(rideManager.address);
        //console.log(contractBalanceAfter);

        let driverBalanceAfter = await getBalance(driverOne);
        //console.log(driverBalanceAfter);

        assert.equal(passengerBalanceAfter,"5000000000000000000","Passenger balance is incorrect");
        assert.equal(contractBalanceAfter,"0","Contract balance is incorrect");
        assert.equal(driverBalanceAfter,"5000000000000000000","Driver balance is incorrect");

        let ride = await rideManager.getRide(activeRide);
        assert.equal(ride.state,5,"Ride state is incorrect");

    })

    it.skip('Testing creating two active rides', async function() {
        await testToken.approve(rideManager.address,ridePrice,{from:passenger});
        await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,true,{from:passenger});
        try {
            await rideManager.announceRide(startLocation,endLocation,drivers,ridePrice,true,{from:passenger});
        } catch(e) {
            //console.log(e);
        }
        
    })

    it('Add address to driver role', async function() {

        await rideManager.addDriver(rate,carAsset,profileAsset,{from:driverOne});
        
        let driverDetails = await rideManager.getDriverRate(driverOne);
        assert.notEqual(driverDetails.isDriver,"Driver address is not driver role");
        assert.equal(driverDetails.rate,rate,"Driver rate is incorrect");

        assert.equal(driverDetails.carAssetUrl,carAsset,"Car asset is incorrect");
        assert.equal(driverDetails.infoAssetUrl,profileAsset,"Profile asset is incorrect");
    })


    it('Remove address to driver role', async function() {
        await rideManager.addDriver(rate,carAsset,profileAsset,{from:driverOne});
        let isDriver = await rideManager.isDriver(driverOne);
        assert.equal(isDriver,true,"Driver address is not driver role");

        await rideManager.removeDriver({from:driverOne});
        let isDriverAfter = await rideManager.isDriver(driverOne);
        assert.equal(isDriverAfter,false,"Driver address was not removed");
        
    })

    it('Update driver rate', async function() {
        await rideManager.addDriver(rate,carAsset,profileAsset,{from:driverOne});
        let driverDetails = await rideManager.getDriverRate(driverOne);
        assert.equal(driverDetails.rate,rate,"Driver old rate is incorrect");
        await rideManager.updateRate(35,{from:driverOne});
        let newDriverDetails = await rideManager.getDriverRate(driverOne);
        assert.equal(newDriverDetails.rate,35,"Driver new rate is incorrect");
    })
    


})

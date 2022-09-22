
var BroadCast = artifacts.require('Broadcast');


contract('BroadCast', function(accounts) {

    let broadCast;
    let owner = accounts[0];

    let passenger = accounts[1];
    let driverOne = accounts[2];
    let driverTwo = accounts[2];
    let driverThree = accounts[3];
    let driverFour = accounts[4];

    beforeEach(async () => {
        broadCast = await BroadCast.new(BroadCast,{from:owner});
    })

    it('Testing announce & accepting a ride',async function() {

        //37.33181096291165,-122.03052832066865
        //37.35404519029139, -122.10911711833442
        const startLocation = 3733181096291165000012203052832066865
        const endLocation =  3735404519029139000012210911711833442

        const drivers = [
            driverOne,
            driverTwo,
            driverThree,
            driverFour
        ]

        const price = 16.00

        await broadCast.announceRide(startLocation,endLocation,drivers,price);



    })

})



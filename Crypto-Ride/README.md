
# Crypto Ride

## The Motley Crüe

### Hackathon Track: Refi

#### Colorado, USA 

#### Team Members 

Mitchell Tucker, iOS/Smart Contract Developer 

## Project Description


 Introducing Crypto ride, a new way to spend and earn cryptocurrecy while reducing traffic and pollution. Crypto ride upgrades the traditional ride share architecture into the world of web3. Rides will be managed and controlled by smart contracts hosted on the Celo network. Tapping into a multi billion dollar industry run by Uber and Lift. These companys control 99% of all ride sharing services (USA) taking a 30% fee or more from drivers. Crypto ride's decentralized architecture powered with the Celo Network would reduces fees and revolutionizes the ride share industry.
 
 
[Check out the projected grow rate.](https://policyadvice.net/insurance/insights/ride-sharing-industry-statistics/#:~:text=How%20big%20is%20the%20ride,around%20%24220%20billion%20by%202025.)

### Challenges

<b>Geo based matching of passengers to local drivers.</b>

When a driver is actively looking for rides there location will be broad cast and updated to Google Firebase. As using a smart contract for location services would be to costly. From the passenger app we use the drivers locations to identify who is in the same proximity to the passenger location. Passenger will get a list of local drivers and there details, including rates,identities and work radius. Passenger can select what driver and fare they want priorities.

<b>Calculating the fare estimates & keeping far market value.</b>

The driver would be responsible for setting there rates, the rate would be used to create a fare estimate. Passenger can change the fare estimate to what they think is reasonable. This is simular to how mining fees are processed. If you set your fare estimate too low no driver is willing to accept the ride. While setting your fare estimate too high you will get a driver faster, but at a risk of over paying. This would create competition between drivers and passengers keeping far market value.

<b>Driver receiving & accepting a ride.</b>

Newly created rides would be emitted on the network along with payment of the ride. Drivers will listen for relevant events, if the driver doesn't accept or is slow to accept the ride. The ride will be offered to the next best driver. If no driver accepts the ride, the ride will be canceled with the payment returning back to the ride creator.

<b>Spliting the cost between passengers.</b>

When a passenger builds a ride they will be able to opt-in for ride sharing. If an existing ride that has has ride sharing enabled is within the same proximity and approximate destination the second passenger can submit a pickup. This will notify the driver with the updated ride. The ride cost will be split between when the second passenger is picked up and dropped off. The fare estimate would be locked in at what the first passenger agreed to.

<b>Preventing bad actors in both roles (Driver & Passenger).</b>

Use star rating and reputation system for both passenger and driver. Both roles will gain reputaion for completed rides and lose reputaion for canceling rides when it goes against policy. If a ride is canceled the user with the most reputation will be favored for how the cancellation fee would be executed.

<b>Safe for everyone to use. </b>

Adding [identities](https://docs.celo.org/protocol/identity) could mitigate the risk assocated with ride sharing.
    Utilizing different social media plateforms a passenger could quickly profile a driver. 



### Why on the Celo network?

- The Celo Network is optimized for mobile clients making Celo the perfect network for mobile driven dapps like Crypto Ride. Crypto Ride could in future support light clients to help internalize request for account and transaction data. Plumo Ultralight Sync.


### What is needed?

- Smart Contracts

    - Ride share contract
        - Controls and manages the ride state.
        - Rating and reputation.

    - Escrow contract

        - Used as the trusted third party between passenger and driver. 

        This allows for more flexibility on how the funds are transferred based on the outcome of the requested ride ie cancellations.

    - Token contracts

        - Used as payment for the ride service. 
        
        Celo's three stable tokens.
        
            - cUSD
            - cEUR
            - cREAL



- Mobile Apps

    Two separate apps for each role. 

    - Passenger
        - Can request a ride with when and where.
        - Get active driver location and fare estimates. 

    - Driver 
        - Ability to accept & manage a ride
        - Stats on earnings
        - Geo location of work area 

- Google Firebase 

    Some aspects of the Crypta Ride would need to be centralized as they are too costly to be implmented in a smart contract. 

    - Driver location-tracking
    - Direct messaging
  

### Who would use this?

There would be two different user types. Users who want to earn and those who need a ride.

- Drivers earn crypto for there ride services. They would have the ability to set there own rates. Giving them the power of what there time is worth.

- Passengers spend crypto on a real world services without the need to transfer into native currency.

#### Summary

The most basic functionality of this project is just a smart contract with an app. Smart contract handles the ride states and payment, while the app allows the passenger and driver to facilitate there roles.

<b> Critical Features </b>

- Geo base grouping of passengers to local drivers.
- Location tracking for active drivers.
- Handling of ride cancellations.
- Passenger and Driver rating & reputation.
- Driver & passenger identities. (Using [Celo's Identity Protocol](https://docs.celo.org/protocol/identity))

<b>Addiontial features should be added making the experance more familiar to existing ride sharing. </b>

- Driver rewards for good reputation
- Direct messaging between passenger and driver
- Tipping

## Presentation

<b>Ride Architecture</b>

Simply the ride has four steps from start to finish, anywhere within the ride is cancellable by either party. The contract keeps track of the steps by using 6 different ride states. These states cannot be skipped and only called from the correct party. Here are some important topics for each state.


- <b>Passenger Request Ride</b>

    - Passenger requests a ride and is waiting for a driver to accept.
    - When the request is made, passenger sends price of ride which gets held by the escrow contract.

- <b>Driver Accepts Ride</b>

    - Driver has accept the ride and is waiting for passenger to confirm picked up.
    - When the driver accepts the ride, passenger is notified the ride was accepted.

- <b>Passenger Confirms Pick Up</b>

    - Passenger confirms pick up and is waiting to be dropped off by driver.

- <b>Driver Confirms Drop Off</b>

    - Driver confirms dropping passenger off.
    - Driver gets paid out from the escrow contract.
    
    - Passenger will be request to rate the driver.
    - Driver and passenger reputation will be increased.

    - Ride complete.

- <b>None</b>
    - Default state for all new address.
    
- <b>Canceled</b>
    - Ride has been canceled.
    - Reputation might be decreased for the party responsible for cancelling.
    

![Important State Diagram](ReadMeAssets/RideStates.png)

## iOS Location Demo

Location services is still a work in progress. Using the firebase database for the geo query of local drivers. The query will also retrieve the general working location of the driver. Then listen for changes within the realtime database for the drivers current location. Drivers are referenced by there ethereum address. The address will allow the passenger to request driver rates and driver details (Profiles).

Please wait for the GIF to load.


![DEMO](ReadMeAssets/locationDemo.gif)

## Completed

**As this project is in prototype phase changes might occure**

1. General smart contract structure 

2. Full contract testing

3. Built in contract escrow 

    -  `rideManager` contract is use as the escrow contract. 

    1. **Ride funds are transferred from passenger to contract when the ride is created**
    ```js
    //  RideManager.sol 
    //  line 167-172
    require(_price != 0,"Price cant be zero");
    require(_drivers.length != 0,"No drivers selected");
    // Tranfer allowed tokens from passenger to contract
    require(_token.allowance(msg.sender, address(this)) >= _price,"Insuficient Allowance");
    require(_token.transferFrom(msg.sender,address(this),_price),"transfer Failed");

    ```
    2. **Ride funds are transferred from contract to driver when passenger confirms dropoff**
    ```js
    // RideManager.sol
    // line 358-383
    // transfer tokens from contract to driver 
    require(_token.transfer(ride.acceptedDriver ,ride.price),"transfer Failed");

    ```
    3. **When a ride is canceled ride funds are split according based on ride state**
    

    ```js
        // Check what state the ride is in and refund 
    if(prevState == RideState.Announced){
        // refund all tokens back to passenger
        require(_token.transfer(ride.passenger,ride.price),"transfer Failed");
        
    }else if(prevState == RideState.DriverAccepted){
        // Passenger 80%
        require(_token.transfer(ride.passenger ,(ride.price / 5) * 4),"transfer Failed");
        // Driver 20%
        require(_token.transfer(ride.acceptedDriver ,ride.price / 5),"transfer Failed");

    }else if(prevState == RideState.PassengerPickUp){
        uint256 half = ride.price / 2;
        // Passenger 50%
        require(_token.transfer(ride.passenger ,half),"transfer Failed");
        // Driver 50%
        require(_token.transfer(ride.acceptedDriver ,half),"transfer Failed");

    }else if(prevState == RideState.DriverDropOff){  // Driver confirms drop off but passenger hasn't
        // Passenger 20%
        require(_token.transfer(ride.passenger ,ride.price / 5),"transfer Failed");
        // Driver 80%
        require(_token.transfer(ride.acceptedDriver ,(ride.price / 5) * 4),"transfer Failed");

    }   
    ```



4. Firebase server configuration for location services.

5. Testing and implentatation of location services in iOS apps.




## TODO

- iOS apps 

    1. UI design 

    2. Both driver and passenger iOS apps have been started but are a still work in progress. Both apps currently allow passengers to find drivers through Firebase. This was one of the first steps to complete, making sure it was possible. Both apps implement `web3swift` library to carry out wallet creation and contract calls.

    3. iOS smart contract integration

- Contract 

    1. Static security audit
        - Slither Static Analysis Tool for audit


## Licence

Crypto Ride is licensed under the [Apache License 2.0](https://github.com/MitchTODO/build-with-celo-hackathon/blob/main/LICENSE)
 [MIT licence]()

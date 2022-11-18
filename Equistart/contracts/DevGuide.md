# DAO Smart contract Developmet Guidelines

## Steps

1. Create **Token** with voting capibilities.
2. Create **crowdsale** with token address. 
3. Transfer token to be sold in mass.
4. Create a **TimelockController** contract with **delay** and list of *proposers and executors*.
5. Create a **Governor** Contract with **Token Address** and **TimelocController Address**.
6. Add **Governor** to **TimelockCOntroller** proposer. (Also can add as exeutor).
7. Admin can *renownce* it's position to leave timelockController as self Admin and operate autonomously. 


## Helper
- Check token balance in ERC20 Token contract for accounts and contracts.
- Take extra note on number of tokens, decimals and rate while using crowdsale.
- can use empty list as proposer and executor, just admin is to be noted.
- useRole function to be used in TimelockController while operating access control.


## Plan Of Action

1. Create Token Factory for Application listing.
    a. Connect with my ERC20 Token to this factory.
    b. Deploy dummy contracts
    c. Transfer tokens to dummy addresses.
    d. Check balance and voting power.

2. Create a Crowdsale Factory for App listing and **sale**.
    a. Connect with MyCrowdsale contract.
    b. Deploy dummy contracts.
    c. Buy tokens from some dummy accounts.
    d. Check balance and voting power.

3. Create a Governance Factory for App listing.
    a. create timelockController
    b. create Governor with token addr and timelock addr
    c. add Governor to timelock's proposer list. (check to add for executor list)
    d. You can ideally transfer funds to timelock contract to be used by DAO. 
    e. Create dummy poroposals and sign dummy input votes ( take care of **timelock** ).
    f. Execute the proposals.
    g. Check for proposal votes and updated receiver balance.



Governance Steps ideas
1. Ideate on multiple functions or a single one.
2. Customise the Governor Contract parameters to be dynamic.


//TODO: Add test file for every major corresponding smart contract.
//TODO: Write list of unit test cases for every contract.
//TODO: Get the list of test cases approved by lead dev.
//TODO: Develop the test cases exploring the functionality of truffle, mocha and chai.
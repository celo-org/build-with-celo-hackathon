# Bike Block 

Bike Block is a bike registry where anyone can register their bicycle on the Celo Network through smart contracts. Eliminating counterfeits, fraud and theft in the biking community. The decentralized registry will guarantee that the bike there are about to buy is truly owned by the seller.



## How it works.

Every modern bike has a serial number, this will be used to link bikes to a respected NFT minted during the registration process. The NFT represents the bike digitatly, containing a image of the bike with a description with other important infomation. Methods within the NFT contract will allow NFT&#x27;s to be transferred if the bike is ever sold or given, tracking the change of ownership.

Each NFT will allow a bike to be digitatly track creating an digitial footprint. Mapping serial numbers to there respected NFTs will be done through one way hashing, preventing counterfeits with the same serial numbers. 

Serial number lookup methods will allow user to lookup bikes returning the NFT for that bike. 

Owners will also have the ablility to report a stolen bike and post a reward for it location.

## Final Results

Smart Contracts
    - ERC721 
    - Utilities 
        - ERC721Enumerable
        - ERC721URIStorage
        - Pausable
        - Ownable
        - Counters

Dapps 
    - React js
    - iOS swiftUI

Build Plan

Build plan will be split between two phases Smart Contract &amp; Dapps. Each given three weeks of build time. Contracts will need to be built first then dapps.

## TODO

- Find or implement a more suitable smart contract escrow
- Add and remove smart contract functionality
    - Time locking of bounty funds
- Testing of smart contracts
- UI Design and functionality of react dapp 

## Finished 

- Working smart contracts concept 
- General tesing of smart contract 


## Shortcomings

As of now no major problems have come accross. 👍

# License

The project is available under [Apache licence]("/LICENSE")
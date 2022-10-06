//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

//Import for Chainlink VRF functionality
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

import "base64-sol/base64.sol";

contract CeloPOAP is ERC721URIStorage, VRFConsumerBase, Ownable {
    using Counters for Counters.Counter;

    struct eventStruct {
        string eventName;
        string eventVendor;
        string date;
        string time;
        string cid;
        uint ticketsMinted;
        uint maxCapacity;
        uint startingTokenID;
        address eventOwner;
        //currentTokenID will equal (ticketsMinted + startingID)
    }

    struct tokenStruct {
        address owner;
        uint256 tokenID;
        uint256 eventID;
        string winner;
    }

    Counters.Counter private eventCount;

    mapping(uint256 => eventStruct) public events;
    mapping(uint256 => tokenStruct) public tokens;
    
    uint256 private randomNumber;

    uint256 private fee;

    event minted(address sender, uint256 tokenId);
    event eventInitialized(address owner, uint256 eventID);
    event winnerPicked (uint256 winningTokenID);

    constructor(string memory name, string memory symbol) ERC721(name,symbol) VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
        )
    {
        fee = 0.0001 * 10 ** 18; // 0.0001 LINK
    }


    function initEvent(string memory eventName, string memory eventVendor, string memory date, string memory time, string memory cid, uint maxCapacity) public
    {
        //get the eventID of the previous event to extract its startingTokenID and maxCap
        uint256 startingID = 1;
        if ( eventCount.current() > 0 ) {
            startingID = events[eventCount.current()].startingTokenID +
                events[eventCount.current()].maxCapacity;
        }

        //save new event to on-chain storage
        eventCount.increment();
        events[eventCount.current()] = eventStruct( {
            eventName: eventName, 
            eventVendor: eventVendor,
            date: date,
            time: time,
            cid: cid,
            ticketsMinted: 0,
            maxCapacity: maxCapacity,
            startingTokenID: startingID,
            eventOwner: msg.sender
            } );
    
        // emit a confirmation,
        // includes the event ID which is needed to mint in the future
        emit eventInitialized(msg.sender, eventCount.current());
    }


    function mintTicket(uint256 eventID) 
    public payable
    returns (uint256)
    {   
        require(events[eventID].maxCapacity > 0, "Invalid Event");
        require(events[eventID].ticketsMinted < events[eventID].maxCapacity, "Tickets Sold Out");
        //require(msg.value >= events[eventID].mintPrice, "Ticket price not met!");

        
        uint256 tokenID = events[eventID].startingTokenID + events[eventID].ticketsMinted;
        events[eventID].ticketsMinted += 1;

        tokens[tokenID] = tokenStruct( {
            eventID: eventID,
            tokenID: tokenID,
            owner: msg.sender,
            winner: "false"
            } ) ;
        
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, generateTokenURI(events[eventID].eventName, 
                                                        events[eventID].eventVendor,
                                                        events[eventID].date, 
                                                        events[eventID].time,
                                                        events[eventID].cid,
                                                        "false"));

        // emit a confirmation,
        // include tokenID of new NFTicket
        emit minted(msg.sender, tokenID);
        
        return tokenID;
    }

    // Pick a number of winners from an event randomly, must be initialized via owner
    function pickWinner(uint256 eventID) public returns (uint256)
    {   
        require(events[eventID].ticketsMinted > 0, "Invalid Event");
        require(msg.sender == events[eventID].eventOwner, "Only The Event Creator Can Do This!");

        getRandomNumber();
        uint256 randomWinner = events[eventID].startingTokenID + (randomNumber % events[eventID].ticketsMinted);
        _setTokenURI(randomWinner, generateTokenURI(events[tokens[randomWinner].eventID].eventName, 
                                                        events[tokens[randomWinner].eventID].eventVendor,
                                                        events[tokens[randomWinner].eventID].date, 
                                                        events[tokens[randomWinner].eventID].time,
                                                        events[tokens[randomWinner].eventID].cid,
                                                        "true"));
        emit winnerPicked(randomWinner);
        return randomWinner;
    }

    function verifyTicket (address owner, uint256 tokenID) public view
    returns (bool)
    {
        if( tokens[tokenID].owner == owner) {
            return true;
        }
        else {
            return false;
        }
    }

    //Requests randomness 
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) > fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4, fee);
    }

    //Callback function used by VRF Coordinator
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        //Save the result to the global variable defined above
        randomNumber = randomness;
    }

    function generateTokenURI(string memory eventName, string memory vendorName, 
                        string memory date, string memory time, 
                        string memory cid, string memory winner) 
                        public pure returns(string memory)
    {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',eventName,' Celo PoAP", ',
                                '"description":"A PoAP secured on the CELO blockchain", ',
                                '"attributes":['
                                '{"trait_type":"Vendor Name","value":"',vendorName,'"}, ',
                                '{"trait_type":"Date","value":"',date,'"}, ',
                                '{"trait_type":"Time","value":"',time,'"}, ',
                                '{"trait_type":"Winning Ticket?","value": "',winner,'"}], ',
                                '"image":"https://gateway.pinata.cloud/ipfs/',cid,'"}'
                            )
                        )
                    )
                )
            );
    }
}
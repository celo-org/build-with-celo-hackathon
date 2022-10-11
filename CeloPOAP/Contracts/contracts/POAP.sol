//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


import "base64-sol/base64.sol";

contract POAP is ERC721URIStorage,  Ownable {
    using Counters for Counters.Counter;

    struct EventStruct {
        string eventName;
        string orgName;
        string logo;
        string date;
        string website;
        uint poapsMinted;
        uint maxCapacity;
        address eventOwner;
    }

    
    EventStruct public eventDetails;

    Counters.Counter private tokenCount;

    mapping(address => bool) mintedList;

    
    uint256 private fee;

    event minted(address sender, uint256 tokenId);
    
    

    constructor(string memory name, string memory symbol, EventStruct memory _eventDetails) ERC721(name,symbol) 
    {
        fee = 0.0001 * 10 ** 18; // 0.0001
        eventDetails=_eventDetails;
    }



    function mintPOAP() 
    public payable
    returns (uint256)
    { 
        require(mintedList[msg.sender]==false, "Already Minted");  
        require(eventDetails.maxCapacity > 0, "Invalid Event");
        require(eventDetails.poapsMinted < eventDetails.maxCapacity, "POAPs Sold Out");
        //require(msg.value >= events[eventID].mintPrice, "Ticket price not met!");

        
        uint256 tokenID = events[eventID].startingTokenID + events[eventID].poapsMinted;
        eventDetails.poapsMinted++;
        mintedList[msg.sender]= true;
        
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, generateTokenURI(events[eventID].eventName, 
                                                        events[eventID].orgName,
                                                        events[eventID].date, 
                                                        events[eventID].time,
                                                        events[eventID].cid,
                                                        "false"));

        // emit a confirmation,
        // include tokenID of new NFTicket
        emit minted(msg.sender, tokenID);
        
        return tokenID;
    }

    
    
    function generateTokenURI(string memory eventName,string memory desc, string memory orgName,string memory date) public pure returns(string memory)
    {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',eventName,': POAP", ',
                                '"description":"',desc,'", ',
                                '"attributes":['
                                '{"trait_type":"Org Name","value":"',orgName,'"}, ',
                                '{"trait_type":"Date","value":"',date,'"}, ',
                                '"image":"',eventDetails.logo,'"}'
                            )
                        )
                    )
                )
            );
    }
}
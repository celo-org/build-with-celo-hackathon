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
        string desc;
        string orgName;
        string logo;
        string date;
        string website;
        uint poapsMinted;
        uint maxCapacity;
        address eventOwner;
    }

    
    EventStruct public eventDetails;

    Counters.Counter private _tokenCounter;

    mapping(address => bool) mintedList;

    
    uint256 private fee;

    event minted(address sender, uint256 tokenId);

    string _tokenUri ;
    
    

    constructor(string memory name, string memory symbol, EventStruct memory _eventDetails) ERC721(name,symbol) 
    {
        fee = 0.0001 * 10 ** 18; // 0.0001
        eventDetails=_eventDetails;

        _tokenUri = generateTokenURI();
    }



    function mintPOAP() 
    public payable
    returns (uint256)
    { 
        require(mintedList[msg.sender]==false, "Already Minted");  
        require(eventDetails.maxCapacity > 0, "Invalid Event");
        require(eventDetails.poapsMinted < eventDetails.maxCapacity, "POAPs Sold Out");
        //require(msg.value >= eventDetails.mintPrice, "Ticket price not met!");

        
        
        _tokenCounter.increment();
        uint tokenID = _tokenCounter.current(); 
        eventDetails.poapsMinted++;
        mintedList[msg.sender]= true;
        
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _tokenUri);

        // emit a confirmation,
        // include tokenID of new NFTicket
        emit minted(msg.sender, tokenID);
        
        return tokenID;
    }

    
    
    function generateTokenURI() public view returns(string memory)
    {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',eventDetails.eventName,': POAP", ',
                                '"description":"',eventDetails.desc,'", ',
                                '"attributes":['
                                '{"trait_type":"Org Name","value":"',eventDetails.orgName,'"}, ',
                                '{"trait_type":"Date","value":"',eventDetails.date,'"}, ',
                                '{"trait_type":"Website","value":"',eventDetails.website,'"}, ',
                                // '{"trait_type":"Date","value":"',date,'"}, ',
                                // '{"trait_type":"Org Name","value":"',orgName,'"}, ',
                                '],',
                                '"image":"',eventDetails.logo,'"}'
                            )
                        )
                    )
                )
            );
    }
}
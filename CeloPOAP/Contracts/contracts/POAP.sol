//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "base64-sol/base64.sol";

contract POAP is ERC721Enumerable, ERC721URIStorage,  Ownable {
    using Counters for Counters.Counter;

    struct EventStruct {
        string eventName;
        string desc;
        string orgName;
        string logo;
        string email;
        uint256 date;
        string website;
        uint poapsMinted;
        uint maxCapacity;
        address eventOwner;
    }

    
    EventStruct public eventDetails;

    bytes32 private eventCodeHashed;

    Counters.Counter private _tokenCounter;

    mapping(address => bool) mintedList;

    // address[] private addresses;
    // mapping(address => bool) attendeesStatus;

    
    uint256 private fee;

    event minted(address sender, uint256 tokenId);

    string _tokenUri ;

    bool public _allowMinting=false;
    
    
    constructor(string memory name, string memory symbol, EventStruct memory _eventDetails, string memory eventCode) ERC721(name,symbol) 
    {
        // console.log('StartiIn  1');
        fee = 0.0001 * 10 ** 18; // 0.0001
        eventDetails=_eventDetails;
        eventDetails.poapsMinted=0;
        eventCodeHashed = keccak256(abi.encodePacked(eventCode));
        _tokenUri = generateTokenURI();
        
        _transferOwnership(_eventDetails.eventOwner);
        
    }



    function mintPOAP(string memory eventCode) 
        public payable
        returns (uint256)
    { 
        require(_allowMinting, "Minting Not Allowed");
        require(eventCodeHashed==keccak256(abi.encodePacked(eventCode)), "Invalid Event Code"); 
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

        // mintees.push(msg.sender);

        // emit a confirmation,
        // include tokenID of new NFTicket
        emit minted(msg.sender, tokenID);
        
        return tokenID;
    }

    // function markAttendance(string memory eventCode) public {
    //     require(eventCodeHashed==keccak256(abi.encodePacked(eventCode)), "Invalid Event Code");
    //     if(attendeesStatus[msg.sender] == false){
    //         attendees.push(msg.sender);
    //         attendeesStatus[msg.sender]=true;
    //     }
    // }

    // function addAttendees(address[100] memory addresses) public onlyOwner {
    //     for(uint i=0; i< addresses.length;i++){
    //         if(attendeesStatus[addresses[i]] == false){
    //             attendees.push(addresses[i]);
    //             attendeesStatus[addresses[i]]=true;
    //         }
    //     }
    // }

    // function disableAttendee(address attendee) public onlyOwner {
    //     attendeesStatus[attendee]=false;
    // }

    function allowMint(bool allowOrDisallow) public onlyOwner {
        _allowMinting=allowOrDisallow;
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
                                '{"display_type": "date","trait_type":"Date","value":"',eventDetails.date,'"}, ',
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


    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
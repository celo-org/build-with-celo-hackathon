// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


/**
 * @title Counters
 * @author Mitchell Tucker (@MitchTODO)
 * @dev Modified ERC721 
 *
 *
 */

contract BikeBlock is  ERC721, ERC721URIStorage, Pausable, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // States for a token

    enum State {
        None,
        Normal, 
        Stolen,
        Found
    }
    // Coordinate for last known location
    struct Coordinate {
        uint256 lat;
        uint256 long;
    }

    // Stolen for details of the stolen bike
    struct Stolen{
        uint256 time;
        Coordinate location;
        uint256 bountyPayOut;
        uint256 index;
    }

    struct Recovery {
        address rescuers; // Who reported a stolen bike
        bytes assetURI;   // Where the stolen bike is
    }


    // Maps tokenId to state of bike
    mapping(uint256 => State) public bikeState;

    // Map bikes serial hash to tokenId (NFT)
    mapping(bytes32 =>  uint256) public bikes;

    // Array of stolen bikes 
    Stolen[] stolenBikes;
    mapping(uint256 => Recovery) public recovery;

    // TODO Make into functions
    modifier checkIfRegistered(bytes32 bikeId) {
        require(bikes[bikeId] != 0, "Bike is already registered"); 
        _;
    }

    modifier isTokenOwner(uint256 tokenId) {
        require(msg.sender == ownerOf(tokenId),"You are not NFT owner");
        _;
    }

    modifier isStolen(uint256 tokenId) {
        require(bikeState[tokenId] == State.Stolen,"Bike is not stolen.");
        _;
    }

    constructor() 
    ERC721("BikeBlock", "Bike") {

    }

    /**
     * @dev SafeMint for new bike token
     *
     * Requirements:
     *
     * - `serialHash` keccak256 hash of bike serial number.
     * - `to` address of token owner
     * - `uri` metadata for the bike
     */
    function safeMint(bytes32 serialHash, address to, string memory uri)
        public
        checkIfRegistered(serialHash)
    {
        // Increment tokenId
        uint256 newItemId = _tokenIds.current();
        _tokenIds.increment();
        // Mint and set uri
        _safeMint(to, newItemId);
        _setTokenURI(newItemId, uri);
        // Map serial hash to tokenId and set bike state 
        bikes[serialHash] = newItemId;
        bikeState[newItemId] = State.Normal;
    }

    /**
     * @dev bikeLookUp returns the tokenId map up to the serial hash 
     *
     * Requirements:
     *
     * - `serialHash` keccak256 hash of bike serial number.
     * 
     */

    function bikeLookUp(bytes32 serialHash) 
    public 
    view
    returns(uint256)
    {
        return(bikes[serialHash]);
    }

    /**
     * @dev getBikeState returns state for a given tokenId
     *
     * Requirements:
     *
     * - `tokenId` id of token
     * 
     */
    function getBikeState(uint256 tokenId) 
    public
    view
    returns(State)
    {
        return(bikeState[tokenId]);
    }

    /**
     * @dev setStolenBike allow bike owner to set bike as stolen
     *
     * TODO add time base reward system
     * If bike was not found within a certain time frame reward is returned back to owner
     *
     * Requirements:
     *
     * - `tokenId` id of token (NFT)
     * - `_time` time bike was stolen
     * - `_location` location bike was stolen (Might change to address)
     * - `_bountyPayOut` amount set for bike bounty
     *
     */
    function setStolenBike(uint256 tokenId,uint256 _time,Coordinate memory _location, uint256 _bountyPayOut) 
    public
    isTokenOwner(tokenId)
    {
        Stolen memory stolenInfo;
        stolenInfo.time = _time;
        stolenInfo.location = _location;
        stolenInfo.bountyPayOut = _bountyPayOut;
        stolenInfo.index = stolenBikes.length;
        stolenBikes.push(stolenInfo);
    }


    /**
     * @dev reportStolenBike allows a user to report a stolen bike
     *
     * Requirements:
     *
     * - `serialNumber` serial number for a registered bike
     * - `stolenAssetUri` URI containg info on the where abouts of the bike
     * 
     */
    function reportStolenBike(string memory _serialNumber, bytes memory stolenAssetUri) 
    public
    {
        // Check if serial number matches with a registered bike
        bytes32 bikeId = keccak256(abi.encodePacked(_serialNumber));
        uint256 tokenId = bikes[bikeId];
        State state = bikeState[tokenId];
        // TODO make into modifiers or util functions
        require(state != State.None,"Bike isn't registered");
        require(state == State.Stolen,"Bike isn't stolen");
        // Create recovery struct with the address who report bike
        Recovery memory details;
        details.assetURI = stolenAssetUri;
        details.rescuers = msg.sender;
        recovery[tokenId] = details;
        // TODO emit event & notifiy owner
        //return(tokenId);
    }

    // Pause for admin control
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // TODO make burn available
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // Fetch meta data for tokenURI
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

}

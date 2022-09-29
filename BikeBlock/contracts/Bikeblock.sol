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
 * TODO add bike recovery program (bounties)
 */

contract BikeBlock is  ERC721, ERC721URIStorage, Pausable, Ownable, ERC721Burnable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // States for a token
    enum State {
        None,
        Normal, 
        Stolen
    }
    // Maps tokenId to state of tokenId
    mapping(uint256 => State) public bikeState;
    // Map bikes serial hash to tokenId
    mapping(bytes32 =>  uint256) public bikes;

    constructor() 
    ERC721("BikeBlock", "Bike") {}

    /**
     * @dev SafeMint for new bike Tokens 
     *
     * Requirements:
     *
     * - `serialHash` keccak256 hash of bike serial number.
     * - `to` address of token owner
     * - `uri` metadata for the bike
     */
    function safeMint(bytes32 serialHash, address to, string memory uri)
        public
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
     * @dev getBikeState returns state for a given tokenId
     *
     * Requirements:
     *
     * - `tokenId` id of token to check
     * Sender must be token owner
     */
    function changeBikeState(uint256 tokenId, State _newState) 
    public 
    {
        require(msg.sender == ownerOf(tokenId),"You are not token owner");
        bikeState[tokenId] = _newState;
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

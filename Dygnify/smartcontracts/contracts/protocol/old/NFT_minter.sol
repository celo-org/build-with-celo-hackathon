// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMinter is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("NftVerse", "NV") {}

    //To map tokenID to tokenURI
    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    //function that will mint nft
    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    //function that can return total NFT minted
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Willow is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Willow Trees planted by users", "WILLoW") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 _tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, _tokenId);
        _setTokenURI(_tokenId, uri);
    }

    function tokenId() public view returns(uint256) {
        return _tokenIdCounter.current();
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(_tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }
}

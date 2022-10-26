// heavily inspired by https://github.com/jokie88/carbonized-contracts/blob/main/contracts/nft.sol

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


import {Base64} from "./libraries/Base64.sol";

// all Zena quiz finishers can mint a Zena NFT
contract ZenaNFT is
    ERC721,
    ERC721URIStorage,
    Ownable
{
    IERC20 _bct;
    uint256 private _mintingFee;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(address bct, uint256 mintingFee) ERC721("ZenaNFT", "ZENA") {
        _bct = IERC20(bct);
        _mintingFee = mintingFee;
    }

    function mintNFT(string memory metadataURI) public returns (uint256) {
        
        // TODO
        // require(msg.value == _mintingFee, 'Please pay correct amount');
        
        address from = msg.sender;
        _bct.transferFrom(from, address(this), _mintingFee);
        
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, metadataURI);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
        return newItemId;
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
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
}

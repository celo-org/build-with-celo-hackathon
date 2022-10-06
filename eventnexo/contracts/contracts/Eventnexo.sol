// SPDX-License-Identifier: MIT

// Eventnexo

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Eventnexo is Ownable, Pausable, ERC721Enumerable {
    using Strings for uint256;

    string public baseURI;
    string public baseExtension = ".json";

    constructor() ERC721("Eventnexo", "ENFT") {
       
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Route is ERC721, Ownable {
  uint256 nextId = 1;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
     mint(msg.sender);
  }



  function mint(address recipient, string routeId) public onlyOwner {
    _safeMint(recipient, nextId);
    tokenURI(nextId, routeId);
    nextId++;
  }


  function _baseURI() internal view override returns (string memory) {
    return "https://firestore.googleapis.com/v1/projects/run3-587b8/databases/(default)/documents/routes/";
  }
}


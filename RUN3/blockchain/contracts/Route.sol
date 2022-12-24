pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Route is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("RouteNFT", "ROUTE") {}


  mapping(address => uint256[]) private mintedAddress;

   function mintRoute(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();
       uint256 newItemId = _tokenIds.current();
       mintedAddress[recipient].push(newItemId);
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }


    function getUserRouteIds(address recipient) external view returns (uint256[] memory) {
        return mintedAddress[recipient];
    }
}


// File: ado-contracts/contracts/interfaces/IERC2362.sol



pragma solidity >=0.5.0 <0.9.0;

/**
* @dev EIP2362 Interface for pull oracles
* https://github.com/adoracles/EIPs/blob/erc-2362/EIPS/eip-2362.md
*/
interface IERC2362
{
	/**
	 * @dev Exposed function pertaining to EIP standards
	 * @param _id bytes32 ID of the query
	 * @return int,uint,uint returns the value, timestamp, and status code of query
	 */
	function valueFor(bytes32 _id) external view returns(int256,uint256,uint256);
}
// File: witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol


pragma solidity >=0.7.0 <0.9.0;

// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";


contract EgoNFT is ERC721Enumerable, Ownable {

  using Strings for uint256;

  string baseURI;
  string public baseExtension = ".json";
  bool public paused = false;
  bool public revealed = false;
  string public notRevealedUri;
  uint256 cost;
 uint256  maxSupply;
    uint256 maxMintAmount;

  constructor (

    string memory _name,
    string memory _symbol,
    uint256 _initialPrice,
        uint256 _initialSupply,
        uint256 maxntno,
    string memory _initBaseURI,
    string memory _initNotRevealedUri
   ) ERC721(_name, _symbol) {
      setPrice(_initialPrice);
      setmaxMintAmount(maxntno);
        setSupply(_initialSupply);
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_initNotRevealedUri);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    require(!paused);
    
    require(_mintAmount >0 && _mintAmount <= maxMintAmount );
  
    require(supply + _mintAmount <= maxSupply);

   if (msg.sender != owner()) {
     //require( msg.value) >= cost * _mintAmount, "not enough Celo");
    } 




    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(msg.sender, supply + i);
    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    if(revealed == false) {
        return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  //only owner
  function reveal() public onlyOwner {
      revealed = true;
  }
  
 function setPrice(uint256 _newPrice) public onlyOwner() {
        cost = _newPrice;
    }

    function setSupply(uint256 _newSupply) public onlyOwner() {
        maxSupply = _newSupply;
    }

    function getSupply() public view returns (uint256) {
        return maxSupply;
        }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }
  
  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  

}

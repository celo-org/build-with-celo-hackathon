pragma solidity ^0.8.17;
import "./RUN3Token.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Watch is ERC721, Ownable {
  uint256 tokenId = 1;
  uint8 public constant decimals = 18;
  uint256 public constant reward = 10 * (10 ** uint256(decimals));
  address public constant run3TAddress = 0xe6cc5BB123EBf28257d2fAE9714e211cb29A7D39;


  struct TokenMetaData {
    uint256 tokenId;
    string name;
    string image;
  }

  mapping(address => TokenMetaData) public ownershipRecord;

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
     mintWatch(msg.sender);
  }


  function mintWatch(address recipient) public onlyOwner {
    _safeMint(recipient, tokenId);
    ownershipRecord[recipient].tokenId = tokenId;
    ownershipRecord[recipient].name = 'NFT Alpha Watch';
    ownershipRecord[recipient].image = "https://gateway.pinata.cloud/ipfs/Qmdom6m93Wp4spZhMV4f242igCcrnfgMnvXDwZrF459ERy";

    tokenId++;
  }

  function getWatchData(address recipient) external view returns (TokenMetaData memory) {
    return ownershipRecord[recipient];
  }

  modifier validateOwnership (address recipient) {
      require(ownershipRecord[recipient].tokenId == 0, "User does not have a watch");
      _;
  }

  function collectReward (address recipient) public validateOwnership(recipient) {
    (bool success, ) = run3TAddress.call(
      abi.encodeWithSignature("mintRun3T(address,uint256)", recipient, reward)
    );

    require(success, "call failed");
  }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CommunityNFT is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private tokenCounter;

    string private baseURI;

    string private collectionURI;

    uint256 public numReservedTokens;

    bytes32 public adminMerkleRoot;

    uint256 public MAX_TOTAL_SUPPLY;

    mapping(address => uint256) public addressToTokenId;
    mapping(uint256 => string) public tokenIdtoURI;

    constructor(
        uint256 tokenSupply,
        string memory name,
        string memory symbol,
        string memory _collectionURI
    ) ERC721(name, symbol) {
        MAX_TOTAL_SUPPLY = tokenSupply;
        collectionURI = _collectionURI;
    }

    // ============ ACCESS CONTROL MODIFIERS ============
    modifier oneTokenPerWallet() {
        require(balanceOf(msg.sender) <= 1, "Exceeds one token per wallet");
        _;
    }

    modifier canMint() {
        require(
            tokenCounter.current() <= MAX_TOTAL_SUPPLY,
            "Insufficient tokens remaining"
        );
        _;
    }

    // ============ PUBLIC FUNCTIONS FOR MINTING ============
    function mint() external payable nonReentrant canMint returns (uint256) {
        uint256 tokenId = nextTokenId();
        addressToTokenId[msg.sender] = tokenId;
        _safeMint(msg.sender, tokenId);
        tokenCounter.increment();
        return tokenId;
    }

    // ============ PUBLIC READ-ONLY FUNCTIONS ============
    function getBaseURI() external view returns (string memory) {
        return baseURI;
    }

    function getLastTokenId() external view returns (uint256) {
        return tokenCounter.current();
    }

    // ============ SUPPORTING FUNCTIONS ============
    function nextTokenId() private returns (uint256) {
        tokenCounter.increment();
        return tokenCounter.current();
    }

    // ============ FUNCTION OVERRIDES ============
    function contractURI() public view returns (string memory) {
        return collectionURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Non-existent token");

        return tokenIdtoURI[tokenId];
    }

    // ============ OWNER-ONLY ADMIN FUNCTIONS ============
    function setAdminMerkleRoot(bytes32 merkleRoot) external onlyOwner {
        adminMerkleRoot = merkleRoot;
    }

    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function setTokenURI(address _user, string memory _tokenURI)
        external
        onlyOwner
    {
        uint256 tokenId = addressToTokenId[_user];
        tokenIdtoURI[tokenId] = _tokenURI;
    }

    function setCollectionURI(string memory _collectionURI) external onlyOwner {
        collectionURI = _collectionURI;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }

    // ============ SOUL-BOUND OVERRIDE ============
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721) {
        require(from == address(0), "Error: token is SOUL BOUND");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    receive() external payable {}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract ZenaToken is ERC20, ERC20Burnable, Ownable {
    address _zena;

    constructor(address zena) ERC20("Zena", "ZENA") {
        _zena = zena;
        // mint fixed supply to Zena treasuy
        _mint(_zena, 100000 * 10**18);
    }
}

contract ZenaTreasury is Ownable, ERC721, ERC721URIStorage {
    event Received(address, uint256);

    IERC20 _token;
    IERC20 _bct;
    uint256 private _mintingFee;
    uint256 _bctSequestered;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(address bct) ERC721("ZenaNFT", "ZENA") {
        _bct = IERC20(bct);
        _mintingFee = 0.01 * 10**18;
        _token = new ZenaToken(address(this));
    }


    function getAllSequesteredBCT()
        public
        view
        returns (uint256)
    {
        return _bctSequestered;
    }

    function getTreasuryBCT()
        public
        view
        returns (uint256)
    {
        return _bct.balanceOf(address(this));
    }

    function mintNFT(string memory metadataURI) public returns (uint256) {
        // address from = msg.sender;
        // _bct.transferFrom(from, address(this), _mintingFee);
        uint256 bctBalance = _bct.balanceOf(address(this));
        uint256 availableBalance = bctBalance - _bctSequestered;
        require(availableBalance >= _mintingFee, "Not enough unsequestered BCT in the reserve");

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, metadataURI);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        _bctSequestered = _bctSequestered + _mintingFee;
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

    fallback() external payable {
        // React to receiving BCT from funder
        emit Received(msg.sender, msg.value);

        //  TODO
        //  Zena token as a gift back to funder
        //  uint256 dexBalance = _token.balanceOf(address(this));
        //  require(msg.value <= dexBalance, "Not enough tokens in the reserve");
        //  _token.transfer(msg.sender, msg.value);
    }
}

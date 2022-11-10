// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IPOAPMarket{
    

    function createListing(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external ;

    function createListingForSeller(
        address seller,
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external;

    function isNftListed(address nftAddress, uint256 tokenId) external view returns(bool);
}

contract POAPMarket is IPOAPMarket {
    struct Listing {
        uint256 price;
        address seller;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    modifier isNFTOwner(address nftAddress, uint256 tokenId) {
        require(
            IERC721(nftAddress).ownerOf(tokenId) == msg.sender,
            "POAPMARKET: Not the owner"
        );
        _;
    }

    modifier isAddressNFTOwner(address owner, address nftAddress, uint256 tokenId) {
        require(
            IERC721(nftAddress).ownerOf(tokenId) == owner,
            "POAPMARKET: Not the owner"
        );
        _;
    }

    modifier isNotListed(address nftAddress, uint256 tokenId) {
        require(
            listings[nftAddress][tokenId].price == 0,
            "POAPMARKET: Already listed"
        );
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        require(listings[nftAddress][tokenId].price > 0, "POAPMARKET: Not listed");
        _;
    }

    event ListingCreated(
        address nftAddress,
        uint256 tokenId,
        uint256 price,
        address seller
    );

    event ListingCanceled(address nftAddress, uint256 tokenId, address seller);

    event ListingUpdated(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice,
        address seller
    );

    event ListingPurchased(
        address nftAddress,
        uint256 tokenId,
        address seller,
        address buyer
    );

    function createListing(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    )
        external
        isNotListed(nftAddress, tokenId)
        isNFTOwner(nftAddress, tokenId)
    {
        require(price > 0, "POAPMARKET: Price must be > 0");
        IERC721 nftContract = IERC721(nftAddress);
        require(
            nftContract.isApprovedForAll(msg.sender, address(this)) ||
                nftContract.getApproved(tokenId) == address(this),
            "POAPMARKET: No approval for NFT"
        );
        listings[nftAddress][tokenId] = Listing({
            price: price,
            seller: msg.sender
        });

        emit ListingCreated(nftAddress, tokenId, price, msg.sender);
    }

    function createListingForSeller(
        address seller,
        address nftAddress,
        uint256 tokenId,
        uint256 price
    )
        public
        isNotListed(nftAddress, tokenId)
        isAddressNFTOwner(seller, nftAddress, tokenId)
    {
        require(price > 0, "POAPMARKET: Price must be > 0");
        IERC721 nftContract = IERC721(nftAddress);
        require(
            nftContract.isApprovedForAll(seller, address(this)) ||
                nftContract.getApproved(tokenId) == address(this),
            "POAPMARKET: No approval for NFT"
        );
        listings[nftAddress][tokenId] = Listing({
            price: price,
            seller: seller
        });

        emit ListingCreated(nftAddress, tokenId, price, seller);
    }

    function cancelListing(address nftAddress, uint256 tokenId)
        external
        isListed(nftAddress, tokenId)
        isNFTOwner(nftAddress, tokenId)
    {
        delete listings[nftAddress][tokenId];
        emit ListingCanceled(nftAddress, tokenId, msg.sender);
    }

    function updateListing(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice
    ) external isListed(nftAddress, tokenId) isNFTOwner(nftAddress, tokenId) {
        require(newPrice > 0, "POAPMARKET: Price must be > 0");
        listings[nftAddress][tokenId].price = newPrice;
        emit ListingUpdated(nftAddress, tokenId, newPrice, msg.sender);
    }

    function purchaseListing(address nftAddress, uint256 tokenId)
        external
        payable
        isListed(nftAddress, tokenId)
    {
        Listing memory listing = listings[nftAddress][tokenId];
        require(msg.value == listing.price, "POAPMARKET: Incorrect ETH supplied");
		
		delete listings[nftAddress][tokenId];

        IERC721(nftAddress).safeTransferFrom(
            listing.seller,
            msg.sender,
            tokenId
        );
        (bool sent, ) = payable(listing.seller).call{value: msg.value}("");
        require(sent, "Failed to transfer eth");     

        emit ListingPurchased(nftAddress, tokenId, listing.seller, msg.sender);
    }


    function isNftListed(address nftAddress, uint256 tokenId) public view returns (bool) {
        return listings[nftAddress][tokenId].price > 0;
    }
}
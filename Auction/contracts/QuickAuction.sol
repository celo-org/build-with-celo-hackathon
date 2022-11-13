// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract QuickAuction is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 private auctionsCount;

    constructor() ERC721("AuctionNFT", "AUC") {}

    struct Auction {
        uint256 id;
        string title;
        string description;
        uint256 tokenId;
        address owner;
        uint256 startPrice;
        uint256 highestBid;
        address highestBidder;
        address[] buyers;
        uint256 endTime;
        bool isActive;
        bool ownerTaken;
    }

    mapping (address => mapping (uint256 => uint256)) bids;
    mapping (uint256 => Auction) auctions;

    event NewAuction(uint256 id);
    event Bid(address indexed sender, uint256 amount);
    event End(address winner, uint256 amount);

    /* Check if the auction has ended */
    modifier isTimeUp (uint256 _id) {
        if (block.timestamp > auctions[_id].endTime) {
            auctions[_id].isActive = false;
        }
        _;
    }
    
    /*╔═════════════════════════════╗
      ║        AUCTION FUNCTIONS    ║
      ╚═════════════════════════════╝*/

    /* Creates a new auction provided the right parameters are given */
    function createAuction(
        string memory _title,
        string memory _description,
        string memory tokenURI,
        uint256 _startPrice,
        uint256 _endTime
    ) external {
        uint256 newItemId = _tokenIds.current();
        _tokenIds.increment();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        uint256 id = auctionsCount;
        
        auctions[id].id = id;
        auctions[id].title = _title;
        auctions[id].description = _description;
        auctions[id].tokenId = newItemId;
        auctions[id].startPrice = _startPrice;
        auctions[id].endTime = block.timestamp + _endTime;
        auctions[id].owner = msg.sender;
        auctions[id].isActive = true;
        auctionsCount++;

        _transfer(msg.sender, address(this), newItemId);
        emit NewAuction(id);
    }

    /* Make a bid to a specific auction */
    function bid (uint256 _id) payable external isTimeUp(_id) {
        require(block.timestamp < auctions[_id].endTime || auctions[_id].isActive, "Auction ended");
        require(msg.sender != auctions[_id].owner, "Owner can't bid duh!!!");

        uint256 currentBid = bids[msg.sender][_id] + msg.value;

        if (auctions[_id].highestBid == 0) {
            require(msg.value > auctions[_id].startPrice, "Amount is less than starting price");
            auctions[_id].highestBid = msg.value;
        } else if (msg.value > auctions[_id].highestBid) {
            auctions[_id].highestBid = msg.value;
        } else {
            require(currentBid > auctions[_id].highestBid, "Amount is less than current bid");
            auctions[_id].highestBid = currentBid;
        }

        auctions[_id].highestBidder = msg.sender;
        if (bids[msg.sender][_id] == 0) {
            auctions[_id].buyers.push(msg.sender);
        }
        bids[msg.sender][_id] = currentBid;

        emit Bid(msg.sender, currentBid);
    }

    /* Auction is over, collect your rewards if you participated */
    function timeUp (uint256 _id) external isTimeUp(_id) {
        require(!auctions[_id].isActive, "Auction has not yet ended");

        if (auctions[_id].owner == msg.sender && !auctions[_id].ownerTaken) {
            if (auctions[_id].highestBidder == address(0)) {
                _transfer(address(this), msg.sender, auctions[_id].tokenId);
            } else {
                payable(auctions[_id].owner).transfer(auctions[_id].highestBid);
            }
            auctions[_id].ownerTaken = true;
        } else if (auctions[_id].highestBidder == msg.sender) {
            _transfer(address(this), auctions[_id].highestBidder, auctions[_id].tokenId);
        } else {
            require(bids[msg.sender][_id] != 0, "Did you participate???");
            payable(msg.sender).transfer(bids[msg.sender][_id]);
        }
        bids[msg.sender][_id] = 0;
    }

    /* Get details of the auction with that id */
    function getAuction(uint256 _id) external view returns (Auction memory auction) {
        return auctions[_id];
    }

    /* Get the amount a user has bidded for a particular auction */
    function getUserBid(uint256 _id) external view returns (uint256) {
        return bids[msg.sender][_id];
    }

    /* Get details of the auction with that id */
    function getAuctions() external view returns (Auction[] memory) {
        Auction[] memory allAuctions = new Auction[](auctionsCount);
        for (uint256 i = 0; i < auctionsCount; i++) {
            if (auctions[i].isActive) {
                allAuctions[i] = auctions[i];
            }
        }
        return allAuctions;
    }

    /* Get auctions the caller participated in */
    function getUserAuctions() external view returns (Auction[] memory) {
        Auction[] memory allAuctions = new Auction[](auctionsCount);
        for (uint256 i = 0; i < auctionsCount; ++i) {
            if (auctions[i].owner == msg.sender) {
                allAuctions[i] = auctions[i];
            }
            for (uint256 j = 0; j < auctions[i].buyers.length; ++j) {
                if (auctions[i].buyers[j] == msg.sender) {
                    allAuctions[i] = auctions[i];
                }
            }
        }
        return allAuctions;
    }

    /* Get how long is remaining to auction for a specific auction */
    function getTimeRemaining(uint256 _id) external view returns (uint256 time) {
        if(auctions[_id].endTime > block.timestamp) {
            return auctions[_id].endTime - block.timestamp;
        }
        return 0;
    }
}
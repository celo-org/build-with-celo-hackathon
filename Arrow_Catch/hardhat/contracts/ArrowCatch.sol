// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Trigonometry.sol";
import "base64-sol/base64.sol";

contract ArrowCatch is ERC721URIStorage {
    address payable owner;
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;
    using Trigonometry for uint;
    uint256 internal radiusrange = 250;
    uint256 internal anglerange = 16384;
    uint256 public   radiusId = 0;
    uint256 public   angleId = 0;
    string public svg1;
    uint256 mintPrice = 0.025 ether;
    uint public balanceReceived;
    mapping(uint256 => ArrwoItem) private idToArrwoItem;

    struct ArrwoItem {
      uint256 tokenId;
      address payable tokenowner;
      uint256 radius;
      uint256 angle;
      uint256 prize;
      bool state;
    }


    constructor()
    ERC721("RandomSVG", "rsNFT")
    {
        owner = payable(msg.sender);
        svg1  = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 497 497'><defs><style>.a,.e,.f{fill:none;}.a{stroke:#000;}.a,.c,.d,.e,.f{stroke-miterlimit:10;}.a,.d{stroke-width:2px;}.b{fill:#00192d;}.c,.d{fill:red;}.c,.d,.e,.f{stroke:#fff;}.c{stroke-width:3px;}.e,.f{stroke-width:0.5px;}.f{isolation:isolate;font-size:31.28px;font-family:ArialMT, Arial;}</style></defs><title>svgcode2</title><circle class='a' cx='248.5' cy='248.5' r='247.5'/><ellipse class='b' cx='248.5' cy='248.5' rx='240.39' ry='235.07'/><ellipse class='c' cx='248.5' cy='248.5' rx='203.92' ry='208.93'/><circle class='b' cx='248.5' cy='248.5' r='185.97'/><ellipse class='d' cx='248.5' cy='248.5' rx='86.8' ry='88.93'/><circle class='b' cx='248.5' cy='248.5' r='71.53'/><circle class='e' cx='248.5' cy='248.5' r='21.5'/><polygon class='e' points='473.34 256.26 271.75 250.91 271.8 248.9 473.38 254.25 473.34 256.26'/><rect class='e' x='346.61' y='222.7' width='2.01' height='203.21' transform='translate(-121.33 402.42) rotate(-52.47)'/><polygon class='e' points='313.31 465.18 254.12 271.04 256.03 270.47 315.22 464.6 313.31 465.18'/><polygon class='e' points='174.26 460.46 241.88 270.43 243.77 271.11 176.16 461.12 174.26 460.46'/><rect class='e' x='46.64' y='320.23' width='201.46' height='2.01' transform='translate(-156.03 139.97) rotate(-34.5)'/><polygon class='e' points='23.67 244.95 223.38 249.54 223.35 251.54 23.63 246.94 23.67 244.95'/><rect class='e' x='146.84' y='72.68' width='2' height='201.27' transform='translate(-79.55 187.09) rotate(-53)'/><rect class='e' x='212.08' y='27.8' width='2' height='201.24' transform='translate(-27.87 66.48) rotate(-16.66)'/><polygon class='e' points='325.96 35.72 259.51 226.19 257.61 225.54 324.06 35.07 325.96 35.72'/><polygon class='e' points='435.27 120.68 269.2 236.45 268.05 234.8 434.12 119.03 435.27 120.68'/>";
    }
    function createToken() public payable returns (uint256){
        require(msg.value == mintPrice, "Price must be equal to mint price");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        string memory finalSvg = string(abi.encodePacked(svg1, RandomHit()));
        string memory imageURI = svgToImageURI(finalSvg);
        _setTokenURI(newItemId, formatTokenURI(imageURI));
        idToArrwoItem[newItemId] = ArrwoItem (
            newItemId,
            payable(msg.sender),
            radiusId,
            angleId,
            0,
            false
        );
        (bool sent, ) = owner.call{value: mintPrice}("");
        require(sent, "Failed to send Ether");
        return newItemId;
    }

    function openContest(uint256 tokenId, uint256 prize) public payable{
        require(msg.value == prize, "Please submit the asking price in order to complete the purchase");
        idToArrwoItem[tokenId].state = true;
        idToArrwoItem[tokenId].prize = prize;
        balanceReceived += msg.value;

    }

// if the player wins, he will receive the prize, if he loses, he needs to pay the price of minting to the competitor
    function challenge(uint256 tokenId) public payable {
        uint256 newtokenId = createToken(); 
        if (idToArrwoItem[newtokenId].radius < idToArrwoItem[tokenId].radius ){
            idToArrwoItem[tokenId].state = false;
            (bool sent, ) = payable(msg.sender).call{value: idToArrwoItem[tokenId].prize}("");
            require(sent, "Failed to send Ether");
        } else {
            (bool sent, ) = payable(idToArrwoItem[tokenId].tokenowner).call{value: mintPrice}("");
            require(sent, "Failed to send Ether");
        }
        
    }

    function RandomHit() public returns(string memory translate) {
        uint radius = uint256(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % radiusrange;
        uint  angle =  uint256(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % anglerange;
        radiusId = radius;
        angleId = angle * 360 / 16384;
        int256 cos = Trigonometry.cos(angle) * 10000 / 32767;
        int256 sin = Trigonometry.sin(angle) * 10000 / 32767;
        string memory  x = uint256((int256(radius) * cos) / 10000 + 250).toString() ;
        string memory  y = uint256(250  - (int256(radius) * sin) / 10000).toString(); 
        translate = string(abi.encodePacked("<text class='f' transform='translate( ", x, " ", y, ") scale(1.66 1)'>x</text></svg>"));
    }
    
    function svgToImageURI(string memory svg) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        return string(abi.encodePacked(baseURL,svgBase64Encoded));
    }

    function formatTokenURI(string memory imageURI) public view  returns (string memory) {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                "SVG NFT", // You can add whatever name here
                                '", "description":"archery shooting random", "attributes":"',radiusId.toString(), ' ',angleId.toString(),'", "image":"',imageURI,'"}'
                            )
                        )
                    )
                )
            );
    }

    function fetchMarketItems() public view returns (ArrwoItem[] memory) {
        uint itemCount = _tokenIds.current();
        uint currentIndex = 0;
        ArrwoItem[] memory items = new ArrwoItem[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
        if (idToArrwoItem[i + 1].state == true) {
            uint currentId = i + 1;
            ArrwoItem storage currentItem = idToArrwoItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        }
        return items;
    }

    function fetchMyItem() public view returns (ArrwoItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
        if (idToArrwoItem[i + 1].tokenowner == msg.sender) {
            itemCount += 1;
        }
        }
        ArrwoItem[] memory items = new ArrwoItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
        if (idToArrwoItem[i + 1].tokenowner == msg.sender) {
            uint currentId = i + 1;
            ArrwoItem storage currentItem = idToArrwoItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        }
        return items;
    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

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
    uint256 internal radiusRange = 200;
    uint256 internal angleRange = 16384;
    uint256 private   radiusId = 0;
    uint256 private   angleId = 0;
    uint256 private  points = 0;
    string public svg1;
    uint256 mintPrice = 0.25 ether;
    uint256[] public anglId = [6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10];
    mapping(uint256 => ArrwoItem) private idToArrwoItem;

    struct ArrwoItem {
      uint256 tokenId;
      address payable tokenowner;
      uint256 radius;
      uint256 angle;
      uint256 points;
      uint256 prize;
      bool state;
    }
    event CreateNFT(uint256 tokenid );
    event OpenContest(uint256 tokenid, uint256 prize);
    event CloseContest(uint256 tokenid, uint256 prize);
    event Challenge(string state, uint256 reward);

    modifier _onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    constructor()
    ERC721("BoardSVG", "BDNFT")
    {
        owner = payable(msg.sender);
       svg1  = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 498.66 498.66'><defs><style>.a,.d,.e,.g{fill:none;}.a,.b,.d,.e,.f,.g{stroke-miterlimit:10;}.a{stroke-width:40px;stroke:url(#a);}.b{fill:#231f13;stroke:#552d00;opacity:0.82;}.b,.d{stroke-width:4px;}.b,.e,.h,.i,.j{isolation:isolate;}.c{fill:#1de416;}.d{stroke:#1e0f00;}.e{stroke:#2c2912;stroke-width:11px;opacity:0.59;}.f{fill:#bcbcbc;stroke:#130d85;stroke-width:5px;}.g{stroke:#d3d3d3;stroke-width:2px;}.h,.i{font-size:34.99px;fill:#a9beff;font-family:ArialMT, Arial;}.i{letter-spacing:-0.07em;}.j{font-size:36px;fill:#fffdfd;font-family:ArialNarrow, Arial;}</style><radialGradient id='a' cx='249.5' cy='251.13' r='233.1' gradientTransform='matrix(1, 0, 0, -1, 0, 500)' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#fff'/><stop offset='1' stop-color='#001c3f'/></radialGradient></defs><title>last01</title><circle class='a' cx='249.5' cy='248.87' r='213.1'/><circle class='b' cx='249.33' cy='249.33' r='247.33'/><polygon class='c' points='50.33 184.92 224.95 237.12 80.07 126.56 229.45 229.38 126.43 80.15 236.72 224.25 184.77 50.43 245.13 221.29 249.55 40 254.15 220.71 314.12 50.2 263.7 225 372.43 79.93 270.5 230.54 418.84 126.34 274.85 237.12 448.63 184.61 277.93 244.85 458.77 249.18 277.71 253.97 448.57 313.97 274.92 262.37 419.06 372.38 269.65 269.5 372.69 418.75 262.61 274.96 314.39 448.21 254.15 277.67 249.5 461.97 245 276.45 184.97 448.66 236.72 274.67 126.65 418.93 229.56 269.43 80.29 372.53 222.32 263.77 50.56 314.21 221.34 253.97 40.13 249.66 221.44 245.02 50.33 184.92'/><circle class='d' cx='249.33' cy='249.33' r='243.33'/><circle class='e' cx='249.9' cy='249.47' r='105.2'/><circle class='f' cx='249.42' cy='248.97' r='18.43'/><circle class='g' cx='249.9' cy='248.87' r='27.58'/><text class='h' transform='translate(269.17 470.67) scale(1.11 1)'>3</text><text class='h' transform='translate(320.8 451.67) scale(1.11 1)'>17</text><text class='h' transform='translate(385.2 414.37) scale(1.11 1)'>2</text><text class='h' transform='translate(263.7 51.9) scale(1.11 1)'>1</text><text class='h' transform='translate(316.9 69.78) scale(1.11 1)'>18</text><text class='h' transform='translate(383.1 107.48) scale(1.11 1)'>4</text><text class='h' transform='translate(411.7 159.57) scale(1.11 1)'>13</text><text class='h' transform='translate(449.1 231.67) scale(1.11 1)'>6</text><text class='h' transform='translate(433.2 297.57) scale(1.11 1)'>10</text><text class='h' transform='translate(414.9 354.77) scale(1.11 1)'>15</text><text class='h' transform='translate(184.9 468.45) scale(1.11 1)'>19</text><text class='h' transform='translate(135.6 446.67) scale(1.11 1)'>7</text><text class='h' transform='translate(89 408.77) scale(1.11 1)'>6</text><text class='h' transform='translate(48.1 356.67) scale(1.11 1)'>8</text><text class='i' transform='translate(18.4 291.17) scale(1.11 1)'>1</text><text class='h' transform='translate(37.11 291.17) scale(1.11 1)'>1</text><text class='h' transform='translate(18.31 231.67) scale(1.11 1)'>14</text><text class='h' transform='translate(54.1 164.68) scale(1.11 1)'>9</text><text class='h' transform='translate(69.5 118.87) scale(1.11 1)'>12</text><text class='h' transform='translate(141.1 75.27) scale(1.11 1)'>5</text><text class='h' transform='translate(193 53.37) scale(1.11 1)'>20</text>";
    }
    function setmintPrice( uint256 _mintPrice) public _onlyOwner {
        mintPrice = _mintPrice;
    }

    function createNFT() public payable returns (uint256){
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
            points,
            0,
            false
        );
        (bool sent, ) = owner.call{value: mintPrice}("");
        require(sent, "Failed to send Ether");
        emit CreateNFT(newItemId);
        return newItemId;
    }

    function openContest(uint256 _tokenId, uint256 prize) public payable{
        require(idToArrwoItem[_tokenId].state == false, "listed");
        require(msg.value == prize, "Prize not equal to value");
        require(msg.value > mintPrice, "Prize must be more than mint price");
        idToArrwoItem[_tokenId].state = true;
        idToArrwoItem[_tokenId].prize = prize;
        emit OpenContest(_tokenId, prize);
    }
    function closeContest(uint256 _tokenId) public {
        require(idToArrwoItem[_tokenId].state == true, "not listed" );
        require(idToArrwoItem[_tokenId].tokenowner == msg.sender, "not owner");
        uint256 amount = idToArrwoItem[_tokenId].prize;
        (bool sent, ) = payable (msg.sender).call{value: amount}("");
        require(sent, "Failed to send Ether");
        idToArrwoItem[_tokenId].state = false;
        idToArrwoItem[_tokenId].prize = 0;
        emit CloseContest(_tokenId, amount);
    }
    
    function challenge(uint256 tokenId) public payable {
        require(msg.value == 2* mintPrice , "You need to pay challenge fee");
        require(idToArrwoItem[tokenId].state = true, "Challenge not open yet");
        uint256 newtokenId = createNFT();
        if (idToArrwoItem[newtokenId].points > idToArrwoItem[tokenId].points ){
            idToArrwoItem[tokenId].state = false;
            uint256 value = idToArrwoItem[tokenId].prize - mintPrice;
            payable(msg.sender).call{value: value };
            emit Challenge("Win", value);
        } else {
            payable(idToArrwoItem[tokenId].tokenowner).call{value: mintPrice};
            emit Challenge("Lose", mintPrice);
        }
    }

    function RandomHit() public returns(string memory translate) {
        uint radius = uint256(keccak256(abi.encodePacked( msg.sender, block.timestamp, blockhash(block.number - 1), blockhash(block.number)))) % radiusRange;
        uint  angle =  uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, blockhash(block.number - 1), blockhash(block.number)))) % angleRange;
        radiusId = radius;
        angleId = angle * 359 / 16384; // angleId range 0 to 360
        uint256 index =  angleId / 18; //index of array points 
        points = anglId[index] * 210 - radiusId;
        int256 cos = Trigonometry.cos(angle);
        int256 sin = Trigonometry.sin(angle);
        string memory  x = uint256((int256(radiusId) * cos) / 32767 + 240).toString() ;
        string memory  y = uint256(240  - (int256(radiusId) * sin) / 32767).toString(); 
        translate = string(abi.encodePacked("<text class='i' transform='translate( ", x, " ", y, ") scale(1.5 1)'>x</text></svg>"));
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
                                '{"BDNFT":"',
                                "BoardSVG", 
                                '", "description":"Archery Board shooting", "attributes":"{',radiusId.toString(), ', ',angleId.toString(),', ',points.toString(),'}", "image":"',imageURI,'"}'
                            )
                        )
                    )
                )
            );
    }

    function fetchMarketItems() public view returns (ArrwoItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToArrwoItem[i + 1].state ==true) {
                itemCount += 1;
            }
        }
        ArrwoItem[] memory items = new ArrwoItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
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
        if (idToArrwoItem[i + 1].tokenowner == msg.sender && ownerOf(i+1)== msg.sender ) {
            uint currentId = i + 1;
            ArrwoItem storage currentItem = idToArrwoItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        }
        return items;
    }
    function pointOfTokenId(uint256 _tokenId) public view returns (uint256){
        uint256 point = idToArrwoItem[_tokenId].points;
        return point;
    }
    function totalpoints() public view returns  (uint256){
        uint totalItemCount = _tokenIds.current();
        uint256 total;
         for (uint i = 0; i < totalItemCount; i++) {
            total += idToArrwoItem[i + 1].points;
         }
        return total;
    }
    function NFTTotalSupply() public view returns (uint256 totalsupply) {
        return _tokenIds.current();
    }
}
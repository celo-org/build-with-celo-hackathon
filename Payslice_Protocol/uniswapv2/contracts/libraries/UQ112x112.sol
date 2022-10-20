// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;


library UQ112x112 {
    uint224 constant Q112 = 2 ** 112;

    function encode(uint112 y) internal pure returns (uint224 x){
        x = uint224(y) / Q112;
    }

    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z){
        z = x / uint224(y);
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

interface IZuniswapV2Factory {
    function pairs(address, address) external pure returns (address);

    function createPair(address, address) external returns (address);
}
// SPDX-License-Identifier: MIt

pragma solidity ^0.8.15;

interface IZuniswapV2Pair {
    function initialize(address, address) external;

    function getReserves()
        external
        view
        returns (
            uint112,
            uint112,
            uint32
        );

    function mint(address) external returns (uint256);

    function transferFrom(address, address, uint) external;

    function swap(uint, uint, address, bytes calldata) external;
    function burn(address) external returns (uint, uint);
}
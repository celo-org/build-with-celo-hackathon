//SPDX-License-Identifier: MIT
pragma solidity >0.6.0;

/// @dev ERC20 interface
interface ERC20 {
    function deposit() external payable;

    function withdraw(uint) external;

    function approve(address, uint) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function transfer(address, uint) external returns (bool);

    function transferFrom(
        address,
        address,
        uint
    ) external returns (bool);

    function balanceOf(address) external view returns (uint);
}

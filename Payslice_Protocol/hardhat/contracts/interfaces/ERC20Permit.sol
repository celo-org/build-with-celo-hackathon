//SPDX-License-Identifier: MIT
pragma solidity >0.6.0;

/// @dev ERC20 interface
interface ERC20Permit {
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

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}

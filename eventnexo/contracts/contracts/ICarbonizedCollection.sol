// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICarbonizedCollection {
    function carbonBalance(address account) external view returns (uint256);

    function totalCarbon() external view returns (uint256);
}

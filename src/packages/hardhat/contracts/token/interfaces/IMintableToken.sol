//SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.4;

interface IMintableToken {
    function mint(address _account, uint96 _amount) external;
    function burn(address _account, uint96 _amount) external;
}
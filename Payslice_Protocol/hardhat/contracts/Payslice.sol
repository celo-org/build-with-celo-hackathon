//SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./proxies/SliceProxyFactory.sol";

contract Payslice is SliceProxyFactory {

    function initialize(
        address _mastercopy,
        address _exchangeAddress,
        address _loggerAddress
    ) external {
        mastercopy = _mastercopy;
        exchangeAddress = _exchangeAddress;
        loggerAddress = _loggerAddress;
    }

    

}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../data/SharedData.sol";

interface ISlice {
    function setupSlice(
        address _token,
        address _recipientAddress,
        uint _recipientAddresschainId,
        address _exchangeAddress,
        address _loggerAddress,
        uint _totalReceivable,
        SPayer[] memory _payers,
        bytes calldata _userdata
    )  external returns (bool) ;
}
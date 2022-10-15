// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

import "../data/SharedData.sol";

interface ISlice {
    function setupSlice(
        address _token,
        address _recipientAddress,
        uint _recipientAddresschainId,
        address _exchangeAddress,
        address _loggerAddress,
        uint _totalReceivable,
        string memory _title,
        string memory _description,
        SPayer[] memory _payers
    ) external returns (bool);   
}
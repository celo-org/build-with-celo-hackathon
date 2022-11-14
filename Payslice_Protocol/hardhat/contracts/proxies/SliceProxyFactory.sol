// SPDX-License-Identifier: MIT

/// @author Nartey Kodjo-Sarso
pragma solidity 0.8.15;

import "./Proxy.sol";

import "../interfaces/ISlice.sol";

///@dev Slice Proxy factory
contract SliceProxyFactory {

    address public exchangeAddress;
    address public loggerAddress;
    address public mastercopy;

    event ProxyCreated(address proxy, address indexed owner);
    /// @dev deploy new invoice
    
    function createNewSlice(
        address _token,
        address _recipientAddress,
        uint _recipientAddresschainId, 
        uint _totalReceivable,
        SPayer[] memory _payers,
        bytes calldata _userdata)
        external returns (address) {

        Proxy proxy = new Proxy(mastercopy);

        bool _success = ISlice(address(proxy)).setupSlice(
            _token,
            _recipientAddress,
            _recipientAddresschainId,
            exchangeAddress,
            loggerAddress,
            _totalReceivable,
            _payers,
            _userdata
        );

        require(_success, "Failed to setup slice");

        emit ProxyCreated(address(proxy), msg.sender);

        return address(proxy);
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

contract Proxy {
    /// @dev that this contract has not data stored in it
    /// keccak("MASTER_COPY_ADDRESS") => 0x542716ccde0a3fd74601ae4bfa898139e782bb572a8d2efa9b3bd9b79d5a240c
    bytes32 constant MASTER_COPY_ADDRESS = 0x542716ccde0a3fd74601ae4bfa898139e782bb572a8d2efa9b3bd9b79d5a240c;

    /// @dev Allows you 
    constructor(address _mastercopy){
        require(_mastercopy != address(0), "Invalid mastercopy address");
        
        assembly{
            sstore(MASTER_COPY_ADDRESS, _mastercopy)
        }
    }

    /// @dev Fallback function only forwards calls to `mastercopy`
    fallback() external payable {

        assembly {
            // Create new stack slot reserved for _mastercopy variable
            // Assign 32 word with address _mastercopy (left-padded with zeros)
            let _mastercopy := and(sload(MASTER_COPY_ADDRESS), 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF)

            /// @dev delegate call params: delegate(gas, address, argOffset_of_calldata, calldatasize, return_data_Offset, return_data_size)
            /// @dev calldata represents the current execution context in memory
            /// @dev returndatasize - returns the data size of the output of the previous call in memory
            calldatacopy(0x0, 0x0, calldatasize())
            let success := delegatecall(gas(), _mastercopy, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            if eq(success, 0) {
                revert(0, returndatasize())
            }

            return(0, returndatasize())
        }
    }
}
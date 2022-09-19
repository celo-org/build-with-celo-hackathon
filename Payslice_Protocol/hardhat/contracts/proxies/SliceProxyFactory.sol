// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.15;

import "./Proxy.sol";

contract SliceProxyFactory {
    event ProxyCreation(address proxy, address mastercopy);

    function createStorage(address _mastercopy, bytes memory _data) external {
        require(_mastercopy != address(0), "Invalid mastercopy address");
        Proxy proxy = new Proxy(_mastercopy);

        if(_data.length > 0){
            assembly{
                
                if eq(call(gas(), _mastercopy,0, add(_data, 0x20), mload(_data), 0, 0), 0) {
                    revert(0, returndatasize())
                }
            }
        
        }
        

        emit ProxyCreation(address(proxy), _mastercopy);
    }
}
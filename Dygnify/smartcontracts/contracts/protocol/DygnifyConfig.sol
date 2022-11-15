// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./BaseUpgradeablePausable.sol";
import "./ConfigHelper.sol";

contract DygnifyConfig is BaseUpgradeablePausable {
    mapping(uint256 => address) public addresses;
    mapping(uint256 => uint256) public numbers;
    mapping(bytes32 => bool) public flag;
    using ConfigHelper for DygnifyConfig;

    function initialize() public initializer {
        require(msg.sender != address(0), "Invalid sender address");
        _BaseUpgradeablePausable_init(msg.sender);
        setAddress(0, msg.sender);
    }

    function setAddress(uint256 addressIndex, address newAddress)
        public
        nonReentrant
        onlyAdmin
    {
        require(address(newAddress) != address(0), "Invalid Address");
        addresses[addressIndex] = newAddress;
    }

    function getAddress(uint256 addressIndex) public view returns (address) {
        return addresses[addressIndex];
    }

    function setNumber(uint256 id, uint256 newNumber)
        public
        nonReentrant
        onlyAdmin
    {
        numbers[id] = newNumber;
    }

    function getNumber(uint256 id) public view returns (uint256) {
        return numbers[id];
    }

    function setFlag(bytes32 id, bool isflag) public nonReentrant onlyAdmin {
        flag[id] = isflag;
    }

    function getFlag(bytes32 id) public view returns (bool) {
        return flag[id];
    }
}

//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/************************************** INTERFACES **************************************/
interface RolesI {
    function isSuperAdmin(address account) external view returns(bool);
    function isAddressManager(address account) external view returns(bool);
    function isMinter(address account) external view returns(bool);
    function isPauser(address account) external view returns(bool);
}

interface SUSTokenFactoryI {
    function mintSUST(address, uint256) external;
}

interface BandOracleI {
    function getPrice() external view returns (uint256);
}

contract FrontFace is Pausable, AccessControl {
    address private tokenFactoryAddress;
    address private rolesSC;
    address private bandOracleAddress;

    constructor (address _rolesContractAddress,  address _tokenFactoryAddress, address _bandOracleAddress) {
        tokenFactoryAddress = _tokenFactoryAddress;
        rolesSC  = _rolesContractAddress;
        bandOracleAddress = _bandOracleAddress;
    }

//----------------------- SET ADDRESS FUNCTIONS -----------------------//
    function setTokenFactoryAddress(address _tokenFactoryAddress) public whenNotPaused {
        require(RolesI(rolesSC).isAddressManager(msg.sender), "Access Denied: Caller is NOT Super Admin!");
        require(_tokenFactoryAddress != address(0), "Account: Zero or Invalid address!");
        tokenFactoryAddress = _tokenFactoryAddress;
    }

    function setRolesContractAddress(address _rolesSC) public whenNotPaused {
        require(RolesI(rolesSC).isAddressManager(msg.sender), "Access Denied: Caller is NOT Super Admin!");
        require(_rolesSC != address(0), "Account: Zero or Invalid address!");
        rolesSC = _rolesSC;
    }
    
//----------------------- SEND RECEIPT FUNCTION -----------------------//
    function sendReceipt(uint receiptNum) public whenNotPaused {
        require(receiptNum != 0, "Input Error: Receipt number is zero or invalid!");
        require(BandOracleI(bandOracleAddress).getPrice() != 0, "CELO/USD price is ZERO!");
        SUSTokenFactoryI(tokenFactoryAddress).mintSUST(msg.sender, 10 * (10 ** 18));
    }

    function killContract() public whenNotPaused{
        require(RolesI(rolesSC).isSuperAdmin(msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
		selfdestruct(payable(msg.sender));
	}
}

//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./EthPrice.sol";
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

interface EthPriceI {
    function ethPriceUSD() external view returns (uint); 
}

contract FrontFace is Pausable, AccessControl {
    address private tokenFactoryAddress;
    address private rolesSC;
    address private ethPriceAddress;

    constructor (address _rolesContractAddress,  address _tokenFactoryAddress, address _ethPriceAddress) {
        tokenFactoryAddress = _tokenFactoryAddress;
        rolesSC  = _rolesContractAddress;
        ethPriceAddress = _ethPriceAddress;

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

    function setEthPriceContractAddress(address _ethPriceAddress) public  whenNotPaused{
        require(RolesI(rolesSC).isAddressManager(msg.sender), "Access Denied: Caller is NOT Super Admin!");
        require(_ethPriceAddress != address(0), "Account: Zero or Invalid address!");
        ethPriceAddress = _ethPriceAddress;
    }
    
//----------------------- SEND RECEIPT FUNCTION -----------------------//
    function sendReceipt(uint receiptNum) public whenNotPaused {
        require(receiptNum != 0, "Input Error: Receipt number is zero or invalid!");
        require(EthPriceI(ethPriceAddress).ethPriceUSD() != 0, "ETH price is ZERO!");
        SUSTokenFactoryI(tokenFactoryAddress).mintSUST(msg.sender, 10);
    }

    function killContract() public whenNotPaused{
        require(RolesI(rolesSC).isSuperAdmin(msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
		selfdestruct(payable(msg.sender));
	}
}

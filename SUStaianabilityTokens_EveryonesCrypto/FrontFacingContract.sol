//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
/************************************** INTERFACES **************************************/
interface IRoles {
    function isSuperAdmin(address account) external view returns(bool);

    function isMinter(address account) external view returns(bool);
    function isPauser(address account) external view returns(bool);
}

interface SUSTokenFactory {
    function mintSUST(address, uint256) external;
}

contract FrontFace {
    address private tokenFactoryAddress;
    address private rolesSC;

    constructor(address _rolesContractAddress,  address _tokenFactoryAddress) {
        tokenFactoryAddress = _tokenFactoryAddress;
        rolesSC  = _rolesContractAddress;
    }

    function stringToBytes32(string memory _str) public pure returns (bytes32)  {
		bytes memory tempBytes = bytes(_str);
		bytes32 convertedBytes;

		if(tempBytes.length == 0){
			return 0x0;
		}

		assembly{
			convertedBytes := mload(add(_str,32))
		}

		return convertedBytes;
	}

//----------------------- SET ADDRESS FUNCTIONS -----------------------//
    function setTokenFactoryAddress(address _tokenFactoryAddress) public {
        require(_tokenFactoryAddress != address(0), "Account: Zero or Invalid address!");
        require(IRoles(rolesSC).isSuperAdmin(msg.sender), "Access Denied: Caller is NOT Super Admin!");
        tokenFactoryAddress = _tokenFactoryAddress;
    }

    function setRolesContractAddress(address _rolesSC) public whenNotPaused {
        require(IRoles(rolesSC).isSuperAdmin(msg.sender), "Access Denied: Caller is NOT Super Admin!");
        require(_rolesSC != address(0), "Account: Zero or Invalid address!");
        rolesSC = _rolesSC;
    }
    
    function sendReceipt(address walletAddress, uint256 amount) public {
        //require(receiptNum != 0, "Input Error: Receipt number is zero or invalid!");
        require(walletAddress != address(0), "Input Error: Recepient address is zero or invalid!");
        require(amount != 0, "Input Error: Amount entered is zero or invalid!");
        SUSTokenFactory(tokenFactoryAddress).mintSUST((walletAddress), amount);
    }

    function killContract() public {
        require(IRoles(rolesSC).isSuperAdmin(msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
		selfdestruct(payable(msg.sender));
	}
}

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

pragma solidity ^0.8.0;

contract SUSTokenFactory is ERC20, ERC20Burnable, Pausable, ReentrancyGuard {
    
    event MintEvent(string, address, uint256);

    constructor() ERC20("SUStainability Tokens", "SUST") Pausable() {}

//----------------- MINT FUNCTION ----------------//

    function sendSUST(string memory receiptNum, address walletAddress) public whenNotPaused nonReentrant {
        
        //Mint tokens and transfer them to toWalletAddress
        _mint(walletAddress,1*10**18);

        emit MintEvent(receiptNum, walletAddress, 1*10**18);     
    }

   
//----------------- PAUSER FUNCTION ----------------//

    function pauseContract() public whenNotPaused {
        _pause();
    }

    function unpauseContract() public whenPaused {
        _unpause();
    }

//----------------- KILL FUNCTION ----------------//

    //KILL THE ERC20-SMART-CONTRACT
    function killSUSTokenContract() public {
		selfdestruct(payable(msg.sender));
	}
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

//Check openzeppelin for learning more about input variables like Name, Token Amount, etc. 
//https://docs.openzeppelin.com/contracts/4.x/wizard


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/// @custom:security-contact  1
contract Equistart is ERC20, ERC20Votes {
    constructor() ERC20("Equistart", "EQI") payable ERC20Permit("Equistart") {
        _mint(msg.sender, 21000000 * 10 ** decimals());
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
    
    struct GeneralProposal {
        uint256 id;
        uint256 amount;
        uint256 livePeriod;
         
    }
    
    
    
    
}
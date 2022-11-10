// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
 
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

 
contract faucet is ERC20 {

    
   constructor() ERC20("", "") {
        
    }

    receive() payable external{
        
    }

    function transferERC20(IERC20 token, address to, uint256 amount) public {
        uint256 erc20Balance = token.balanceOf(address(this));
        require(amount <= erc20Balance,'balance low');
        token.transfer(to, amount);
    }
       
    
}
 


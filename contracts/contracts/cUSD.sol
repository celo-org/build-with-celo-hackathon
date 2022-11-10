// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
 
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

 
contract cUSD is ERC20 {
    constructor() ERC20("Celo Dollar", "cUSD") {
        _mint(msg.sender, 1000000000000000e18);
    }
    function mint() external payable {
        _mint(msg.sender,100e18);
    }    
    function burn(address account,uint256 amount) external payable{
    _burn(account,amount);
  }
}
 


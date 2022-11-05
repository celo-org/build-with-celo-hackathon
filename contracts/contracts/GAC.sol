// contracts/GAC.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
 
 
contract GAC is
    Initializable,
    ERC20Upgradeable,
    ReentrancyGuardUpgradeable,
    OwnableUpgradeable 
    
    {
 
    function initialize() public initializer {
    __ERC20_init("GrowAChild", "GAC");
    __ReentrancyGuard_init();
    __Ownable_init();
  }
   
    function mint(address payable addr, uint256 amount) public payable nonReentrant{
        _mint(addr,amount);
    }  
 
    function burn(address account,uint256 amount) public payable nonReentrant{
    _burn(account,amount);
    }
 
}
 


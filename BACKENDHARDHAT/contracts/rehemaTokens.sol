// SPDX-License-Identifier: MIT

pragma solidity ^ 0.8.2;
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract RehemaToken is ERC20 ,Ownable{
    
    
   constructor() ERC20("Rehema","RH"){
   

    }
    function mintToken(uint _rehemaTokens,address _joincommu) public  onlyOwner  {
        _mint(_joincommu,10**18*_rehemaTokens);
    }
   
    
  
   
    
}


// SPDX-License-Identifier: MIT

pragma solidity ^ 0.8.2;
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract RehemaTokens is ERC20 ,Ownable{
    
    
    constructor() ERC20("Rehema","RH"){
   

    }
    function mintToken(uint _rehemaTokens) public  onlyOwner  {
_mint(msg.sender,10**18*_rehemaTokens);
    }
    // function sendRehemaToken(address payable _newMember,uint tokens)public payable {
    //     transferFrom(msg.address, _newMember, tokens);

    // }
    function getAccountBalance()public view  returns(uint){
 
 return totalSupply();
    }
}
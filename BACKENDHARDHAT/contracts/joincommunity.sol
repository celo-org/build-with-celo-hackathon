// SPDX-License-Identifier: MIT

pragma solidity ^ 0.8.2;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract joinCommunity is  Ownable{ 
  
    IERC20  Token;
    IERC20  cUSDToken;
    address payable myaddress = payable(0xC877733b142f44AF7e2FA8d29A7065e56FF851fa);
    mapping(address => bool) public join;
    uint256 public amount =10;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    constructor(){
 cUSDToken = IERC20(cUsdTokenAddress);
    }
   /*
   * @ dev Activate function to cast the rehema tokens to The IERC20
   
   */
    function activate(address _rehemaToken )public onlyOwner{
 Token = IERC20(_rehemaToken);
    } 
     function joinCommunityy() public{
       require(join[msg.sender] !=true,"already a member");
       
        
        
        Token.transfer(msg.sender,amount);
        join[msg.sender] =true;
    
}
/*
* @dev : getrehema balance of a member
*/
 function getBalanceofMember()public view returns(uint){
        return Token.balanceOf(msg.sender);
    }
    function shareRehemaTokens(address payable _receiver,uint _amount) public payable{
      require(Token.balanceOf(msg.sender) >= _amount,"You have less rehema tokens please top up");
       Token.transfer(_receiver,amount);
    } 

    /*
    *@dev buy rehema tokens for cUsd 
    */
    function buyRehemaTokensForcUSD(uint256 _amount)public payable  {
      require(cUSDToken.balanceOf(msg.sender) >= _amount,"low balance");
    
     require(cUSDToken.approve(address(this),_amount));
  
  require(
            cUSDToken.transferFrom(
                msg.sender,
                address(this),
                _amount
            ),
            "Transefer Failed"
        );
Token.transfer(msg.sender,_amount *10);
    }
    /*
    *@dev but for ethereum*/
    function buyRehemaTokenForETH()public payable{
      require( msg.sender.balance >= msg.value,"Less amount in the account")
      payable(address(this)).transfer(msg.value);
      Token.transfer(msg.sender,msg.value*10);
      
    }
function balances()public view  onlyOwner returns(uint){
  return cUSDToken.balanceOf(address(this));

}
function balancesthis()public view  onlyOwner returns(uint){
  return address(this).balance;

}

receive() external payable {}
fallback() external payable{}

}
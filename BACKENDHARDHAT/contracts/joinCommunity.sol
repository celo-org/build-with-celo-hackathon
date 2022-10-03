// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "./rehemaTokens.sol";
contract JoinCommuity is RehemaTokens{
    uint memberBalance;
    event Sent(address to, uint amount);
    function joinCommuinty() public{
        transfer(payable(msg.sender), getAccountBalance() *25/(100**10));
        emit  Sent(msg.sender,getAccountBalance() *25/(10**10));
    }
    function getRehemaBalanceOfMember()public  view returns(uint){
 return balanceOf(msg.sender);
    }

}

    

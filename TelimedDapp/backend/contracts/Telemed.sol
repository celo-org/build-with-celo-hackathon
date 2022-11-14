// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Telemed {

    struct User {
        address walletAddress;
        string message;
    }

    mapping(address => User) public users;
    User[] public userList;

    function sendMessage(address to, string memory message) public {
        User memory user = User(to, message);
        userList.push(user);
    }

    function getMessageLength() public view returns(uint256){
        return userList.length;
    }

    function getMessageIndex(uint256 i) public view returns(User memory){
       return userList[i];
    }
}

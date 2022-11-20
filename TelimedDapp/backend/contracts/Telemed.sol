// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Telemed {
    uint public blockNumber;
    bytes32 public blockHashNow;
    bytes32 public blockHashPrevious;

    struct User {
        address from;
        address to;
        string message;
        uint blockNumber;
        bytes32 blockHashNow;
    }

    event MessageEvent(
        address from,
        address to,
        string message,
        uint blockNumber,
        bytes32 blockHashNow
    );
    
    User[] public userList;

    function sendMessage(address to, string memory message) public {
        blockNumber = block.number;
        blockHashNow = blockhash(blockNumber);
        User memory user = User(msg.sender, to, message, blockNumber, blockHashNow);
        userList.push(user);
        emit MessageEvent(msg.sender, to, message, blockNumber, blockHashNow);
    }

     function getMessageLength() public view returns(uint256){
        return userList.length;
    }

    function getMessageIndex(uint256 i) public view returns(User memory){
       return userList[i];
    }
}

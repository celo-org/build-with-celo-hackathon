pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Escrow {
    address public owner;
    uint256 public balance;

    event TransferReceived(address _from, uint256 _amount);
    event TransferSent(address _from, address _destAddr, uint256 _amount);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        balance += msg.value;
        emit TransferReceived(msg.sender, msg.value);
    }

    function withdraw(uint256 amount, address payable destAddr) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(amount <= balance, "Insufficient funds");

        destAddr.transfer(amount);
        balance -= amount;
        emit TransferSent(msg.sender, destAddr, amount);
    }

    function transferERC20(
        IERC20 token,
        address to,
        uint256 amount
    ) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        uint256 erc20balance = token.balanceOf(address(this));
        require(amount <= erc20balance, "balance is low");
        token.transfer(to, amount);
        emit TransferSent(msg.sender, to, amount);
    }
}

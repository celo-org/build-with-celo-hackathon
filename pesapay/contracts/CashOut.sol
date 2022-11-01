pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract CashOut is ERC2771Context, Ownable {
    address public vault = 0xceA707280e428AD529053623093Ec9B83eDA84b4;

    event TransferReceived(address _from, uint256 _amount);
    event TransferSent(address _destAddr, uint256 _amount);

    constructor(
        MinimalForwarder forwarder // Initialize trusted forwarder
    ) ERC2771Context(address(forwarder)) {}

    receive() external payable {}

    function depositToken(address _token, uint256 _amount) public {
        IERC20(_token).transferFrom(_msgSender(), address(this), _amount);
        emit TransferReceived(_msgSender(), _amount);
    }

    function withdraw(address _withdrawAddress) public payable onlyOwner {
        payable(_withdrawAddress).transfer(address(this).balance);
        emit TransferSent(_withdrawAddress, address(this).balance);
    }

    function withdrawToken(
        address _token,
        address _withdrawAddress,
        uint256 _amount
    ) public payable onlyOwner {
        IERC20(_token).transfer(_withdrawAddress, _amount);
        emit TransferSent(_withdrawAddress, _amount);
    }

    function _msgSender()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (address sender)
    {
        return ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }
}

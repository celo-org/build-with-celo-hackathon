// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./WalletFactory.sol";

contract EscrowWallet is Ownable {
    // address public owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    function owner() public pure override returns (address) {
        return 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    }

    function version() public pure returns (string memory) {
        return "v1.0.0";
    }

    function erc20TokenBalance(address _token) public view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }

    function nativeTokenBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdrawErc20Token(
        address _token,
        address _to,
        uint256 _amount
    ) public onlyOwner {
        IERC20(_token).transfer(_to, _amount);
    }

    function withdrawNativeToken(address payable _to, uint256 _amount)
        public
        onlyOwner
    {
        require(address(this).balance > _amount, "WI: Insufficient balance");

        _to.transfer(_amount);
    }
}
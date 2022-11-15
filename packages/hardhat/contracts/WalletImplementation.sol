// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./GidiFactory.sol";
import "./CommonWalletV1.sol";

contract WalletImplementation is CommonWalletV1 {
    function version() public pure returns (string memory) {
        return "v1.1.0";
    }

    function erc20TokenBalance(address _token) public view returns (uint256) {
        require(_token != address(0x0), "WI: Invalid _token address");

        return IERC20(_token).balanceOf(address(this));
    }

    function celoTokenBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdrawErc20Token(
        address _token,
        address _to,
        uint256 _amount
    ) public returns (bool) {
        require(_token != address(0x0), "WI: Invalid _token address");

        IERC20(_token).transfer(_to, _amount);

        return true;
    }

    function withdrawCeloToken(address payable _to, uint256 _amount)
        public
        returns (bool)
    {
        _to.transfer(_amount);

        return true;
    }
}

//SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../community/interfaces/ICommunityAdmin.sol";
import "./IUniswapV2Router.sol";

interface ITreasury {
    struct Token {
        uint256 rate;
        address[] exchangePath;
    }

    function getVersion() external pure returns(uint256);
    function communityAdmin() external view returns(ICommunityAdmin);
    function uniswapRouter() external view returns(IUniswapV2Router);
    function updateCommunityAdmin(ICommunityAdmin _communityAdmin) external;
    function updateUniswapRouter(IUniswapV2Router _uniswapRouter) external;
    function transfer(IERC20 _token, address _to, uint256 _amount) external;
    function isToken(address _tokenAddress) external view returns (bool);
    function tokenListLength() external view returns (uint256);
    function tokenListAt(uint256 _index) external view returns (address);
    function tokens(address _tokenAddress) external view returns (uint256 rate, address[] memory exchangePath);
    function setToken(address _tokenAddress, uint256 _rate, address[] calldata _exchangePath) external;
    function removeToken(address _tokenAddress) external;
    function getConvertedAmount(address _tokenAddress, uint256 _amount) external view returns (uint256);
    function convertAmount(
        address _tokenAddress,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address[] memory _exchangePath,
        uint256 _deadline
    ) external;
}

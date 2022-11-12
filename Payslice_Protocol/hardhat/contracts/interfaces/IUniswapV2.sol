// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.15;

interface IUniswapV2 {
    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to
    ) external returns (uint256[] memory amounts);

    function getAmountsIn(uint amountOut, address[] memory path)
        external
        view
        returns (uint[] memory);

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to
    ) external returns (uint[] memory amounts);
}

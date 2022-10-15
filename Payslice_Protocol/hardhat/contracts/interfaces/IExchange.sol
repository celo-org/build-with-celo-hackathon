// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.15;

interface IExchange {

    function swapExactInputSingle(
        address _inputToken,
        address _outputToken,
        address _sender,
        uint24 _poolFee,
        uint256 _amountIn,
        uint256 _amountOutMinimum,
        uint160  _sqrtPriceLimitX96
        ) external returns (uint256 amountOut)
}

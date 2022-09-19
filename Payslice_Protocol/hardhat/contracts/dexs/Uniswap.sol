// SPDX-License-Identifier: MIT

/// @author Nartey Kodjo-Sarso

pragma solidity >=0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

import "./interfaces/IExchange.sol";

///@dev Uniswap swap manager
contract Uniswap is IExchange {
    ISwapRouter public immutable swapRouter;

    constructor() {
        swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    }

    function swapExactInputSingle(
        address _inputToken,
        address _outputToken,
        address _sender,
        uint24 _poolFee,
        uint256 _amountIn,
        uint256 _amountOutMinimum,
        uint160  _sqrtPriceLimitX96
        ) external returns (uint256 amountOut) {
        // msg.sender must approve this contract

        // Transfer the specified amount of DAI to this contract.
        TransferHelper.safeTransferFrom(_inputToken,_sender, address(this) , _amountIn);

        // Approve the router to spend DAI.
        TransferHelper.safeApprove(_inputToken, address(swapRouter), _amountIn);

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: _inputToken,
                tokenOut: _outputToken,
                fee: _poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: _amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        
        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
    }
}

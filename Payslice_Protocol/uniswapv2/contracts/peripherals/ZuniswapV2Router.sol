// SPDX-License-Identifier: MIT

pragma solidity >=0.8.15 <9.0.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "../interfaces/IZuniswapV2Factory.sol";
import "../interfaces/IZuniswapV2Pair.sol";
import "../libraries/ZuniswapV2Library.sol";

import "hardhat/console.sol";

error ExcessiveInputAmount();
error InsufficientOutputAmount();
error InsufficientInputAmount();
error InsufficientAAmount();
error InsufficientBAmount();
error SafeTransferFailed();

contract ZuniswapV2Router {
    
    IZuniswapV2Factory factory;

    constructor(address factoryAddress){
        factory = IZuniswapV2Factory(factoryAddress);
    }

    /**
    * @param tokenA first token address
    * @param tokenB second token address
    * @param amountADesired amount of tokenA that is to be deposited
    * @param amountBDesired amount of tokenB that is to be deposited
    * @param amountAMin minimum amount of tokenA to be deposited
    * @param amountBMin minimum amount of tokenB to be deposited
    * @param to address that receives LP tokens
    */
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to
    ) public returns(
        uint amountA,
        uint amountB,
        uint liquidity
    ){

        if(factory.pairs(tokenA, tokenB) == address(0)){
            factory.createPair(tokenA, tokenB);
        }

        (amountA, amountB) = _calculateLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin
        );

        address pairAddress = ZuniswapV2Library.pairFor(
            address(factory),
            tokenA,
            tokenB
        );

        // uint allowance = ERC20(tokenA).allowance(msg.sender, address(this));
        // console.log(amountA, amountB, allowance);

        _safeTransferFrom(tokenA, msg.sender, pairAddress, amountA );
        _safeTransferFrom(tokenB, msg.sender, pairAddress, amountB );
        liquidity = IZuniswapV2Pair(pairAddress).mint(to);

    }

    /**
    * @dev burns LP-tokens for tokens
    *
    * @param tokenA address of first token pair
    * @param tokenB address of second token pair
    * @param liquidity the amount of LP tokens to burn
    * @param amountAMin minimum amount of token A we want in return for burning LP-tokens
    * @param amountBMin minimum amount of token B we want in return for burning LP-tokens
    * @param to address that will receive tokens
    */
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to
    ) public returns (uint amountA, uint amountB){
        address pair = ZuniswapV2Library.pairFor(
            address(factory),
            tokenA,
            tokenB
        );
        //@dev not checks is made to verify that the pair actually exists.
        //     `ZuniswapV2Library.pairFor` reimplements deterministic address generation
        //     and that doesn't necessarily imply that the pairs exists in ZuniswapV2Factory.pairs
        //     so liquidity may not be accessible until the pair contract for tokenA and tokenB are created.
        IZuniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity);

        (amountA, amountB) = IZuniswapV2Pair(pair).burn(to);

        if(amountA < amountAMin) revert InsufficientAAmount();
        if(amountB < amountBMin) revert InsufficientBAmount();
    }

    /**
    * @dev makes chain swap of `amountIn` for an amount not less than `amountOutMin` along `path`
    * @param amountIn amount of in token
    * @param amountOutMin minimum amount of out token expected
    * @param path a sequence of token addresses for chained swap
    * @param to address to receive amount of out token
    */
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to
    ) public returns (uint[] memory amounts){
        amounts = ZuniswapV2Library.getAmountsOut(
            address(factory),
            amountIn,
            path
        );

        console.log(amounts[0], amounts[1], 0, 1);

        if(amounts[amounts.length - 1] < amountOutMin) revert InsufficientOutputAmount();

        _safeTransferFrom(
            path[0],
            msg.sender,
            ZuniswapV2Library.pairFor(address(factory), path[0], path[1]),
            amounts[0]
        );

        _swap(amounts, path, to);
    }

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to
    ) public returns (uint256[] memory amounts) {
        amounts = ZuniswapV2Library.getAmountsIn(
            address(factory),
            amountOut,
            path
        );
        
        if (amounts[amounts.length - 1] > amountInMax)
            revert ExcessiveInputAmount();

        if(amounts[0] > amountInMax) revert InsufficientInputAmount();


        // console.log( path[0],
        //     msg.sender,
        //     ZuniswapV2Library.pairFor(address(factory), path[0], path[1]),
        //     amounts[0]);

        _safeTransferFrom(
            path[0],
            msg.sender,
            ZuniswapV2Library.pairFor(address(factory), path[0], path[1]),
            amounts[0]
        );

        _swap(amounts, path, to);
    }

    function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory){
        return ZuniswapV2Library.getAmountsIn(
            address(factory),
            amountOut,
            path
        );
    }

    function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory){
        return ZuniswapV2Library.getAmountsOut(
            address(factory),
            amountIn,
            path
        );
    }

    function _swap(
        uint[] memory amounts,
        address[] memory path,
        address to
    ) internal {
        for(uint i = 1; i < path.length; i++){
            //token addresses are sorted logically
            (address input, address output) = (path[i-1], path[i]);

            // token addresses are stored in ascending order
            (address token0,) = ZuniswapV2Library._sortTokens(input, output);

            //sorting amounts so they match the order of tokens in pairs
            uint amountOut = amounts[i];
            (uint amount0Out, uint amount1Out) = input == token0 
            ? (uint(0), amountOut)
            : (amountOut, uint(0));


            // If current pair is not final in the path, we want to send tokens to next pair directly. This allows to save gas.
            // Else if current pair is final, we want to send tokens to address to_, which is the address that initiated the swap.
            address _to = i < path.length - 1 ? ZuniswapV2Library.pairFor(
                address(factory),
                output,
                path[i+1]
            ) : to;

            IZuniswapV2Pair(
                ZuniswapV2Library.pairFor(address(factory), input, output)
            ).swap(amount0Out, amount1Out, _to, "");
        }
    }

    

    function _calculateLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal view returns(uint amountA, uint amountB){
        (uint reserveA, uint reserveB) = ZuniswapV2Library.getReserves(
            address(factory),
            tokenA,
            tokenB
        );

        if(reserveA == 0 && reserveB == 0){
            (amountA, amountB) = (amountADesired, amountBDesired);
        }
        else{
            uint amountBOptimal = ZuniswapV2Library.qoute(
                amountADesired,
                reserveA,
                reserveB
            );

            if(amountBOptimal <= amountBDesired){

                if(amountBOptimal <= amountBMin) revert InsufficientBAmount();
                (amountA, amountB) = (amountADesired, amountBOptimal);
            }else{
                uint amountAOptimal = ZuniswapV2Library.qoute(
                    amountBDesired,
                    reserveB,
                    reserveA
                );

                assert(amountAOptimal <= amountADesired);

                if(amountAOptimal <= amountAMin) revert InsufficientAAmount();

                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }

        }
    }


    function _safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                from,
                to,
                value
            )
        );
        if (!success || (data.length != 0 && !abi.decode(data, (bool))))
            revert SafeTransferFailed();
    }
    
}
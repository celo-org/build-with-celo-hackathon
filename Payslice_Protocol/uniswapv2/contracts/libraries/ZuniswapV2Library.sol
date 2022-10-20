// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "hardhat/console.sol";

import "../interfaces/IZuniswapV2Pair.sol";
import {ZuniswapV2Pair} from "../core/ZuniswapV2Pair.sol";

library ZuniswapV2Library {

    error InsufficientLiquidity();
    error InsufficientAmount();
    error InvalidPath();

    function getReserves(
        address factoryAddress,
        address tokenA,
        address tokenB
    ) public view returns (uint reserveA, uint reserveB){
        (address token0, address token1) = _sortTokens(tokenA, tokenB);

        address pair = pairFor(factoryAddress, token0, token1);

        
        (uint reserve0, uint reserve1,) = IZuniswapV2Pair(pair).getReserves();

        //checks if pairs are the same as sorted pairs then appropriately assign the reserves
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);

    }


    /**
    * @dev finds the address for a given pair.
    *      This function could use ZuniswapV2Factory(factoryAddress).pairs(address(token0), address(token1))
    *      Which would be straight forward but cost a bit more gas. 
    *      Here we reap the benefit of using a deterministic approach to create the contract address of each ZuniswapV2pair.
    *
    * @param factoryAddress address of the factory that stores the pair
    * @param tokenA address of the first token pair
    * @param tokenB address of the second token pair
    */
    function pairFor(
        address factoryAddress,
        address tokenA,
        address tokenB
    ) internal pure returns (address pairAddress){
        // sort token pairs just as its done in `ZuniswapV2Factory.createPair`
        (address token0, address token1) = _sortTokens(tokenA, tokenB);

        // Reimplementing address generation in Solidity!
        // Here we recreate the address just like using CREATE2 opcode.
        // bytes memory bytecode = abi.encodePacked();
        pairAddress = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xff),
                            factoryAddress,
                            keccak256(abi.encodePacked(token0, token1)),
                            keccak256(type(ZuniswapV2Pair).creationCode)
                        )
                    )
                )
            )
        );
    }

    function qoute(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    ) public pure returns (uint amountOut){
        if(amountIn == 0) revert InsufficientAmount();
        if(reserveIn == 0 || reserveOut == 0) revert InsufficientLiquidity();

        return (amountIn * reserveOut) / reserveIn;
    }

    /**
    * @param amountIn token amount sent
    * @param reserveIn reserve of in token
    * @param reserveOut reserve of out token
    */
    function getAmountOut(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    ) public pure returns (uint){
        if(amountIn == 0) revert InsufficientAmount();
        if(reserveIn == 0 || reserveOut == 0) revert InsufficientLiquidity();

        uint amountInWithFee = amountIn * 997;
        uint numerator = amountInWithFee * reserveOut;
        uint denominator = (reserveIn * 1000) + amountInWithFee;

        return numerator/denominator;
    }


    function getAmountsOut(
        address factory,
        uint amountIn,
        address[] memory path
    ) public view returns (uint[] memory){
        if(path.length < 2) revert InvalidPath();
        uint[] memory amounts = new uint[](path.length);
        amounts[0] = amountIn;

        for(uint i = 1; i < path.length; i++){
            (uint reserve0, uint reserve1) = getReserves(
                factory,
                path[i-1],
                path[i]
            );

            amounts[i] = getAmountOut(amounts[i-1], reserve0, reserve1);
        }

        return amounts;
    }


    function getAmountIn(
        uint amountOut,
        uint reserveIn,
        uint reserveOut
    ) public pure returns (uint){
        if(amountOut == 0) revert InsufficientAmount();
        if(reserveIn == 0 || reserveOut == 0) revert InsufficientLiquidity();

        uint numerator = reserveIn * amountOut * 1000;
        uint denominator = (reserveOut - amountOut) * 997;

        return (numerator / denominator) + 1;
    }

    function getAmountsIn(
        address factory,
        uint256 amountOut,
        address[] memory path
    ) public view returns (uint256[] memory) {
        if (path.length < 2) revert InvalidPath();
        uint256[] memory amounts = new uint256[](path.length);
        amounts[amounts.length - 1] = amountOut;

        for (uint256 i = path.length - 1; i > 0; i--) {
            (uint256 reserve0, uint256 reserve1) = getReserves(
                factory,
                path[i - 1],
                path[i]
            );
            amounts[i - 1] = getAmountIn(amounts[i], reserve0, reserve1);
        }

        return amounts;
    }

    function _sortTokens(
        address tokenA,
        address tokenB
    ) internal pure returns (address token0, address token1){
        return tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
    }
}
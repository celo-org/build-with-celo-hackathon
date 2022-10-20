//SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./ZuniswapV2Pair.sol";
import "../interfaces/IZuniswapV2Pair.sol";

error IdenticalAddresses();
error PairExists();
error ZeroAddress();

// address 0x39175833e4aBB848Fd6e62CE43dBA701459178A2
contract ZuniswapV2Factory {

    mapping(address => mapping(address => address)) public pairs;

    address[] public allPairs;

    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint
    );

    function createPair(address tokenA, address tokenB) public returns (address pair) {
        if(tokenA == tokenB) revert IdenticalAddresses();

        //@dev sort address based on alphabetic order
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);

        if(token0 == address(0)) revert ZeroAddress();

        if(pairs[token0][token1] != address(0)) revert PairExists();


        bytes memory bytecode = type(ZuniswapV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));

        assembly{
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt )
        }


        IZuniswapV2Pair(pair).initialize(token0, token1);

        pairs[token0][token1] = pair;

        /**
        * This second pair mapping is ONLY created so that pairs regardless of their positions can be 
        * found easily without sorting first.
        */
        pairs[token1][token0] = pair;

        allPairs.push(pair);

        emit PairCreated(token0, token1, pair, allPairs.length);


    }

    function numberOfPairs() public view returns (uint){
        return allPairs.length;
    }
}
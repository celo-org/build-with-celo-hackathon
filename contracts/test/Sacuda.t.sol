// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "forge-std/Test.sol";
import "../src/Sacuda.sol";

contract SacudaTest is Test {
    Sacuda public sacuda;
    function setUp() public {
       sacuda = new Sacuda();
       sacuda.setNumber(0);
    }

    function testIncrement() public {
        sacuda.increment();
        assertEq(sacuda.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        sacuda.setNumber(x);
        assertEq(sacuda.number(), x);
    }
}

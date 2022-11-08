// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "forge-std/console.sol";
import "forge-std/Test.sol";
import "../src/Sacuda.sol";

// Alfajores Deployment (v1): 0xe49E6147B6327522ECAc51cc31C95940945AEc08

contract SacudaTest is Test {
    address amy = vm.addr(1);
    address betty = vm.addr(2);
    address caro = vm.addr(3);
    // bytes32 admin;
    // bytes32 minter;

    Sacuda public sacuda;

    function setUp() public {
        sacuda = new Sacuda();
        // minter = sacuda.MINTER_ROLE();
        // admin = sacuda.ADMIN_ROLE();
    }

    function testMint() public {
        sacuda.addAdmin(address(this));
        sacuda.addClerk(caro);
        vm.startPrank(caro);
        sacuda.mint(amy, false, "Amy");
        assertEq(sacuda.ownerOf(1), amy);
        assertEq(sacuda.name(1), "Amy");
        console.log(sacuda.tokenURI(1));
    }

    function testMintEnhancer() public {
        sacuda.addAdmin(address(this));
        sacuda.addClerk(caro);
        vm.startPrank(caro);
        sacuda.mint(caro, true, "Caro");
        assertEq(sacuda.ownerOf(1), caro);
        assertEq(sacuda.name(1), "Caro");
        console.log("User Score: ", sacuda.score(1));
        console.log(sacuda.tokenURI(1));
    }

    function testMintAndUpdateName() public {
        sacuda.addAdmin(address(this));
        sacuda.addClerk(caro);
        vm.startPrank(caro);
        sacuda.mint(amy, false, "Amy");
        assertEq(sacuda.name(1), "Amy");
        console.log(sacuda.tokenURI(1));
        sacuda.updateName(1, "Amelia");
        assertEq(sacuda.name(1), "Amelia");
        console.log(sacuda.tokenURI(1));
    }

    function testUpdateReport() public {
        uint8 num = 75;
        sacuda.addAdmin(address(this));
        sacuda.addClerk(caro);
        vm.startPrank(caro);
        sacuda.mint(betty, false, "Betty");
        (uint8 paymentHistory, , , , ) = sacuda.report(1);
        assertEq(paymentHistory, 100);
        sacuda.updateReport(
            1,
            abi.encode(num, num - 50, num + 10, num - 30, num + 20)
            // 0x000000000000000000000000000000000000000000000000000000000000004b00000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000055000000000000000000000000000000000000000000000000000000000000002d000000000000000000000000000000000000000000000000000000000000005f
        );
        (paymentHistory, , , , ) = sacuda.report(1);
        console.log("User Score: ", sacuda.score(1));
        assertEq(paymentHistory, num);
        console.log(sacuda.tokenURI(1));
    }

    function testBurn() public {
        uint8 num = 75;
        sacuda.addAdmin(address(this));
        sacuda.addClerk(caro);
        vm.startPrank(caro);
        sacuda.mint(amy, false, "Amy");
        assertEq(sacuda.ownerOf(1), amy);
        (uint8 paymentHistory, , , , ) = sacuda.report(1);
        assertEq(paymentHistory, 100);
        assertEq(sacuda.name(1), "Amy");
        sacuda.updateReport(
            1,
            abi.encode(num, num - 50, num + 10, num - 30, num + 20)
        );
        (paymentHistory, , , , ) = sacuda.report(1);
        // console.log("User Score: ", sacuda.score(1));
        assertEq(paymentHistory, num);
        sacuda.burn(1);
        (paymentHistory, , , , ) = sacuda.report(1);
        assertEq(paymentHistory, 0);
        assertEq(sacuda.name(1), "");
    }
}

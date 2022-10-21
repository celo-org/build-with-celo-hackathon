// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.7;

// Importing OpenZeppelin's SafeMath Implementation
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

import "./Rosca.sol";

contract Spaces {
    using SafeMath for uint256;
    using SafeMath for uint;

    //List of all spaces
    Rosca[] public roscas;

    //event for when a new rosca is created
    event CreatedRosca(
        address roscaAddress,
        address roscaCreator,
        RoscaDetails RD
    );

    function createRosca(IERC20 cUSDToken, RoscaDetails memory rD) external {
        Rosca newRosca = new Rosca(cUSDToken, payable(msg.sender), rD);

        roscas.push(newRosca);

        emit CreatedRosca(address(newRosca), msg.sender, rD);
    }

    function returnSpaces() external view returns (Rosca[] memory) {
        return roscas;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @notice Token to manage the AMA green credits "Trees"
 */
contract AMA_TimeTreeToken is ERC20 {
    uint256 planted;
    address payable ownerAddress;

    modifier onlyOwner() {
        require(msg.sender == ownerAddress);
        _;
    }

    constructor(uint256 initialSupply) public ERC20("AMA", "TREE") {
        /// @notice mint 1,000,000 tokens to the owner (AMA) for 1M tree fund
        _mint(msg.sender, initialSupply); //i.e. 1000000e18
        // 18 digit decimals by default
        ownerAddress = payable(msg.sender);
        planted = 0;
    }

    function plantRequest(uint256 amount) public payable returns (bool accepted) {
        require(amount == msg.value, "Invalid amount!");

        planted += msg.value;

        return true;
    }

    function fundBalance() public onlyOwner returns (bool) {
        bool success = ownerAddress.send(address(this).balance);

        if (success) return true;

        return false;
    }
}

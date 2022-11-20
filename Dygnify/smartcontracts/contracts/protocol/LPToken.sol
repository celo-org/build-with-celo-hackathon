// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract LPToken is Initializable, AccessControlUpgradeable, ERC20Upgradeable {
    bytes32 public constant OWNER = keccak256("OWNER");
    uint256 public totalShares;

    function initialize(address _stakingContract) external initializer {
        require(_stakingContract != address(0), "Invalid staking address");
        __ERC20_init("DygnifyX", "DX");
        _setupRole(OWNER, _stakingContract);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(address _to, uint256 amount) public {
        require(hasRole(OWNER, msg.sender), "Caller is not a Owner");
        totalShares = totalShares + amount;
        _mint(_to, amount);
    }

    function burn(address _to, uint256 amount) public {
        require(hasRole(OWNER, msg.sender), "Caller is not a Owner");
        totalShares = totalShares - amount;
        _burn(_to, amount);
    }
}

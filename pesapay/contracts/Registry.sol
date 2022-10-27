// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol";
import "./ERC2771ContextUpgradeable.sol";

contract Registry is Initializable, ERC2771ContextUpgradeable {
    event Registered(address indexed who, string name);

    mapping(address => string) public names;
    mapping(string => address) public owners;

    function initialize(address forwarder) public initializer {
        __ERC2771ContextUpgradeable_init(forwarder);
    }

    function register(string memory name) external {
        require(owners[name] == address(0), "Name taken");
        address owner = _msgSender(); // Changed from msg.sender
        owners[name] = owner;
        names[owner] = name;
        emit Registered(owner, name);
    }

    // The following functions are overrides required by Solidity.

    // function _msgSender()
    //     internal
    //     view
    //     virtual
    //     override(ContextUpgradeable, ERC2771ContextUpgradeable)
    //     returns (address sender)
    // {
    //     return ERC2771ContextUpgradeable._msgSender();
    // }

    // function _msgData()
    //     internal
    //     view
    //     virtual
    //     override(ContextUpgradeable, ERC2771ContextUpgradeable)
    //     returns (bytes calldata)
    // {
    //     return ERC2771ContextUpgradeable._msgData();
    // }
}

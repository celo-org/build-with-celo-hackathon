// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Registry is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    ERC2771ContextUpgradeable
{
    event Registered(address indexed who, string name);

    mapping(address => string) public names;
    mapping(string => address) public owners;

    // constructor() initializer {}

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor()
        ERC2771ContextUpgradeable(0x80CFD5ef82c2286b3c5FA197C0345dabf620ad41)
    {}

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        // ERC2771ContextUpgradeable(0x80CFD5ef82c2286b3c5FA197C0345dabf620ad41);
    }

    function register(string memory name) external {
        require(owners[name] == address(0), "Name taken");
        address owner = _msgSender(); // Changed from msg.sender
        owners[name] = owner;
        names[owner] = name;
        emit Registered(owner, name);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    // The following functions are overrides required by Solidity.

    function _msgSender()
        internal
        view
        virtual
        override(ContextUpgradeable, ERC2771ContextUpgradeable)
        returns (address sender)
    {
        return ERC2771ContextUpgradeable._msgSender();
    }

    function _msgData()
        internal
        view
        virtual
        override(ContextUpgradeable, ERC2771ContextUpgradeable)
        returns (bytes calldata)
    {
        return ERC2771ContextUpgradeable._msgData();
    }
}

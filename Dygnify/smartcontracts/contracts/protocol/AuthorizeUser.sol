// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "./BaseUpgradeablePausable.sol";
import "../interfaces/IAuthorizeUser.sol";
import "./DygnifyConfig.sol";

contract AuthorizeUser is BaseUpgradeablePausable, IAuthorizeUser {
    DygnifyConfig private dygnifyConfig;
    using ConfigHelper for DygnifyConfig;
    bytes32 public constant AUTHORIZE_USER_ROLE = keccak256("AUTHORIZE_USER");
    mapping(address => bool) public authorizedUserList;

    event AuthorizeUserListed(address indexed member);
    event AuthorizeUserNotListed(address indexed member);

    function initialize(DygnifyConfig _dygnifyConfig) public initializer {
        require(
            address(_dygnifyConfig) != address(0),
            "Invalid config address"
        );
        dygnifyConfig = DygnifyConfig(_dygnifyConfig);
        address owner = dygnifyConfig.dygnifyAdminAddress();
        require(owner != address(0), "Invalid Owner");
        _BaseUpgradeablePausable_init(owner);

        _setupRole(AUTHORIZE_USER_ROLE, owner);

        _setRoleAdmin(AUTHORIZE_USER_ROLE, ADMIN_ROLE);
    }

    function addToauthorizedUserList(address _user)
        external
        override
        onlyAuthorizeUserRole
    {
        require(_user != address(0), "User address cannot be empty");
        authorizedUserList[_user] = true;
        emit AuthorizeUserListed(_user);
    }

    function removeFromauthorizedUserList(address _user)
        external
        override
        onlyAuthorizeUserRole
    {
        require(_user != address(0), "User address cannot be empty");
        authorizedUserList[_user] = false;
        emit AuthorizeUserNotListed(_user);
    }

    function isUserAuthorized(address _user)
        external
        view
        override
        returns (bool)
    {
        require(_user != address(0), "User address cannot be empty");
        return authorizedUserList[_user];
    }

    modifier onlyAuthorizeUserRole() {
        require(
            hasRole(AUTHORIZE_USER_ROLE, _msgSender()),
            "Must have AUTHORIZE_USER_ROLE to perform this action"
        );
        _;
    }
}

//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

pragma solidity >=0.8.0;

/************************************** CONTRACT **************************************/

contract Roles is AccessControl, Pausable {
    bytes32 public constant ADDRESS_MANAGER_ROLE = keccak256("ADDRESS_MANAGER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    constructor() 
        Pausable() {

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _grantRole(ADDRESS_MANAGER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);

        _setRoleAdmin(ADDRESS_MANAGER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(MINTER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(PAUSER_ROLE, DEFAULT_ADMIN_ROLE);
    }

    /************************************** ROLES **************************************/

    /******* ADMIN_ROLE *******/
    function grantSuperAdminRole(address account) public whenNotPaused {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        
        grantRole(DEFAULT_ADMIN_ROLE, account);
        grantRole(ADDRESS_MANAGER_ROLE, account);
        grantRole(MINTER_ROLE, account);
        grantRole(PAUSER_ROLE, account);
    }
    
    function revokeSuperAdminRole(address account) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");

        revokeRole(DEFAULT_ADMIN_ROLE, account);
        revokeRole(ADDRESS_MANAGER_ROLE, account);
        revokeRole(MINTER_ROLE, account);
        revokeRole(PAUSER_ROLE, account);
    }

    function isSuperAdmin(address account) public virtual view returns(bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    
    /******* ADDRESS_MANAGER_ROLE *******/
    function grantAddressManagerRole(address account) public whenNotPaused {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(ADDRESS_MANAGER_ROLE, account);
    }

    function revokeAddressManagerRole(address account) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(ADDRESS_MANAGER_ROLE, account);
    }

    function isAddressManager(address account) public virtual view returns(bool) {
        return hasRole(ADDRESS_MANAGER_ROLE, account);
    }

    /******* MINTER_ROLE *******/
    function grantMinterRole(address account) public whenNotPaused {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(MINTER_ROLE, account);
    }

    function revokeMinterRole(address account) public { //onlyRole(ROLES_MANAGER) {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(MINTER_ROLE, account);
    }

    function isMinter(address account) public virtual view returns(bool) {
        return hasRole(MINTER_ROLE, account);
    }

    /******* PAUSER_ROLE *******/
    function grantPauserRole(address account) public whenNotPaused {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(PAUSER_ROLE, account);
    }

    function revokePauserRole(address account) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(PAUSER_ROLE, account);
    }

    function isPauser(address account) public virtual view returns(bool) {
        return hasRole(PAUSER_ROLE, account);
    }


    //----------------------- PAUSER FUNCTIONS -----------------------//

    function pauseContract() public whenNotPaused {
        require(hasRole(PAUSER_ROLE, msg.sender), "Access Denied: Caller is NOT PAUSER!");
        _pause();
    }

    function unpauseContract() public whenPaused {
        require(hasRole(PAUSER_ROLE, msg.sender), "Access Denied: Caller is NOT PAUSER!");
        _unpause();
    }

    //----------------------- KILL FUNCTIONS -----------------------//
    function killRolesContract() public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
		selfdestruct(payable(msg.sender));
	}
}

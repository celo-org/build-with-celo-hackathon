//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

pragma solidity >=0.8.0;

/************************************** CONTRACT **************************************/

contract Roles is AccessControl, Pausable {
    bytes32 public constant ADDITIONAL_ADMIN_ROLE = keccak256("ADDITIONAL_ADMIN_ROLE");

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant ASST_MANAGER_ROLE = keccak256("ASST_MANAGER_ROLE");
    bytes32 public constant UPDATES_MANAGER_ROLE = keccak256("UPDATES_MANAGER_ROLE");
    bytes32 public constant ADDRESS_MANAGER_ROLE = keccak256("ADDRESS_MANAGER_ROLE");
    
    bytes32 public constant ROLES_MANAGER = keccak256("ROLES_MANAGER");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    constructor() 
        Pausable() {

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _grantRole(MANAGER_ROLE, msg.sender);
        _grantRole(ASST_MANAGER_ROLE, msg.sender);
        _grantRole(UPDATES_MANAGER_ROLE, msg.sender);
        _grantRole(ADDRESS_MANAGER_ROLE, msg.sender);
        
        _grantRole(ROLES_MANAGER, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);

        _setRoleAdmin(ADDITIONAL_ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(MANAGER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(ASST_MANAGER_ROLE, MANAGER_ROLE);
        _setRoleAdmin(UPDATES_MANAGER_ROLE, MANAGER_ROLE);
        _setRoleAdmin(ADDRESS_MANAGER_ROLE, MANAGER_ROLE);

        _setRoleAdmin(ROLES_MANAGER, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(MINTER_ROLE, ROLES_MANAGER);
        _setRoleAdmin(PAUSER_ROLE, ROLES_MANAGER);
    }

    /************************************** ROLES **************************************/

    /******* ADMIN_ROLE *******/
    function grantSuperAdminRole(address account) public whenNotPaused {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(DEFAULT_ADMIN_ROLE, account);

        grantRole(MANAGER_ROLE, account);
        grantRole(ASST_MANAGER_ROLE, account);
        grantRole(UPDATES_MANAGER_ROLE, account);
        grantRole(ADDRESS_MANAGER_ROLE, account);

        grantRole(ROLES_MANAGER, account);
        grantRole(MINTER_ROLE, account);
        grantRole(PAUSER_ROLE, account);
    }
    
    function revokeSuperAdminRole(address account) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(DEFAULT_ADMIN_ROLE, account);

        revokeRole(MANAGER_ROLE, account);
        revokeRole(ASST_MANAGER_ROLE, account);
        revokeRole(UPDATES_MANAGER_ROLE, account);
        revokeRole(ADDRESS_MANAGER_ROLE, account);

        revokeRole(ROLES_MANAGER, account);
        revokeRole(MINTER_ROLE, account);
        revokeRole(PAUSER_ROLE, account);
    }

    function isSuperAdmin(address account) public virtual view returns(bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    /******* ADDITIONAL_ADMIN_ROLE *******/
    function grantAdditionalAdminRole(address account) public whenNotPaused { 
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(ADDITIONAL_ADMIN_ROLE, account);

        grantRole(MANAGER_ROLE, account);
        grantRole(ASST_MANAGER_ROLE, account);
        grantRole(UPDATES_MANAGER_ROLE, account);
        grantRole(ADDRESS_MANAGER_ROLE, account);
        
        grantRole(ROLES_MANAGER, account);
        grantRole(MINTER_ROLE, account);
        grantRole(PAUSER_ROLE, account);
    }
    
    function revokeAdditionalAdminRole(address account) public { 
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(ADDITIONAL_ADMIN_ROLE, account);
        
        revokeRole(MANAGER_ROLE, account);
        revokeRole(ASST_MANAGER_ROLE, account);
        revokeRole(UPDATES_MANAGER_ROLE, account);
        revokeRole(ADDRESS_MANAGER_ROLE, account);
        
        revokeRole(ROLES_MANAGER, account);
        revokeRole(MINTER_ROLE, account);
        revokeRole(PAUSER_ROLE, account);
    }

    function isAdditionalAdmin(address account) public virtual view returns(bool) {
         return hasRole(ADDITIONAL_ADMIN_ROLE, account);
    }


    /******* MANAGER_ROLE *******/
    function grantManagerRole(address account) public whenNotPaused {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(MANAGER_ROLE, account);
        grantRole(ASST_MANAGER_ROLE, account);
        grantRole(UPDATES_MANAGER_ROLE, account);
        grantRole(ADDRESS_MANAGER_ROLE, account);
    }

    function revokeManagerRole(address account) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(MANAGER_ROLE, account);
        revokeRole(ASST_MANAGER_ROLE, account);
        revokeRole(UPDATES_MANAGER_ROLE, account);
        revokeRole(ADDRESS_MANAGER_ROLE, account);
    }

    function isManager(address account) public virtual view returns(bool) {
        return hasRole(MANAGER_ROLE, account);
    }

    /******* ASST_MANAGER_ROLE *******/
    function grantAsstManagerRole(address account) public whenNotPaused {
        require(hasRole(MANAGER_ROLE, msg.sender), "Access Denied: Caller is NOT MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(ASST_MANAGER_ROLE, account);
    }

    function revokeAsstManagerRole(address account) public {
        require(hasRole(MANAGER_ROLE, msg.sender), "Access Denied: Caller is NOT MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(ASST_MANAGER_ROLE, account);
    }

    function isAsstManager(address account) public virtual view returns(bool) {
        return hasRole(ASST_MANAGER_ROLE, account);
    }

    /******* ADDRESS_MANAGER_ROLE *******/
    function grantAddressManagerRole(address account) public whenNotPaused {
        require(hasRole(MANAGER_ROLE, msg.sender), "Access Denied: Caller is NOT MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(ADDRESS_MANAGER_ROLE, account);
    }

    function revokeAddressManagerRole(address account) public {
        require(hasRole(MANAGER_ROLE, msg.sender), "Access Denied: Caller is NOT MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(ADDRESS_MANAGER_ROLE, account);
    }

    function isAddressManager(address account) public virtual view returns(bool) {
        return hasRole(ADDRESS_MANAGER_ROLE, account);
    }

    /******* UPDATES_MANAGER_ROLE *******/
    function grantUpdatesManagerRole(address account) public whenNotPaused {
        require(hasRole(MANAGER_ROLE, msg.sender), "Access Denied: Caller is NOT MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(UPDATES_MANAGER_ROLE, account);
    }

    function revokeUpdatesManagerRole(address account) public {
        require(hasRole(MANAGER_ROLE, msg.sender), "Access Denied: Caller is NOT MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(UPDATES_MANAGER_ROLE, account);
    }

    function isUpdatesManager(address account) public virtual view returns(bool) {
        return hasRole(UPDATES_MANAGER_ROLE, account);
    }


    /******* ROLES_MANAGER *******/
    function grantRolesManagerRole(address account) public whenNotPaused { 
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(ROLES_MANAGER, account);
    }

    function revokeRolesManagerRole(address account) public { 
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(ROLES_MANAGER, account);
    }

    function isRolesManager(address account) public virtual view returns(bool) {
        return (hasRole(ROLES_MANAGER, account));
    }

    /******* MINTER_ROLE *******/
    function grantMinterRole(address account) public whenNotPaused {
        require(hasRole(ROLES_MANAGER, msg.sender), "Access Denied: Caller is NOT ROLES MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(MINTER_ROLE, account);
    }

    function revokeMinterRole(address account) public { //onlyRole(ROLES_MANAGER) {
        require(hasRole(ROLES_MANAGER, msg.sender), "Access Denied: Caller is NOT ROLES MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(MINTER_ROLE, account);
    }

    function isMinter(address account) public virtual view returns(bool) {
        return hasRole(MINTER_ROLE, account);
    }

    /******* PAUSER_ROLE *******/
    function grantPauserRole(address account) public whenNotPaused {
        require(hasRole(ROLES_MANAGER, msg.sender), "Access Denied: Caller is NOT ROLES MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        grantRole(PAUSER_ROLE, account);
    }

    function revokePauserRole(address account) public {
        require(hasRole(ROLES_MANAGER, msg.sender), "Access Denied: Caller is NOT ROLES MANAGER!");
        require(account != address(0), "Account: Zero or Invalid address!");
        revokeRole(PAUSER_ROLE, account);
    }

    function isPauser(address account) public virtual view returns(bool) {
        return hasRole(PAUSER_ROLE, account);
    }


    //----------------------- PAUSER FUNCTIONS -----------------------//

    function pauseContract() public whenNotPaused {
        require(hasRole(PAUSER_ROLE, msg.sender), "Access Denied: Caller is NOT PAUSER!");
        //require(isPauser(msg.sender), "Access Denied: Caller is NOT Pauser!");
        _pause();
    }

    function unpauseContract() public whenPaused {
        require(hasRole(PAUSER_ROLE, msg.sender), "Access Denied: Caller is NOT PAUSER!");
        //require(isPauser(msg.sender), "Access Denied: Caller is NOT Pauser!");
        _unpause();
    }

    //----------------------- KILL FUNCTIONS -----------------------//
    function killRolesContract() public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
        //require(isSuperAdmin(msg.sender), "Access Denied: Caller is NOT SUPER ADMIN!");
		selfdestruct(payable(msg.sender));
	}
}

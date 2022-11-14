// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface RolesI {
    function isSuperAdmin(address account) external view returns(bool);
    function isAddressManager(address account) external view returns(bool);
    function isMinter(address account) external view returns(bool);
    function isPauser(address account) external view returns(bool);
}

contract SUStaianablilityTokens is ERC20, ERC20Burnable, Pausable, AccessControl {

    address private rolesSC;

    event MintEvent(address, uint256);

    constructor(address _rolesContractAddress) ERC20("SUStaianable Tokens", "SUST") {
        rolesSC = _rolesContractAddress;
    }

    function mintSUST(address to, uint256 amount) public { //onlyRole(MINTER_ROLE) {
        require(RolesI(rolesSC).isMinter(msg.sender), "Access Denied: Caller is NOT Minter!");
        _mint(to, amount);

        emit MintEvent(to, amount);   
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    //----------------------- SET ADDRESS FUNCTIONS -----------------------//

    function setRolesContractAddress(address _rolesSC) public whenNotPaused {
        require(RolesI(rolesSC).isAddressManager(msg.sender), "Access Denied: Caller is NOT Address Manager!");
        require(_rolesSC != address(0), "Account: Zero or Invalid address!");
        rolesSC = _rolesSC;
    }

    //----------------- PAUSER FUNCTION ----------------//

    function pauseContract() public whenNotPaused {
        require(RolesI(rolesSC).isPauser(msg.sender), "Access Denied: Caller is NOT Pauser!");
        _pause();
    }

    function unpauseContract() public whenPaused {
        require(RolesI(rolesSC).isPauser(msg.sender), "Access Denied: Caller is NOT Pauser!");
        _unpause();
    }

//----------------- KILL FUNCTION ----------------//

    function killCarbonCreditsERC20() public whenNotPaused {
		require(RolesI(rolesSC).isSuperAdmin(msg.sender), "Access Denied: Caller is NOT a SUPER ADMIN!");
		selfdestruct(payable(msg.sender));
	}
}

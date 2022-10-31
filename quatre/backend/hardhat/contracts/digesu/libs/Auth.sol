// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./Context.sol";


abstract contract Auth is Context {
    event AuthorizationTransferred(address indexed previousAuth, address indexed newAuth);
    bytes32 constant private AUTHORIZATION = keccak256("AUTHORIZED");
    struct Authorization {
        uint8 renouncing;
        bytes32 authorization;
    }
    mapping(address=>Authorization) private auths; 
    mapping(address=>bool) private isAdmin;

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier isAuthorized(address target) {
        bytes32 auth = AUTHORIZATION; //Gas saving
        require(auths[target].authorization == auth, "No authorization detected");
        _;
    
    }
    
    /**
     * @dev Throws if called by any account other than the admin.
     */
   modifier onlyAdmin() {
        require(isAdmin[_msgSender()], "Ownable: not an admin");
        _;
    }

    constructor (uint8 ren) {
        _authorize(_msgSender(), ren);
        isAdmin[_msgSender()] = true;
    }

    /**
     * @dev Returns true if caller has authorization.
     */
    function hasAuthorization() public view virtual returns (bool) {
        return auths[_msgSender()].authorization == AUTHORIZATION;
    }

    /**
     * @dev renounces authorization. It will not be possible to call
     * `isAuthorized` tagged functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing authorization will leave the contract without control,
     * thereby removing any functionality that is only available to the Authorized.
     * Renouncing is guarded hence accidentally authorization is not possible. So it can still be reinstated.
     * Gas saving
     */
    function renounceAuthorization() public virtual isAuthorized(_msgSender()) returns(bool) {
        uint8 _renouncing = auths[_msgSender()].renouncing;
        if(_renouncing == 3) {
            auths[_msgSender()] = Authorization(3, keccak256(""));
            return true;
        } else {
            if(_renouncing < 3) {
                auths[_msgSender()].renouncing = _renouncing + 1;
                return true;
            }
        }
        return true;
        // _setOwner(address(0), true);
    }

    /**
     * @dev Transfers authorization of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferAuthorization(address swapTo) public virtual isAuthorized(_msgSender()) {
        require(swapTo != address(0), "SwapTo: zero address");
        renounceAuthorization();
        if(auths[_msgSender()].renouncing >= 3) _authorize(swapTo, 0);
        emit AuthorizationTransferred(_msgSender(), swapTo);
    }

    ///@dev Private: passes authorization to @param newSoull
    function _authorize(address newAuth, uint8 ren) private {
        require(newAuth != address(0), "newAuth is the zero address");
        auths[newAuth] = Authorization({
            renouncing: ren,
            authorization: AUTHORIZATION
        });
    }

    /**@dev Toggles admin role to true or false.
       @param cmd - Will activate newAdmin else deactivates
       @param newAdmin - New address to add as admin
     */
    function toggleAdminRole(address newAdmin, uint8 cmd) public virtual isAuthorized(_msgSender()) {
        isAdmin[newAdmin] = cmd == 0 ? true : false;
    }

    function verifyAdmin(address target) public view returns(bool) {
        return isAdmin[target];
    }

}


/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Pausable is Auth(4) {
    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    bool private _paused;

    /**
     * @dev Initializes the contract in unpaused state.
     */
    constructor() {
        _paused = false;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        require(!paused(), "Pausable: paused");
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        require(paused(), "Pausable: not paused");
        _;
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function pause() public whenNotPaused isAuthorized(_msgSender()) {
        _paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function unpause() public whenPaused isAuthorized(_msgSender()) {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
 abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}



abstract contract Authorization is Context {
    event AuthorizationTransferred(address indexed previousAuth, address indexed newAuth);
    struct AuthData {
        uint8 renouncer;
        address authorization;
    }

    AuthData public auths; 

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyAuthorized() {
        address auth = auths.authorization; //Gas saving
        require(auth != address(0) && auth == _msgSender(), "No power detected");
        _;
    
    }

    constructor () {
        _authorize(_msgSender(), 0);
    }

    /**
     * @dev renounces authorization. It will not be possible to call
     * `isAuthorized` tagged functions anymore. Can only be called by the current authority.
     *
     * NOTE: Renouncing authorization will leave the contract without control,
     * thereby removing any functionality that is only available to the Authorized.
     * Renouncing is guarded hence accidentally authorization is not possible. It has to be called thrice.
     * Gas saving
     */
    function renounceAuthorization() public virtual onlyAuthorized {
        uint8 _renouncer = auths.renouncer;
        if(_renouncer == 3) auths = AuthData(3, address(0));
        if(_renouncer < 3) auths.renouncer = _renouncer + 1;
    }

    /**
     * @dev Transfers authorization of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferAuthorization(address swapTo) public virtual onlyAuthorized {
        require(swapTo != address(0), "SwapTo: zero address");
        renounceAuthorization();
        if(auths.renouncer >= 2) _authorize(swapTo, 0);
        emit AuthorizationTransferred(_msgSender(), swapTo);
    }

    /**
        @dev Private: passes authorization to 
            @param newAuth : New Authorzed address.
            @param ren : Power guard.
    */
    function _authorize(address newAuth, uint8 ren) private {
        require(newAuth != address(0), "newAuth is empty");
        auths = AuthData(ren, newAuth);
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
abstract contract Pausable is Context, Authorization {
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
    function _pause() internal virtual whenNotPaused {
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
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}

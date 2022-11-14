// SPDX-License-Identifier: MIT


pragma solidity 0.8.9;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

     /** @dev Moves token of an 'amount' to the locked
    */
    function lockSpecific(address routeTo, uint256 inValue, uint16 lockTil) external;

    /** @dev Locks `amount` for `target` for subscription purpose
    */
    function lockFor(address target, uint amount) external;

    /** @dev unlocks `amount` for `target` for subscription purpose
    */
    function unlockFor(
        address from,
        address to,
        uint mintable,
        uint amountTo,
        uint amount
    ) external;


    /** @dev Moves 'amount' to regular balance
        @param amount - Amount to unloc.
     */
    function unlockSpecific(uint amount) external ;

    /** @dev Return who's balances
        @param who - Account to enquire for.
     */
    function accountBalances(address who) external view returns(AccountBalances memory);
   
    /**@dev Return QFT's Metadata including the information of `who`.
     */
    function tokenData(address who) external view returns(MetaData memory, Holders memory);

    /// @notice Unlocks and transfer at the same time .
    function unlockAndTransfer(
        address from,
        address to,
        uint amount
    ) external;
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
      * @dev structured data for holding user's balance
    */
    struct Holders {
        uint256 main;
        SelfLocked locked;
        Subscription sub;
    }

    struct SelfLocked {
        uint32 lockTil;
        uint256 value;
        address routeTo;
    }

    struct Subscription {
        uint256 value;
    }

    struct AccountBalances {
        uint256 spendable;
        uint256 locked;
        uint256 inSubScription;
    }

    struct Share {
        uint8 idleTimeInDays;
        uint32 lastLockedDate;
        uint256 reward;
    }

    // READONLY : Standard API for reading QFT metadata 
    struct MetaData {
        uint rewardRate;
        uint256 tSupply;
        bool shareActive;
        string name;
        string symbol;
        address digesuAddr;
    }

    struct AutoIncentive {
        uint256 budget;
    }

    struct LockParam {
        address who; 
        address routeTo; 
        uint256 inValue; 
        uint16 lockTil; 
        bool cmd;
    }

    struct UnlockParam {
        address who;
        uint256 reqAmt;
        bool cmd;
    }


}
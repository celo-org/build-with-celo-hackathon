// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC20/utils/TokenTimelock.sol)

pragma solidity 0.8.9;

import "./SafeERC20.sol";
import "../libs/Ownable.sol";
import "../libs/ReentrancyGuard.sol";

/**
 * @dev A token holder contract that will allow beneficiaries to extract the
 * tokens after a given release time.
 *
 * Useful for simple vesting schedules like "advisors get all of their tokens
 * after 1 year".
 */
contract AdjustableTimelock is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Data containing amount with timestamp when token release is enabled
    struct Data {
        uint split;
        uint nextRelease;
        uint interval;
        uint256 balance;
        uint firstWithdraw;
        bool exist;
    }

    // ERC20 basic token contract being held
    IERC20 public immutable token;

    // beneficiaries of tokens after they are released
    mapping (address=>Data) private _beneficiaries;

    
    /**
     * @dev Deploys a timelock instance that is able to hold the token specified, and will only release it to
     * `beneficiary_` when {release} is invoked after `releaseTime_`. The release time is specified as a Unix timestamp
     * (in seconds).
     */
    constructor( IERC20 _token) {
        // require(releaseTime_ > block.timestamp, "TokenTimelock: release time is before current time");
        token = _token;
    }

    /**
     * @dev Returns the data of the beneficiary 'who' if they exist on the ledger.
     */
    function beneficiary(address who) public view virtual returns (Data memory data) {
        data = _beneficiaries[who];
    }

    /**
     * @dev Transfers tokens held by the timelock to the beneficiary. Will only succeed if invoked after the release
     * time.
     */
    function withdraw() public nonReentrant {
        Data memory _d = _beneficiaries[_msgSender()];
        require(_d.exist, "User not exist");
        uint amount;
        if(_d.firstWithdraw > 0) {
            require(_now() >= _d.nextRelease,"Not yet time.");
            _beneficiaries[_msgSender()].firstWithdraw = 0;
            amount = _d.firstWithdraw;
            _beneficiaries[_msgSender()].nextRelease = _now() + _d.interval;
        } 

        if(_d.firstWithdraw == 0 && _d.balance > 0){
            require(_now() >= _d.nextRelease, "TokenTimelock: current time is before release time");
            _beneficiaries[_msgSender()].nextRelease = _now() + _d.interval;
            if(_d.balance >= _d.split) {
                _beneficiaries[_msgSender()].balance = _d.balance - _d.split;
                amount = _d.split;
            }

            if(_d.split > 0 && _d.split < _d.balance) {
                delete _beneficiaries[_msgSender()];
                amount = _d.balance;
            }

        }

        uint256 tokenBalance = token.balanceOf(address(this));
        require(tokenBalance > 0 && tokenBalance >= amount, "TokenTimelock: no tokens to release");

        token.safeTransfer(_msgSender(), amount);
    }

    function setBeneficiary(
        address who, 
        uint16 nextReleaseInDays,
        uint16 intervalInDays,
        uint firstWithdraw,
        uint balance,
        uint subsequentSplit
    ) external onlyOwner returns(bool) {
        require(nextReleaseInDays > 0, "Invalid timing");
        _beneficiaries[who] = Data(
            subsequentSplit,
            _now() + nextReleaseInDays * 1 days,
            intervalInDays * 1 days,
            balance,
            firstWithdraw,
            true
        );
        return true;
    }

    function _now() internal view returns(uint32 currentTime) {
        currentTime = uint32(block.timestamp);
    }
}

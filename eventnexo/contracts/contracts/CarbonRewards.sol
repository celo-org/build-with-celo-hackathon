// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./interface/ICarbonizedCollection.sol";
import "./interface/ICarbonRewards.sol";

/// @title CarbonRewards
/// @author Bridger Zoske
/// @notice This contract stores and distributes rewards to CarbonizedCollection holders
/// @dev This contract was modeled after the Synthetix "StakingRewards" contract.
/// An important difference is the exposed 'updateReward' function used to keep the reward
/// data up to date when state changes.
contract CarbonRewards is
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    OwnableUpgradeable,
    ICarbonRewards
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    /* ========== STATE VARIABLES ========== */

    IERC20Upgradeable public rewardsToken;
    uint256 public periodFinish;
    uint256 public rewardRate;
    uint256 public rewardsDuration;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    address public rewardsDistributor;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    ICarbonizedCollection public carbonCollection;

    mapping(address => bool) public whiteList;
    bool public onlyWhitelist;

    /* ========== INITIALIZER ========== */
    function initialize(address _rewardsDistributor, address _rewardsToken)
        external
        virtual
        initializer
    {
        __Ownable_init();
        __Pausable_init();
        rewardsToken = IERC20Upgradeable(_rewardsToken);
        rewardsDistributor = _rewardsDistributor;
        periodFinish = 0;
        rewardRate = 0;
        rewardsDuration = 180 days;
        onlyWhitelist = true;
    }

    /* ========== VIEWS ========== */

    function balanceOf(address account) external view returns (uint256) {
        return carbonCollection.carbonBalance(account);
    }

    function lastTimeRewardApplicable() public view returns (uint256) {
        return block.timestamp < periodFinish ? block.timestamp : periodFinish;
    }

    function rewardPerToken() public view returns (uint256) {
        if (carbonCollection.totalCarbon() == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            (((lastTimeRewardApplicable() - lastUpdateTime) *
                rewardRate *
                1e18) / carbonCollection.totalCarbon());
    }

    function earned(address account) public view returns (uint256) {
        return (((carbonCollection.carbonBalance(account) *
            (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
            rewards[account]);
    }

    function getRewardForDuration() external view returns (uint256) {
        return rewardRate * rewardsDuration;
    }

    function isWhitelist() external view returns (bool) {
        return whiteList[msg.sender];
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function getReward() public nonReentrant _updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardsToken.safeTransfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function notifyRewardAmount(uint256 reward)
        external
        onlyRewardsDistributor
        _updateReward(address(0))
    {
        // handle the transfer of reward tokens via `transferFrom` to reduce the number
        // of transactions required and ensure correctness of the reward amount
        rewardsToken.safeTransferFrom(msg.sender, address(this), reward);

        if (block.timestamp >= periodFinish) {
            rewardRate = reward / rewardsDuration;
        } else {
            uint256 remaining = periodFinish - block.timestamp;
            uint256 leftover = remaining * rewardRate;
            rewardRate = (reward + leftover) / rewardsDuration;
        }

        lastUpdateTime = block.timestamp;
        periodFinish = block.timestamp + rewardsDuration;

        emit RewardAdded(reward);
    }

    function recoverERC20(address tokenAddress, uint256 tokenAmount)
        external
        onlyOwner
    {
        require(
            tokenAddress != address(carbonCollection),
            "Cannot withdraw the staking token"
        );
        IERC20Upgradeable(tokenAddress).safeTransfer(owner(), tokenAmount);
        emit Recovered(tokenAddress, tokenAmount);
    }

    function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner {
        require(
            block.timestamp > periodFinish,
            "Rewards period must be inactive"
        );
        rewardsDuration = _rewardsDuration;
        emit RewardsDurationUpdated(rewardsDuration);
    }

    function updateActiveRewardsDuration(uint256 _rewardsDuration)
        external
        onlyRewardsDistributor
        _updateReward(address(0))
    {
        require(
            block.timestamp < periodFinish,
            "CarbonStaking: Reward period not active"
        );
        require(
            _rewardsDuration > 0,
            "CarbonStaking: Reward duration must be non-zero"
        );

        uint256 currentDuration = rewardsDuration;

        uint256 oldRemaining = periodFinish - block.timestamp;

        if (_rewardsDuration > currentDuration)
            periodFinish += _rewardsDuration - currentDuration;
        else periodFinish -= currentDuration - _rewardsDuration;

        require(
            periodFinish > block.timestamp,
            "CarbonStaking: new reward duration is expired"
        );

        uint256 leftover = oldRemaining * rewardRate;
        uint256 newRemaining = periodFinish - block.timestamp;
        rewardRate = leftover / newRemaining;

        rewardsDuration = _rewardsDuration;

        emit RewardsDurationUpdated(rewardsDuration);
    }

    function setRewardsDistribution(address _rewardsDistributor)
        external
        onlyOwner
    {
        rewardsDistributor = _rewardsDistributor;
    }

    function setCarbonCollection(address _carbonCollection) external onlyOwner {
        carbonCollection = ICarbonizedCollection(_carbonCollection);
    }

    function whiteListAccount(address account) public onlyOwner {
        whiteList[account] = true;
    }

    function openWhitelist() public onlyOwner {
        onlyWhitelist = true;
    }

    function closeWhitelist() public onlyOwner {
        onlyWhitelist = false;
    }

    function updateReward(address account)
        public
        override
        _updateReward(account)
    {}

    /* ========== MODIFIERS ========== */

    modifier _updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable();
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    modifier onlyRewardsDistributor() {
        require(
            msg.sender == rewardsDistributor,
            "Caller is not RewardsDistributor"
        );
        _;
    }

    /* ========== EVENTS ========== */

    event RewardAdded(uint256 reward);
    event Staked(address indexed user, uint256 tokenId);
    event Withdrawn(address indexed user, uint256 tokenId);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardsDurationUpdated(uint256 newDuration);
    event Recovered(address token, uint256 amount);
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title Dygnify Staking
/// @author DNyanesh Warade
/// @notice This contract creates a dygnify staking dApp that rewards users for
///         locking up their USDC stablecoin with Dygnify 

contract DygnifyStaking  is ERC20 {
    // userAddress => stakingBalance
    mapping(address => uint256) public stakingBalance;
    // userAddress => isStaking boolean
    mapping(address => bool) public isStaking;
    // userAddress => timeStamp
    mapping(address => uint256) public startTime;
    // userAddress => yieldBalance
    mapping(address => uint256) public usdcYield;

    string public contractName = "Dygnify Staking";
    address public owner;
    IERC20 public usdcToken;
    uint public APR; 

    event Stake(address indexed from, uint256 amount);
    event Unstake(address indexed from, uint256 amount);
    event YieldWithdraw(address indexed to, uint256 amount);

    constructor(IERC20 _usdcToken, uint _APR) ERC20("DygnifyX", "DGNFYX") {
        usdcToken = _usdcToken;
        owner = msg.sender;
        APR = _APR;
    }

    modifier onlyOwner{
        require(msg.sender == owner, "Only owner can execute");
        _;
    }

    function changeAPR(uint _APR) onlyOwner public{
        APR = _APR;
    }

    /// @notice Locks the user's USDC within the contract
    /// @dev If the user already staked USDC, then calculate the previous yeild first
    /// @param amount Quantity of USDC the user wishes to lock in the contract
    function stake(uint256 amount) public {
        require(
            amount > 0 && usdcToken.balanceOf(msg.sender) >= amount,
            "You cannot stake zero tokens"
        );

        if (isStaking[msg.sender] == true) {
            uint256 toTransfer = calculateYieldTotal(msg.sender);
            usdcYield[msg.sender] += toTransfer;
        }
        
        // transfer(msg.sender, amount);
        _mint(msg.sender, amount);
        usdcToken.transferFrom(msg.sender, address(this), amount);
        stakingBalance[msg.sender] += amount;
        startTime[msg.sender] = block.timestamp;
        isStaking[msg.sender] = true;
        emit Stake(msg.sender, amount);
    }

    /// @notice Retrieves funds locked in contract and sends them back to user
    /// @dev The yieldTransfer variable transfers the calculatedYieldTotal result to usdcYield
    ///      in order to save the user's unrealized yield
    /// @param amount The quantity of USDC the user wishes to receive
    function unstake(uint256 amount) public {
        require(
            isStaking[msg.sender] =
                true &&
                stakingBalance[msg.sender] >= amount,
            "Nothing to unstake/unstake amount is higher than staked amount"
        );

        uint256 yieldTransfer = calculateYieldTotal(msg.sender);
        startTime[msg.sender] = block.timestamp;
        uint256 balTransfer = amount;
        amount = 0;
        stakingBalance[msg.sender] -= balTransfer;
        _burn(msg.sender, balTransfer);
        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
            usdcToken.transfer(msg.sender, balTransfer + usdcYield[msg.sender] + yieldTransfer);
            usdcYield[msg.sender] = 0;
        } else {
            usdcToken.transfer(msg.sender, balTransfer);
            usdcYield[msg.sender] += yieldTransfer;
        }

        emit Unstake(msg.sender, balTransfer);
    }

    /// @notice Helper function for determining how long the user staked
    /// @dev Kept visibility public for testing
    /// @param user The user
    function calculateYieldTime(address user) public view returns (uint256) {
        uint256 end = block.timestamp;
        uint256 totalTime = end - startTime[user];
        return totalTime;
    }

    /// @notice Calculates the user's yield while using a 31536000 second rate (for 100% returns in 24 hours)
    /// @dev Solidity does not compute fractions or decimals; therefore, time is multiplied by 10e18
    ///      before it's divided by the rate. rawYield thereafter divides the product back by 10e18
    /// @param user The address of the user
    function calculateYieldTotal(address user) public view returns (uint256) {
        uint256 time = calculateYieldTime(user) * (10**18);
        uint256 rate = 31536000*APR;
        uint256 timeRate = time / rate;
        uint256 rawYield = (stakingBalance[user] * timeRate) / (10**18);
        return rawYield;
    }

    /// @notice Transfers accrued USDC yield to the user
    /// @dev The if conditional statement checks for a stored USDC balance. If it exists, the
    ///      the accrued yield is added to the accruing yield before the USDC mint function is called
    function withdrawYield() public {
        uint256 toTransfer = calculateYieldTotal(msg.sender);

        require(
            toTransfer > 0 || usdcYield[msg.sender] > 0,
            "Nothing to withdraw"
        );

        if (usdcYield[msg.sender] != 0) {
            uint256 oldBalance = usdcYield[msg.sender];
            usdcYield[msg.sender] = 0;
            toTransfer += oldBalance;
        }

        startTime[msg.sender] = block.timestamp;
        usdcToken.transfer(msg.sender, toTransfer);
        emit YieldWithdraw(msg.sender, toTransfer);
    }

    /// @notice Get total accrued USDC yield to the user
    /// @dev At any point in time if user wants to see their total accumulated yeild
    function getTotalYield() public view returns (uint256) {
        uint256 currentYield = calculateYieldTotal(msg.sender);

        return usdcYield[msg.sender] + currentYield;
    }

    function withdrawTo(uint256 amount, address _receiver) onlyOwner public {
        require(
                usdcToken.balanceOf(address(this)) >= amount,
                "Insufficient Balance"
        );
        usdcToken.transfer( _receiver, amount);
    } 
}
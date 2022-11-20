// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./LPToken.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "./DygnifyConfig.sol";
import "./BaseUpgradeablePausable.sol";
import "./OpportunityOrigination.sol";
import "./OpportunityPool.sol";

/// @title SeniorPool
/// @author DNyanesh Warade
/// @notice This contract creates a dygnify staking dApp that rewards users for
///         locking up their USDC stablecoin with Dygnify

contract SeniorPool is BaseUpgradeablePausable, UUPSUpgradeable {
    using SafeMathUpgradeable for uint256;
    DygnifyConfig private dygnifyConfig;
    using ConfigHelper for DygnifyConfig;
    OpportunityOrigination private opportunityOrigination;

    struct InvestmentTimestamp {
        uint256 timestamp;
        uint256 amount;
    }

    // userAddress => InvestmentTimestamp
    mapping(address => InvestmentTimestamp[]) private stackingAmount;
    // userAddress => amount available for Withdrawal
    mapping(address => uint256) private availableForWithdrawal;
    // userAddress => isStaking boolean
    mapping(address => bool) public isStaking;
    // userAddress => yieldBalance
    mapping(address => uint256) private usdcYield;

    string public contractName = "Senior Pool";
    IERC20 private usdcToken;
    LPToken private lpToken;
    uint256 public investmentLockinInMonths;
    uint256 public seniorPoolBal;
    uint256 public constant oneday = 60 * 60 * 24;
    uint256 public constant oneMonth = 30 * oneday;
    uint256 public sharePrice;

    struct KYC {
        bool isDoucument;
        bool isLiveliness;
        bool isAddress;
        bool isAML;
        bool imageHash;
        bool result;
    }

    mapping(address => KYC) public kycOf;

    event Stake(address indexed from, uint256 amount);
    event Unstake(address indexed from, uint256 amount);
    event YieldWithdraw(address indexed to, uint256 amount);

    function initialize(DygnifyConfig _dygnifyConfig) public initializer {
        require(
            address(_dygnifyConfig) != address(0),
            "Invalid config address"
        );

        dygnifyConfig = _dygnifyConfig;
        address owner = dygnifyConfig.dygnifyAdminAddress();
        require(owner != address(0), "Invalid Owner");

        opportunityOrigination = OpportunityOrigination(
            dygnifyConfig.getOpportunityOrigination()
        );

        _BaseUpgradeablePausable_init(owner);
        usdcToken = IERC20(dygnifyConfig.usdcAddress());
        lpToken = LPToken(dygnifyConfig.lpTokenAddress());
        investmentLockinInMonths = dygnifyConfig.getSeniorPoolMockinMonths();
        sharePrice = 10**18;
    }

    function _authorizeUpgrade(address newImplementation) internal override {}

    /// @notice Locks the user's USDC within the contract
    /// @dev If the user already staked USDC, then calculate the previous yeild first
    /// @param amount Quantity of USDC the user wishes to lock in the contract
    function stake(uint256 amount) external {
        require(
            amount > 0 && usdcToken.balanceOf(msg.sender) >= amount,
            "You cannot stake zero tokens"
        );

        stackingAmount[msg.sender].push(
            InvestmentTimestamp(block.timestamp, amount)
        );
        isStaking[msg.sender] = true;
        seniorPoolBal = seniorPoolBal + amount;
        usdcToken.transferFrom(msg.sender, address(this), amount);
        address minter = msg.sender;
        uint256 lpTokenAmount = getNumShares(amount);
        lpToken.mint(minter, lpTokenAmount);
        emit Stake(msg.sender, amount);
    }

    function withdrawTo(uint256 amount, address _receiver) public onlyAdmin {
        require(
            usdcToken.balanceOf(address(this)) >= amount,
            "Insufficient Balance"
        );
        seniorPoolBal = seniorPoolBal - amount;
        usdcToken.transfer(_receiver, amount);
    }

    function invest(bytes32 opportunityId) public onlyAdmin {
        require(
            opportunityOrigination.isActive(opportunityId) == true,
            "Opportunity is not active for funding"
        );
        // also need check whether Opportunity is already funded by senior pool.
        address poolAddress = opportunityOrigination.getOpportunityPoolAddress(
            opportunityId
        );
        OpportunityPool opportunityPool = OpportunityPool(poolAddress);
        uint256 amount = opportunityPool.getSeniorTotalDepositable();

        require(amount <= seniorPoolBal, "insufficient Pool balance");
        seniorPoolBal = seniorPoolBal - amount;

        opportunityPool.deposit(1, amount); //hardcoded val of 1 need to be converted into variable
    }

    function withDrawFromOpportunity(bytes32 opportunityId) public onlyAdmin {
        require(
            opportunityOrigination.isRepaid(opportunityId) == true,
            "Opportunity is not repaid by borrower."
        );
        address poolAddress = opportunityOrigination.getOpportunityPoolAddress(
            opportunityId
        );
        OpportunityPool opportunityPool = OpportunityPool(poolAddress);

        uint256 withdrawlAmount = opportunityPool.withdrawAll(1); //hardcoded val of 1 need to be converted into variable

        seniorPoolBal = seniorPoolBal + withdrawlAmount;
        uint256 totalProfit = usdcToLp(opportunityPool.getSeniorProfit());

        uint256 _totalShares = lpToken.totalShares();
        uint256 delta = totalProfit.mul(10**18).div(_totalShares);

        sharePrice = sharePrice.add(delta);
    }

    function lPMantissa() internal pure returns (uint256) {
        return uint256(10)**uint256(18);
    }

    function usdcMantissa() internal pure returns (uint256) {
        return uint256(10)**uint256(6);
    }

    function usdcToLp(uint256 amount) internal pure returns (uint256) {
        return amount.mul(lPMantissa()).div(usdcMantissa());
    }

    function lpToUSDC(uint256 amount) internal pure returns (uint256) {
        return amount.div(lPMantissa().div(usdcMantissa()));
    }

    function getNumShares(uint256 amount) public view returns (uint256) {
        return usdcToLp(amount).mul(lPMantissa()).div(sharePrice);
    }

    function getUSDCAmountFromShares(uint256 lpAmount)
        internal
        view
        returns (uint256)
    {
        return lpToUSDC(lpAmount.mul(sharePrice).div(lPMantissa()));
    }

    function approveUSDC(address user) public onlyAdmin {
        usdcToken.approve(
            user,
            115792089237316195423570985008687907853269984665640564039457584007913129639935
        );
    }

    /// Get the investment overview of the user
    function getUserInvestment()
        external
        view
        returns (uint256 withdrawableAmt, uint256 stakingAmt)
    {
        require(
            isStaking[msg.sender] == true,
            "User has not staked any amount"
        );

        uint256 stakingAmount;
        uint256 withdrawableAmount;
        uint256 lockinTime = investmentLockinInMonths * oneMonth;
        InvestmentTimestamp[] memory arr = stackingAmount[msg.sender];
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i].timestamp + lockinTime <= block.timestamp) {
                withdrawableAmount += arr[i].amount;
            } else {
                stakingAmount += arr[i].amount;
            }
        }

        return (withdrawableAmount, stakingAmount);
    }

    function getDefaultLockinMonths() external view returns (uint256) {
        return investmentLockinInMonths;
    }

    function getTotalStakingBal() internal view returns (uint256) {
        require(
            isStaking[msg.sender] == true,
            "User has not staked any amount"
        );
        uint256 amount;
        InvestmentTimestamp[] memory arr = stackingAmount[msg.sender];
        for (uint256 i = 0; i < arr.length; i++) {
            amount += arr[i].amount;
        }

        return amount;
    }

    // Withdraw of funds in user wallet
    function withdrawWithLP(uint256 amount) external {
        require(
            isStaking[msg.sender] == true && amount > 0,
            "User has not invested in this pool or amount should be greater than 0"
        );

        // calculate the amount available for investment first
        uint256 stakingAmount;
        uint256 lockinTime = investmentLockinInMonths * oneMonth;
        InvestmentTimestamp[] storage arr = stackingAmount[msg.sender];
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i].timestamp + lockinTime <= block.timestamp) {
                availableForWithdrawal[msg.sender] += arr[i].amount;
                delete arr[i];
            } else {
                stakingAmount += arr[i].amount;
            }
        }

        require(
            availableForWithdrawal[msg.sender] >= amount,
            "Withdraw amount is higher than amount available for withdraw"
        );

        availableForWithdrawal[msg.sender] -= amount;

        if (
            getTotalStakingBal() == 0 && availableForWithdrawal[msg.sender] == 0
        ) {
            isStaking[msg.sender] = false;
        }

        // burn the lp token equivalent to amount
        lpToken.burn(msg.sender, amount);

        // Calculate the total USDC based on shareprice
        uint256 usdcAmount = getUSDCAmountFromShares(amount);
        usdcToken.transfer(msg.sender, usdcAmount);
        emit Unstake(msg.sender, amount);
    }
}

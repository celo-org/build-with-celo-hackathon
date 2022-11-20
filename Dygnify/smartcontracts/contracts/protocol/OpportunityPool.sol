// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./LPToken.sol";
import "./DygnifyConfig.sol";
import "./BaseUpgradeablePausable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "./OpportunityOrigination.sol";
import "./Investor.sol";

contract OpportunityPool is BaseUpgradeablePausable, IOpportunityPool {
    DygnifyConfig public dygnifyConfig;
    using ConfigHelper for DygnifyConfig;
    using SafeMathUpgradeable for uint256;
    using SafeERC20 for IERC20;
    using SafeERC20Upgradeable for IERC20;
    OpportunityOrigination public opportunityOrigination;
    Investor public investor;

    IERC20 public usdcToken;
    LPToken public lpToken;

    bytes32 public opportunityID;
    uint8 public loanType;
    uint256 public loanAmount;
    string public opportunityInfo;
    uint256 public loanTenureInDays;
    uint256 public loanInterest;
    uint256 public paymentFrequencyInDays;
    string public collateralDocument;
    uint256 public capitalLoss;
    uint256 public poolBalance;
    uint256 public repaymentStartTime;
    uint256 public repaymentCounter;
    uint256 public totalRepayments;
    uint256 public emiAmount;
    uint256 public amountWithoutEMI;
    uint256 public dailyInterestRate;
    uint256 public totalRepaidAmount;

    uint256 public seniorYieldPerecentage;
    uint256 public juniorYieldPerecentage;
    uint256 public seniorOverduePerecentage;
    uint256 public juniorOverduePerecentage;

    bool public isDrawdownsPaused;

    bytes32 public constant SENIOR_POOL_ROLE = keccak256("SENIOR_POOL_ROLE");
    bytes32 public constant BORROWER_ROLE = keccak256("BORROWER_ROLE");
    bytes32 public constant POOL_LOCKER_ROLE = keccak256("POOL_LOCKER_ROLE");

    // backer's Address => stakingBalance
    mapping(address => uint256) public stakingBalance;
    // backer's Address => isStaking (boolean)
    mapping(address => bool) public isStaking;

    SubpoolDetails public seniorSubpoolDetails;
    SubpoolDetails public juniorSubpoolDetails;

    event Deposited(
        address indexed executor,
        uint8 indexed subpool,
        uint256 amount
    );
    event Withdrew(
        address indexed executor,
        uint8 indexed subpool,
        uint256 amount
    );

    function initialize(
        DygnifyConfig _dygnifyConfig,
        bytes32 _opportunityID,
        string memory _opportunityInfo,
        uint8 _loanType,
        uint256 _loanAmount,
        uint256 _loanTenureInDays,
        uint256 _loanInterest,
        uint256 _paymentFrequencyInDays,
        string memory _collateralDocument,
        uint256 _capitalLoss
    ) external override initializer {
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
        investor = Investor(dygnifyConfig.investorContractAddress());

        _BaseUpgradeablePausable_init(owner);
        usdcToken = IERC20(dygnifyConfig.usdcAddress());
        lpToken = LPToken(dygnifyConfig.lpTokenAddress());
        _setRoleAdmin(SENIOR_POOL_ROLE, ADMIN_ROLE);
        _setRoleAdmin(BORROWER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(POOL_LOCKER_ROLE, ADMIN_ROLE);
        _setupRole(POOL_LOCKER_ROLE, owner);

        opportunityID = _opportunityID;
        opportunityInfo = _opportunityInfo;
        loanType = _loanType;
        loanAmount = _loanAmount;
        loanTenureInDays = _loanTenureInDays;
        loanInterest = _loanInterest;
        paymentFrequencyInDays = _paymentFrequencyInDays;
        collateralDocument = _collateralDocument;
        capitalLoss = _capitalLoss;
        repaymentCounter = 1;

        if (dygnifyConfig.getFlag(_opportunityID) == false) {
            // follow 4x leverage ratio
            seniorSubpoolDetails.isPoolLocked = true;
            uint256 temp = loanAmount.div(dygnifyConfig.getLeverageRatio() + 1);
            seniorSubpoolDetails.totalDepositable = temp.mul(
                dygnifyConfig.getLeverageRatio()
            );
            juniorSubpoolDetails.totalDepositable =
                loanAmount -
                seniorSubpoolDetails.totalDepositable;
        } else {
            juniorSubpoolDetails.isPoolLocked = true;
            seniorSubpoolDetails.totalDepositable = loanAmount;
        }

        uint256 loanTenureInSec = loanTenureInDays * (1 days);
        juniorSubpoolDetails.fundsLockedUntil =
            block.timestamp +
            loanTenureInSec;

        uint256 total_Repayment = loanAmount.add(
            loanAmount.mul(loanInterest.div(100)).div(10**6)
        );
        emiAmount = total_Repayment.div(
            loanTenureInDays.div(paymentFrequencyInDays)
        );
        uint256 effectiveInterest = loanInterest.add(
            dygnifyConfig.getOverDueFee()
        );
        dailyInterestRate = effectiveInterest.div(loanTenureInDays);

        amountWithoutEMI = loanAmount
            .div(loanTenureInDays.div(paymentFrequencyInDays).mul(10**6))
            .mul(10**6);

        totalRepayments = loanTenureInDays.div(paymentFrequencyInDays);

        (seniorYieldPerecentage, juniorYieldPerecentage) = getYieldPercentage();

        (
            seniorOverduePerecentage,
            juniorOverduePerecentage
        ) = getOverDuePercentage();
        bool success = usdcToken.approve(address(this), 2**256 - 1);
        require(success, "Failed to approve USDC");
    }

    function deposit(uint8 _subpoolId, uint256 amount)
        external
        override
        nonReentrant
        whenNotPaused
    {
        require(
            _subpoolId <= uint8(Subpool.SeniorSubpool),
            "SubpoolID : out of range"
        );
        require(amount > 0, "Amount Must be greater than zero");

        if (_subpoolId == uint8(Subpool.SeniorSubpool)) {
            require(
                seniorSubpoolDetails.isPoolLocked == false,
                "Senior Subpool is locked"
            );
            require(
                hasRole(SENIOR_POOL_ROLE, msg.sender),
                "You must have Senior pool role in order to deposit in senior subpool"
            );
            uint256 totalAmountAfterDeposit = amount.add(
                seniorSubpoolDetails.depositedAmount
            );
            require(
                totalAmountAfterDeposit <=
                    seniorSubpoolDetails.totalDepositable,
                "Amount exceeds the Total deposit limit of senior subpool"
            );
            seniorSubpoolDetails.depositedAmount = seniorSubpoolDetails
                .depositedAmount
                .add(amount);
        } else if (_subpoolId == uint8(Subpool.JuniorSubpool)) {
            require(
                juniorSubpoolDetails.isPoolLocked == false,
                "Junior Subpool is locked"
            );
            uint256 totalAmountAfterDeposit = amount.add(
                juniorSubpoolDetails.depositedAmount
            );
            require(
                totalAmountAfterDeposit <=
                    juniorSubpoolDetails.totalDepositable,
                "Amount exceeds the Total deposit limit of junior subpool"
            );
            juniorSubpoolDetails.depositedAmount = juniorSubpoolDetails
                .depositedAmount
                .add(amount);
            
            stakingBalance[msg.sender] = stakingBalance[msg.sender].add(amount);
            isStaking[msg.sender] = true;
            if(investor.isExistInInvestor(msg.sender, opportunityID) == false){
                investor.addOpportunity(msg.sender, opportunityID);
            }
        }

        poolBalance = poolBalance.add(amount);
        usdcToken.safeTransferFrom(msg.sender, address(this), amount);
        emit Deposited(msg.sender, _subpoolId, amount);
    }

    function withdraw(uint8 _subpoolId, uint256 amount)
        public
        nonReentrant
        whenNotPaused
    {
        require(
            _subpoolId <= uint8(Subpool.SeniorSubpool),
            "SubpoolID : out of range"
        );
        require(amount > 0, "Amount Must be greater than zero");

        if (_subpoolId == uint8(Subpool.SeniorSubpool)) {
            require(
                seniorSubpoolDetails.isPoolLocked == false,
                "Senior Subpool is locked"
            );
            require(
                hasRole(SENIOR_POOL_ROLE, msg.sender),
                "You must have Senior pool role in order to deposit in senior subpool"
            );
            require(
                amount <= seniorSubpoolDetails.depositedAmount,
                "Amount exceeds the Total deposited amount of senior subpool"
            );
            seniorSubpoolDetails.depositedAmount = seniorSubpoolDetails
                .depositedAmount
                .sub(amount);
        } else if (_subpoolId == uint8(Subpool.JuniorSubpool)) {
            require(
                juniorSubpoolDetails.fundsLockedUntil <= block.timestamp,
                "funds are lock until Loan Tenure"
            );
            require(
                juniorSubpoolDetails.isPoolLocked == false,
                "Junior Subpool is locked"
            );
            require(
                isStaking[msg.sender] =
                    true &&
                    stakingBalance[msg.sender] >= amount,
                "your withdraw amount is higher than deposited amount."
            );
            require(
                amount <= juniorSubpoolDetails.depositedAmount,
                "Amount exceeds the Total deposited amount of junior subpool"
            );
            juniorSubpoolDetails.depositedAmount = juniorSubpoolDetails
                .depositedAmount
                .sub(amount);
            stakingBalance[msg.sender] = stakingBalance[msg.sender].sub(amount);
            if (stakingBalance[msg.sender] == 0) {
                isStaking[msg.sender] = false;
                investor.removeOpportunity(msg.sender, opportunityID);
            }
        }

        poolBalance = poolBalance.sub(amount);
        usdcToken.safeTransferFrom(address(this), msg.sender, amount);
        emit Withdrew(msg.sender, _subpoolId, amount);
    }

    function drawdown() public nonReentrant whenNotPaused onlyBorrower {
        require(
            opportunityOrigination.isDrawdown(opportunityID) == false,
            "Funds in opportunity are already drawdown."
        );
        require(isDrawdownsPaused == false, "Drawdown is paused");
        require(
            poolBalance == loanAmount,
            "Total Deposited amount in opportunity pool must be equal to loan amount"
        );
        uint256 amount = poolBalance;
        poolBalance = 0;
        juniorSubpoolDetails.depositedAmount = 0;
        seniorSubpoolDetails.depositedAmount = 0;
        repaymentStartTime = block.timestamp;
        opportunityOrigination.markDrawDown(opportunityID);
        usdcToken.safeTransferFrom(address(this), msg.sender, amount);
    }

    function repayment() public nonReentrant whenNotPaused onlyBorrower {
        require(
            repaymentCounter <= totalRepayments,
            "Repayment Process is done"
        );
        require(
            opportunityOrigination.isDrawdown(opportunityID) == true,
            "Funds in opportunity haven't drawdown yet."
        );
        if (repaymentCounter == totalRepayments) {
            opportunityOrigination.markRepaid(opportunityID);
        }
        uint256 amount = emiAmount;
        totalRepaidAmount += emiAmount;
        uint256 currentTime = block.timestamp;
        uint256 currentRepaymentDue = nextRepaymentTime();
        uint256 overDueFee;
        if (currentTime <= currentRepaymentDue) {} else {
            uint256 overDueSeconds = currentTime.sub(currentRepaymentDue).div(
                86400
            );
            overDueFee = overDueSeconds
                .mul(dailyInterestRate.div(100))
                .mul(emiAmount)
                .div(10**6);
        }

        uint256 temp = amountWithoutEMI.div(
            dygnifyConfig.getLeverageRatio().add(1)
        );

        uint256 tempSenior = temp.mul(dygnifyConfig.getLeverageRatio());
        seniorSubpoolDetails.depositedAmount = seniorSubpoolDetails
            .depositedAmount
            .add(tempSenior);
        juniorSubpoolDetails.depositedAmount = juniorSubpoolDetails
            .depositedAmount
            .add(temp);

        //yield distribution

        seniorSubpoolDetails.yieldGenerated = seniorSubpoolDetails
            .yieldGenerated
            .add(seniorYieldPerecentage.mul(tempSenior).div(10**6));

        juniorSubpoolDetails.yieldGenerated = juniorSubpoolDetails
            .yieldGenerated
            .add(juniorYieldPerecentage.mul(temp).div(10**6));

        //overdue Amount distribution

        juniorSubpoolDetails.overdueGenerated = juniorSubpoolDetails
            .overdueGenerated
            .add(juniorOverduePerecentage.mul(overDueFee).div(10**6));
        seniorSubpoolDetails.overdueGenerated = seniorSubpoolDetails
            .overdueGenerated
            .add(seniorOverduePerecentage.mul(overDueFee).div(10**6));

        amount = amount.add(overDueFee);
        poolBalance = poolBalance.add(amount);
        repaymentCounter = repaymentCounter.add(1);

        usdcToken.safeTransferFrom(msg.sender, address(this), amount);
    }

    // this function will withdraw all the available amount of executor including yield and overdue profit
    function withdrawAll(uint8 _subpoolId)
        public
        nonReentrant
        whenNotPaused
        returns (uint256)
    {
        require(
            _subpoolId <= uint8(Subpool.SeniorSubpool),
            "SubpoolID : out of range"
        );
        uint256 amount;

        if (_subpoolId == uint8(Subpool.SeniorSubpool)) {
            require(
                seniorSubpoolDetails.isPoolLocked == false,
                "Senior Subpool is locked"
            );
            require(
                hasRole(SENIOR_POOL_ROLE, msg.sender),
                "You must have Senior pool role in order to deposit in senior subpool"
            );
            require(
                seniorSubpoolDetails.depositedAmount > 0,
                "balance of senior subpool is zero currently"
            );
            require(
                seniorSubpoolDetails.yieldGenerated > 0,
                "yield generated of senior subpool is zero currently"
            );
            amount = seniorSubpoolDetails.depositedAmount.add(
                seniorSubpoolDetails.yieldGenerated
            );

            if (seniorSubpoolDetails.overdueGenerated > 0) {
                amount = amount.add(seniorSubpoolDetails.overdueGenerated);
                seniorSubpoolDetails.overdueGenerated = 0;
            }
            seniorSubpoolDetails.depositedAmount = 0;
            seniorSubpoolDetails.yieldGenerated = 0;
        } else if (_subpoolId == uint8(Subpool.JuniorSubpool)) {
            require(
                juniorSubpoolDetails.isPoolLocked == false,
                "Junior Subpool is locked"
            );
            require(
                isStaking[msg.sender] == true && stakingBalance[msg.sender] > 0,
                "zero amount to deposit."
            );
            require(
                stakingBalance[msg.sender] <=
                    juniorSubpoolDetails.depositedAmount,
                "currently junior subpool don't have Liquidity"
            );
            uint256 yieldGatherd = juniorYieldPerecentage
                .mul(stakingBalance[msg.sender])
                .div(10**6);
            require(
                yieldGatherd <= juniorSubpoolDetails.yieldGenerated,
                "currently junior subpool don't have Liquidity"
            );
            juniorSubpoolDetails.depositedAmount = juniorSubpoolDetails
                .depositedAmount
                .sub(stakingBalance[msg.sender]);
            juniorSubpoolDetails.yieldGenerated = juniorSubpoolDetails
                .yieldGenerated
                .sub(yieldGatherd);

            isStaking[msg.sender] = false;
            stakingBalance[msg.sender] = 0;
            amount = stakingBalance[msg.sender].add(yieldGatherd);

            if (juniorSubpoolDetails.overdueGenerated > 0) {
                uint256 overdueGathered = (
                    juniorOverduePerecentage.mul(stakingBalance[msg.sender])
                ).div(10**6);
                amount = amount.add(overdueGathered);
                juniorSubpoolDetails.overdueGenerated = juniorSubpoolDetails
                    .overdueGenerated
                    .sub(overdueGathered);
            }
            investor.removeOpportunity(msg.sender, opportunityID);
        }

        poolBalance = poolBalance.sub(amount);
        usdcToken.safeTransferFrom(address(this), msg.sender, amount);
        return amount;
    }

    function getRepaymentAmount() public view returns (uint256) {
        require(
            repaymentCounter <= totalRepayments,
            "Repayment Process is done"
        );
        require(
            opportunityOrigination.isDrawdown(opportunityID) == true,
            "Funds in opportunity haven't drawdown yet."
        );

        uint256 amount = emiAmount;
        uint256 currentTime = block.timestamp;
        uint256 currentRepaymentDue = nextRepaymentTime();
        uint256 overDueFee;
        if (currentTime <= currentRepaymentDue) {} else {
            uint256 overDueSeconds = currentTime.sub(currentRepaymentDue).div(
                86400
            );
            overDueFee = overDueSeconds
                .mul(dailyInterestRate.div(100))
                .mul(emiAmount)
                .div(10**6);
        }

        amount = amount.add(overDueFee);
        return amount;
    }

    function getYieldPercentage() public view returns (uint256, uint256) {
        uint256 one = 10**6;
        uint256 _seniorYieldPerecentage = loanInterest
            .div(100)
            .mul(
                one.sub(dygnifyConfig.getDygnifyFee()).sub(
                    dygnifyConfig.getJuniorSubpoolFee()
                )
            )
            .div(10**6);
        uint256 _juniorYieldPerecentage = loanInterest
            .div(100)
            .mul(
                one.sub(dygnifyConfig.getDygnifyFee()).add(
                    dygnifyConfig.getJuniorSubpoolFee().mul(
                        dygnifyConfig.getLeverageRatio()
                    )
                )
            )
            .div(10**6);
        return (_seniorYieldPerecentage, _juniorYieldPerecentage);
    }

    function getOverDuePercentage() public view returns (uint256, uint256) {
        uint256 yield = emiAmount - amountWithoutEMI;

        uint256 juniorInvestment = amountWithoutEMI.div(
            dygnifyConfig.getLeverageRatio() + 1
        );
        uint256 seniorInvestment = juniorInvestment.mul(
            dygnifyConfig.getLeverageRatio()
        );

        uint256 _seniorOverDuePerecentage = (
            seniorInvestment.mul(seniorYieldPerecentage)
        ).div(yield);
        uint256 _juniorOverDuePerecentage = (
            juniorInvestment.mul(juniorYieldPerecentage)
        ).div(yield);
        return (_seniorOverDuePerecentage, _juniorOverDuePerecentage);
    }

    function nextRepaymentTime() public view returns (uint256) {
        require(
            repaymentCounter <= totalRepayments,
            "Repayment Process is done"
        );
        uint256 nextRepaymentDue = repaymentStartTime.add(
            repaymentCounter.mul(1 days * paymentFrequencyInDays)
        );
        return nextRepaymentDue;
    }

    function getSeniorTotalDepositable() external view returns (uint256) {
        return seniorSubpoolDetails.totalDepositable;
    }

    function getSeniorProfit() external view returns (uint256) {
        return
            seniorSubpoolDetails.yieldGenerated +
            seniorSubpoolDetails.overdueGenerated;
    }

    modifier onlyBorrower() {
        require(
            hasRole(BORROWER_ROLE, msg.sender),
            "Must have borrower role to perform this action"
        );
        _;
    }

    modifier onlyPoolLocker() {
        require(
            hasRole(POOL_LOCKER_ROLE, msg.sender),
            "Must have borrower role to perform this action"
        );
        _;
    }

    function lockPool(uint8 _subpoolId) public onlyPoolLocker {
        require(
            _subpoolId <= uint8(Subpool.SeniorSubpool),
            "SubpoolID : out of range"
        );

        if (_subpoolId == uint8(Subpool.SeniorSubpool)) {
            seniorSubpoolDetails.isPoolLocked = true;
        } else if (_subpoolId == uint8(Subpool.JuniorSubpool)) {
            juniorSubpoolDetails.isPoolLocked = true;
        }
    }

    function unLockPool(uint8 _subpoolId) public onlyPoolLocker {
        require(
            _subpoolId <= uint8(Subpool.SeniorSubpool),
            "SubpoolID : out of range"
        );

        if (_subpoolId == uint8(Subpool.SeniorSubpool)) {
            seniorSubpoolDetails.isPoolLocked = false;
        } else if (_subpoolId == uint8(Subpool.JuniorSubpool)) {
            juniorSubpoolDetails.isPoolLocked = false;
        }
    }

    function pauseDrawdown() public onlyAdmin {
        isDrawdownsPaused = true;
    }

    function unpauseDrawdown() public onlyAdmin {
        isDrawdownsPaused = false;
    }
}

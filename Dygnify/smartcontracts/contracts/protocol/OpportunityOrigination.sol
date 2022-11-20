// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./BaseUpgradeablePausable.sol";
import "./DygnifyConfig.sol";
import "../interfaces/IOpportunityPool.sol";
import "../interfaces/IOpportunityOrigination.sol";
import "./CollateralToken.sol";

contract OpportunityOrigination is
    BaseUpgradeablePausable,
    IOpportunityOrigination
{
    DygnifyConfig public dygnifyConfig;
    CollateralToken public collateralToken;
    using ConfigHelper for DygnifyConfig;

    mapping(bytes32 => Opportunity) public opportunityToId;
    mapping(address => bytes32[]) public opportunityOf;
    mapping(bytes32 => bool) public isOpportunity;
    // opportunityID => selected 9 auditors
    mapping(bytes32 => address[9]) underwritersOf;

    mapping(address => bytes32[]) public underwriterToOpportunity;

    // storing all the opportunities in an array.
    bytes32[] public opportunityIds;

    function initialize(DygnifyConfig config) external initializer {
        require(address(config) != address(0), "Invalid config address");
        dygnifyConfig = DygnifyConfig(config);
        address owner = dygnifyConfig.dygnifyAdminAddress();
        require(owner != address(0), "Invalid Owner");
        _BaseUpgradeablePausable_init(owner);
        collateralToken = CollateralToken(
            dygnifyConfig.collateralTokenAddress()
        );
    }

    function getTotalOpportunities() external view override returns (uint256) {
        return opportunityIds.length;
    }

    function getOpportunityOf(address _borrower)
        external
        view
        override
        returns (bytes32[] memory)
    {
        require(address(_borrower) != address(0), "invalid borrower address");
        return opportunityOf[_borrower];
    }

    //Opportunity Creation
    function createOpportunity(
        address _borrower,
        string calldata _opportunityInfo,
        uint8 _loanType,
        uint256 _loanAmount,
        uint256 _loanTenureInDays,
        uint256 _loanInterest,
        uint256 _paymentFrequencyInDays,
        string calldata _collateralDocument,
        uint256 _capitalLoss
    ) external override nonReentrant whenNotPaused {
        // KYC check (add)
        // require(kycOf[msg.sender].isDoucument == kycOf[msg.sender].isLiveliness == kycOf[msg.sender].isAddress == kycOf[msg.sender].isAML == kycOf[msg.sender].imageHash == kycOf[msg.sender].result == true,"Please do your KYC before creating opportunity");

        require(
            _loanType <= uint8(LoanType.TermLoan),
            "LoanType : Out of range"
        );
        require(_loanAmount > 0, "Loan Amount Must be greater than 0");
        require(address(_borrower) != address(0), "invalid borrower address");
        require(_loanInterest > 0, "Loan Interest Must be greater than 0");
        require(_loanTenureInDays > 0, "Loan Tenure Must be greater than 0");
        require(
            _paymentFrequencyInDays > 0,
            "Payment Frequency Must be greater than 0"
        );
        require(_capitalLoss > 0, "Capital Loss Must be greater than 0");

        bytes32 id = keccak256(abi.encodePacked(_collateralDocument));
        require(
            isOpportunity[id] == false,
            "Same collatoral document is been used to create different opportunity."
        );

        Opportunity memory _opportunity;
        _opportunity.opportunityID = id;
        _opportunity.borrower = _borrower;
        _opportunity.opportunityInfo = _opportunityInfo;
        _opportunity.loanType = LoanType(_loanType);
        _opportunity.loanAmount = _loanAmount;
        _opportunity.loanTenureInDays = _loanTenureInDays;
        _opportunity.loanInterest = _loanInterest;
        _opportunity.paymentFrequencyInDays = _paymentFrequencyInDays;
        _opportunity.collateralDocument = _collateralDocument;
        _opportunity.capitalLoss = _capitalLoss;
        _opportunity.createdOn = block.timestamp;

        opportunityToId[id] = _opportunity;
        opportunityOf[_borrower].push(id);
        isOpportunity[id] = true;
        opportunityIds.push(id);
    }

    // In future, this function assign random underwriters to a opportunity ID. currently it only assign 1 underwriter
    function assignUnderwriters(bytes32 _opportunityId, address _underwriter)
        external
        override
        onlyAdmin
        nonReentrant
        whenNotPaused
    {
        require(_underwriter != address(0), "Invalid Address");
        require(
            isOpportunity[_opportunityId] == true,
            "Opportunity ID doesn't exist"
        );
        require(
            opportunityToId[_opportunityId].opportunityStatus ==
                OpportunityStatus.UnderReview,
            "Opportunity is already Judged"
        );
        underwritersOf[_opportunityId][0] = _underwriter;
        underwriterToOpportunity[_underwriter].push(_opportunityId);
    }

    function voteOpportunity(bytes32 _opportunityId, uint8 _status)
        external
        override
        nonReentrant
        whenNotPaused
    {
        require(
            underwritersOf[_opportunityId][0] == msg.sender,
            "You are not an audiitor for this Opportunity."
        );
        require(
            isOpportunity[_opportunityId] == true,
            "Opportunity ID doesn't exist"
        );
        require(
            _status >= uint8(OpportunityStatus.Rejected) &&
                _status <= uint8(OpportunityStatus.Unsure),
            "Status : out of range"
        );
        require(
            opportunityToId[_opportunityId].opportunityStatus ==
                OpportunityStatus.UnderReview,
            "Opportunity is already Judged"
        );
        opportunityToId[_opportunityId].opportunityStatus = OpportunityStatus(
            _status
        );

        if(_status == uint8(OpportunityStatus.Approved) ){
            mintCollateral(_opportunityId);
            createOpportunityPool(_opportunityId);
        }
    }

    function mintCollateral(bytes32 _opportunityId)
        private
    {
        require(
            isOpportunity[_opportunityId] == true,
            "Opportunity ID doesn't exist"
        );
        require(
            opportunityToId[_opportunityId].opportunityStatus ==
                OpportunityStatus.Approved,
            "Opportunity is not approved"
        );
        opportunityToId[_opportunityId].opportunityStatus = OpportunityStatus
            .Collateralized;
        collateralToken.safeMint(
            msg.sender,
            opportunityToId[_opportunityId].collateralDocument
        );
    }

    function createOpportunityPool(bytes32 _opportunityId)
        private
        returns (address pool)
    {
        require(
            opportunityToId[_opportunityId].opportunityStatus ==
                OpportunityStatus.Collateralized,
            "Collateral of the Opportunity is not minted."
        );
        require(
            isOpportunity[_opportunityId] == true,
            "Opportunity ID doesn't exist"
        );

        address poolImplAddress = dygnifyConfig.poolImplAddress();
        pool = deployMinimal(poolImplAddress);
        IOpportunityPool(pool).initialize(
            dygnifyConfig,
            opportunityToId[_opportunityId].opportunityID,
            opportunityToId[_opportunityId].opportunityInfo,
            uint8(opportunityToId[_opportunityId].loanType),
            opportunityToId[_opportunityId].loanAmount,
            opportunityToId[_opportunityId].loanTenureInDays,
            opportunityToId[_opportunityId].loanInterest,
            opportunityToId[_opportunityId].paymentFrequencyInDays,
            opportunityToId[_opportunityId].collateralDocument,
            opportunityToId[_opportunityId].capitalLoss
        );
        opportunityToId[_opportunityId].opportunityPoolAddress = pool;
        opportunityToId[_opportunityId].opportunityStatus = OpportunityStatus
            .Active;
        return pool;
    }

    // Source Credits:
    // https://github.com/OpenZeppelin/openzeppelin-sdk/blob/master/packages/lib/contracts/upgradeability/ProxyFactory.sol
    function deployMinimal(address _logic) internal returns (address proxy) {
        bytes20 targetBytes = bytes20(_logic);
        // solhint-disable-next-line no-inline-assembly
        assembly {
            let clone := mload(0x40)
            mstore(
                clone,
                0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000
            )
            mstore(add(clone, 0x14), targetBytes)
            mstore(
                add(clone, 0x28),
                0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000
            )
            proxy := create(0, clone, 0x37)
        }
        return proxy;
    }

    function markDrawDown(bytes32 id) external override {
        require(isOpportunity[id] == true, "Opportunity ID doesn't exist");
        require(
            opportunityToId[id].opportunityStatus == OpportunityStatus.Active,
            "Opportunity pool is not active"
        );
        require(
            msg.sender == opportunityToId[id].opportunityPoolAddress,
            "Only Opportunity Pool can mark it as drawdown"
        );
        require(
            opportunityToId[id].opportunityPoolAddress != address(0),
            "Opportunity Pool is not created yet"
        );
        opportunityToId[id].opportunityStatus = OpportunityStatus.Drawndown;
    }

    function isDrawdown(bytes32 id) public view returns (bool) {
        require(isOpportunity[id] == true, "Opportunity ID doesn't exist");
        if (
            uint8(opportunityToId[id].opportunityStatus) >=
            uint8(OpportunityStatus.Drawndown)
        ) return true;
        else return false;
    }

    function markRepaid(bytes32 id) external override {
        require(isOpportunity[id] == true, "Opportunity ID doesn't exist");
        require(
            opportunityToId[id].opportunityStatus ==
                OpportunityStatus.Drawndown,
            "Opportunity pool is haven't drawdown yet."
        );
        require(
            msg.sender == opportunityToId[id].opportunityPoolAddress,
            "Only Opportunity Pool can mark it as repaid"
        );
        require(
            opportunityToId[id].opportunityPoolAddress != address(0),
            "Opportunity Pool is not created yet"
        );
        opportunityToId[id].opportunityStatus = OpportunityStatus.Repaid;
    }

    function isRepaid(bytes32 id) public view returns (bool) {
        require(isOpportunity[id] == true, "Opportunity ID doesn't exist");
        if (
            uint8(opportunityToId[id].opportunityStatus) ==
            uint8(OpportunityStatus.Repaid)
        ) return true;
        else return false;
    }

    function isActive(bytes32 id) external view returns (bool) {
        require(isOpportunity[id] == true, "Opportunity ID doesn't exist");
        if (
            uint8(opportunityToId[id].opportunityStatus) ==
            uint8(OpportunityStatus.Active)
        ) return true;
        else return false;
    }

    function getOpportunityPoolAddress(bytes32 id)
        external
        view
        returns (address)
    {
        require(isOpportunity[id] == true, "Opportunity ID doesn't exist");
        require(
            uint8(opportunityToId[id].opportunityStatus) ==
                uint8(OpportunityStatus.Active),
            "Opportunity must be active"
        );
        address poolAddress = opportunityToId[id].opportunityPoolAddress;
        require(
            poolAddress != address(0),
            "Opportunity pool address haven't created yet"
        );
        return poolAddress;
    }

    function getAlltheOpportunitiesOf(address borrower)
        external
        view
        returns (bytes32[] memory)
    {
        require(borrower != address(0), "Invalid Borrower sddress");
        bytes32[] memory opportunities = opportunityOf[borrower];
        return opportunities;
    }

    function getUnderWritersOpportunities(address _underwriter)
        external
        view
        returns (bytes32[] memory)
    {
        require(_underwriter != address(0), "Invalid underwriter sddress");
        bytes32[] memory opportunities = underwriterToOpportunity[_underwriter];
        return opportunities;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface IOpportunityOrigination {
    enum OpportunityStatus {
        UnderReview,
        Rejected,
        Approved,
        Unsure,
        Collateralized,
        Active,
        Drawndown,
        Repaid
    }

    enum LoanType {
        InterestRepaymentsBulletLoan,
        TermLoan
    }

    struct Opportunity {
        bytes32 opportunityID;
        address borrower;
        string opportunityInfo;
        LoanType loanType;
        uint256 loanAmount;
        uint256 loanTenureInDays;
        uint256 loanInterest;
        uint256 paymentFrequencyInDays;
        string collateralDocument;
        uint256 capitalLoss;
        OpportunityStatus opportunityStatus;
        address opportunityPoolAddress;
        uint256 createdOn;
    }

    function getTotalOpportunities() external view returns (uint256);

    function getOpportunityOf(address _borrower)
        external
        view
        returns (bytes32[] memory);

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
    ) external;

    function assignUnderwriters(bytes32 _opportunityId, address _underwriter)
        external;

    function voteOpportunity(bytes32 _opportunityId, uint8 _status) external;

    function markDrawDown(bytes32 id) external;

    function markRepaid(bytes32 id) external;
}

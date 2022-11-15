// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "../protocol/DygnifyConfig.sol";

interface IOpportunityPool {
    enum Subpool {
        JuniorSubpool,
        SeniorSubpool
    }

    struct SubpoolDetails {
        uint256 id;
        uint256 totalDepositable;
        uint256 depositedAmount;
        bool isPoolLocked;
        uint256 fundsLockedUntil;
        uint256 yieldGenerated;
        uint256 overdueGenerated;
    }

    function initialize(
        DygnifyConfig _dygnifyConfig,
        bytes32 _opportunityID,
        string calldata _opportunityInfo,
        uint8 _loanType,
        uint256 _loanAmount,
        uint256 _loanTenureInDays,
        uint256 _loanInterest,
        uint256 _paymentFrequencyInDays,
        string calldata _collateralDocument,
        uint256 _capitalLoss
    ) external;

    function deposit(uint8 _subpoolId, uint256 amount) external;
}



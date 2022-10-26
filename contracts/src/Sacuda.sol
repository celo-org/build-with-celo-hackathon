// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/** @dev Report with percentages of health in each catgegory */
struct CreditReportPercentages {
    uint8 paymentHistory;
    uint8 amountOwed;
    uint8 creditLength;
    uint8 creditMix;
    uint8 newCredit;
}

contract Sacuda is ERC721, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER");
    bytes32 public constant ENHANCER_ROLE = keccak256("ENHANCER");
    bytes32 public constant WOB_ROLE = keccak256("WOMAN_OF_BUSSINESS");

    // bytes32 public constant WOB = keccak256("WOMAN_OF_BUSSINESS");

    uint256 public totalSupply;

    /** @dev Weights for Credit Scores */
    uint8 public paymentHistoryWeight;
    uint8 public amountOwedWeight;
    uint8 public creditLengthWeight;
    uint8 public creditMixWeigth;
    uint8 public newCreditWeight;

    /** @dev Credit Score Storage */
    mapping(uint256 => CreditReportPercentages) public report;

    /** @dev Name Storage */
    mapping(uint256 => string) public name;

    /** Errors */
    error NotAPercentage();

    /** Events */
    event UserReportUpdated(
        uint256 indexed tokenId,
        uint8 paymentHistory,
        uint8 amountOwed,
        uint8 creditLength,
        uint8 creditMix,
        uint8 newCredit
    );
    event WeightsUpdated(
        uint8 paymentHistory,
        uint8 amountOwed,
        uint8 creditLength,
        uint8 creditMix,
        uint8 newCredit
    );

    /** @notice  */
    constructor() ERC721("Sacuda Credit Score", "SACS") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        paymentHistoryWeight = 35;
        amountOwedWeight = 30;
        creditLengthWeight = 15;
        creditMixWeigth = 10;
        newCreditWeight = 10;
    }

    /** @dev Override required by AccessControl/ERC721 */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /** @dev Override to make Tokens non-transferable */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override {
        require(
            (from == address(0) || to == address(0)),
            "Non-Transferable Token"
        );
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    /** @notice Only one non-transferable token per address */
    function mint(address _user, string memory _name)
        external
        onlyRole(MINTER_ROLE)
    {
        require(balanceOf(_user) == 0, "Already Registered");
        uint256 tokenId = ++totalSupply;
        _mint(_user, tokenId);
        name[tokenId] = _name;
    }

    /** @notice Credit Score of the user */
    function score(uint256 _tokenId) public view returns (uint256) {
        CreditReportPercentages storage r = report[_tokenId];
        uint256 userScore = (uint256(r.paymentHistory) *
            uint256(paymentHistoryWeight) +
            uint256(r.amountOwed) *
            uint256(amountOwedWeight) +
            uint256(r.creditLength) *
            uint256(creditLengthWeight) +
            uint256(r.creditMix) *
            uint256(creditLengthWeight) +
            uint256(r.newCredit) *
            uint256(newCreditWeight)) / 100;
        return userScore;
    }

    /** @notice Update User's Credit Report */
    function updateReport(uint256 _tokenId, bytes memory data)
        external
        onlyRole(ADMIN_ROLE)
    {
        CreditReportPercentages memory r;
        (
            r.paymentHistory,
            r.amountOwed,
            r.creditLength,
            r.creditMix,
            r.newCredit
        ) = abi.decode(data, (uint8, uint8, uint8, uint8, uint8));
        if (
            r.paymentHistory > 100 ||
            r.amountOwed > 100 ||
            r.creditLength > 100 ||
            r.creditMix > 100 ||
            r.newCredit > 100
        ) revert NotAPercentage();
        report[_tokenId] = r;
        emit UserReportUpdated(
            _tokenId,
            r.paymentHistory,
            r.amountOwed,
            r.creditLength,
            r.creditMix,
            r.newCredit
        );
    }

    function updateWeights(bytes memory data) external onlyRole(ADMIN_ROLE) {
        (
            uint8 paymentHistory,
            uint8 amountOwed,
            uint8 creditLength,
            uint8 creditMix,
            uint8 newCredit
        ) = abi.decode(data, (uint8, uint8, uint8, uint8, uint8));
        if (
            paymentHistory +
                amountOwed +
                creditLength +
                creditMix +
                newCredit !=
            100
        ) revert NotAPercentage();
        paymentHistoryWeight = paymentHistory;
        amountOwedWeight = amountOwed;
        creditLengthWeight = creditLength;
        creditMixWeigth = creditMix;
        newCreditWeight = newCredit;
        emit WeightsUpdated(
            paymentHistory,
            amountOwed,
            creditLength,
            creditMix,
            newCredit
        );
    }
}

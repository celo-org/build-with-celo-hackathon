// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {TokenURIDescriptor} from "./TokenURIDescriptor.sol";

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
    uint8 public creditMixWeight;
    uint8 public newCreditWeight;

    /** @dev Credit Score Storage */
    mapping(uint256 => CreditReportPercentages) public report;

    /** @dev Name Storage */
    mapping(uint256 => string) public name;

    // /** @dev Is Enhancer Storage */
    // mapping(uint256 => bool) public isEnhancer;

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
    event NameUpdated(uint256 indexed tokenId, string newName);

    /** @notice constructor for contract */
    constructor() ERC721("Sacuda Credit Score", "SACS") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        paymentHistoryWeight = 35;
        amountOwedWeight = 30;
        creditLengthWeight = 15;
        creditMixWeight = 10;
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
    function mint(
        address _user,
        bool _isEnhancer,
        string memory _name
    ) external onlyRole(MINTER_ROLE) {
        require(balanceOf(_user) == 0, "Already Registered");
        uint256 tokenId = ++totalSupply;
        _mint(_user, tokenId);
        // isEnhancer[tokenId] = _isEnhancer;
        if (_isEnhancer) {
            _grantRole(ENHANCER_ROLE, _user);
            report[tokenId].amountOwed = 100; // Trying to set score to 0
        } else {
            _grantRole(WOB_ROLE, _user);
            report[tokenId].paymentHistory = 100;
            // report[tokenId].amountOwed = 0; // Already in 0
            report[tokenId].creditLength = 100;
            report[tokenId].creditMix = 100;
            report[tokenId].newCredit = 100;
            emit UserReportUpdated(tokenId, 100, 0, 100, 100, 100);
        }
        name[tokenId] = _name;
        emit NameUpdated(tokenId, _name);
    }

    /** @dev Override to have on-chain SVG NFTs */
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        // _requireMinted(tokenId); // This gets checked when calling score()
        uint256 scoring = score(tokenId);

        bool isEnhancer = hasRole(ENHANCER_ROLE, ownerOf(tokenId));
        return
            TokenURIDescriptor.tokenURI(
                isEnhancer,
                scoring,
                tokenId,
                name[tokenId],
                super.name(),
                super.symbol()
            );
    }

    /** @notice Credit Score of the user */
    function score(uint256 _tokenId) public view returns (uint256) {
        _requireMinted(_tokenId);
        CreditReportPercentages storage r = report[_tokenId];
        uint256 userScore = (uint256(r.paymentHistory) *
            uint256(paymentHistoryWeight) +
            (100 - uint256(r.amountOwed)) *
            uint256(amountOwedWeight) +
            uint256(r.creditLength) *
            uint256(creditLengthWeight) +
            uint256(r.creditMix) *
            uint256(creditMixWeight) +
            uint256(r.newCredit) *
            uint256(newCreditWeight)) / 100;
        return userScore;
    }

    /** @notice Update username function */
    function updateName(uint256 tokenId, string memory _name)
        external
        onlyRole(MINTER_ROLE)
    {
        _requireMinted(tokenId);
        name[tokenId] = _name;
    }

    /** @notice Update User's Credit Report */
    function updateReport(uint256 _tokenId, bytes memory data)
        external
        onlyRole(ADMIN_ROLE)
    {
        _requireMinted(_tokenId);
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

    /** @notice Update System's Weights for Credit Score */
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
        creditMixWeight = creditMix;
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

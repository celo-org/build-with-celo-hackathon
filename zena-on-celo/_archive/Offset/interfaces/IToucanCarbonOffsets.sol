// SPDX-FileCopyrightText: 2021 Toucan Labs
//
// SPDX-License-Identifier: UNLICENSED

// If you encounter a vulnerability or an issue, please contact <security@toucan.earth> or visit security.toucan.earth
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "../types/CarbonProjectTypes.sol";
import "../types/CarbonProjectVintageTypes.sol";

interface IToucanCarbonOffsets is IERC20Upgradeable, IERC721Receiver {
    function getGlobalProjectVintageIdentifiers()
        external
        view
        returns (string memory, string memory);

    function getAttributes()
        external
        view
        returns (ProjectData memory, VintageData memory);

    function getRemaining() external view returns (uint256 remaining);

    function getDepositCap() external view returns (uint256);

    function retire(uint256 amount) external;

    function retireFrom(address account, uint256 amount) external;

    function mintCertificateLegacy(
        string calldata retiringEntityString,
        address beneficiary,
        string calldata beneficiaryString,
        string calldata retirementMessage,
        uint256 amount
    ) external;

    function retireAndMintCertificate(
        string calldata retiringEntityString,
        address beneficiary,
        string calldata beneficiaryString,
        string calldata retirementMessage,
        uint256 amount
    ) external;
}

// SPDX-FileCopyrightText: 2021 Toucan Labs
//
// SPDX-License-Identifier: UNLICENSED

// If you encounter a vulnerability or an issue, please contact <security@toucan.earth> or visit security.toucan.earth
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./IToucanContractRegistry.sol";

interface RetirementCertificates is IERC721Upgradeable {
    /// @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
    function tokenURI(uint256 tokenId) external returns (string memory);

    /// @notice Update retirementMessage, beneficiary, and beneficiaryString of a NFT
    /// within 24h of creation. Empty values are ignored, ie., will not overwrite the
    /// existing stored values in the NFT.
    /// @param tokenId The id of the NFT to update
    /// @param beneficiary The new beneficiary to set in the NFT
    /// @param beneficiaryString The new beneficiaryString to set in the NFT
    /// @param retirementMessage The new retirementMessage to set in the NFT
    /// @dev The function can only be called by a the NFT owner
    function updateCertificate(
        uint256 tokenId,
        address beneficiary,
        string calldata beneficiaryString,
        string calldata retirementMessage
    ) external;
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./BaseUpgradeablePausable.sol";
import "./DygnifyConfig.sol";

contract Borrower is BaseUpgradeablePausable {
    DygnifyConfig private dygnifyConfig;
    using ConfigHelper for DygnifyConfig;

    // In future we can update the profile of borrwer when auditor reviews it.
    mapping(address => string) public borrowerProfile;

    function initialize(DygnifyConfig _dygnifyConfig) external initializer {
        require(
            address(_dygnifyConfig) != address(0),
            "Invalid config address"
        );
        dygnifyConfig = DygnifyConfig(_dygnifyConfig);
        address owner = dygnifyConfig.dygnifyAdminAddress();
        require(owner != address(0), "Invalid Owner");
        _BaseUpgradeablePausable_init(owner);
    }

    function updateBorrowerProfile(string calldata _cid) external {
        require(bytes(_cid).length != 0, "Invalid CID");
        borrowerProfile[msg.sender] = _cid;
    }
}

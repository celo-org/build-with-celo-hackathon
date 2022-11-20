// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "./DygnifyConfig.sol";
import "./ConfigOptions.sol";

/**
 * @title ConfigHelper
 * @notice A convenience library for getting easy access to other contracts and constants within the
 *  protocol.
 * @author Dygnify
 */

library ConfigHelper {
    function dygnifyAdminAddress(DygnifyConfig config)
        internal
        view
        returns (address)
    {
        return config.getAddress(uint256(ConfigOptions.Addresses.DygnifyAdmin));
    }

    function usdcAddress(DygnifyConfig config) internal view returns (address) {
        return config.getAddress(uint256(ConfigOptions.Addresses.USDCToken));
    }

    function lpTokenAddress(DygnifyConfig config)
        internal
        view
        returns (address)
    {
        return config.getAddress(uint256(ConfigOptions.Addresses.LPToken));
    }

    function poolImplAddress(DygnifyConfig config)
        internal
        view
        returns (address)
    {
        return
            config.getAddress(uint256(ConfigOptions.Addresses.PoolImplAddress));
    }

    function collateralTokenAddress(DygnifyConfig config)
        internal
        view
        returns (address)
    {
        return
            config.getAddress(uint256(ConfigOptions.Addresses.CollateralToken));
    }

    function getLeverageRatio(DygnifyConfig config)
        internal
        view
        returns (uint256)
    {
        return config.getNumber(uint256(ConfigOptions.Numbers.LeverageRatio));
    }

    function getOverDueFee(DygnifyConfig config)
        internal
        view
        returns (uint256)
    {
        return config.getNumber(uint256(ConfigOptions.Numbers.OverDueFee));
    }

    function getSeniorPoolMockinMonths(DygnifyConfig config)
        internal
        view
        returns (uint256)
    {
        return
            config.getNumber(
                uint256(ConfigOptions.Numbers.SeniorPoolFundLockinMonths)
            );
    }

    function getOpportunityOrigination(DygnifyConfig config)
        internal
        view
        returns (address)
    {
        return
            config.getAddress(
                uint256(ConfigOptions.Addresses.OpportunityOrigination)
            );
    }

    function getDygnifyFee(DygnifyConfig config)
        internal
        view
        returns (uint256)
    {
        return config.getNumber(uint256(ConfigOptions.Numbers.DygnifyFee));
    }

    function getJuniorSubpoolFee(DygnifyConfig config)
        internal
        view
        returns (uint256)
    {
        return
            config.getNumber(uint256(ConfigOptions.Numbers.JuniorSubpoolFee));
    }

    function investorContractAddress(DygnifyConfig config)
        internal
        view
        returns (address)
    {
        return
            config.getAddress(
                uint256(ConfigOptions.Addresses.InvestorContract)
            );
    }
}

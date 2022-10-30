// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Params.sol";
import "./ICommon.sol";

interface IMain is Params, ICommon {
  function joinABand(uint64 poolId) external payable returns(bool);
  function getFinance(uint64 poolId) external payable returns(bool);
  function payback(uint64 poolId) external payable returns(bool);
  function liquidate(uint64 poolId) external payable;
  function roundUp(uint64 poolId) external;
  function enquireLiquidation(uint64 poolId) external view returns(Liquidation calldata);
  function cancelBand(uint64 poolId) external returns(bool);
  function supportedToken(address token) external view returns(bool);
  
  function createPublicPool(
    uint8 quorum, 
    uint8 _durationIndays, 
    uint16 colCoverageRatio, 
    uint tokenPriceInETH) external payable returns(bool);

  function createPrivatePool(
    uint8 _durationIndays, 
    uint16 colCoverateRatio, 
    address[] memory members,
     uint tokenPriceInETH) external payable returns(bool);
  
  struct Statistics {
    uint totalValueInERC20;
    uint96 subscribers;
  }

  struct PublicData {
    address feeTo;
    address token;
    uint8 penFee;
    uint8 makerFee;
  }
}





































/** In save and invest, we do not handle investment for users 
    We simply provide the tools for backend and frontend to interact with it.
      - An user creates an investment account.
      - Fund it with an initial amount.
      - Set the configuration themselves.
      - Provides Approve external investors to withdraw from the account.

      Uses: 
        o A hybrid exchange.
        o An easy way to singleHandedly fund projects.
        o Provide liquidity to projects from personal account.
        o Sells directly to anyone from the account.
        o Can save.

        Switches:
          o User will be able to switch to save mode.
          o Liquid mode.
          o Borrow mode.
          o Lending mode.
          o Funding mode.
  */

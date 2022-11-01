// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./ICommon.sol";

interface IDigesu {
  error InsufficientQuorum();
  error InvalidInput();
  error Failed();

  event Cancellation(uint poolId, uint unit, address alc);

  function joinABand(uint poolId) external returns(bool);
  function getFinance(uint poolId) external returns(bool);
  function payback(uint poolId) external returns(bool);
  function liquidate(uint poolId) external returns(bool);
  function roundUp(uint poolId) external returns(bool);
  function enquireLiquidation(uint poolId) external view returns(ICommon.Liquidation calldata);
  function cancelBand(uint poolId) external returns(bool);
  function supportedToken(address token) external view returns(bool);
  
  function createPublicPool(
    uint8 quorum, 
    uint8 durationInDays, 
    uint16 colCoverageRatio, 
    uint amount,
    address asset) external returns(bool);

  function createPrivatePool(
    uint8 durationIndays,
    uint16 colCoverateRatio, 
    address[] memory members, 
    address asset,
    uint amount) external returns(bool);
  
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
